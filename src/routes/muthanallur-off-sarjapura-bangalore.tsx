import { createFileRoute } from "@tanstack/react-router";
import { upcomingProjectHeroes } from "@/assets/locations/upcoming";
import { LocationLandingPage } from "@/components/location-landing-page";

export const Route = createFileRoute("/muthanallur-off-sarjapura-bangalore")({
  component: MuthanallurSarjapuraPage,
  head: () => ({
    meta: [
      { title: "Muthanallur, Off Sarjapura, Bangalore | Global Edifice" },
      {
        name: "description",
        content:
          "Explore Muthanallur, off Sarjapura, Bangalore — upcoming 15-storeyed premium residences on 1.5 acres.",
      },
    ],
  }),
});

function MuthanallurSarjapuraPage() {
  return (
    <LocationLandingPage
      titleLines={["MUTHANALLUR, OFF SARJAPURA", "BANGALORE"]}
      projectName="Global Edifice Muthanallur"
      heroVariant="photo"
      heroImage={upcomingProjectHeroes.muthanallur}
      heroImageAlt="Muthanallur rooftop terrace with city views"
      introHeading="Experience Modern Living In A Thriving Destination"
      introParagraphs={[
        "Strategically located in one of Bangalore’s rapidly developing corridors, this address offers the perfect blend of connectivity, convenience, and modern urban living. Surrounded by evolving infrastructure and key growth zones, it creates an environment designed for both present comfort and future value.",
        "With easy access to major IT hubs, reputed educational institutions, healthcare centers, and lifestyle destinations, everyday living becomes seamless and well connected.",
        "Designed to complement contemporary lifestyles, the project brings together peaceful surroundings, modern infrastructure, and a vibrant community atmosphere. It is a destination where comfort, accessibility, and aspirational living come together effortlessly.",
      ]}
      highlightStats={[
        { value: "15", label: "Storeyed Premium Residences" },
        { value: "2 Acres", label: "Land Area" },
        { value: "Coming Soon", label: "" },
      ]}
    />
  );
}
