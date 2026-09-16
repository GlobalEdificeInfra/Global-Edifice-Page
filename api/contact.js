import { createParamantraHandler } from "./_lib/paramantra.js";

export default createParamantraHandler({
  apiKeyEnvVar: "PARAMANTRA_CONTACT_API_KEY",
  appNameEnvVar: "PARAMANTRA_CONTACT_APP_NAME",
  defaultAppName: "M5Lwo1805uHBoN",
  defaultChannelId: "Contact_us",
});
