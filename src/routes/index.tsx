import { createFileRoute } from "@tanstack/react-router";
import heroPool from "@/assets/hero-pool.jpg";
import promiseBalcony from "@/assets/promise-balcony.jpg";
import projectOrlean from "@/assets/project-orlean.jpg";
import projectClan from "@/assets/project-clan.jpg";
import projectLegacy from "@/assets/project-legacy.jpg";
import amenityGardens from "@/assets/amenity-gardens.jpg";
import amenityJogging from "@/assets/amenity-jogging.jpg";
import amenityYoga from "@/assets/amenity-yoga.jpg";
import geLogo from "@/assets/ge-logo.png";
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
  const links = ["HOME", "ABOUT US", "PROJECTS", "RESOURCES", "CONTACT"];
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="bg-primary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center">
            <img src={geLogo} alt="Global Edifice — The Foundation of Trust" className="h-12 w-auto brightness-110" />
          </a>
          <nav className="hidden items-center gap-1 rounded-full bg-primary-foreground/5 px-2 py-1.5 backdrop-blur md:flex">
            {links.map((l, i) => (
              <a
                key={l}
                href="#"
                className={`rounded-full px-4 py-1.5 text-xs tracking-[0.18em] transition ${
                  i === 0
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {l}
              </a>
            ))}
            <a
              href="#"
              className="ml-2 rounded-full bg-gold px-5 py-1.5 text-xs tracking-[0.18em] text-primary hover:bg-gold-soft"
            >
              ENQUIRE
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <Nav />
      <div className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroPool}
          alt="Premium poolside residence"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-primary/40" />

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-20 pt-40">
          <div className="w-full">
            <div className="ml-auto max-w-2xl text-right text-white">
              <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
                We don't just build,
                <br />
                <em className="not-italic text-gold-soft">we redefine</em> living
              </h1>
              <p className="ml-auto mt-6 max-w-md text-sm font-light leading-relaxed text-white/85 md:text-base">
                A boutique studio of architects and craftsmen, sculpting premium mid-rise
                residences where every detail is deliberate, and every home endures.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-gold px-7 py-3 text-xs tracking-[0.2em] text-primary transition hover:bg-gold-soft"
              >
                EXPLORE RESIDENCES
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/40 bg-white/5 px-7 py-3 text-xs tracking-[0.2em] text-white backdrop-blur transition hover:bg-white/15"
              >
                SCHEDULE A SITE VISIT
              </a>
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
    <section className="bg-background py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="eyebrow">Our Story</span>
            <span className="h-px w-10 bg-gold/60" />
          </div>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">
            The Global Edifice Promise
          </h2>
          <p className="eyebrow mt-8">Building Legacies, Not Just Homes</p>
          <div className="mt-5 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
            <p>
              Global Edifice was founded on a singular belief — that a home is the most
              important investment a family will ever make. Since our inception, we have
              delivered thoughtfully designed residential communities across Bangalore's
              most sought-after corridors.
            </p>
            <p>
              From compact apartments built for young professionals in Chandapura to spacious
              villas designed for multi-generational families in HSR Layout, every Global
              Edifice home reflects our uncompromising commitment to structural integrity,
              aesthetic excellence, and on-time delivery.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {pillars.map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-3">
                <img src={icon} alt={label} className="h-11 w-11 object-contain" />
                <span className="border-l border-gold/40 pl-3 text-xs leading-tight text-primary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={promiseBalcony}
            alt="Premium balcony view"
            className="h-full max-h-[560px] w-full rounded-sm object-cover"
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
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, white 0 1px, transparent 1px 18px)",
      }} />
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
    <section id="projects" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow">Portfolio</span>
              <span className="h-px w-10 bg-gold/60" />
            </div>
            <h2 className="mt-3 font-display text-4xl text-primary md:text-5xl">
              Our Projects
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-primary/70">
            {["ALL", "ONGOING", "COMPLETED"].map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                <button
                  className={`px-2 py-1 ${i === 0 ? "border-b border-gold text-primary" : ""}`}
                >
                  {t}
                </button>
                {i < 2 && <span className="text-border">|</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.name}
              className="group overflow-hidden rounded-sm border border-border bg-card shadow-sm transition hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold tracking-[0.12em] text-primary">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-[11px] tracking-wider text-muted-foreground">
                      {p.location}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-[10px] tracking-[0.18em] text-gold">
                    {p.price}
                  </p>
                </div>
                <div className="my-5 h-px bg-border" />
                <p className="text-[11px] tracking-[0.18em] text-muted-foreground">{p.type}</p>
                <div className="mt-5 flex gap-2">
                  <button className="flex-1 rounded-full bg-gold px-4 py-2.5 text-[10px] tracking-[0.18em] text-primary transition hover:bg-gold-soft">
                    BOOK A SITE VISIT
                  </button>
                  <button className="flex-1 rounded-full border border-primary/20 px-4 py-2.5 text-[10px] tracking-[0.18em] text-primary transition hover:bg-primary hover:text-primary-foreground">
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
    <section className="bg-primary py-24 text-primary-foreground">
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
              Premium residential communities in Bangalore's most promising corridors —
              built with integrity, delivered with pride.
            </p>
          </div>
          {[
            {
              title: "PROJECTS",
              items: ["Global Heights", "Edifice Villas", "Global Residency", "Completed Portfolio"],
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
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms of Use</a>
            <a href="#" className="hover:text-gold">RERA Disclosures</a>
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
