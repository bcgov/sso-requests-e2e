# Test Specs

This directory contains Cypress test specs.

To run the tests, run: `npx cypress run --browser "chrome"` from the root of the project (/testing). Or, you can run `npm run test`. This will run all of the tests in the `cypress/e2e` directory.
To only run the smoke tests use: `npx cypress run --spec 'cypress/e2e/**/smoke-*-*.cy.ts' --browser chrome`. Or, you can run `npm run smoke`. This will run all of the smoke tests in the `cypress/e2e` directory.

It is important to specify the correct browser when running your tests. If you do not specify a browser, Cypress will try to run in Electron, which is not supported by the application.

## Smoke Tests
The smoke tests are meant to be used in the CI/CD pipeline to ensure that the application is working as expected. These tests are not meant to be used for development purposes.

