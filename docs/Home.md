# SSO Requests E2E Automated Testing

## Running E2E Tests

Built test can be run locally or in a CI/CD pipeline.

### Prerequisites

In order to run the tests locally, you will need to do the following:

- Clone the repo
- Navigate to the root of the tests **(<repo>/testing)**
  - run `npm install` (Only needs to run once or when you change the config.)
  - Copy cypress.env.example.json to cypress.env.json and fill in the parameters. (This file will be ignored when you upload your code)
    - edit the values as per your configs
  - Run `npx cypress open` to open the interactive Cypress test runner
  - Click on the test you want to run [Quick Cypress overview below](https://github.com/bcgov/sso-requests-e2e/edit/main/docs/Home.md#cypress-overview)
    or
  - If you simply want to run all your tests: `npx cypress run --browser chrome`
  - Alternatively you can run your tests by:
    - `npm run test`
    - `npm run smoke` - Only runs the smoke tests

### Running Tests in GitHub Actions

Github Action [workflow](https://github.com/bcgov/sso-requests-e2e/blob/main/.github/workflows/cypress-complex-auto.yaml)

The workflow is currently triggered on a manual start `workflow_dispatch`. It will run the tests in a headless browser and report the results in GitHub.
Integrated in a CI the workflow is triggered on push to the main branch or a PR.

### Test Results
In addition to console reporting, Cypress also provides reporting in GitHub after a run in GitHub Actions. This is useful for tracking and analyzing test results over time. 

Cypress also offers reporting in the interactive test creation tool when running an individual test locally. This is helpful for debugging and identifying issues with individual tests.


### Cypress Overview

By default the tests will run in the `Electron Browser` 

When running the test, wait for the timer to finish or look for the green check near the test name
![image](https://github.com/bcgov/sso-requests-e2e/assets/56739669/4bcb236e-407e-4feb-b9bf-256dbaff2a54)

To confirm the test is complete, you can see results based on the pass(green check) or fail (red x) status.

![image](https://github.com/bcgov/sso-requests-e2e/assets/56739669/1aefd733-b591-4e3b-b5e8-b1d22fd95cc4)

