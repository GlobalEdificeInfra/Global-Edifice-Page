import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import geContactLounge from "@/assets/shared/ge-contact-lounge.jpg";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";
import {
  companyAddress,
  companyEmail,
  companyPhone,
  companySocial,
} from "@/lib/company";

const pageGutterClass = "px-[1.125rem] md:px-[1.8rem]";

const contactDetails = [
  {
    icon: MapPin,
    eyebrow: "Corporate Office",
    body: companyAddress,
  },
  {
    icon: Phone,
    eyebrow: "Give Us A Call",
    body: companyPhone.display,
  },
  {
    icon: Mail,
    eyebrow: "Send An Email",
    body: companyEmail.display,
  },
] as const;

const socialLinks = [
  { label: "Facebook", href: companySocial.facebook, Icon: Facebook },
  { label: "Instagram", href: companySocial.instagram, Icon: Instagram },
  { label: "LinkedIn", href: companySocial.linkedin, Icon: Linkedin },
  { label: "YouTube", href: companySocial.youtube, Icon: Youtube },
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
    "text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#c0a56e]";
  const inputFieldClassName =
    "mt-2.5 w-full border-b border-white/35 bg-transparent pb-2.5 text-[0.95rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#c0a56e]";
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
          className={`relative mx-auto grid max-w-7xl items-stretch gap-10 ${pageGutterClass} ${contentPadClass} lg:grid-cols-[minmax(0,1fr)_minmax(26rem,34rem)] lg:gap-10 xl:grid-cols-[minmax(0,1.05fr)_36rem] xl:gap-12`}
        >
          <div className="flex max-w-[38rem] flex-col text-white lg:pt-1">
            <div className="flex items-center gap-4">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#c0a56e]">
                Get In Touch
              </span>
              <span className="h-px w-10 bg-[#c0a56e]/80" />
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
                <span className="relative mt-2.5 block border-b border-white/35 pb-2.5 transition focus-within:border-[#c0a56e]">
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
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-0 h-4 w-4 -translate-y-1/2 text-[#c0a56e]" />
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

              <FormConsentCheckbox variant="dark" />

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

          <aside className="flex w-full flex-col justify-between rounded-[1.75rem] bg-[#fbf8f4] px-7 py-9 text-[#1f1d1b] shadow-[0_28px_60px_-36px_rgba(0,0,0,0.55)] md:px-10 md:py-10 lg:min-h-full lg:px-11 lg:py-12 lg:justify-self-end">
            <h3 className="font-display text-[2.05rem] leading-none text-[#1a1a1a] md:text-[2.35rem]">
              Contact Us
            </h3>

            <div className="mt-8 border-b border-[#ece7df] pb-7">
              <h4 className="font-display text-[1.35rem] leading-none text-[#c0a56e] md:text-[1.5rem]">
                {officeContact.eyebrow}
              </h4>
              <div className="mt-4 flex items-start gap-3.5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c0a56e] text-white">
                  <OfficeIcon className="h-4 w-4 stroke-[2.2]" />
                </span>
                <p className="text-[0.95rem] leading-[1.7] text-[#3a3835]">{officeContact.body}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-b border-[#ece7df] py-7">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c0a56e] text-white">
                <PhoneIcon className="h-4 w-4 stroke-[2.2]" />
              </span>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#c0a56e]">
                  {phoneContact.eyebrow}
                </p>
                <a
                  href={`tel:${phoneContact.body.replace(/\s+/g, "")}`}
                  className="mt-2 block text-[1.02rem] font-medium leading-[1.55] text-[#1f1d1b] transition hover:text-[#0f4157]"
                >
                  {phoneContact.body}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-b border-[#ece7df] py-7">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c0a56e] text-white">
                <EmailIcon className="h-4 w-4 stroke-[2.15]" />
              </span>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#c0a56e]">
                  {emailContact.eyebrow}
                </p>
                <a
                  href={`mailto:${emailContact.body}`}
                  className="mt-2 block text-[1.02rem] font-medium leading-[1.55] text-[#1f1d1b] transition hover:text-[#0f4157]"
                >
                  {emailContact.body}
                </a>
              </div>
            </div>

            <div className="pt-7">
              <h4 className="font-display text-[1.35rem] leading-none text-[#c0a56e] md:text-[1.5rem]">
                Follow Our Journey
              </h4>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c0a56e] text-white transition hover:bg-[#0f4157]"
                  >
                    <Icon
                      className={
                        label === "Instagram"
                          ? "h-4 w-4 stroke-[2.1]"
                          : label === "YouTube"
                            ? "h-4 w-4"
                            : "h-4 w-4 fill-current stroke-0"
                      }
                    />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
