import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projectRedirectLinks = [
  {
    label: "ALL PROJECTS",
    to: "/projects" as const,
  },
  {
    label: "THE CLAN",
    to: "/projects/the-clan" as const,
  },
  {
    label: "ORLEAN",
    to: "/projects/orlean" as const,
  },
  {
    label: "CHANDAPURA, BANGALORE",
    to: "/chandapura-bangalore" as const,
  },
  {
    label: "MUTHANALLUR, OFF SARJAPURA",
    to: "/muthanallur-off-sarjapura-bangalore" as const,
  },
] as const;

const resourceRedirectLinks = [
  {
    label: "BLOGS",
    to: "/blogs" as const,
  },
] as const;

type SiteNavMenuLink = {
  label: string;
  to: string;
};

function SiteNavMenu({
  label,
  links,
  className = "transition hover:text-[#123a4c]",
}: {
  label: string;
  links: readonly SiteNavMenuLink[];
  className?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-1 outline-none ${className}`}
          aria-label={`${label} menu`}
        >
          <span>{label}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={12}
        className="w-[18rem] rounded-[1rem] border-[#eadfcd] bg-[#fffdfa] p-2 text-[#173748] shadow-[0_22px_48px_-38px_rgba(40,29,14,0.4)]"
      >
        {links.map((item) => (
          <DropdownMenuItem
            key={item.to}
            className="rounded-[0.85rem] px-3 py-3 focus:bg-[#f6efe3] focus:text-[#173748] cursor-pointer"
          >
            <Link
              to={item.to}
              className="block w-full whitespace-normal text-[0.78rem] font-medium uppercase tracking-[0.14em] text-[#173748]"
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileSiteNavLinks({
  title,
  links,
  onNavigate,
  itemClassName = "block rounded-[0.95rem] px-4 py-3 text-[0.8rem] font-semibold tracking-[0.16em] text-[#996317] transition hover:bg-[#f6f1e8] hover:text-[#123a4c]",
}: {
  title: string;
  links: readonly SiteNavMenuLink[];
  onNavigate?: () => void;
  itemClassName?: string;
}) {
  return (
    <div>
      <p className="px-4 pb-1 pt-3 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#996317]/90">
        {title}
      </p>

      <div className="flex flex-col gap-1">
        {links.map((item) => (
          <Link key={item.to} to={item.to} onClick={onNavigate} className={itemClassName}>
            <span className="block">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteProjectsMenu({ className }: { className?: string }) {
  return <SiteNavMenu label="PROJECTS" links={projectRedirectLinks} className={className} />;
}

export function SiteResourceMenu({ className }: { className?: string }) {
  return <SiteNavMenu label="RESOURCES" links={resourceRedirectLinks} className={className} />;
}

export function MobileSiteProjectLinks({
  onNavigate,
  itemClassName,
}: {
  onNavigate?: () => void;
  itemClassName?: string;
}) {
  return (
    <MobileSiteNavLinks
      title="Projects"
      links={projectRedirectLinks}
      onNavigate={onNavigate}
      itemClassName={itemClassName}
    />
  );
}

export function MobileSiteResourceLinks({
  onNavigate,
  itemClassName,
}: {
  onNavigate?: () => void;
  itemClassName?: string;
}) {
  return (
    <MobileSiteNavLinks
      title="Resources"
      links={resourceRedirectLinks}
      onNavigate={onNavigate}
      itemClassName={itemClassName}
    />
  );
}
