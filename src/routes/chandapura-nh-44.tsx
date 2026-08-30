import { createFileRoute } from "@tanstack/react-router";
import { LocationLandingPage } from "@/components/location-landing-page";

export const Route = createFileRoute("/chandapura-nh-44")({
  component: ChandapuraNh44Page,
  head: () => ({
    meta: [
      { title: "Chandapura NH 44 | Global Edifice" },
      {
        name: "description",
        content:
          "Upcoming 30-storeyed luxury residences across 5.5 acres on Chandapura NH 44, Bangalore.",
      },
    ],
  }),
});

function ChandapuraNh44Page() {
  return (
    <LocationLandingPage
      titleLines={["CHANDAPURA NH 44"]}
      heroVariant="illustration"
      introHeading="Elevated Living. Designed To Rise."
      introParagraphs={[
        "Rising across 5.5 acres in Chandapura, this luxury high-rise development brings together contemporary architecture, expansive views, and thoughtfully designed spaces for a refined urban lifestyle.",
        "Soaring 30 storeys above the city, the development is crafted for those who appreciate the finer side of modern living. From elegant residences to well-planned amenities and landscaped spaces, every detail is envisioned to create a sophisticated and comfortable everyday experience.",
        "A landmark address where luxury meets elevation. Designed not just as a home, but as a statement of how you choose to live.",
      ]}
      highlightStats={[
        { value: "30", label: "Storeyed Luxury Residences" },
        { value: "5.5 Acres", label: "Land Area" },
        { value: "Coming Soon", label: "" },
      ]}
    />
  );
}
