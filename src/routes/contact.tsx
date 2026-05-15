import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import geLogo from "@/assets/shared/ge-logo.png";
import {
  MobileSiteProjectLinks,
  SiteProjectsMenu,
} from "@/components/site-resource-menu";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us - Global Edifice" },
      {
        name: "description",
        content: "Get in touch with Global Edifice. Start your journey towards finding your dream home with us.",
      },
    ],
  }),
});

const contactNav = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "projects-menu" },
  { label: "BLOGS", kind: "route", to: "/blogs" as const },
  { label: "CONTACT", kind: "route", to: "/contact" as const },
] as const;

type ContactNavItem = (typeof contactNav)[number];

const contactDetails = [
  {
    icon: MapPin,
    eyebrow: "Corporate Office",
    body: "Address: 966, 3rd Floor, 27th Main, 8th Cross Rd, 1st Sector, HSR Layout, Bangalore, Karnataka 560102",
  },
  {
    icon: Phone,
    eyebrow: "Give Us A Call",
    body: "+91 806 548 0222",
  },
  {
    icon: Mail,
    eyebrow: "Send An Email",
    body: "sales@globaledifice.in",
  },
];

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

function ContactNavigationLink({
  item,
  isScrolled,
  onNavigate,
}: {
  item: ContactNavItem;
  isScrolled: boolean;
  onNavigate?: () => void;
}) {
  const itemClassName = "transition hover:text-[#123a4c]";
  const mobileItemClassName = `block rounded-[0.95rem] px-4 py-3 text-[0.8rem] font-medium tracking-[0.16em] transition ${
    isScrolled
      ? "text-white hover:bg-white/10 hover:text-white"
      : "text-[#996317] hover:bg-[#f6f1e8] hover:text-[#123a4c]"
  }`;

  if (item.kind === "projects-menu") {
    if (onNavigate) {
      return <MobileSiteProjectLinks onNavigate={onNavigate} />;
    }
    return <SiteProjectsMenu className={itemClassName} />;
  }

  if (item.kind === "route") {
    return (
      <Link to={item.to} onClick={onNavigate} className={onNavigate ? mobileItemClassName : itemClassName}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} onClick={onNavigate} className={onNavigate ? mobileItemClassName : itemClassName}>
      {item.label}
    </a>
  );
}

