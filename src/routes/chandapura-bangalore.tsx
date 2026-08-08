import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import chandapuraHeroCourtyard from "@/assets/locations/chandapura/chandapura-hero-courtyard.png";
import orleanCyclingGarden from "@/assets/projects/orlean/orlean-cycling-garden.png";
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
      heroImage={chandapuraHeroCourtyard}
      heroImageAlt="Chandapura, Bangalore community courtyard"
      introHeading="The Future Is Taking Shape."
      introParagraphs={[
        "A New Community in One of Bengaluru's Fastest-Growing Neighbourhoods.",
        "Every growing city has places that quietly become tomorrow's most sought-after addresses. Chandapura is one of them.",
        "With excellent connectivity to Electronic City, Bommasandra, upcoming infrastructure, reputed schools, healthcare, and everyday conveniences, it's steadily becoming a preferred destination for families and professionals alike.",
        "Our upcoming development is being planned with the same attention to detail that defines every Global Edifice community—bringing together well-designed homes, open spaces, and amenities that support modern living.",
      ]}
      introImage={orleanCyclingGarden}
      introImageAlt="Chandapura, Bangalore lifestyle greens"
      introImageFlushRight
    />
  );
}
