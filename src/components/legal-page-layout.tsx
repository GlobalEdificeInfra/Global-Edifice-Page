import { Link } from "@tanstack/react-router";
import { BlogSiteHeader, pageContainerClass } from "@/components/blog-site-chrome";
import { SiteFooter } from "@/components/site-footer";

export function LegalPageLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#1f1d1a]">
      <BlogSiteHeader />

      <section className="bg-[#0f4157]">
        <div className={`${pageContainerClass} flex justify-center pb-0 pt-28 md:pt-36`}>
          <div className="translate-y-8 rounded bg-white px-6 py-4 shadow-sm md:translate-y-10 md:px-8 md:py-5">
            <h1 className="text-[1.4rem] font-semibold tracking-wide text-[#111111] md:text-[1.8rem]">
              {title}
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-16 md:pb-24 md:pt-20">
        <div className={`${pageContainerClass}`}>
          <article className="mx-auto max-w-5xl">
            <h2 className="text-[1rem] font-semibold tracking-wide text-[#0f4157] md:text-[1.1rem]">
              WELCOME TO GLOBAL EDIFICE - PLEASE READ THESE {title.toUpperCase()} CAREFULLY BEFORE
              USING THIS SITE.
            </h2>

            <div className="mt-8">
              <h3 className="text-[1rem] font-semibold text-[#111111] md:text-[1.05rem]">
                About Us
              </h3>
              <p className="mt-2 text-base font-normal leading-[1.8] text-[#111111]">
                <Link to="/" className="text-[#1056c0] hover:underline">
                  www.globaledifice.com
                </Link>{" "}
                is a site operated by Global Edifice and its group companies (that is, its
                affiliates, subsidiaries, ultimate holding company and its subsidiaries) ("we",
                "our", "us", or "Global Edifice").
              </p>
            </div>

            <div className="mt-6 space-y-6">{children}</div>
          </article>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
