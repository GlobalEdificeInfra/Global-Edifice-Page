/**
 * Static prerender: renders every public route to HTML so crawlers (Google, Bing and
 * AI crawlers such as GPTBot, ClaudeBot, PerplexityBot) see real content without
 * running JavaScript. Also writes robots.txt, sitemap.xml and llms.txt.
 *
 * Runs after `vite build` and `vite build --ssr`; see the "build" script in package.json.
 */
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://www.globaledifice.com";
const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const blogs = JSON.parse(await readFile("src/lib/blog-data.json", "utf8"));

const routes = [
  "/",
  "/about",
  "/projects",
  "/projects/the-clan",
  "/projects/orlean",
  "/blogs",
  ...blogs.map((post) => `/blogs/${post.slug}`),
  "/careers",
  "/channel-partner",
  "/contact",
  "/chandapura-bangalore",
  "/chandapura-heelalige",
  "/chandapura-nh-44",
  "/gunjur",
  "/muthanallur-off-sarjapura-bangalore",
  "/privacy-policy",
  "/termsandconditions",
];

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Global Edifice",
  url: SITE,
  logo: `${SITE}/icon-512.png`,
  description:
    "Global Edifice is a RERA-approved real estate developer in Bangalore building premium residential apartments.",
  telephone: "+91-94116-14444",
  email: "sales@globaledifice.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "966, 3rd Floor, 27th Main, 8th Cross Rd, 1st Sector, HSR Layout",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560102",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/Globaledifce/",
    "https://www.instagram.com/global.edifice/",
    "https://x.com/globaledifice",
    "https://www.linkedin.com/company/global-edifice-top-construction-company-in-bangalore/",
    "https://www.youtube.com/@Globaledifice",
  ],
};

const esc = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const template = await readFile(path.join(dist, "index.html"), "utf8");
const lastmod = new Date().toISOString().slice(0, 10);

for (const route of routes) {
  const page = await render(route);

  if (page.notFound) {
    console.warn(`prerender: skipped ${route} (not found)`);
    continue;
  }

  const canonical = SITE + (route === "/" ? "/" : route);
  const head = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Global Edifice" />`,
    `<meta name="twitter:card" content="summary" />`,
    route === "/" ? `<script type="application/ld+json">${JSON.stringify(organization)}</script>` : "",
  ].join("\n    ");

  const output = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, "")
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="app"></div>', `<div id="app">${page.html}</div>`);

  const file = route === "/" ? "index.html" : path.join(route.slice(1), "index.html");
  await mkdir(path.dirname(path.join(dist, file)), { recursive: true });
  await writeFile(path.join(dist, file), output);
}

const bots = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
  "Applebot-Extended",
];

await writeFile(
  path.join(dist, "robots.txt"),
  [
    "User-agent: *",
    "Allow: /",
    "",
    ...bots.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", ""]),
    `Sitemap: ${SITE}/sitemap.xml`,
    "",
  ].join("\n"),
);

await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${esc(SITE + (route === "/" ? "/" : route))}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);

await writeFile(
  path.join(dist, "llms.txt"),
  `# Global Edifice

> RERA-approved real estate developer in Bangalore building premium residential apartments (HSR Layout head office; projects around Chandapura, Anekal and Sarjapur Road).

## Key pages
- [Projects](${SITE}/projects): ongoing, upcoming and completed projects
- [The Clan](${SITE}/projects/the-clan)
- [Orlean](${SITE}/projects/orlean)
- [About Us](${SITE}/about)
- [Blog](${SITE}/blogs): Bangalore real estate guides
- [Contact](${SITE}/contact)

## Contact
- Phone: +91 94116 14444
- Email: sales@globaledifice.com
- Address: 966, 3rd Floor, 27th Main, 8th Cross Rd, 1st Sector, HSR Layout, Bangalore, Karnataka 560102
`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${routes.length} pages, robots.txt, sitemap.xml, llms.txt`);
