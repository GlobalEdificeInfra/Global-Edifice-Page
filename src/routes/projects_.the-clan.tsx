import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";
import { IndianPhoneInput, withIndiaDialCode } from "@/components/indian-phone-input";
import { submitContactForm } from "@/lib/enquiry-api";
import geLogo from "@/assets/shared/ge-logo.png";
import clanGalleryPergolaWalkway from "@/assets/projects/the-clan/clan-gallery-pergola-walkway.jpg";
import clanGalleryPoolCourt from "@/assets/projects/the-clan/clan-gallery-pool-court.jpg";
import clanGallerySculptureCourt from "@/assets/projects/the-clan/clan-gallery-sculpture-court.jpg";
import theClanLogoGreen from "@/assets/projects/the-clan/Clan-Logo-Green.png";
import theClanBanner from "@/assets/projects/the-clan/The-clan-project.png";
import clanFloorplan205Image from "@/assets/projects/the-clan/clan-floorplan-205.png";
import connectivityMapImage from "@/assets/projects/the-clan/map.png";
import greenBackgroundImage from "@/assets/projects/the-clan/Green BG.jpg";
import masterPlanImage from "@/assets/projects/the-clan/master-plan.png";
import theClanHall from "@/assets/projects/the-clan/the-clan-hall.png";
import { SiteHeader } from "@/components/site-header";
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
const sectionPadClass = "py-16 md:py-20";
const sectionInnerClass = "mx-auto max-w-6xl";

const detailNav = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "route", to: "/projects" as const },
  { label: "BLOGS", kind: "route", to: "/blogs" as const },
  { label: "CONTACT", kind: "route", to: "/contact" as const },
] as const;

type DetailNavItem = (typeof detailNav)[number];
type PlanMode = "masterplan" | "floorplan";

const heroStats = [
  { label: "Typology", lines: ["2 & 3 Bed", "spacious residences"] },
  { label: "Price", lines: ["Starting", "85 Lakhs*"] },
  { label: "Location", lines: ["Sarjapura, Bangalore"] },
  {
    label: "RERA",
    lines: ["RERA NO.: PRM/KA/RERA/1251/308/PR/071221/007275"],
  },
] as const;

