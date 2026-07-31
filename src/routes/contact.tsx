import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteGetInTouch } from "@/components/site-get-in-touch";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Us - Global Edifice" },
      {
        name: "description",
        content:
          "Get in touch with Global Edifice. Start your journey towards finding your dream home with us.",
      },
    ],
  }),
});

function ContactPage() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("hide-scrollbar");

    return () => {
      root.classList.remove("hide-scrollbar");
    };
  }, []);

  return (
    <main className="bg-[#171717]">
      <SiteHeader />
      <SiteGetInTouch headingAs="h1" overlayHeader />
      <SiteFooter />
    </main>
  );
}
