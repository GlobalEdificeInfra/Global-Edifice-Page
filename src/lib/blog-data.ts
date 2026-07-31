import rawBlogPosts from "@/lib/blog-data.json";
import blogCard1 from "@/assets/blogs/cards/blog-card-1.jpg";
import blogCard2 from "@/assets/blogs/cards/blog-card-2.jpg";
import blogCard3 from "@/assets/blogs/cards/blog-card-3.jpg";
import blogCard4 from "@/assets/blogs/cards/blog-card-4.jpg";
import blogCard5 from "@/assets/blogs/cards/blog-card-5.jpg";
import blogCard6 from "@/assets/blogs/cards/blog-card-6.jpg";

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

const blogCardImages = [
  blogCard1,
  blogCard2,
  blogCard3,
  blogCard4,
  blogCard5,
  blogCard6,
] as const;

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

  if (source.length <= 180) {
    return source;
  }

  return `${source.slice(0, 177).trimEnd()}...`;
}

function formatBlogDate(value: string) {
  const match = value.trim().match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);

  if (!match) {
    return value;
  }

  const [, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export const blogPosts: BlogPost[] = (rawBlogPosts as RawBlogPost[]).map((post, index) => {
  const cardImage = blogCardImages[index % blogCardImages.length];

  return {
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    title: post.title,
    cardTitle: post.title,
    category: post.category,
    publishedAt: formatBlogDate(post.date),
    author: "Global Edifice",
    excerpt: toExcerpt(post),
    heroTitle: post.title,
    heroImage: cardImage,
    cardImage,
    imageAlt: post.title,
    seoDescription: post.metaDescription,
    slug: post.slug,
    htmlContent: post.htmlContent,
  };
});

export const featuredBlogSlug = blogPosts[0]?.slug ?? "";

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
