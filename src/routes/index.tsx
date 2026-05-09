import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  Star,
  X,
} from "lucide-react";
import geHero from "@/assets/home/ge-hero.png";
import geStoryBalcony from "@/assets/home/ge-story-balcony.jpg";
import geAmenityGardens from "@/assets/home/ge-amenity-gardens.jpg";
import geAmenityJogging from "@/assets/home/ge-amenity-jogging.png";
import geAmenityYoga from "@/assets/home/ge-amenity-yoga.png";
import geProjectRender from "@/assets/shared/ge-project-render.jpg";
import projectOrlean from "@/assets/projects/orlean/project-orlean-layer10.jpg";
import projectLegacy from "@/assets/projects/legacy/project-legacy.jpg";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import geLogo from "@/assets/shared/ge-logo.png";
import iconIntegrity from "@/assets/home/icon-integrity.png";
import iconDelivery from "@/assets/home/icon-delivery.png";
import iconRera from "@/assets/home/icon-rera.png";
import iconValue from "@/assets/home/icon-value.png";
import {
  MobileSiteProjectLinks,
  MobileSiteResourceLinks,
  SiteProjectsMenu,
  SiteResourceMenu,
} from "@/components/site-resource-menu";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Global Edifice - The Foundation of Trust" },
      {
        name: "description",
        content:
          "Global Edifice crafts premium residences in Bangalore with thoughtful design, strong delivery discipline, and lasting value.",
      },
    ],
  }),
});

const navLinks = [
  { label: "HOME", kind: "href", href: "/#home" },
  { label: "ABOUT US", kind: "href", href: "/about" },
  { label: "PROJECTS", kind: "projects-menu" },
  { label: "RESOURCES", kind: "resources-menu" },
  { label: "CONTACT", kind: "href", href: "/#contact" },
];

type HomeNavItem = (typeof navLinks)[number];

const promiseItems = [
  { icon: iconIntegrity, label: "Architectural Integrity", lines: ["Architectural", "Integrity"] },
  { icon: iconDelivery, label: "On-Time Delivery", lines: ["On-Time", "Delivery"] },
  { icon: iconRera, label: "RERA Compliance", lines: ["RERA", "Compliance"] },
  { icon: iconValue, label: "Long-Term Value", lines: ["Long-Term", "Value"] },
];

const portfolioProjects = [
  {
    name: "GLOBAL EDIFICE ORLEAN",
    price: "76 LAKHS*",
    location: "OFF. CHANDAPURA ROAD, BANGALORE",
    unitLabel: "2BHK RESIDENCES",
    image: projectOrlean,
    alt: "Global Edifice Orlean",
    detailHref: "/projects/orlean",
  },
  {
    name: "GLOBAL EDIFICE THE CLAN",
    price: "76 LAKHS*",
    location: "BAGALUR - SARJAPURA, BANGALORE",
    unitLabel: "2BHK RESIDENCES",
    image: geProjectRender,
    alt: "Global Edifice The Clan",
    detailHref: "/projects/the-clan",
  },
  {
    name: "GLOBAL EDIFICE LEGACY",
    price: "62 LAKHS*",
    location: "OFF. CHANDAPURA ROAD, BANGALORE",
    unitLabel: "2BHK RESIDENCES",
    image: projectLegacy,
    alt: "Global Edifice Legacy",
    detailHref: "/projects",
  },
];

const amenities = [
  {
    title: "LANDSCAPED GARDENS",
    description:
      "Curated green spaces with walking paths, seating areas, and native plantings for daily wellness and quiet community time.",
    image: geAmenityGardens,
  },
  {
    title: "JOGGING TRACK",
    description:
      "An 800m anti-skid running loop designed for early starts, evening cooldowns, and everyday movement within the community.",
    image: geAmenityJogging,
  },
  {
    title: "YOGA & MEDITATION DECK",
    description:
      "Open-air deck space framed by planting and warm light, built for morning practice and slower restorative routines.",
    image: geAmenityYoga,
  },
];

