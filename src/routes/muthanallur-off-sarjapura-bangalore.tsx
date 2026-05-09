import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import muthanallurArrivalGate from "@/assets/projects/orlean/orlean-garden-lounge.png";
import muthanallurTennisCourt from "@/assets/projects/orlean/orlean-rooftop-deck.png";
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
      heroImage={muthanallurTennisCourt}
      heroImageAlt="Muthanallur, off Sarjapura, Bangalore tennis court"
      introHeading="EXPERIENCE MODERN LIVING IN A THRIVING DESTINATION"
      introParagraphs={[
        "Strategically located in one of Bangalore's rapidly developing corridors, this address offers the perfect blend of connectivity, convenience, and modern urban living. Surrounded by evolving infrastructure and key growth zones, it creates an environment designed for both present comfort and future value.",
        "With easy access to major IT hubs, reputed educational institutions, healthcare centers, and lifestyle destinations, everyday living becomes seamless and well connected. The thoughtfully chosen location ensures that everything essential remains just minutes away, enhancing both convenience and quality of life.",
        "Designed to complement contemporary lifestyles, the project brings together peaceful surroundings, modern infrastructure, and a vibrant community atmosphere. It is a destination where comfort, accessibility, and aspirational living come together effortlessly.",
      ]}
      introImage={muthanallurArrivalGate}
      introImageAlt="Muthanallur, off Sarjapura, Bangalore arrival court"
    />
  );
}
