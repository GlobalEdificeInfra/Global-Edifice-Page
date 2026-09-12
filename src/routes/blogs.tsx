import { Link, Outlet, createFileRoute, useMatchRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogSiteHeader, pageContainerClass, pageGutterClass } from "@/components/blog-site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { blogPosts } from "@/lib/blog-data";
import blogsHeroBanner from "@/assets/blogs/blogs-hero-banner.jpg";

const BLOGS_TITLE = "Blogs - Global Edifice";
const BLOGS_DESCRIPTION =
  "Explore Global Edifice blogs on Bangalore real estate, project locations, buying guidance, and market insights.";
const ITEMS_PER_PAGE = 6;

export const Route = createFileRoute("/blogs")({
  validateSearch: (search: Record<string, unknown>) => {
    const page = Number(search.page ?? 1);

    return {
      page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1,
    };
  },
  component: BlogsPage,
  head: () => ({
    meta: [{ title: BLOGS_TITLE }, { name: "description", content: BLOGS_DESCRIPTION }],
  }),
});

function getPageNumbers(currentPage: number, totalPages: number) {
  const maxPageNumbers = 4;
  const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2);
  let startPage = Math.max(1, currentPage - halfMaxPageNumbers);
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}

function BlogsHero() {
  return (
    <section className="relative isolate min-h-[30rem] overflow-hidden bg-[#0f4157] text-white md:min-h-[34rem]">
      <img
        src={blogsHeroBanner}
        alt="Global Edifice blog hero"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,65,87,0.22)_0%,rgba(15,65,87,0.68)_100%)]" />
      <div
        className={`relative mx-auto flex min-h-[30rem] max-w-7xl flex-col items-center justify-center text-center ${pageGutterClass} pb-12 pt-28 md:min-h-[34rem] md:pb-16`}
      >
        <h1 className="font-display text-[2.75rem] leading-[0.9] tracking-[-0.04em] text-white sm:text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem]">
          Blogs
        </h1>
      </div>
    </section>
  );
}

function BlogCardGrid({ page }: { page: number }) {
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const currentPosts = blogPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <section className="bg-[#f7f4ef] pb-20 pt-12 md:pb-24 md:pt-16">
      <div className={pageContainerClass}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          {currentPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col overflow-hidden rounded-[1rem] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
            >
              <div className="relative overflow-hidden rounded-t-[1rem]">
                <img
                  src={post.cardImage}
                  alt={post.imageAlt}
                  className="aspect-[4/3] h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3.5 top-3.5 rounded-[0.3rem] bg-black/50 px-2.5 py-1 text-[0.7rem] font-medium tracking-[0.02em] text-white">
                  Blog
                </span>
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5 pt-5 md:px-6 md:pb-6 md:pt-5">
                <h3 className="line-clamp-2 min-h-[3.1rem] text-[1.05rem] font-medium leading-[1.4] text-[#111111] md:text-[1.1rem]">
                  {post.title}
                </h3>
                <p className="mt-2 text-[0.85rem] text-[#9ca3af]">{post.publishedAt}</p>
                <p className="mt-3 line-clamp-4 flex-1 text-base font-normal leading-[1.65] text-[#7a756e]">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-[#111111]">
                  <span>Read Blog</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d1d5db] text-[#111111] transition group-hover:border-[#0f4157] group-hover:text-[#0f4157]">
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2.5">
            {currentPage > 1 ? (
              <Link
                to="/blogs"
                search={{ page: currentPage - 1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111111] transition hover:border-[#0f4157] hover:bg-[#0f4157] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#c4c4c4]">
                <ArrowLeft className="h-4 w-4" />
              </span>
            )}

            {pageNumbers.map((pageNumber) => (
              <Link
                key={pageNumber}
                to="/blogs"
                search={{ page: pageNumber }}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-[0.95rem] font-medium transition ${
                  pageNumber === currentPage
                    ? "bg-[#0f4157] text-white"
                    : "text-[#6b7280] hover:bg-[#0f4157] hover:text-white"
                }`}
              >
                {pageNumber}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                to="/blogs"
                search={{ page: currentPage + 1 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111111] transition hover:border-[#0f4157] hover:bg-[#0f4157] hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#c4c4c4]">
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogsPage() {
  const matchRoute = useMatchRoute();
  const isExactBlogs = matchRoute({ to: "/blogs" });
  const { page } = Route.useSearch();

  if (!isExactBlogs) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-[#1f1d1a]">
      <BlogSiteHeader />
      <BlogsHero />
      <BlogCardGrid page={page} />
      <SiteFooter />
    </div>
  );
}