const metrics = [
  { value: "257", label: "Spacious Residences" },
  { value: "3.5 Acres", label: "Land Area" },
  { value: "G+9 Floors", label: "Structure" },
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

const galleryImageModules = import.meta.glob(
  "../assets/projects/the-clan/gallery/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const duplicateGalleryFiles = new Set(["10-gallery-10.jpg", "26-gallery-26.jpg"]);

/** Default visible trio matches the Gallery design reference. */
const featuredGalleryImages = [
  {
    title: "Pergola Walkway",
    image: clanGalleryPergolaWalkway,
    alt: "The Clan pergola walkway",
  },
  {
    title: "Pool Court",
    image: clanGalleryPoolCourt,
    alt: "The Clan pool court",
  },
  {
    title: "Sculpture Court",
    image: clanGallerySculptureCourt,
    alt: "The Clan sculpture court",
  },
] as const;

const galleryImages = [
  ...featuredGalleryImages,
  ...Object.entries(galleryImageModules)
    .sort(([leftPath], [rightPath]) =>
      leftPath.localeCompare(rightPath, undefined, { numeric: true }),
    )
    .filter(([filePath]) => !duplicateGalleryFiles.has(filePath.split("/").pop() ?? ""))
    .map(([, image], index) => ({
      title: `Gallery ${String(index + 1).padStart(2, "0")}`,
      image,
      alt: `The Clan gallery image ${index + 1}`,
    }))
    .filter(
      (item) =>
        !featuredGalleryImages.some((featured) => featured.image === item.image),
    ),
];

function getVisibleGalleryImages(activeIndex: number) {
  if (galleryImages.length === 0) {
    return [];
  }

  const count = Math.min(3, galleryImages.length);

  return Array.from({ length: count }, (_, offset) => {
    const index = (activeIndex + offset) % galleryImages.length;
    return galleryImages[index];
  });
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
    question: "What is the starting price for Global Edifice Legacy and Orlean projects?",
    answer:
      "Global Edifice brings you premium residential projects with modern amenities and strategic locations. Our flagship projects Global Edifice Legacy start from INR 73 lakhs*, while our luxury project Orlean offers premium living spaces starting from INR 76 lakhs*.",
  },
  {
    id: "faq-2",
    question: "What is Global Edifice's history, mission and vision?",
    answer:
      "With over 10 years of excellence in the real estate market, Global Edifice has established itself as one of the top builders in Bangalore. Our mission is to transform dreams into reality for every homebuyer by developing gated communities and affordable flats that offer more than just living spaces. Our vision encompasses creating vibrant hubs that offer comfort, foster relationships, and stand as assets to be proud of, while making Bangalore's real estate market more dynamic for future generations.",
  },
  {
    id: "faq-3",
    question: "How is Global Edifice committed to sustainability and innovation?",
    answer:
      "At Global Edifice, we believe in creating sustainable communities that harmonize with the environment. Our projects incorporate rainwater harvesting systems, solar panels for common areas, energy-efficient lighting, and extensive green spaces. We use eco-friendly construction materials wherever possible and ensure our developments have a minimal carbon footprint.",
  },
  {
    id: "faq-4",
    question: "Where are Global Edifice projects located in Bangalore?",
    answer:
      "Global Edifice has strategically positioned projects across Bangalore's most promising locations, including Electronic City, South Bangalore, Bommasandra, Thirumagondanahalli, and Sarjapura. Each location is chosen for connectivity, infrastructure potential, and quality of life.",
  },
  {
    id: "faq-5",
    question: "Can we book a site visit for your projects?",
    answer:
      "Absolutely. We encourage potential homebuyers to visit our projects before making their decision. You can schedule a site visit by calling our customer care or by filling out the enquiry form on our website. Our representatives will arrange a visit at your convenience.",
  },
  {
    id: "faq-6",
    question: "What is the process for purchasing a home with Global Edifice?",
    answer:
      "We have simplified the home-buying journey into a seamless process: consultation, property selection, site visit, financial assistance, and legal documentation through to registration—with support that continues after purchase.",
  },
  {
    id: "faq-7",
    question: "What amenities do Global Edifice projects offer?",
    answer:
      "Our residential communities feature clubhouses, swimming pools, gymnasiums, landscaped gardens, children's play areas, indoor games, multipurpose halls, and strong security with 24/7 surveillance—designed for comfortable, self-sufficient living.",
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
        className={`mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 ${pageGutterClass} transition-all duration-300 md:gap-6 ${
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
              isScrolled ? "w-[128px] md:w-[180px]" : "w-[148px] md:w-[210px]"
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
            {detailNav.map((item) => (
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
            ))}
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
    <section className="relative isolate min-h-[40rem] overflow-hidden bg-[#1b2530] text-white md:min-h-[48rem] lg:min-h-[54rem]">
      <img
        src={theClanBanner}
        alt="The Clan hero residence"
        className="absolute inset-0 h-full w-full object-cover object-[48%_34%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,15,22,0.16)_0%,rgba(9,15,22,0.22)_36%,rgba(9,15,22,0.72)_100%)]" />

      <div
        className={`relative mx-auto flex min-h-[40rem] max-w-7xl items-end justify-center ${pageGutterClass} pb-[7.5rem] pt-28 md:min-h-[48rem] md:pb-[8.5rem] md:pt-32 lg:min-h-[54rem] lg:pb-[9rem]`}
      >
        <div className="mx-auto mb-2 max-w-[52rem] text-center md:mb-3 md:max-w-[62rem]">
          <h1 className="font-display font-normal uppercase [font-synthesis:none] text-[1.9rem] leading-[1.08] tracking-[0.04em] text-white sm:text-[2.35rem] md:text-[2.8rem] lg:text-[3.15rem]">
            <span className="block">Where Life Feels</span>
            <span className="block">More Connected.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function HeroStatStrip() {
  return (
    <section className="relative z-20 -mt-[3.6rem] bg-transparent md:-mt-[3.75rem]">
      <div className={pageContainerClass}>
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] bg-[#fcfaf7] shadow-[0_22px_44px_-28px_rgba(40,30,16,0.4)] md:grid-cols-[0.82fr_0.78fr_0.9fr_1.7fr]">
          {heroStats.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center px-3 py-6 text-center md:min-h-[7.5rem] md:px-5 md:py-7 ${
                index > 0 ? "border-t border-[#ebe4d8] md:border-t-0 md:border-l" : ""
              }`}
            >
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[#b08d57] md:text-[0.7rem]">
                {item.label}
              </p>
              <div
                className={`mt-3 font-display leading-[1.35] text-[#1a1a1a] ${
                  item.label === "RERA"
                    ? "w-full text-[0.82rem] md:text-[0.92rem]"
                    : "text-[0.95rem] md:text-[1.08rem]"
                }`}
              >
                {item.label === "RERA" ? (
                  <p className="break-words xl:whitespace-nowrap">{item.lines[0]}</p>
                ) : (
                  item.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  return (
    <section className="relative z-0 bg-[#fcfaf7] pt-14 md:pt-18 lg:pt-22">
      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2 lg:items-stretch">
        <div className="relative h-full min-h-[28rem] overflow-hidden md:min-h-[34rem] lg:min-h-[42rem]">
          <img
            src={theClanHall}
            alt="The Clan living hall and dining interior"
            className="absolute inset-0 h-full w-full object-cover object-[42%_58%]"
          />
        </div>

        <div
          className={`flex items-center bg-[#fcfaf7] py-10 ${pageGutterClass} md:py-14 lg:max-w-none lg:py-16 lg:pl-12 xl:pl-16`}
        >
          <div className="mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-[36rem]">
            <ClanWordmark />

            <h2 className="mt-8 font-display text-[1.45rem] leading-[1.2] tracking-[0.02em] text-[#b59a6d] uppercase md:mt-9 md:text-[1.75rem] lg:text-[1.95rem]">
              <span className="block sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">Designed Around People.</span>
              <span className="block sm:whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">Inspired by Community.</span>
            </h2>

            <div className="mt-6 max-w-[32rem] space-y-5 text-base font-normal leading-[1.85] text-[#5c564d]">
              <p>Some places impress with architecture. The Clan goes a little further.</p>
              <p>
                It creates a neighbourhood where people naturally come together. Surrounded by
                greenery and thoughtfully planned open spaces, every home is filled with natural
                light, fresh air, and a sense of openness that&apos;s becoming increasingly rare in
                city living.
              </p>
              <p>
                Located off Sarjapur Road, The Clan brings together contemporary design, lifestyle
                amenities, and a welcoming community—creating a place where families don&apos;t just
                live, they belong.
              </p>
            </div>

            <a
              href={theClanBanner}
              download="the-clan-brochure.png"
              className="mt-8 inline-flex w-fit items-center gap-4 border border-[#c0a56e] bg-white px-8 py-3.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[#c0a56e] transition hover:border-[#a89458] hover:text-[#a89458]"
            >
              Download Brochure
              <ArrowDown className="h-3.5 w-3.5 stroke-[2.25]" />
            </a>
          </div>
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
    <section id="amenities" className={`bg-[#fcfaf7] ${sectionPadClass}`}>
      <div className={pageContainerClass}>
        <div className={`${sectionInnerClass} grid overflow-hidden rounded-[0.85rem] bg-[#c0a56e] text-white md:grid-cols-3`}>
          {metrics.map((item, index) => (
            <div
              key={item.label}
              className={`px-5 py-7 text-center md:px-6 md:py-8 ${
                index < metrics.length - 1
                  ? "border-b border-white/35 md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <p className="font-sans text-[1.6rem] font-medium normal-case leading-none tracking-normal md:text-[1.85rem]">
                {item.value}
              </p>
              <p className="mt-2.5 font-sans text-[0.58rem] font-normal uppercase tracking-[0.28em] text-white/95 md:mt-3 md:text-[0.62rem]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className={`${sectionInnerClass} mt-14 md:mt-16`}>
          <div className="flex items-center gap-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#c0a56e]">
              Project Highlights
            </p>
            <span className="h-px w-10 bg-[#c0a56e]/75" />
          </div>
          <h2 className="mt-4 max-w-[58rem] font-display text-[2.2rem] leading-[0.98] tracking-[0.01em] text-[#21201d] uppercase md:text-[3.1rem] lg:text-[3.4rem]">
            <span className="block lg:whitespace-nowrap">Elevate Your Everyday With</span>
            <span className="block lg:whitespace-nowrap">World-Class Amenities</span>
          </h2>
        </div>

        <div className={`${sectionInnerClass} mt-8 md:mt-10`}>
          <div className="relative overflow-hidden rounded-[0.3rem] bg-white shadow-[0_24px_50px_-42px_rgba(0,0,0,0.28)]">
            <img
              src={currentSlide.image}
              alt={currentSlide.alt}
              className="h-[20rem] w-full object-cover object-center md:h-[34rem] lg:h-[38rem]"
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
                  activeAmenity === index ? "bg-[#c0a56e]" : "bg-[#d7cab4] hover:bg-[#c6b18a]"
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
    <div className="overflow-hidden bg-[#f7f2ea]">
      <img
        src={masterPlanImage}
        alt="The Clan masterplan"
        className="block h-[10.5rem] w-full origin-center scale-[1.55] object-cover object-[center_38%] sm:h-[12rem] md:h-[13.5rem] md:scale-[1.62] lg:h-[15rem] lg:scale-[1.68]"
      />
    </div>
  );
}

function FloorplanDiagram() {
  return (
    <div className="flex items-center justify-center bg-[#fcfaf6] px-4 py-4 md:px-6 md:py-5">
      <img
        src={clanFloorplan205Image}
        alt="The Clan floor plan for unit 205-905"
        className="mx-auto h-auto max-h-[20rem] w-full max-w-[42rem] object-contain md:max-h-[24rem]"
      />
    </div>
  );
}

function PlanSection() {
  const [planMode, setPlanMode] = useState<PlanMode>("masterplan");

  return (
    <section className="bg-[#fcfaf7] pb-10 pt-16 md:pb-12 md:pt-20">
      <div className={pageContainerClass}>
        <div className={sectionInnerClass}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="min-w-0 max-w-[46rem]">
              <div className="flex items-center gap-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#b49a6c]">
                  Architectural Plans
                </p>
                <span className="h-px w-10 bg-[#b49a6c]/75" />
              </div>
              <h2 className="mt-4 max-w-[40rem] font-display text-[2rem] leading-[0.98] tracking-[0.01em] text-[#21201d] uppercase md:text-[2.5rem] lg:text-[2.9rem]">
                <span className="block md:whitespace-nowrap">Beyond Brick And Beam,</span>
                <span className="block md:whitespace-nowrap">Lies Intention</span>
              </h2>
            </div>

            <div className="flex items-center gap-6 lg:shrink-0 lg:gap-8">
              {[
                { id: "masterplan", label: "Master Plan" },
                { id: "floorplan", label: "Floor Plan" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPlanMode(tab.id as PlanMode)}
                  className={`border-b pb-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition ${
                    planMode === tab.id
                      ? "border-[#b49a6c] text-[#b49a6c]"
                      : "border-transparent text-[#c4aa7d] hover:text-[#c0a56e]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.15rem] border border-[#e4d7c5] bg-[#fcfaf6] shadow-[0_24px_48px_-40px_rgba(74,55,22,0.3)] md:mt-10">
            {planMode === "masterplan" ? <MasterplanDiagram /> : <FloorplanDiagram />}

            <div className="flex justify-end border-t border-[#ebe0d1] px-5 py-3 md:px-8 md:py-3.5">
              <Link
                to="/projects/the-clan"
                hash="contact"
                className="inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#4e4b44] transition hover:text-[#123a4c]"
              >
                <span>Request Plan</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const visibleImages = getVisibleGalleryImages(activeGalleryIndex);

  const showPreviousGalleryImage = () => {
    setActiveGalleryIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNextGalleryImage = () => {
    setActiveGalleryIndex((current) => (current + 1) % galleryImages.length);
  };

  return (
    <section className="bg-white pb-10 pt-10 md:pb-12 md:pt-12">
      <div className={pageContainerClass}>
        <div className={sectionInnerClass}>
          <div className="flex items-center gap-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#b49a6c]">
              Gallery
            </p>
            <span className="h-px w-10 bg-[#b49a6c]/75" />
          </div>

          <h2 className="mt-4 max-w-[42rem] font-display text-[2rem] leading-[0.98] tracking-[0.01em] text-[#21201d] uppercase md:text-[2.5rem] lg:text-[2.9rem]">
            <span className="block">The Heartbeat</span>
            <span className="block">Of Community Living</span>
          </h2>
        </div>
      </div>

      <div className="mt-8 grid w-full grid-cols-1 gap-[0.45rem] sm:grid-cols-3 md:mt-10">
        {visibleImages.map((item) => (
          <div key={`${item.title}-${item.image}`} className="overflow-hidden bg-[#f3eee6]">
            <img
              src={item.image}
              alt={item.alt}
              className="aspect-[4/3] h-auto w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-3.5">
        <button
          type="button"
          onClick={showPreviousGalleryImage}
          aria-label="Show previous gallery image"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b6a184] bg-white text-[#a1865a] transition hover:border-[#8f7343] hover:text-[#8f7343]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={showNextGalleryImage}
          aria-label="Show next gallery image"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b6a184] bg-white text-[#a1865a] transition hover:border-[#8f7343] hover:text-[#8f7343]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
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
      className={`overflow-hidden bg-[#0e6a44] text-white ${sectionPadClass}`}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(5, 65, 47, 0.2), rgba(5, 65, 47, 0.24)), url(${greenBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={pageContainerClass}>
        <div className="mx-auto grid max-w-[78rem] gap-x-12 gap-y-5 lg:grid-cols-[minmax(0,1.06fr)_minmax(22rem,0.72fr)] lg:grid-rows-[auto_auto] lg:items-start">
          <div className="max-w-[34rem] lg:col-start-1 lg:row-start-1">
            <div className="flex items-center gap-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#efcf8d]">
                Connectivity
              </p>
              <span className="h-px w-10 bg-[#efcf8d]/75" />
            </div>
            <h2 className="mt-3 max-w-[32rem] font-display text-[2.35rem] leading-[0.9] text-[#efcf8d] uppercase md:text-[3rem] lg:text-[3.15rem]">
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
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0].id);

  return (
    <section id="faq" className="bg-[#fbf7f0] py-18 md:py-22">
      <div className={pageContainerClass}>
        <div className="max-w-[48rem]">
          <div className="flex items-center gap-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#b49a6c]">
              Get To Know
            </p>
            <span className="h-px w-10 bg-[#b49a6c]/75" />
          </div>
          <h2 className="mt-4 font-display text-[2.1rem] leading-[1.02] text-[#2b2621] sm:text-[2.5rem] md:text-[2.9rem]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 border-t border-[#eadfce]">
          {faqItems.map((item) => {
            const isOpen = openFaqId === item.id;

            return (
              <article key={item.id} className="border-b border-[#eadfce]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => setOpenFaqId((current) => (current === item.id ? null : item.id))}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                >
                  <span className="pr-6 text-[0.98rem] font-medium leading-[1.7] tracking-[0.04em] text-[#c0a57a] md:text-[1.02rem]">
                    {item.question}
                  </span>
                  <span className="mt-0.5 shrink-0 text-[1.8rem] leading-none text-[#b49a6c]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen ? (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="max-w-[44rem] pb-7 pr-12 text-base font-normal leading-[1.85] text-[#8a7a68] md:pb-8 md:pr-16"
                  >
                    {item.answer}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
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

    const [firstName, ...rest] = fullName.trim().split(/\s+/);
    const result = await submitContactForm({
      firstName: firstName || fullName.trim(),
      lastName: rest.join(" "),
      email,
      phone: withIndiaDialCode(phone),
      message,
      project: "Global Edifice The Clan",
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
          alt="The Clan contact lounge"
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
            <p className="mt-3 text-base font-normal leading-[1.8] text-white/76">
              We would love to hear from you
            </p>
          </div>

          {status === "success" ? (
            <div className="rounded-[1.45rem] bg-[#fffdfa] p-7 text-center text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] md:p-8">
              <h3 className="font-display text-[2.35rem] leading-none text-[#1f1d1a] md:text-[2.5rem]">
                Thank you!
              </h3>
              <p className="mt-3 text-base font-normal text-[#7b7369]">
                We&apos;ve received your enquiry and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#d5c4a8] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#6f6558] transition hover:border-[#b49a6c] hover:text-[#123a4c]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              className="rounded-[1.45rem] bg-[#fffdfa] p-7 text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] md:p-8"
              onSubmit={handleSubmit}
            >
              <h3 className="font-display text-[2.35rem] leading-none text-[#1f1d1a] md:text-[2.5rem]">
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
                className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#d5c4a8] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#6f6558] transition hover:border-[#b49a6c] hover:text-[#123a4c] disabled:cursor-not-allowed disabled:opacity-60"
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



function TheClanPage() {
  useClanMetadata();

  return (
    <>
      <main className="bg-[#fbf8f3] text-[#163849]">
        <SiteHeader />
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
