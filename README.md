![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)
# sso-requests-e2e

> **TLDR:** Let's run some tests - Follow the intructions [here](https://github.com/bcgov/sso-requests-e2e/wiki) to get started.

This repo contains the  E2E Test Framework for the [SSO Requests Application](https://bcgov.github.io/sso-requests-sandbox).


## What is in the directories?

The repo contains the test framework for the SSO Requests Application. The framework is based on [Cypress](https://www.cypress.io/). The framework is designed to be run in a CI/CD pipeline, but can also be run locally. 
It also contains several support directories for documentaton, media and testing.

### _.github/workflows_

Contains a sample workflows for running Cypress in Github actions and a full description of what is contained in the complex workflow. You can use this as a starting point for your own implementation.

### _docs_

Contains the [wiki](https://github.com/bcgov/sso-requests-e2e/wiki) documents. Updates to the wiki will be stored here and then automatically propagated to the wiki. Updates made to the wiki manually will be lost when the wiki is updated from here. The reason for this set up is providing traceability for the wiki content.

### _media_

Contains the media files used in our README-s and the Wiki.

### _testing_

The main test framework is contained in this directory. It is a standard Cypress framework with a few additions. 

#### _testing/cypress_

Contains the Cypress-based test framework. All tests and supporting files are contained in this directory.

##### _testing/cypress/appActions_

In this directory we store the actions for the application. Actions are used to store methods for interacting with the application.

##### _testing/cypress/pageObjects_

In this directory we store the page objects for the Cypress tests.
Page objects are used to store selectors and methods for interacting with the application.

This way we centralize the selectors and methods and can reuse them in multiple tests or when the application changes we would only have one location to change the definition.

## Useful Resources

- Official Cypress Documentation: https://docs.cypress.io/
- Cypress GitHub Repository: https://github.com/cypress-io/cypress
- Cypress Example Recipes: https://github.com/cypress-io/cypress-example-recipes
- Cypress Community: https://www.cypress.io/community/
