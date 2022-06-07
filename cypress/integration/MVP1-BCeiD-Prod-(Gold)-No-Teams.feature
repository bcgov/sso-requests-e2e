#Owner :
#Date : 06-June-2022
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

    # Create the Integration Scneario 3 and once it's approved, run the below test to complete MVP1
    Scenario: 05 - BCeiD Prod (Gold) No Teams
        And User clicks on "Download" button at position "1"
        And User clicks on "Download" button at position "2"
        Then User verifies the file "CSS-HappyPath-end2end_GoldBCeidBasic02" is downloaded for "dev"
        And User verifies the file "CSS-HappyPath-end2end_GoldBCeidBasic02" is downloaded for "test"
        And User validates that downloaded file "CSS-HappyPath-end2end_GoldBCeidBasic02" for "dev" is not empty
        And User validates that downloaded file "CSS-HappyPath-end2end_GoldBCeidBasic02" for "test" is not empty
        Then User clicks on "Role Management" tab on screen
        Then User clicks on "Dev" tab on screen
        And User clicks on "+ Create a New Role" button
        And User Enters "RoleDev1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
        And User Enters "dev" on "Environments" textbox at row "1" on "Create New Role" pop-up
        And User clicks at "Add another role" icon on screen
        And User Enters "RoleDev2" on "Role Name" textbox at row "2" on "Create New Role" pop-up
        And User Enters "test" on "Environments" textbox at row "2" on "Create New Role" pop-up
        And User clicks on "Save" button at position "2"
        Then User clicks on "Test" tab on screen
        And User clicks on "+ Create a New Role" button
        And User Enters "RoleTest1" on "Role Name" textbox at row "1" on "Create New Role" pop-up
        And User Enters "test" on "Environments" textbox at row "1" on "Create New Role" pop-up
        And User clicks on "Save" button at position "2"
        Then User clicks on "Assign Users to Roles" tab on screen
        And User Enters "002C1E0F30FA48E782809A0726EF263C" on placeholder "Enter search criteria" textbox
        And User clicks on "Search" button at position "1"
        Then User cliks on "hello@hello.com" label in table
        And User Enters "RoleDev1" on "2. Assign User to a Role" legend textbox at position "1"
        
