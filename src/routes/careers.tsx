import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import careerHero from "@/assets/careers/career.jpg";
import {
  ResourcePageHero,
  ResourcePageShell,
  pageContainerClass,
} from "@/components/careers-channel-layout";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers - Global Edifice" },
      {
        name: "description",
        content:
          "Build your career with Global Edifice. Join a team shaping homes and communities across Bengaluru.",
      },
    ],
  }),
});

const inputClassName =
  "mt-2 w-full rounded-[0.2rem] border border-[#e0d1b8] bg-white px-4 py-3.5 text-[1rem] font-medium text-[#3d3832] outline-none placeholder:text-[#b2a594]";
const labelClassName = "text-[0.78rem] font-semibold tracking-[0.02em] text-[#5f5448]";

function CareersPage() {
  const [resumeName, setResumeName] = useState("");

  return (
    <ResourcePageShell>
      <ResourcePageHero image={careerHero} imageAlt="Global Edifice careers" title="CAREERS" />

      <section className="bg-white py-14 md:py-20">
        <div className={pageContainerClass}>
          <div className="max-w-5xl text-left">
            <h2 className="font-display text-[1.85rem] leading-[1.15] text-[#1f1d1a] md:text-[2.45rem]">
              Build Your Career. Build Something That Lasts.
            </h2>
            <div className="mt-6 space-y-4 text-base font-normal leading-[1.9] text-[#6b655d]">
              <p>
                At Global Edifice, we believe great homes begin with great people. People who take
                ownership, ask better questions, care about the details, and take pride in seeing an
                idea become a place that people can call home.
              </p>
              <p>
                We’re building a culture where people can work with trust, openness, and a shared
                sense of responsibility. Whether you work in design, construction, sales, marketing,
                finance, customer experience, or project management, your contribution matters to
                the bigger picture.
              </p>
              <p>
                As we grow, so will you. We encourage learning, new ideas, and the freedom to take
                on meaningful responsibilities. There is always something new to build, solve,
                improve, or learn.
              </p>
              <p>
                If you want to be part of a team that is shaping homes and communities across
                Bengaluru, we’d like to hear from you.
              </p>
            </div>
          </div>

          <form
            className="mt-14 max-w-3xl rounded-[1.2rem] bg-[#f7f4ef] p-5 sm:p-7 md:p-10"
            onSubmit={(event) => event.preventDefault()}
          >
            <h3 className="font-display text-[1.65rem] leading-none text-[#1f1d1a] md:text-[2.35rem]">
              Begin with us
            </h3>

            <div className="mt-7 space-y-4">
              <label className="block">
                <span className={labelClassName}>Full name*</span>
                <input type="text" required placeholder="Enter your full name" className={inputClassName} />
              </label>
              <label className="block">
                <span className={labelClassName}>Email address*</span>
                <input
                  type="email"
                  required
                  placeholder="you.email@example.com"
                  className={inputClassName}
                />
              </label>
              <label className="block">
                <span className={labelClassName}>Phone number*</span>
                <input type="tel" required placeholder="Your number" className={inputClassName} />
              </label>
              <label className="block">
                <span className={labelClassName}>Location*</span>
                <input type="text" required placeholder="Your location" className={inputClassName} />
              </label>
              <div>
                <label className="mt-1 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[0.2rem] border border-[#cfc8be] bg-white px-4 py-3.5 text-[0.88rem] font-medium text-[#5f5448] transition hover:border-[#c0a56e]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
                  </svg>
                  Upload resume
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(event) => setResumeName(event.target.files?.[0]?.name ?? "")}
                  />
                </label>
                {resumeName ? (
                  <p className="mt-2 text-[0.78rem] text-[#8a7e70]">{resumeName}</p>
                ) : null}
              </div>
            </div>

            <FormConsentCheckbox className="mt-2" />

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center rounded-[0.35rem] border border-[#cfc8be] bg-white px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#7a756e] transition hover:border-[#c0a56e]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </ResourcePageShell>
  );
}
