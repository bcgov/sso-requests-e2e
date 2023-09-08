import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 400000,
  includeShadowDom: true,
  responseTimeout: 400000,
  redirectionLimit: 100,
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: "https://bcgov.github.io/sso-requests-sandbox",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