const testimonials = [
  {
    name: "Arun & Priya Narayan",
    role: "Home Owner Orlean",
    quote:
      "From the moment we visited Orlean, we knew this was home. The attention to detail and thoughtful planning make it a standout choice for anyone looking for a premium lifestyle.",
  },
  {
    name: "Rajendra Swami",
    role: "Home Owner Orlean",
    quote:
      "My very first real estate investment, my first home was at Global Edifice Green Apple Hikes. I believe that I have made the right choice as they had helped me understand about the location and its value clearly.",
  },
  {
    name: "Haridas Nair",
    role: "Home Owner Orlean",
    quote:
      "Legacy truly lives up to its name. The sophisticated architecture, spacious layouts, and top-tier amenities make it a dream home for us.",
  },
];

const contactDetails = [
  {
    icon: MapPin,
    eyebrow: "Corporate Office",
    body: "Address: 966, 3rd Floor, 27th Main, 8th Cross Rd, 1st Sector, HSR Layout, Bangalore, Karnataka 560102",
  },
  {
    icon: Phone,
    eyebrow: "Give Us A Call",
    body: "+91 80 4376 0152",
  },
  {
    icon: Mail,
    eyebrow: "Send An Email",
    body: "sales@globaledifice.in",
  },
];

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;
const tealContourBackgroundStyle = {
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.01)), repeating-radial-gradient(ellipse 135% 120% at -12% 50%, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 28px)",
};

