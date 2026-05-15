import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Download, Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import geLogo from "@/assets/shared/ge-logo.png";
import clanGalleryPergolaWalkway from "@/assets/projects/the-clan/clan-gallery-pergola-walkway.jpg";
import clanGalleryPoolCourt from "@/assets/projects/the-clan/clan-gallery-pool-court.jpg";
import clanGallerySculptureCourt from "@/assets/projects/the-clan/clan-gallery-sculpture-court.jpg";
import theClanLogoGreen from "@/assets/projects/the-clan/Clan-Logo-Green.png";
import theClanBanner from "@/assets/projects/the-clan/The-clan-project.png";
import clanFloorplan205Image from "@/assets/projects/the-clan/clan-floorplan-205.png";
import creamBackgroundImage from "@/assets/projects/the-clan/Cream BG.png";
import connectivityMapImage from "@/assets/projects/the-clan/map.png";
import greenBackgroundImage from "@/assets/projects/the-clan/Green BG.jpg";
import masterPlanImage from "@/assets/projects/the-clan/master-plan.png";
import theClanHall from "@/assets/projects/the-clan/the-clan-hall.png";
import {
  MobileSiteProjectLinks,
  SiteProjectsMenu,
} from "@/components/site-resource-menu";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CLAN_TITLE = "The Clan - Global Edifice";
const CLAN_DESCRIPTION =
  "Discover The Clan, a Global Edifice signature residence in Bagalur-Sarjapura with curated amenities, elegant planning, and community-led living.";

export const Route = createFileRoute("/projects_/the-clan")({
  component: TheClanPage,
  head: () => ({
    meta: [{ title: CLAN_TITLE }, { name: "description", content: CLAN_DESCRIPTION }],
  }),
});

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const galleryImageModules = import.meta.glob(
  "../assets/projects/the-clan/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const duplicateGalleryFiles = new Set(["10-gallery-10.jpg", "26-gallery-26.jpg"]);

const detailNav = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "projects-menu" },
  { label: "BLOGS", kind: "route", to: "/blogs" as const },
  { label: "CONTACT", kind: "route", to: "/contact" as const },
] as const;

type DetailNavItem = (typeof detailNav)[number];
type PlanMode = "masterplan" | "floorplan";

const heroStats = [
  { label: "Typology", value: "2 & 3 Bed", detail: "Signature residences" },
  { label: "Price", value: "Starting", detail: "From 76 Lakhs*" },
  { label: "Location", value: "Bagalur-Sarjapura,", detail: "Bangalore" },
  {
    label: "RERA",
    value: "RERA NO.: PRM/KA/RERA/1251/308/PR/071221/007275",
    detail: "",
  },
] as const;

const metrics = [
  { value: "257", label: "Signature Residences" },
  { value: "3.5 Acres", label: "Land Area" },
  { value: "G+9", label: "Floor Structure" },
] as const;

const amenitySlides = [
  {
    title: "Sculpture Court",
    description:
      "A resort-like pool edge with lounge seating, landscaped surrounds, and an elevated leisure atmosphere built into everyday life.",
    image: clanGallerySculptureCourt,
    alt: "The Clan sculpture court",
  },
  {
    title: "Pergola Walkway",
    description:
      "Greener edges, shaded walking paths, and planted pockets that soften daily movement throughout the community.",
    image: clanGalleryPergolaWalkway,
    alt: "The Clan pergola walkway",
  },
  {
    title: "Pool Court",
    description:
      "A calmer promenade edge with sheltered seating, planted borders, and slower moments built into the arrival experience.",
    image: clanGalleryPoolCourt,
    alt: "The Clan pool court",
  },
] as const;

const galleryImages = Object.entries(galleryImageModules)
  .sort(([leftPath], [rightPath]) =>
    leftPath.localeCompare(rightPath, undefined, { numeric: true }),
  )
  .filter(([filePath]) => !duplicateGalleryFiles.has(filePath.split("/").pop() ?? ""))
  .map(([, image], index) => ({
    title: `Gallery ${String(index + 1).padStart(2, "0")}`,
    image,
    alt: `The Clan gallery image ${index + 1}`,
  }));

