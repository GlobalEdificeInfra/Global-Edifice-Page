import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import geHero from "@/assets/home/ge-hero.png";
import geStoryBalcony from "@/assets/home/ge-story-balcony.jpg";
import iconIntegrity from "@/assets/home/icon-integrity.png";
import iconDelivery from "@/assets/home/icon-delivery.png";
import iconRera from "@/assets/home/icon-rera.png";
import iconValue from "@/assets/home/icon-value.png";
import offerPrimeLocation from "@/assets/home/offer/prime-location.jpg";
import offerCraftedAmenities from "@/assets/home/offer/crafted-amenities.jpg";
import offerSmartDesign from "@/assets/home/offer/smart-design.jpg";
import offerHighQuality from "@/assets/home/offer/high-quality.jpg";
import offerOnTimeDelivery from "@/assets/home/offer/on-time-delivery.jpg";
import { SiteGetInTouch } from "@/components/site-get-in-touch";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "The Global Edifice Promise" },
      {
        name: "description",
        content:
          "Global Edifice crafts premium residences in Bangalore with thoughtful design, strong delivery discipline, and lasting value.",
      },
    ],
  }),
});


const promiseItems = [
  { icon: iconIntegrity, label: "Architectural Integrity" },
  { icon: iconDelivery, label: "On-Time Delivery" },
  { icon: iconRera, label: "RERA Compliance" },
  { icon: iconValue, label: "Long-Term Value" },
];

const legacyStats = [
  { value: "6", lines: ["Projects", "Completed"] },
  { value: "2", lines: ["Ongoing", "Projects"] },
  { value: "8", lines: ["Upcoming", "Projects"] },
  { value: "10+", lines: ["Years of", "Legacy"], mark: "ten-years" as const },
  { value: "1 MN", lines: ["Sq. Ft", "Living Spaces"] },
  { value: "650+", lines: ["Happy", "Customers"] },
];

function TenYearsMark() {
  const stroke = "#c4a06a";
  const digitHeight =
    "h-[6.1rem] w-auto shrink-0 sm:h-[6.9rem] md:h-[7.75rem] lg:h-[8.5rem]";

  return (
    <div className="flex max-w-full shrink-0 items-start justify-center gap-0.5 sm:gap-1">
      {/* Digit 1 — top/bottom flush with outer ring of the 0 */}
      <svg
        viewBox="0 0 44 92"
        className={digitHeight}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Outer — top flush with 0; shorter flag */}
          <path d="M18 8 H38 V84" />
          {/* Middle — longest flag; 1% up */}
          <path d="M8 14 H32 V84" />
          {/* Inner — 2% down; same flag length as outer */}
          <path d="M18 20 H26 V84" />
        </g>
      </svg>

      {/* Digit 0 + YEARS aligned to the top of the zero */}
      <div className="-ml-1 flex items-start gap-0 sm:gap-0.5">
        <svg
          viewBox="0 0 68 92"
          className={digitHeight}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <g stroke={stroke} strokeWidth="2.2">
            <ellipse cx="34" cy="46" rx="26" ry="38" />
            <ellipse cx="34" cy="46" rx="18" ry="27" />
            <ellipse cx="34" cy="46" rx="10" ry="16" />
          </g>
        </svg>
        <div className="-ml-0.5 mt-[0.1rem] flex shrink-0 flex-col items-center leading-none">
          <span className="text-[1.25rem] font-light leading-none text-[#c4a06a] sm:text-[1.4rem]">
            +
          </span>
          <span className="mt-[0.12rem] text-[14px] font-normal uppercase tracking-[0.18em] text-[#c4a06a] sm:text-[15px]">
            YEARS
          </span>
        </div>
      </div>
    </div>
  );
}

