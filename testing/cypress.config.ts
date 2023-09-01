import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  includeShadowDom: true,
  responseTimeout: 40000,
  redirectionLimit: 100,
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: "https://bcgov.github.io/sso-requests-sandbox",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
