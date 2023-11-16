import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 4000,
  includeShadowDom: true,
  responseTimeout: 4000,
  redirectionLimit: 100,
  experimentalStudio: true,
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: "mochawesome",
  reporterOptions: {
    files: ["./mochawesome-report/*.json"],
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: "https://bcgov.github.io/sso-requests-sandbox",
    projectId: "gctfmh",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
