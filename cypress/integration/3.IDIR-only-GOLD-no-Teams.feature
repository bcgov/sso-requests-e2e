#Owner :
#Date : 25-May-2022
#Describe about the test scenarios
@AccessSSO @Gold @CreateRoles
Feature: Submit New Integration

    As an user
    I want to submit a new integration request
    so that I can have the access to the SSO service
    I  want to create and assign roles

    Background:
        Given User launch the url "https://bcgov.github.io/sso-requests-test"
        And User navigates through SSO Request "https://bcgov.github.io/sso-requests-test/my-dashboard/integrations" with Token 'INSERT TOKEN HERE'

    @IDIROnlyGOLD
    Scenario: 03 - IDIR Only No Teams and not an SSO ADMIN
        Given User is on CSS Dash Board page
        Below is the reusable line for clicking on Button by Passing the button text in Gherkin line
        When User clicks on "+ Request SSO Integration" button
        #Below is the reusable line for inputting text box value by passing the textbox label and value
        And User Enter "CSS-HappyPath-end2end_Gold" on "Project Name" textbox
        #Below is the reusable line for selecting radio button by passing text for radio button and value for it
        And User select "No" for question "Would you like to allow multiple members to manage this integration?" on page
        And User select "Yes" for legend question "Are you the product owner or technical contact for this project?" on page
        And User hover over info button for text "Are you the product owner or technical contact for this project?" and verify the text "Only the person who is responsible for this project should be submitting the integration request."
        And User clicks on "Next" button
        And User select "Public" for legend question "Select Client Type" on page
        And User select "IDIR" for legend question "Choose Identity Provider(s)" on page
        And User select "Test" for legend question "Choose Environment(s)" on page
        And User select "Production" for legend question "Choose Environment(s)" on page
        And User clicks on "Next" button
        And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        And User hover over info button for text "Keycloak Login Page Name" and verify the text "Enter a name that you would like to be displayed for users, as they're logging into the Keycloak Login Page."
        And User hover over info button for text "Redirect URIs" and verify the text "At least one redirect URI is required for each of DEV, TEST and PROD. If you don't know the redirect URI for one or"
        And User clicks on "Next" button
        And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        And User clicks on "Next" button
        And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        And User clicks on "Next" button
        #Below is reusableline for checkbox by passing value to select
        And User Checks "I agree to the Terms and Conditions"
        And User clicks on "Next" button
        #Below is reusable line for validation by passing values
        Then User validates information "Project Name" value is "CSS-HappyPath-end2end_Gold"
        And User validates information "Identity Providers Required" value is "idir"
        And User validates information "Dev Redirect URIs" value is "https://localhost:3000"
        And User clicks on "Submit" button
        And User clicks on "Confirm" button
        And User Verfiy "Status" is "Submitted" in Table
        And User Verfiy "Service Type" is "Gold" in Table
        And User waits for "20" minutes
        And User clicks on "Download" button at position "1"
        And User clicks on "Download" button at position "2"
        And User clicks on "Download" button at position "3"
        Then User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "dev"
        And User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "test"
        And User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "prod"
        And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "dev" is not empty
        And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "test" is not empty
        And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "prod" is not empty
        Then User clicks on "Role Management" tab on screen
        Then User clicks on "Dev" tab on screen
        And User clicks on "+ Create a New Role" button
        And User Enters "RoleDev1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
        And User Enters "dev" on "Environments" textbox at row "1" on "Create New Role" pop-up
        And User clicks at "Add another role" icon on screen
        And User Enters "RoleTest1" on "Role Name" textbox at row "2" on "Create New Role" pop-up
        And User Enters "test" on "Environments" textbox at row "2" on "Create New Role" pop-up
        And User clicks at "Add another role" icon on screen
        And User Enters "RoleDev3" on "Role Name" textbox at row "3" on "Create New Role" pop-up
        And User Enters "prod" on "Environments" textbox at row "3" on "Create New Role" pop-up
        And User Enters "test" on "Environments" textbox at row "3" on "Create New Role" pop-up
        And User clicks on "Save" button at position "2"
        Then User clicks on "Test" tab on screen
        And User clicks on "+ Create a New Role" button
        And User Enters "RoleTest1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
        And User Enters "test" on "Environments" textbox at row "1" on "Create New Role" pop-up
        And User clicks at "Add another role" icon on screen
        And User Enters "RoleTest2" on "Role Name" textbox at row "2" on "Create New Role" pop-up
        And User Enters "prod" on "Environments" textbox at row "2" on "Create New Role" pop-up
        And User clicks on "Save" button at position "2"
        Then User clicks on "Prod" tab on screen
        And User clicks on "+ Create a New Role" button
        And User Enters "RoleProd1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
        And User Enters "dev" on "Environments" textbox at row "1" on "Create New Role" pop-up
        And User clicks at "Add another role" icon on screen
        And User Enters "RoleProd2" on "Role Name" textbox at row "2" on "Create New Role" pop-up
        And User Enters "test" on "Environments" textbox at row "2" on "Create New Role" pop-up
        And User clicks at "Add another role" icon on screen
        And User Enters "RoleProd3" on "Role Name" textbox at row "3" on "Create New Role" pop-up
        And User Enters "prod" on "Environments" textbox at row "3" on "Create New Role" pop-up
        And User clicks on "Save" button at position "2"
        Then User clicks on "Assign Users to Roles" tab on screen
        And User Enters "sso" on placeholder "Enter search criteria" textbox
        And User clicks on "Search" button at position "1"
        Then User cliks on "SSO Training" label in table
        And User Enters "RoleDev1" on "2. Assign User to a Role" legend textbox at position "1"
        Then User select "Test" in Environment dropdown
        And User Enters "sso" on placeholder "Enter search criteria" textbox
        And User clicks on "Search" button at position "1"
        Then User cliks on "SSO Training" label in table
        And User Enters "RoleTest1" on "2. Assign User to a Role" legend textbox at position "1"

