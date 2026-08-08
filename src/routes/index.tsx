import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import geHero from "@/assets/home/ge-hero.png";
import geStoryBalcony from "@/assets/home/ge-story-balcony.jpg";
import geAmenityGardens from "@/assets/home/ge-amenity-gardens.jpg";
import geAmenityJogging from "@/assets/home/ge-amenity-jogging.png";
import geAmenityYoga from "@/assets/home/ge-amenity-yoga.png";
import projectOrlean from "@/assets/projects/orlean/project-orlean-layer10.jpg";
import projectLegacy from "@/assets/projects/legacy/project-legacy.jpg";
import projectClan from "@/assets/projects/the-clan/The-clan-project.png";
import iconIntegrity from "@/assets/home/icon-integrity.png";
import iconDelivery from "@/assets/home/icon-delivery.png";
import iconRera from "@/assets/home/icon-rera.png";
import iconValue from "@/assets/home/icon-value.png";
import { SiteGetInTouch } from "@/components/site-get-in-touch";
import { SiteHeader } from "@/components/site-header";
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


const promiseItems = [
  { icon: iconIntegrity, label: "Architectural Integrity", lines: ["Architectural", "Integrity"] },
  { icon: iconDelivery, label: "On-Time Delivery", lines: ["On-Time", "Delivery"] },
  { icon: iconRera, label: "RERA Compliance", lines: ["RERA", "Compliance"] },
  { icon: iconValue, label: "Long-Term Value", lines: ["Long-Term", "Value"] },
];

const legacyStats = [
  { value: "6", lines: ["Projects", "Completed"] },
  { value: "2", lines: ["Ongoing", "Projects"] },
  { value: "8", lines: ["Upcoming", "Projects"] },
  { value: "10", lines: ["Years of", "Legacy"] },
  { value: "1 MN", lines: ["Sq. Ft", "Living Spaces"] },
  { value: "650+", lines: ["Happy", "Customers"] },
];

