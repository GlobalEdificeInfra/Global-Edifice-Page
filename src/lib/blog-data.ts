import rawBlogPosts from "@/lib/blog-data.json";

type RawBlogPost = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  mainimage: string;
  date: string;
  category: string;
  slug: string;
  description?: string;
  htmlContent: string;
};

export type BlogPost = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  cardTitle: string;
  category: string;
  publishedAt: string;
  author: string;
  excerpt: string;
  heroTitle: string;
  heroImage: string;
  cardImage: string;
  imageAlt: string;
  seoDescription: string;
  slug: string;
  htmlContent: string;
};

const htmlEntityMap: Record<string, string> = {
  "&amp;": "&",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&ldquo;": '"',
  "&rdquo;": '"',
  "&lsquo;": "'",
  "&rsquo;": "'",
  "&mdash;": "-",
  "&ndash;": "-",
  "&nbsp;": " ",
};

function decodeHtmlEntities(value: string) {
  return value.replace(/&[a-z0-9#]+;/gi, (match) => htmlEntityMap[match] ?? match);
}

function stripHtml(html: string) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function toExcerpt(post: RawBlogPost) {
  const source = post.description?.trim() || stripHtml(post.htmlContent);

  if (source.length <= 220) {
    return source;
  }

  return `${source.slice(0, 217).trimEnd()}...`;
}

export const blogPosts: BlogPost[] = (rawBlogPosts as RawBlogPost[]).map((post) => ({
  metaTitle: post.metaTitle,
  metaDescription: post.metaDescription,
  title: post.title,
  cardTitle: post.title,
  category: post.category,
  publishedAt: post.date,
  author: "Global Edifice",
  excerpt: toExcerpt(post),
  heroTitle: post.title,
  heroImage: post.mainimage,
  cardImage: post.mainimage,
  imageAlt: post.title,
  seoDescription: post.metaDescription,
  slug: post.slug,
  htmlContent: post.htmlContent,
}));

export const featuredBlogSlug = blogPosts[0]?.slug ?? "";

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
