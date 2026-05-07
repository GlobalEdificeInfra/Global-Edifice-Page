import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import geAmenityGardens from "@/assets/ge-amenity-gardens.jpg";
import geContactInterior from "@/assets/ge-contact-interior.jpg";
import geLogo from "@/assets/ge-logo.png";
import geProjectLifestyle from "@/assets/ge-project-lifestyle.png";
import theClanBanner from "@/assets/The-clan-project.png";
import connectivityMapImage from "@/assets/map.png";
import masterPlanImage from "@/assets/master-plan.png";
import projectClan from "@/assets/project-clan.jpg";
import promiseBalcony from "@/assets/promise-balcony.jpg";
import theClanHall from "@/assets/the-clan-hall.png";
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

export const Route = createFileRoute("/projects/the-clan")({
  component: TheClanPage,
  head: () => ({
    meta: [{ title: CLAN_TITLE }, { name: "description", content: CLAN_DESCRIPTION }],
  }),
});

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const detailNav = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "route", to: "/projects" as const },
  { label: "RESOURCES", kind: "anchor", href: "#amenities" },
  { label: "CONTACT", kind: "routeHash", to: "/projects" as const, hash: "contact" },
] as const;

type DetailNavItem = (typeof detailNav)[number];
type PlanMode = "masterplan" | "floorplan";

const heroStats = [
  { label: "Typology", value: "2 & 3 Bed", detail: "Signature residences" },
  { label: "Price", value: "Starting", detail: "From 76 Lakhs*" },
  { label: "Location", value: "Bagalur-Sarjapura", detail: "Bangalore" },
  { label: "RERA", value: "Compliant", detail: "RERA approved" },
] as const;

const metrics = [
  { value: "257", label: "Signature Residences" },
  { value: "3.5 Acres", label: "Land Area" },
  { value: "G+9", label: "Floor Structure" },
] as const;

const amenitySlides = [
  {
    title: "Swimming Pool Deck",
    description:
      "A resort-like pool edge with lounge seating, landscaped surrounds, and an elevated leisure atmosphere built into everyday life.",
    image: geProjectLifestyle,
    alt: "The Clan swimming pool and leisure deck",
  },
  {
    title: "Landscaped Greens",
    description:
      "Greener edges, shaded walking paths, and planted pockets that soften daily movement throughout the community.",
    image: geAmenityGardens,
    alt: "The Clan landscaped gardens",
  },
  {
    title: "Skyline Balcony Living",
    description:
      "Signature curves, broader decks, and quiet outdoor corners shaped for slower mornings and longer evenings.",
    image: promiseBalcony,
    alt: "The Clan balcony living experience",
  },
] as const;

const galleryImages = [
  {
    title: "Club Veranda",
    image: geAmenityGardens,
    alt: "The Clan outdoor social veranda",
  },
  {
    title: "Arrival & Pool Edge",
    image: geProjectLifestyle,
    alt: "The Clan pool and arrival edge",
  },
  {
    title: "Landscape Court",
    image: projectClan,
    alt: "The Clan landscape court and facade",
  },
] as const;