const portfolioProjects = [
  {
    name: "GLOBAL EDIFICE ORLEAN",
    nameLines: ["Global Edifice", "Orlean"],
    price: "76 LAKHS*",
    location: "OFF. CHANDAPURA ROAD, BANGALORE",
    unitLabel: "2BHK RESIDENCES",
    image: projectOrlean,
    alt: "Global Edifice Orlean",
    detailHref: "/projects/orlean",
    status: "Ongoing",
  },
  {
    name: "GLOBAL EDIFICE THE CLAN",
    nameLines: ["Global Edifice", "The Clan"],
    price: "70 LAKHS*",
    location: "BAGALUR - SARJAPURA, BANGALORE",
    unitLabel: "2 & 3 BHK RESIDENCES",
    image: projectClan,
    alt: "Global Edifice The Clan",
    detailHref: "/projects/the-clan",
    status: "Ongoing",
  },
  {
    name: "GLOBAL EDIFICE LEGACY",
    nameLines: ["Global Edifice", "Legacy"],
    price: "62 LAKHS*",
    location: "OFF. CHANDAPURA ROAD, BANGALORE",
    unitLabel: "2BHK RESIDENCES",
    image: projectLegacy,
    alt: "Global Edifice Legacy",
    detailHref: "/projects",
    status: "Ongoing",
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

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[44rem] overflow-hidden bg-[#17394a] text-white md:min-h-screen"
    >
      <img
        src={geHero}
        alt="Luxury Global Edifice residence"
        className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[center_45%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_42%,rgba(6,12,18,0.35)_68%,rgba(6,12,18,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,22,0.22)_0%,transparent_30%,transparent_58%,rgba(8,15,22,0.5)_100%)]" />

      <div
        className={`relative mx-auto flex min-h-[44rem] max-w-7xl items-end ${pageGutterClass} pb-[calc(4rem+5vh)] pt-28 sm:pb-[calc(5rem+5vh)] md:min-h-screen md:pb-[calc(6rem+5vh)] lg:pb-[calc(7rem+5vh)]`}
      >
        <div className="grid w-full grid-cols-1 items-end gap-8 md:grid-cols-[1fr_minmax(18rem,28rem)] md:gap-10">
          {/* Left: buttons — bottom aligns with subtitle last line */}
          <div className="order-2 flex flex-wrap items-center gap-3 sm:gap-4 md:order-1">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-full bg-[#0f1319]/90 px-6 py-3.5 text-[0.82rem] font-medium text-white backdrop-blur-[2px] transition hover:bg-black sm:px-7 sm:text-[0.88rem]"
            >
              Explore residences
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/85 bg-transparent px-6 py-3.5 text-[0.82rem] font-medium text-white transition hover:bg-white/10 sm:px-7 sm:text-[0.88rem]"
            >
              Schedule a site visit
            </Link>
          </div>

          {/* Right: 4-line title + 3-line subtitle */}
          <div className="order-1 text-right md:order-2">
            <h1 className="font-display text-[2.15rem] font-normal uppercase leading-[1] tracking-[-0.02em] text-white [font-synthesis:none] [text-shadow:0_2px_28px_rgba(0,0,0,0.45)] sm:text-[3rem] md:text-[3.55rem] lg:text-[4rem] xl:text-[4.35rem]">
              <span className="block whitespace-nowrap">We Don&apos;t</span>
              <span className="block whitespace-nowrap">Just Build,</span>
              <span className="block whitespace-nowrap">We Redefine</span>
              <span className="block whitespace-nowrap">Living</span>
            </h1>
            <p className="mt-6 text-[0.88rem] leading-[1.65] text-white/92 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)] sm:text-[0.96rem] md:text-[1rem] md:leading-[1.7]">
              <span className="block">A boutique studio of architects and craftsmen, sculpting</span>
              <span className="block">premium mid-rise residences where every detail is</span>
              <span className="block">deliberate, and every home endures.</span>
            </p>
          </div>
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

            <h2 className="mt-5 font-display text-[2.1rem] leading-[0.98] tracking-[-0.018em] text-[#1f1d1a] sm:text-[2.7rem] md:text-[3.05rem] lg:text-[2.55rem] xl:text-[2.72rem]">
              Built on Trust.
              <span className="block">Driven by Purpose.</span>
            </h2>

            <h3 className="mt-8 text-[1.05rem] font-medium uppercase leading-[1.35] tracking-[0.1em] text-[#c0a56e] sm:text-[1.18rem] md:mt-10 md:text-[1.4rem] lg:text-[1.5rem]">
              <span className="block">Every Home Begins</span>
              <span className="block">With a Promise</span>
            </h3>

            <div className="mt-8 max-w-[32.5rem] space-y-5 text-[0.95rem] leading-[1.8] text-[#7a756e] md:mt-9 md:text-[1rem] lg:max-w-[33.5rem]">
              <p>
                Global Edifice was founded with a simple belief: homes should make life better. As
                Bangalore grew into one of India&apos;s most dynamic cities, so did the expectations
                of its homebuyers.
              </p>
              <p>
                From selecting the right locations to designing every home with care, our focus has
                always been on creating developments that combine thoughtful planning, quality
                construction, and lasting value. More than a decade later, that purpose remains
                unchanged.
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

function LegacyStats() {
  return (
    <section
      aria-label="Company achievements"
      className="relative overflow-hidden bg-[#0f4157]"
      style={tealContourBackgroundStyle}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {legacyStats.map((stat, index) => (
            <li
              key={stat.lines.join(" ")}
              className="relative flex flex-col items-center justify-center px-2 py-11 text-center sm:py-12 md:py-14 lg:py-[3.35rem]"
            >
              {index < legacyStats.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 hidden h-[3.4rem] w-px -translate-y-1/2 bg-[#c5a46e]/45 lg:block"
                />
              ) : null}
              {index % 2 === 0 ? (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 h-[3.4rem] w-px -translate-y-1/2 bg-[#c5a46e]/45 sm:hidden"
                />
              ) : null}
              {index % 3 !== 2 ? (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 hidden h-[3.4rem] w-px -translate-y-1/2 bg-[#c5a46e]/45 sm:block lg:hidden"
                />
              ) : null}
              <p className="font-display text-[2.05rem] leading-none tracking-[-0.01em] text-[#c5a46e] sm:text-[2.2rem] md:text-[2.35rem] lg:text-[2.45rem] xl:text-[2.55rem]">
                {stat.value}
              </p>
              <p className="mt-3 text-[0.78rem] font-medium uppercase leading-[1.25] tracking-[0.12em] text-[#c5a46e] sm:mt-3.5 sm:text-[0.84rem] md:text-[0.9rem] md:tracking-[0.14em]">
                <span className="block whitespace-nowrap">{stat.lines[0]}</span>
                <span className="block whitespace-nowrap">{stat.lines[1]}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Projects() {
  const [activeTab, setActiveTab] = useState<"All" | "Ongoing" | "Completed">("All");

  const filteredProjects = portfolioProjects.filter((project) =>
    activeTab === "All" ? true : project.status === activeTab,
  );

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
              <button
                onClick={() => setActiveTab("All")}
                className={`transition-colors ${activeTab === "All" ? "text-[#a8762b]" : "text-[#dbc9a7] hover:text-[#a8762b]"}`}
              >
                All
              </button>
              <span className="text-[#dbc9a7]">|</span>
              <button
                onClick={() => setActiveTab("Ongoing")}
                className={`transition-colors ${activeTab === "Ongoing" ? "text-[#a8762b]" : "text-[#dbc9a7] hover:text-[#a8762b]"}`}
              >
                Ongoing
              </button>
              <span className="text-[#dbc9a7]">|</span>
              <button
                onClick={() => setActiveTab("Completed")}
                className={`transition-colors ${activeTab === "Completed" ? "text-[#a8762b]" : "text-[#dbc9a7] hover:text-[#a8762b]"}`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        <div className="group/projects mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {filteredProjects.map((project) => (
            <article
              key={project.name}
              className="group/card origin-center overflow-hidden rounded-[1.2rem] border border-[#eadfcc] bg-[#fffdfa] shadow-[0_22px_40px_-34px_rgba(40,32,23,0.26)] transition-all duration-500 ease-out hover:z-10 hover:scale-[1.045] hover:border-[#d6c3a3] hover:shadow-[0_28px_55px_-28px_rgba(40,32,23,0.38)] group-hover/projects:opacity-55 group-hover/projects:hover:opacity-100"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="h-[14rem] w-full object-cover object-center transition-transform duration-700 ease-out md:h-[15rem] group-hover/card:scale-110"
                />
              </div>

              <div className="flex h-full flex-col p-4 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[9.8rem] text-[1.12rem] font-medium uppercase leading-[1.08] text-[#123a4c] md:text-[1.18rem]">
                    <span className="block whitespace-nowrap">{project.nameLines[0]}</span>
                    <span className="block whitespace-nowrap">{project.nameLines[1]}</span>
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

                <p className="mt-4 text-[0.64rem] uppercase tracking-[0.02em] text-[#a8762b]">
                  {project.location}
                </p>

                <div className="mt-10 flex items-center gap-3 text-[0.66rem] uppercase tracking-[0.04em] text-[#123a4c]">
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
                  <Link
                    to={project.detailHref as any}
                    className="inline-flex items-center justify-center rounded-full border border-[#d8c7a8] bg-white px-4 py-3 text-[0.62rem] font-medium uppercase tracking-[0.08em] text-[#1f1d1a] transition hover:border-[#c7b08a] hover:bg-[#faf7f2]"
                  >
                    Know More
                  </Link>
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
            titleClassName="font-semibold text-[#c5a46e]"
          />

          <div className="flex flex-wrap items-center gap-4 border-y border-white/16 py-4 text-[0.82rem] font-semibold uppercase tracking-[0.2em] text-[#c5a46e] md:gap-6 md:px-5">
            <span>Wellness</span>
            <span className="text-white/18">|</span>
            <span>Recreation</span>
            <span className="text-white/18">|</span>
            <span>Convenience</span>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {amenities.map((item) => (
            <article key={item.title} className="group max-w-[22rem]">
              <div className="overflow-hidden rounded-[1.5rem] bg-white/5 shadow-[0_20px_50px_-38px_rgba(0,0,0,0.55)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[15.5rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="mt-7 text-[1.05rem] font-bold uppercase tracking-[0.18em] text-[#c5a46e] md:text-[1.08rem]">
                {item.title}
              </h3>
              <p className="mt-3 text-[1rem] font-medium leading-[1.65] text-white/92 md:text-[1.02rem]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className={pageContainerClass}>
        <SectionHeading
          eyebrow="Testimonials"
          title="Success Stories"
          titleClassName="text-[#123a4c] text-[2.1rem] md:text-[2.65rem]"
        />

        <div className="mt-10 grid gap-5 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#e8e0d4] bg-white px-5 py-6 shadow-[0_12px_28px_-26px_rgba(18,58,76,0.2)] transition-all duration-500 ease-out hover:z-10 hover:scale-[1.025] hover:border-[#d6c8b0] hover:shadow-[0_22px_40px_-24px_rgba(18,58,76,0.28)] md:px-6 md:py-7"
            >
              <div className="relative flex min-h-[3.75rem] items-start justify-between gap-3 md:min-h-[4.25rem]">
                <div className="flex items-center gap-0.5 pt-1 text-[#b49a6c]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[8.5rem] leading-none text-transparent [-webkit-text-stroke:1.6px_#d2c7b6] md:-right-2 md:-top-4 md:text-[9.5rem] md:[-webkit-text-stroke:1.75px_#d2c7b6]"
                >
                  ”
                </span>
              </div>

              <p className="relative mt-4 text-[0.92rem] font-normal italic leading-[1.7] text-[#4f4b45] md:mt-5 md:text-[0.98rem] md:leading-[1.75]">
                {item.quote}
              </p>

              <div className="mt-auto pt-6">
                <h3 className="font-display text-[1.08rem] font-semibold leading-[1.2] text-[#b49a6c] md:text-[1.15rem]">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-[0.8rem] font-medium text-[#8a8378]">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-[#fbf8f4]">
      <SiteHeader />
      <Hero />
      <Story />
      <LegacyStats />
      <Projects />
      <Amenities />
      <Testimonials />
      <SiteGetInTouch />
      <SiteFooter />
    </main>
  );
}