function getGalleryOffset(index: number, activeIndex: number, total: number) {
  const half = Math.floor(total / 2);
  let offset = index - activeIndex;

  if (offset > half) {
    offset -= total;
  }

  if (offset < -half) {
    offset += total;
  }

  return offset;
}

function getGallerySlotStyles(offset: number) {
  switch (offset) {
    case -2:
      return {
        container: "hidden md:block md:top-0 md:bottom-0 md:left-0 md:w-[19.2%]",
        frame: "opacity-40",
        image: "blur-[3px] saturate-[0.82]",
      };
    case -1:
      return {
        container: "hidden md:block md:top-0 md:bottom-0 md:left-[20.2%] md:w-[19.2%]",
        frame: "opacity-100",
        image: "blur-0 saturate-100",
      };
    case 0:
      return {
        container: "left-0 top-0 bottom-0 w-full md:left-[40.4%] md:w-[19.2%]",
        frame: "opacity-100",
        image: "blur-0 saturate-100",
      };
    case 1:
      return {
        container: "hidden md:block md:top-0 md:bottom-0 md:left-[60.6%] md:w-[19.2%]",
        frame: "opacity-100",
        image: "blur-0 saturate-100",
      };
    case 2:
      return {
        container: "hidden md:block md:top-0 md:bottom-0 md:left-[80.8%] md:w-[19.2%]",
        frame: "opacity-40",
        image: "blur-[3px] saturate-[0.82]",
      };
    default:
      return null;
  }
}

const connectivityGroups = [
  {
    id: "institutes",
    label: "Institutes",
    items: [
      "Azim Premji University (3 Km)",
      "Endevour International School (5 Km)",
      "Champion International School (5 Km)",
      "Wellsprings Academy (5 Km)",
      "Vartika Montessori School (5 Km)",
      "Cambridge Innovative School (5 Km)",
      "Greenwood High Sarjapur (8 Km)",
      "TISB Academy School (9 Km)",
      "Oakridge International School (9 Km)",
      "Delhi Public School (DPS) (10 Km)",
      "Christ College of Science and Management (15 Km)",
    ],
  },
  {
    id: "it-companies",
    label: "IT Companies",
    items: [
      "Infosys Head Quarter (2 Km)",
      "Wipro (11 Km)",
      "RGA Tech Park (13 Km)",
      "Vaishnavi Tech Park (16 Km)",
      "RMZ Ecoworld (17 Km)",
      "TCS 360 Business Park (26 Km)",
    ],
  },
  {
    id: "hospitals",
    label: "Hospitals",
    items: [
      "Spandana Hospital (3 Km)",
      "Swastik Hospital (7 Km)",
      "Sparsh Hospital (8 Km)",
      "Natus Women & Children Hospital (12 Km)",
      "Mother Hood Hospital (16 Km)",
      "Manipal Hospital (17 Km)",
      "Narayana Multispeciality Hospital (21 Km)",
    ],
  },
  {
    id: "shopping",
    label: "Shopping",
    items: ["D-Mart (2 Km)", "Forum The Prestige City (5 Km)"],
  },
] as const;

const faqItems = [
  {
    id: "faq-1",
    question: "What is the starting price for homes at The Clan?",
    answer:
      "The Clan starts from 76 lakhs* for its signature residences. Final pricing varies by unit configuration, floor, and current inventory.",
  },
  {
    id: "faq-2",
    question: "What typologies are available at The Clan?",
    answer:
      "The project is positioned around 2 and 3 bed signature residences with a stronger focus on natural light, usable balconies, and efficient internal planning.",
  },
  {
    id: "faq-3",
    question: "Where is The Clan located in Bangalore?",
    answer:
      "The Clan is situated in the Bagalur-Sarjapura growth corridor, giving residents a quieter residential setting with improving access to North and East Bangalore destinations.",
  },
  {
    id: "faq-4",
    question: "What amenities are planned within the community?",
    answer:
      "The plan includes landscaped greens, a hospitality-led arrival experience, curated leisure spaces, and everyday wellness amenities designed around community living.",
  },
  {
    id: "faq-5",
    question: "Can I request a brochure or schedule a site visit?",
    answer:
      "Yes. Use the brochure and enquiry links on the project pages to request current details, pricing, and a guided site visit from the sales team.",
  },
  {
    id: "faq-6",
    question: "Does Global Edifice support buyers after handover?",
    answer:
      "Global Edifice positions its developments around long-term ownership value, which includes support across handover coordination, documentation, and community transition.",
  },
] as const;