# @AccessSSO @Gold @CreateRoles
# Scenario: 03 - IDIR Only No Teams and not an SSO ADMIN
#     Given User is on CSS Dash Board page
#     Below is the reusable line for clicking on Button by Passing the button text in Gherkin line
#     When User clicks on "+ Request SSO Integration" button
#     #Below is the reusable line for inputting text box value by passing the textbox label and value
#     And User Enter "CSS-HappyPath-end2end_Gold" on "Project Name" textbox
#     #Below is the reusable line for selecting radio button by passing text for radio button and value for it
#     And User select "No" for question "Would you like to allow multiple members to manage this integration?" on page
#     And User select "Yes" for legend question "Are you the product owner or technical contact for this project?" on page
#     And User Mousehovers on info icon for "Are you the product owner or technical contact for this project?" text
#     # And User clicks on "Next" button
#     # And User select "Public" for legend question "Select Client Type" on page
#     # And User select "IDIR" for legend question "Choose Identity Provider(s)" on page
#     # And User select "Test" for legend question "Choose Environment(s)" on page
#     # And User select "Production" for legend question "Choose Environment(s)" on page
#     # And User clicks on "Next" button
#     # And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
#     # And User clicks on "Next" button
#     # And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
#     # And User clicks on "Next" button
#     # And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
#     # And User clicks on "Next" button
#     # #Below is reusableline for checkbox by passing value to select
#     # And User Checks "I agree to the Terms and Conditions"
#     # And User clicks on "Next" button
#     # #Below is reusable line for validation by passing values
#     # Then User validates information "Project Name" value is "CSS-HappyPath-end2end_Gold"
#     # And User validates information "Identity Providers Required" value is "idir"
#     # And User validates information "Dev Redirect URIs" value is "https://localhost:3000"
#     # And User clicks on "Submit" button
#     # And User clicks on "Confirm" button
#     # And User Verfiy "Status" is "Submitted" in Table
#     # And User Verfiy "Service Type" is "Gold" in Table
#     # And User waits for "20" minutes
#     # And User clicks on "Download" button at position "1"
#     # And User clicks on "Download" button at position "2"
#     # And User clicks on "Download" button at position "3"
#     # Then User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "dev"
#     # And User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "test"
#     # And User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "prod"
#     # And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "dev" is not empty
#     # And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "test" is not empty
#     # And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "prod" is not empty
#     Then User clicks on "Role Management" tab on screen
#     Then User clicks on "Dev" tab on screen
#     And User clicks on "+ Create a New Role" button
#     And User Enters "RoleDev1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
#     And User Enters "dev" on "Environments" textbox at row "1" on "Create New Role" pop-up
#     And User clicks at "Add another role" icon on screen
#     And User Enters "RoleDev2" on "Role Name" textbox at row "2" on "Create New Role" pop-up
#     And User Enters "test" on "Environments" textbox at row "2" on "Create New Role" pop-up
#     And User clicks at "Add another role" icon on screen
#     And User Enters "RoleDev3" on "Role Name" textbox at row "3" on "Create New Role" pop-up
#     And User Enters "prod" on "Environments" textbox at row "3" on "Create New Role" pop-up
#     And User Enters "test" on "Environments" textbox at row "3" on "Create New Role" pop-up
#     And User clicks on "Save" button at position "2"
#     Then User clicks on "Test" tab on screen
#     And User clicks on "+ Create a New Role" button
#     And User Enters "RoleTest1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
#     And User Enters "test" on "Environments" textbox at row "1" on "Create New Role" pop-up
#     And User clicks at "Add another role" icon on screen
#     And User Enters "RoleTest2" on "Role Name" textbox at row "2" on "Create New Role" pop-up
#     And User Enters "prod" on "Environments" textbox at row "2" on "Create New Role" pop-up
#     And User clicks on "Save" button at position "2"
#     Then User clicks on "Prod" tab on screen
#     And User clicks on "+ Create a New Role" button
#     And User Enters "RoleProd1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
#     And User Enters "dev" on "Environments" textbox at row "1" on "Create New Role" pop-up
#     And User clicks at "Add another role" icon on screen
#     And User Enters "RoleProd2" on "Role Name" textbox at row "2" on "Create New Role" pop-up
#     And User Enters "test" on "Environments" textbox at row "2" on "Create New Role" pop-up
#     And User clicks at "Add another role" icon on screen
#     And User Enters "RoleProd3" on "Role Name" textbox at row "3" on "Create New Role" pop-up
#     And User Enters "prod" on "Environments" textbox at row "3" on "Create New Role" pop-up
#     And User clicks on "Save" button at position "2"
#     Then User clicks on "Assign Users to Roles" tab on screen
#     And User Enters "sso" on placeholder "Enter search criteria" textbox
#     And User clicks on "Search" button at position "1"
#     Then User cliks on "SSO Training" label in table
#     And User Enters "RoleDev1" on "2. Assign User to a Role" legend textbox at position "1"
