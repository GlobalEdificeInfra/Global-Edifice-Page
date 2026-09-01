import { Link } from "@tanstack/react-router";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const footerLinks = [
  {
    title: "Navigation",
    items: [
      { label: "Home", kind: "route", to: "/" as const },
      { label: "About Us", kind: "route", to: "/about" as const },
      { label: "Projects", kind: "route", to: "/projects" as const },
      { label: "Resources", kind: "route", to: "/blogs" as const },
      { label: "Careers", kind: "route", to: "/careers" as const },
      { label: "Channel Partner", kind: "route", to: "/channel-partner" as const },
    ],
  },
  {
    title: "Projects",
    items: [
      { label: "Global Heights", kind: "anchor", href: "/projects" },
      { label: "Edifice Villas", kind: "anchor", href: "/projects" },
      { label: "Global Residency", kind: "anchor", href: "/projects" },
      { label: "Completed Portfolio", kind: "anchor", href: "/projects#completed" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "941 161 4444", kind: "anchor", href: "tel:+919411614444" },
      { label: "sales@globaledifice.com", kind: "anchor", href: "mailto:sales@globaledifice.com" },
      { label: "HSR Layout 1st sector, Bangalore" },
      { label: "Schedule a Visit", kind: "anchor", href: "/#contact" },
    ],
  },
] as const;

function FooterLinkItem({ item }: { item: (typeof footerLinks)[number]["items"][number] }) {
  if ("to" in item) {
    return (
      <Link to={item.to} className="break-words transition hover:text-white">
        {item.label}
      </Link>
    );
  }

  if ("href" in item) {
    const isEmail = item.href.startsWith("mailto:");
    return (
      <a
        href={item.href}
        className={`transition hover:text-white ${isEmail ? "break-all" : "break-words"}`}
      >
        {item.label}
      </a>
    );
  }

  return <span className="break-words">{item.label}</span>;
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#0f4157] text-white">
      <div className={`${pageContainerClass} py-14 md:py-16`}>
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.75fr_0.85fr_1fr] md:gap-8 lg:gap-10">
          <div className="max-w-[22rem]">
            <img src={geLogoGold} alt="Global Edifice" className="w-[140px] md:w-[160px]" />
            <p className="mt-6 text-[0.92rem] font-normal leading-[1.75] text-white/85 md:text-[0.95rem]">
              Leaders in luxury residential development. Shifting the paradigm of modern living with
              innovation and integrity.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#c4a36b]">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3.5 text-[0.92rem] font-normal text-white/85 md:text-[0.95rem]">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-[0.8rem] font-normal text-white/75 md:flex-row md:items-center md:justify-between md:text-[0.84rem]">
          <p>© 2026 Global Edifice. All rights reserved. RERA Approved Developer.</p>
          <div className="flex flex-wrap gap-6 md:gap-8">
            <Link to="/privacy-policy" className="transition hover:text-[#c4a36b]">
              Privacy Policy
            </Link>
            <Link to="/termsandconditions" className="transition hover:text-[#c4a36b]">
              Terms of Use
            </Link>
            <a href="#" className="transition hover:text-[#c4a36b]">
              RERA Disclosures
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
