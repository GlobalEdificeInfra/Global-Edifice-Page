import { useState, type FormEvent } from "react";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";
import { IndianPhoneInput, withIndiaDialCode } from "@/components/indian-phone-input";
import { saveToSheet } from "@/lib/sheets-api";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { submitContactForm } from "@/lib/enquiry-api";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

export type LocationLandingPageProps = {
  titleLines: string[];
  /** Clean, properly-cased project name sent to the CRM (falls back to titleLines joined). */
  projectName?: string;
  heroSubtitle?: string;
  /** Map illustration hero (upcoming pages) vs photo hero. */
  heroVariant?: "illustration" | "photo";
  heroMapImage?: string;
  heroMapImageAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageClassName?: string;
  introHeading: string;
  introParagraphs: Array<string | { title?: string; body: string }>;
  highlightStats: Array<{ value: string; label: string }>;
};

function UpcomingHeroMap({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-[0.85rem] bg-[#dce3ea] shadow-[0_12px_28px_-20px_rgba(18,58,76,0.35)] sm:max-w-[26rem] md:max-w-[30rem]">
      <img src={src} alt={alt} className="aspect-square w-full object-cover" />
    </div>
  );
}

function ContactSection({ projectName }: { projectName: string }) {
  const inputClassName =
    "mt-2 w-full rounded-[0.2rem] border border-[#e0d1b8] bg-white px-4 py-3.5 text-[1rem] font-medium text-[#3d3832] outline-none placeholder:text-[#b2a594] md:text-[1.04rem]";
  const labelClassName =
    "text-[0.78rem] font-semibold tracking-[0.02em] text-[#5f5448] md:text-[0.82rem]";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    void saveToSheet("contact", {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: withIndiaDialCode(phone),
      project: projectName,
      message: message.trim(),
      source: "Project page contact form",
    });

    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    const result = await submitContactForm({
      firstName: firstName || fullName.trim(),
      lastName: rest.join(" "),
      email,
      phone: withIndiaDialCode(phone),
      message,
      project: projectName,
      channelId: "Contact_us",
      subject: "Lead from Website - Contact Form",
    });

    if (result.ok) {
      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  };

  return (
    <section id="contact" className="bg-[#171717]">
      <div className="relative overflow-hidden">
        <img
          src={geContactLounge}
          alt="Contact lounge"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.84)_0%,rgba(10,10,10,0.72)_42%,rgba(10,10,10,0.42)_100%)]" />

        <div
          className={`relative mx-auto grid max-w-7xl items-center gap-10 ${pageGutterClass} py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-16`}
        >
          <div className="max-w-[30rem] text-white lg:pl-6">
            <h2 className="font-display text-[2.4rem] leading-[1.02] uppercase md:text-[3rem]">
              Get In Touch
            </h2>
            <p className="mt-3 text-base font-normal leading-[1.8] text-white/76">
              We would love to hear from you
            </p>
          </div>

          {status === "success" ? (
            <div className="rounded-[1.45rem] bg-[#fffdfa] p-7 text-center text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] md:p-8">
              <h3 className="font-display text-[1.85rem] leading-none text-[#1f1d1a] md:text-[2.5rem]">
                Thank you!
              </h3>
              <p className="mt-3 text-base font-normal text-[#7b7369]">
                We&apos;ve received your enquiry and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#d5c4a8] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#6f6558] transition hover:border-[#c0a56e] hover:text-[#123a4c]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="rounded-[1.45rem] bg-[#fffdfa] p-5 text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] sm:p-7 md:p-8"
              onSubmit={handleSubmit}
            >
              <h3 className="font-display text-[1.85rem] leading-none text-[#1f1d1a] md:text-[2.5rem]">
                Contact Us
              </h3>
              <p className="mt-2 text-base font-normal text-[#7b7369]">
                We would love to hear from you
              </p>

              <div className="mt-8 space-y-4">
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
                  <span className={labelClassName}>Message*</span>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Your message"
                    className={`${inputClassName} resize-none`}
                  />
                </label>

                <FormConsentCheckbox />

                {status === "error" ? (
                  <p className="text-[0.8rem] text-[#c0392b]">{errorMessage}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#d5c4a8] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#6f6558] transition hover:border-[#c0a56e] hover:text-[#123a4c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export function LocationLandingPage({
  titleLines,
  projectName,
  heroSubtitle,
  heroVariant = "illustration",
  heroMapImage,
  heroMapImageAlt = "",
  heroImage,
  heroImageAlt = "",
  heroImageClassName = "object-center",
  introHeading,
  introParagraphs,
  highlightStats,
}: LocationLandingPageProps) {
  const isPhotoHero = heroVariant === "photo" && Boolean(heroImage);

  return (
    <>
      <main className="bg-[#fbf8f4] text-[#163849]">
        <SiteHeader appearance={isPhotoHero ? "overlay" : "solid"} />

        {isPhotoHero ? (
          <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#181818] text-white">
            <img
              src={heroImage}
              alt={heroImageAlt}
              className={`absolute inset-0 h-full w-full object-cover object-center ${heroImageClassName}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,14,0.35)_0%,rgba(10,12,14,0.2)_45%,rgba(10,12,14,0.5)_100%)]" />
            <div className="absolute inset-0 bg-black/20" />
            <div
              className={`relative mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center ${pageGutterClass} pb-10 pt-28 sm:pt-32 md:pb-12 md:pt-28`}
            >
              <div className="w-full text-center">
                <h1 className="font-display text-[2.4rem] leading-[1.02] tracking-[0.04em] text-white uppercase sm:text-[3.2rem] md:text-[4.2rem] lg:text-[5rem]">
                  {titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
                {heroSubtitle ? (
                  <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/90 md:mt-5 md:text-[0.88rem]">
                    {heroSubtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-[#dce3ea] pb-14 pt-32 md:pb-16 md:pt-36">
            <div className={pageContainerClass}>
              {heroMapImage ? (
                <UpcomingHeroMap src={heroMapImage} alt={heroMapImageAlt} />
              ) : null}
              <h1 className="mt-8 w-full text-center font-display text-[1.85rem] leading-[1.08] tracking-[0.02em] text-[#123a4c] uppercase sm:text-[2.35rem] md:text-[2.9rem] lg:text-[3.25rem]">
                {titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              {heroSubtitle ? (
                <p className="mt-4 text-center text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#123a4c] md:text-[0.88rem]">
                  {heroSubtitle}
                </p>
              ) : null}
            </div>
          </section>
        )}

        <section id="overview" className="bg-[#fbf8f4] py-16 md:py-20">
          <div className={pageContainerClass}>
            <div className="mx-auto max-w-6xl">
              <h2 className="text-center font-display text-[1.45rem] leading-[1.2] tracking-[0.02em] text-[#c0a56e] uppercase md:text-[1.85rem] lg:text-[2.1rem]">
                {introHeading}
              </h2>

              <div className="mt-10 space-y-6 text-base font-normal leading-[1.9] text-[#5c564d] md:mt-12">
                {introParagraphs.map((paragraph) => {
                  if (typeof paragraph === "string") {
                    return <p key={paragraph}>{paragraph}</p>;
                  }

                  return (
                    <div key={`${paragraph.title ?? ""}-${paragraph.body}`}>
                      {paragraph.title ? (
                        <p className="mb-2 text-[0.92rem] font-semibold text-[#7a756e] md:text-[1rem]">
                          {paragraph.title}
                        </p>
                      ) : null}
                      <p>{paragraph.body}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 grid overflow-hidden rounded-[0.85rem] bg-[#c0a56e] text-white md:mt-14 md:grid-cols-3">
                {highlightStats.map((stat, index) => (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className={`flex flex-col items-center justify-center px-5 py-8 text-center md:min-h-[7.5rem] md:px-6 md:py-9 ${
                      index < highlightStats.length - 1
                        ? "border-b border-white/35 md:border-b-0 md:border-r"
                        : ""
                    }`}
                  >
                    <p className="text-[1.2rem] font-semibold uppercase tracking-[0.04em] md:text-[1.4rem]">
                      {stat.value}
                    </p>
                    {stat.label ? (
                      <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white/90 md:text-[0.64rem]">
                        {stat.label}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactSection projectName={projectName || titleLines.join(" ")} />
      </main>

      <SiteFooter />
    </>
  );
}
