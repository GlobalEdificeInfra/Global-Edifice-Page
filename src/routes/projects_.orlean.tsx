import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import geLogo from "@/assets/shared/ge-logo.png";
import orleanAboutImage from "@/assets/projects/orlean/orlean-about.jpg";
import orleanBrandLogo from "@/assets/projects/orlean/orlean-brand-logo.png";
import orleanBrochureCover from "@/assets/projects/orlean/orlean-brochure-cover.jpg";
import orleanLocationMapLight from "@/assets/projects/orlean/orlean-location-map-light.jpg";
import orleanElevationCutout from "@/assets/projects/orlean/Orlean_Elevation.png";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";
import { submitContactForm } from "@/lib/enquiry-api";

const ORLEAN_TITLE = "Global Edifice Orlean";
const ORLEAN_DESCRIPTION =
  "Explore Global Edifice Orlean, a landscape-led residential address off Chandapura Road with 2 BHK homes, wellness amenities, and strong South Bangalore connectivity.";

export const Route = createFileRoute("/projects_/orlean")({
  component: OrleanPage,
  head: () => ({
    meta: [{ title: ORLEAN_TITLE }, { name: "description", content: ORLEAN_DESCRIPTION }],
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
  { label: "CONTACT", kind: "anchor", href: "/contact" },
] as const;

type DetailNavItem = (typeof detailNav)[number];
type PlanMode = "masterplan" | "floorplan";

const heroStats = [
  { label: "Typology", lines: ["2 & 3 Bed", "spacious residences"] },
  { label: "Price", lines: ["Starting", "76 lakhs*"] },
  { label: "Location", lines: ["Chandapura", "Bangalore"] },
  {
    label: "RERA",
    lines: ["RERA NO.: PRM/KA/RERA/1251/308/PR/071224/007275"],
  },
] as const;

const overviewStats = [
  {
    value: "91",
    label: "Signature Residences",
  },
  {
    value: "1.5 Acres",
    label: "Land Area",
  },
  {
    value: "G+7 Floor",
    label: "Structure",
  },
] as const;

const overviewCopy = [
  "The best homes don't ask you to adjust your lifestyle. They simply fit into it. That's the idea behind Orlean—a thoughtfully planned community designed to maximise space, privacy, and natural light. Homes without common walls, wide corridors, generous ventilation, and Vastu-compliant layouts come together to create a calm, bright, and comfortable living environment.",
  "Located in Chandapura, one of South Bengaluru's fast-growing residential corridors, Orlean keeps you connected to major employment hubs while offering the comfort of a quieter neighbourhood. It's a home designed for everyday living, with the quality, comfort, and relevance to stay with you for years to come.",
] as const;

const amenitySlides = [
  {
    title: "Club Lounge",
    image: "/project-images/orlean-images/1.jpg",
    alt: "Global Edifice Orlean club lounge",
  },
  {
    title: "Dining Experience",
    image: "/project-images/orlean-images/2.jpg",
    alt: "Global Edifice Orlean dining space",
  },
  {
    title: "Fitness Studio",
    image: "/project-images/orlean-images/3.jpg",
    alt: "Global Edifice Orlean fitness studio",
  },
] as const;

const planAssets = {
  masterplan: {
    src: "/project-images/orlean-masterplan.webp",
    alt: "Global Edifice Orlean master plan",
    label: "Master Plan",
  },
  floorplan: {
    src: "/project-images/orlean-floorplan.webp",
    alt: "Global Edifice Orlean floor plan",
    label: "Floor Plan",
  },
} as const;

const galleryImages = [
  "/project-images/orlean-images/1.jpg",
  "/project-images/orlean-images/2.jpg",
  "/project-images/orlean-images/3.jpg",
  "/project-images/orlean-images/4.jpg",
  "/project-images/orlean-images/5.jpg",
  "/project-images/orlean-images/gallery2.6.webp",
  "/project-images/orlean-images/extra-gallery-orlean-1.webp",
  "/project-images/orlean-images/extra-gallery-orlean-2.webp",
  "/project-images/orlean-images/extra-gallery-orlean-3.webp",
  "/project-images/orlean-images/extra-gallery-orlean-4.webp",
  "/project-images/orlean-images/extra-gallery-orlean-5.webp",
].map((image, index) => ({
  title: `Gallery ${String(index + 1).padStart(2, "0")}`,
  image,
  alt: `Global Edifice Orlean gallery image ${index + 1}`,
})) as const;

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
    id: "educational-institutions",
    label: "Educational Institutions",
    items: [
      "Sri Chaitanya School",
      "SFS Academy",
      "National Public School",
      "D-Sales Academy",
      "Swami Vivekanada College",
      "Alliance University",
      "Spoorthi Institute",
    ],
  },
  {
    id: "hospitals",
    label: "Hospitals",
    items: ["Narayana Institution", "Oxford Medical Institute", "Best Hospital", "Athreya Hospital", "Sparsh Hospital"],
  },
  {
    id: "corporate-hubs",
    label: "Corporate Hubs",
    items: ["Infosys", "Biocon", "Tech Machindra", "TCS", "Siemens", "Wipro"],
  },
  {
    id: "retail-entertainment",
    label: "Retail & Entertainment",
    items: ["M5", "Royal Mart", "D Mart", "Metro Cash and Carry"],
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
      "At Global Edifice, we believe in creating sustainable communities that harmonize with the environment. Our projects incorporate rainwater harvesting systems, solar panels for common areas, energy-efficient lighting, and extensive green spaces. We use eco-friendly construction materials wherever possible and ensure our developments have a minimal carbon footprint. Our innovative designs balance modern aesthetics with environmental responsibility, creating spaces that are not just beautiful but also sustainable for generations to come.",
  },
  {
    id: "faq-4",
    question: "Where are Global Edifice projects located in Bangalore?",
    answer:
      "Global Edifice has strategically positioned projects across Bangalore's most promising locations. Our developments can be found in high-growth areas such as Electronic City, South Bangalore, Bommasandra, Thirumagondanahalli, and Sarjapura. Each location is chosen based on connectivity, infrastructure development potential, and quality of life factors. Contact us at (+91 94116 14444) or email (info@globaledifice.com) to learn more about our project locations.",
  },
  {
    id: "faq-5",
    question: "Can we book a site visit for your projects?",
    answer:
      "Absolutely. We encourage potential homebuyers to visit our projects before making their decision. Our team conducts guided site visits where you can experience the quality of construction, amenities, and neighborhood firsthand. You can schedule a site visit by calling our customer care at (+91 806 548 0222) or by filling out the site visit request form on our website. Our representatives will arrange a visit at your convenience and answer all your questions about the property.",
  },
  {
    id: "faq-6",
    question: "What is the process for purchasing a home with Global Edifice?",
    answer:
      "At Global Edifice, we have simplified the home-buying journey into a seamless 5-step process. It begins with a personalized consultation to understand your requirements and budget preferences. Next, we help you select the perfect property from our portfolio that aligns with your needs. After arranging a comprehensive site visit, our team assists with all financial aspects including loan arrangements and payment plans. Finally, we handle all legal documentation and registration procedures, ensuring a hassle-free purchase experience. Our customer relationship team remains available even after purchase to assist with any queries or support you might need.",
  },
  {
    id: "faq-7",
    question: "What amenities do Global Edifice projects offer?",
    answer:
      "Global Edifice projects are designed with a comprehensive suite of amenities to enhance your lifestyle. Our residential complexes feature state-of-the-art clubhouses, swimming pools, fully-equipped gymnasiums, landscaped gardens, children's play areas, indoor games rooms, multipurpose halls, and dedicated senior citizen corners. Security is paramount with 24/7 surveillance, intercom facilities, and trained security personnel. Additionally, most of our projects offer smart home features, power backup, covered parking, and visitor parking spaces. We believe in creating self-sufficient communities where everything you need is within reach.",
  },
  {
    id: "faq-8",
    question: "Does Global Edifice offer any post-handover services?",
    answer:
      "Yes, our commitment to excellence extends beyond project completion. Global Edifice provides comprehensive post-handover services including a dedicated maintenance team, regular property inspections, and prompt resolution of any construction-related issues during the warranty period. We also assist with utility connections, interior design recommendations, and rental management services if required. Our customer service department remains accessible to address any concerns, ensuring your home ownership experience remains pleasant and worry-free for years to come.",
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

function OrleanDetailNav() {
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
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-4 py-1.5 text-white transition hover:bg-[#9f8658]"
            >
              ENQUIRE</button>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]"
          >
            ENQUIRE</button>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="orlean-mobile-nav"
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
          } ${isMobileMenuOpen ? "max-h-[34rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
        >
          <nav id="orlean-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
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

function useOrleanMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute("content") ?? null;

    document.title = ORLEAN_TITLE;

    let metaElement = existingDescription;

    if (!metaElement) {
      metaElement = document.createElement("meta");
      metaElement.setAttribute("name", "description");
      document.head.appendChild(metaElement);
    }

    metaElement.setAttribute("content", ORLEAN_DESCRIPTION);

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

function HeroSection() {
  return (
    <section className="relative isolate min-h-[44rem] overflow-hidden bg-[#dad2cb] text-white md:min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,#f4efea_0%,#ece4dc_32%,#d7cfca_64%,#c1b9b4_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.2)_0%,rgba(8,12,16,0.32)_24%,rgba(8,12,16,0.5)_54%,rgba(8,12,16,0.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-[linear-gradient(180deg,rgba(17,24,32,0)_0%,rgba(17,24,32,0.34)_22%,rgba(17,24,32,0.9)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <img
          src={orleanElevationCutout}
          alt="Global Edifice Orlean residence elevation"
          className="w-[34rem] max-w-none object-contain object-bottom brightness-[0.72] saturate-[0.9] sm:w-[50rem] md:w-[74rem] lg:w-[108vw] lg:min-w-[88rem] xl:w-[116vw]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,14,0.1)_0%,rgba(7,10,14,0.2)_24%,rgba(7,10,14,0.3)_50%,rgba(7,10,14,0.4)_100%)]" />

      <div
        className={`relative mx-auto flex min-h-[44rem] max-w-7xl items-end justify-center ${pageGutterClass} pb-[7.5rem] pt-24 md:min-h-screen md:pb-[8.5rem] md:pt-32 lg:pb-[9rem]`}
      >
        <div className="max-w-[36rem] text-center drop-shadow-[0_18px_28px_rgba(0,0,0,0.42)] md:max-w-[44rem]">
          <h1 className="font-display text-[1.55rem] leading-[1.02] tracking-[0.01em] text-white uppercase [text-shadow:0_4px_12px_rgba(0,0,0,0.34)] sm:text-[1.9rem] md:text-[2.35rem] lg:text-[2.7rem]">
            <span className="block whitespace-nowrap">Step Into A New Era</span>
            <span className="block whitespace-nowrap">Of Living.</span>
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
                    : "text-[0.92rem] md:text-[1.02rem]"
                }`}
              >
                {item.label === "RERA" ? (
                  <p className="md:whitespace-nowrap">{item.lines[0]}</p>
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
    <section className="relative z-0 bg-[#fbf7f0] pt-14 md:pt-18 lg:pt-22">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div className="relative h-full min-h-[22rem] overflow-hidden md:min-h-[26rem] lg:min-h-[30rem]">
          <img
            src={orleanAboutImage}
            alt="Global Edifice Orlean living interior"
            className="absolute inset-0 h-full w-full object-cover object-[50%_45%]"
          />
        </div>

        <div
          className={`flex items-center bg-[#fbf7f0] py-10 ${pageGutterClass} md:py-12 lg:py-14 lg:pl-12 xl:pl-16`}
        >
          <div className="mx-auto w-full max-w-[34rem] lg:mx-0 lg:max-w-[36rem]">
            <img src={orleanBrandLogo} alt="Orlean" className="w-[12rem] md:w-[14rem]" />

            <h2 className="mt-8 font-display text-[1.45rem] leading-[1.2] tracking-[0.02em] text-[#b59a6d] uppercase md:mt-9 md:text-[1.75rem] lg:text-[1.95rem]">
              <span className="block whitespace-nowrap">Thoughtfully Designed.</span>
              <span className="block whitespace-nowrap">Naturally Comfortable.</span>
            </h2>

            <div className="mt-6 max-w-[32rem] space-y-5 text-[0.94rem] leading-[1.85] text-[#5c564d] md:text-[0.97rem]">
              {overviewCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <a
              href={orleanBrochureCover}
              download
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
    <section id="amenities" className={`bg-[#fbf8f3] ${sectionPadClass}`}>
      <div className={pageContainerClass}>
        <div
          className={`${sectionInnerClass} grid overflow-hidden rounded-[0.85rem] bg-[#c0a56e] text-white md:grid-cols-3`}
        >
          {overviewStats.map((item, index) => (
            <div
              key={item.label}
              className={`px-5 py-7 text-center md:px-6 md:py-8 ${
                index < overviewStats.length - 1
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
            <span className="h-px w-8 bg-[#c0a56e]/75" />
          </div>
          <h2 className="mt-4 max-w-[58rem] font-display text-[2.35rem] leading-[0.96] text-[#21201d] md:text-[3.5rem] lg:text-[3.7rem]">
            <span className="block md:whitespace-nowrap">Elevate Your Everyday With</span>
            <span className="block md:whitespace-nowrap">World-Class Amenities</span>
          </h2>
        </div>

        <div className={`${sectionInnerClass} mt-8 md:mt-10`}>
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

function PlanSection() {
  const [planMode, setPlanMode] = useState<PlanMode>("masterplan");
  const activePlanAsset = planAssets[planMode];

  return (
    <section className="bg-[#fbf7f0] pb-18 pt-4 md:pb-22 md:pt-6">
      <div className={pageContainerClass}>
        <div className={sectionInnerClass}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-[46rem]">
              <div className="flex items-center gap-4">
                <p className="eyebrow">Architectural plans</p>
                <span className="hidden h-px w-10 bg-[#dccdb3] md:block" />
              </div>
              <h2 className="mt-4 max-w-[38rem] font-display text-[2rem] leading-[0.96] tracking-[-0.015em] text-[#21201d] md:text-[2.45rem] lg:text-[2.8rem]">
                <span className="block md:whitespace-nowrap">Masterfully planned for</span>
                <span className="block md:whitespace-nowrap">elevated everyday living</span>
              </h2>
            </div>

            <div className="flex items-center gap-6 md:shrink-0 md:gap-8">
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
                      ? "border-[#dcc9a7] text-[#b48b4d]"
                      : "border-[#eadfcf] text-[#c4aa7d] hover:border-[#dcc9a7] hover:text-[#123a4c]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.45rem] border border-[#e4d7c5] bg-[#fcfaf6] shadow-[0_24px_48px_-40px_rgba(74,55,22,0.3)] md:mt-8">
            <img
              src={activePlanAsset.src}
              alt={activePlanAsset.alt}
              className="w-full object-cover"
            />

            <div className="flex flex-col gap-4 border-t border-[#ebe0d1] px-5 py-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#c0a56e] md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
              <div className="flex items-center justify-between gap-4 md:gap-8">
                <span>
                  {planMode === "masterplan"
                    ? "Site planning overview"
                    : "Overall floor planning overview"}
                </span>
                <span>{activePlanAsset.label}</span>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 self-start text-[#4e4b44] transition hover:text-[#123a4c] md:self-auto"
              >
                <span>Request Plan</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
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
            <p className="eyebrow">Gallery</p>
            <span className="h-px w-10 bg-[#dccdb3]/80" />
          </div>
          <h2 className="mt-4 max-w-[42rem] font-display text-[2rem] leading-[0.98] tracking-[0.01em] text-[#21201d] uppercase md:text-[2.5rem] lg:text-[2.9rem]">
            <span className="block">Where Leisure Wellness</span>
            <span className="block">&amp; Community Connect</span>
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

function LocationSection() {
  const [activeConnectivityGroup, setActiveConnectivityGroup] = useState<string | null>(
    connectivityGroups[0].id,
  );

  return (
    <section id="location" className={`scroll-mt-28 bg-white md:scroll-mt-32 ${sectionPadClass}`}>
      <div className={pageContainerClass}>
        <div className={sectionInnerClass}>
          <div className="flex items-center gap-4">
            <p className="eyebrow">Connectivity</p>
            <span className="hidden h-px w-10 bg-[#dccdb3] md:block" />
          </div>
          <h2 className="mt-4 max-w-[44rem] font-display text-[1.9rem] uppercase leading-[0.97] tracking-[-0.02em] text-[#b49a6c] sm:text-[2.2rem] md:text-[2.45rem] lg:text-[2.7rem]">
            <span className="block md:whitespace-nowrap">Ease of access &</span>
            <span className="block md:whitespace-nowrap">prime landmarks</span>
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.18fr)_minmax(19rem,0.82fr)] lg:items-start lg:gap-16 xl:gap-20">
            <div>
              <img
                src={orleanLocationMapLight}
                alt="Global Edifice Orlean location map"
                className="w-full object-contain"
              />
            </div>

            <div className="border-t border-[#e8dbc8]">
              <div className="space-y-1">
                {connectivityGroups.map((group) => (
                  <div key={group.id} className="border-b border-[#e8dbc8] py-1">
                    <button
                      type="button"
                      aria-expanded={activeConnectivityGroup === group.id}
                      aria-controls={`connectivity-panel-${group.id}`}
                      onClick={() =>
                        setActiveConnectivityGroup((current) =>
                          current === group.id ? null : group.id,
                        )
                      }
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="font-display text-[1.3rem] leading-none text-[#b49a6c] md:text-[1.55rem]">
                        {group.label}
                      </span>
                      <span className="text-[1.65rem] leading-none text-[#b49a6c]">
                        {activeConnectivityGroup === group.id ? "−" : "+"}
                      </span>
                    </button>

                    {activeConnectivityGroup === group.id ? (
                      <div id={`connectivity-panel-${group.id}`} className="pb-5">
                        <ul className="space-y-2.5 text-[0.94rem] leading-[1.55] text-[#2f2a24]">
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
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
          <p className="eyebrow">Get To Know</p>
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
                  <span className="pr-6 text-[0.98rem] font-medium leading-[1.7] tracking-[0.14em] text-[#c0a57a] md:text-[1.02rem]">
                    {item.question}
                  </span>
                  <span className="mt-0.5 shrink-0 text-[1.8rem] leading-none text-[#b49a6c]">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>

                {isOpen ? (
                  <div
                    id={`faq-panel-${item.id}`}
                    className="max-w-[44rem] pb-7 pr-12 text-[0.95rem] leading-[1.85] text-[#5f574d] md:pb-8 md:pr-16"
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
      phone,
      message,
      project: ORLEAN_TITLE,
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
          alt="Orlean contact lounge"
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

          {status === "success" ? (
            <div className="rounded-[1.45rem] bg-[#fffdfa] p-7 text-center text-[#1f1d1a] shadow-[0_28px_60px_-42px_rgba(0,0,0,0.55)] md:p-8">
              <h3 className="font-display text-[2.35rem] leading-none text-[#1f1d1a] md:text-[2.5rem]">
                Thank you!
              </h3>
              <p className="mt-3 text-[0.98rem] font-medium text-[#7b7369]">
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
              <p className="mt-2 text-[0.98rem] font-medium text-[#7b7369]">
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
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Your number"
                    className={inputClassName}
                  />
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

function OrleanPage() {
  useOrleanMetadata();

  return (
    <main className="bg-[#fbf7f0] text-[#163849]">
      <SiteHeader />
      <HeroSection />
      <HeroStatStrip />
      <OverviewSection />
      <AmenitiesSection />
      <PlanSection />
      <GallerySection />
      <LocationSection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
