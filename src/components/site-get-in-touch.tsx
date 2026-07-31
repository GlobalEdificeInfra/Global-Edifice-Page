import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";

const contactDetails = [
  {
    icon: MapPin,
    eyebrow: "Corporate Office",
    body: "966, 3rd Floor, 27th Main, 8th Cross Rd, 1st Sector, HSR Layout, Bangalore, Karnataka 560102",
  },
  {
    icon: Phone,
    eyebrow: "Give Us A Call",
    body: "+91 80 4376 0152",
  },
  {
    icon: Mail,
    eyebrow: "Send An Email",
    body: "sales@globaledifice.in",
  },
] as const;

type SiteGetInTouchProps = {
  /** Extra classes on the outer section (e.g. top padding under a fixed header). */
  className?: string;
  /** Use h1 on dedicated contact pages; h2 everywhere else. */
  headingAs?: "h1" | "h2";
  defaultProject?: "orlean" | "clan" | "legacy";
  /** Dedicated contact page: background runs under the fixed header. */
  overlayHeader?: boolean;
};

export function SiteGetInTouch({
  className = "",
  headingAs = "h2",
  defaultProject = "orlean",
  overlayHeader = false,
}: SiteGetInTouchProps) {
  const [officeContact, phoneContact, emailContact] = contactDetails;
  const OfficeIcon = officeContact.icon;
  const PhoneIcon = phoneContact.icon;
  const EmailIcon = emailContact.icon;
  const HeadingTag = headingAs;
  const inputLabelClassName =
    "text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#c5a46e]";
  const inputFieldClassName =
    "mt-2.5 w-full border-b border-white/35 bg-transparent pb-2.5 text-[0.95rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#c5a46e]";
  const contentPadClass = overlayHeader
    ? "pb-12 pt-36 md:pb-14 md:pt-40 lg:pb-16 lg:pt-44"
    : "py-14 md:py-16 lg:py-20";

  return (
    <section id="contact" className={`bg-[#171717] pb-0 ${className}`.trim()}>
      <div className="relative overflow-hidden bg-[#171717]">
        <img
          src={geContactLounge}
          alt="Global Edifice lobby lounge"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(12,14,16,0.82)_0%,rgba(12,14,16,0.7)_42%,rgba(12,14,16,0.48)_100%)]" />

        <div
          className={`relative mx-auto grid max-w-7xl items-start gap-10 ${pageGutterClass} ${contentPadClass} lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,26rem)] lg:gap-12 xl:grid-cols-[minmax(0,1.2fr)_28rem] xl:gap-14`}
        >
          <div className="flex max-w-[38rem] flex-col text-white lg:pt-1">
            <div className="flex items-center gap-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#c5a46e]">
                Get In Touch
              </span>
              <span className="h-px w-10 bg-[#c5a46e]/80" />
            </div>
            <HeadingTag className="mt-3 font-display text-[2.35rem] leading-[0.96] md:text-[2.75rem] lg:text-[3rem]">
              Start Your Journey
            </HeadingTag>

            <form
              className="mt-8 grid gap-5"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={inputLabelClassName}>Full Name</span>
                  <input type="text" placeholder="John Doe" className={inputFieldClassName} />
                </label>
                <label className="block">
                  <span className={inputLabelClassName}>Mobile Number</span>
                  <input type="tel" placeholder="+91 9797979797" className={inputFieldClassName} />
                </label>
              </div>

              <label className="block">
                <span className={inputLabelClassName}>Email Address</span>
                <input type="email" placeholder="Email Address" className={inputFieldClassName} />
              </label>

              <label className="block">
                <span className={inputLabelClassName}>Project Of Interest</span>
                <span className="relative mt-2.5 block border-b border-white/35 pb-2.5 transition focus-within:border-[#c5a46e]">
                  <select
                    defaultValue={defaultProject}
                    className="w-full appearance-none bg-transparent pr-8 text-[0.95rem] text-white outline-none"
                  >
                    <option value="orlean" className="bg-[#123a4c] text-white">
                      Global Edifice Orlean
                    </option>
                    <option value="clan" className="bg-[#123a4c] text-white">
                      Global Edifice The Clan
                    </option>
                    <option value="legacy" className="bg-[#123a4c] text-white">
                      Global Edifice Legacy
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-[#c5a46e]" />
                </span>
              </label>

              <label className="block">
                <span className={inputLabelClassName}>Your Message</span>
                <textarea
                  rows={3}
                  placeholder="Tell us about your dream home"
                  className={`${inputFieldClassName} resize-none`}
                />
              </label>

              <div className="pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 rounded-md bg-[#0f4157] px-7 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#164f69]"
                >
                  Submit Enquiry
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/55">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </div>
            </form>
          </div>

          <aside className="flex w-full flex-col rounded-[1.5rem] bg-white px-6 py-7 text-[#1f1d1b] shadow-[0_28px_60px_-36px_rgba(0,0,0,0.55)] md:px-8 md:py-8 lg:justify-self-end">
            <h3 className="font-display text-[1.85rem] leading-none text-[#1a1a1a] md:text-[2.1rem]">
              Contact Us
            </h3>

            <div className="mt-6 border-b border-[#ece7df] pb-5">
              <h4 className="font-display text-[1.25rem] leading-none text-[#b49a6c] md:text-[1.35rem]">
                {officeContact.eyebrow}
              </h4>
              <div className="mt-3.5 flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b49a6c] text-white">
                  <OfficeIcon className="h-3.5 w-3.5 stroke-[2.2]" />
                </span>
                <p className="text-[0.88rem] leading-[1.65] text-[#3a3835]">{officeContact.body}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-b border-[#ece7df] py-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b49a6c] text-white">
                <PhoneIcon className="h-3.5 w-3.5 stroke-[2.2]" />
              </span>
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#b49a6c]">
                  {phoneContact.eyebrow}
                </p>
                <a
                  href={`tel:${phoneContact.body.replace(/\s+/g, "")}`}
                  className="mt-1.5 block text-[0.92rem] font-medium leading-[1.55] text-[#1f1d1b] transition hover:text-[#0f4157]"
                >
                  {phoneContact.body}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 border-b border-[#ece7df] py-5">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b49a6c] text-white">
                <EmailIcon className="h-3.5 w-3.5 stroke-[2.15]" />
              </span>
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#b49a6c]">
                  {emailContact.eyebrow}
                </p>
                <a
                  href={`mailto:${emailContact.body}`}
                  className="mt-1.5 block text-[0.92rem] font-medium leading-[1.55] text-[#1f1d1b] transition hover:text-[#0f4157]"
                >
                  {emailContact.body}
                </a>
              </div>
            </div>

            <div className="pt-5">
              <h4 className="font-display text-[1.25rem] leading-none text-[#b49a6c] md:text-[1.35rem]">
                Follow Our Journey
              </h4>
              <div className="mt-3.5 flex items-center gap-2.5">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b49a6c] text-white transition hover:bg-[#0f4157]"
                >
                  <Facebook className="h-3.5 w-3.5 fill-current stroke-0" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b49a6c] text-white transition hover:bg-[#0f4157]"
                >
                  <Instagram className="h-3.5 w-3.5 stroke-[2.1]" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b49a6c] text-white transition hover:bg-[#0f4157]"
                >
                  <Linkedin className="h-3.5 w-3.5 fill-current stroke-0" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
