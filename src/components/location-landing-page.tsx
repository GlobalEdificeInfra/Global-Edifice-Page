import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import geLogo from "@/assets/shared/ge-logo.png";
import {
  MobileSiteProjectLinks,
  SiteProjectsMenu,
} from "@/components/site-resource-menu";
import { SiteFooter } from "@/components/site-footer";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const landingNav = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "projects-menu" },
  { label: "BLOGS", kind: "route", to: "/blogs" as const },
  { label: "CONTACT", kind: "anchor", href: "#contact" },
] as const;

type LandingNavItem = (typeof landingNav)[number];

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
};

function LandingNavigationLink({
  item,
  className = "transition hover:text-[#123a4c]",
  onClick,
}: {
  item: LandingNavItem;
  className?: string;
  onClick?: () => void;
}) {
  if (item.kind === "projects-menu") {
    return <SiteProjectsMenu className={className} />;
  }


  if (item.kind === "anchor") {
    return (
      <a href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  }

  return (
    <Link to={item.to} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

function LandingNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 48);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 ${pageGutterClass} transition-all duration-300 md:gap-6 ${
          isScrolled
            ? "mt-2 rounded-[1.75rem] border border-white/18 bg-[linear-gradient(180deg,rgba(15,30,26,0.42)_0%,rgba(15,30,26,0.24)_100%)] py-2 shadow-[0_22px_48px_-30px_rgba(7,14,18,0.42)] backdrop-blur-[24px] md:py-2.5"
            : "py-4 md:py-7"
        }`}
      >
        <Link to="/" className="shrink-0">
          <img
            src={geLogo}
            alt="Global Edifice - The Foundation of Trust"
            className={`[filter:brightness(0)_invert(1)] transition-all duration-300 ${
              isScrolled ? "w-[104px] md:w-[138px]" : "w-[124px] md:w-[168px]"
            }`}
          />
        </Link>

        <div className="hidden items-center md:flex">
          <nav
            className={`flex items-center rounded-full font-semibold tracking-[0.14em] text-[#996317] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
              isScrolled
                ? "gap-6 border border-white/70 bg-white/84 px-5 py-2 text-[0.68rem]"
                : "gap-7 bg-white/96 px-6 py-2.5 text-[0.7rem] lg:text-[0.72rem]"
            }`}
          >
            {landingNav.map((item) => (
              <LandingNavigationLink key={item.label} item={item} />
            ))}
            <a
              href="#contact"
              className="rounded-full bg-[#b49a6c] px-4 py-1.5 text-white transition hover:bg-[#9f8658]"
            >
              ENQUIRE
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#contact"
            className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]"
          >
            ENQUIRE
          </a>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="location-mobile-nav"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur"
          >
            {isMobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      <div className={`${pageGutterClass} pb-2 md:hidden`}>
        <div
          className={`overflow-hidden rounded-[1.15rem] shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
            isScrolled
              ? "border border-white/18 bg-[linear-gradient(180deg,rgba(15,30,26,0.48)_0%,rgba(15,30,26,0.32)_100%)]"
              : "bg-white/94"
          } ${isMobileMenuOpen ? "max-h-[34rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"}
          }`}
        >
          <nav id="location-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {landingNav.map((item) =>
              item.kind === "projects-menu" ? (
                <MobileSiteProjectLinks
                  key={item.label}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              ) : (
                <LandingNavigationLink
                  key={item.label}
                  item={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-[0.95rem] px-4 py-3 text-[0.8rem] font-medium tracking-[0.16em] transition ${
                    isScrolled
                      ? "text-white hover:bg-white/10 hover:text-white"
                      : "text-[#996317] hover:bg-[#f6f1e8] hover:text-[#123a4c]"
                  }`}
                />
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function ContactSection() {
  const inputClassName =
    "mt-2 w-full rounded-[0.2rem] border border-[#e7dcca] bg-white px-4 py-3 text-[0.92rem] text-[#3d3832] outline-none placeholder:text-[#b7ab9b]";
  const labelClassName = "text-[0.72rem] font-medium text-[#6f6558]";

  return (
    <section id="contact" className="bg-[#171717]">
      <div className="relative overflow-hidden">
        <img
          src={geContactLounge}
          alt="Global Edifice contact lounge"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.86)_0%,rgba(10,10,10,0.72)_42%,rgba(10,10,10,0.46)_100%)]" />

        <div
          className={`relative mx-auto grid max-w-7xl items-center gap-10 ${pageGutterClass} py-18 md:py-24 lg:grid-cols-[minmax(0,1fr)_32rem] lg:gap-14`}
        >
          <div className="max-w-[30rem] text-white lg:pl-10">
            <h2 className="font-display text-[2.4rem] leading-[1.02] md:text-[3rem]">
              GET IN TOUCH
            </h2>
            <p className="mt-3 text-[0.98rem] leading-[1.8] text-white/76">
              We would love to hear from you
            </p>
          </div>

          <form
            className="rounded-[1.45rem] bg-[#fffdfa] p-7 text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] md:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <h3 className="font-display text-[2.2rem] leading-none text-[#1f1d1a]">Contact Us</h3>
            <p className="mt-2 text-[0.9rem] text-[#7b7369]">We would love to hear from you</p>

            <div className="mt-8 space-y-4">
              <label className="block">
                <span className={labelClassName}>Full name*</span>
                <input type="text" placeholder="Enter your full name" className={inputClassName} />
              </label>

              <label className="block">
                <span className={labelClassName}>Email address*</span>
                <input type="email" placeholder="yourname@example.com" className={inputClassName} />
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

              <label className="flex items-start gap-2 text-[0.68rem] leading-[1.65] text-[#8a7e70]">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 rounded border-[#dbcdae]" />
                <span>
                  By submitting my details, I acknowledge that I am providing my contact details to
                  Global Edifice and consent to receiving relevant communication regarding my
                  enquiry.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-[0.4rem] border border-[#c8b494] px-6 py-3 text-[0.74rem] uppercase tracking-[0.18em] text-[#7f6d53] transition hover:bg-[#f6efe3]"
            >
              SEND MESSAGE
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
}: LocationLandingPageProps) {
  return (
    <>
      <main className="bg-[#fbf8f4] text-[#163849]">
        <LandingNavigation />
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

        <section id="overview" className="bg-[#fbf8f4] py-16 md:py-20">
          <div className={pageContainerClass}>
            <h2 className="text-center font-display text-[1.5rem] leading-[1.18] text-[#a8762b] md:text-[2rem]">
              {introHeading}
            </h2>

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
        </section>

        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}
