import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import geLogo from "@/assets/shared/ge-logo.png";
import { MobileSiteProjectLinks, SiteProjectsMenu } from "@/components/site-resource-menu";

export const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
export const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const navItems = [
  { label: "HOME", kind: "route", to: "/" as const },
  { label: "ABOUT US", kind: "route", to: "/about" as const },
  { label: "PROJECTS", kind: "projects-menu" },
  { label: "BLOGS", kind: "route", to: "/blogs" as const },
  { label: "CONTACT", kind: "route", to: "/contact" as const },
] as const;

type BlogNavItem = (typeof navItems)[number];
type ActiveNavLabel = BlogNavItem["label"] | null;

function BlogNavigationLink({
  item,
  onClick,
  className = "transition hover:text-[#123a4c]",
}: {
  item: BlogNavItem;
  onClick?: () => void;
  className?: string;
}) {
  if (item.kind === "projects-menu") {
    return <SiteProjectsMenu className={className} />;
  }

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

export function BlogSiteHeader({ activeLabel = "BLOGS" }: { activeLabel?: ActiveNavLabel }) {
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
              isScrolled ? "w-[96px] md:w-[132px]" : "w-[112px] md:w-[160px]"
            }`}
          />
        </Link>

        <div className="hidden items-center md:flex">
          <nav
            className={`flex items-center rounded-full font-semibold text-[#996317] shadow-[0_18px_45px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 ${
              isScrolled
                ? "gap-5 border border-white/70 bg-white/84 px-5 py-2 text-[0.68rem] tracking-[0.14em] lg:text-[0.72rem]"
                : "gap-9 bg-white/96 px-7 py-3 text-[0.72rem] tracking-[0.13em] lg:text-[0.76rem]"
            }`}
          >
            {navItems.map((item) => (
              <BlogNavigationLink
                key={item.label}
                item={item}
                className={
                  item.label === activeLabel
                    ? "text-[#123a4c] transition hover:text-[#123a4c]"
                    : undefined
                }
              />
            ))}
            <a
              href="tel:+918065480222"
              className="hidden sm:inline-flex items-center gap-1.5 text-[#996317] transition hover:text-[#123a4c]"
            >
              <Phone className="h-[1.1rem] w-[1.1rem]" />
              <span className="font-semibold tracking-[0.05em]">+91 806 548 0222</span>
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))}
              className="rounded-full bg-[#b49a6c] px-5 py-2 text-white transition hover:bg-[#9f8658]"
            >
              ENQUIRE
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-popup"))}
            className="rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-[0.68rem] tracking-[0.16em] text-white backdrop-blur sm:px-4 sm:text-[0.74rem]"
          >
            ENQUIRE
          </button>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="blogs-mobile-nav"
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
          } ${isMobileMenuOpen ? "max-h-[36rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
        >
          <nav id="blogs-mobile-nav" className="flex flex-col gap-1 px-2 py-2">
            {navItems.map((item) =>
              item.kind === "projects-menu" ? (
                <MobileSiteProjectLinks
                  key={item.label}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              ) : (
                <BlogNavigationLink
                  key={item.label}
                  item={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-[0.95rem] px-4 py-3 text-[0.8rem] font-medium tracking-[0.16em] transition ${
                    isScrolled
                      ? "text-white hover:bg-white/10 hover:text-white"
                      : item.label === activeLabel
                        ? "bg-[#f6f1e8] text-[#123a4c]"
                        : "text-[#996317] hover:bg-[#f6f1e8] hover:text-[#123a4c]"
                  }`}
                />
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
