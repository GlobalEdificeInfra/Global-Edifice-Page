import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about/about-hero.png";
import geContactInterior from "@/assets/about/ge-contact-interior.jpg";
import geLogo from "@/assets/shared/ge-logo.png";
import projectLifestyle from "@/assets/about/ge-project-lifestyle.png";
import directorJyothish from "@/assets/about/director-jyothish.jpg";
import directorRakesh from "@/assets/about/director-rakesh.jpg";
import projectOrlean from "@/assets/projects/orlean/project-orlean.jpg";
import timelineTheClan from "@/assets/about/timeline-the-clan.png";
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
    imageClassName: "object-[center_12%] scale-[1.08]",
    quote:
      "Every home begins with a dream, but trust turns that dream into reality. At Global Edifice, we build that trust through quality and lasting value.",
  },
  {
    name: "Mr. Jyothish Reddy",
    role: "Managing Director",
    image: directorJyothish,
    alt: "Portrait of Mr. Jyothish Reddy",
    imageClassName: "object-[center_22%]",
    quote:
      "Building a home is a responsibility that extends far beyond construction. It is about creating places where families can build their future with confidence.",
  },
];

const missionVisionItems = [
  {
    title: "Our Vision",
    subtitle: "To Shape Communities That Stand the Test of Time.",
    paragraphs: [
      "We envision a future where every Global Edifice development becomes a benchmark for thoughtful urban living.",
      "A future where design serves people, communities encourage belonging, and every home continues to create value for families and investors alike.",
      "Our aspiration is simple—to build places that people are proud to own today and even prouder to pass on tomorrow.",
    ],
  },
  {
    title: "Our Mission",
    subtitle: "Build a Legacy of Trust",
    paragraphs: [
      "Our mission is to create thoughtfully planned homes through quality craftsmanship, transparent relationships, and an unwavering commitment to excellence.",
      "From land selection to project delivery, every decision is guided by one purpose—to build homes that improve everyday living and communities that people are proud to be part of.",
      "Because the true value of a home isn't measured on the day it's delivered. It's measured by the life that's lived within it.",
    ],
  },
] as const;

