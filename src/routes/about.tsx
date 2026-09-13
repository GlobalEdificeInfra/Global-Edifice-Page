import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about/about-hero.png";
import geContactInterior from "@/assets/about/ge-contact-interior.jpg";
import geLogo from "@/assets/shared/ge-logo.png";
import projectLifestyle from "@/assets/about/ge-project-lifestyle.png";
import directorJyothish from "@/assets/about/director-jyothish.jpg";
import directorRakesh from "@/assets/about/director-rakesh.jpg";
import timeline2026 from "@/assets/about/timeline/2026-looking-ahead.jpg";
import timeline2025 from "@/assets/about/timeline/2025-a-decade-of-trust.jpg";
import timeline2023 from "@/assets/about/timeline/2023-expanding-horizons.jpg";
import timeline2021 from "@/assets/about/timeline/2021-a-new-chapter.jpg";
import timeline2019 from "@/assets/about/timeline/2019-building-momentum.jpg";
import timeline2017 from "@/assets/about/timeline/2017-growing-with-purpose.jpg";
import timeline2015 from "@/assets/about/timeline/2015-the-beginning.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ABOUT_TITLE = "About Global Edifice - Before Every Home, There Is a Story";
const ABOUT_DESCRIPTION =
  "Discover Global Edifice's story, leadership, and promise behind thoughtfully planned homes and lasting communities in Bangalore.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: ABOUT_TITLE }, { name: "description", content: ABOUT_DESCRIPTION }],
  }),
});

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const aboutNav = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "anchor", href: "#story" },
  { label: "PROJECTS", kind: "route", to: "/projects" as const },
  { label: "BLOGS", kind: "route", to: "/blogs" as const },
  { label: "CONTACT", kind: "route", to: "/contact" as const },
] as const;

const leaderCards = [
  {
    name: "Mr. Rakesh Reddy",
    role: "Managing Director",
    image: directorRakesh,
    alt: "Portrait of Mr. Rakesh Reddy",
    /** Crop toward the face so framing matches the tighter headshot beside it. */
    imageClassName: "object-[center_18%] scale-[1.08]",
    quote:
      "Every home begins with a dream, but trust turns that dream into reality. At Global Edifice, we build that trust through quality and lasting value.",
  },
  {
    name: "Mr. Jyothish Reddy",
    role: "Managing Director",
    image: directorJyothish,
    alt: "Portrait of Mr. Jyothish Reddy",
    imageClassName: "object-[center_100%] scale-[1.5]",
    quote:
      "Building a home is a responsibility that extends far beyond construction. It is about creating places where families can build their future with confidence.",
  },
];

const missionVisionItems = [
  {
    title: "Our Vision",
    subtitle: "To Shape Communities for Generations to Come",
    paragraphs: [
      "We aspire to create places that remain relevant, desirable and meaningful long after they are built.",
      "By bringing together thoughtful design, quality and a deep understanding of how people live, we aim to create communities that enrich everyday life and stand the test of time.",
      "More than just building homes, we strive to create spaces where people feel a sense of belonging, build lasting memories and enjoy a better quality of life.",
    ],
  },
  {
    title: "Our Mission",
    subtitle: "Build a Legacy of Trust",
    paragraphs: [
      "Our mission is to create thoughtfully planned homes through quality craftsmanship, transparent relationships and a commitment to excellence.",
      "From land selection to project delivery, every decision is guided by one purpose — to build homes that enhance everyday living and create communities people are proud to be part of.",
      "Because the true value of a home is not measured on the day it is delivered, but by the life lived within it.",
    ],
  },
] as const;

