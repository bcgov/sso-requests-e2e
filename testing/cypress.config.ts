import { defineConfig } from 'cypress';
import fs from 'fs';

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 40000,
  includeShadowDom: true,
  responseTimeout: 40000,
  redirectionLimit: 100,
  experimentalStudio: true,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 10,
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',
  reporterOptions: {
    files: ['./mochawesome-report/*.json'],
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    baseUrl: 'https://bcgov.github.io/sso-requests-sandbox/',
    projectId: 'gctfmh',
    setupNodeEvents(on, config) {
      on('task', {
        checkFileExists(filePath) {
          // Check if the file exists
          if (fs.existsSync(filePath)) {
            return true;
          } else {
            return false;
          }
        },
      });
    },
  },
});
