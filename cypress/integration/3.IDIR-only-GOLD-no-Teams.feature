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
        And User navigates through SSO Request "https://bcgov.github.io/sso-requests-test/my-dashboard/integrations" with Token '{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnQTNwVmd1VmRTZmVXWURETHVTcjhWZnVJRjIxU0pfRjNhRFZ3ZmJPYnB3In0.eyJleHAiOjE2NTQwMDYwNTEsImlhdCI6MTY1Mzk3MDA1MiwiYXV0aF90aW1lIjoxNjUzOTcwMDUxLCJqdGkiOiJmZmRjMjBkNS1lMmMwLTQyYTUtYmIxYi1iODQyZTQ1NTZkNWIiLCJpc3MiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsImF1ZCI6InNzby1yZXF1ZXN0cyIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6InNzby1yZXF1ZXN0cyIsIm5vbmNlIjoiMzVlY2ZjZTYtNmU0NC00MjY5LTg2ZjMtYzI2YTViNjlkMTY2Iiwic2Vzc2lvbl9zdGF0ZSI6ImI5MTQ4M2YyLTFlMGMtNGY0MC1hNTU1LTRmOWIxMGYxOWM5ZiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9iY2dvdi5naXRodWIuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImlkaXJfdXNlcmlkIjoiRjRENDU0NzIwNUYxNDlCRDg5QkI1NDk5NThCMkMxNEMiLCJzdWIiOiJqbW9oYW1tZUBpZGlyIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiJpZGlyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFmZmVyIE1vaGFtbWVkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam1vaGFtbWVAaWRpciIsImRpc3BsYXlfbmFtZSI6Ik1vaGFtbWVkLCBKYWZmZXIgQ0lUWjpFWCIsImdpdmVuX25hbWUiOiJKYWZmZXIiLCJmYW1pbHlfbmFtZSI6Ik1vaGFtbWVkIiwiZW1haWwiOiJqYWZmZXIubW9oYW1tZWRAZ292LmJjLmNhIn0.vs6bG9IuGCqpdpP7YyIThHtD3MPdQPpmV2sfXq3bDp8czdEx7RjTBuc491PV5bUUTeIHW2aYYUrFydhLfMPMdtgHuo_zMUJH8CbRLzH2wmQSV2_mbF4GtW4ONebyotoHssaPazl0KBV4XuOohySfvtbbrDkNlqSP2PgMydlUk0LUxUes53BjlogKjWTsKAsjJFVrSIxQuB_kW3_VvoKI6dQzmiExvEuYXpgeg0TCTbXdSnxVM_0SJU9UEyMIjg577S-OrfZmOi7VZeg0lgEca_7sW8CT2k9BKm6UfwOCZuatbSWBUiY6MmmbtreAXO7f6tajqzfbAT1dVVMXzea2cw","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1YzM3MWNlOC02ZTc1LTQ5MzEtYjM2NC1iOGRhMWUzMGQ0ZDgifQ.eyJleHAiOjE2NTM5NzE4NTIsImlhdCI6MTY1Mzk3MDA1MiwianRpIjoiNDAxNGZkNmYtMzViZi00NTZhLWJjNjUtMTBkOTk1YWNjZmFiIiwiaXNzIjoiaHR0cHM6Ly9kZXYub2lkYy5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvb25lc3RvcGF1dGgiLCJhdWQiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJzc28tcmVxdWVzdHMiLCJub25jZSI6IjM1ZWNmY2U2LTZlNDQtNDI2OS04NmYzLWMyNmE1YjY5ZDE2NiIsInNlc3Npb25fc3RhdGUiOiJiOTE0ODNmMi0xZTBjLTRmNDAtYTU1NS00ZjliMTBmMTljOWYiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIn0.lgcjN0Ggim4ba9CrrNJyKlPhxoG2l3qieJuO_yQZyAw","id_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnQTNwVmd1VmRTZmVXWURETHVTcjhWZnVJRjIxU0pfRjNhRFZ3ZmJPYnB3In0.eyJleHAiOjE2NTQwMDYwNTEsImlhdCI6MTY1Mzk3MDA1MiwiYXV0aF90aW1lIjoxNjUzOTcwMDUxLCJqdGkiOiI0MjdjZWZjZC1kYTEwLTQ4ZWQtYTk1MS01YmNkZTgyZWJjZGYiLCJpc3MiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsImF1ZCI6InNzby1yZXF1ZXN0cyIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IklEIiwiYXpwIjoic3NvLXJlcXVlc3RzIiwibm9uY2UiOiIzNWVjZmNlNi02ZTQ0LTQyNjktODZmMy1jMjZhNWI2OWQxNjYiLCJzZXNzaW9uX3N0YXRlIjoiYjkxNDgzZjItMWUwYy00ZjQwLWE1NTUtNGY5YjEwZjE5YzlmIiwiYWNyIjoiMSIsImlkaXJfdXNlcmlkIjoiRjRENDU0NzIwNUYxNDlCRDg5QkI1NDk5NThCMkMxNEMiLCJzdWIiOiJqbW9oYW1tZUBpZGlyIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiJpZGlyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFmZmVyIE1vaGFtbWVkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam1vaGFtbWVAaWRpciIsImRpc3BsYXlfbmFtZSI6Ik1vaGFtbWVkLCBKYWZmZXIgQ0lUWjpFWCIsImdpdmVuX25hbWUiOiJKYWZmZXIiLCJmYW1pbHlfbmFtZSI6Ik1vaGFtbWVkIiwiZW1haWwiOiJqYWZmZXIubW9oYW1tZWRAZ292LmJjLmNhIn0.ltRg0qUbegP3aVDMH-nzrMxCTuL9ASYh6vVuNT6vIWAM2ngQBTEU2H4k87WmRG0qIkBmK4QtkThL7Hprf-l0qDzbQrmW8xRgtC8slNDeFkDlwU3wnLqMKvJnsNg35UC4PMpI4Q2bg91gSYrbIyqtoTH0E6SNyHYyXSAmcBQuVS6nTHTqP7ipC7jFmt7Jh_Xh9Ka9WJf5LWETNeHZbBj5zKoA-Js3L-Bct3DIhb8YEKxAnSxs3Z6LhRL_uwr4XDEQn9oUZ1h9CvyuNAqmD3HKmTKJgwdRDh0MMuz8yHGN6JMt5YjKTDHmwXw71eUzQOl8eds_cn1gejNP_rPRp8pyCA"}'


    Scenario: 03 - IDIR Only No Teams and not an SSO ADMIN
        Given User is on CSS Dash Board page
        #     Below is the reusable line for clicking on Button by Passing the button text in Gherkin line
        When User clicks on "+ Request SSO Integration" button
        #Below is the reusable line for inputting text box value by passing the textbox label and value
        And User Enter "CSS-HappyPath-end2end_Gold" on "Project Name" textbox
        #Below is the reusable line for selecting radio button by passing text for radio button and value for it
        And User select "No" for question "Would you like to allow multiple members to manage this integration?" on page
        And User select "Yes" for legend question "Are you the product owner or technical contact for this project?" on page
        # And User clicks on "Next" button
        # And User select "Public" for legend question "Select Client Type" on page
        # And User select "IDIR" for legend question "Choose Identity Provider(s)" on page
        # And User select "Test" for legend question "Choose Environment(s)" on page
        # And User select "Production" for legend question "Choose Environment(s)" on page
        # And User clicks on "Next" button
        # And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        # And User clicks on "Next" button
        # And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        # And User clicks on "Next" button
        # And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        # And User clicks on "Next" button
        # #Below is reusableline for checkbox by passing value to select
        # And User Checks "I agree to the Terms and Conditions"
        # And User clicks on "Next" button
        # #Below is reusable line for validation by passing values
        # Then User validates information "Project Name" value is "CSS-HappyPath-end2end_Gold"
        # And User validates information "Identity Providers Required" value is "idir"
        # And User validates information "Dev Redirect URIs" value is "https://localhost:3000"
        # And User clicks on "Submit" button
        # And User clicks on "Confirm" button
        # And User Verfiy "Status" is "Submitted" in Table
        # And User Verfiy "Service Type" is "Gold" in Table
        # And User waits for "20" minutes
        # And User clicks on "Download" button at position "1"
        # And User clicks on "Download" button at position "2"
        # And User clicks on "Download" button at position "3"
        # Then User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "dev"
        # And User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "test"
        # And User verifies the file "CSS-HappyPath-end2end_Gold" is downloaded for "prod"
        # And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "dev" is not empty
        # And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "test" is not empty
        # And User validates that downloaded file "CSS-HappyPath-end2end_Gold" for "prod" is not empty
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
