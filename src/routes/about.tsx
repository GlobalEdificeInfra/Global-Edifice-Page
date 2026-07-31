import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about/about-hero.png";
import geContactInterior from "@/assets/about/ge-contact-interior.jpg";
import geLogo from "@/assets/shared/ge-logo.png";
import projectLifestyle from "@/assets/about/ge-project-lifestyle.png";
import directorJyothish from "@/assets/about/director-jyothish.jpg";
import directorRakesh from "@/assets/about/director-rakesh.jpg";
import projectLegacy from "@/assets/projects/legacy/project-legacy.jpg";
import projectOrlean from "@/assets/projects/orlean/project-orlean.jpg";
import projectClan from "@/assets/projects/the-clan/The-clan-project.png";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ABOUT_TITLE = "About Global Edifice - Building Beyond Expectations";
const ABOUT_DESCRIPTION =
  "Discover Global Edifice's story, leadership, and design philosophy behind its premium residential developments in Bangalore.";

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
  { label: "ABOUT US", kind: "anchor", href: "#about" },
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
    description:
      "Known for grounded execution and long-view decision making, he helps shape communities that feel elevated, practical, and enduring.",
  },
  {
    name: "Mr. Jyothish Reddy",
    role: "Managing Director",
    image: directorJyothish,
    alt: "Portrait of Mr. Jyothish Reddy",
    description:
      "His focus on thoughtful planning and customer-centric delivery continues to guide the brand's reputation for trust-led growth.",
  },
];

const missionVisionItems = [
  {
    title: "Our Vision",
    subtitle: "To Enable, Enhance & Excel",
    paragraphs: [
      "We envision a future where aspirations take architectural form. As one of Bangalore's premier developers, we transform homeownership dreams into tangible realities. Our commitment extends beyond constructing living spaces-we craft vibrant ecosystems that seamlessly blend comfort, community, and legacy.",
      "Each gated community and thoughtfully designed residence we deliver serves as more than shelter; it becomes a catalyst for meaningful connections, a foundation for generational wealth, and a testament to discerning taste. Through every project, we're reshaping Bangalore's real estate landscape, creating dynamic opportunities for generations to come.",
    ],
  },
  {
    title: "Our Mission",
    subtitle: "Build a Legacy of Trust",
    paragraphs: [
      "Our track record speaks volumes-multiple successful gated communities across Bangalore, featuring elegant villas and thoughtfully designed low-rise to mid-rise residences that residents genuinely cherish. In a city brimming with developers, our distinction lies in our unwavering commitment to integrity and reliability, ensuring every homebuyer enjoys a seamless, rewarding experience from initial inquiry to key handover.",
      "Specializing in accessible housing solutions alongside premium developments in sought-after locations like Chandapura and Electronic City, we cater to diverse aspirations and investment capacities. Excellence isn't merely our tagline-it's embedded in our organizational DNA.",
    ],
  },
] as const;

