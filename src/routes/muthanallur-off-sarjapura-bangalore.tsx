import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import locationHeroTerrace from "@/assets/locations/chandapura/chandapura-hero-terrace.png";
import muthanallurWelcomeHome from "@/assets/locations/muthanallur/muthanallur-welcome-home.png";
import { LocationLandingPage } from "@/components/location-landing-page";

const PAGE_TITLE = "Muthanallur, Off Sarjapura, Bangalore | Global Edifice";
const PAGE_DESCRIPTION =
  "Explore Muthanallur, off Sarjapura, Bangalore as a connected residential destination with access to IT hubs, education, healthcare, and lifestyle infrastructure.";

export const Route = createFileRoute("/muthanallur-off-sarjapura-bangalore")({
  component: MuthanallurSarjapuraPage,
  head: () => ({
    meta: [{ title: PAGE_TITLE }, { name: "description", content: PAGE_DESCRIPTION }],
  }),
});

function usePageMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector('meta[name="description"]');
    const previousDescription = existingDescription?.getAttribute("content") ?? null;

    document.title = PAGE_TITLE;

    let metaElement = existingDescription;

    if (!metaElement) {
      metaElement = document.createElement("meta");
      metaElement.setAttribute("name", "description");
      document.head.appendChild(metaElement);
    }

    metaElement.setAttribute("content", PAGE_DESCRIPTION);

    return () => {
      document.title = previousTitle;

      if (existingDescription) {
        if (previousDescription === null) {
          existingDescription.removeAttribute("content");
        } else {
          existingDescription.setAttribute("content", previousDescription);
        }
      } else {
        metaElement?.remove();
      }
    };
  }, []);
}

function MuthanallurSarjapuraPage() {
  usePageMetadata();

  return (
    <LocationLandingPage
      titleLines={["MUTHANALLUR, OFF SARJAPURA,", "BANGALORE"]}
      heroImage={locationHeroTerrace}
      heroImageAlt="Muthanallur, off Sarjapura, Bangalore rooftop terrace"
      introHeading="Where Tomorrow Begins Today."
      introParagraphs={[
        "A New Address in Bengaluru's Emerging Growth Corridor.",
        "Growth creates opportunity.",
        "That's exactly what makes Muthanallur one of the most promising locations off Sarjapur Road.",
        "Its proximity to major IT hubs, expanding infrastructure, educational institutions, and healthcare facilities makes it an ideal destination for families looking to build their future in a well-connected neighbourhood.",
        "Our upcoming community will reflect everything Global Edifice stands for—thoughtful planning, quality construction, and homes designed around the way people live today.",
        "The location is growing.",
        "So is the opportunity to be part of it.",
      ]}
      introImage={muthanallurWelcomeHome}
      introImageAlt="Muthanallur, off Sarjapura, Bangalore welcome home entrance"
      introImageFlushRight
    />
  );
}
