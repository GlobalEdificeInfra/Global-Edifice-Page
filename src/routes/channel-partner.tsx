import { createFileRoute } from "@tanstack/react-router";
import careerHero from "@/assets/careers/career.jpg";
import {
  ResourcePageHero,
  ResourcePageShell,
} from "@/components/careers-channel-layout";

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
  "h-10 w-full border border-[#cfc8be] bg-white px-3 text-[0.9rem] text-[#2a2723] outline-none transition focus:border-[#8a6324]";
const labelInlineClassName =
  "shrink-0 text-[0.88rem] font-medium text-[#2a2723] md:text-[0.92rem]";
const sectionTitleClassName =
  "text-[0.95rem] font-bold uppercase tracking-[0.04em] text-[#2a2723]";

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
              type="text"
              maxLength={1}
              inputMode="numeric"
              className="h-10 w-9 border border-[#d0cbc3] bg-white text-center text-[0.9rem] text-[#2a2723] outline-none focus:border-[#8a6324] sm:h-8 sm:w-7 sm:text-[0.8rem]"
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
      <input type={type} required={required} className={fieldClassName} />
    </label>
  );
}

function FusionBrand() {
  return (
    <div className="mx-auto text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#1f1d1a] md:text-[0.76rem]">
        Global Edifice
      </p>
      <div className="mt-1.5 flex items-center justify-center text-[2.1rem] font-bold leading-none tracking-[0.1em] text-[#1f1d1a] sm:text-[2.8rem] md:text-[3.6rem]">
        <span>FUSI</span>
        <span
          className="mx-[0.04em] inline-flex h-[0.92em] w-[0.92em] shrink-0 items-center justify-center"
          aria-hidden
        >
          {/* O mark: same cap-height as letters; S-gap through orange arcs + teal center */}
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* Orange ring: two arcs (top + bottom), small gaps on left & right */}
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="#e07a5f"
              strokeWidth="17"
              strokeDasharray="95 18 95 18"
              transform="rotate(82 50 50)"
            />
            {/* S line connecting through the side gaps */}
            <path
              d="M11 55C27 28 41 28 50 50C59 72 73 72 89 45"
              fill="none"
              stroke="#fcf9f2"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Teal / green center — larger solid diot matching reference */}
            <circle cx="50" cy="50" r="17" fill="#0f5c5e" />
          </svg>
        </span>
        <span>N</span>
      </div>
      <p className="mt-3 text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#1f1d1a] md:text-[0.72rem]">
        Where Assets And Values Multiply Forever.
      </p>
    </div>
  );
}

function ChannelPartnerPage() {
  return (
    <ResourcePageShell>
      <ResourcePageHero
        image={careerHero}
        imageAlt="Channel partner handshake"
        title="CHANNEL PARTNER"
      />

      <section className="bg-[#fcf9f2] pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-6xl px-[1.125rem] md:px-[1.8rem]">
          <FusionBrand />

          <div className="mt-8 h-px w-full bg-[#e8a89a]/90 md:mt-10" />

          <form className="mt-8 md:mt-10" onSubmit={(event) => event.preventDefault()}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="font-display text-[2rem] leading-[1.05] text-[#1f1d1a] sm:text-[2.35rem] md:text-[2.85rem]">
                  Channel Partner
                </h2>
                <p className="mt-2 inline-block border-b border-[#c2b092] pb-0.5 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-[#1f1d1a]">
                  Registration Form
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end md:pt-1">
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#1f1d1a]">
                  Date of Registration:
                </span>
                <DateBoxes id="registration" />
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
              <ol className="list-decimal space-y-1.5 pl-5 text-[0.82rem] leading-[1.7] text-[#4a463f]">
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
              <h3 className={sectionTitleClassName}>
                <span className="border-b border-[#cbb89a] pb-0.5">Company Details</span>
              </h3>

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
              <h3 className={sectionTitleClassName}>
                <span className="border-b border-[#cbb89a] pb-0.5">Address</span>
              </h3>
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
              <h3 className={sectionTitleClassName}>
                <span className="border-b border-[#cbb89a] pb-0.5">Organisation Type</span>
              </h3>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {organisationTypes.map((type) => (
                  <label
                    key={type}
                    className="flex min-h-11 items-center gap-2 text-[0.88rem] text-[#2a2723]"
                  >
                    <input type="checkbox" className="h-4 w-4 accent-[#8a6324]" />
                    {type}
                    {type === "Others" ? (
                      <span className="ml-1 inline-block w-28 border-b border-[#cfc8be] md:w-40" />
                    ) : null}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className={sectionTitleClassName}>
                <span className="border-b border-[#cbb89a] pb-0.5">Nature of Business</span>
              </h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {businessNatures.map((nature) => (
                  <label
                    key={nature}
                    className="flex min-h-11 items-center gap-2.5 text-[0.86rem] text-[#2a2723]"
                  >
                    <input type="checkbox" className="h-4 w-4 shrink-0 accent-[#8a6324]" />
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
                      className="h-8 w-full bg-transparent outline-none"
                      aria-label="Membership No if any"
                    />
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-[1.05rem] font-bold text-[#2a2723]">Terms and Conditions</h3>
              <p className="mt-3 max-w-5xl text-[0.82rem] leading-[1.85] text-[#5c564d]">
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

              <label className="mt-5 flex items-center gap-2 text-[0.9rem] font-medium text-[#2a2723]">
                <input type="checkbox" required className="h-4 w-4 accent-[#8a6324]" />
                I accept the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex items-center justify-center rounded-[0.2rem] bg-[#8a6324] px-12 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#6f4e1a]"
            >
              Empanel
            </button>
          </form>
        </div>
      </section>
    </ResourcePageShell>
  );
}
