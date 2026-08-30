import { Link } from "@tanstack/react-router";
import { SiteHeader, pageContainerClass, pageGutterClass } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function ResourcePageHero({
  image,
  imageAlt,
  title,
  subtitle,
}: {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate min-h-[28rem] overflow-hidden bg-[#0f4157] text-white md:min-h-[34rem]">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,65,87,0.28)_0%,rgba(15,65,87,0.72)_100%)]" />
      <div
        className={`relative mx-auto flex min-h-[28rem] max-w-7xl flex-col items-center justify-center text-center ${pageGutterClass} pb-12 pt-28 md:min-h-[34rem] md:pb-16`}
      >
        <h1 className="px-1 font-display text-[2.25rem] leading-[0.95] tracking-[-0.03em] text-white sm:text-[3rem] md:text-[4.5rem] lg:text-[5.5rem]">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-[36rem] text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white/88 md:text-[0.86rem]">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function CareerChannelTabs({ active }: { active: "career" | "channel-partner" }) {
  const tabClass = (isActive: boolean) =>
    `rounded-full px-7 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition ${
      isActive
        ? "bg-[#b49a6c] text-white"
        : "border border-[#d8c7a8] bg-white text-[#6f6558] hover:border-[#b49a6c] hover:text-[#123a4c]"
    }`;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Link to="/careers" className={tabClass(active === "career")}>
        Career
      </Link>
      <Link to="/channel-partner" className={tabClass(active === "channel-partner")}>
        Channel Partner
      </Link>
    </div>
  );
}

export function ResourcePageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="bg-[#f7f4ef] text-[#163849]">
        <SiteHeader />
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export { pageContainerClass, pageGutterClass };
