import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import channelPartnerHero from "@/assets/channel-partner/channel-partner-hero.png";
import geFusionLogo from "@/assets/channel-partner/ge-fusion-logo.png";
import { ResourcePageHero, ResourcePageShell } from "@/components/careers-channel-layout";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";
import { saveToSheet } from "@/lib/sheets-api";

export const Route = createFileRoute("/channel-partner")({
  component: ChannelPartnerPage,
  head: () => ({
    meta: [
      { title: "Channel Partner - Global Edifice" },
      {
        name: "description",
        content:
          "Register as a Global Edifice channel partner. Where assets and values multiply forever.",
      },
    ],
  }),
});

const fieldClassName =
  "h-10 w-full border border-[#cfc8be] bg-white px-3 text-[0.9rem] text-[#7a756e] outline-none transition focus:border-[#c0a56e]";
const labelInlineClassName =
  "shrink-0 text-[0.88rem] font-medium text-[#7a756e] md:text-[0.92rem]";
const sectionTitleClassName =
  "text-[0.95rem] font-bold uppercase tracking-[0.04em] text-[#7a756e]";

function SectionHeading({ children }: { children: string }) {
  return (
    <div>
      <h3 className={sectionTitleClassName}>{children}</h3>
      <div className="mt-1 h-0.5 w-28 bg-[#c0a56e]" />
    </div>
  );
}

const organisationTypes = [
  "Sole Proprietorship",
  "Partnership",
  "Private Limited",
  "Public Limited",
  "Others",
] as const;

const businessNatures = [
  "Land Sourcing for Developer",
  "Residential Sales",
  "Commercial Sales",
  "Agricultural Land Sales",
  "Industrial Sales",
  "Project Consultancy",
  "Property Management",
  "Rentals(Res./Comm.)",
] as const;

