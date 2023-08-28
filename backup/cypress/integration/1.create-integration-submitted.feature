#Owner :
#Date : 15-April-2022
#Describe about the test scenarios
@AccessSSO
Feature: Submit New Integration

    As an user
    I want to submit a new integration request
    so that I can have the access to the SSO service


    Background:
        Given User launch the url "https://bcgov.github.io/sso-requests-dev"
        And User navigates through SSO Request "https://bcgov.github.io/sso-requests-dev/my-dashboard/integrations" with Token 'INSERT TOKEN HERE'

    @AccessSSO
    Scenario: 01 - User notification for non-BCeID
        Given User is on CSS Dash Board page
        #Below is the reusable line for clicking on Button by Passing the button text in Gherkin line
        When User clicks on "+ Request SSO Integration" button
        #Below is the reusable line for inputting text box value by passing the textbox label and value
        And User Enter "CSS-HappyPath-end2end_Final1" on "Project Name" textbox
        #Below is the reusable line for selecting radio button by passing text for radio button and value for it
        And User select "No" for question "Would you like to allow multiple members to manage this integration?" on page
        And User select "Yes" for legend question "Are you the product owner or technical contact for this project?" on page
        And User clicks on "Next" button
        And User select "Public" for legend question "Choose SSO client type" on page
        And User select "IDIR + IDIR Azure Beta" for legend question "Identity Providers Required" on page
        And User Enters "https://localhost:3000" on "Dev Redirect URIs" legend textbox
        And User clicks on "Next" button
        #Below is reusableline for checkbox by passing value to select
        And User Checks "I agree to the Terms and Conditions"
        And User clicks on "Next" button
        #Below is reusable line for validation by passing values
        Then User validates information "Project Name" value is "CSS-HappyPath-end2end_Final1"
        And User validates information "Identity Providers Required" value is "idir"
        And User validates information "Dev Redirect URIs" value is "https://localhost:3000"
        And User clicks on "Submit" button
        And User clicks on "Confirm" button
        And User Verfiy "Status" is "Submitted" in Table
        And User waits for "20" minutes
        And User clicks on "Download" button
        Then User verifies the file "CSS-HappyPath-end2end_Final1" is downloaded for "dev"
        And User validates that downloaded file "CSS-HappyPath-end2end_Final1" for "dev" is not empty
        And User clicks on "Log out" button



#     And the integration does not include BCeID IDP
#     When the integration request is submitted
#     Then the requester receives an email (id: create-integration-submitted)
#     And SSO admin is cc'd on the email sent to the requester

# Scenario: Team notification for non-BCeID
#     Given the integration is associated with a team
#     And the integration does not include BCeID IDP
#     When the integration request is submitted
#     Then all team admins/members receive emails (id: create-integration-submitted)
#     And SSO admin is cc'd on the email sent to the team

# Scenario: User notification for BCeID in non-Prod
#     Given the integration is not associated with a team
#     And the integration includes BCeID IDP
#     And the integration does not include production environment
#     When the integration request is submitted
#     Then the requester receives an email (id: create-integration-submitted)
#     And SSO admin is cc'd on the email sent to the requester
#     And IDIM consulting receives an email (id: create-integration-submitted-bceid-nonprod-idim)
#     And SSO admin is cc'd on the email sent to IDIM consulting

# Scenario: Team notification for BCeID in non-Prod
#     Given the integration is associated with a team
#     And the integration includes BCeID IDP
#     And the integration does not include production environment
#     When the integration request is submitted
#     Then all team admins/members receive emails (id: create-integration-submitted)
#     And SSO admin is cc'd on the emails sent to the team admins/members
#     And IDIM consulting receives an email (id: create-integration-submitted-bceid-nonprod-idim)
#     And SSO admin is cc'd on the email sent to IDIM consulting

# Scenario: User notification for BCeID in Prod
#     Given the integration is not associated with a team
#     And the integration includes BCeID IDP
#     And the integration include production environment
#     When the integration request is submitted
#     Then the requester receives an email (id: create-integration-submitted-bceid-prod)
#     And SSO admin and IDIM consulting are cc'd on the email sent to the requester

# Scenario: Team notification for BCeID in Prod
#     Given the integration is associated with a team
#     And the integration includes BCeID IDP
#     And the integration include production environment
#     When the integration request is submitted
#     Then all team admins/members receive emails (id: create-integration-submitted-bceid-prod)
#     And SSO admin and IDIM consulting are cc'd on the email sent to the team