const milestoneTimeline = [
  {
    year: "2026",
    image: timeline2026,
    imageAlt: "Global Edifice looking ahead to the future",
    entries: [
      {
        title: "Looking Ahead",
        paragraphs: ["Continuing to build thoughtfully, with a clear vision for the future."],
      },
    ],
  },
  {
    year: "2025",
    image: timeline2025,
    imageAlt: "Global Edifice celebrating 10 years of trust",
    entries: [
      {
        title: "A Decade of Trust",
        paragraphs: ["Celebrating 10 years of growth, relationships and milestones."],
      },
    ],
  },
  {
    year: "2023",
    image: timeline2023,
    imageAlt: "Global Edifice expanding across Bengaluru",
    entries: [
      {
        title: "Expanding Horizons",
        paragraphs: ["Creating new communities shaped around evolving lifestyles."],
      },
    ],
  },
  {
    year: "2021",
    image: timeline2021,
    imageAlt: "Global Edifice entering a new chapter of growth",
    entries: [
      {
        title: "A New Chapter",
        paragraphs: ["Growing our presence while staying committed to quality and customer trust."],
      },
    ],
  },
  {
    year: "2019",
    image: timeline2019,
    imageAlt: "Global Edifice building momentum on site",
    entries: [
      {
        title: "Building Momentum",
        paragraphs: ["Strengthening our portfolio and capabilities across design and construction."],
      },
    ],
  },
  {
    year: "2017",
    image: timeline2017,
    imageAlt: "Global Edifice growing with purpose",
    entries: [
      {
        title: "Growing with Purpose",
        paragraphs: ["Expanding our footprint with a focus on thoughtful residential development."],
      },
    ],
  },
  {
    year: "2015",
    image: timeline2015,
    imageAlt: "Global Edifice laying the foundation",
    entries: [
      {
        title: "The Beginning",
        paragraphs: ["Global Edifice begins its journey with a vision to create quality homes in Bengaluru."],
      },
    ],
  },
] as const;

type AboutNavItem = (typeof aboutNav)[number];

function SectionLabel({ children }: { children: string }) {
  return <span className="eyebrow">{children}</span>;
}

function AboutNavigationLink({
  item,
  className = "transition hover:text-[#123a4c]",
  onClick,
}: {
  item: AboutNavItem;
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

function AboutNavigation() {
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
            className={`flex items-center rounded-full font-semibold text-[#996317] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
              isScrolled
                ? "gap-6 border border-white/70 bg-white/84 px-5 py-2 text-[0.68rem] tracking-[0.14em] lg:text-[0.72rem]"
                : "gap-9 bg-white/96 px-7 py-3 text-[0.72rem] tracking-[0.13em] lg:text-[0.76rem]"
            }`}
          >
            {aboutNav.map((item) => (
              <AboutNavigationLink key={item.label} item={item} />
            ))}
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))} className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]">
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
            aria-controls="about-mobile-nav"
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
          <nav id="about-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {aboutNav.map((item) => (
              <AboutNavigationLink
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

function useAboutMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute("content") ?? null;

    document.title = ABOUT_TITLE;

    let metaElement = existingDescription;

    if (!metaElement) {
      metaElement = document.createElement("meta");
      metaElement.setAttribute("name", "description");
      document.head.appendChild(metaElement);
    }

    metaElement.setAttribute("content", ABOUT_DESCRIPTION);

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

