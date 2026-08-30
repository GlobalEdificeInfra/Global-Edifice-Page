import { createFileRoute } from "@tanstack/react-router";
import gunjurPlots from "@/assets/locations/gunjur/gunjur-plots.png";
import { LocationLandingPage } from "@/components/location-landing-page";

export const Route = createFileRoute("/gunjur")({
  component: GunjurPage,
  head: () => ({
    meta: [
      { title: "Gunjur Premium Plots | Global Edifice" },
      {
        name: "description",
        content:
          "Upcoming 12-acre premium plotted development in Gunjur, near Varthur, Bangalore.",
      },
    ],
  }),
});

function GunjurPage() {
  return (
    <LocationLandingPage
      titleLines={["GUNJUR"]}
      heroVariant="photo"
      heroImage={gunjurPlots}
      heroImageAlt="Gunjur premium plotted development at sunset"
      heroImageClassName="object-[center_45%]"
      introHeading="One Premium Address. Endless Possibilities."
      introParagraphs={[
        {
          title: "A New Address in Gunjur",
          body: "Spread across 12 acres, this premium plotted development brings together thoughtfully planned plots, well-designed roads, landscaped surroundings, and a sense of space that makes every corner feel purposeful. It is an opportunity to own a piece of land in a location with room to grow.",
        },
        {
          title: "Designed for the Life You Imagine",
          body: "Whether you envision a contemporary family home, a peaceful retreat, or a long-term investment, these plots give you the freedom to build your future your way.",
        },
        {
          title: "A Plot Today. A Possibility Tomorrow",
          body: "Set in Gunjur, this 12-acre development offers more than just a piece of land—it offers the canvas for something of your own.",
        },
      ]}
      highlightStats={[
        { value: "Premium", label: "Plotted Development" },
        { value: "12 Acres", label: "Land Area" },
        { value: "Coming Soon", label: "" },
      ]}
    />
  );
}
