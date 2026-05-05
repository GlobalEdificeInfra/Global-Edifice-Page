import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.png";
import geContactInterior from "@/assets/ge-contact-interior.jpg";
import geLogo from "@/assets/ge-logo.png";
import geProjectRender from "@/assets/ge-project-render.jpg";
import projectLifestyle from "@/assets/ge-project-lifestyle.png";
import directorJyothish from "@/assets/director-jyothish.jpg";
import directorRakesh from "@/assets/director-rakesh.jpg";
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
  { label: "PROJECTS", kind: "routeHash", to: "/" as const, hash: "projects" },
  { label: "RESOURCES", kind: "anchor", href: "#values" },
  { label: "TIMELINE", kind: "anchor", href: "#timeline" },
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

type AboutNavItem = (typeof aboutNav)[number];

function SectionLabel({ children }: { children: string }) {
  return <span className="eyebrow">{children}</span>;
}

function DiamondDivider() {
  return (
    <div className="mt-14 flex items-center gap-6 text-[#bea578]/45">
      <span className="h-px flex-1 bg-current" />
      <span className="h-3.5 w-3.5 rotate-45 border border-current bg-[#f5ecde]" />
      <span className="h-px flex-1 bg-current" />
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
          <nav className="flex items-center gap-9 rounded-full bg-white/96 px-7 py-3 text-[0.7rem] font-medium tracking-[0.13em] text-[#b79a69] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            {aboutNav.map((item) => (
              <AboutNavigationLink key={item.label} item={item} />
            ))}
            <Link
              to="/"
              hash="contact"
              className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]"
            >
              ENQUIRE
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/"
            hash="contact"
            className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.62rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.68rem]"
          >
            ENQUIRE
          </Link>

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
          className={`overflow-hidden rounded-[1.15rem] bg-white/94 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <nav id="about-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {aboutNav.map((item) => (
              <AboutNavigationLink
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

  return (
    <>
      <main className="bg-[#f7f2eb] text-[#163849]">
        <section className="relative isolate h-[68svh] min-h-[30rem] overflow-hidden bg-[#1e1712] text-white sm:min-h-[34rem] md:h-[74svh] md:min-h-[42rem]">
          <img
            src={aboutHero}
            alt="Global Edifice signature residence"
            className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-[28%_42%] md:object-[center_42%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(255,255,255,0.1),transparent_26%),linear-gradient(90deg,rgba(20,14,11,0.16)_0%,rgba(20,14,11,0.08)_26%,rgba(20,14,11,0.5)_58%,rgba(20,14,11,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,22,0.12)_0%,rgba(8,15,22,0.02)_34%,rgba(8,15,22,0.66)_100%)]" />

          <AboutNavigation />

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

        <section id="story" className="bg-[#fbf8f2] pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="mx-auto max-w-6xl px-[1.125rem] text-center md:px-[1.8rem]">
            <p className="mx-auto max-w-[76rem] font-display text-[1.28rem] leading-[1.34] tracking-[-0.01em] text-[#b59661] [text-wrap:balance] md:text-[1.56rem] md:leading-[1.26] lg:text-[1.64rem]">
              Global Edifice has been a trusted name in the real estate industry for over ten years,
              being the forefront of upcoming projects in Bangalore, establishing ourselves among
              the top builders in Bangalore with some of the finest architects, engineers, sales
              force in the Silicon Valley of India.
            </p>

            <div className="mt-12 space-y-9 text-[#2d3438]">
              <p className="mx-auto max-w-[72rem] text-[1.12rem] font-semibold leading-[1.7] md:text-[1.26rem] md:leading-[1.72]">
                Our journey was built on the pillars of quality and customer centricity, thus making
                us one of the most sought-after real estate developers in Bangalore. Our commitment
                to timely delivery and uncompromising quality has earned us the trust of hundreds of
                satisfied customers.
              </p>
              <p className="mx-auto max-w-[68rem] text-[1.1rem] font-semibold leading-[1.72] md:text-[1.24rem] md:leading-[1.76]">
                At Global Edifice, we don&apos;t just build homes for you but create lifestyles that
                reflect elegance, security, and ofcourse a sense of community.
              </p>
            </div>

            <div className="mx-auto max-w-[60rem]">
              <DiamondDivider />
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#fbf8f2] pb-22 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-0">
            <div className="px-[1.125rem] pt-4 md:px-[1.8rem] md:pt-10 lg:pr-12 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))]">
              <div className="lg:max-w-[31rem]">
                <h2 className="font-display text-[2.45rem] leading-[0.98] text-[#bea578] md:text-[4.2rem]">
                  About US
                </h2>

                <div className="mt-8 space-y-6 text-[1.02rem] leading-[1.95] text-[#2b3940]/88 md:text-[1.12rem]">
                  <p>
                    Global Edifice was founded with a clear vision to redefine urban living through
                    thoughtfully designed homes built on trust, quality, and long-term value. Guided
                    by strong leadership and a passion for excellence, the company has steadily
                    grown into a trusted name in Bangalore&apos;s residential real estate space.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden bg-[#e9decd] shadow-[0_38px_84px_-56px_rgba(18,58,76,0.42)] lg:h-[44rem] xl:h-[48rem]">
              <img
                src={projectLifestyle}
                alt="Global Edifice lifestyle amenities"
                className="h-full min-h-[30rem] w-full object-cover object-[56%_center] md:min-h-[36rem]"
              />
            </div>
          </div>
        </section>

        <section id="values" className="bg-[#f7f2eb]">
          <div className="grid overflow-hidden lg:grid-cols-2">
            <div className="min-h-[22rem] bg-[#efe6d8] lg:min-h-[44rem]">
              <img
                src={geContactInterior}
                alt="Global Edifice interior living space"
                className="h-full w-full object-cover object-center [transform:scaleX(-1)]"
                loading="lazy"
              />
            </div>

            <div className="relative overflow-hidden bg-[linear-gradient(180deg,#143f54_0%,#123a4c_100%)] px-8 py-14 text-white md:px-12 md:py-18 lg:flex lg:min-h-[44rem] lg:items-center lg:px-18 xl:px-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_22px)] opacity-45" />
              <div className="relative max-w-[29rem]">
                <h2 className="font-display text-[2.45rem] leading-[0.98] text-[#bea578] md:text-[4rem]">
                  Who We Are
                </h2>
                <p className="mt-10 text-[1.08rem] leading-[1.85] text-white/88 md:text-[1.2rem] md:leading-[1.9]">
                  At Global Edifice, we go beyond construction. We create living spaces that reflect
                  aspirations and elevate everyday life. Backed by a team of experienced architects,
                  engineers, and professionals, we focus on delivering homes that seamlessly blend
                  modern design with practical functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="leadership" className="bg-[#f7f2eb] py-20 md:py-24">
          <div className={pageContainerClass}>
            <div className="mx-auto max-w-[60rem] text-center">
              <div className="mx-auto max-w-[64rem]">
                <DiamondDivider />
              </div>
              <h2 className="mt-8 font-display text-[2.45rem] leading-[0.98] text-[#bea578] md:text-[4rem]">
                Board of Directors
              </h2>
              <p className="mt-4 text-[1.1rem] leading-[1.7] text-[#4e4a44] md:text-[1.28rem]">
                Visionaries Behind Our Success
              </p>

              <div className="mt-12 space-y-8 text-[1.02rem] leading-[1.9] text-[#4c4843] md:text-[1.08rem] md:leading-[1.95]">
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

            <div className="mx-auto mt-14 grid max-w-[64rem] gap-5 md:grid-cols-2 md:gap-4 lg:gap-5">
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
                    <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.84)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                      <h3 className="font-display text-[2.25rem] leading-[1.02] text-[#caa96c] md:text-[2.5rem]">
                        {leader.name}
                      </h3>
                      <p className="mt-3 text-[1rem] font-semibold uppercase tracking-[0.06em] text-white md:text-[1.06rem]">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="bg-[#f7f2eb] pb-0">
          <div className="grid overflow-hidden bg-[#123f54] text-white lg:grid-cols-2">
            <div className="relative py-10 pr-6 pl-[1.125rem] md:py-16 md:pr-12 md:pl-[1.8rem] lg:py-18 lg:pr-16 lg:pl-[max(1.8rem,calc((100vw-80rem)/2+1.8rem))]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(190,165,120,0.12),transparent_30%),repeating-radial-gradient(circle_at_-10%_50%,rgba(255,255,255,0.045)_0,rgba(255,255,255,0.045)_1px,transparent_1px,transparent_24px)] opacity-45" />

              <div className="relative">
                <div className="flex items-center gap-3 text-[0.8rem] uppercase tracking-[0.28em] text-[#bfa26f]">
                  <span>TIMELINE</span>
                  <span className="h-px w-8 bg-current" />
                </div>

                <h2 className="mt-4 font-display text-[2.45rem] leading-[0.96] text-[#c4a26a] md:text-[4rem]">
                  Our Milestones
                </h2>

                <div className="mt-12 grid gap-10 md:grid-cols-[5.5rem_1px_minmax(0,1fr)] md:items-start">
                  <div className="space-y-7 pt-2 text-[1.02rem] text-white/58 md:text-[1.1rem]">
                    <p>2015</p>
                    <p>2019</p>
                    <p>2021</p>
                    <p>2023</p>
                    <p>2024</p>
                    <div className="flex items-center gap-3 font-semibold text-white">
                      <span>2025</span>
                      <span className="h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-[#c4a26a]" />
                    </div>
                  </div>

                  <div className="hidden h-full bg-[#bfa26f]/55 md:block" />

                  <div className="max-w-[30rem]">
                    <h3 className="font-display text-[1.9rem] leading-[1] text-white md:text-[2.7rem]">
                      The Clan
                    </h3>
                    <p className="mt-3 font-display text-[2.7rem] leading-none text-[#c4a26a] md:text-[4.2rem]">
                      2025
                    </p>

                    <div className="mt-8 space-y-4 text-[1rem] leading-[1.95] text-white/88 md:text-[1.06rem]">
                      <p>
                        The Clan is a living ode to connection, design, and belonging. It&apos;s
                        where mindful design meets meaningful living and community becomes the most
                        beautiful form of luxury. It welcomes families, like-minded individuals and
                        dreamers into a serene, nature-wrapped sanctuary far from the city&apos;s
                        restless hum.
                      </p>
                      <p>
                        Discover our 2 &amp; 3 Bed Signature Residences, where light, space, and
                        comfort converge. Here every brick holds intention while every curve
                        whispers community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-[18rem] lg:min-h-[48rem]">
              <img
                src={geProjectRender}
                alt="Global Edifice The Clan render"
                className="h-full w-full object-cover object-[66%_center]"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="mission-vision" className="bg-[#fbf8f2] py-20 md:py-28">
          <div
            className={`${pageContainerClass} grid gap-12 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:gap-14`}
          >
            <article className="max-w-[31rem] lg:justify-self-start lg:pr-8">
              <h2 className="font-display text-[2.45rem] leading-[0.96] text-[#bea578] md:text-[4rem]">
                {missionVisionItems[0].title}
              </h2>
              <p className="mt-5 text-[1.08rem] leading-tight text-[#443f39] md:text-[1.7rem]">
                {missionVisionItems[0].subtitle}
              </p>

              <div className="mt-11 space-y-9 text-[1.02rem] leading-[1.95] text-[#4e4a45] md:text-[1.09rem] md:leading-[2]">
                {missionVisionItems[0].paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="hidden bg-[#d8c8ac] lg:block" />

            <article className="max-w-[31rem] border-t border-[#d8c8ac] pt-12 lg:justify-self-end lg:border-t-0 lg:pl-8 lg:pt-0">
              <h2 className="font-display text-[2.45rem] leading-[0.96] text-[#bea578] md:text-[4rem]">
                {missionVisionItems[1].title}
              </h2>
              <p className="mt-5 text-[1.08rem] leading-tight text-[#443f39] md:text-[1.7rem]">
                {missionVisionItems[1].subtitle}
              </p>

              <div className="mt-11 space-y-9 text-[1.02rem] leading-[1.95] text-[#4e4a45] md:text-[1.09rem] md:leading-[2]">
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
