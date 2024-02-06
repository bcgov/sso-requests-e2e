# Smoke Testing

## What is Smoke Testing?

Smoke testing, often referred to as "build verification testing," is a type of software testing that aims to verify the basic functionalities of an application for its stability before it undergoes further rigorous testing.

In the context of our test framework with Cypress, smoke tests are a subset of our broader test suite, designed to run quickly by focusing on the most critical features of the application. By utilizing runtime and data item indicators (booleans), we can dynamically label an entire test run as a smoke test, or selectively mark specific data items to be included in the smoke test scope.

This flexible approach allows us to ensure that our application's key functionalities work as expected after a new build or deployment, without the need for a full test suite run. Smoke tests act as an early warning system to catch major issues early in the development cycle, thereby enhancing the efficiency and reliability of our continuous integration and deployment pipelines.

## How to use Smoke Testing?

To run a smoke test, we need 2 things:

1. A way to identify which tests can be used as smoke tests.
2. A way to run only the smoke tests.

### Identifying Smoke Tests

Our framework supports the use of indicators to label tests as smoke tests. We can use a boolean flag to mark a test as a smoke test to selectively include or exclude a test from the smoke test scope.

For instance in our `request.json` data file, you can add a `smoketest` key to the test data item and set it to `true` to mark the test as a smoke test.

```json
    "delete": true,
    "smoketest": true
```

### Running Smoke Tests

Identifying a single data item as a smoke test is useful, but we also need a way to tell the framework to run only the smoke tests.

_Local Execution_:
To run only the smoke tests locally, we can set the `"smoketest": true` flag in our `cypress.env.json` file when running the test suite.

_CI/CD Execution_:
To run only the smoke tests in our GitHub Actions CI/CD pipeline, we can set the smoketest flag by answering the question or submitting "true" when calling the workflow_dispatch event.

```yaml
workflow_dispatch:
  inputs:
    smoketest:
      required: true
      description: 'Is this a smoke test?'
      default: 'false'
```

Example:

```bash
curl -X POST -H "Accept: application/vnd.github.v3+json" -H "Authorization: token <TOKEN>" https://api.github.com/repos/bcgov/sso-requests-e2e/actions/workflows/main-e2e.yml/dispatches -d '{"ref":"main", "inputs":{"smoketest":"true"}}'
```

## Conclusion

When a data item's smoke test flag is true _and_ the environment smoke test flag is true, the test will be included in the smoke test scope.

By using this approach, we can ensure that our application's key functionalities work as expected after a new build or deployment, without the need for a full test suite run. With the re-use of already written tests, we can save time and resources.
