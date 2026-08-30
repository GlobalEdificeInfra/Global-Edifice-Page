import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

export type LocationLandingPageProps = {
  titleLines: string[];
  heroSubtitle?: string;
  /** Illustration placeholder hero (upcoming pages) vs photo hero. */
  heroVariant?: "illustration" | "photo";
  heroImage?: string;
  heroImageAlt?: string;
  heroImageClassName?: string;
  introHeading: string;
  introParagraphs: Array<string | { title?: string; body: string }>;
  highlightStats: Array<{ value: string; label: string }>;
};

function UpcomingHeroIllustration() {
  return (
    <div className="mx-auto flex h-[11rem] w-full max-w-[22rem] items-center justify-center sm:h-[12.5rem] md:h-[14rem]" aria-hidden>
      <svg viewBox="0 0 220 118" className="h-full w-auto" fill="none">
        <ellipse cx="110" cy="102" rx="78" ry="9" fill="#c5ced6" />
        <rect x="38" y="68" width="42" height="28" fill="#9aafc0" />
        <rect x="48" y="76" width="22" height="12" fill="#7e96ab" />
        <rect x="86" y="34" width="52" height="62" fill="#9aafc0" />
        <rect x="96" y="42" width="10" height="8" fill="#7e96ab" />
        <rect x="118" y="42" width="10" height="8" fill="#7e96ab" />
        <rect x="96" y="56" width="10" height="8" fill="#7e96ab" />
        <rect x="118" y="56" width="10" height="8" fill="#7e96ab" />
        <rect x="96" y="70" width="10" height="8" fill="#7e96ab" />
        <rect x="118" y="70" width="10" height="8" fill="#7e96ab" />
        <rect x="104" y="82" width="16" height="14" fill="#7e96ab" />
        <rect x="158" y="72" width="3" height="24" fill="#9aafc0" />
        <circle cx="159.5" cy="64" r="14" fill="#9aafc0" />
        <rect x="180" y="80" width="2.5" height="16" fill="#9aafc0" />
        <circle cx="181.2" cy="74" r="9" fill="#9aafc0" />
      </svg>
    </div>
  );
}

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
          className={`relative mx-auto grid max-w-7xl items-center gap-10 ${pageGutterClass} py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-16`}
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
            className="rounded-[1.45rem] bg-[#fffdfa] p-5 text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] sm:p-7 md:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <h3 className="font-display text-[1.85rem] leading-none text-[#1f1d1a] md:text-[2.5rem]">
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
                <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 rounded border-[#dbcdae]" />
                <span>
                  By submitting my details, I acknowledge that I am overriding my National Do Not
                  Call (NDNC) registration and authorize Global Edifice to contact me regarding my
                  enquiry and project updates via call, SMS, email, or WhatsApp.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#d5c4a8] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#6f6558] transition hover:border-[#8a6324] hover:text-[#123a4c]"
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
  heroSubtitle,
  heroVariant = "illustration",
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
          <section className="relative isolate min-h-[26rem] overflow-hidden bg-[#181818] text-white sm:min-h-[30rem] md:min-h-[36rem]">
            <img
              src={heroImage}
              alt={heroImageAlt}
              className={`absolute inset-0 h-full w-full object-cover ${heroImageClassName}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,14,0.28)_0%,rgba(10,12,14,0.18)_45%,rgba(10,12,14,0.42)_100%)]" />
            <div
              className={`relative mx-auto flex min-h-[26rem] max-w-7xl items-center justify-center ${pageGutterClass} pb-12 pt-28 sm:min-h-[30rem] md:min-h-[36rem] md:pb-14 md:pt-32`}
            >
              <h1 className="w-full text-center font-display text-[2.4rem] leading-[1.02] tracking-[0.04em] text-white uppercase sm:text-[3.2rem] md:text-[4.2rem] lg:text-[5rem]">
                {titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>
          </section>
        ) : (
          <section className="bg-[#dce3ea] pb-14 pt-32 md:pb-16 md:pt-36">
            <div className={pageContainerClass}>
              <UpcomingHeroIllustration />
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
              <h2 className="text-center font-display text-[1.45rem] leading-[1.2] tracking-[0.02em] text-[#8a6324] uppercase md:text-[1.85rem] lg:text-[2.1rem]">
                {introHeading}
              </h2>

              <div className="mt-10 space-y-6 text-[0.94rem] leading-[1.9] text-[#5c564d] md:mt-12 md:text-[1rem] md:leading-[2]">
                {introParagraphs.map((paragraph) => {
                  if (typeof paragraph === "string") {
                    return <p key={paragraph}>{paragraph}</p>;
                  }

                  return (
                    <div key={`${paragraph.title ?? ""}-${paragraph.body}`}>
                      {paragraph.title ? (
                        <p className="mb-2 text-[0.92rem] font-semibold text-[#2a2723] md:text-[1rem]">
                          {paragraph.title}
                        </p>
                      ) : null}
                      <p>{paragraph.body}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 grid overflow-hidden rounded-[0.85rem] bg-[#8a6324] text-white md:mt-14 md:grid-cols-3">
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

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
