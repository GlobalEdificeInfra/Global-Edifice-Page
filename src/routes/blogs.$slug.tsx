import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogSiteHeader, pageContainerClass } from "@/components/blog-site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data";

export const Route = createFileRoute("/blogs/$slug")({
  component: BlogDetailPage,
  head: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);

    return {
      meta: [
        { title: post?.metaTitle ?? "Blog - Global Edifice" },
        {
          name: "description",
          content:
            post?.metaDescription ??
            "Read Global Edifice blog articles on Bangalore real estate and home-buying guidance.",
        },
      ],
    };
  },
});

function BlogNotFound() {
  return (
    <main className="bg-[#f8f4ed] pb-20 pt-36 text-[#1f1d1a] md:pt-40">
      <div className={`${pageContainerClass} max-w-3xl text-center`}>
        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-[#0f4157]">
          Blog Article
        </p>
        <h1 className="mt-5 font-display text-[2.8rem] leading-[0.96] text-[#1f1d1a]">
          Article not found
        </h1>
        <p className="mx-auto mt-5 max-w-[30rem] text-[1rem] leading-[1.9] text-[#696056]">
          The requested blog article does not exist in the current content set.
        </p>
        <div className="mt-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full bg-[#0f4157] px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0c3446]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Blogs
          </Link>
        </div>
      </div>
    </main>
  );
}

function truncateText(value: string, limit: number) {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit).trimEnd()}...`;
}

function RecentBlogCard({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return null;
  }

  return (
    <article className="group">
      <Link to="/blogs/$slug" params={{ slug: post.slug }} className="block overflow-hidden rounded-[1.35rem]">
        <div className="relative">
          <img src={post.cardImage} alt={post.imageAlt} className="h-[13rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
          <div className="absolute left-4 top-4 rounded-full bg-[rgba(255,255,255,0.92)] px-3 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.06em] text-[#0f4157] shadow-sm">
            {post.category}
          </div>
        </div>
      </Link>

      <div className="pt-4">
        <h2 className="max-w-[18rem] text-[1.1rem] font-medium leading-[1.35] text-[#666666] md:text-[1.18rem]">
          {truncateText(post.title, 54)}
        </h2>
        <p className="mt-3 text-[0.94rem] text-[#777777]">{post.publishedAt}</p>
        <p className="mt-3 max-w-[19rem] text-[0.97rem] leading-[1.8] text-[#8a8a8a]">
          {truncateText(post.excerpt, 185)}
        </p>

        <Link
          to="/blogs/$slug"
          params={{ slug: post.slug }}
          className="mt-7 inline-flex items-center gap-3 text-[0.92rem] font-semibold uppercase tracking-[0.04em] text-[#7d7d7d] transition hover:text-[#0f4157]"
        >
          Read Blog
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#8d8d8d] text-[#8d8d8d] transition group-hover:border-[#0f4157] group-hover:text-[#0f4157]">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </article>
  );
}

function AdjacentPostLink({
  label,
  slug,
  title,
  direction,
}: {
  label: string;
  slug: string;
  title: string;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";

  return (
    <Link
      to="/blogs/$slug"
      params={{ slug }}
      className={`group flex items-center gap-4 text-[#7b7b7b] transition hover:text-[#0f4157] ${isPrevious ? "justify-start" : "justify-end text-right"}`}
    >
      {isPrevious ? <ArrowLeft className="h-5 w-5 shrink-0 text-[#b7b1a9] transition group-hover:text-[#0f4157]" /> : null}

      <div>
        <p className="text-[0.8rem] font-semibold uppercase tracking-[0.05em] text-[#b1aaa0]">{label}</p>
        <p className="max-w-[22rem] text-[1.05rem] font-medium leading-[1.35] text-[#666666] transition group-hover:text-[#0f4157]">
          {title}
        </p>
      </div>

      {!isPrevious ? <ArrowRight className="h-5 w-5 shrink-0 text-[#b7b1a9] transition group-hover:text-[#0f4157]" /> : null}
    </Link>
  );
}

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f8f4ed] text-[#1f1d1a]">
        <BlogSiteHeader />
        <BlogNotFound />
        <SiteFooter />
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((blogPost) => blogPost.slug === post.slug);
  const previousPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const recentPosts = blogPosts.filter((blogPost) => blogPost.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f4ed] text-[#1f1d1a]">
      <BlogSiteHeader />

      <main className="bg-[#f8f4ed] pb-20">
        <section className="relative isolate overflow-hidden bg-[#0f4157] text-white">
          <img
            src={post.heroImage}
            alt={post.imageAlt}
            className="h-[20rem] w-full object-cover object-top sm:h-[26rem] md:h-[40rem] lg:h-[48rem]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,65,87,0.22)_0%,rgba(15,65,87,0.46)_48%,rgba(15,65,87,0.72)_100%)]" />

          <div className={`absolute inset-x-0 bottom-0 ${pageContainerClass} max-w-[88%] pb-10 md:pb-16`}>
            <div className="max-w-[56rem]">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/88 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back To Blogs
              </Link>

              <h1 className="mt-5 max-w-[52rem] text-[2rem] font-semibold leading-[1.15] text-white md:text-[3.15rem] lg:text-[4.2rem]">
                {post.title}
              </h1>
              <p className="mt-4 text-[0.98rem] text-white/80 md:text-[1.02rem]">
                Written by {post.author}
              </p>
            </div>
          </div>
        </section>

        <div className={`${pageContainerClass} max-w-[88%]`}>
          <article className="mx-auto max-w-[62rem] py-10 md:py-14">
            <div className="h-px w-full bg-[#e6dac8]" />

            <div
              className="mt-8 text-[#5d554a] [&_a]:text-[#0f4157] [&_a]:underline-offset-4 [&_a:hover]:underline [&_h1]:mt-8 [&_h1]:text-[2rem] [&_h1]:font-semibold [&_h1]:text-[#2f2b28] [&_h2]:mt-8 [&_h2]:text-[1.9rem] [&_h2]:font-semibold [&_h2]:text-[#2f2b28] [&_h3]:mt-7 [&_h3]:text-[1.6rem] [&_h3]:font-semibold [&_h3]:text-[#2f2b28] [&_h4]:mt-7 [&_h4]:text-[1.35rem] [&_h4]:font-semibold [&_h4]:text-[#2f2b28] [&_h5]:mt-7 [&_h5]:text-[1.2rem] [&_h5]:font-semibold [&_h5]:text-[#2f2b28] [&_h6]:mt-6 [&_h6]:text-[1.08rem] [&_h6]:font-semibold [&_h6]:text-[#2f2b28] [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_li]:leading-[1.95] [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:pt-2 [&_p]:mt-5 [&_p]:text-[1.03rem] [&_p]:leading-[1.95] [&_strong]:font-semibold [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:pt-2 md:[&_h1]:text-[2.3rem] md:[&_h2]:text-[2.15rem] md:[&_p]:text-[1.08rem]"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
          </article>

          <section className="mx-auto max-w-[72rem] border-t border-[#e6dac8] py-14 md:py-18">
            <h2 className="font-display text-[2.4rem] leading-none text-[#0f4157] md:text-[3.2rem]">Recent Blogs</h2>

            <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-3 md:gap-8">
              {recentPosts.map((recentPost) => (
                <RecentBlogCard key={recentPost.slug} slug={recentPost.slug} />
              ))}
            </div>

            {(previousPost || nextPost) ? (
              <div className="mt-16 grid gap-8 border-t border-[#ede2d3] pt-8 md:mt-18 md:grid-cols-2 md:items-start">
                <div>
                  {previousPost ? (
                    <AdjacentPostLink
                      label="Previous Post"
                      slug={previousPost.slug}
                      title={previousPost.title}
                      direction="previous"
                    />
                  ) : null}
                </div>

                <div>
                  {nextPost ? (
                    <AdjacentPostLink
                      label="Next Post"
                      slug={nextPost.slug}
                      title={nextPost.title}
                      direction="next"
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
