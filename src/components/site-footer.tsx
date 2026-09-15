import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";
import { companyAddress, companyEmail, companyPhone, companySocial } from "@/lib/company";

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 1227" className={className} fill="currentColor" aria-hidden>
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  );
}

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
      { label: "The Clan", kind: "route" as const, to: "/projects/the-clan" as const },
      { label: "Orlean", kind: "route" as const, to: "/projects/orlean" as const },
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
  { label: "X", href: companySocial.x, Icon: XIcon },
  { label: "LinkedIn", href: companySocial.linkedin, Icon: Linkedin },
  { label: "YouTube", href: companySocial.youtube, Icon: Youtube },
] as const;

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#0f4157] text-white">
      <div className={`${pageContainerClass} py-14 md:py-16`}>
        <div className="grid gap-10 md:grid-cols-[1.35fr_0.75fr_0.85fr_1fr] md:gap-8 lg:gap-10">
          <div className="max-w-[22rem]">
            <img src={geLogoGold} alt="Global Edifice" className="-mt-5 w-[190px] md:w-[230px]" />
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
          </div>
        </div>
      </div>
    </footer>
  );
}