function DateBoxes({ id }: { id: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1" aria-label={`${id} date`}>
      {[2, 2, 4].map((count, groupIndex) => (
        <div key={`${id}-${groupIndex}`} className="flex items-center gap-1">
          {Array.from({ length: count }).map((_, boxIndex) => (
            <input
              key={`${id}-${groupIndex}-${boxIndex}`}
              name={`__date__${id}-${groupIndex}-${boxIndex}`}
              type="text"
              maxLength={1}
              inputMode="numeric"
              className="h-10 w-9 border border-[#d0cbc3] bg-white text-center text-[0.9rem] text-[#7a756e] outline-none focus:border-[#c0a56e] sm:h-8 sm:w-7 sm:text-[0.8rem]"
            />
          ))}
          {groupIndex < 2 ? (
            <span className="px-0.5 text-[0.85rem] text-[#6b655d]" aria-hidden>
              /
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** "Company Name:" -> "companyName", so submissions arrive with readable keys. */
function toFieldName(label: string) {
  const words = label.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/);

  return words
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}

function InlineField({
  label,
  required,
  type = "text",
  className = "",
}: {
  label: string;
  required?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`flex min-w-0 flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-3 ${className}`}>
      <span className={`${labelInlineClassName} sm:min-w-[8.5rem] sm:shrink-0`}>
        {label}
        {required ? <span className="text-[#c45a1a]">*</span> : null}
      </span>
      <input
        type={type}
        name={toFieldName(label)}
        required={required}
        className={fieldClassName}
      />
    </label>
  );
}

function FusionBrand() {
  return (
    <div className="mx-auto max-w-lg text-center">
      <img
        src={geFusionLogo}
        alt="Global Edifice Fusion — Where Assets And Values Multiply Forever"
        className="mx-auto h-auto w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem]"
      />
    </div>
  );
}

/** The date-of-… fields are single-digit boxes; stitch them back into dd/mm/yyyy. */
function readDate(formData: FormData, id: string) {
  const parts = [2, 2, 4].map((count, groupIndex) =>
    Array.from({ length: count }, (_, boxIndex) =>
      String(formData.get(`__date__${id}-${groupIndex}-${boxIndex}`) ?? "").trim(),
    ).join(""),
  );

  return parts.some((part) => part) ? parts.join("/") : "";
}

function ChannelPartnerPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const multiValueFields = ["organisationType", "businessNature"];
    const data: Record<string, unknown> = {
      dateOfRegistration: readDate(formData, "registration"),
      dateOfIncorporation: readDate(formData, "incorporation"),
    };

    for (const key of new Set(formData.keys())) {
      if (key.startsWith("__date__")) continue;

      const values = formData.getAll(key).map(String);
      data[key] = multiValueFields.includes(key) ? values : values.join(" ");
    }

    const result = await saveToSheet("channel-partner", data);

    if (result.ok) {
      setStatus("success");
      event.currentTarget.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setStatus("error");
      setErrorMessage(
        "We could not submit your registration just now. Please try again in a moment.",
      );
    }
  };

  return (
    <ResourcePageShell headerOverlay>
      <ResourcePageHero
        image={channelPartnerHero}
        imageAlt="Channel partner handshake"
        title="CHANNEL PARTNER"
        overlay="light"
        fullScreen
      />

      <section className="bg-[#fcf9f2] pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-6xl px-[1.125rem] md:px-[1.8rem]">
          <FusionBrand />

          <div className="mt-8 h-px w-full bg-[#e8a89a]/90 md:mt-10" />

          <form className="mt-8 md:mt-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-display text-[2rem] leading-[1.05] text-[#1f1d1a] sm:text-[2.35rem] md:text-[2.85rem]">
                  Channel Partner
                </h1>
                <p className="mt-2 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-[#1f1d1a]">
                  Registration Form
                </p>
                <div className="mt-1 h-0.5 w-28 bg-[#c0a56e]" />
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end md:pt-1">
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#1f1d1a]">
                  Date of Registration:
                </span>
                <DateBoxes id="registration" />
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
              <ol className="list-decimal space-y-1.5 pl-5 text-base font-normal leading-[1.7] text-[#4a463f]">
                <li>Please be sure you understand all the terms & conditions.</li>
                <li>Incomplete forms will lead to a delay in processing your request.</li>
                <li>All details requested for in this registration form is mandatory.</li>
              </ol>

              <div className="space-y-3">
                <InlineField label="UID No:" />
                <InlineField label="RERA No:" required />
              </div>
            </div>

            <div className="mt-10">
              <SectionHeading>Company Details</SectionHeading>

              <div className="mt-5 space-y-4">
                <InlineField label="Company Name:" required />

                <div className="grid gap-4 md:grid-cols-2">
                  <InlineField label="Contact Person:" required />
                  <label className="flex min-w-0 flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                    <span className={labelInlineClassName}>Date of Incorporation:</span>
                    <DateBoxes id="incorporation" />
                  </label>
                  <InlineField label="Phone no:" type="tel" />
                  <InlineField label="Email Address:" type="email" required />
                  <InlineField label="Name of the Directors:" />
                  <InlineField label="Name of the Partners:" />
                  <InlineField label="Mobile:" type="tel" required />
                  <InlineField label="Alternate Phone:" type="tel" />
                  <InlineField label="PAN:" required />
                  <InlineField label="Aadhar No:" />
                  <InlineField label="GST No:" />
                  <InlineField label="Website:" type="url" />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <SectionHeading>Address</SectionHeading>
              <div className="mt-5 space-y-4">
                <InlineField label="Registered Address:" required />
                <div className="grid gap-4 sm:grid-cols-[0.9fr_1.2fr_0.9fr]">
                  <InlineField label="State:" required />
                  <InlineField label="City:" required />
                  <InlineField label="Zip Code:" required />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <SectionHeading>Organisation Type</SectionHeading>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {organisationTypes.map((type) => (
                  <label
                    key={type}
                    className="flex min-h-11 items-center gap-2 text-[0.88rem] text-[#7a756e]"
                  >
                    <input
                      type="checkbox"
                      name="organisationType"
                      value={type}
                      className="h-4 w-4 accent-[#c0a56e]"
                    />
                    {type}
                    {type === "Others" ? (
                      <span className="ml-1 inline-block w-28 border-b border-[#cfc8be] md:w-40" />
                    ) : null}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <SectionHeading>Nature of Business</SectionHeading>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {businessNatures.map((nature) => (
                  <label
                    key={nature}
                    className="flex min-h-11 items-center gap-2.5 text-[0.86rem] text-[#7a756e]"
                  >
                    <input
                      type="checkbox"
                      name="businessNature"
                      value={nature}
                      className="h-4 w-4 shrink-0 accent-[#c0a56e]"
                    />
                    {nature}
                  </label>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <label className="flex min-w-0 flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  <span className={`${labelInlineClassName} sm:shrink-0`}>Member of any association:</span>
                  <span className="h-px min-w-0 flex-1 border-b border-[#cfc8be]">
                    <input
                      type="text"
                      name="memberOfAnyAssociation"
                      className="h-8 w-full bg-transparent outline-none"
                      aria-label="Member of any association"
                    />
                  </span>
                </label>
                <label className="flex min-w-0 flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                  <span className={`${labelInlineClassName} sm:shrink-0`}>Membership No if any:</span>
                  <span className="h-px min-w-0 flex-1 border-b border-[#cfc8be]">
                    <input
                      type="text"
                      name="membershipNo"
                      className="h-8 w-full bg-transparent outline-none"
                      aria-label="Membership No if any"
                    />
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-[1.05rem] font-bold text-[#7a756e]">Terms and Conditions</h3>
              <p className="mt-3 max-w-5xl text-base font-normal leading-[1.85] text-[#5c564d]">
                The Channel Partner is appointed on a non-exclusive basis to market and facilitate
                sales of Global Edifice Infra projects and must maintain valid Karnataka RERA
                registration and comply with all applicable laws. A commission of 2% + applicable GST
                is payable on eligible transactions, subject to the Company’s payment terms and
                receipt of the required customer payments and invoice. Leads must be registered with
                the Company, and project availability, pricing and commitments must be confirmed
                before communicating with customers. The Channel Partner must obtain prior written
                approval for all marketing and use of the Company’s name, logo and project details,
                must not represent itself as the Company or sole selling agent, and must not collect
                customer payments directly or accept cash. The Channel Partner shall maintain
                confidentiality, follow Company guidelines, and be responsible for unauthorised
                representations or unfair trade practices. Either party may terminate the arrangement
                with 30 days’ written notice, and disputes shall be governed by Indian law and
                subject to Bengaluru jurisdiction.
              </p>

              <FormConsentCheckbox className="mt-5 text-base font-normal leading-[1.75] text-[#5c564d]" />

              <label className="mt-4 flex items-center gap-2 text-[0.9rem] font-medium text-[#7a756e]">
                <input type="checkbox" required className="h-4 w-4 accent-[#c0a56e]" />
                I accept the terms and conditions
              </label>
            </div>

            {status === "success" ? (
              <p className="mt-6 rounded-[0.35rem] bg-white px-5 py-4 text-base font-normal text-[#4a463f]">
                Thank you. We&apos;ve received your registration and our team will be in touch.
              </p>
            ) : null}

            {status === "error" ? (
              <p className="mt-6 text-[0.85rem] text-[#c0392b]">{errorMessage}</p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 inline-flex items-center justify-center rounded-[0.2rem] bg-[#c0a56e] px-12 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a89458] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting..." : "Empanel"}
            </button>
          </form>
        </div>
      </section>
    </ResourcePageShell>
  );
}
