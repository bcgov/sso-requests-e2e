# Test Framework

The test framework is built using [Cypress](https://www.cypress.io/). Cypress is a JavaScript based test framework that allows for easy test creation and execution. Cypress is built on top of [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

## Characteristics of a Good Automated Testing Framework

A test automation framework serves several key purposes in the software development and testing lifecycle, aiming to enhance efficiency, maintainability, and overall quality of the testing process. Below are the primary objectives and benefits of employing a test automation framework:

1. **Efficiency and Speed**: Automation frameworks accelerate the testing process, enabling faster execution of tests compared to manual testing. This is especially beneficial for repetitive yet critical tests like regression and smoke testing.

2. **Consistency and Standardization**: Frameworks provide a standardized approach to writing and executing tests, ensuring consistency in style and structure across teams and projects, which facilitates understanding and collaboration.

3. **Reusability of Code**: By promoting code reuse, such as test scripts and libraries, frameworks significantly reduce the effort required to write and maintain test cases, thanks to modularization and the use of setup/teardown methods.

4. **Improved Test Coverage**: Automation frameworks facilitate higher test coverage, allowing for extensive testing of various input and output combinations in a shorter time, which might be impractical manually.

5. **Better Error Detection**: Automated tests are adept at consistently identifying errors and regressions early in the development cycle, reducing the cost and time for bug fixes.

6. **Integration with CI/CD Processes**: Frameworks can be integrated into CI/CD pipelines, ensuring automated tests run with every code commit or deployment, thus identifying and addressing issues as part of the development process.

7. **Reporting and Analytics**: Most frameworks offer detailed reporting and analytics, providing insights into test results, execution times, and logs for debugging, crucial for continuous improvement.

8. **Flexibility and Scalability**: A well-designed framework accommodates changes in testing requirements or the application itself and allows for scaling testing efforts without significant increases in time or cost.

9. **Enhanced Collaboration**: By offering a common platform and standardized practices, frameworks improve collaboration among QA engineers, developers, and other stakeholders, ensuring early defect identification and quality product delivery.

In essence, the purpose of a test automation framework is to provide an efficient, reliable, and scalable approach to automated testing, thereby improving software product quality while reducing the resources and time required for testing.

## Current implementation

The list above is impressive and we are not there yet. The current implementation is a good start and we will continue to improve the framework as we go.

## Structure

![Structure](https://github.com/bcgov/sso-requests-e2e/blob/main/media/framework_structure.png)
