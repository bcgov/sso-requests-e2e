import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "4c5wm1",
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  includeShadowDom: true,
  responseTimeout: 40000,
  redirectionLimit: 100,
  env: {
    BaseUrl: "https://bcgov.github.io/sso-requests-dev",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