const offerItems = [
  {
    title: "Prime Location",
    description:
      "We choose locations that matter, where lifestyle, convenience, and connectivity come together seamlessly.",
    image: offerPrimeLocation,
    alt: "Aerial view of a city with a location pin marking a Global Edifice neighbourhood",
  },
  {
    title: "Crafted Amenities",
    description:
      "At Global Edifice, every amenity is thoughtfully crafted to elevate everyday living, bringing together wellness, recreation, relaxation, and connection. Because exceptional living is in the details.",
    image: offerCraftedAmenities,
    alt: "Landscaped swimming pool and clubhouse amenity deck",
  },
  {
    title: "Smart Design",
    description:
      "Our designs are driven by creativity and functionality, ensuring every space is thoughtfully planned and future ready. We value your time and deliver projects that create lasting memories.",
    image: offerSmartDesign,
    alt: "Global Edifice residence elevation at dusk",
  },
  {
    title: "High Quality",
    description:
      "Every project is a reflection of our commitment to superior quality. With meticulous attention to detail and an uncompromising approach, we turn visions into enduring landmarks.",
    image: offerHighQuality,
    alt: "A quality assurance badge held in an open hand",
  },
  {
    title: "On-Time Delivery",
    description:
      "We respect timelines because we know they shape memories. With a sharp eye for detail and a steadfast commitment to quality, we ensure every project is delivered as promised, on time and flawless.",
    image: offerOnTimeDelivery,
    alt: "Landscaped pathway leading through a Global Edifice development",
  },
];

const testimonials = [
  {
    name: "Arun & Priya Narayan",
    role: "Home Owner Orlean",
    quote:
      "From the moment we visited Orlean, we knew this was home. The attention to detail and thoughtful planning make it a standout choice for anyone looking for a premium lifestyle.",
  },
  {
    name: "Rajendra Swami",
    role: "Home Owner Orlean",
    quote:
      "My very first real estate investment, my first home was at Global Edifice Green Apple Hikes. I believe that I have made the right choice as they had helped me understand about the location and its value clearly.",
  },
  {
    name: "Haridas Nair",
    role: "Home Owner Orlean",
    quote:
      "Legacy truly lives up to its name. The sophisticated architecture, spacious layouts, and top-tier amenities make it a dream home for us.",
  },
];

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";
const pageContainerClass = `mx-auto max-w-7xl ${pageGutterClass}`;
const tealContourBackgroundStyle = {
  backgroundImage:
    "linear-gradient(180deg, rgba(255,255,255,0.018), rgba(255,255,255,0.01)), repeating-radial-gradient(ellipse 135% 120% at -12% 50%, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 28px)",
};