const milestoneTimeline = [
  {
    year: "2025",
    image: timelineTheClan,
    imageAlt: "Global Edifice The Clan",
    entries: [
      {
        title: "The Clan",
        paragraphs: [
          "The Clan is a living ode to connection, design, and belonging. It's where mindful design meets meaningful living and community becomes the most beautiful form of luxury.",
          "It welcomes families, like-minded individuals and dreamers into a serene, nature-wrapped sanctuary far from the city's restless hum.",
          "Discover our 2 & 3 Bed Signature Residences, where light, space, and comfort converge. Here every brick holds intention while every curve whispers community.",
        ],
      },
    ],
  },
  {
    year: "2024",
    image: projectOrlean,
    imageAlt: "Global Edifice Orlean render",
    entries: [
      {
        title: "Legacy",
        paragraphs: [
          "The way families live continues to evolve. So do the homes they choose.",
          "Legacy was designed around that idea. More open spaces. Better layouts. Everyday convenience. A stronger connection with nature.",
          "From Vastu-compliant homes to thoughtfully planned amenities, every element reflects our continued focus on building communities that remain relevant for years—not just at launch.",
        ],
      },
      {
        title: "Orlean",
        paragraphs: [
          "With Orlean, we explored a more refined expression of modern living.",
          "Spacious residences without common walls, abundant natural light, generous ventilation, and carefully planned interiors come together to create homes that feel open, comfortable, and timeless.",
          "Located in one of South Bengaluru's emerging residential destinations, Orlean reflects our commitment to thoughtful design, lasting construction quality, and homes that continue to reward homeowners long after they move in.",
        ],
      },
    ],
  },
  {
    year: "2023",
    image: "/project-images/completed-project-images/cresent-compPorjects-img.webp",
    imageAlt: "Global Edifice Cresent",
    entries: [
      {
        title: "Cresent",
        paragraphs: [
          "Every new neighbourhood teaches us something.",
          "Cresent expanded our presence in the rapidly developing Chandapura corridor, bringing together practical planning, everyday convenience, and homes designed for modern families.",
          "The project reaffirmed something we've believed from the beginning: good construction earns appreciation, but consistent delivery earns trust.",
        ],
      },
    ],
  },
  {
    year: "2021",
    image: "/project-images/completed-project-images/celesta-compPorjects-img.webp",
    imageAlt: "Global Edifice Celesta",
    entries: [
      {
        title: "Celesta",
        paragraphs: [
          "Growth brought new possibilities.",
          "Celesta marked an important turning point for Global Edifice. With 336 thoughtfully designed homes, it demonstrated our ability to deliver larger residential communities while maintaining the same discipline, quality, and attention to detail that defined our earliest developments.",
          "It wasn't simply our biggest project at the time—it reflected how far we had come.",
        ],
      },
    ],
  },
  {
    year: "2019",
    image: "/project-images/completed-project-images/green-appleHikes-compPorjects-img.webp",
    imageAlt: "Global Green Apple Hikes",
    entries: [
      {
        title: "Green Apple Hikes",
        paragraphs: [
          "Four years later, we reached a wider audience.",
          "Green Apple Hikes was developed to make well-planned homes more accessible without compromising on quality or everyday comfort. The project strengthened our presence in South Bengaluru and, more importantly, strengthened the confidence our customers placed in us.",
          "With every successful handover, our promise became stronger.",
        ],
      },
    ],
  },
  {
    year: "2015",
    image: "/project-images/completed-project-images/greenAppleVillas1-compPorjects-img.webp",
    imageAlt: "Green Apple Villas",
    entries: [
      {
        title: "Green Apple Villas",
        paragraphs: [
          "Every company has a beginning. Ours started with Green Apple Villas.",
          "It was here that we introduced our first villa community—designed around open spaces, comfortable living, and the belief that a home should feel personal from the very first day.",
          "More than our first project, it established the principles that continue to guide us today: thoughtful planning, dependable quality, and putting homeowners first.",
        ],
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
  const [activeMilestoneYear, setActiveMilestoneYear] = useState<string>(milestoneTimeline[0].year);
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

        <section id="story" className="bg-[#f7f2eb]">
          <div className="grid lg:grid-cols-2 lg:items-stretch">
            <div className="flex items-center px-[1.125rem] py-14 text-left md:px-[1.8rem] md:py-20 lg:py-24 lg:pr-12 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))] xl:pr-16">
              <div className="w-full max-w-[36rem]">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#2a2723]">
                  Our Story
                </p>
                <h2 className="mt-4 font-display text-[2rem] leading-[1.08] text-[#c0a56e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  Built on Trust. Driven by Purpose.
                </h2>

                <div className="mt-6 space-y-5 text-[0.95rem] font-normal leading-[1.9] text-[#2a2723] md:mt-8 md:text-[1.05rem] md:leading-[1.95]">
                  <p>
                    Global Edifice was founded with a simple belief: homes should make life better.
                    As Bangalore grew into one of India&apos;s most dynamic cities, so did the
                    expectations of its homebuyers. People were no longer searching for just an
                    apartment. They wanted better locations, smarter planning, open spaces, and
                    communities that would enrich their everyday lives. We chose to build with that
                    vision in mind. From selecting the right locations to designing every home with
                    care, our focus has always been on creating developments that combine thoughtful
                    planning, quality construction, and lasting value. More than a decade later, that
                    purpose remains unchanged.
                  </p>
                  <p>
                    Every Global Edifice community is built to earn trust, not just on the day we
                    hand over the keys, but for many years after.
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

        <section id="values" className="bg-[#f7f2eb]">
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
                <h2 className="font-display text-[2rem] leading-[0.98] text-[#c49a4e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  Who We Are
                </h2>
                <p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/92 md:text-[0.85rem]">
                  More Than Builders. We Create Communities.
                </p>
                <div className="mt-6 space-y-5 text-[0.95rem] leading-[1.85] text-white/92 md:mt-8 md:text-[1.05rem] md:leading-[1.9] lg:text-[1.08rem] lg:leading-[1.88]">
                  <p>
                    Behind every Global Edifice development is a team of architects, engineers,
                    planners, designers, and construction professionals who believe that great homes
                    are built around people.
                  </p>
                  <p>
                    Every layout, every open space, and every detail is carefully considered to make
                    everyday living more comfortable, connected, and fulfilling.
                  </p>
                  <p>While buildings define skylines, communities shape lives.</p>
                  <p>
                    That&apos;s why we don&apos;t measure success by the number of homes we build.
                    We measure it by the trust our customers place in us and the lives that continue
                    to grow within the communities we create.
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
              <p className="mt-4 text-[0.95rem] leading-[1.6] text-[#5c574f] md:text-[1.02rem]">
                Leadership Built on Vision. Guided by Values.
              </p>

              <div className="mx-auto mt-7 max-w-[54rem] space-y-5 text-[0.95rem] leading-[1.85] text-[#2a2723] md:mt-8 md:text-[1.04rem] md:leading-[1.9]">
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
                    <p className="min-h-[6.5rem] text-[0.92rem] italic leading-[1.75] text-[#5c574f] md:min-h-[7.25rem] md:text-[0.98rem] md:leading-[1.8]">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                    <h3 className="mt-auto pt-6 font-display text-[1.45rem] leading-[1.05] text-[#c0a56e] sm:text-[1.6rem] md:text-[1.75rem]">
                      {leader.name}
                    </h3>
                    <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#5c574f]">
                      {leader.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="bg-[#123f54]">
          <div className="grid overflow-hidden text-white lg:grid-cols-2 lg:items-stretch">
            <div className="relative flex flex-col justify-start py-10 pr-5 pl-[1.125rem] sm:pr-6 md:py-12 md:pr-12 md:pl-[1.8rem] lg:py-14 lg:pr-14 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_24px)] opacity-45" />

              <div className="relative max-w-[40rem]">
                <div className="flex items-center gap-4">
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-[0.78rem]">
                    Timeline
                  </span>
                  <span className="h-px w-10 bg-white/35" />
                </div>
                <h2 className="mt-4 font-display text-[1.95rem] leading-[0.98] text-[#c49a4e] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem]">
                  A Decade of Building Trust
                </h2>
                <p className="mt-4 text-[0.95rem] leading-[1.75] text-white/88 md:text-[1.02rem]">
                  Every milestone reflects a promise fulfilled.
                </p>
                <p className="mt-5 text-[0.92rem] leading-[1.85] text-white/82 sm:text-[0.98rem] sm:leading-[1.9]">
                  Over the past decade, Global Edifice has grown through consistent delivery,
                  responsible development, and the confidence of hundreds of homeowners who chose us
                  to be part of their journey.
                </p>
                <p className="mt-4 text-[0.92rem] leading-[1.85] text-white/82 sm:text-[0.98rem] sm:leading-[1.9]">
                  As Bangalore continues to evolve, so do we—building communities that are designed
                  for today&apos;s lifestyle while creating value for generations to come.
                </p>

                <div className="mt-8 md:mt-10">
                  <div className="relative">
                    <div className="flex items-end justify-between gap-1 overflow-x-auto pb-5 pr-4 snap-x [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden">
                      {[...milestoneTimeline].reverse().map((milestone) => {
                        const isActive = milestone.year === activeMilestoneYear;

                        return (
                          <button
                            key={milestone.year}
                            type="button"
                            onClick={() => setActiveMilestoneYear(milestone.year)}
                            className={`relative min-h-11 min-w-[3.5rem] flex-1 snap-start px-1 py-2 text-center text-[0.82rem] transition sm:min-w-0 sm:text-[0.92rem] md:text-[1.05rem] ${
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
                      <h3 className="font-display text-[1.5rem] leading-[1] text-[#c49a4e] sm:text-[1.7rem] md:text-[2.1rem]">
                        {entry.title}
                      </h3>
                      <p className="mt-3 font-display text-[2rem] leading-none text-[#c49a4e] sm:text-[2.4rem] md:text-[3.4rem]">
                        {activeMilestone.year}
                      </p>

                      <div className="mt-5 space-y-4 text-[0.92rem] leading-[1.85] text-white/90 sm:text-[0.98rem] sm:leading-[1.9] md:text-[1.05rem] md:leading-[1.95]">
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
                src={activeMilestone.year === "2025" ? timelineTheClan : activeMilestone.image}
                alt={activeMilestone.imageAlt}
                className={
                  activeMilestone.year === "2025"
                    ? "absolute top-0 left-0 h-full w-[200%] max-w-none object-cover object-left-top"
                    : "absolute inset-0 h-full w-full object-cover object-left-top"
                }
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
                <p className="mt-4 text-[1rem] leading-[1.45] text-[#2a2723] md:mt-5 md:text-[1.15rem]">
                  {missionVisionItems[0].subtitle}
                </p>

                <div className="mt-7 space-y-5 text-left text-[0.95rem] leading-[1.9] text-[#5c574f] md:mt-9 md:space-y-6 md:text-[1.02rem] md:leading-[1.95]">
                  {missionVisionItems[0].paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>

              <article className="border-t border-[#d8c8ac] pt-10 md:pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10 xl:pl-14">
                <h2 className="font-display text-[2rem] leading-[0.98] text-[#c0a56e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  {missionVisionItems[1].title}
                </h2>
                <p className="mt-4 text-[1rem] leading-[1.45] text-[#2a2723] md:mt-5 md:text-[1.15rem]">
                  {missionVisionItems[1].subtitle}
                </p>

                <div className="mt-7 space-y-5 text-left text-[0.95rem] leading-[1.9] text-[#5c574f] md:mt-9 md:space-y-6 md:text-[1.02rem] md:leading-[1.95]">
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
