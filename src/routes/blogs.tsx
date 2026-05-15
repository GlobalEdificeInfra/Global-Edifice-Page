import { Link, Outlet, createFileRoute, useMatchRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogSiteHeader, pageContainerClass, pageGutterClass } from "@/components/blog-site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { blogPosts, featuredBlogSlug, getBlogPostBySlug } from "@/lib/blog-data";
import blogsHeroBanner from "@/assets/mission-in-real-etate-img.jpg";

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

function truncateText(value: string, limit: number) {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit).trimEnd()}...`;
}

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
        className="absolute inset-0 h-full w-full object-cover object-left opacity-90"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,65,87,0.22)_0%,rgba(15,65,87,0.68)_100%)]" />
      <div
        className={`relative mx-auto flex min-h-[30rem] max-w-7xl flex-col items-center justify-center text-center ${pageGutterClass} pb-12 pt-28 md:min-h-[34rem] md:pb-16`}
      >
        <h1 className="font-display text-[3.5rem] leading-[0.9] tracking-[-0.04em] text-white md:text-[5.5rem] lg:text-[6.5rem]">
          Blogs
        </h1>
      </div>
    </section>
  );
}

function FeaturedBlogCard() {
  const featuredPost = getBlogPostBySlug(featuredBlogSlug);

  if (!featuredPost) return null;

  return (
    <section className="bg-[#f8f4ed] pt-12 md:pt-16">
      <div className={`${pageContainerClass} max-w-[85%]`}>
        <div className="pb-8 md:pb-10">
          <h2 className="text-[1.9rem] font-semibold tracking-[-0.02em] text-[#111111] md:text-[2.5rem]">
            Popular Post
          </h2>
        </div>

        <Link
          to="/blogs/$slug"
          params={{ slug: featuredPost.slug }}
          className="group grid items-center gap-5 rounded-[2rem] border border-[#e7e7e7] bg-white p-4 transition hover:border-[#d5c1a0] md:grid-cols-2 md:gap-6 md:rounded-[3rem] md:p-4"
        >
          <div className="overflow-hidden rounded-[1.6rem] md:rounded-[2.5rem]">
            <img
              src={featuredPost.heroImage}
              alt={featuredPost.imageAlt}
              className="h-full min-h-[18rem] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="px-2 py-2 md:px-4">
            <h3 className="text-[1.35rem] font-semibold leading-[1.55] text-[#292f36] transition group-hover:text-[#0f4157] md:text-[1.65rem]">
              {truncateText(featuredPost.title, 100)}
            </h3>
            <p className="mt-4 text-[0.98rem] leading-[1.85] text-[#111111]">
              {truncateText(featuredPost.excerpt, 500)}
            </p>
            <div className="mt-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0f4157] text-white transition group-hover:bg-[#0c3446]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
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
    <section className="bg-[#f8f4ed] pb-20 pt-10 md:pb-24 md:pt-12">
      <div className={`${pageContainerClass} max-w-[85%]`}>
        <div className="pb-8 md:pb-10">
          <h2 className="text-[1.9rem] font-semibold tracking-[-0.02em] text-[#111111] md:text-[2.5rem]">
            Articles & News
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {currentPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="group block rounded-[2rem] border border-[#e7e7e7] bg-white p-4 transition hover:bg-[#0f4157] hover:text-white md:rounded-[2.5rem] md:p-[17px]"
            >
              <div className="relative overflow-hidden rounded-[1.6rem] md:rounded-[2rem]">
                <img
                  src={post.cardImage}
                  alt={post.imageAlt}
                  className="h-[15.5rem] w-full object-cover"
                />
                <div className="absolute bottom-3 left-4 rounded-[0.9rem_0.9rem_0.9rem_0] bg-white px-3 py-2 text-[0.78rem] font-medium text-black">
                  {post.category}
                </div>
              </div>

              <h3 className="min-h-[4.5rem] pt-4 text-[1.15rem] font-semibold leading-[1.5] text-[#292f36] transition group-hover:text-white md:text-[1.28rem]">
                {truncateText(post.title, 50)}
              </h3>

              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-[0.92rem] text-black transition group-hover:text-white">
                  {post.publishedAt}
                </p>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f4157] text-white transition group-hover:bg-white group-hover:text-[#0f4157]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2">
            {currentPage > 1 ? (
              <Link
                to="/blogs"
                search={{ page: currentPage - 1 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f1f1] text-[#111111] transition hover:bg-[#0f4157] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f1f1] text-[#b8b8b8]">
                <ArrowLeft className="h-4 w-4" />
              </span>
            )}

            {pageNumbers.map((pageNumber) => (
              <Link
                key={pageNumber}
                to="/blogs"
                search={{ page: pageNumber }}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-[1rem] font-medium transition ${
                  pageNumber === currentPage
                    ? "bg-[#0f4157] text-white"
                    : "bg-[#f1f1f1] text-[#111111] hover:bg-[#0f4157] hover:text-white"
                }`}
              >
                {pageNumber}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                to="/blogs"
                search={{ page: currentPage + 1 }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f1f1] text-[#111111] transition hover:bg-[#0f4157] hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f1f1] text-[#b8b8b8]">
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

  if (!isExactBlogs) {
    return <Outlet />;
  }

  const { page } = Route.useSearch();

  return (
    <div className="min-h-screen bg-[#f8f4ed] text-[#1f1d1a]">
      <BlogSiteHeader />
      <BlogsHero />
      <FeaturedBlogCard />
      <BlogCardGrid page={page} />
      <SiteFooter />
    </div>
  );
}