function AboutPage() {
  useAboutMetadata();
  const [activeMilestoneYear, setActiveMilestoneYear] = useState<string>("2025");
  const activeMilestone =
    milestoneTimeline.find((item) => item.year === activeMilestoneYear) ?? milestoneTimeline[0];

  return (
    <>
      <main className="bg-[#f7f2eb] text-[#163849]">
        <SiteHeader />
        <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1e1712] text-white">
          <img
            src={aboutHero}
            alt="Global Edifice signature residence"
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-[28%_42%] md:object-[center_42%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(255,255,255,0.1),transparent_26%),linear-gradient(90deg,rgba(20,14,11,0.16)_0%,rgba(20,14,11,0.08)_26%,rgba(20,14,11,0.5)_58%,rgba(20,14,11,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,22,0.12)_0%,rgba(8,15,22,0.02)_34%,rgba(8,15,22,0.66)_100%)]" />

          <div
            className={`relative mx-auto flex min-h-[100svh] max-w-7xl items-center justify-end ${pageGutterClass} pb-10 pt-28 sm:pt-32 md:pb-12 md:pt-28 lg:pt-30`}
          >
            <div className="max-w-[20rem] text-right sm:max-w-[28rem] md:max-w-[36rem] lg:max-w-[42rem]">
              <h1 className="font-display text-[2.05rem] leading-[0.96] tracking-[-0.03em] text-white sm:text-[2.85rem] md:text-[3.85rem] lg:text-[4.45rem]">
                <span className="block">Before Every Home,</span>
                <span className="block">There Is a Story.</span>
              </h1>
            </div>
          </div>
        </section>

        <section id="story" className="bg-[#f7f2eb] pt-14 md:pt-20 lg:pt-24">
          <div className="grid lg:grid-cols-2 lg:items-stretch">
            <div className="flex items-center px-[1.125rem] py-14 text-left md:px-[1.8rem] md:py-20 lg:py-24 lg:pr-12 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))] xl:pr-16">
              <div className="w-full max-w-[36rem]">
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[#7a756e] sm:text-[0.82rem]">
                  Our Story
                </p>
                <h2 className="mt-4 font-display text-[2rem] leading-[1.08] text-[#c0a56e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  <span className="block">Built on Trust.</span>
                  <span className="block">Driven by Purpose.</span>
                </h2>

                <div className="mt-6 space-y-5 text-base font-normal leading-[1.9] text-[#7a756e] md:mt-8">
                  <p>
                    For more than a decade, Global Edifice has been creating homes shaped by
                    thoughtful design, considered planning and a commitment to quality.
                  </p>
                  <p>
                    We believe the difference lies in the details &mdash; from choosing the right
                    location and planning spaces with purpose, to creating homes that respond
                    naturally to the way people live. As Bengaluru has evolved, so have the
                    aspirations of its homeowners. Our approach has evolved with it, but our purpose
                    has remained constant: to create well-crafted residences and communities that
                    offer more than a place to live &mdash; they offer a better way to live.
                  </p>
                  <p>
                    Every project is an opportunity to build with intention, create lasting value
                    and earn the trust of the people who choose to call it home.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden lg:min-h-[40rem] xl:min-h-[44rem]">
              <img
                src={projectLifestyle}
                alt="Global Edifice lifestyle amenities"
                className="h-full min-h-[24rem] w-full object-cover object-[56%_center] sm:min-h-[28rem] md:min-h-[36rem]"
              />
            </div>
          </div>
        </section>

        <section id="values" className="bg-[#f7f2eb] pt-14 md:pt-20 lg:pt-24">
          <div className="grid overflow-hidden lg:grid-cols-2 lg:items-stretch">
            <div className="w-full overflow-hidden lg:min-h-[40rem] xl:min-h-[44rem]">
              <img
                src={geContactInterior}
                alt="Global Edifice interior living space"
                className="h-full min-h-[24rem] w-full object-cover object-center sm:min-h-[28rem] md:min-h-[36rem]"
                loading="lazy"
              />
            </div>

            <div className="relative flex items-center justify-start overflow-hidden bg-[linear-gradient(180deg,#143f54_0%,#123a4c_100%)] px-6 py-14 text-white sm:px-8 md:px-12 md:py-20 lg:min-h-[40rem] lg:px-14 lg:py-24 xl:min-h-[44rem] xl:px-18">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_22px)] opacity-45" />
              <div className="relative mx-auto w-full max-w-[36rem] text-left lg:mx-0">
                <h2 className="font-display text-[2.3rem] leading-[0.98] text-[#c49a4e] sm:text-[2.75rem] md:text-[3.15rem] lg:text-[3.4rem]">
                  Who We Are
                </h2>
                <p className="mt-6 text-[1.15rem] font-semibold uppercase leading-[1.35] tracking-[0.06em] text-white sm:text-[1.3rem] md:text-[1.4rem]">
                  <span className="block">More Than Builders.</span>
                  <span className="block">We Create Communities.</span>
                </p>
                <div className="mt-8 space-y-5 text-base font-normal leading-[1.85] text-white/92 md:mt-9">
                  <p>
                    Behind every Global Edifice development is a team of architects, engineers,
                    planners, designers, and construction professionals united by one belief: great
                    homes are built around people.
                  </p>
                  <p>
                    From thoughtfully planned layouts and open spaces to the small details that
                    shape everyday living, we design environments that bring comfort, connection,
                    and a sense of belonging.
                  </p>
                  <p>
                    Because while buildings define skylines, communities shape lives. For us,
                    success isn&apos;t measured only by the homes we build &mdash; but by the trust
                    we earn and the lives that grow within them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="leadership" className="bg-[#f7f2eb] py-14 md:py-20 lg:py-24">
          <div className={pageContainerClass}>
            <div className="mx-auto max-w-[60rem] text-center">
              <h2 className="font-display text-[2rem] leading-[0.98] text-[#c0a56e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                Board of Directors
              </h2>
              <p className="mt-4 text-[0.85rem] font-bold uppercase leading-[1.5] tracking-[0.14em] text-[#7a756e] sm:text-[0.92rem] md:text-[1rem]">
                Leadership Built on Vision. Guided by Values.
              </p>

              <div className="mx-auto mt-7 max-w-[54rem] space-y-5 text-base font-normal leading-[1.85] text-[#7a756e] md:mt-8">
                <p>
                  Behind every Global Edifice project is a leadership team driven by integrity,
                  responsibility, and a long-term vision for creating exceptional communities.
                </p>
                <p>
                  Together, they continue to shape Global Edifice with a commitment to thoughtful
                  development, transparent practices, and delivering lasting value to every
                  homeowner.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-[64rem] items-stretch gap-8 sm:mt-14 md:mt-16 md:grid-cols-2 md:gap-8 lg:gap-10">
              {leaderCards.map((leader) => (
                <article
                  key={leader.name}
                  className="flex h-full flex-col overflow-hidden border border-[#e8e2d8] bg-white text-left"
                >
                  <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-[#ebe6df]">
                    <img
                      src={leader.image}
                      alt={leader.alt}
                      className={`absolute inset-0 h-full w-full object-cover ${leader.imageClassName}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-7 md:px-8 md:py-8">
                    <p className="min-h-[6.5rem] text-base font-normal italic leading-[1.75] text-[#7a756e] md:min-h-[7.25rem] md:leading-[1.8]">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                    <h3 className="mt-auto pt-6 font-display text-[1.45rem] leading-[1.05] text-[#c0a56e] sm:text-[1.6rem] md:text-[1.75rem]">
                      {leader.name}
                    </h3>
                    <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#7a756e]">
                      {leader.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="bg-[#123f54]">
          <div className="grid grid-cols-[minmax(0,1fr)] overflow-hidden text-white lg:grid-cols-2 lg:items-stretch">
            <div className="relative flex min-w-0 flex-col justify-start py-10 pr-5 pl-[1.125rem] sm:pr-6 md:py-12 md:pr-12 md:pl-[1.8rem] lg:py-14 lg:pr-14 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_24px)] opacity-45" />

              <div className="relative max-w-[46rem]">
                <div className="flex items-center gap-4">
                  <span className="text-[0.85rem] font-bold uppercase tracking-[0.24em] text-white sm:text-[0.92rem]">
                    Timeline
                  </span>
                  <span className="h-px w-10 bg-white/35" />
                </div>
                <h2 className="mt-4 font-display text-[2.2rem] leading-[1.02] text-[#c49a4e] sm:text-[2.6rem] md:text-[3.15rem] lg:text-[3.4rem]">
                  A Decade of Building Trust
                </h2>
                <p className="mt-5 text-base font-normal leading-[1.75] text-white/88">
                  Every milestone reflects a promise fulfilled.
                </p>
                <p className="mt-5 text-base font-normal leading-[1.85] text-white/82">
                  Over the past decade, Global Edifice has grown through consistent delivery,
                  responsible development, and the confidence of hundreds of homeowners who chose us
                  to be part of their journey.
                </p>
                <p className="mt-4 text-base font-normal leading-[1.85] text-white/82">
                  As Bangalore continues to evolve, so do we—building communities that are designed
                  for today&apos;s lifestyle while creating value for generations to come.
                </p>

                <div className="mt-8 md:mt-10">
                  <div className="relative">
                    <div className="flex items-end justify-between gap-0 overflow-x-auto pb-5 snap-x [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 sm:pr-4 [&::-webkit-scrollbar]:hidden">
                      {[...milestoneTimeline].reverse().map((milestone) => {
                        const isActive = milestone.year === activeMilestoneYear;

                        return (
                          <button
                            key={milestone.year}
                            type="button"
                            onClick={() => setActiveMilestoneYear(milestone.year)}
                            className={`relative min-h-11 min-w-0 flex-1 snap-start px-0 py-2 text-center text-[0.8rem] transition min-[375px]:text-[0.88rem] sm:px-1 sm:text-[1rem] md:text-[1.12rem] ${
                              isActive
                                ? "font-semibold text-white"
                                : "text-white/55 hover:text-white/80"
                            }`}
                          >
                            {milestone.year}
                            {isActive ? (
                              <span className="absolute left-1/2 top-full mt-2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-[#c49a4e]" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                    <div className="h-px w-full bg-white/35" />
                  </div>
                </div>

                <div className="mt-10 max-w-[34rem] space-y-8 md:mt-12">
                  {activeMilestone.entries.map((entry) => (
                    <article
                      key={`${activeMilestone.year}-${entry.title}`}
                      className="border-b border-white/12 pb-8 last:border-b-0 last:pb-0"
                    >
                      <h3 className="font-display text-[1.65rem] leading-[1] text-[#c49a4e] sm:text-[1.9rem] md:text-[2.3rem]">
                        {entry.title}
                      </h3>
                      <p className="mt-3 font-display text-[2.2rem] leading-none text-[#c49a4e] sm:text-[2.6rem] md:text-[3.6rem]">
                        {activeMilestone.year}
                      </p>

                      <div className="mt-5 space-y-4 text-base font-normal leading-[1.85] text-white/90 sm:leading-[1.9]">
                        {entry.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[22rem] overflow-hidden sm:min-h-[26rem] lg:min-h-full">
              <img
                src={activeMilestone.image}
                alt={activeMilestone.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="mission-vision" className="bg-[#fbf8f2]">
          <div className={`${pageContainerClass} py-14 md:py-20 lg:py-24`}>
            <div className="grid lg:grid-cols-2">
              <article className="lg:pr-10 xl:pr-14">
                <h2 className="font-display text-[2rem] leading-[0.98] text-[#c0a56e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  {missionVisionItems[0].title}
                </h2>
                <p className="mt-4 text-[1.05rem] font-bold leading-[1.45] text-[#7a756e] md:mt-5 md:text-[1.2rem]">
                  {missionVisionItems[0].subtitle}
                </p>

                <div className="mt-7 space-y-5 text-left text-base font-normal leading-[1.9] text-[#7a756e] md:mt-9 md:space-y-6">
                  {missionVisionItems[0].paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>

              <article className="border-t border-[#d8c8ac] pt-10 md:pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 xl:pl-14">
                <h2 className="font-display text-[2rem] leading-[0.98] text-[#c0a56e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  {missionVisionItems[1].title}
                </h2>
                <p className="mt-4 text-[1.05rem] font-bold leading-[1.45] text-[#7a756e] md:mt-5 md:text-[1.2rem]">
                  {missionVisionItems[1].subtitle}
                </p>

                <div className="mt-7 space-y-5 text-left text-base font-normal leading-[1.9] text-[#7a756e] md:mt-9 md:space-y-6">
                  {missionVisionItems[1].paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
