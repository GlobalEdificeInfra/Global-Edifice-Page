import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { getRouter } from "./router";

export type RenderedPage = {
  html: string;
  title: string;
  description: string;
  notFound: boolean;
};

/** Renders one route to static HTML at build time (see scripts/prerender.mjs). */
export async function render(url: string): Promise<RenderedPage> {
  const router = getRouter(createMemoryHistory({ initialEntries: [url] }));
  await router.load();

  // /blogs routes validate a `page` search param and redirect to ?page=1 without it.
  if (router.state.statusCode === 307 && !url.includes("?")) return render(`${url}?page=1`);

  const metas = router.state.matches.flatMap((match) => match.meta ?? []);
  const last = <T,>(pick: (meta: Record<string, string>) => T | undefined) =>
    [...metas].reverse().map((meta) => pick(meta as Record<string, string>)).find(Boolean);

  const html = renderToString(<RouterProvider router={router} />);

  return {
    html,
    title: (last((meta) => meta.title) as string) ?? "Global Edifice",
    description: (last((meta) => (meta.name === "description" ? meta.content : undefined)) as string) ?? "",
    notFound: router.state.matches.some((match) => match.status === "notFound"),
  };
}