function SectionHeading({
  eyebrow,
  title,
  titleClassName = "text-[#1d1d1d]",
}: {
  eyebrow: string;
  title: string;
  titleClassName?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#c0a56e]">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-[#dbc9a7]/70" />
      </div>
      <h2
        className={`mt-3 font-display text-[2.5rem] leading-[0.95] md:text-[3.4rem] ${titleClassName}`}
      >
        {title}
      </h2>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate min-h-[44rem] overflow-hidden bg-[#17394a] text-white md:min-h-screen"
    >
      <img
        src={geHero}
        alt="Luxury Global Edifice residence"
        className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[center_45%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_42%,rgba(6,12,18,0.35)_68%,rgba(6,12,18,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,22,0.22)_0%,transparent_30%,transparent_58%,rgba(8,15,22,0.5)_100%)]" />

      <div
        className={`relative mx-auto flex min-h-[44rem] max-w-7xl items-end ${pageGutterClass} pb-[calc(4rem+5vh)] pt-28 sm:pb-[calc(5rem+5vh)] md:min-h-screen md:pb-[calc(6rem+5vh)] lg:pb-[calc(7rem+5vh)]`}
      >
        <div className="grid w-full grid-cols-1 items-end gap-8 md:grid-cols-[1fr_minmax(18rem,28rem)] md:gap-10">
          {/* Left: buttons — bottom aligns with subtitle last line */}
          <div className="order-2 flex flex-wrap items-center gap-3 sm:gap-4 md:order-1">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-full bg-[#0f1319]/90 px-6 py-3.5 text-[0.82rem] font-bold text-white backdrop-blur-[2px] transition hover:bg-black sm:px-7 sm:text-[0.88rem]"
            >
              Explore residences
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/85 bg-transparent px-6 py-3.5 text-[0.82rem] font-bold text-white transition hover:bg-white/10 sm:px-7 sm:text-[0.88rem]"
            >
              Schedule a site visit
            </Link>
          </div>

          {/* Right: 4-line title + 3-line subtitle */}
          <div className="order-1 text-right md:order-2">
            <h1 className="font-display text-[1.75rem] font-normal uppercase leading-[1] tracking-[-0.02em] text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.45)] sm:text-[2.15rem] md:text-[3.55rem] lg:text-[4rem] xl:text-[4.35rem]">
              <span className="block sm:whitespace-nowrap">We Don&apos;t</span>
              <span className="block sm:whitespace-nowrap">Just Build,</span>
              <span className="block sm:whitespace-nowrap">We Redefine</span>
              <span className="block sm:whitespace-nowrap">Living</span>
            </h1>
            <p className="mt-6 text-base font-normal leading-[1.65] text-white/92 [text-shadow:0_1px_16px_rgba(0,0,0,0.35)] md:leading-[1.7]">
              A boutique studio of architects and craftsmen, sculpting premium mid-rise residences
              where every detail is deliberate, and every home endures.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="about" className="overflow-hidden bg-[#f9f7f2] py-20 md:py-28 lg:py-32">
      <div
        className="grid items-center gap-14 lg:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[minmax(0,36rem)_minmax(0,1fr)] xl:gap-14"
        style={{ paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.125rem))" }}
      >
        <div className="pr-6 md:pr-10 lg:pr-0 lg:pt-6 xl:pt-8">
          <div className="mx-auto max-w-[34rem] lg:mx-0 xl:max-w-[35rem]">
            <span className="block text-[0.85rem] font-bold uppercase tracking-[0.22em] text-[#7a756e] sm:text-[0.95rem] md:text-[1rem]">
              The Global Edifice Promise
            </span>

            <h2 className="mt-4 font-display text-[2.1rem] leading-[1.08] tracking-[-0.018em] text-[#c0a56e] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.1rem] xl:text-[3.3rem]">
              <span className="block">Building Legacies,</span>
              <span className="block">Not Just Homes</span>
            </h2>

            <div className="mt-8 max-w-[32.5rem] space-y-5 text-base font-normal leading-[1.8] text-[#7a756e] md:mt-9 lg:max-w-[33.5rem]">
              <p>
                Global Edifice has been a trusted name in the real estate industry for over ten
                years, being the forefront of upcoming projects in Bangalore, establishing
                ourselves among the top builders in Bangalore with some of the finest architects,
                engineers, sales force in the Silicon Valley of India.
              </p>
              <p>
                Our journey was built on the pillars of quality and customer centricity, thus
                making us one of the most sought-after real estate developers in Bangalore. Our
                commitment to timely delivery and uncompromising quality has earned us the trust of
                hundreds of satisfied customers.
              </p>
              <p>
                At Global Edifice, we don&apos;t just build homes for you but create lifestyles
                that reflect elegance, security, and of course a sense of community.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-x-0 lg:max-w-[34rem] xl:max-w-[35rem]">
              {promiseItems.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center text-center sm:px-2 md:px-3 ${
                    index < promiseItems.length - 1 ? "sm:border-r sm:border-[#ddd5c8]" : ""
                  }`}
                >
                  <img src={item.icon} alt={item.label} className="h-11 w-11 object-contain" />
                  <span className="mt-4 px-2 text-[0.8rem] leading-[1.3] text-[#7a756e] md:text-[0.88rem]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="-ml-[1.125rem] w-full overflow-hidden md:-ml-[1.125rem] lg:-my-6 lg:ml-0 lg:justify-self-end xl:-my-7">
          <img
            src={geStoryBalcony}
            alt="Curved balcony overlooking the city"
            className="h-[24rem] w-full object-cover object-center md:h-[38rem] lg:h-[44rem] xl:h-[46rem]"
          />
        </div>
      </div>
    </section>
  );
}

function LegacyStats() {
  return (
    <section
      aria-label="Company achievements"
      className="relative overflow-hidden bg-[#0c3648]"
      style={tealContourBackgroundStyle}
    >
      <div className="w-full">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1.35fr_1fr_1fr]">
          {legacyStats.map((stat, index) => (
            <li
              key={stat.lines.join(" ")}
              className="relative flex min-w-0 flex-col items-center justify-center px-2 py-[2.85rem] text-center sm:px-3 sm:py-[3.25rem] md:px-4 md:py-[3.7rem] lg:py-[4.05rem]"
            >
              {index < legacyStats.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 hidden h-[4.4rem] w-px -translate-y-1/2 bg-[#c4a06a]/50 sm:block sm:h-[5.1rem] lg:h-[5.9rem]"
                />
              ) : null}
              {"mark" in stat && stat.mark === "ten-years" ? (
                <>
                  <span className="sr-only">10+ years of legacy</span>
                  <TenYearsMark />
                </>
              ) : (
                <>
                  <p className="font-display text-[1.85rem] font-normal leading-none tracking-[-0.01em] text-[#c4a06a] sm:text-[2.5rem] md:text-[2.95rem] lg:text-[3.2rem] xl:text-[3.4rem]">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.75rem] font-medium uppercase leading-[1.25] tracking-[0.1em] text-[#c4a06a] sm:mt-3.5 sm:text-[0.82rem] sm:tracking-[0.14em] md:text-[0.92rem] md:tracking-[0.16em]">
                    <span className="block">{stat.lines[0]}</span>
                    <span className="block">{stat.lines[1]}</span>
                  </p>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Amenities() {
  return (
    <section
      id="amenities"
      className="overflow-hidden bg-[#0c3648] py-20 text-white md:py-24"
      style={tealContourBackgroundStyle}
    >
      <div className={pageContainerClass}>
        <SectionHeading
          eyebrow="Our Core Values"
          title="What We Offer"
          titleClassName="font-normal text-[#c0a56e]"
        />

        <div className="mt-14 grid gap-x-14 gap-y-12 md:mt-16 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-14">
          {offerItems.map((item) => (
            <div key={item.title} className="flex items-start gap-5 sm:gap-6">
              <div className="h-[8rem] w-[8rem] shrink-0 overflow-hidden rounded-2xl shadow-[0_14px_30px_-16px_rgba(0,0,0,0.6)] sm:h-[9.5rem] sm:w-[9.5rem]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-[0.85rem] font-bold uppercase tracking-[0.14em] text-[#c0a56e] sm:text-[0.92rem]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-base font-normal leading-[1.65] text-white/85">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className={pageContainerClass}>
        <SectionHeading
          eyebrow="Testimonials"
          title="Success Stories"
          titleClassName="text-[#123a4c] text-[2.1rem] md:text-[2.65rem]"
        />

        <div className="mt-10 grid gap-5 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-[#e8e0d4] bg-white px-5 py-6 shadow-[0_12px_28px_-26px_rgba(18,58,76,0.2)] transition-all duration-500 ease-out hover:z-10 hover:scale-[1.025] hover:border-[#d6c8b0] hover:shadow-[0_22px_40px_-24px_rgba(18,58,76,0.28)] md:px-6 md:py-7"
            >
              <div className="relative flex min-h-[3.75rem] items-start justify-between gap-3 md:min-h-[4.25rem]">
                <div className="flex items-center gap-0.5 pt-1 text-[#c0a56e]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[8.5rem] leading-none text-transparent [-webkit-text-stroke:1.6px_#d2c7b6] md:-right-2 md:-top-4 md:text-[9.5rem] md:[-webkit-text-stroke:1.75px_#d2c7b6]"
                >
                  ”
                </span>
              </div>

              <p className="relative mt-4 text-base font-normal italic leading-[1.7] text-[#7a756e] md:mt-5 md:leading-[1.75]">
                {item.quote}
              </p>

              <div className="mt-auto pt-6">
                <h3 className="font-display text-[1.08rem] font-semibold leading-[1.2] text-[#c0a56e] md:text-[1.15rem]">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-[0.8rem] font-medium text-[#8a8378]">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-[#fbf8f4]">
      <SiteHeader />
      <Hero />
      <LegacyStats />
      <Story />
      <Amenities />
      <Testimonials />
      <SiteGetInTouch />
      <SiteFooter />
    </main>
  );
}
