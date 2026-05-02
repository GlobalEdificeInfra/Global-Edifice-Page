import { createFileRoute } from "@tanstack/react-router";
import heroPool from "@/assets/hero-pool.jpg";
import promiseBalcony from "@/assets/promise-balcony.jpg";
import projectOrlean from "@/assets/project-orlean.jpg";
import projectClan from "@/assets/project-clan.jpg";
import projectLegacy from "@/assets/project-legacy.jpg";
import amenityGardens from "@/assets/amenity-gardens.jpg";
import amenityJogging from "@/assets/amenity-jogging.jpg";
import amenityYoga from "@/assets/amenity-yoga.jpg";
import geLogo from "@/assets/ge-logo-gold.png";
import iconIntegrity from "@/assets/icon-integrity.png";
import iconDelivery from "@/assets/icon-delivery.png";
import iconRera from "@/assets/icon-rera.png";
import iconValue from "@/assets/icon-value.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Global Edifice — The Foundation of Trust" },
      {
        name: "description",
        content:
          "A boutique studio of architects and craftsmen sculpting premium mid-rise residences in Bangalore. RERA approved, on-time delivered.",
      },
    ],
  }),
});

function Nav() {
  const links = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT US", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "RESOURCES", href: "#amenities" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div className="bg-primary">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-2 md:py-3 lg:px-8">
        <a href="#home" className="shrink-0">
          <img
            src={geLogo}
            alt="Global Edifice — The Foundation of Trust"
            className="h-auto w-[130px] sm:w-[150px] md:w-[170px] xl:w-[190px]"
          />
        </a>

        <nav className="hidden w-full max-w-[36rem] items-center justify-between rounded-full bg-white pl-6 pr-1.5 py-1.5 shadow-lg md:flex">
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[0.65rem] font-medium tracking-[0.1em] text-[#a58d66] transition hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="whitespace-nowrap rounded-full bg-[#a58d66] px-6 py-2 text-[0.65rem] font-medium tracking-[0.1em] text-white transition hover:bg-primary"
          >
            ENQUIRE
          </a>
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-white/30 px-4 py-2 text-[0.66rem] font-medium tracking-[0.16em] text-white md:hidden"
        >
          ENQUIRE
        </a>
      </header>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="bg-primary">
      <div className="overflow-hidden bg-primary">
        <Nav />

        <div className="relative h-[85vh] min-h-[38rem] overflow-hidden bg-black/10 md:h-[calc(100vh-6rem)] lg:min-h-[42rem]">
          <img
            src={heroPool}
            alt="Premium poolside residence"
            className="absolute inset-0 h-full w-full object-cover object-[42%_64%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-primary/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="mx-auto relative h-full max-w-7xl px-6 lg:px-8">
            <div className="absolute right-6 top-[18%] md:right-10 lg:right-8 xl:right-[max(3rem,5%)]">
              <div className="text-right text-white">
                <h1 className="font-display text-[3.2rem] leading-[0.95] text-white sm:text-[4rem] md:text-[5rem] lg:text-[5.3rem] xl:text-[5.8rem] 2xl:text-[6.3rem]">
                  <span className="block whitespace-nowrap">WE DON'T</span>
                  <span className="block whitespace-nowrap">JUST BUILD,</span>
                  <span className="block whitespace-nowrap">WE REDEFINE</span>
                  <span className="block whitespace-nowrap">LIVING</span>
                </h1>
              </div>
            </div>

            <div className="absolute bottom-10 left-6 right-6 md:bottom-14 lg:bottom-16 lg:left-8 lg:right-8 xl:right-[max(3rem,5%)] xl:left-[max(3rem,5%)]">
              <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between md:gap-10">
                <div className="flex flex-wrap gap-4 md:gap-5">
                  <a
                    href="#projects"
                    className="rounded-full bg-[#a58d66] px-8 py-3.5 text-[0.85rem] font-normal text-white transition hover:bg-[#8e7855] md:px-10"
                  >
                    Explore residences
                  </a>
                  <a
                    href="#contact"
                    className="rounded-full border border-white/50 bg-transparent px-8 py-3.5 text-[0.85rem] font-normal text-white backdrop-blur-sm transition hover:bg-white/10 md:px-10"
                  >
                    Schedule a site visit
                  </a>
                </div>

                <p className="max-w-[28rem] text-right text-[0.9rem] leading-[1.6] text-white md:ml-auto md:text-[0.95rem] lg:text-[1.05rem]">
                  A boutique studio of architects and craftsmen,{" "}
                  <span className="text-[#a58d66]">sculpting</span>
                  <br className="hidden md:block" />
                  premium mid-rise residences where every detail is
                  <br className="hidden md:block" />
                  deliberate, and every home endures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Promise() {
  const pillars = [
    { icon: iconIntegrity, label: "Architectural Integrity" },
    { icon: iconDelivery, label: "On-Time Delivery" },
    { icon: iconRera, label: "RERA Compliance" },
    { icon: iconValue, label: "Long-Term Value" },
  ];
  return (
    <section id="about" className="bg-[#fdfbf9] py-24">
      <div className="mx-auto grid max-w-7xl items-stretch gap-14 px-6 lg:grid-cols-[0.94fr_1.06fr] lg:gap-12 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a58d66]">
              Our Story
            </span>
            <span className="h-px w-10 bg-[#a58d66]/50" />
          </div>
          <h2 className="mt-4 font-display text-[2.2rem] leading-[1.08] text-[#0b3b4f] md:text-[2.55rem] lg:text-[2.8rem] lg:whitespace-nowrap">
            The Global Edifice Promise
          </h2>
          <p
            className="mt-12 font-semibold uppercase tracking-[0.2em] text-[#a58d66] leading-[1.6]"
            style={{ fontSize: "16px", zoom: 0.82 }}
          >
            Building Legacies,
            <br className="hidden md:block" />
            Not Just Homes
          </p>
          <div className="mt-8 space-y-6 text-[0.95rem] font-light leading-[1.8] text-[#4a5568]">
            <p>
              Global Edifice was founded on a singular belief — that a home is the most important
              investment a family will ever make. Since our inception, we have delivered
              thoughtfully designed residential communities across Bangalore's most sought-after
              corridors.
            </p>
            <p>
              From compact apartments built for young professionals in Chandapura to spacious villas
              designed for multi-generational families in HSR Layout, every Global Edifice home
              reflects our uncompromising commitment to structural integrity, aesthetic excellence,
              and on-time delivery.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-x-0">
            {pillars.map(({ icon, label }, index) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-4 text-center sm:px-4 ${
                  index < pillars.length - 1 ? "sm:border-r sm:border-[#a58d66]/30" : ""
                }`}
              >
                <img src={icon} alt={label} className="h-10 w-10 object-contain" />
                <div className="flex items-center justify-center">
                  <span className="text-[0.7rem] font-normal leading-snug text-[#4a5568]">
                    {label.split(" ")[0]}
                    <br />
                    {label.split(" ").slice(1).join(" ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative self-stretch overflow-hidden rounded-xl lg:min-h-[640px]">
          <img
            src={promiseBalcony}
            alt="Premium balcony view"
            className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
          />
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "6", label: "PROJECTS" },
    { value: "10", label: "YEARS" },
    { value: "1M", label: "SQ. FT" },
    { value: "650+", label: "HAPPY CUSTOMERS" },
  ];
  return (
    <section className="relative bg-primary py-16">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, white 0 1px, transparent 1px 18px)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`text-center text-primary-foreground ${
              i !== 0 ? "md:border-l md:border-gold/30" : ""
            }`}
          >
            <div className="font-display text-5xl text-gold-soft md:text-6xl">{s.value}</div>
            <div className="mt-3 text-[10px] tracking-[0.3em] text-primary-foreground/70">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      img: projectOrlean,
      name: "GLOBAL EDIFICE ORLEAN",
      price: "STARTING FROM 76 LAKHS*",
      location: "OFF, CHANDAPURA ROAD, BANGALORE",
      type: "2BHK RESIDENCES",
    },
    {
      img: projectClan,
      name: "GLOBAL EDIFICE THE CLAN",
      price: "STARTING FROM 68 LAKHS*",
      location: "BAGALUR – SARJAPURA, BANGALORE",
      type: "2BHK RESIDENCES",
    },
    {
      img: projectLegacy,
      name: "GLOBAL EDIFICE LEGACY",
      price: "STARTING FROM 62 LAKHS*",
      location: "OFF, CHANDAPURA ROAD, BANGALORE",
      type: "2BHK RESIDENCES",
    },
  ];
  return (
    <section id="projects" className="bg-[#fcfaf7] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a58d66]">
                Portfolio
              </span>
              <span className="h-px w-10 bg-[#a58d66]/50" />
            </div>
            <h2 className="mt-4 font-display text-[2.2rem] leading-[1.08] text-[#0b3b4f] md:text-[2.55rem] lg:text-[2.8rem] lg:whitespace-nowrap">
              Our Projects
            </h2>
          </div>
          <div className="flex w-full items-center justify-between border-y border-[#a58d66]/50 text-sm tracking-[0.2em] text-[#a58d66] md:max-w-[32rem]">
            {["ALL", "ONGOING", "COMPLETED"].map((t, i) => (
              <span key={t} className="flex flex-1 items-center justify-center relative">
                <button
                  className={`w-full py-4 text-center transition hover:text-[#0b3b4f] ${
                    i === 0 ? "font-semibold text-[#0b3b4f]" : ""
                  }`}
                >
                  {t}
                </button>
                {i < 2 && <span className="absolute right-0 h-8 w-px bg-[#a58d66]/50"></span>}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-xl border border-[#a58d66]/40 bg-white transition hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-[16rem] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-[60%]">
                    <h3 className="text-[1.05rem] leading-snug font-semibold tracking-[0.05em] text-[#0b3b4f]">
                      {p.name.split(" ").slice(0, 2).join(" ")}
                      <br />
                      {p.name.split(" ").slice(2).join(" ")}
                    </h3>
                    <p className="mt-4 text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.08em] text-[#a58d66]">
                      {p.location}
                    </p>
                  </div>
                  <div className="shrink-0 text-right w-[40%] pl-2">
                    <p className="text-[0.55rem] md:text-[0.6rem] font-bold tracking-[0.05em] text-[#a58d66]">
                      {p.price.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <p className="mt-0.5 text-[0.8rem] md:text-[0.85rem] font-bold tracking-[0.05em] text-[#a58d66]">
                      {p.price.split(" ").slice(2).join(" ")}
                    </p>
                  </div>
                </div>

                <div className="mt-8 mb-6 flex items-center justify-between gap-4">
                  <p className="text-[0.65rem] font-bold tracking-[0.05em] text-[#4a5568] whitespace-nowrap">
                    {p.type}
                  </p>
                  <div className="h-px flex-grow bg-[#a58d66]/30"></div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 rounded-full bg-[#a58d66] px-2 py-3 text-[0.65rem] font-bold tracking-[0.05em] text-white transition hover:bg-[#8e7855]">
                    BOOK A SITE VISIT
                  </button>
                  <button className="flex-1 rounded-full border border-[#a58d66] bg-transparent px-2 py-3 text-[0.65rem] font-bold tracking-[0.05em] text-[#0b3b4f] transition hover:bg-[#a58d66]/10">
                    KNOW MORE
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Amenities() {
  const items = [
    {
      img: amenityGardens,
      title: "LANDSCAPED GARDENS",
      desc: "Curated green spaces with walking paths, seating areas, and native plantings for daily wellness.",
    },
    {
      img: amenityJogging,
      title: "JOGGING TRACK",
      desc: "800m dedicated track with anti-skid surface designed for morning and evening fitness routines.",
    },
    {
      img: amenityYoga,
      title: "YOGA & MEDITATION DECK",
      desc: "Open-air wooden deck surrounded by greenery — designed for morning yoga and quiet reflection.",
    },
  ];
  return (
    <section id="amenities" className="bg-primary py-24 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[0.7rem] tracking-[0.25em] text-gold">WHAT WE OFFER</span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
            <h2 className="mt-3 font-display text-4xl italic text-primary-foreground md:text-5xl">
              Crafted Amenities
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-primary-foreground/70">
            {["WELLNESS", "RECREATION", "CONVENIENCE"].map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                <span className={i === 0 ? "border-b border-gold pb-1 text-gold" : ""}>{t}</span>
                {i < 2 && <span className="text-primary-foreground/30">|</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((a) => (
            <div key={a.title}>
              <div className="overflow-hidden rounded-sm">
                <img src={a.img} alt={a.title} className="h-64 w-full object-cover" />
              </div>
              <h3 className="mt-6 text-xs tracking-[0.22em] text-gold">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl text-primary">Our Projects</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium residential communities in Bangalore's most promising corridors — built with
              integrity, delivered with pride.
            </p>
          </div>
          {[
            {
              title: "PROJECTS",
              items: [
                "Global Heights",
                "Edifice Villas",
                "Global Residency",
                "Completed Portfolio",
              ],
            },
            {
              title: "COMPANY",
              items: ["About Us", "Testimonials", "Channel Partners", "Careers"],
            },
            {
              title: "CONTACT",
              items: [
                "+91 80 2678 1234",
                "hello@globaledifice.com",
                "Chandapura, Bangalore",
                "Schedule a Visit",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.25em] text-gold">{col.title}</h4>
              <ul className="mt-5 space-y-3 text-sm text-primary/80">
                {col.items.map((i) => (
                  <li key={i} className="cursor-pointer transition hover:text-gold">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© 2025 Global Edifice. All rights reserved. RERA Approved Developer.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold">
              Terms of Use
            </a>
            <a href="#" className="hover:text-gold">
              RERA Disclosures
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Promise />
      <Stats />
      <Projects />
      <Amenities />
      <Footer />
    </main>
  );
}