function SectionHeading({
  eyebrow,
  title,
  titleClassName = "text-[#1d1d1d]",
}: {
  eyebrow: string;
  title: string;
  titleClassName?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#a8762b]">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-[#dbc9a7]/70" />
      </div>
      <h2
        className={`mt-3 font-display text-[2.5rem] leading-[0.95] md:text-[3.4rem] ${titleClassName}`}
      >
        {title}
      </h2>
    </div>
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

  const itemClassName = "transition hover:text-[#123a4c]";

  const renderDesktopNavItem = (item: HomeNavItem) => {
    if (item.kind === "projects-menu") {
      return <SiteProjectsMenu key={item.label} className={itemClassName} />;
    }

    if (item.kind === "resources-menu") {
      return <SiteResourceMenu key={item.label} className={itemClassName} />;
    }

    return (
      <a key={item.label} href={item.href} className={itemClassName}>
        {item.label}
      </a>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 ${pageGutterClass} transition-all duration-300 md:gap-6 ${
          isScrolled
            ? "mt-2 rounded-[1.75rem] border border-white/18 bg-[linear-gradient(180deg,rgba(15,30,26,0.42)_0%,rgba(15,30,26,0.24)_100%)] py-2 shadow-[0_22px_48px_-30px_rgba(7,14,18,0.42)] backdrop-blur-[24px] md:py-2.5"
            : "py-4 md:py-7"
        }`}
      >
        <a href="/#home" className="shrink-0">
          <img
            src={geLogo}
            alt="Global Edifice - The Foundation of Trust"
            className={`[filter:brightness(0)_invert(1)] transition-all duration-300 ${
              isScrolled ? "w-[96px] md:w-[132px]" : "w-[112px] md:w-[160px]"
            }`}
          />
        </a>

        <div className="hidden items-center md:flex">
          <nav
            className={`flex items-center rounded-full font-semibold text-[#996317] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
              isScrolled
                ? "gap-6 border border-white/70 bg-white/84 px-5 py-2 text-[0.68rem] tracking-[0.14em] lg:text-[0.72rem]"
                : "gap-9 bg-white/96 px-7 py-3 text-[0.72rem] tracking-[0.13em] lg:text-[0.76rem]"
            }`}
          >
            {navLinks.map(renderDesktopNavItem)}
            <a
              href="/#contact"
              className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]"
            >
              ENQUIRE
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/#contact"
            className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]"
          >
            ENQUIRE
          </a>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="index-mobile-nav"
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
          <nav id="index-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {navLinks.map((item) =>
              item.kind === "projects-menu" ? (
                <MobileSiteProjectLinks
                  key={item.label}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              ) : item.kind === "resources-menu" ? (
                <MobileSiteResourceLinks
                  key={item.label}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-[0.95rem] px-4 py-3 text-[0.8rem] font-medium tracking-[0.16em] transition ${
                    isScrolled
                      ? "text-white hover:bg-white/10 hover:text-white"
                      : "text-[#996317] hover:bg-[#f6f1e8] hover:text-[#123a4c]"
                  }`}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[44rem] overflow-hidden bg-[#17394a] text-white md:min-h-screen"
    >
      <img
        src={geHero}
        alt="Luxury Global Edifice residence"
        className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[25%_center] md:object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,28,38,0.18)_0%,rgba(14,29,37,0.16)_30%,rgba(16,23,28,0.54)_68%,rgba(13,17,20,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,22,0.28)_0%,rgba(8,15,22,0.02)_38%,rgba(8,15,22,0.64)_100%)]" />

      <div
        className={`relative mx-auto grid min-h-[44rem] max-w-7xl grid-rows-[1fr_auto] ${pageGutterClass} pb-12 pt-28 sm:pb-14 sm:pt-32 md:min-h-screen md:pb-18 md:pt-40 lg:pt-44`}
      >
        <div className="grid items-center lg:grid-cols-[1fr_31rem] xl:grid-cols-[1fr_34rem]">
          <div className="hidden lg:block" />
          <div className="w-full max-w-[18rem] justify-self-start text-left sm:max-w-[24rem] md:max-w-none md:justify-self-end md:text-right lg:mr-2 xl:mr-4">
            <h1 className="font-display font-normal [font-synthesis:none] text-[2.25rem] leading-[0.94] tracking-[-0.02em] text-white sm:text-[2.9rem] md:text-[4rem] lg:text-[3.7rem] xl:text-[4.15rem]">
              <span className="block lg:whitespace-nowrap">WE DON'T</span>
              <span className="block lg:whitespace-nowrap">JUST BUILD,</span>
              <span className="block lg:whitespace-nowrap">WE REDEFINE</span>
              <span className="block lg:whitespace-nowrap">LIVING</span>
            </h1>
          </div>
        </div>

        <div className="grid gap-5 pt-6 lg:-translate-y-[3rem] xl:-translate-y-[3.35rem] lg:grid-cols-[auto_31rem] xl:grid-cols-[auto_34rem] lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="/projects"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0a2735] px-6 py-3.5 text-[0.92rem] text-white shadow-[0_15px_35px_-25px_rgba(0,0,0,0.8)] transition hover:bg-[#0f3344] sm:w-auto sm:px-7 sm:text-[0.95rem]"
            >
              Explore residences
            </a>
            <a
              href="/#contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/45 bg-transparent px-6 py-3.5 text-[0.92rem] text-white/96 backdrop-blur-sm transition hover:bg-white/10 sm:w-auto sm:px-7 sm:text-[0.95rem]"
            >
              Schedule a site visit
            </a>
          </div>

          <p className="max-w-[22rem] text-[0.95rem] font-light leading-[1.65] text-white/88 sm:max-w-[30rem] md:text-base lg:justify-self-end lg:text-right lg:text-[1rem] xl:text-[1.05rem]">
            A boutique studio of architects and craftsmen, sculpting premium mid-rise residences
            where every detail is deliberate, and every home endures.
          </p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="about" className="overflow-hidden bg-[#fbf8f4] py-20 md:py-28 lg:py-32">
      <div
        className="grid items-start gap-14 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,36rem)_minmax(0,1fr)] xl:gap-14"
        style={{ paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.125rem))" }}
      >
        <div className="pr-6 md:pr-10 lg:pr-0 lg:pt-6 xl:pt-8">
          <div className="mx-auto max-w-[34rem] lg:mx-0 xl:max-w-[35rem]">
            <div className="flex items-center gap-4">
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-[#cdb58d]">
                Our Story
              </span>
              <span className="h-px w-11 bg-[#e6dbc8]" />
            </div>

            <h2 className="mt-5 font-display text-[2.2rem] leading-[0.98] tracking-[-0.018em] text-[#1f1d1a] sm:text-[2.95rem] md:text-[3.05rem] lg:text-[2.6rem] lg:whitespace-nowrap xl:text-[2.72rem]">
              The Global Edifice Promise
            </h2>

            <h3 className="mt-10 text-[1.16rem] font-medium uppercase leading-[1.32] tracking-[0.12em] text-[#c0a56e] sm:text-[1.3rem] md:text-[1.56rem] lg:mt-10 lg:text-[1.64rem] xl:text-[1.72rem]">
              <span className="block sm:whitespace-nowrap">Building Legacies,</span>
              <span className="block sm:whitespace-nowrap">Not Just Homes</span>
            </h3>

            <div className="mt-9 max-w-[32.5rem] space-y-5 text-[0.97rem] leading-[1.8] text-[#7a756e] md:text-[1rem] lg:mt-8 lg:max-w-[33.5rem]">
              <p>
                Global Edifice was founded on a singular belief - that a home is the most important
                investment a family will ever make. Since our inception, we have delivered
                thoughtfully designed residential communities across Bangalore's most sought-after
                corridors.
              </p>
              <p>
                From compact apartments built for young professionals in Chandapura to spacious
                villas designed for multi-generational families in HSR Layout, every Global Edifice
                home reflects our uncompromising commitment to structural integrity, aesthetic
                excellence, and on-time delivery.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-x-0 lg:max-w-[34rem] xl:max-w-[35rem]">
              {promiseItems.map((item, index) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center sm:px-3 md:px-4"
                >
                  <img src={item.icon} alt={item.label} className="h-10 w-10 object-contain" />

                  <div
                    className={`mt-4 flex min-h-[3.75rem] w-full items-start justify-center ${
                      index < promiseItems.length - 1 ? "sm:border-r sm:border-[#ece1d0]" : ""
                    }`}
                  >
                    <span className="px-4 text-[0.82rem] leading-[1.18] text-[#67635d] md:px-5 md:text-[0.88rem]">
                      <span className="block whitespace-nowrap">{item.lines[0]}</span>
                      <span className="block whitespace-nowrap">{item.lines[1]}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="-ml-[1.125rem] w-full overflow-hidden bg-[#e6ddd1] md:-ml-[1.125rem] lg:-my-6 lg:ml-0 lg:justify-self-end xl:-my-7">
          <img
            src={geStoryBalcony}
            alt="Curved balcony overlooking the city"
            className="h-[24rem] w-full object-cover object-center md:h-[38rem] lg:h-[45rem] xl:h-[47rem]"
          />
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-[#fffdfa] py-20 md:py-24">
      <div className={pageContainerClass}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,29rem)] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#a8762b]">
                Portfolio
              </span>
              <span className="h-px w-8 bg-[#dbc9a7]/70" />
            </div>
            <h2 className="mt-3 font-display text-[2.55rem] leading-[0.96] text-[#1d1d1d] md:text-[3.1rem] lg:text-[3.25rem]">
              Our Projects
            </h2>
          </div>

          <div className="border-y border-[#eadfcc] px-3 py-4 md:px-8">
            <div className="flex flex-wrap items-center justify-start gap-4 text-[0.9rem] font-semibold uppercase tracking-[0.22em] text-[#a8762b] md:justify-center md:gap-7">
              <span>All</span>
              <span className="text-[#dbc9a7]">|</span>
              <span>Ongoing</span>
              <span className="text-[#dbc9a7]">|</span>
              <span>Completed</span>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project) => (
            <article
              key={project.name}
              className="overflow-hidden rounded-[1.2rem] border border-[#eadfcc] bg-[#fffdfa] shadow-[0_22px_40px_-34px_rgba(40,32,23,0.26)]"
            >
              <img
                src={project.image}
                alt={project.alt}
                className="h-[12.5rem] w-full object-cover object-center md:h-[13rem]"
              />

              <div className="flex h-full flex-col p-4 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[9.4rem] text-[1.12rem] font-medium uppercase leading-[1.08] text-[#344247] md:text-[1.18rem]">
                    {project.name}
                  </h3>

                  <div className="pt-1 text-right text-[#a8762b]">
                    <p className="text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-[#b48b50]">
                      Starting From
                    </p>
                    <p className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.02em]">
                      {project.price}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[0.64rem] uppercase tracking-[0.02em] text-[#b3a89b]">
                  {project.location}
                </p>

                <div className="mt-10 flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.04em] text-[#38454a]">
                  <span>{project.unitLabel}</span>
                  <span className="h-px flex-1 bg-[#eadfcc]" />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#b49a6c] px-4 py-3 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#9f8658]"
                  >
                    Book A Site Visit
                  </a>
                  <a
                    href={project.detailHref}
                    className="inline-flex items-center justify-center rounded-full border border-[#eadfcc] px-4 py-3 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-[#4f5960] transition hover:border-[#d6c3a3] hover:text-[#123a4c]"
                  >
                    Know More
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Amenities() {
  return (
    <section
      id="amenities"
      className="overflow-hidden bg-[#0f4157] py-20 text-white md:py-24"
      style={tealContourBackgroundStyle}
    >
      <div className={pageContainerClass}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="What We Offer"
            title="Crafted Amenities"
            titleClassName="text-[#c5a46e]"
          />

          <div className="flex flex-wrap items-center gap-4 border-y border-white/16 py-4 text-[0.82rem] uppercase tracking-[0.2em] text-[#c5a46e] md:gap-6 md:px-5">
            <span>Wellness</span>
            <span className="text-white/18">|</span>
            <span>Recreation</span>
            <span className="text-white/18">|</span>
            <span>Convenience</span>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {amenities.map((item) => (
            <article key={item.title} className="max-w-[22rem]">
              <div className="overflow-hidden rounded-[1.5rem] bg-white/5 shadow-[0_20px_50px_-38px_rgba(0,0,0,0.55)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[15.5rem] w-full object-cover"
                />
              </div>
              <h3 className="mt-7 text-[1.02rem] uppercase tracking-[0.2em] text-[#c5a46e]">
                {item.title}
              </h3>
              <p className="mt-3 text-[1rem] leading-[1.6] text-white/78">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#fbf8f4] py-20 md:py-24">
      <div className={pageContainerClass}>
        <SectionHeading
          eyebrow="Testimonials"
          title="Success Stories"
          titleClassName="text-[#1d1d1d] text-[2.35rem] md:text-[3.05rem]"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="relative flex h-full flex-col rounded-[1.55rem] border border-[#eadcca] bg-[#fcfaf7] px-6 py-7 shadow-[0_18px_42px_-40px_rgba(48,37,18,0.2)] md:px-7 md:py-8"
            >
              <div className="flex items-center gap-1 text-[#a8762b]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="absolute right-6 top-4 font-display text-[4.8rem] leading-none text-[#efe4d4] md:right-7 md:top-5 md:text-[5.2rem]">
                ”
              </div>
              <p className="relative mt-8 text-[0.99rem] italic leading-[1.9] text-[#76726d]">
                {item.quote}
              </p>
              <div className="mt-auto pt-7">
                <h3 className="font-display text-[1.3rem] leading-none text-[#a8762b] md:text-[1.38rem]">
                  {item.name}
                </h3>
                <p className="mt-2 text-[0.92rem] italic text-[#8b8377]">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [officeContact, phoneContact, emailContact] = contactDetails;
  const OfficeIcon = officeContact.icon;
  const PhoneIcon = phoneContact.icon;
  const EmailIcon = emailContact.icon;
  const inputLabelClassName =
    "text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/84";
  const inputFieldClassName =
    "mt-4 w-full border-b border-white/18 bg-transparent pb-4 text-[1.02rem] text-white/88 outline-none placeholder:text-white/42";

  return (
    <section id="contact" className="bg-[#fbf8f4] pb-0">
      <div className="relative overflow-hidden bg-[#171717]">
        <img
          src={geContactLounge}
          alt="Global Edifice lobby lounge"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,10,10,0.78)_0%,rgba(11,10,10,0.64)_38%,rgba(11,10,10,0.36)_100%)]" />

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
            <h2 className="mt-3 max-w-[36rem] font-display text-[2.7rem] leading-[0.94] md:text-[3.1rem] lg:text-[3.25rem] xl:text-[3.35rem]">
              Start Your Journey
            </h2>

            <form
              className="mt-10 grid max-w-[33rem] gap-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-6 md:grid-cols-2">
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

              <div className="pt-2">
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

          <aside className="rounded-[1.9rem] bg-[#fcfaf7] p-8 text-[#2a2825] shadow-[0_35px_85px_-54px_rgba(0,0,0,0.48)] md:p-10 lg:justify-self-end">
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
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-[#fbf8f4]">
      <Nav />
      <Hero />
      <Story />
      <Projects />
      <Amenities />
      <Testimonials />
      <Contact />
      <SiteFooter />
    </main>
  );
}
