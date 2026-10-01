import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

// Keep the tab title and meta description in step with the current route.
router.subscribe("onResolved", () => {
  const metas = router.state.matches.flatMap((match) => match.meta ?? []) as Array<
    Record<string, string>
  >;
  const title = [...metas].reverse().find((meta) => meta.title)?.title;
  const description = [...metas]
    .reverse()
    .find((meta) => meta.name === "description")?.content;

  if (title) document.title = title;
  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }
});

const app = document.getElementById("app");

if (!app) {
  throw new Error("App root element not found");
}

createRoot(app).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
