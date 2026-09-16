import { createParamantraHandler } from "./_lib/paramantra.js";

export default createParamantraHandler({
  apiKeyEnvVar: "PARAMANTRA_ENQUIRY_API_KEY",
  defaultChannelId: "Contact_us",
});
