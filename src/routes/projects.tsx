import { useEffect, useState } from "react";
import { Link, createFileRoute, Outlet, useMatchRoute } from "@tanstack/react-router";
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
  /** Completed: badge + unit description */
  badge?: "few-remaining" | "sold-out";
  unitDescription?: string;
};

const projects: Project[] = [
  {
    status: "ongoing",
    name: "GLOBAL EDIFICE THE CLAN",
    nameLines: ["Global Edifice", "The Clan"],
    price: "₹ 85 LAKHS*",
    specs: "257 SIGNATURE RESIDENCES | 3.5 ACRES | G+9 FLOORS",
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
    specs: "1134 - 1590 SQFT",
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
    scale: "30 STOREYED | 8 ACRES",
    typeLabel: "PREMIUM HIGH RISE RESIDENCES",
    alt: "Chandapura Heelalige upcoming project",
    detailHref: "/chandapura-heelalige",
  },
  {
    status: "upcoming",
    name: "MUTHANALLUR",
    nameLines: ["Muthanallur"],
    location: "BOMMASANDRA, BANGALORE",
    scale: "16 STOREYED | 1.5 ACRES",
    typeLabel: "PREMIUM RESIDENCES",
    alt: "Muthanallur upcoming project",
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
    detailHref: "/gunjur",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE LEGACY",
    nameLines: ["Global Edifice", "Legacy"],
    location: "CHANDAPURA, BANGALORE",
    badge: "few-remaining",
    unitDescription: "SPACIOUS 3BHK HOMES",
    image: projectLegacy,
    alt: "Global Edifice Legacy",
    detailHref: "/projects",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE CELESTA",
    nameLines: ["Global Edifice", "Celesta"],
    location: "CHANDAPURA, BANGALORE",
    badge: "sold-out",
    unitDescription: "2BHK RESIDENCES",
    image: "/project-images/completed-project-images/celesta-compPorjects-img.webp",
    alt: "Global Edifice Celesta",
  },
  {
    status: "completed",
    name: "GLOBAL EDIFICE CRESENT",
    nameLines: ["Global Edifice", "Cresent"],
    location: "CHANDAPURA, BANGALORE",
    badge: "sold-out",
    unitDescription: "2&3 BHK RESIDENCES",
    image: "/project-images/completed-project-images/cresent-compPorjects-img.webp",
    alt: "Global Edifice Cresent",
  },
  {
    status: "completed",
    name: "GREEN APPLE HIKES",
    nameLines: ["Green Apple", "Hikes"],
    location: "TIRUMAGONDANAHALLI, BANGALORE",
    badge: "sold-out",
    unitDescription: "1&2 BHK RESIDENCES",
    image: "/project-images/completed-project-images/green-appleHikes-compPorjects-img.webp",
    alt: "Green Apple Hikes",
  },
  {
    status: "completed",
    name: "GREEN APPLE VILLAS",
    nameLines: ["Green Apple", "Villas"],
    location: "CHANDAPURA, BANGALORE",
    badge: "sold-out",
    unitDescription: "PREMIUM VILLAS",
    image: "/project-images/completed-project-images/greenAppleVillas1-compPorjects-img.webp",
    alt: "Green Apple Villas",
  },
];

function UpcomingPlaceholder() {
  return (
    <div className="flex h-[11.5rem] items-center justify-center bg-[#dce3ea] md:h-[12.5rem]" aria-hidden>
      <svg viewBox="0 0 220 118" className="h-[5.4rem] w-auto" fill="none">
        <ellipse cx="110" cy="102" rx="78" ry="9" fill="#c5ced6" />
        <rect x="38" y="68" width="42" height="28" fill="#9aafc0" />
        <rect x="48" y="76" width="22" height="12" fill="#7e96ab" />
        <rect x="86" y="34" width="52" height="62" fill="#9aafc0" />
        <rect x="96" y="42" width="10" height="8" fill="#7e96ab" />
        <rect x="118" y="42" width="10" height="8" fill="#7e96ab" />
        <rect x="96" y="56" width="10" height="8" fill="#7e96ab" />
        <rect x="118" y="56" width="10" height="8" fill="#7e96ab" />
        <rect x="96" y="70" width="10" height="8" fill="#7e96ab" />
        <rect x="118" y="70" width="10" height="8" fill="#7e96ab" />
        <rect x="104" y="82" width="16" height="14" fill="#7e96ab" />
        <rect x="158" y="72" width="3" height="24" fill="#9aafc0" />
        <circle cx="159.5" cy="64" r="14" fill="#9aafc0" />
        <rect x="180" y="80" width="2.5" height="16" fill="#9aafc0" />
        <circle cx="181.2" cy="74" r="9" fill="#9aafc0" />
      </svg>
    </div>
  );
}

function BookSiteVisitButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))}
      className="inline-flex items-center justify-center rounded-full bg-[#a38b6b] px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#8a7458]"
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

  return (
    <Link
      to={href as any}
      className={`inline-flex items-center justify-center rounded-full border border-[#d8c7a8] bg-transparent px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#a38b6b] transition hover:border-[#a38b6b] hover:bg-[#faf7f2] ${className}`}
    >
      Know More
    </Link>
  );
}

