import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/legal-page-layout";

const TERMS_TITLE = "Terms of Use - Global Edifice";
const TERMS_DESCRIPTION =
  "Read the terms of use for Global Edifice, including website access, intellectual property, liabilities, and applicable law.";

type TermsSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const termsSections: TermsSection[] = [
  {
    id: "terms-of-use",
    title: "Terms of Use",
    paragraphs: [
      'These terms of use, together with the documents referred to in them, set out the terms on which you may make use of our website www.globaledifice.com and any other websites operated by us ("our sites"), whether as a guest or a registered user. Use of our sites includes accessing, browsing, or registering to use our sites.',
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms of Use",
    paragraphs: [
      "By proceeding to view our sites or any part of them, you acknowledge that you have read, understood, and accepted these terms which constitute the entire binding agreement between you and Global Edifice. These terms may be varied from time to time and the revised terms will be deemed to apply at the relevant time in respect of your registration and or use of our sites.",
      "Please read these terms carefully before you start using our sites, as they apply to your use of all our sites. If you do not agree to these terms, you must not use our sites.",
      "Please check this page from time to time to take notice of any changes we make that are binding on you.",
    ],
  },
  {
    id: "accuracy-of-information",
    title: "Accuracy of Information",
    paragraphs: [
      "We may update our sites from time to time and may change the content at any time. Although we make reasonable efforts to update the information on our sites, any content may be out of date at any given time and we are under no obligation to update it.",
      "We do not guarantee that our sites, or their content, will be free from errors or omissions. Global Edifice excludes all liability for any errors or omissions in the content to the fullest extent permitted by law.",
      "The information contained on our sites is provided for general guidance and illustrative purposes only. It is not intended to amount to advice on which you should rely. Reasonable care has been taken in providing this information, but Global Edifice, its related companies, representatives, consultants, agents and, where applicable, sellers or lessors of a property whose agents we may be, accept no responsibility for and exclude any liability for any loss or damage arising out of or related to the accuracy or completeness of any information contained on our sites or any action taken in reliance on such information.",
      "You should take appropriate steps to verify any information contained on our sites by inspecting the property and any other relevant documentation and, where applicable, seek proper legal, tax, and independent financial advice from a qualified professional adviser before taking or refraining from any action on the basis of the content on our sites. Nothing on our sites shall be regarded or taken as legal or financial advice.",
    ],
    bullets: [
      "All descriptions, dimensions, references to condition, permissions for use and occupation, and other details are given in good faith but should not be relied on as statements or representations of fact without independent verification.",
      "Commentary, descriptions, figures, calculations, example financial projections, plans, images, and representations are illustrative only.",
      "Images and plans may include artist impressions and computer-generated visuals which are not to scale.",
      "Changes to the property may be made during planning or development stages, and dimensions, fittings, finishes, ongoing costs, specifications, and representations are subject to change without notice.",
      "Measurements are taken at the widest points of rooms, except on angled walls where measurements are generally taken at the centre of the room.",
      "Apartment numbers are for sales purposes only and postal addresses may differ.",
      "All journey times stated are approximate.",
    ],
  },
  {
    id: "accessing-our-websites",
    title: "Accessing our Websites",
    paragraphs: [
      "Our sites are made available free of charge. If you are provided with a user identification code, password, or otherwise as part of our security procedures, you must treat such information as confidential and must not disclose it to any third party.",
      "We have the right to disable any user identification code or password, whether chosen by you or allocated by us, at any time if, in our reasonable opinion, you have failed to comply with any of the provisions of these terms.",
      "We do not guarantee that our sites, or any content on them, will always be available or be uninterrupted. Access is permitted on a temporary basis, and we may suspend, withdraw, discontinue, or change all or any part of our sites without notice. You are responsible for making all arrangements necessary to access our sites and for ensuring that all persons who access our sites through your internet connection comply with these terms.",
    ],
  },
  {
    id: "intellectual-property-rights",
    title: "Intellectual Property Rights",
    paragraphs: [
      "We are the owner or the licensee of all intellectual property rights in our sites and in the material published on them. All copyright, database rights, and any other intellectual property rights which subsist in the design, layout, processes, functions, data, and content of our sites are the property of Global Edifice or our licensors, information providers, or contributors, and we reserve all our rights in the same.",
      "No part of our sites, their content, or any of their underlying software and databases may be copied, reproduced, shared with third parties, reverse engineered, reverse assembled, or used to create any derivative work, whether in physical or electronic form, without our prior written consent.",
      "You may print off one copy and may download extracts of any pages from our sites for your personal use, and you may draw the attention of others within your organisation to content posted on our sites. You must not modify printed or digital copies, use illustrations, photographs, video, audio, or graphics separately from any accompanying text, or use any part of the content for commercial purposes without obtaining a licence from us or our licensors.",
      "If you print off, copy, or download any part of our sites in breach of these terms, your right to use our sites will cease immediately and you must, at our option, return or destroy any copies of the materials you have made.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    paragraphs: [
      "To the extent permitted by law, we exclude all conditions, warranties, representations, or other terms which may apply to our sites or any content on them, whether express or implied.",
      "We will not be liable to any user for any loss or damage, whether in contract, tort including negligence, breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with the use of, or inability to use, our sites, or use of or reliance on any content displayed on our sites.",
      "If you are a business user, we will not be liable for loss of profits, sales, business, or revenue, business interruption, loss of anticipated savings, loss of business opportunity, goodwill or reputation, or any indirect or consequential loss or damage.",
      "If you are a consumer user, we provide our sites for domestic and private use only. You agree not to use our sites for any commercial or business purposes, and we have no liability to you for any loss of profit, business, interruption, or business opportunity.",
      "We will not be liable for any loss or damage caused by a virus, distributed denial-of-service attack, or other technologically harmful material that may infect your computer equipment, programs, data, or other proprietary material due to your use of our sites or to your downloading of any content on them or on any website linked to them.",
    ],
  },
  {
    id: "viruses",
    title: "Viruses",
    paragraphs: [
      "We do not guarantee that our sites will be secure or free from bugs or viruses.",
      "You are responsible for configuring your information technology, computer programmes, and platform in order to access our sites. You should use your own virus protection software.",
      "You must not misuse our sites by knowingly introducing viruses, trojans, worms, logic bombs, or other malicious or technologically harmful material. You must not attempt to gain unauthorised access to our sites, the server on which our sites are stored, or any server, computer, or database connected to our sites. In the event of such a breach, your right to use our sites will cease immediately.",
    ],
  },
  {
    id: "links",
    title: "Links",
    paragraphs: [
      "Where our sites contain links to other sites and resources provided by third parties, these links are provided for your information only. We have no control over the contents of those sites or resources and assume no responsibility for them.",
      "You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it. You must not establish a link in a way that suggests any form of association, approval, or endorsement on our part where none exists, and you must not establish a link to our site in any website that is not owned by you.",
      "Our site must not be framed on any other site, nor may you create a link to any part of our site other than the home page. We reserve the right to withdraw linking permission without notice. If you wish to make any use of content on our sites other than that set out above, please contact info@globaledifice.com.",
    ],
  },
  {
    id: "other-applicable-terms",
    title: "Other Applicable Terms",
    paragraphs: [
      "Our Privacy Policy sets out the terms on which we process any personal data we collect from you or that you provide to us.",
      "Our Disclaimer sets out the terms on which we reserve the right to make changes in any way, at any time and for any reason, without prior notice, to the contents and information on this site, including materials, equipment, specifications, prices, and availability.",
      "Our RERA Disclaimer encourages customers to check the legitimacy of real estate properties in Bangalore by reviewing applicable RERA approvals and clearance certificates.",
      "By using our sites, you consent to such processing and warrant that all data provided by you is accurate.",
    ],
  },
  {
    id: "applicable-law",
    title: "Applicable Law",
    paragraphs: [
      "If you are a consumer, please note that these terms, their subject matter, and their formation are governed by Indian law. You and we both agree that the Courts of Karnataka, India will have non-exclusive jurisdiction.",
    ],
  },
];

export const Route = createFileRoute("/termsandconditions")({
  component: TermsAndConditionsPage,
  head: () => ({
    meta: [{ title: TERMS_TITLE }, { name: "description", content: TERMS_DESCRIPTION }],
  }),
});

function TermsDocument() {
  return (
    <>
      {termsSections.map((section) => (
        <section key={section.id} className="border-t border-dashed border-[#cccccc] pt-5">
          <h3 className="text-[1rem] font-semibold text-[#111111] md:text-[1.05rem]">
            {section.title}
          </h3>
          <div className="mt-2 space-y-4 text-[0.82rem] font-medium leading-[1.8] text-[#111111] md:text-[0.88rem]">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {section.bullets ? (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.82rem] font-medium leading-[1.8] text-[#111111] md:text-[0.88rem]">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section className="border-t border-dashed border-[#cccccc] pt-5">
        <h3 className="text-[1rem] font-semibold text-[#111111] md:text-[1.05rem]">Contact Us</h3>
        <p className="mt-2 text-[0.82rem] font-medium leading-[1.8] text-[#111111] md:text-[0.88rem]">
          If you have any queries regarding our Terms of Use, the practices of this site, or your
          dealings with this site, please email your queries at{" "}
          <a href="mailto:info@globaledifice.com" className="text-[#1056c0] hover:underline">
            info@globaledifice.com
          </a>
        </p>
        <p className="mt-4 text-[0.82rem] font-medium leading-[1.8] text-[#111111] md:text-[0.88rem]">
          Thank you for visiting our websites.
        </p>
      </section>
    </>
  );
}

function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms of Use">
      <TermsDocument />
    </LegalPageLayout>
  );
}
