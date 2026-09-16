import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import careerHero from "@/assets/careers/career.jpg";
import {
  ResourcePageHero,
  ResourcePageShell,
  pageContainerClass,
} from "@/components/careers-channel-layout";
import { CAREERS_CONSENT_TEXT, FormConsentCheckbox } from "@/components/form-consent-checkbox";
import { IndianPhoneInput, withIndiaDialCode } from "@/components/indian-phone-input";
import { saveToSheet } from "@/lib/sheets-api";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers - Global Edifice" },
      {
        name: "description",
        content:
          "Build your career with Global Edifice. Join a team shaping homes and communities across Bengaluru.",
      },
    ],
  }),
});

const inputClassName =
  "mt-2 w-full rounded-[0.2rem] border border-[#e0d1b8] bg-white px-4 py-3.5 text-[1rem] font-medium text-[#3d3832] outline-none placeholder:text-[#b2a594]";
const labelClassName = "text-[0.78rem] font-semibold tracking-[0.02em] text-[#5f5448]";

function CareersPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const result = await saveToSheet("career", {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: withIndiaDialCode(phone),
      location: location.trim(),
      resumeLink: resumeLink.trim(),
    });

    if (result.ok) {
      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setResumeLink("");
    } else {
      setStatus("error");
      setErrorMessage(
        "We could not submit your application just now. Please try again, or email your details to us.",
      );
    }
  };

  return (
    <ResourcePageShell>
      <ResourcePageHero image={careerHero} imageAlt="Global Edifice careers" title="CAREERS" />

      <section className="bg-white py-14 md:py-20">
        <div className={pageContainerClass}>
          <div className="max-w-5xl text-left">
            <h2 className="font-display text-[1.85rem] leading-[1.15] text-[#1f1d1a] md:text-[2.45rem]">
              Build Your Career. Build Something That Lasts.
            </h2>
            <div className="mt-6 space-y-4 text-base font-normal leading-[1.9] text-[#6b655d]">
              <p>
                At Global Edifice, we believe great communities are built by great people. We bring
                together diverse talent, ideas and expertise to create meaningful spaces and lasting
                value. Join us to grow with a team that values ownership, collaboration, learning
                and excellence.
              </p>
            </div>
          </div>

          <form
            className="mt-14 max-w-3xl rounded-[1.2rem] bg-[#f7f4ef] p-5 sm:p-7 md:p-10"
            onSubmit={handleSubmit}
          >
            <h3 className="font-display text-[1.65rem] leading-none text-[#1f1d1a] md:text-[2.35rem]">
              Begin with us
            </h3>

            {status === "success" ? (
              <div className="mt-7 rounded-[0.6rem] bg-white px-6 py-10 text-center">
                <p className="text-[1.1rem] font-semibold text-[#c0a56e]">Thank you!</p>
                <p className="mt-2 text-base font-normal text-[#6b655d]">
                  We&apos;ve received your application and will get in touch if there is a suitable
                  opening.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-5 inline-flex items-center justify-center rounded-[0.35rem] border border-[#cfc8be] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#7a756e] transition hover:border-[#c0a56e]"
                >
                  Send another application
                </button>
              </div>
            ) : (
              <>
                <div className="mt-7 space-y-4">
                  <label className="block">
                    <span className={labelClassName}>Full name*</span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Enter your full name"
                      className={inputClassName}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClassName}>Email address*</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you.email@example.com"
                      className={inputClassName}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClassName}>Phone number*</span>
                    <IndianPhoneInput value={phone} onChange={setPhone} className="mt-2" />
                  </label>
                  <label className="block">
                    <span className={labelClassName}>Location*</span>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="Your location"
                      className={inputClassName}
                    />
                  </label>
                  <label className="block">
                    <span className={labelClassName}>Resume link*</span>
                    <input
                      type="url"
                      required
                      value={resumeLink}
                      onChange={(event) => setResumeLink(event.target.value)}
                      placeholder="https://drive.google.com/..."
                      className={inputClassName}
                    />
                    <span className="mt-2 block text-[0.78rem] font-normal leading-[1.6] text-[#8a7e70]">
                      Share a link to your resume on Google Drive, Dropbox, OneDrive or LinkedIn.
                      Please make sure the link is viewable by anyone with it.
                    </span>
                  </label>
                </div>

                <FormConsentCheckbox className="mt-4" text={CAREERS_CONSENT_TEXT} />

                {status === "error" ? (
                  <p className="mt-3 text-[0.85rem] text-[#c0392b]">{errorMessage}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#cfc8be] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#7a756e] transition hover:border-[#c0a56e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </ResourcePageShell>
  );
}
