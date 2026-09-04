import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";
import {
  companyAddress,
  companyEmail,
  companyPhone,
  companySocial,
  projectMicrosites,
} from "@/lib/company";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;

const footerLinks = [
  {
    title: "Navigation",
    items: [
      { label: "Home", kind: "route" as const, to: "/" as const },
      { label: "About Us", kind: "route" as const, to: "/about" as const },
      { label: "Projects", kind: "route" as const, to: "/projects" as const },
      { label: "Resources", kind: "route" as const, to: "/blogs" as const },
      { label: "Careers", kind: "route" as const, to: "/careers" as const },
      { label: "Channel Partner", kind: "route" as const, to: "/channel-partner" as const },
    ],
  },
  {
    title: "Projects",
    items: [
      { label: "The Clan", kind: "external" as const, href: projectMicrosites.theClan },
      { label: "Orlean", kind: "external" as const, href: projectMicrosites.orlean },
      { label: "Upcoming Projects", kind: "anchor" as const, href: "/projects#upcoming" },
      { label: "Completed Portfolio", kind: "anchor" as const, href: "/projects#completed" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: companyPhone.display, kind: "anchor" as const, href: companyPhone.tel },
      { label: companyEmail.display, kind: "anchor" as const, href: companyEmail.mailto },
      { label: companyAddress, kind: "text" as const },
      { label: "Schedule a Visit", kind: "anchor" as const, href: "/#contact" },
    ],
  },
];

type FooterItem = (typeof footerLinks)[number]["items"][number];

function FooterLinkItem({ item }: { item: FooterItem }) {
  if (item.kind === "route") {
    return (
      <Link to={item.to} className="break-words transition hover:text-white">
        {item.label}
      </Link>
    );
  }

  if (item.kind === "external") {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words transition hover:text-white"
      >
        {item.label}
      </a>
    );
  }

  if (item.kind === "anchor") {
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

const socialLinks = [
  { label: "Facebook", href: companySocial.facebook, Icon: Facebook },
  { label: "Instagram", href: companySocial.instagram, Icon: Instagram },
  { label: "LinkedIn", href: companySocial.linkedin, Icon: Linkedin },
  { label: "YouTube", href: companySocial.youtube, Icon: Youtube },
] as const;

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
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#c4a36b]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
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
