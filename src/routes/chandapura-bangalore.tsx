import { createFileRoute } from "@tanstack/react-router";
import { LocationLandingPage } from "@/components/location-landing-page";

export const Route = createFileRoute("/chandapura-bangalore")({
  component: ChandapuraBangalorePage,
  head: () => ({
    meta: [
      { title: "Chandapura, Bangalore | Global Edifice" },
      {
        name: "description",
        content:
          "Discover a Chandapura, Bangalore address with access to major IT hubs, educational institutions, healthcare centers, and everyday lifestyle destinations.",
      },
    ],
  }),
});

function ChandapuraBangalorePage() {
  return (
    <LocationLandingPage
      titleLines={["CHANDAPURA, BANGALORE"]}
      projectName="Global Edifice Chandapura, Bangalore"
      heroSubtitle="The Future Is Taking Shape."
      heroVariant="illustration"
      introHeading="A New Community In One Of Bengaluru's Fastest-Growing Neighbourhoods."
      introParagraphs={[
        "Every growing city has places that quietly become tomorrow's most sought-after addresses. Chandapura is one of them.",
        "With excellent connectivity to Electronic City, Bommasandra, upcoming infrastructure, reputed schools, healthcare, and everyday conveniences, it's steadily becoming a preferred destination for families and professionals alike.",
        "Our upcoming development is being planned with the same attention to detail that defines every Global Edifice community—bringing together well-designed homes, open spaces, and amenities that support modern living.",
      ]}
      highlightStats={[
        { value: "Coming Soon", label: "Launch Phase" },
        { value: "Premium", label: "Residences" },
        { value: "Chandapura", label: "Bangalore" },
      ]}
    />
  );
}
