import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

export type LocationLandingPageProps = {
  titleLines: string[];
  heroImage: string;
  heroImageAlt: string;
  heroImageClassName?: string;
  introHeading: string;
  introParagraphs: string[];
  introImage: string;
  introImageAlt: string;
  introImageClassName?: string;
  /** Flush intro image to the right viewport edge. */
  introImageFlushRight?: boolean;
};

function ContactSection() {
  const inputClassName =
    "mt-2 w-full rounded-[0.2rem] border border-[#e0d1b8] bg-white px-4 py-3.5 text-[1rem] font-medium text-[#3d3832] outline-none placeholder:text-[#b2a594] md:text-[1.04rem]";
  const labelClassName =
    "text-[0.78rem] font-semibold tracking-[0.02em] text-[#5f5448] md:text-[0.82rem]";

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
          className={`relative mx-auto grid max-w-7xl items-center gap-10 ${pageGutterClass} py-18 md:py-24 lg:grid-cols-[minmax(0,1fr)_31rem] lg:gap-16`}
        >
          <div className="max-w-[30rem] text-white lg:pl-6">
            <h2 className="font-display text-[2.4rem] leading-[1.02] uppercase md:text-[3rem]">
              Get In Touch
            </h2>
            <p className="mt-3 text-[0.98rem] leading-[1.8] text-white/76">
              We would love to hear from you
            </p>
          </div>

          <form
            className="rounded-[1.45rem] bg-[#fffdfa] p-7 text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] md:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <h3 className="font-display text-[2.35rem] leading-none text-[#1f1d1a] md:text-[2.5rem]">
              Contact Us
            </h3>
            <p className="mt-2 text-[0.98rem] font-medium text-[#7b7369]">
              We would love to hear from you
            </p>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className={labelClassName}>Full name*</span>
                <input type="text" placeholder="Enter your full name" className={inputClassName} />
              </label>

              <label className="block">
                <span className={labelClassName}>Email address*</span>
                <input
                  type="email"
                  placeholder="you.email@example.com"
                  className={inputClassName}
                />
              </label>

              <label className="block">
                <span className={labelClassName}>Phone number*</span>
                <input type="tel" placeholder="Your number" className={inputClassName} />
              </label>

              <label className="block">
                <span className={labelClassName}>Message*</span>
                <textarea
                  rows={4}
                  placeholder="Your message"
                  className={`${inputClassName} resize-none`}
                />
              </label>

              <label className="flex items-start gap-2 text-[0.72rem] font-medium leading-[1.7] text-[#8a7e70]">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 rounded border-[#dbcdae]" />
                <span>
                  By submitting my details, I acknowledge that I am overriding my National Do Not
                  Call (NDNC) registration and authorize Global Edifice to contact me regarding my
                  enquiry and project updates via call, SMS, email, or WhatsApp.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#d5c4a8] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#6f6558] transition hover:border-[#b49a6c] hover:text-[#123a4c]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function LocationLandingPage({
  titleLines,
  heroImage,
  heroImageAlt,
  heroImageClassName = "object-center",
  introHeading,
  introParagraphs,
  introImage,
  introImageAlt,
  introImageClassName = "object-center",
  introImageFlushRight = false,
}: LocationLandingPageProps) {
  return (
    <>
      <main className="bg-[#fbf8f4] text-[#163849]">
        <SiteHeader />
        <section className="relative isolate min-h-[44rem] overflow-hidden bg-[#181818] text-white md:min-h-screen">
          <img
            src={heroImage}
            alt={heroImageAlt}
            className={`absolute inset-0 h-full w-full object-cover ${heroImageClassName}`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,0.16)_0%,rgba(13,13,13,0.12)_38%,rgba(13,13,13,0.5)_100%)]" />

          <div
            className={`relative mx-auto flex min-h-[44rem] max-w-7xl items-end ${pageGutterClass} pb-8 pt-24 md:min-h-screen md:pb-10 md:pt-32`}
          >
            <h1 className="w-full text-center font-display text-[2.15rem] leading-[1.06] tracking-[0.04em] text-white sm:text-[2.65rem] md:text-[3.25rem] lg:text-[3.8rem]">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
        </section>

        <section id="overview" className="bg-white py-16 md:py-20">
          <div className={pageContainerClass}>
            <h2 className="text-center font-display text-[1.5rem] leading-[1.18] text-[#a8762b] md:text-[2rem]">
              {introHeading}
            </h2>
          </div>

          {introImageFlushRight ? (
            <div className="mt-12 grid lg:grid-cols-2 lg:items-center">
              <div
                className={`${pageGutterClass} space-y-6 py-2 text-[0.96rem] leading-[2] text-[#6b655d] md:text-[1rem] lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))] lg:pr-10`}
              >
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 overflow-hidden lg:mt-0">
                <img
                  src={introImage}
                  alt={introImageAlt}
                  className={`h-[18rem] w-full object-cover sm:h-[22rem] md:h-[28rem] lg:h-full lg:min-h-[28rem] ${introImageClassName}`}
                />
              </div>
            </div>
          ) : (
            <div className={pageContainerClass}>
              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
                <div className="space-y-6 text-[0.96rem] leading-[2] text-[#6b655d] md:text-[1rem]">
                  {introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="overflow-hidden rounded-[0.3rem] bg-white shadow-[0_24px_50px_-42px_rgba(41,29,14,0.26)]">
                  <img
                    src={introImage}
                    alt={introImageAlt}
                    className={`w-full object-cover ${introImageClassName}`}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
