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
        And User navigates through SSO Request "https://bcgov.github.io/sso-requests-test/my-dashboard/integrations" with Token '{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnQTNwVmd1VmRTZmVXWURETHVTcjhWZnVJRjIxU0pfRjNhRFZ3ZmJPYnB3In0.eyJleHAiOjE2NTQwOTIxOTMsImlhdCI6MTY1NDA1NjE5NCwiYXV0aF90aW1lIjoxNjU0MDU2MTkzLCJqdGkiOiIxMzg2MGE3MS0zMGVkLTQ0YWYtYmZlYS1mYzIwYTA5ZGI1YTIiLCJpc3MiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsImF1ZCI6InNzby1yZXF1ZXN0cyIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6InNzby1yZXF1ZXN0cyIsIm5vbmNlIjoiYzFhMzkzMDktNjExMC00YWM4LThmMjYtZjI3NWI4ZDE5YmU0Iiwic2Vzc2lvbl9zdGF0ZSI6IjYyMTYxY2ZjLWZlMzMtNGM4Ni1hZDZhLWQ5YmNkNmJhNTU5MiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9iY2dvdi5naXRodWIuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImlkaXJfdXNlcmlkIjoiRjRENDU0NzIwNUYxNDlCRDg5QkI1NDk5NThCMkMxNEMiLCJzdWIiOiJqbW9oYW1tZUBpZGlyIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiJpZGlyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFmZmVyIE1vaGFtbWVkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam1vaGFtbWVAaWRpciIsImRpc3BsYXlfbmFtZSI6Ik1vaGFtbWVkLCBKYWZmZXIgQ0lUWjpFWCIsImdpdmVuX25hbWUiOiJKYWZmZXIiLCJmYW1pbHlfbmFtZSI6Ik1vaGFtbWVkIiwiZW1haWwiOiJqYWZmZXIubW9oYW1tZWRAZ292LmJjLmNhIn0.ao4vlLgC5Hjix1q3InGUdlFdLwiNtV6nI3rvspbA_d3PeNfgDzoZoi6br2AAEv5CY8m7bi4j1VBXFZAhPgQvs_Ju2xiljcG_ksYsdgYREJ9glaYcUy3IySjLcskZcCevbhlokAhJQtewzTYicAWJ54oR3IEpikb3IuIsP8AkBgN14t-ShdHCQkA7GAlQVFXAcPqwdF3R6U1QLXAWrkwJlkQNI2pR4d121IgEGDDgNAB2QmVPJf5ojpIhw2GnzgkT6UWX2-J-aREKvdh7fncfCLq6oLzO9whFtuf0z3s3AYCXv2w_ic3OCE_fFDK355eI9g3kgbYC3_rRJYqooGXVvQ","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1YzM3MWNlOC02ZTc1LTQ5MzEtYjM2NC1iOGRhMWUzMGQ0ZDgifQ.eyJleHAiOjE2NTQwNTc5OTQsImlhdCI6MTY1NDA1NjE5NCwianRpIjoiMDVlYWI3ZDUtYmMwNy00MTNiLTlkYTYtZjI3NDM2ODFhYWJkIiwiaXNzIjoiaHR0cHM6Ly9kZXYub2lkYy5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvb25lc3RvcGF1dGgiLCJhdWQiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJzc28tcmVxdWVzdHMiLCJub25jZSI6ImMxYTM5MzA5LTYxMTAtNGFjOC04ZjI2LWYyNzViOGQxOWJlNCIsInNlc3Npb25fc3RhdGUiOiI2MjE2MWNmYy1mZTMzLTRjODYtYWQ2YS1kOWJjZDZiYTU1OTIiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIn0.zk2JdSFF5QCz1kMPIGA6-uhcHNs5Vo34RN-P1C1wF8M","id_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnQTNwVmd1VmRTZmVXWURETHVTcjhWZnVJRjIxU0pfRjNhRFZ3ZmJPYnB3In0.eyJleHAiOjE2NTQwOTIxOTMsImlhdCI6MTY1NDA1NjE5NCwiYXV0aF90aW1lIjoxNjU0MDU2MTkzLCJqdGkiOiJhNDU4NGNjZS0wZDUyLTRlNGYtYjBmOS0yZGNmMzJhZTA4ZGUiLCJpc3MiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsImF1ZCI6InNzby1yZXF1ZXN0cyIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IklEIiwiYXpwIjoic3NvLXJlcXVlc3RzIiwibm9uY2UiOiJjMWEzOTMwOS02MTEwLTRhYzgtOGYyNi1mMjc1YjhkMTliZTQiLCJzZXNzaW9uX3N0YXRlIjoiNjIxNjFjZmMtZmUzMy00Yzg2LWFkNmEtZDliY2Q2YmE1NTkyIiwiYWNyIjoiMSIsImlkaXJfdXNlcmlkIjoiRjRENDU0NzIwNUYxNDlCRDg5QkI1NDk5NThCMkMxNEMiLCJzdWIiOiJqbW9oYW1tZUBpZGlyIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiJpZGlyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFmZmVyIE1vaGFtbWVkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam1vaGFtbWVAaWRpciIsImRpc3BsYXlfbmFtZSI6Ik1vaGFtbWVkLCBKYWZmZXIgQ0lUWjpFWCIsImdpdmVuX25hbWUiOiJKYWZmZXIiLCJmYW1pbHlfbmFtZSI6Ik1vaGFtbWVkIiwiZW1haWwiOiJqYWZmZXIubW9oYW1tZWRAZ292LmJjLmNhIn0.DYjSVnJEIxapkMPVdeuB4ELPs9c57s0vME0D-URq0nt6TXDkGGp9PfBeArA-u2bQDnm3Ij8mzwzr8m_owLhTnOOWS3dfSxyEZZ3_dN0wqFIB2b8hLGQ3LReNiVIziG2mFRlzruCC8pz9uygJo53kLSAKxBHak_K_jpSNCVNHulf8pzkJCoeNAfnFMn6SdUEBVmQurzI0EQUlJZ4ebxDUhyN2Df2m_e-Xygcesrm_gNGEwPgBGRw0NJPITuFFRW0GtIz2wsd9dJpc697_tJhxg1svdbcWkTKqZCi077jDGKhUkqghjhgTeUuStxKX1jDbyi9DuDhyd7SRbhjsJ3RHNg"}'


    Scenario: 03 - IDIR Only No Teams and not an SSO ADMIN
        Given User is on CSS Dash Board page
        #     Below is the reusable line for clicking on Button by Passing the button text in Gherkin line
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
        And User Enters "RoleDev2" on "Role Name" textbox at row "2" on "Create New Role" pop-up
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
