import { ChevronDown } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SiteNavMenuLink =
  | {
      label: string;
      to: string;
      href?: never;
    }
  | {
      label: string;
      href: string;
      to?: never;
    };

const projectRedirectLinks: readonly SiteNavMenuLink[] = [
  {
    label: "ALL PROJECTS",
    to: "/projects",
  },
  {
    label: "THE CLAN",
    to: "/projects/the-clan",
  },
  {
    label: "ORLEAN",
    to: "/projects/orlean",
  },
  {
    label: "CHANDAPURA, BANGALORE",
    to: "/chandapura-bangalore",
  },
  {
    label: "CHANDAPURA, HEELALIGE",
    to: "/chandapura-heelalige",
  },
  {
    label: "CHANDAPURA NH 44",
    to: "/chandapura-nh-44",
  },
  {
    label: "GUNJUR",
    to: "/gunjur",
  },
  {
    label: "MUTHANALLUR, OFF SARJAPURA",
    to: "/muthanallur-off-sarjapura-bangalore",
  },
];

const resourceRedirectLinks: readonly SiteNavMenuLink[] = [
  {
    label: "BLOGS",
    to: "/blogs",
  },
  {
    label: "CAREERS",
    to: "/careers",
  },
  {
    label: "CHANNEL PARTNER",
    to: "/channel-partner",
  },
];

function SiteNavMenu({
  label,
  links,
  className = "transition hover:text-[#123a4c]",
  isActive = false,
}: {
  label: string;
  links: readonly SiteNavMenuLink[];
  className?: string;
  isActive?: boolean;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-1 outline-none ${className}`}
          aria-label={`${label} menu`}
          aria-current={isActive ? "page" : undefined}
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
        {links.map((item) => {
          const key = item.href ?? item.to;
          const isItemActive =
            Boolean(item.to) &&
            (pathname === item.to || (item.to === "/blogs" && pathname.startsWith("/blogs/")));

          return (
            <DropdownMenuItem
              key={key}
              className={`cursor-pointer rounded-[0.85rem] px-3 py-3 focus:bg-[#f6efe3] focus:text-[#173748] ${
                isItemActive ? "bg-[#f6efe3]" : ""
              }`}
              onSelect={() => {
                if (item.href) {
                  window.open(item.href, "_blank", "noopener,noreferrer");
                  return;
                }
                void navigate({ to: item.to });
              }}
            >
              <span
                className={`block w-full whitespace-normal text-[0.78rem] uppercase tracking-[0.14em] ${
                  isItemActive ? "font-bold text-[#123a4c]" : "font-medium text-[#173748]"
                }`}
              >
                {item.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MobileSiteNavLinks({
  title,
  links,
  onNavigate,
  isSectionActive = false,
  itemClassName = "block rounded-[0.95rem] px-4 py-2.5 text-[0.76rem] font-medium tracking-[0.16em] text-[#7a5418] transition hover:bg-[#f6f1e8] hover:text-[#123a4c]",
}: {
  title: string;
  links: readonly SiteNavMenuLink[];
  onNavigate?: () => void;
  isSectionActive?: boolean;
  itemClassName?: string;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="border-y border-[#f0e7d8] py-1">
      <p
        className={`px-4 pb-1.5 pt-2.5 text-[0.8rem] font-medium uppercase tracking-[0.16em] ${
          isSectionActive ? "text-[#123a4c]" : "text-[#7a5418]"
        }`}
      >
        {title}
      </p>

      <div className="mb-1 ml-5 flex flex-col gap-0.5 border-l border-[#eadfcc] pl-1.5">
        {links.map((item) => {
          const key = item.href ?? item.to;

          if (item.href) {
            return (
              <a
                key={key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className={itemClassName}
              >
                <span className="block">{item.label}</span>
              </a>
            );
          }

          const isItemActive =
            pathname === item.to || (item.to === "/blogs" && pathname.startsWith("/blogs/"));

          return (
            <Link
              key={key}
              to={item.to}
              onClick={onNavigate}
              className={
                isItemActive
                  ? "block rounded-[0.95rem] bg-[#f6f1e8] px-4 py-2.5 text-[0.76rem] font-bold tracking-[0.16em] text-[#123a4c]"
                  : itemClassName
              }
              aria-current={isItemActive ? "page" : undefined}
            >
              <span className="block">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function SiteProjectsMenu({ className }: { className?: string }) {
  return <SiteNavMenu label="PROJECTS" links={projectRedirectLinks} className={className} />;
}

export function SiteResourceMenu({
  className,
  isActive = false,
}: {
  className?: string;
  isActive?: boolean;
}) {
  return (
    <SiteNavMenu
      label="RESOURCES"
      links={resourceRedirectLinks}
      className={className}
      isActive={isActive}
    />
  );
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
  isActive = false,
}: {
  onNavigate?: () => void;
  itemClassName?: string;
  isActive?: boolean;
}) {
  return (
    <MobileSiteNavLinks
      title="Resources"
      links={resourceRedirectLinks}
      onNavigate={onNavigate}
      isSectionActive={isActive}
      itemClassName={itemClassName}
    />
  );
}
