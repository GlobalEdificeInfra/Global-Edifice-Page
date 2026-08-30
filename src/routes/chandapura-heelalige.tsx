import { createFileRoute } from "@tanstack/react-router";
import { LocationLandingPage } from "@/components/location-landing-page";

export const Route = createFileRoute("/chandapura-heelalige")({
  component: ChandapuraHeelaligePage,
  head: () => ({
    meta: [
      { title: "Chandapura, Heelalige | Global Edifice" },
      {
        name: "description",
        content:
          "Upcoming 30-storeyed premium high-rise on 8 acres in Chandapura Heelalige, Bangalore.",
      },
    ],
  }),
});

function ChandapuraHeelaligePage() {
  return (
    <LocationLandingPage
      titleLines={["CHANDAPURA, HEELALIGE"]}
      heroSubtitle="The Future Is Taking Shape."
      heroVariant="illustration"
      introHeading="A New Community In One Of Bengaluru's Fastest-Growing Neighbourhoods."
      introParagraphs={[
        "Thoughtfully positioned in one of Bangalore’s rapidly evolving residential corridors, this address brings together the perfect balance of connectivity, convenience, and contemporary living. Surrounded by growing infrastructure and key urban developments, it offers a location designed for both present comfort and future value.",
        "With seamless access to major IT hubs, reputed educational institutions, healthcare centers, and lifestyle destinations, everyday living becomes effortlessly connected. The strategic location ensures that everything essential remains just minutes away, enhancing both productivity and quality of life.",
        "Crafted for modern urban lifestyles, the project combines accessibility with a peaceful residential environment, creating a community where comfort, convenience, and long-term growth come together seamlessly.",
      ]}
      highlightStats={[
        { value: "30", label: "Storeyed Premium High Rise" },
        { value: "8 Acres", label: "Land Area" },
        { value: "Phase I", label: "Coming Soon" },
      ]}
    />
  );
}
