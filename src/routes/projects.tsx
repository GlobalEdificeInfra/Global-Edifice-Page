import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import geLogo from "@/assets/shared/ge-logo.png";
import projectsHero from "@/assets/projects/shared/project-banner.png";
import projectClan from "@/assets/projects/the-clan/The-clan-project.png";
import projectLegacy from "@/assets/projects/legacy/project-legacy.jpg";
import { SiteHeader } from "@/components/site-header";
import { SiteGetInTouch } from "@/components/site-get-in-touch";
import { SiteFooter } from "@/components/site-footer";

const PROJECTS_TITLE = "Our Projects - Global Edifice";
const PROJECTS_DESCRIPTION =
  "Explore the Global Edifice project portfolio across ongoing, upcoming, and completed residential developments in Bangalore.";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [{ title: PROJECTS_TITLE }, { name: "description", content: PROJECTS_DESCRIPTION }],
  }),
});

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const projectNav = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "route", to: "/projects" as const },
  { label: "BLOGS", kind: "route", to: "/blogs" as const },
  { label: "CONTACT", kind: "anchor", href: "/contact" },
] as const;

type ProjectNavItem = (typeof projectNav)[number];
type ProjectStatus = "ongoing" | "upcoming" | "completed";

const projectFilters: Array<{ id: ProjectStatus; label: string }> = [
  { id: "ongoing", label: "ONGOING" },
  { id: "upcoming", label: "UPCOMING" },
  { id: "completed", label: "COMPLETED" },
];

const projects: Array<{
  status: ProjectStatus;
  name: string;
  statLabel: string;
  statValue: string;
  location: string;
  unitLabel: string;
  image: string;
  alt: string;
  detailHref?: string;
}> = [
  {
    status: "ongoing",
    name: "GLOBAL EDIFICE ORLEAN",
    statLabel: "Starting From",
    statValue: "76 LAKHS*",
    location: "CHANDAPURA, BANGALORE",
    unitLabel: "1134 - 1590 SQFT",
    image: "/project-images/orlean-images/orlean-main2.jpg",
    alt: "Global Edifice Orlean",
    detailHref: "/projects/orlean",
  },
  {
    status: "ongoing",
    name: "GLOBAL EDIFICE THE CLAN",
    statLabel: "Starting From",
    statValue: "70 LAKHS*",
    location: "BAGALUR - SARJAPURA, BANGALORE",
    unitLabel: "1131 - 1825 SQFT",
    image: projectClan,
    alt: "Global Edifice The Clan",
    detailHref: "/projects/the-clan",
  },
  {
    status: "ongoing",
    name: "GLOBAL EDIFICE LEGACY",
    statLabel: "Starting From",
    statValue: "62 LAKHS*",
    location: "CHANDAPURA, BANGALORE",
    unitLabel: "2BHK RESIDENCES",
    image: projectLegacy,
    alt: "Global Edifice Legacy",
    detailHref: "/projects",
  },
  {
    status: "upcoming",
    name: "CHANDAPURA, BANGALORE",
    statLabel: "Phase",
    statValue: "COMING SOON",
    location: "CHANDAPURA, BANGALORE",
    unitLabel: "5.25 ACRE | HIGH RISE APARTMENT",
    image: "/project-images/upcoming-project-images/Chadapura.jpg",
    alt: "Chandapura, Bangalore upcoming project",
    detailHref: "/chandapura-bangalore",
  },
  {
    status: "upcoming",
    name: "MUTHANALLUR, OFF SARJAPURA",
    statLabel: "Phase",
    statValue: "COMING SOON",
    location: "MUTHANALLUR, OFF SARJAPURA ROAD",
    unitLabel: "4 ACRE | HIGH RISE APARTMENT",
    image: "/project-images/upcoming-project-images/Muthanallur.jpg",
    alt: "Muthanallur, off Sarjapura upcoming project",
    detailHref: "/muthanallur-off-sarjapura-bangalore",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE CELESTA",
    statLabel: "Status",
    statValue: "SOLD OUT",
    location: "OFF CHANDAPURA ROAD, BANGALORE",
    unitLabel: "4 ACRE | 340 UNITS",
    image: "/project-images/completed-project-images/celesta-compPorjects-img.webp",
    alt: "Global Edifice Celesta",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE CRESENT",
    statLabel: "Status",
    statValue: "SOLD OUT",
    location: "CHANDAPURA MAIN ROAD, BANGALORE",
    unitLabel: "1 ACRE | 61 UNITS",
    image: "/project-images/completed-project-images/cresent-compPorjects-img.webp",
    alt: "Global Edifice Cresent",
  },
  {
    status: "completed",
    name: "GLOBAL GREEN APPLE HIKES",
    statLabel: "Status",
    statValue: "SOLD OUT",
    location: "CHANDAPURA MAIN ROAD, BANGALORE",
    unitLabel: "2 ACRE | 80 UNITS",
    image: "/project-images/completed-project-images/green-appleHikes-compPorjects-img.webp",
    alt: "Global Edifice Green Apple Hikes",
  },
  {
    status: "completed",
    name: "GREEN APPLE VILLAS PHASE 1",
    statLabel: "Status",
    statValue: "SOLD OUT",
    location: "CHANDAPURA, BANGALORE",
    unitLabel: "7 ACRE | 80 VILLAS",
    image: "/project-images/completed-project-images/greenAppleVillas1-compPorjects-img.webp",
    alt: "Green Apple Villas Phase 1",
  },
  {
    status: "completed",
    name: "GREEN APPLE VILLAS PHASE 2",
    statLabel: "Status",
    statValue: "SOLD OUT",
    location: "CHANDAPURA, BANGALORE",
    unitLabel: "7 ACRE | 80 VILLAS",
    image: "/project-images/completed-project-images/greenAppleVillas2-compPorjects-img.webp",
    alt: "Green Apple Villas Phase 2",
  },
];


