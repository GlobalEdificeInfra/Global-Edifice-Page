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
import projectClan from "@/assets/projects/the-clan/The-clan-project.png";
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
    quote:
      "Every home begins with a dream, but trust turns that dream into reality. At Global Edifice, we build that trust through quality and lasting value.",
  },
  {
    name: "Mr. Jyothish Reddy",
    role: "Managing Director",
    image: directorJyothish,
    alt: "Portrait of Mr. Jyothish Reddy",
    quote:
      "Building a home is a responsibility that extends far beyond construction. It is about creating places where families can build their future with confidence.",
  },
];

const missionVisionItems = [
  {
    title: "Our Vision",
    subtitle: "To Enable, Enhance & Excel",
    paragraphs: [
      "We envision a future where aspirations take architectural form. As one of Bangalore's premier developers, we transform homeownership dreams into tangible realities. Our commitment extends beyond constructing living spaces—we craft vibrant ecosystems that seamlessly blend comfort, community, and legacy.",
      "Each gated community and thoughtfully designed residence we deliver serves as more than shelter; it becomes a catalyst for meaningful connections, a foundation for generational wealth, and a testament to discerning taste. Through every project, we're reshaping Bangalore's real estate landscape, creating dynamic opportunities for generations to come.",
    ],
  },
  {
    title: "Our Mission",
    subtitle: "Build a Legacy of Trust",
    paragraphs: [
      "Our track record speaks volumes—multiple successful gated communities across Bangalore, featuring elegant villas and thoughtfully designed low-rise to mid-rise residences that residents genuinely cherish. In a city brimming with developers, our distinction lies in our unwavering commitment to integrity and reliability, ensuring every homebuyer enjoys a seamless, rewarding experience from initial inquiry to key handover.",
      "Specializing in accessible housing solutions alongside premium developments in sought-after locations like Chandapura and Electronic City, we cater to diverse aspirations and investment capacities. Excellence isn't merely our tagline—it's embedded in our organizational DNA.",
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
        paragraphs: [
          "The Clan is a living ode to connection, design, and belonging. It’s where mindful design meets meaningful living and community becomes the most beautiful form of luxury. It welcomes families, like-minded individuals and dreamers into a serene, nature-wrapped sanctuary far from the city’s restless hum. Discover our 2 & 3 Bed Signature Residences, where light, space, and comfort converge. Here every brick holds intention while every curve whispers community.",
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

function DiamondDivider({
  className = "mt-14",
  starClassName = "bg-white",
}: {
  className?: string;
  starClassName?: string;
}) {
  return (
    <div className={`relative flex w-full items-center justify-center text-[#8a5a24] ${className}`}>
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#8a5a24]" />
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
            <div className="max-w-[20rem] text-left sm:max-w-[28rem] md:max-w-[40rem] md:text-right lg:max-w-[46rem]">
              <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-[0.78rem] md:mb-5">
                Every Home Begins With a Promise
              </p>
              <h1 className="font-display text-[2.05rem] leading-[0.96] tracking-[-0.03em] text-white sm:text-[2.85rem] md:text-[3.85rem] lg:text-[4.45rem]">
                <span className="block">Before Every Home,</span>
                <span className="block">There Is a Story.</span>
              </h1>
              <p className="mt-4 text-[0.88rem] leading-[1.55] text-white/88 sm:text-[0.96rem] md:mt-5 md:text-[1.05rem]">
                Built on Trust. Designed for Life.
              </p>
            </div>
          </div>
        </section>

        <section id="story" className="bg-[#faf6f1] pt-20 pb-16 md:pt-28 md:pb-20">
          <div className="mx-auto max-w-[70rem] px-[1.125rem] text-center md:px-[1.8rem]">
            <p className="mx-auto max-w-[58rem] text-center font-display text-[1.18rem] leading-[1.6] tracking-[-0.01em] text-[#8a5a24] sm:text-[1.3rem] md:text-[1.42rem] md:leading-[1.55] lg:text-[1.52rem] lg:leading-[1.52]">
              Global Edifice has been a trusted name in the real estate industry for over ten years,
              being the forefront of upcoming projects in Bangalore, establishing ourselves among
              the top builders in Bangalore with some of the finest architects, engineers, sales
              force in the Silicon Valley of India.
            </p>

            <div className="mx-auto mt-8 max-w-[54rem] space-y-6 text-center text-[0.95rem] font-normal leading-[1.85] text-[#2f2c28] md:mt-10 md:space-y-7 md:text-[1.04rem] md:leading-[1.9]">
              <p>
                Our journey was built on the pillars of quality and customer centricity, thus making
                us one of the most sought-after real estate developers in Bangalore. Our commitment to
                timely delivery and uncompromising quality has earned us the trust of hundreds of
                satisfied customers.
              </p>
              <p>
                At Global Edifice, we don&apos;t just build homes for you but create lifestyles that
                reflect elegance, security, and of course a sense of community.
              </p>
            </div>

            <DiamondDivider className="mx-auto mt-12 max-w-[54rem] md:mt-14" starClassName="bg-[#faf6f1]" />
          </div>
        </section>

        <section id="about" className="bg-[#f7f2eb] pt-4 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
          <div className="grid lg:grid-cols-2 lg:items-stretch">
            <div className="flex items-center px-[1.125rem] py-12 text-left md:px-[1.8rem] md:py-16 lg:py-24 lg:pr-12 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))] xl:pr-16">
              <div className="w-full max-w-[36rem]">
                <h2 className="font-display text-[2rem] leading-[1.02] text-[#8a5a24] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  About US
                </h2>

                <div className="mt-6 space-y-5 text-[0.95rem] font-normal leading-[1.9] text-[#2a2723] md:mt-8 md:text-[1.05rem] md:leading-[1.95]">
                  <p>
                    Global Edifice was founded with a clear vision—to redefine urban living through
                    thoughtfully designed homes built on trust, quality, and long-term value.
                    Guided by strong leadership and a passion for excellence, the company has
                    steadily grown into a trusted name in Bangalore&apos;s residential real estate
                    space.
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

        <section id="values" className="bg-white pb-6 md:pb-8">
          <div className="grid overflow-hidden lg:grid-cols-2 lg:items-stretch">
            <div className="w-full overflow-hidden lg:min-h-[40rem] xl:min-h-[44rem]">
              <img
                src={geContactInterior}
                alt="Global Edifice interior living space"
                className="h-full min-h-[24rem] w-full object-cover object-center sm:min-h-[28rem] md:min-h-[36rem] [transform:scaleX(-1)]"
                loading="lazy"
              />
            </div>

            <div className="relative flex items-center justify-start overflow-hidden bg-[linear-gradient(180deg,#143f54_0%,#123a4c_100%)] px-6 py-14 text-white sm:px-8 md:px-12 md:py-20 lg:min-h-[40rem] lg:px-14 lg:py-24 xl:min-h-[44rem] xl:px-18">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_22px)] opacity-45" />
              <div className="relative mx-auto w-full max-w-[36rem] text-left lg:mx-0">
                <h2 className="font-display text-[2rem] leading-[0.98] text-[#c49a4e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                  Who We Are
                </h2>
                <p className="mt-6 text-[0.95rem] leading-[1.85] text-white/92 md:mt-8 md:text-[1.05rem] md:leading-[1.9] lg:text-[1.08rem] lg:leading-[1.88]">
                  At Global Edifice, we go beyond construction—we create living spaces that
                  reflect aspirations and elevate everyday life. Backed by a team of experienced
                  architects, engineers, and professionals, we focus on delivering homes that
                  seamlessly blend modern design with practical functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="leadership" className="bg-[#faf6f1] pt-6 pb-10 md:pt-8 md:pb-14">
          <div className={pageContainerClass}>
            <div className="mx-auto max-w-[60rem] text-center">
              <div className="mx-auto max-w-[48rem]">
                <DiamondDivider className="mt-0" starClassName="bg-[#faf6f1]" />
              </div>
              <h2 className="mt-6 font-display text-[2rem] leading-[0.98] text-[#8a5a24] sm:text-[2.35rem] md:mt-8 md:text-[2.75rem] lg:text-[3rem]">
                Board of Directors
              </h2>
              <p className="mt-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#8a5a24] md:text-[0.78rem]">
                Visionaries Behind Our Success
              </p>

              <div className="mt-7 space-y-5 text-[0.95rem] leading-[1.85] text-[#2a2723] md:mt-8 md:space-y-6 md:text-[1.04rem] md:leading-[1.9]">
                <p>
                  At the helm of Global Edifice Infra stand our distinguished Managing Directors, Mr.
                  Rakesh Reddy and Mr. Jyothish Reddy, seasoned industry veterans whose combined
                  expertise spans over a decade of transformative real estate excellence. Their
                  strategic foresight, coupled with an unwavering commitment to hands-on leadership,
                  has been the driving force propelling Global Edifice Infra to its coveted
                  position among Bangalore&apos;s most respected developers.
                </p>
                <p>
                  More than industry professionals, they are visionary architects of change who blend
                  entrepreneurial acumen with operational excellence. Their leadership philosophy
                  centers on innovation, integrity, and intelligent growth—principles that have
                  consistently elevated our brand and earned the trust of countless homeowners
                  across the city.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-[64rem] gap-8 sm:mt-14 md:mt-16 md:grid-cols-2 md:gap-8 lg:gap-10">
              {leaderCards.map((leader) => (
                <article key={leader.name} className="text-left">
                  <div className="overflow-hidden rounded-b-[2rem] sm:rounded-b-[2.5rem]">
                    <img
                      src={leader.image}
                      alt={leader.alt}
                      className="h-[22rem] w-full object-cover object-[center_18%] sm:h-[26rem] md:h-[30rem] lg:h-[32rem]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-6 text-[0.92rem] leading-[1.75] text-[#2a2723] md:text-[0.98rem] md:leading-[1.8]">
                    {leader.quote}
                  </p>
                  <h3 className="mt-5 font-display text-[1.45rem] leading-[1.05] text-[#8a5a24] sm:text-[1.6rem] md:text-[1.75rem]">
                    {leader.name}
                  </h3>
                  <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#5c574f]">
                    {leader.role}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="bg-[#123f54]">
          <div className="grid overflow-hidden text-white lg:grid-cols-2 lg:min-h-[45rem]">
            <div className="relative flex flex-col justify-center py-12 pr-5 pl-[1.125rem] sm:pr-6 md:py-16 md:pr-12 md:pl-[1.8rem] lg:py-18 lg:pr-14 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_24px)] opacity-45" />

              <div className="relative max-w-[40rem]">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-[0.78rem]">
                  Timeline
                </p>
                <h2 className="mt-3 font-display text-[1.95rem] leading-[0.98] text-[#c49a4e] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem]">
                  Our Milestones
                </h2>

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

        <section id="mission-vision" className="bg-[#fbf8f2] py-14 md:py-20 lg:py-24">
          <div
            className={`${pageContainerClass} grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-14`}
          >
            <article className="max-w-[34rem] lg:justify-self-start lg:pr-8">
              <h2 className="font-display text-[2rem] leading-[0.98] text-[#8a5a24] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                {missionVisionItems[0].title}
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.4] text-[#2a2a2a] md:mt-5 md:text-[1.2rem]">
                {missionVisionItems[0].subtitle}
              </p>

              <div className="mt-7 space-y-5 text-left text-[0.95rem] leading-[1.9] text-[#2a2723] md:mt-9 md:space-y-7 md:text-justify md:text-[1.02rem] md:leading-[1.95]">
                {missionVisionItems[0].paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="hidden bg-[#d8c8ac] lg:block" />

            <article className="max-w-[34rem] border-t border-[#d8c8ac] pt-10 md:pt-12 lg:justify-self-end lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="font-display text-[2rem] leading-[0.98] text-[#8a5a24] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                {missionVisionItems[1].title}
              </h2>
              <p className="mt-4 text-[1rem] leading-[1.4] text-[#2a2a2a] md:mt-5 md:text-[1.2rem]">
                {missionVisionItems[1].subtitle}
              </p>

              <div className="mt-7 space-y-5 text-left text-[0.95rem] leading-[1.9] text-[#2a2723] md:mt-9 md:space-y-7 md:text-justify md:text-[1.02rem] md:leading-[1.95]">
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
