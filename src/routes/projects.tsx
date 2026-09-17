import { useEffect, useState } from "react";
import { Link, createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
import projectClan from "@/assets/projects/the-clan/The-clan-project.png";
import projectsHeroAerial from "@/assets/projects/projects-hero-aerial-night.jpg";
import projectLegacy from "@/assets/projects/legacy/project-legacy.jpg";
import { upcomingProjectMaps } from "@/assets/locations/upcoming";
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

type ProjectStatus = "ongoing" | "upcoming" | "completed";

const projectFilters: Array<{ id: ProjectStatus; label: string }> = [
  { id: "ongoing", label: "ONGOING" },
  { id: "upcoming", label: "UPCOMING" },
  { id: "completed", label: "COMPLETED" },
];

type Project = {
  status: ProjectStatus;
  name: string;
  nameLines: string[];
  image?: string;
  alt: string;
  detailHref?: string;
  /** Ongoing: price + specs + config line */
  price?: string;
  specs?: string;
  configLine?: string;
  /** Upcoming: location right, scale, type label with rule */
  location?: string;
  scale?: string;
  typeLabel?: string;
  /** Completed: availability + unit description */
  availability?: "available" | "sold-out";
  unitDescription?: string;
};

const projects: Project[] = [
  {
    status: "ongoing",
    name: "GLOBAL EDIFICE THE CLAN",
    nameLines: ["Global Edifice", "The Clan"],
    price: "₹ 85 LAKHS*",
    specs: "257 SPACIOUS RESIDENCES | 3.5 ACRES | G+9 FLOORS",
    configLine: "2&3BHK RESIDENCES | SARJAPUR, BANGALORE",
    image: projectClan,
    alt: "Global Edifice The Clan",
    detailHref: "/projects/the-clan",
  },
  {
    status: "ongoing",
    name: "GLOBAL EDIFICE ORLEAN",
    nameLines: ["Global Edifice", "Orlean"],
    price: "₹ 76 LAKHS*",
    specs: "91 SPACIOUS RESIDENCES | 1.5 ACRES | G+6 FLOORS",
    configLine: "2BHK RESIDENCES | CHANDAPURA, BANGALORE",
    image: "/project-images/orlean-images/orlean-main2.jpg",
    alt: "Global Edifice Orlean",
    detailHref: "/projects/orlean",
  },
  {
    status: "upcoming",
    name: "CHANDAPURA HEELALIGE",
    nameLines: ["Chandapura Heelalige"],
    location: "CHANDAPURA, BANGALORE",
    scale: "30 STOREYED | 12 ACRES",
    typeLabel: "PREMIUM HIGH RISE RESIDENCES",
    alt: "Chandapura Heelalige upcoming project",
    image: upcomingProjectMaps.heelalige,
    detailHref: "/chandapura-heelalige",
  },
  {
    status: "upcoming",
    name: "MUTHANALLUR",
    nameLines: ["Muthanallur"],
    location: "BOMMASANDRA, BANGALORE",
    scale: "15 STOREYED | 2 ACRES",
    typeLabel: "PREMIUM RESIDENCES",
    alt: "Muthanallur upcoming project",
    image: upcomingProjectMaps.muthanallur,
    detailHref: "/muthanallur-off-sarjapura-bangalore",
  },
  {
    status: "upcoming",
    name: "CHANDAPURA NH 44",
    nameLines: ["Chandapura NH 44"],
    location: "CHANDAPURA, BANGALORE",
    scale: "30 STOREYED | 5.5 ACRES",
    typeLabel: "LUXURY RESIDENCES",
    alt: "Chandapura NH 44 upcoming project",
    image: upcomingProjectMaps.nh44,
    detailHref: "/chandapura-nh-44",
  },
  {
    status: "upcoming",
    name: "GUNJUR",
    nameLines: ["Gunjur"],
    location: "NEAR VARTHUR, BANGALORE",
    scale: "12 ACRES | PREMIUM PLOTS",
    typeLabel: "PREMIUM PLOTS",
    alt: "Gunjur premium plots upcoming project",
    image: upcomingProjectMaps.gunjur,
    detailHref: "/gunjur",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE LEGACY",
    nameLines: ["Global Edifice", "Legacy"],
    location: "CHANDAPURA, BANGALORE",
    availability: "available",
    unitDescription: "2&3 BHK RESIDENCES",
    image: projectLegacy,
    alt: "Global Edifice Legacy",
    detailHref: "/projects",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE CELESTA",
    nameLines: ["Global Edifice", "Celesta"],
    location: "CHANDAPURA, BANGALORE",
    availability: "sold-out",
    unitDescription: "1,2&3 BHK RESIDENCES",
    image: "/project-images/completed-project-images/celesta-compPorjects-img.webp",
    alt: "Global Edifice Celesta",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE CRESENT",
    nameLines: ["Global Edifice", "Cresent"],
    location: "CHANDAPURA, BANGALORE",
    availability: "sold-out",
    unitDescription: "2&3 BHK RESIDENCES",
    image: "/project-images/completed-project-images/cresent-compPorjects-img.webp",
    alt: "Global Edifice Cresent",
  },
  {
    status: "completed",
    name: "GREEN APPLE HIKES",
    nameLines: ["Green Apple", "Hikes"],
    location: "TIRUMAGONDANAHALLI, BANGALORE",
    availability: "sold-out",
    unitDescription: "2&3 BHK RESIDENCES",
    image: "/project-images/completed-project-images/green-appleHikes-compPorjects-img.webp",
    alt: "Green Apple Hikes",
  },
  {
    status: "completed",
    name: "GREEN APPLE VILLAS",
    nameLines: ["Green Apple", "Villas"],
    location: "CHANDAPURA, BANGALORE",
    availability: "sold-out",
    unitDescription: "PREMIUM VILLAS",
    image: "/project-images/completed-project-images/greenAppleVillas1-compPorjects-img.webp",
    alt: "Green Apple Villas",
  },
];


function ProjectsHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#14120f] text-white">
      <img
        src={projectsHeroAerial}
        alt="Global Edifice residential communities at night"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,18,0.35)_0%,rgba(8,12,18,0.2)_40%,rgba(8,12,18,0.55)_100%)]" />
      <div className="absolute inset-0 bg-black/25" />

      <div
        className={`relative mx-auto flex min-h-[100svh] max-w-7xl items-center justify-end ${pageGutterClass} pb-10 pt-28 sm:pt-32 md:pb-12 md:pt-28 lg:pt-30`}
      >
        <div className="max-w-[20rem] text-right sm:max-w-[32rem] md:max-w-[46rem] lg:max-w-[52rem]">
          <h1 className="font-display text-[2.05rem] leading-[0.96] tracking-[-0.03em] text-white sm:text-[2.85rem] md:text-[3.85rem] lg:text-[4.45rem]">
            <span className="block sm:whitespace-nowrap">Places You&apos;ll Be Proud</span>
            <span className="block sm:whitespace-nowrap">To Call Home.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

function BookSiteVisitButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))}
      className={`inline-flex items-center justify-center rounded-full bg-[#c0a56e] px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#a89458] ${className}`}
    >
      Book A Site Visit
    </button>
  );
}

function KnowMoreButton({
  href,
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  if (!href) return null;

  const classNames = `inline-flex items-center justify-center rounded-full border border-[#d8c7a8] bg-transparent px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#c0a56e] transition hover:border-[#c0a56e] hover:bg-[#faf7f2] ${className}`;
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classNames}>
        Know More
      </a>
    );
  }

  return (
    <Link to={href as any} className={classNames}>
      Know More
    </Link>
  );
}

function ProjectCardBody({ project }: { project: Project }) {
  if (project.status === "upcoming") {
    return (
      <div className="flex h-full flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[0.98rem] font-semibold uppercase leading-[1.12] text-[#7a756e] md:text-[1.05rem]">
            {project.nameLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[7.5rem] shrink-0 pt-0.5 text-right text-[0.625rem] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-[#c0a56e]">
            {project.location}
          </p>
        </div>

        <p className="mt-4 text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[#c0a56e]">
          {project.scale}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[#7a756e]">
            {project.typeLabel}
          </span>
          <span className="h-px min-w-0 flex-1 bg-[#eadfcc]" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <BookSiteVisitButton />
          <KnowMoreButton href={project.detailHref} />
        </div>
      </div>
    );
  }

  if (project.status === "completed") {
    const isAvailable = project.availability === "available";

    return (
      <div className="flex h-full flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[0.98rem] font-semibold uppercase leading-[1.12] text-[#332d2b] md:text-[1.05rem]">
              {project.nameLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-2 text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[#9a9084]">
              {project.location}
            </p>
          </div>

          {isAvailable ? (
            <p className="max-w-[6.5rem] shrink-0 pt-1 text-right text-[0.52rem] font-semibold uppercase leading-[1.35] tracking-[0.08em] text-[#9a7a6a]">
              Few Remaining Homes
            </p>
          ) : (
            <p className="max-w-[8.5rem] shrink-0 pt-1 text-right text-[0.7rem] font-medium uppercase leading-[1.35] tracking-[0.04em] text-[#9a9084]">
              {project.unitDescription}
            </p>
          )}
        </div>

        {isAvailable ? (
          <p className="mt-5 text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[#9a9084]">
            {project.unitDescription}
          </p>
        ) : null}

        <div className="mt-6 h-px w-full bg-[#eadfcc]" />

        {isAvailable ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BookSiteVisitButton />
            <KnowMoreButton href={project.detailHref} />
          </div>
        ) : (
          <div className="mt-5 flex justify-center">
            <span className="inline-flex min-w-[10rem] items-center justify-center rounded-full border border-[#d8c7a8] bg-transparent px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#6f6558]">
              Sold Out
            </span>
          </div>
        )}
      </div>
    );
  }

  // Ongoing
  return (
    <div className="flex h-full flex-col p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <h2 className="min-w-0 flex-1 text-[0.98rem] font-semibold uppercase leading-[1.12] text-[#332d2b] md:text-[1.05rem]">
          {project.nameLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="shrink-0 pt-0.5 text-right text-[#c0a56e]">
          <p className="text-[0.52rem] font-semibold uppercase tracking-[0.14em]">Starting From</p>
          <p className="mt-1 text-[0.74rem] font-semibold uppercase tracking-[0.02em]">
            {project.price}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[#a89458]">
        {project.specs}
      </p>

      <div className="relative mt-6 text-[0.75rem] font-medium uppercase tracking-[0.04em] text-[#8a7a68]">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#eadfcc]" />
        <span className="relative inline-block bg-white pr-3">{project.configLine}</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <BookSiteVisitButton />
        <KnowMoreButton href={project.detailHref} />
      </div>
    </div>
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

function ProjectPortfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus>("ongoing");
  const filteredProjects = projects.filter((project) => project.status === activeFilter);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "") as ProjectStatus;
      if (hash === "ongoing" || hash === "upcoming" || hash === "completed") {
        setActiveFilter(hash);
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section id="portfolio" className="bg-[#fbf8f4] pb-18 pt-16 md:pb-22 md:pt-20 lg:pb-24 lg:pt-24">
      <div className={pageContainerClass}>
        <div className="mx-auto max-w-[60rem] text-center">
          <h2 className="font-display text-[2rem] leading-[1.08] text-[#c0a56e] sm:text-[2.35rem] md:text-[2.85rem] lg:text-[3.25rem]">
            Designed for Living. Built to Last.
          </h2>

          <div className="mx-auto mt-10 max-w-[52rem] space-y-6 text-base font-normal leading-[1.9] text-[#7a756e] md:mt-12">
            <p>
              Every project begins with an idea &mdash; to create homes that feel right not just on
              the day you move in, but for years to come.
            </p>
            <p>
              From completed communities welcoming families to upcoming developments shaping
              Bengaluru&apos;s future, each project reflects our commitment to thoughtful design,
              quality craftsmanship and building communities that stand the test of time.
            </p>
            <p>
              Explore the places we have created &mdash; and the communities we are building for
              tomorrow.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[36rem] overflow-x-auto border-y border-[#e4d8c4] px-1 py-3 md:mt-14 md:max-w-[40rem] lg:max-w-[44rem]">
          <div className="flex min-w-max items-center justify-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#c0a56e] sm:text-[0.82rem] sm:tracking-[0.24em] md:text-[0.88rem]">
            {projectFilters.map((filter, index) => (
              <div key={filter.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`min-h-11 px-3 py-2.5 transition sm:px-5 md:px-6 ${
                    activeFilter === filter.id
                      ? "font-bold text-[#a89458]"
                      : "font-medium text-[#c4ae86] hover:text-[#c0a56e]"
                  }`}
                >
                  {filter.label}
                </button>
                {index < projectFilters.length - 1 ? (
                  <span className="h-5 w-px bg-[#d8c7a8]" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-14 gap-6 ${
            filteredProjects.length >= 3
              ? "mx-auto grid max-w-5xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3"
              : "mx-auto flex max-w-4xl flex-wrap justify-center"
          }`}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.name}
              className={`group/card origin-center overflow-hidden rounded-[1.2rem] border border-[#eadfcc] bg-white shadow-[0_22px_40px_-34px_rgba(40,32,23,0.26)] transition-all duration-500 ease-out hover:z-10 hover:scale-[1.02] hover:border-[#d6c3a3] hover:shadow-[0_28px_55px_-28px_rgba(40,32,23,0.38)] ${
                filteredProjects.length < 3 ? "w-full max-w-[21rem] sm:w-[21rem]" : ""
              }`}
            >
              {project.image ? (
                <div className="overflow-hidden bg-[#dce3ea]">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="h-[13rem] w-full object-cover object-center transition-transform duration-700 ease-out group-hover/card:scale-105 md:h-[14.5rem]"
                  />
                </div>
              ) : null}

              <ProjectCardBody project={project} />
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
  const isExactProjects = matchRoute({ to: "/projects" });

  if (!isExactProjects) {
    return <Outlet />;
  }

  return (
    <>
      <main className="bg-[#fbf8f4] text-[#163849]">
        <SiteHeader />
        <ProjectsHero />
        <ProjectPortfolio />
        <SiteGetInTouch />
      </main>
      <SiteFooter />
    </>
  );
}
