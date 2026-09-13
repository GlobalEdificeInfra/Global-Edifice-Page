import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import geLogo from "@/assets/shared/ge-logo.png";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";
import {
  MobileSiteResourceLinks,
  SiteResourceMenu,
} from "@/components/site-resource-menu";

export const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
export const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const siteNavLinks = [
  { label: "HOME", kind: "href", href: "/#home" },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "route", to: "/projects" as const },
  { label: "RESOURCES", kind: "resources-menu" },
  { label: "CONTACT", kind: "route", to: "/contact" as const },
] as const;

type SiteNavItem = (typeof siteNavLinks)[number];

const projectPaths = [
  "/projects",
  "/chandapura-bangalore",
  "/chandapura-heelalige",
  "/chandapura-nh-44",
  "/gunjur",
  "/muthanallur-off-sarjapura-bangalore",
] as const;

const resourcePaths = ["/blogs", "/careers", "/channel-partner"] as const;

function isProjectsPath(pathname: string) {
  if (pathname === "/projects" || pathname.startsWith("/projects/")) {
    return true;
  }

  return projectPaths.some((path) => path !== "/projects" && pathname === path);
}

function isResourcesPath(pathname: string) {
  return resourcePaths.some(
    (path) => pathname === path || (path === "/blogs" && pathname.startsWith("/blogs/")),
  );
}

function isNavItemActive(item: SiteNavItem, pathname: string) {
  switch (item.label) {
    case "HOME":
      return pathname === "/";
    case "ABOUT US":
      return pathname === "/about";
    case "PROJECTS":
      return isProjectsPath(pathname);
    case "RESOURCES":
      return isResourcesPath(pathname);
    case "CONTACT":
      return pathname === "/contact";
    default:
      return false;
  }
}

function getDesktopNavClassName(isActive: boolean) {
  return isActive
    ? "font-bold text-[#123a4c] underline decoration-[#c4a36b] decoration-2 underline-offset-[6px]"
    : "transition hover:text-[#123a4c]";
}

function getMobileNavClassName(isActive: boolean) {
  return isActive
    ? "block rounded-[0.95rem] bg-[#f6f1e8] px-4 py-3 text-[0.8rem] font-bold tracking-[0.16em] text-[#123a4c]"
    : "block rounded-[0.95rem] px-4 py-3 text-[0.8rem] font-medium tracking-[0.16em] text-[#7a5418] transition hover:bg-[#f6f1e8] hover:text-[#123a4c]";
}

function DesktopNavItem({ item, isActive }: { item: SiteNavItem; isActive: boolean }) {
  const itemClassName = getDesktopNavClassName(isActive);

  if (item.kind === "resources-menu") {
    return <SiteResourceMenu className={itemClassName} isActive={isActive} />;
  }

  if (item.kind === "route") {
    return (
      <Link to={item.to} className={itemClassName} aria-current={isActive ? "page" : undefined}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={itemClassName} aria-current={isActive ? "page" : undefined}>
      {item.label}
    </a>
  );
}

export function SiteHeader({ appearance = "overlay" }: { appearance?: "overlay" | "solid" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(appearance === "solid");
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showSolid = appearance === "solid" || isScrolled;

  useEffect(() => {
    if (appearance === "solid") {
      setIsScrolled(true);
      return;
    }

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 48);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, [appearance]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`${pageGutterClass} pt-4 md:pt-7`}>
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 transition-[background-color,box-shadow,border-color,padding] duration-300 md:gap-6 ${
            showSolid
              ? "rounded-full border border-[#eadfce]/80 bg-white px-3.5 py-1.5 shadow-[0_14px_32px_-20px_rgba(18,58,76,0.28)] md:px-4 md:py-2"
              : "bg-transparent px-0 py-0"
          }`}
        >
          <Link to="/" className="shrink-0">
            <img
              src={showSolid ? geLogoGold : geLogo}
              alt="Global Edifice - The Foundation of Trust"
              className={`transition-[width,height] duration-300 ${
                showSolid
                  ? "h-12 w-auto md:h-14"
                  : "w-[148px] md:w-[210px] [filter:brightness(0)_invert(1)]"
              }`}
            />
          </Link>

          <div className="hidden items-center lg:flex">
            <nav
              className={`flex items-center gap-5 text-[0.68rem] font-semibold tracking-[0.1em] text-[#7a5418] xl:gap-9 xl:text-[0.72rem] xl:tracking-[0.13em] ${
                showSolid
                  ? ""
                  : "rounded-full bg-white/96 px-7 py-3 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm"
              }`}
            >
              {siteNavLinks.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  item={item}
                  isActive={isNavItemActive(item, pathname)}
                />
              ))}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))}
                className="rounded-full bg-[#c0a56e] px-5 py-2 text-[0.72rem] text-white transition-colors hover:bg-[#a89458] lg:text-[0.76rem]"
              >
                ENQUIRE
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))}
              className={`min-h-10 rounded-full tracking-[0.16em] transition-colors ${
                showSolid
                  ? "bg-[#c0a56e] px-4 py-2.5 text-[0.68rem] text-white"
                  : "border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]"
              }`}
            >
              ENQUIRE
            </button>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="site-mobile-nav"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                showSolid
                  ? "border border-[#eadfce] bg-[#f7f2ea] text-[#7a5418]"
                  : "border border-white/40 bg-white/10 text-white backdrop-blur"
              }`}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`${pageGutterClass} pb-2 lg:hidden`}>
        <div
          className={`overflow-hidden rounded-[1.15rem] border border-[#eadfce]/80 bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[42rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <nav id="site-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {siteNavLinks.map((item) => {
              const isActive = isNavItemActive(item, pathname);

              if (item.kind === "resources-menu") {
                return (
                  <MobileSiteResourceLinks
                    key={item.label}
                    isActive={isActive}
                    onNavigate={() => setIsMobileMenuOpen(false)}
                  />
                );
              }

              if (item.kind === "route") {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={getMobileNavClassName(isActive)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={getMobileNavClassName(isActive)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
