/** Shared company contact, social, and project microsite URLs. */

export const companyAddress =
  "966, 3rd Floor, 27th Main, 8th Cross Rd, 1st Sector, HSR Layout, Bangalore, Karnataka 560102";

export const companyPhone = {
  display: "+91 94116 14444",
  tel: "tel:+919411614444",
} as const;

export const companyEmail = {
  display: "sales@globaledifice.com",
  mailto: "mailto:sales@globaledifice.com",
} as const;

export const companyWhatsApp = {
  display: "+91 89515 70039",
  href: "https://wa.me/918951570039",
} as const;

export const companySocial = {
  facebook: "https://www.facebook.com/Globaledifce/",
  instagram: "https://www.instagram.com/global.edifice/",
  // TODO: replace with the real X (Twitter) profile URL.
  x: "#",
  linkedin:
    "https://www.linkedin.com/company/global-edifice-top-construction-company-in-bangalore/?viewAsMember=true",
  youtube: "https://www.youtube.com/@Globaledifice",
} as const;

export const projectMicrosites = {
  theClan: "https://www.globaledificetheclan.in/",
  orlean: "https://globaledificeorlean.com/",
} as const;