const connectivityGroups = [
  {
    id: "institutes",
    label: "Institutes",
    items: [
      "Azim Premji University - 13 min",
      "Chrysalis High School - 15 min",
      "Oakridge International School - 14 min",
      "Ryan International School - 16 min",
      "Greenwood High Sarjapur - 21 min",
      "TISB - 23 min",
    ],
  },
  {
    id: "it-corridors",
    label: "IT Corridors",
    items: [
      "Wipro Campus - 14 min",
      "RGA Tech Park - 16 min",
      "RMZ Ecoworld - 24 min",
      "Electronic City Link - 28 min",
    ],
  },
  {
    id: "hospitals",
    label: "Hospitals",
    items: [
      "Motherhood Hospital - 18 min",
      "Sparsh Hospital - 16 min",
      "Narayana Multispeciality - 23 min",
    ],
  },
  {
    id: "shopping",
    label: "Shopping",
    items: [
      "Decathlon Sarjapur - 12 min",
      "Forum Value Mall - 20 min",
      "Neighborhood retail - under 10 min",
    ],
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
  if (item.kind === "anchor") {
    return (
      <a href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    );
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

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 ${pageGutterClass} py-4 md:gap-6 md:py-7`}
      >
        <Link to="/" className="shrink-0">
          <img
            src={geLogo}
            alt="Global Edifice - The Foundation of Trust"
            className="w-[112px] [filter:brightness(0)_invert(1)] md:w-[160px]"
          />
        </Link>

        <div className="hidden items-center md:flex">
          <nav className="flex items-center gap-8 rounded-full bg-white/96 px-7 py-3 text-[0.62rem] font-medium tracking-[0.14em] text-[#b79a69] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            {detailNav.map((item) => (
              <DetailNavigationLink key={item.label} item={item} />
            ))}
            <Link
              to="/projects"
              hash="contact"
              className="rounded-full bg-[#b49a6c] px-4 py-1.5 text-white transition hover:bg-[#9f8658]"
            >
              ENQUIRE
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/projects"
            hash="contact"
            className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.62rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.68rem]"
          >
            ENQUIRE
          </Link>

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
          className={`overflow-hidden rounded-[1.15rem] bg-white/94 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <nav id="clan-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {detailNav.map((item) => (
              <DetailNavigationLink
                key={item.label}
                item={item}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block rounded-[0.95rem] px-4 py-3 text-[0.72rem] font-medium tracking-[0.16em] text-[#b79a69] transition hover:bg-[#f6f1e8] hover:text-[#123a4c]"
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
    <div>
      <div className="flex items-end gap-2 text-[#177547]">
        <span className="font-display text-[1.85rem] leading-none italic md:text-[2rem]">The</span>
        <span className="text-[2.1rem] font-medium leading-none tracking-[0.08em] md:text-[2.35rem]">
          CLAN
        </span>
      </div>
      <p className="mt-1 text-[0.5rem] uppercase tracking-[0.34em] text-[#3d8b61] md:text-[0.54rem]">
        Community is the new luxury
      </p>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1b2530] text-white">
      <img
        src={theClanBanner}
        alt="The Clan hero residence"
        className="absolute inset-0 h-full w-full object-cover object-[46%_42%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,15,22,0.12)_0%,rgba(9,15,22,0.08)_34%,rgba(9,15,22,0.76)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,15,22,0.04)_0%,rgba(9,15,22,0.02)_30%,rgba(9,15,22,0.3)_68%,rgba(9,15,22,0.48)_100%)]" />

      <ProjectDetailNav />

      <div
        className={`relative mx-auto flex min-h-[35rem] max-w-7xl items-end justify-start ${pageGutterClass} pb-16 pt-28 md:min-h-[41rem] md:pb-20 md:pt-36 lg:pb-22`}
      >
        <div className="max-w-[48rem] text-left md:ml-[9.5rem] md:max-w-[54rem] lg:ml-[11rem] lg:max-w-[58rem]">
          <h1 className="text-[2rem] font-light uppercase leading-[1.08] tracking-[0.01em] text-white sm:text-[2.4rem] md:text-[2.9rem] lg:text-[3.15rem] xl:text-[3.3rem]">
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
    <section className="relative z-10 -mt-10 bg-transparent md:-mt-12">
      <div className={pageContainerClass}>
        <div className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-[0.7rem] border border-[#e8dbc6] bg-[#e8dbc6] shadow-[0_24px_42px_-36px_rgba(51,38,18,0.35)] md:grid-cols-4">
          {heroStats.map((item) => (
            <div key={item.label} className="bg-[#fbf7f0] px-5 py-4 text-center md:px-6 md:py-5">
              <p className="text-[0.55rem] uppercase tracking-[0.28em] text-[#c0a36e]">
                {item.label}
              </p>
              <p className="mt-3 text-[0.98rem] font-medium text-[#292521] md:text-[1.08rem]">
                {item.value}
              </p>
              <p className="mt-1 text-[0.76rem] leading-[1.4] text-[#7b7469] md:text-[0.8rem]">
                {item.detail}
              </p>
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
        className={`${pageContainerClass} grid gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(20rem,0.94fr)] lg:items-start`}
      >
        <div className="overflow-hidden rounded-[0.3rem] shadow-[0_24px_45px_-38px_rgba(0,0,0,0.28)]">
          <img
            src={theClanHall}
            alt="The Clan living hall interior"
            className="h-full min-h-[18rem] w-full object-cover"
          />
        </div>

        <div className="max-w-[31rem] lg:justify-self-end lg:pt-6">
          <ClanWordmark />

          <h2 className="mt-7 max-w-[24rem] text-[1.24rem] font-medium uppercase leading-[1.45] tracking-[0.05em] text-[#ab8d5c] md:text-[1.48rem]">
            <span className="block">A tapestry of timeless</span>
            <span className="block">architecture & belonging</span>
          </h2>

          <div className="mt-7 space-y-5 text-[0.92rem] leading-[1.95] text-[#80776d] md:text-[0.96rem]">
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
            to="/projects"
            hash="contact"
            className="mt-8 inline-flex items-center gap-2 border border-[#ddcdb1] bg-white px-4 py-2.5 text-[0.64rem] font-medium uppercase tracking-[0.24em] text-[#9b7c4a] transition hover:border-[#b79a69] hover:text-[#123a4c]"
          >
            Download Brochure
            <Download className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className={`${pageContainerClass} mt-9`}>
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[0.55rem] bg-[#b79a69] text-white shadow-[0_24px_48px_-38px_rgba(94,68,25,0.45)] md:grid-cols-3">
          {metrics.map((item, index) => (
            <div
              key={item.label}
              className={`px-6 py-5 text-center ${index < metrics.length - 1 ? "border-b border-white/18 md:border-b-0 md:border-r" : ""}`}
            >
              <p className="text-[1.25rem] font-medium tracking-[0.18em] md:text-[1.5rem]">
                {item.value}
              </p>
              <p className="mt-1 text-[0.56rem] uppercase tracking-[0.32em] text-white/82 md:text-[0.6rem]">
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

  return (
    <section id="amenities" className="bg-[#fbf8f3] py-20 md:py-24">
      <div className={pageContainerClass}>
        <div className="max-w-[30rem]">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#b79a69]">
            World-class amenities
          </p>
          <h2 className="mt-3 text-[2.15rem] font-medium leading-[1.02] text-[#21201d] md:text-[3rem]">
            <span className="block">Elevate Your Everyday</span>
            <span className="block">with World-Class Amenities</span>
          </h2>
        </div>

        <div className="mt-10">
          <div className="relative overflow-hidden rounded-[0.3rem] bg-white shadow-[0_24px_50px_-42px_rgba(0,0,0,0.28)]">
            <img
              src={currentSlide.image}
              alt={currentSlide.alt}
              className="h-[18rem] w-full object-cover object-center md:h-[31rem]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.62)_100%)] px-5 pb-5 pt-10 md:px-7 md:pb-6">
              <p className="text-[0.9rem] text-white md:text-[1rem]">{currentSlide.title}</p>
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
    <div className="overflow-hidden bg-transparent">
      <img src={masterPlanImage} alt="The Clan masterplan" className="block w-full" />
    </div>
  );
}

function FloorplanDiagram() {
  const rooms = [
    { label: "LIVING", className: "left-[6%] top-[14%] h-[34%] w-[36%]" },
    { label: "DINING", className: "left-[44%] top-[14%] h-[24%] w-[20%]" },
    { label: "KITCHEN", className: "left-[66%] top-[14%] h-[24%] w-[20%]" },
    { label: "BED 1", className: "left-[44%] top-[40%] h-[34%] w-[20%]" },
    { label: "BED 2", className: "left-[66%] top-[40%] h-[34%] w-[20%]" },
    { label: "DECK", className: "left-[6%] top-[52%] h-[22%] w-[36%]" },
  ] as const;

  return (
    <div className="relative h-[15rem] overflow-hidden rounded-[1.15rem] bg-[#faf4ea] md:h-[18rem]">
      <div className="absolute inset-[8%] rounded-[1rem] border-2 border-[#cfb58a]" />
      {rooms.map((room) => (
        <div
          key={room.label}
          className={`absolute rounded-[0.9rem] border border-[#d6c3a1] bg-white/90 shadow-[inset_0_0_0_1px_rgba(239,229,210,0.5)] ${room.className}`}
        >
          <div className="flex h-full items-center justify-center text-[0.62rem] font-medium tracking-[0.2em] text-[#8f7343]">
            {room.label}
          </div>
        </div>
      ))}
      <div className="absolute left-[38%] top-[40%] h-[32%] w-[5%] rounded-full bg-[#eadfcb]" />
      <div className="absolute left-[58%] top-[32%] h-[8%] w-[8%] rounded-full bg-[#eadfcb]" />
      <div className="absolute left-[58%] top-[58%] h-[8%] w-[8%] rounded-full bg-[#eadfcb]" />
    </div>
  );
}

function PlanSection() {
  const [planMode, setPlanMode] = useState<PlanMode>("masterplan");

  return (
    <section className="bg-[#fbf8f3] py-20 md:py-24">
      <div className={pageContainerClass}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[36rem]">
            <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#b79a69]">
              Architectural plan
            </p>
            <h2 className="mt-3 text-[2.15rem] font-medium leading-[1.02] text-[#21201d] md:text-[3rem]">
              Beyond Brick And Beam, Lies Intention
            </h2>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#eadfcc] bg-white p-1.5">
            {[
              { id: "masterplan", label: "Masterplan" },
              { id: "floorplan", label: "Floor Plan" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPlanMode(tab.id as PlanMode)}
                className={`rounded-full px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition ${
                  planMode === tab.id
                    ? "bg-[#b79a69] text-white"
                    : "text-[#b79a69] hover:bg-[#f6f1e8] hover:text-[#123a4c]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-9 rounded-[0.6rem] border border-[#eadfcc] bg-white p-4 md:p-6">
          {planMode === "masterplan" ? <MasterplanDiagram /> : <FloorplanDiagram />}

          <div className="mt-4 flex items-center justify-between px-1 text-[0.68rem] uppercase tracking-[0.22em] text-[#9a8760]">
            <span>
              {planMode === "masterplan"
                ? "Curated site circulation"
                : "Thoughtful room sequencing"}
            </span>
            <span>{planMode === "masterplan" ? "Masterplan" : "Floor Plan"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="bg-[#fbf8f3] py-18 md:py-22">
      <div className={pageContainerClass}>
        <div className="max-w-[28rem]">
          <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#b79a69]">Gallery</p>
          <h2 className="mt-3 text-[2.1rem] font-medium leading-[1.02] text-[#21201d] md:text-[2.7rem]">
            The Heartbeat Of Community Living
          </h2>
        </div>

        <div className="mt-8 grid gap-1.5 md:grid-cols-3">
          {galleryImages.map((item) => (
            <div key={item.title} className="group overflow-hidden bg-white">
              <img
                src={item.image}
                alt={item.alt}
                className="h-[12rem] w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[15rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectivityMap() {
  return (
    <div className="relative overflow-hidden rounded-[0.4rem] md:max-w-[31rem]">
      <img
        src={connectivityMapImage}
        alt="The Clan connectivity map"
        className="w-full mix-blend-screen opacity-95"
      />
    </div>
  );
}

function ConnectivitySection() {
  return (
    <section
      className="bg-[#0e6a44] py-18 text-white md:py-24"
      style={{
        backgroundImage:
          "radial-gradient(circle_at_18%_10%, rgba(226,203,150,0.08), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      }}
    >
      <div
        className={`${pageContainerClass} grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)]`}
      >
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#d8c18f]">Connectivity</p>
          <h2 className="mt-3 max-w-[24rem] text-[2.15rem] font-medium leading-[1.02] text-[#d8b57a] md:text-[3rem]">
            At the crossroads of growth and convenience.
          </h2>

          <div className="mt-8 max-w-[32rem]">
            <ConnectivityMap />
          </div>
        </div>

        <div className="lg:pt-8">
          <Accordion
            type="single"
            collapsible
            defaultValue="institutes"
            className="border-white/12 bg-transparent"
          >
            {connectivityGroups.map((group) => (
              <AccordionItem key={group.id} value={group.id} className="border-white/12">
                <AccordionTrigger className="py-5 text-[0.86rem] font-light uppercase tracking-[0.2em] text-[#d8b57a] hover:no-underline [&>svg]:text-[#d8b57a]">
                  {group.label}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pt-0 text-white/76">
                  <ul className="space-y-2.5 text-[0.9rem] leading-[1.75] md:text-[0.94rem]">
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
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="bg-[#fbf8f3] py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-[1.125rem] md:px-[1.8rem]">
        <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#b79a69]">Get to know</p>
        <h2 className="mt-3 font-display text-[2.35rem] leading-[0.98] text-[#21201d] md:text-[3rem]">
          Frequently Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-1"
          className="mt-10 rounded-[1.35rem] border border-[#eadfcc] bg-white px-5 py-2 shadow-[0_18px_40px_-36px_rgba(0,0,0,0.22)] md:px-7"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-[#efe4d2]">
              <AccordionTrigger className="py-5 text-[0.92rem] leading-[1.6] text-[#3e3832] hover:no-underline [&>svg]:text-[#b79a69] md:text-[1rem]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-0 text-[0.95rem] leading-[1.8] text-[#6d685f]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function TheClanPage() {
  useClanMetadata();

  return (
    <>
      <main className="bg-[#fbf8f3] text-[#163849]">
        <HeroSection />
        <HeroStatStrip />
        <OverviewSection />
        <AmenitiesSection />
        <PlanSection />
        <GallerySection />
        <ConnectivitySection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