function Nav() {
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
              isScrolled ? "w-[96px] md:w-[132px]" : "w-[112px] md:w-[160px]"
            }`}
          />
        </Link>

        <div className="hidden items-center md:flex">
          <nav
            className={`flex items-center rounded-full font-semibold text-[#996317] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
              isScrolled
                ? "gap-6 border border-white/70 bg-white/84 px-5 py-2 text-[0.68rem] tracking-[0.14em] lg:text-[0.72rem]"
                : "gap-9 bg-white/96 px-7 py-3 text-[0.72rem] tracking-[0.13em] lg:text-[0.76rem]"
            }`}
          >
            {contactNav.map((item) => (
              <ContactNavigationLink key={item.label} item={item} isScrolled={isScrolled} />
            ))}
            <a href="tel:+918065480222" className="hidden sm:inline-flex items-center gap-1.5 transition text-[#996317] hover:text-[#123a4c] mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-[1.1rem] w-[1.1rem]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span className="font-semibold tracking-[0.05em]">+91 806 548 0222</span></a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]">ENQUIRE</button>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]">ENQUIRE</button>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
          } ${isMobileMenuOpen ? "max-h-[34rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
        >
          <nav className="flex flex-col gap-1 px-2 py-2">
            {contactNav.map((item) => (
              <ContactNavigationLink
                key={item.label}
                item={item}
                isScrolled={isScrolled}
                onNavigate={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function ContactSection() {
  const [officeContact, phoneContact, emailContact] = contactDetails;
  const OfficeIcon = officeContact.icon;
  const PhoneIcon = phoneContact.icon;
  const EmailIcon = emailContact.icon;
  const inputLabelClassName =
    "text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/84";
  const inputFieldClassName =
    "mt-4 w-full border-b border-white/18 bg-transparent pb-4 text-[1.02rem] text-white/88 outline-none placeholder:text-white/42";

  return (
    <section id="contact" className="relative min-h-[90vh] bg-[#171717] pt-20">
      <img
        src={geContactLounge}
        alt="Global Edifice lobby lounge"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,10,0.85)_0%,rgba(11,10,10,0.72)_38%,rgba(11,10,10,0.48)_100%)]" />

      <div
        className={`relative mx-auto grid max-w-7xl items-start gap-10 ${pageGutterClass} py-18 md:py-24 lg:grid-cols-[minmax(0,1fr)_27rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_28.5rem]`}
      >
        <div className="max-w-[36rem] pt-2 text-white">
          <div className="flex items-center gap-4">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#a8762b]">
              Get In Touch
            </span>
            <span className="h-px w-8 bg-[#dbc9a7]/60" />
          </div>
          <h1 className="mt-3 max-w-[36rem] font-display text-[2.7rem] leading-[0.94] md:text-[3.1rem] lg:text-[3.25rem] xl:text-[3.8rem]">
            Start Your Journey
          </h1>

          <form
            className="mt-12 grid max-w-[33rem] gap-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <label className="block">
                <span className={inputLabelClassName}>Full Name</span>
                <input type="text" placeholder="John Doe" className={inputFieldClassName} />
              </label>
              <label className="block">
                <span className={inputLabelClassName}>Mobile Number</span>
                <input type="tel" placeholder="+91 98765 43210" className={inputFieldClassName} />
              </label>
            </div>

            <label className="block">
              <span className={inputLabelClassName}>Email Address</span>
              <input
                type="email"
                placeholder="john@example.com"
                className={inputFieldClassName}
              />
            </label>

            <label className="block">
              <span className={inputLabelClassName}>Project Of Interest</span>
              <span className="mt-4 flex items-center justify-between border-b border-white/18 pb-4 text-[1.02rem] text-white/74">
                <span>Global Edifice Orlean</span>
                <ChevronDown className="h-4 w-4 text-[#d7bd8b]" />
              </span>
            </label>

            <label className="block">
              <span className={inputLabelClassName}>Your Message</span>
              <textarea
                rows={2}
                placeholder="Tell us about your dream home"
                className={`${inputFieldClassName} resize-none`}
              />
            </label>

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-3 rounded-[0.8rem] bg-[#0f4157] px-8 py-4 text-[0.8rem] uppercase tracking-[0.22em] text-white transition hover:bg-[#164f69]"
              >
                Submit Enquiry
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </form>
        </div>

        <aside className="rounded-[1.9rem] bg-[#fcfaf7] p-8 text-[#2a2825] shadow-[0_35px_85px_-54px_rgba(0,0,0,0.48)] md:p-10 lg:justify-self-end w-full">
          <h3 className="font-display text-[2.15rem] leading-none text-[#1f1d1b] md:text-[2.3rem]">
            Contact Us
          </h3>

          <div className="mt-8 border-b border-[#ece2d4] pb-6">
            <h4 className="font-display text-[1.45rem] leading-none text-[#a8762b] md:text-[1.6rem]">
              {officeContact.eyebrow}
            </h4>
            <div className="mt-5 grid grid-cols-[2.6rem_1fr] gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b79a69]/14 text-[#a8762b]">
                <OfficeIcon className="h-[1.18rem] w-[1.18rem] stroke-[2.25]" />
              </span>
              <p className="text-[1rem] leading-[1.75] text-[#6b655d]">{officeContact.body}</p>
            </div>
          </div>

          <div className="grid grid-cols-[2.6rem_1fr] gap-4 border-b border-[#ece2d4] py-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b79a69]/14 text-[#a8762b]">
              <PhoneIcon className="h-5 w-5 stroke-[2.2]" />
            </span>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b48b50]">
                {phoneContact.eyebrow}
              </p>
              <p className="mt-3 text-[1rem] leading-[1.65] text-[#6b655d]">
                {phoneContact.body}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[2.6rem_1fr] gap-4 border-b border-[#ece2d4] py-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b79a69]/14 text-[#a8762b]">
              <EmailIcon className="h-[1.12rem] w-[1.12rem] stroke-[2.15]" />
            </span>
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#b48b50]">
                {emailContact.eyebrow}
              </p>
              <p className="mt-3 text-[1rem] leading-[1.65] text-[#6b655d]">
                {emailContact.body}
              </p>
            </div>
          </div>

          <div className="pt-6">
            <h4 className="font-display text-[1.75rem] leading-none text-[#a8762b]">
              Follow Our Journey
            </h4>
            <div className="mt-5 flex items-center gap-3 text-[#a8762b]">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b79a69]/14 text-[#a8762b] transition hover:bg-[#0f4157] hover:text-white"
              >
                <Facebook className="h-4.5 w-4.5 fill-current stroke-0" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b79a69]/14 text-[#a8762b] transition hover:bg-[#0f4157] hover:text-white"
              >
                <Instagram className="h-4.5 w-4.5 stroke-[2.1]" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b79a69]/14 text-[#a8762b] transition hover:bg-[#0f4157] hover:text-white"
              >
                <Linkedin className="h-4.5 w-4.5 fill-current stroke-0" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <main className="min-h-screen bg-[#171717]">
      <Nav />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
