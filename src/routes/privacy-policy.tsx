import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/legal-page-layout";

const PRIVACY_TITLE = "Privacy Policy";
const PRIVACY_DESCRIPTION =
  "Read the privacy policy for Global Edifice, including how we collect, use, protect, and share your personal information.";

type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
};

const privacySections: PrivacySection[] = [
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    paragraphs: [
      'Global Edifice and its group companies (that is, our subsidiaries, our ultimate holding company and its subsidiaries) ("we", "our", "us", or “Global Edifice”) are committed to protecting and respecting your privacy. This privacy policy (together with our terms of use and any other documents referred to on it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it. By visiting www.globaledifice.com, or any other of our websites to which this privacy policy applies ("Sites") or otherwise providing us with information you are accepting and consenting to the practices described in this policy.',
    ],
  },
  {
    id: "personal-identification",
    title: "Personal Identification Information",
    paragraphs: [
      "We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number. Users may, however, visit our Site anonymously. Users can always refuse to supply personal identification information, except that it may prevent them from engaging in certain Site related activities.",
    ],
  },
  {
    id: "non-personal-identification",
    title: "Non-Personal Identification Information",
    paragraphs: [
      "We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means the type of connection to our Sites, such as the operating system and the Internet service providers utilised and other similar information.",
    ],
  },
  {
    id: "web-browser-cookies",
    title: "Web Browser Cookies",
    paragraphs: [
      'Our Site may use "cookies" to enhance User experience. User\'s web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. Users may choose to set their web browser to refuse cookies or to alert the Users when cookies are being sent. If they do so, note that some parts of the Site may not function properly. This is a standard operating procedure that is used across the internet.',
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Collected Information",
    paragraphs: [
      "Global Edifice may collect and use User's personal information for the following purposes:",
      "To improve customer service: Information provided by Users helps us respond to the customer service requests and support needs, more efficiently.",
      "To personalise User experience: We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.",
      "To improve our Site: We may use feedback provided by the User/s to improve our products and services.",
      "To run a promotion, contest, survey or other Site feature. To send the User/s information they agreed to receive about topics of interest to them. To send periodic emails.",
    ],
  },
  {
    id: "how-we-protect-information",
    title: "How we protect User's information",
    paragraphs: [
      "We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorised access, alteration, disclosure or destruction of User's personal information and data stored on our Site. As with data security, there are limits to its effectiveness and we indemnify ourselves in the event of an attack that is difficult to defend against. We also will do our best to retrieve any data that is lost as per available resources.",
    ],
  },
  {
    id: "sharing-personal-information",
    title: "Sharing personal information of Users",
    paragraphs: [
      "We do not sell, trade, or rent User's personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding User's with our subsidiaries, our business partners, trusted affiliates and advertisers for the purposes outlined above.",
    ],
  },
  {
    id: "changes-to-policy",
    title: "Changes to this Privacy Policy",
    paragraphs: [
      "Global Edifice shall update this privacy policy at its sole discretion. Users are advised to check this page for any changes in the privacy policy and to stay informed about how the personal information of the Users is protected by us. The Users hereby acknowledge and agree that it is their responsibility to review this privacy policy periodically and become aware of modifications.",
    ],
  },
  {
    id: "acceptance",
    title: "Your Acceptance of these Terms",
    paragraphs: [
      "By using this Site, the Users signify their acceptance of this policy as may be modified from time to time. Users are advised not to access this site if they do not agree to our privacy policy. The above mentioned privacy policy shall be applicable to the information and data collected by our call centres as well.",
    ],
  },
];

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: `${PRIVACY_TITLE} - Global Edifice` },
      { name: "description", content: PRIVACY_DESCRIPTION },
    ],
  }),
});

function PrivacyDocument() {
  return (
    <>
      {privacySections.map((section) => (
        <section key={section.id} className="border-t border-dashed border-[#cccccc] pt-5">
          <h3 className="text-[1rem] font-semibold text-[#111111] md:text-[1.05rem]">
            {section.title}
          </h3>
          <div className="mt-2 space-y-4 text-base font-normal leading-[1.8] text-[#111111]">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="border-t border-dashed border-[#cccccc] pt-5">
        <h3 className="text-[1rem] font-semibold text-[#111111] md:text-[1.05rem]">Contact Us</h3>
        <p className="mt-2 text-base font-normal leading-[1.8] text-[#111111]">
          If you have any queries regarding our Terms of Use, the practices of this site, or your
          dealings with this site, please email your queries at{" "}
          <a href="mailto:info@globaledifice.com" className="text-[#1056c0] hover:underline">
            info@globaledifice.com
          </a>
        </p>
        <p className="mt-4 text-base font-normal leading-[1.8] text-[#111111]">
          Thank you for visiting our websites.
        </p>
      </section>
    </>
  );
}

function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <PrivacyDocument />
    </LegalPageLayout>
  );
}