function ProjectsNavigationLink({
  item,
  className = "transition hover:text-[#123a4c]",
  onClick,
}: {
  item: ProjectNavItem;
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

function ProjectsNavigation() {
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
            {projectNav.map((item) => (
              <ProjectsNavigationLink key={item.label} item={item} />
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
            aria-controls="projects-mobile-nav"
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
          <nav id="projects-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {projectNav.map((item) => (
              <ProjectsNavigationLink
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

function useProjectsMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute("content") ?? null;

    document.title = PROJECTS_TITLE;

    let metaElement = existingDescription;

    if (!metaElement) {
      metaElement = document.createElement("meta");
      metaElement.setAttribute("name", "description");
      document.head.appendChild(metaElement);
    }

    metaElement.setAttribute("content", PROJECTS_DESCRIPTION);

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

function ProjectsHero() {
  return (
    <section className="relative isolate h-[60svh] min-h-[28rem] overflow-hidden bg-[#101820] text-white sm:min-h-[32rem] md:h-[68svh] md:min-h-[39rem]">
      <img
        src={projectsHero}
        alt="Global Edifice projects overview"
        className="absolute inset-0 h-full w-full object-cover object-[48%_44%]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_26%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(90deg,rgba(7,14,19,0.36)_0%,rgba(7,14,19,0.18)_28%,rgba(7,14,19,0.58)_68%,rgba(7,14,19,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,22,0.18)_0%,rgba(8,15,22,0.08)_30%,rgba(8,15,22,0.68)_100%)]" />

      <div
        className={`relative mx-auto flex h-full max-w-7xl items-center justify-start ${pageGutterClass} pb-10 pt-26 sm:pt-30 md:justify-end md:pb-14 md:pt-30`}
      >
        <div className="max-w-[20rem] text-left sm:max-w-[26rem] md:max-w-[34rem] md:text-right">
          <h1 className="font-display text-[2.2rem] leading-[0.98] tracking-[-0.02em] text-white sm:text-[2.75rem] md:text-[3.5rem] lg:text-[3.9rem]">
            <span className="block">Places You&apos;ll Be</span>
            <span className="block">Proud to Call Home.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function ProjectPortfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>("ongoing");
  const filteredProjects = projects.filter((project) => project.status === activeFilter);

  return (
    <section id="portfolio" className="bg-[#f9f6f1] py-18 md:py-22 lg:py-24">
      <div className={pageContainerClass}>
        <div className="mx-auto max-w-[46rem] text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#dbc9a7]/80" />
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#a8762b]">
              Our Projects
            </span>
            <span className="h-px w-10 bg-[#dbc9a7]/80" />
          </div>
          <h2 className="mt-4 font-display text-[2.1rem] leading-[1.02] text-[#1f1d1a] sm:text-[2.5rem] md:text-[3.15rem]">
            Places You&apos;ll Be Proud to Call Home.
          </h2>
          <div className="mx-auto mt-6 max-w-[40rem] space-y-4 text-[0.94rem] leading-[1.8] text-[#6b655d] md:mt-7 md:text-[1.02rem] md:leading-[1.85]">
            <p>Every project begins with an idea.</p>
            <p>
              To create homes that feel right—not just on the day you move in, but for years to
              come.
            </p>
            <p>
              Some are already welcoming families. Others are preparing to shape the next chapter of
              Bengaluru&apos;s growth. Each one reflects the same philosophy: thoughtful design,
              honest craftsmanship, and a commitment to building communities that stand the test of
              time.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[30rem] border-y border-[#e4d8c4] px-2 py-3 md:max-w-[32rem]">
          <div className="flex items-center justify-center text-[0.88rem] font-semibold uppercase tracking-[0.24em] text-[#a8762b]">
            {projectFilters.map((filter, index) => (
              <div key={filter.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2 transition md:px-6 ${
                    activeFilter === filter.id
                      ? "font-bold text-[#8f611d]"
                      : "text-[#b48b50] hover:text-[#123a4c]"
                  }`}
                >
                  {filter.label}
                </button>
                {index < projectFilters.length - 1 ? (
                  <span className="h-7 w-px bg-[#e4d8c4]" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.name}
              className="overflow-hidden rounded-[1rem] border border-[#e4d8c4] bg-[#fffdfa]"
            >
              <img
                src={project.image}
                alt={project.alt}
                className="h-[14rem] w-full object-cover object-center md:h-[15.5rem]"
              />

              <div className="flex h-full flex-col p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[12.5rem] text-[1.02rem] font-semibold uppercase leading-[1.15] text-[#1f1d1a] md:text-[1.12rem]">
                    {project.name}
                  </h3>

                  <div className="shrink-0 pt-0.5 text-right text-[#a8762b]">
                    <p className="text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-[#b48b50]">
                      {project.statLabel}
                    </p>
                    <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-[0.02em]">
                      {project.statValue}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[0.62rem] font-medium uppercase tracking-[0.06em] text-[#b48b50]">
                  {project.location}
                </p>

                <div className="relative mt-8 text-[0.68rem] font-medium uppercase tracking-[0.06em] text-[#4b4741]">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#e4d8c4]" />
                  <span className="relative inline-block bg-[#fffdfa] pr-3">
                    {project.unitLabel}
                  </span>
                </div>

                {project.status === "completed" ? (
                  <div className="mt-5 rounded-[0.9rem] border border-[#e4d8c4] bg-[#f8f1e6] px-4 py-3 text-center">
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-[#b48b50]">
                      Completed Project
                    </p>
                    <p className="mt-1 text-[0.74rem] font-medium uppercase tracking-[0.06em] text-[#4b4741]">
                      Sold out inventory
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b49a6c] px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#9f8658]"
                    >
                      Book A Site Visit
                    </a>
                    <Link
                      to={project.detailHref as any}
                      className="inline-flex items-center justify-center rounded-full border border-[#d8c7a8] bg-white px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-[#1f1d1a] transition hover:border-[#c7b08a] hover:bg-[#faf7f2]"
                    >
                      Know More
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



function ProjectsPage() {
  useProjectsMetadata();

  const matchRoute = useMatchRoute();
  const isExactProjects = matchRoute({ to: '/projects' });
  
  if (!isExactProjects) {
    return <Outlet />;
  }

  return (
    <>
      <main className="bg-[#f7f2eb] text-[#163849]">
        <SiteHeader />
        <ProjectsHero />
        <ProjectPortfolio />
        <SiteGetInTouch />
      </main>
      <SiteFooter />
    </>
  );
}