function DetailNavigationLink({
  item,
  className = "transition hover:text-[#123a4c]",
  onClick,
}: {
  item: DetailNavItem;
  className?: string;
  onClick?: () => void;
}) {
  if (item.kind === "projects-menu") {
    return <SiteProjectsMenu className={className} />;
  }


  if (item.kind === "routeHash") {
    return (
      <Link to={item.to} hash={item.hash} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }

  return (
    <Link to={item.to} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

function ProjectDetailNav() {
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
            className={`flex items-center rounded-full font-semibold tracking-[0.14em] text-[#996317] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
              isScrolled
                ? "gap-6 border border-white/70 bg-white/84 px-5 py-2 text-[0.68rem]"
                : "gap-9 bg-white/96 px-7 py-3 text-[0.72rem] tracking-[0.13em] lg:text-[0.76rem]"
            }`}
          >
            {detailNav.map((item) => (
              <DetailNavigationLink key={item.label} item={item} />
            ))}
            <a href="tel:+918065480222" className="hidden sm:inline-flex items-center gap-1.5 transition text-[#996317] hover:text-[#123a4c] mx-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-[1.1rem] w-[1.1rem]"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span className="font-semibold tracking-[0.05em]">+91 806 548 0222</span></a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-4 py-1.5 text-white transition hover:bg-[#9f8658]">
              ENQUIRE
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]">
            ENQUIRE
          </button>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="clan-mobile-nav"
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
          <nav id="clan-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {detailNav.map((item) =>
              item.kind === "projects-menu" ? (
                <MobileSiteProjectLinks
                  key={item.label}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              ) : (
                <DetailNavigationLink
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

function useClanMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute("content") ?? null;

    document.title = CLAN_TITLE;

    let metaElement = existingDescription;

    if (!metaElement) {
      metaElement = document.createElement("meta");
      metaElement.setAttribute("name", "description");
      document.head.appendChild(metaElement);
    }

    metaElement.setAttribute("content", CLAN_DESCRIPTION);

    return () => {
      document.title = previousTitle;

      if (existingDescription) {
        if (previousDescription === null) {
          existingDescription.removeAttribute("content");
        } else {
          existingDescription.setAttribute("content", previousDescription);
        }
      } else {
        metaElement?.remove();
      }
    };
  }, []);
}

function ClanWordmark() {
  return (
    <img
      src={theClanLogoGreen}
      alt="The Clan"
      className="h-auto w-[10.5rem] max-w-full sm:w-[12rem] md:w-[13.5rem] lg:w-[15rem]"
    />
  );
}

function HeroSection() {
  return (
    <section className="relative isolate min-h-[44rem] overflow-hidden bg-[#1b2530] text-white md:min-h-screen">
      <img
        src={theClanBanner}
        alt="The Clan hero residence"
        className="absolute inset-0 h-full w-full object-cover object-[48%_34%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,15,22,0.12)_0%,rgba(9,15,22,0.08)_34%,rgba(9,15,22,0.76)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,15,22,0.04)_0%,rgba(9,15,22,0.02)_30%,rgba(9,15,22,0.3)_68%,rgba(9,15,22,0.48)_100%)]" />

      <div
        className={`relative mx-auto flex min-h-[44rem] max-w-7xl items-end justify-center ${pageGutterClass} pb-[10rem] pt-24 md:min-h-screen md:pb-[12.5rem] md:pt-32 lg:pb-[13rem]`}
      >
        <div className="mx-auto max-w-[46rem] text-center md:max-w-[56rem] lg:max-w-[60rem]">
          <h1 className="font-display font-normal uppercase [font-synthesis:none] text-[1.95rem] leading-[0.94] tracking-[0.015em] text-white sm:text-[2.25rem] md:text-[2.65rem] lg:text-[2.85rem] xl:text-[3.05rem]">
            <span className="block">Step Into A World Where</span>
            <span className="block">Luxury Feels Like Belonging.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function HeroStatStrip() {
  return (
    <section className="relative z-10 -mt-26 bg-transparent md:-mt-48">
      <div className={pageContainerClass}>
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-[0.8rem] border border-[#e8dbc6] bg-[#e8dbc6] shadow-[0_24px_42px_-36px_rgba(51,38,18,0.35)] md:grid-cols-[1fr_0.78fr_1.08fr_1.9fr]">
          {heroStats.map((item) => (
            <div key={item.label} className="bg-[#fbf7f0] px-5 py-4 text-center md:px-6 md:py-5">
              <p className="text-[1.05rem] font-semibold uppercase tracking-[0.28em] text-[#a8762b] md:text-[1.1rem]">
                {item.label}
              </p>
              <p
                className={`mt-4 font-medium text-[#292521] ${
                  item.label === "RERA"
                    ? "text-[0.68rem] leading-[1.55] md:text-[0.76rem]"
                    : item.label === "Location"
                      ? "text-[0.92rem] leading-[1.3] md:text-[1rem]"
                      : "text-[1.02rem] md:text-[1.12rem]"
                }`}
              >
                {item.value}
              </p>
              {item.detail ? (
                <p className="mt-1 text-[0.76rem] leading-[1.4] text-[#7b7469] md:text-[0.8rem]">
                  {item.detail}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="bg-[#fbf8f3] pb-18 pt-18 md:pb-22 md:pt-20">
      <div
        className={`${pageContainerClass} grid gap-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(20rem,0.94fr)] lg:items-start`}
      >
        <div className="-mx-[1.125rem] overflow-hidden rounded-[0.3rem] shadow-[0_24px_45px_-38px_rgba(0,0,0,0.28)] md:-mx-[1.8rem] lg:mx-0 lg:h-[38.5rem] lg:-ml-[1.8rem] xl:h-[39rem] xl:-ml-[calc((100vw-80rem)/2+1.8rem)]">
          <img
            src={theClanHall}
            alt="The Clan living hall interior"
            className="h-[22rem] w-full object-cover object-center md:h-[28rem] lg:h-full"
          />
        </div>

        <div className="max-w-[31rem] lg:justify-self-end lg:pt-3">
          <ClanWordmark />

          <h2 className="mt-7 max-w-[30rem] font-display text-[1.95rem] leading-[1.06] tracking-[-0.01em] text-[#d2b88a] md:text-[2.2rem] lg:text-[2.35rem]">
            <span className="block lg:whitespace-nowrap">A tapestry of timeless</span>
            <span className="block lg:whitespace-nowrap">architecture & belonging</span>
          </h2>

          <div className="mt-7 space-y-5 text-[0.98rem] leading-[1.92] text-[#867e72] md:text-[1rem]">
            <p>
              Beyond its skyline, The Clan reflects something far more exquisite, capturing the
              rhythm of togetherness and the quiet comfort of belonging among neighbors who feel
              like family.
            </p>
            <p>
              Its 2 &amp; 3 Bed signature residences blend contemporary elegance with a timeless
              sense of community, creating a seamless harmony between luxury and life.
            </p>
            <p>
              Here, community becomes not just an address, but a way of living that feels warm,
              layered, and deeply personal.
            </p>
          </div>

          <Link
            to="/projects/the-clan"
            hash="contact"
            className="mt-9 inline-flex items-center gap-3 border border-[#ddcdb1] bg-white px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#996317] transition hover:border-[#a8762b] hover:text-[#123a4c]"
          >
            Download Brochure
            <Download className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className={`${pageContainerClass} mt-7`}>
        <div className="mx-auto grid max-w-[55rem] overflow-hidden rounded-[0.55rem] bg-[#b79a69] text-white shadow-[0_24px_48px_-38px_rgba(94,68,25,0.45)] md:grid-cols-3">
          {metrics.map((item, index) => (
            <div
              key={item.label}
              className={`px-6 py-6 text-center md:px-8 md:py-7 ${index < metrics.length - 1 ? "border-b border-white/18 md:border-b-0 md:border-r" : ""}`}
            >
              <p className="text-[1.75rem] font-medium tracking-[0.14em] md:text-[2rem]">
                {item.value}
              </p>
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.28em] text-white/82 md:text-[0.66rem]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection() {
  const [activeAmenity, setActiveAmenity] = useState(0);
  const currentSlide = amenitySlides[activeAmenity];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveAmenity((current) => (current + 1) % amenitySlides.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <section id="amenities" className="bg-[#fbf8f3] pb-10 pt-20 md:pb-12 md:pt-24">
      <div className={pageContainerClass}>
        <div className="max-w-[58rem]">
          <div className="flex items-center gap-4">
            <p className="eyebrow">Project Highlights</p>
            <span className="h-px w-8 bg-[#dccdb3]/80" />
          </div>
          <h2 className="mt-4 max-w-[58rem] font-display text-[2.35rem] leading-[0.96] text-[#21201d] md:text-[3.5rem] lg:text-[3.7rem]">
            <span className="block md:whitespace-nowrap">Elevate Your Everyday With</span>
            <span className="block md:whitespace-nowrap">World-Class Amenities</span>
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-6xl lg:max-w-[78rem]">
          <div className="relative overflow-hidden rounded-[0.3rem] bg-white shadow-[0_24px_50px_-42px_rgba(0,0,0,0.28)]">
            <img
              src={currentSlide.image}
              alt={currentSlide.alt}
              className="h-[20rem] w-full object-cover object-center md:h-[37rem] lg:h-[40rem]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_100%)] px-5 pb-5 pt-10 md:px-7 md:pb-6">
              <p className="font-display text-[1.05rem] leading-none text-white md:text-[1.18rem]">
                {currentSlide.title}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            {amenitySlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show ${slide.title}`}
                onClick={() => setActiveAmenity(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeAmenity === index ? "bg-[#b79a69]" : "bg-[#d7cab4] hover:bg-[#c6b18a]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MasterplanDiagram() {
  return (
    <div className="relative h-[13rem] overflow-hidden bg-transparent sm:h-[15rem] md:h-[17rem] lg:h-[18.5rem] xl:h-[19.5rem]">
      <img
        src={masterPlanImage}
        alt="The Clan masterplan"
        className="absolute inset-0 h-full w-full object-cover object-[center_40%] [transform:scale(1.46)] drop-shadow-[0_24px_34px_rgba(66,50,21,0.08)] md:object-[center_40%] md:[transform:scale(1.52)] lg:object-[center_40%] lg:[transform:scale(1.56)]"
      />
    </div>
  );
}

function FloorplanDiagram() {
  return (
    <div className="flex min-h-[24rem] items-center justify-center px-5 pb-3 pt-5 sm:min-h-[27rem] sm:px-6 md:min-h-[29rem] md:px-8 md:pb-5 md:pt-7 lg:min-h-[31rem]">
      <img
        src={clanFloorplan205Image}
        alt="The Clan floor plan for unit 205-905"
        className="mx-auto h-auto w-full max-w-[34rem] object-contain sm:max-w-[36rem] lg:max-w-[38rem]"
      />
    </div>
  );
}

function PlanSection() {
  const [planMode, setPlanMode] = useState<PlanMode>("masterplan");

  return (
    <section className="pb-18 pt-12 md:pb-22 md:pt-16">
      <div className={pageContainerClass}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="max-w-[46rem]">
            <div className="flex items-center gap-4">
              <p className="eyebrow">Architectural plans</p>
              <span className="hidden h-px w-10 bg-[#dccdb3] md:block" />
            </div>
            <h2 className="mt-4 max-w-[40rem] font-display text-[2rem] leading-[0.94] tracking-[-0.015em] text-[#21201d] md:text-[2.5rem] lg:text-[2.9rem]">
              <span className="block md:whitespace-nowrap">Beyond Brick And Beam,</span>
              <span className="block md:whitespace-nowrap">Lies Intention</span>
            </h2>
          </div>

          <div className="flex items-center gap-6 md:shrink-0 md:gap-8">
            {[
              { id: "masterplan", label: "Masterplan" },
              { id: "floorplan", label: "Floor Plan" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPlanMode(tab.id as PlanMode)}
                className={`border-b pb-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition ${
                  planMode === tab.id
                    ? "border-[#dcc9a7] text-[#b48b4d]"
                    : "border-[#eadfcf] text-[#c4aa7d] hover:border-[#dcc9a7] hover:text-[#123a4c]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[70rem] overflow-hidden rounded-[1.45rem] border border-[#e4d7c5] bg-[#fcfaf6] shadow-[0_24px_48px_-40px_rgba(74,55,22,0.3)] md:mt-8">
          {planMode === "masterplan" ? <MasterplanDiagram /> : <FloorplanDiagram />}

          <div className="flex flex-col gap-4 border-t border-[#ebe0d1] px-5 py-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#a8762b] md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
            <div className="flex items-center justify-between gap-4 md:gap-8">
              <span>
                {planMode === "masterplan" ? "Curated site circulation" : "2 bed signature layout"}
              </span>
              <span>{planMode === "masterplan" ? "Masterplan" : "Unit 205-905"}</span>
            </div>

            <Link
              to="/projects/the-clan"
              hash="contact"
              className="inline-flex items-center gap-3 self-start text-[#4e4b44] transition hover:text-[#123a4c] md:self-auto"
            >
              <span>Request Plan</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(galleryImages.length > 4 ? 2 : 0);

  useEffect(() => {
    if (galleryImages.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveGalleryIndex((current) => (current + 1) % galleryImages.length);
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const showPreviousGalleryImage = () => {
    setActiveGalleryIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextGalleryImage = () => {
    setActiveGalleryIndex((current) => (current + 1) % galleryImages.length);
  };

  return (
    <section className="bg-[#fbf8f3] py-18 md:py-22">
      <div className={pageContainerClass}>
        <div className="max-w-[28rem]">
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-3 font-display text-[2.35rem] leading-[0.98] text-[#21201d] md:text-[3rem]">
            The Heartbeat Of Community Living
          </h2>
        </div>

        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2">
          <div className="relative h-[14rem] w-full overflow-hidden sm:h-[16rem] md:h-[18rem] lg:h-[19rem] xl:h-[20rem]">
            {galleryImages.map((item, index) => {
              const slotStyles = getGallerySlotStyles(
                getGalleryOffset(index, activeGalleryIndex, galleryImages.length),
              );

              if (!slotStyles) {
                return null;
              }

              return (
                <div
                  key={item.title}
                  className={`absolute transition-all duration-700 ease-out ${slotStyles.container}`}
                >
                  <div
                    className={`h-full overflow-hidden rounded-[0.35rem] bg-white shadow-[0_18px_40px_-34px_rgba(51,38,18,0.34)] transition-all duration-700 ease-out ${slotStyles.frame}`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className={`h-full w-full object-cover transition-all duration-700 ease-out ${slotStyles.image}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPreviousGalleryImage}
              aria-label="Show previous gallery image"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b6a184] text-[#a1865a] transition hover:border-[#8f7343] hover:text-[#8f7343]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNextGalleryImage}
              aria-label="Show next gallery image"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b6a184] text-[#a1865a] transition hover:border-[#8f7343] hover:text-[#8f7343]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectivityMap() {
  return (
    <div className="w-full max-w-[24rem] sm:max-w-[28rem] md:max-w-[34rem] lg:max-w-[46rem] xl:max-w-[52rem]">
      <img
        src={connectivityMapImage}
        alt="The Clan connectivity map"
        className="w-full mix-blend-screen opacity-95 drop-shadow-[0_16px_26px_rgba(0,0,0,0.12)]"
      />
    </div>
  );
}

function ConnectivitySection() {
  return (
    <section
      className="overflow-hidden bg-[#0e6a44] pb-18 pt-14 text-white md:pb-24 md:pt-18"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(5, 65, 47, 0.2), rgba(5, 65, 47, 0.24)), url(${greenBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={pageContainerClass}>
        <div className="mx-auto grid max-w-[78rem] gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(22rem,0.72fr)] lg:grid-rows-[auto_auto] lg:items-start">
          <div className="max-w-[34rem] lg:col-start-1 lg:row-start-1">
            <p className="eyebrow text-[#efcf8d]">Connectivity</p>
            <h2 className="mt-2 max-w-[32rem] font-display text-[2.35rem] leading-[0.9] text-[#efcf8d] md:text-[3rem] lg:text-[3.15rem]">
              <span className="block md:whitespace-nowrap">At the crossroads of</span>
              <span className="block md:whitespace-nowrap">growth and convenience.</span>
            </h2>
          </div>

          <div className="mt-2 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:pr-2">
            <ConnectivityMap />
          </div>

          <div className="lg:col-start-2 lg:row-start-2">
            <Accordion
              type="multiple"
              defaultValue={["institutes"]}
              className="space-y-6 md:space-y-7"
            >
              {connectivityGroups.map((group) => (
                <AccordionItem
                  key={group.id}
                  value={group.id}
                  className="border-0 border-b border-white/16 pb-5 last:pb-0"
                >
                  <AccordionTrigger className="py-0 hover:no-underline [&>svg]:hidden [&[data-state=open]_.accordion-minus]:inline [&[data-state=open]_.accordion-plus]:hidden [&[data-state=closed]_.accordion-minus]:hidden [&[data-state=closed]_.accordion-plus]:inline">
                    <span className="flex w-full items-center justify-between gap-4">
                      <span className="font-display text-[1.65rem] leading-none text-[#efcf8d] md:text-[1.45rem]">
                        {group.label}
                      </span>
                      <span className="text-[1.7rem] font-semibold leading-none text-white md:text-[1.45rem]">
                        <span className="accordion-plus hidden">+</span>
                        <span className="accordion-minus hidden">×</span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pt-5 text-white/86">
                    <ul className="space-y-3 text-[1.02rem] font-medium leading-[1.5] tracking-[-0.01em] text-white/92 md:text-[0.98rem] md:leading-[1.45]">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      id="faq"
      className="overflow-hidden py-24 md:py-28 lg:py-32"
      style={{
        backgroundImage: `url(${creamBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={pageContainerClass}>
        <div className="mx-auto max-w-[64rem] text-center">
          <h2 className="font-display text-[2.2rem] leading-[0.98] tracking-[-0.02em] md:text-[3rem] lg:text-[3.2rem]">
            <span className="text-[#1d6c49]">Your Queries, </span>
            <span className="text-[#d6b15e]">Gracefully Answered</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="mx-auto mt-12 w-full lg:mt-14">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-0 border-b border-[#e9dfcc]/85"
            >
              <AccordionTrigger className="py-6 pl-0 pr-1 text-left font-display text-[1.02rem] leading-[1.38] text-[#173d2f] hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0 [&>svg]:text-[#173d2f] md:py-7 md:pr-2 md:text-[1.16rem] lg:py-8 lg:text-[1.24rem]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[64rem] pb-7 pl-0 pr-8 pt-0 text-[0.96rem] leading-[1.85] text-[#4f5f53] md:pr-10 md:text-[1rem] lg:pb-8 lg:pr-14">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
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
          alt="The Clan contact lounge"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.84)_0%,rgba(10,10,10,0.72)_42%,rgba(10,10,10,0.42)_100%)]" />

        <div
          className={`relative mx-auto grid max-w-7xl items-center gap-10 ${pageGutterClass} py-18 md:py-24 lg:grid-cols-[minmax(0,1fr)_31rem] lg:gap-14`}
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

              <label className="flex items-start gap-2 text-[0.76rem] font-medium leading-[1.7] text-[#8a7e70]">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 rounded border-[#dbcdae]" />
                <span>
                  By submitting my details, I acknowledge that I am providing my information to
                  Global Edifice and consent to receiving relevant communication regarding my
                  enquiry and project updates.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-[0.4rem] bg-[#c7a05d] px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#b78d46]"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function TheClanPage() {
  useClanMetadata();

  return (
    <>
      <main className="bg-[#fbf8f3] text-[#163849]">
        <ProjectDetailNav />
        <HeroSection />
        <HeroStatStrip />
        <OverviewSection />
        <AmenitiesSection />
        <PlanSection />
        <GallerySection />
        <ConnectivitySection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
