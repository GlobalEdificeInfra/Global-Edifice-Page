import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import orleanCyclingGarden from "@/assets/projects/orlean/orlean-cycling-garden.png";
import orleanGardenLounge from "@/assets/projects/orlean/orlean-garden-lounge.png";
import { LocationLandingPage } from "@/components/location-landing-page";

const PAGE_TITLE = "Chandapura, Bangalore | Global Edifice";
const PAGE_DESCRIPTION =
  "Discover a Chandapura, Bangalore address with access to major IT hubs, educational institutions, healthcare centers, and everyday lifestyle destinations.";

export const Route = createFileRoute("/chandapura-bangalore")({
  component: ChandapuraBangalorePage,
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

function ChandapuraBangalorePage() {
  usePageMetadata();

  return (
    <LocationLandingPage
      titleLines={["CHANDAPURA, BANGALORE"]}
      heroImage={orleanGardenLounge}
      heroImageAlt="Chandapura, Bangalore landscaped community"
      introHeading="A LANDMARK ADDRESS IN BANGALORE'S RISING CORRIDOR"
      introParagraphs={[
        "Thoughtfully positioned in one of Bangalore's rapidly evolving residential corridors, this address brings together the perfect balance of connectivity, convenience, and contemporary living. Surrounded by growing infrastructure and key urban developments, it offers a location designed for both present comfort and future value.",
        "With seamless access to major IT hubs, reputed educational institutions, healthcare centers, and lifestyle destinations, everyday living becomes effortlessly connected. The strategic location ensures that everything essential remains just minutes away, enhancing both productivity and quality of life.",
        "Crafted for modern urban lifestyles, the project combines accessibility with a peaceful residential environment, creating a community where comfort, convenience, and long-term growth come together seamlessly.",
      ]}
      introImage={orleanCyclingGarden}
      introImageAlt="Chandapura, Bangalore lifestyle greens"
    />
  );
}