const milestoneTimeline = [
  {
    year: "2025",
    image: projectClan,
    imageAlt: "The Clan render",
    entries: [
      {
        title: "The Clan",
        landArea: "3.5 Acres",
        units: "257",
        paragraphs: [
          "The Clan is a living ode to connection, design, and belonging. It's where mindful design meets meaningful living and community becomes the most beautiful form of luxury. It welcomes families, like-minded individuals and dreamers into a serene, nature-wrapped sanctuary far from the city's restless hum.",
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
        title: "Orlean",
        landArea: "1.5 Acres",
        units: "91",
        paragraphs: [
          "Designed for those who appreciate fine living, Orlean is a premium residential project that seamlessly blends luxury, comfort, and functionality. Every detail is thoughtfully planned by Global Edifice to enhance your lifestyle whether it's the spacious layouts with no common walls, the ample natural light and ventilation, or the wide corridors that create an open and airy ambiance.",
          "Strategically located, Orlean offers easy access to key hubs, ensuring you stay connected to the city's best while enjoying the tranquility of a well-planned community. Vastu-compliant architecture and impeccable craftsmanship make it a statement of refined living.",
        ],
      },
      {
        title: "Legacy",
        landArea: "1 Acre",
        units: "56",
        paragraphs: [
          "Legacy by Global Edifice is designed for families seeking a harmonious blend of nature, comfort, and modern living. Planned around open green character and practical everyday convenience, it extends our focus on homes that feel both grounded and aspirational.",
          "With expansive layouts, Vastu-compliant homes, and premium amenities, Legacy is built for comfort, security, and a lifestyle that stands the test of time in Chandapura.",
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
        landArea: "1 Acre",
        units: "64",
        paragraphs: [
          "Cresent marked another important step in our residential journey, expanding the Global Edifice footprint with a compact, urban apartment community tailored for comfortable everyday living.",
          "The project reinforced our focus on reliable delivery, efficient planning, and value-led homes in the Chandapura growth corridor.",
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
        landArea: "3.5 Acres",
        units: "336",
        paragraphs: [
          "Celesta became a defining milestone in our growth story, bringing a larger-scale apartment community to life with a strong emphasis on planning discipline and everyday practicality.",
          "Across 336 homes, the project strengthened our delivery track record and showcased our ability to shape expansive residential communities with consistency and care.",
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
        landArea: "1/2 Acres",
        units: "80",
        paragraphs: [
          "Green Apple Hikes expanded our portfolio with an affordable apartment community built around accessibility, sensible planning, and long-term value for homeowners.",
          "It helped establish the foundation of our customer trust in South Bangalore by pairing compact scale with dependable construction quality.",
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
        landArea: "6.5 Acres",
        units: "83",
        paragraphs: [
          "Green Apple Villas marked the early chapter of the Global Edifice journey, introducing a villa community shaped by openness, comfort, and a more personal residential experience.",
          "This project laid the groundwork for the trust-led approach that continues to define our developments today, combining community planning with a strong sense of lifestyle value.",
        ],
      },
    ],
  },
] as const;

type AboutNavItem = (typeof aboutNav)[number];

function SectionLabel({ children }: { children: string }) {
  return <span className="eyebrow">{children}</span>;
}

function DiamondDivider({
  className = "mt-14",
  starClassName = "bg-white",
}: {
  className?: string;
  starClassName?: string;
}) {
  return (
    <div className={`relative flex w-full items-center justify-center text-[#b59661] ${className}`}>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#b59661]" />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`relative z-10 h-5 w-5 shrink-0 md:h-6 md:w-6 ${starClassName}`}
        fill="currentColor"
      >
        <path d="M12 1 L15.2 8.8 L23 12 L15.2 15.2 L12 23 L8.8 15.2 L1 12 L8.8 8.8 Z" />
      </svg>
    </div>
  );
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
        <section className="relative isolate h-[68svh] min-h-[30rem] overflow-hidden bg-[#1e1712] text-white sm:min-h-[34rem] md:h-[74svh] md:min-h-[42rem]">
          <img
            src={aboutHero}
            alt="Global Edifice signature residence"
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-[28%_42%] md:object-[center_42%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(255,255,255,0.1),transparent_26%),linear-gradient(90deg,rgba(20,14,11,0.16)_0%,rgba(20,14,11,0.08)_26%,rgba(20,14,11,0.5)_58%,rgba(20,14,11,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,22,0.12)_0%,rgba(8,15,22,0.02)_34%,rgba(8,15,22,0.66)_100%)]" />

          <div
            className={`relative mx-auto flex h-full max-w-7xl items-center justify-start ${pageGutterClass} pb-8 pt-28 sm:pt-32 md:justify-end md:pb-10 md:pt-28 lg:pt-30`}
          >
            <div className="max-w-[18rem] text-left sm:max-w-[24rem] md:max-w-[36rem] md:text-right">
              <h1 className="font-display text-[2.35rem] leading-[0.93] tracking-[-0.03em] text-white sm:text-[3.1rem] md:text-[4.55rem] lg:text-[5.1rem]">
                <span className="block sm:whitespace-nowrap">Building Beyond</span>
                <span className="block sm:whitespace-nowrap">Expectations</span>
              </h1>
            </div>
          </div>
        </section>

        <section id="story" className="bg-white pt-24 pb-10 md:pt-32 md:pb-12">
          <div className="mx-auto max-w-[70rem] px-[1.125rem] text-center md:px-[1.8rem]">
            <p className="mx-auto max-w-[66rem] text-center font-display text-[1.18rem] leading-[1.5] tracking-[-0.01em] text-[#b59661] md:text-[1.38rem] md:leading-[1.45] lg:text-[1.48rem] lg:leading-[1.42]">
              <span className="md:whitespace-nowrap">
                Global Edifice has been a trusted name in the real estate industry for over ten
                years,
              </span>
              <br className="hidden md:block" />
              <span className="md:whitespace-nowrap">
                being the forefront of upcoming projects in Bangalore, establishing ourselves among
              </span>
              <br className="hidden md:block" />
              <span className="md:whitespace-nowrap">
                the top builders in Bangalore with some of the finest architects, engineers, sales
              </span>
              <br className="hidden md:block" />
              <span className="md:whitespace-nowrap">
                force in the Silicon Valley of India.
              </span>
            </p>

            <div className="mx-auto mt-10 max-w-[54rem] space-y-7 text-center text-[#1f1d1a] md:mt-12 md:space-y-8">
              <p className="text-[0.98rem] font-normal leading-[1.8] md:text-[1.06rem] md:leading-[1.85]">
                Our journey was built on the pillars of quality and customer centricity, thus making
                us one of the most sought-after real estate developers in Bangalore. Our commitment
                to timely delivery and uncompromising quality has earned us the trust of hundreds of
                satisfied customers.
              </p>
              <p className="text-[0.98rem] font-normal leading-[1.8] md:text-[1.06rem] md:leading-[1.85]">
                At Global Edifice, we don&apos;t just build homes for you but create lifestyles that
                reflect elegance, security, and ofcourse a sense of community.
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white pt-10 pb-12 md:pt-14 md:pb-16 lg:pt-16 lg:pb-20">
          <div className={`${pageContainerClass}`}>
            <DiamondDivider className="mt-0" />
          </div>

          <div className="mt-12 grid md:mt-16 lg:mt-20 lg:grid-cols-2 lg:items-stretch">
            <div className="flex items-center px-[1.125rem] py-14 text-left md:px-[1.8rem] md:py-18 lg:py-24 lg:pr-12 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))] xl:pr-16">
              <div className="w-full max-w-[34rem]">
                <h2 className="font-display text-[2.1rem] leading-[0.98] text-[#b59661] md:text-[2.75rem] lg:text-[3rem]">
                  About US
                </h2>

                <p className="mt-6 text-[0.98rem] font-normal leading-[1.9] text-[#2a2a2a] md:mt-8 md:text-[1.05rem] md:leading-[1.95]">
                  Global Edifice was founded with a clear vision—to redefine urban living through
                  thoughtfully designed homes built on trust, quality, and long-term value. Guided
                  by strong leadership and a passion for excellence, the company has steadily
                  grown into a trusted name in Bangalore&apos;s residential real estate space.
                </p>
              </div>
            </div>

            <div className="w-full overflow-hidden lg:min-h-[40rem] xl:min-h-[44rem]">
              <img
                src={projectLifestyle}
                alt="Global Edifice lifestyle amenities"
                className="h-full min-h-[30rem] w-full object-cover object-[56%_center] md:min-h-[36rem]"
              />
            </div>
          </div>
        </section>

        <section id="values" className="bg-white pb-6 md:pb-8">
          <div className="grid overflow-hidden lg:grid-cols-2 lg:items-stretch">
            <div className="w-full overflow-hidden lg:min-h-[40rem] xl:min-h-[44rem]">
              <img
                src={geContactInterior}
                alt="Global Edifice interior living space"
                className="h-full min-h-[30rem] w-full object-cover object-center md:min-h-[36rem] [transform:scaleX(-1)]"
                loading="lazy"
              />
            </div>

            <div className="relative flex items-center overflow-hidden bg-[linear-gradient(180deg,#143f54_0%,#123a4c_100%)] px-8 py-16 text-white md:px-12 md:py-20 lg:min-h-[40rem] lg:px-14 lg:py-24 xl:min-h-[44rem] xl:px-18">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_22px)] opacity-45" />
              <div className="relative w-full max-w-[34rem] text-left">
                <h2 className="font-display text-[2.1rem] leading-[0.98] text-[#b59661] md:text-[2.75rem] lg:text-[3rem]">
                  Who We Are
                </h2>
                <p className="mt-6 text-[0.95rem] leading-[1.85] text-white/90 md:mt-8 md:text-[1.05rem] md:leading-[1.9] lg:text-[1.1rem] lg:leading-[1.88]">
                  At Global Edifice, we go beyond construction—we create living spaces that reflect
                  aspirations and elevate everyday life. Backed by a team of experienced architects,
                  engineers, and professionals, we focus on delivering homes that seamlessly blend
                  modern design with practical functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="leadership" className="bg-white pt-6 pb-10 md:pt-8 md:pb-14">
          <div className={pageContainerClass}>
            <div className="mx-auto max-w-[60rem] text-center">
              <div className="mx-auto max-w-[48rem]">
                <DiamondDivider className="mt-0" starClassName="bg-white" />
              </div>
              <h2 className="mt-4 font-display text-[2.1rem] leading-[0.98] text-[#b59661] md:mt-5 md:text-[2.75rem] lg:text-[3rem]">
                Board of Directors
              </h2>
              <p className="mt-2 text-[1rem] leading-[1.6] text-[#4e4a44] md:text-[1.12rem]">
                Visionaries Behind Our Success
              </p>

              <div className="mt-6 space-y-5 text-[0.98rem] leading-[1.85] text-[#4c4843] md:mt-7 md:space-y-6 md:text-[1.04rem] md:leading-[1.9]">
                <p>
                  At the helm of Global Edifice Infra stand our distinguished Managing Directors,
                  Mr. Rakesh Reddy and Mr. Jyothish Reddy - seasoned industry veterans whose
                  combined expertise spans over a decade of transformative real estate excellence.
                  Their strategic foresight, coupled with an unwavering commitment to hands-on
                  leadership, has been the driving force propelling Global Edifice Infra to its
                  coveted position among Bangalore&apos;s most respected developers.
                </p>
                <p>
                  More than industry professionals, they are visionary architects of change who
                  blend entrepreneurial acumen with operational excellence. Their leadership
                  philosophy centers on innovation, integrity, and intelligent growth - principles
                  that have consistently elevated our brand and earned the trust of countless
                  homeowners across the city.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-[4.2rem] grid max-w-[64rem] gap-5 md:mt-20 md:grid-cols-2 md:gap-4 lg:gap-5">
              {leaderCards.map((leader) => (
                <article
                  key={leader.name}
                  className="relative overflow-hidden rounded-[2.2rem] border border-[#d3ba8b] bg-[#e6d7c2] shadow-[0_28px_70px_-48px_rgba(18,58,76,0.35)]"
                >
                  <div className="relative h-[26rem] md:h-[35rem] lg:h-[37rem]">
                    <img
                      src={leader.image}
                      alt={leader.alt}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.82)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-left md:p-8">
                      <h3 className="font-display text-[1.55rem] leading-[1.05] text-[#caa96c] md:text-[1.75rem] lg:text-[1.9rem]">
                        {leader.name}
                      </h3>
                      <p className="mt-2 text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-white md:text-[0.92rem]">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="bg-[#123f54]">
          <div className="grid overflow-hidden text-white lg:grid-cols-2 lg:min-h-[45rem]">
            <div className="relative flex flex-col justify-center py-12 pr-6 pl-[1.125rem] md:py-16 md:pr-12 md:pl-[1.8rem] lg:py-18 lg:pr-14 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_24px)] opacity-45" />

              <div className="relative max-w-[40rem]">
                <div className="flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.28em] text-[#bfa26f]">
                  <span>TIMELINE</span>
                  <span className="h-px w-8 bg-current" />
                </div>

                <h2 className="mt-4 font-display text-[2.1rem] leading-[0.96] text-[#c4a26a] md:text-[2.75rem] lg:text-[3rem]">
                  Our Milestones
                </h2>

                <div className="mt-10 md:mt-12">
                  <div className="relative">
                    <div className="flex items-end justify-between gap-2 pb-4">
                      {[...milestoneTimeline].reverse().map((milestone) => {
                        const isActive = milestone.year === activeMilestoneYear;

                        return (
                          <button
                            key={milestone.year}
                            type="button"
                            onClick={() => setActiveMilestoneYear(milestone.year)}
                            className={`relative flex-1 text-center text-[0.92rem] transition md:text-[1.05rem] ${
                              isActive
                                ? "font-semibold text-white"
                                : "text-white/55 hover:text-white/80"
                            }`}
                          >
                            {milestone.year}
                            {isActive ? (
                              <span className="absolute left-1/2 top-full mt-2 h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[9px] border-x-transparent border-b-[#c4a26a]" />
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
                      <h3 className="font-display text-[1.7rem] leading-[1] text-[#c4a26a] md:text-[2.1rem]">
                        {entry.title}
                      </h3>
                      <p className="mt-3 font-display text-[2.4rem] leading-none text-[#c4a26a] md:text-[3.4rem]">
                        {activeMilestone.year}
                      </p>

                      <div className="mt-5 space-y-4 text-[0.98rem] leading-[1.9] text-white/90 md:text-[1.05rem] md:leading-[1.95]">
                        {entry.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[24rem] lg:h-auto lg:min-h-full">
              <img
                src={activeMilestone.image}
                alt={activeMilestone.imageAlt}
                className="h-full w-full object-cover object-[66%_center]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="mission-vision" className="bg-[#fbf8f2] py-16 md:py-20 lg:py-24">
          <div
            className={`${pageContainerClass} grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-14`}
          >
            <article className="max-w-[34rem] lg:justify-self-start lg:pr-8">
              <h2 className="font-display text-[2.1rem] leading-[0.98] text-[#b59661] md:text-[2.75rem] lg:text-[3rem]">
                {missionVisionItems[0].title}
              </h2>
              <p className="mt-4 text-[1.05rem] leading-[1.35] text-[#2a2a2a] md:mt-5 md:text-[1.2rem]">
                {missionVisionItems[0].subtitle}
              </p>

              <div className="mt-8 space-y-6 text-justify text-[0.98rem] leading-[1.9] text-[#3a3a3a] md:mt-9 md:space-y-7 md:text-[1.02rem] md:leading-[1.95]">
                {missionVisionItems[0].paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="hidden bg-[#d8c8ac] lg:block" />

            <article className="max-w-[34rem] border-t border-[#d8c8ac] pt-12 lg:justify-self-end lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="font-display text-[2.1rem] leading-[0.98] text-[#b59661] md:text-[2.75rem] lg:text-[3rem]">
                {missionVisionItems[1].title}
              </h2>
              <p className="mt-4 text-[1.05rem] leading-[1.35] text-[#2a2a2a] md:mt-5 md:text-[1.2rem]">
                {missionVisionItems[1].subtitle}
              </p>

              <div className="mt-8 space-y-6 text-justify text-[0.98rem] leading-[1.9] text-[#3a3a3a] md:mt-9 md:space-y-7 md:text-[1.02rem] md:leading-[1.95]">
                {missionVisionItems[1].paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
