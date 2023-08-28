# SSO Requests E2E Automated Testing

## Running E2E Tests with Cypress

https://docs.cypress.io/guides/end-to-end-testing/testing-your-app

To execute your automated tests with Cypress, you can run them locally, through Docker, or on GitHub Actions.
Examples are provided for each of these options, making it easy to implement running on OpenShift as well. During the test run, Cypress offers console reporting that shows the test results in real-time.

- Local running: `npx cypress run`
- Github Action [Examples](https://github.com/bcgov/automated-testing/tree/main/.github/workflows)

The preference is for running your tests locally (during development) and then in GitHub actions during your CI/CD

In addition to console reporting, Cypress also provides reporting in GitHub after a run in GitHub Actions. This is useful for tracking and analyzing test results over time. Cypress also offers reporting in the interactive test creation tool when running an individual test locally. This is helpful for debugging and identifying issues with individual tests.
