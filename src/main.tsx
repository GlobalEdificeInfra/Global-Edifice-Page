import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();
const app = document.getElementById("app");

if (!app) {
  throw new Error("App root element not found");
}

createRoot(app).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