function ProjectCardBody({ project }: { project: Project }) {
  if (project.status === "upcoming") {
    return (
      <div className="flex h-full flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[0.92rem] font-semibold uppercase leading-[1.15] text-[#2a2723] md:text-[1rem]">
            {project.nameLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="max-w-[7.5rem] shrink-0 pt-0.5 text-right text-[0.5rem] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-[#a38b6b]">
            {project.location}
          </p>
        </div>

        <p className="mt-3 text-[0.6rem] font-medium uppercase tracking-[0.04em] text-[#a38b6b]">
          {project.scale}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="shrink-0 text-[0.6rem] font-medium uppercase tracking-[0.04em] text-[#2a2723]">
            {project.typeLabel}
          </span>
          <span className="h-px min-w-0 flex-1 bg-[#eadfcc]" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <BookSiteVisitButton />
          <KnowMoreButton href={project.detailHref} />
        </div>
      </div>
    );
  }

  if (project.status === "completed") {
    const isFewRemaining = project.badge === "few-remaining";

    return (
      <div className="flex h-full flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[0.98rem] font-semibold uppercase leading-[1.12] text-[#332d2b] md:text-[1.05rem]">
              {project.nameLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.04em] text-[#9a9084]">
              {project.location}
            </p>
          </div>

          {isFewRemaining ? (
            <p className="max-w-[6.5rem] shrink-0 pt-1 text-right text-[0.52rem] font-semibold uppercase leading-[1.35] tracking-[0.08em] text-[#9a7a6a]">
              Few Remaining Homes
            </p>
          ) : (
            <span className="shrink-0 rounded-[0.2rem] border border-[#d8c7a8] px-2.5 py-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.1em] text-[#6f6558]">
              Sold Out
            </span>
          )}
        </div>

        <p className="mt-5 text-[0.62rem] font-medium uppercase tracking-[0.04em] text-[#9a9084]">
          {project.unitDescription}
        </p>

        <div className="mt-6 h-px w-full bg-[#eadfcc]" />

        {isFewRemaining ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BookSiteVisitButton />
            <KnowMoreButton href={project.detailHref} />
          </div>
        ) : (
          <div className="mt-5 flex justify-center">
            {project.detailHref ? (
              <KnowMoreButton href={project.detailHref} className="min-w-[10rem]" />
            ) : (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))}
                className="inline-flex min-w-[10rem] items-center justify-center rounded-full border border-[#d8c7a8] bg-transparent px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-[#332d2b] transition hover:border-[#a38b6b] hover:bg-[#faf7f2]"
              >
                Know More
              </button>
            )}
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

        <div className="shrink-0 pt-0.5 text-right text-[#a38b6b]">
          <p className="text-[0.52rem] font-semibold uppercase tracking-[0.14em]">Starting From</p>
          <p className="mt-1 text-[0.74rem] font-semibold uppercase tracking-[0.02em]">
            {project.price}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[0.62rem] font-medium uppercase tracking-[0.04em] text-[#6f4e1a]">
        {project.specs}
      </p>

      <div className="relative mt-6 text-[0.62rem] font-medium uppercase tracking-[0.04em] text-[#8a7a68]">
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
    <section id="portfolio" className="bg-[#fbf8f4] pb-18 pt-32 md:pb-22 md:pt-36 lg:pb-24">
      <div className={pageContainerClass}>
        <div className="mx-auto max-w-[46rem] text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#dbc9a7]/80" />
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#a38b6b]">
              Portfolio
            </span>
            <span className="h-px w-12 bg-[#dbc9a7]/80" />
          </div>
          <h1 className="mt-4 font-display text-[2.1rem] leading-[1.02] text-[#332d2b] sm:text-[2.5rem] md:text-[3.15rem]">
            Our Projects
          </h1>
        </div>

        <div className="mx-auto mt-10 max-w-[30rem] overflow-x-auto border-y border-[#e4d8c4] px-1 py-3 md:max-w-[32rem]">
          <div className="flex min-w-max items-center justify-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#a38b6b] sm:text-[0.82rem] sm:tracking-[0.24em] md:text-[0.88rem]">
            {projectFilters.map((filter, index) => (
              <div key={filter.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`min-h-11 px-3 py-2.5 transition sm:px-5 md:px-6 ${
                    activeFilter === filter.id
                      ? "font-bold text-[#6f4e1a]"
                      : "font-medium text-[#c4ae86] hover:text-[#8a6324]"
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
          className={`group/projects mt-14 gap-6 ${
            filteredProjects.length >= 3
              ? "mx-auto grid max-w-5xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3"
              : "mx-auto flex max-w-4xl flex-wrap justify-center"
          }`}
        >
          {filteredProjects.map((project) => (
            <article
              key={project.name}
              className={`group/card origin-center overflow-hidden rounded-[1.2rem] border border-[#eadfcc] bg-white shadow-[0_22px_40px_-34px_rgba(40,32,23,0.26)] transition-all duration-500 ease-out hover:z-10 hover:scale-[1.02] hover:border-[#d6c3a3] hover:shadow-[0_28px_55px_-28px_rgba(40,32,23,0.38)] group-hover/projects:opacity-45 group-hover/projects:hover:opacity-100 ${
                filteredProjects.length < 3 ? "w-full max-w-[21rem] sm:w-[21rem]" : ""
              }`}
            >
              {project.image ? (
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="h-[13rem] w-full object-cover object-center transition-transform duration-700 ease-out md:h-[14.5rem] group-hover/card:scale-105"
                  />
                </div>
              ) : project.status === "upcoming" ? (
                <UpcomingPlaceholder />
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
        <SiteHeader appearance="solid" />
        <ProjectPortfolio />
        <SiteGetInTouch />
      </main>
      <SiteFooter />
    </>
  );
}
