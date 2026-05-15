import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;
const tealContourBackgroundStyle = {
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.01)), repeating-radial-gradient(ellipse 135% 120% at -12% 50%, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 28px)",
};

const footerLinks = [
  {
    title: "Navigation",
    items: [
      { label: "Home", kind: "route", to: "/" as const },
      { label: "About Us", kind: "route", to: "/about" as const },
      { label: "Projects", kind: "route", to: "/projects" as const },
      { label: "Blogs", kind: "route", to: "/blogs" as const },
    ],
  },
  {
    title: "Projects",
    items: [
      { label: "Global Heights" },
      { label: "Edifice Villas" },
      { label: "Global Residency" },
      { label: "Completed Portfolio" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "+91 80 2678 1234", kind: "anchor", href: "tel:+918026781234" },
      { label: "hello@globaledifice.com", kind: "anchor", href: "mailto:hello@globaledifice.com" },
      { label: "Chandapura, Bangalore" },
      { label: "Schedule a Visit", kind: "anchor", href: "/#contact" },
    ],
  },
] as const;

function FooterLinkItem({ item }: { item: (typeof footerLinks)[number]["items"][number] }) {
  if ("to" in item) {
    return (
      <Link to={item.to} className="transition hover:text-white">
        {item.label}
      </Link>
    );
  }

  if ("href" in item) {
    return (
      <a href={item.href} className="transition hover:text-white">
        {item.label}
      </a>
    );
  }

  return <span>{item.label}</span>;
}

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#0f4157] text-white" style={tealContourBackgroundStyle}>
      <div className={`${pageContainerClass} py-16 md:py-20`}>
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
          <div className="max-w-[23rem]">
            <img src={geLogoGold} alt="Global Edifice" className="w-[150px] md:w-[175px]" />
            <p className="mt-8 text-[1rem] leading-[1.9] text-white/78">
              Leaders in luxury residential development. Shifting the paradigm of modern living with
              innovation and integrity.
            </p>
            <div className="mt-8 flex items-center gap-4 text-white/78">
              <a
                href="https://www.facebook.com/Globaledifce/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/globaledifice"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <Twitter className="h-5 w-5 fill-current" />
              </a>
              <a
                href="https://www.youtube.com/@Globaledifice/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/globaledifice/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/global-edifice-top-construction-company-in-bangalore/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <Linkedin className="h-5 w-5 fill-current" />
              </a>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#c4a36b]">
                {column.title}
              </h3>
              <ul className="mt-7 space-y-4 text-[1rem] text-white/84">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <FooterLinkItem item={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/14 pt-7 text-[0.92rem] text-white/72 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Global Edifice. All rights reserved. RERA Approved Developer.</p>
          <div className="flex flex-wrap gap-7">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/termsandconditions">Terms of Use</Link>
            <a href="#">RERA Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
