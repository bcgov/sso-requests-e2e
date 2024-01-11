# Test Framework

The test framework is built using [Cypress](https://www.cypress.io/). Cypress is a JavaScript based test framework that allows for easy test creation and execution. Cypress is built on top of [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

## Characteristics of a Good Automated Testing Framework

1. **Usability**

   - The framework should be user-friendly. Even non-programmers should find it easy to create and run tests.
   - Clear and intuitive interface, potentially with a graphical UI.

2. **Scalability**

   - Should accommodate an increasing number of test cases as the project grows.

3. **Maintainability**

   - Easy to update, modify, or delete existing tests.
   - Supports version control.

4. **Flexibility**

   - Handles different types of tests such as unit, integration, system, and acceptance tests.

5. **Parallel Execution**

   - Supports running tests in parallel, either on the same machine or distributed across several.

6. **Integration with Other Tools**

   - Integrates with CI/CD pipelines, build tools, and version control systems.

7. **Support for Different Platforms and Browsers**

   - Allows testing across various browsers and platforms for web applications.

8. **Good Reporting**

   - Generates clear reports, highlighting passed tests, failed tests, and reasons for failures.

9. **Reusability**

   - Supports modular and reusable test scripts.

10. **Data-Driven Testing**

    - Allows input of data from various sources like databases and spreadsheets.

11. **Support for Mocking and Stubs**

    - Allows creation of mock objects and stubs for unit testing.

12. **Built-In Wait Mechanisms**

    - Has mechanisms to wait for events, elements, or conditions, which reduces test flakiness.

13. **Documentation and Community Support**

    - Comprehensive documentation and a strong community for issue resolution and plugins.

14. **Robustness**

    - Resilient to minor changes in the application.

15. **Continuous Improvement**

    - Regularly updated, adopting new techniques and best practices.

16. **Configuration Management**

    - Allows easy setup of different configurations for test environments.

17. **Security**
    - Protects sensitive test data and ensures that the testing process is secure.

## Current implementation

The list above is impressive and we are not there yet. The current implementation is a good start and we will continue to improve the framework as we go.

## Structure

![Structure](https://github.com/bcgov/sso-requests-e2e/blob/main/media/framework_structure.png)
