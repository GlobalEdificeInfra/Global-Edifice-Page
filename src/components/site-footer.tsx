import geLogoGold from "@/assets/shared/ge-logo-gold.png";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;
const tealContourBackgroundStyle = {
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.01)), repeating-radial-gradient(ellipse 135% 120% at -12% 50%, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 28px)",
};

const footerLinks = [
  {
    title: "Navigation",
    items: ["Home", "About Us", "Projects", "Resources"],
  },
  {
    title: "Projects",
    items: ["Global Heights", "Edifice Villas", "Global Residency", "Completed Portfolio"],
  },
  {
    title: "Contact",
    items: [
      "+91 80 2678 1234",
      "hello@globaledifice.com",
      "Chandapura, Bangalore",
      "Schedule a Visit",
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#0f4157] text-white" style={tealContourBackgroundStyle}>
      <div className={`${pageContainerClass} py-16 md:py-20`}>
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
          <div className="max-w-[23rem]">
            <img src={geLogoGold} alt="Global Edifice" className="w-[150px] md:w-[175px]" />
            <p className="mt-8 text-[1rem] leading-[1.9] text-white/78">
              Leaders in luxury residential development. Shifting the paradigm of modern living with
              innovation and integrity.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#c4a36b]">
                {column.title}
              </h3>
              <ul className="mt-7 space-y-4 text-[1rem] text-white/84">
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/14 pt-7 text-[0.92rem] text-white/72 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Global Edifice. All rights reserved. RERA Approved Developer.</p>
          <div className="flex flex-wrap gap-7">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">RERA Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
