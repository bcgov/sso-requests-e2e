#Owner :
#Date : 30-May-2022
#Describe about the test scenarios
@AccessSSO @Gold @CreateRoles
Feature: Submit New Integration

    As an user
    I want to submit a new integration request
    so that I can have the access to the SSO service
    I  want to create and assign roles

    Background:
        Given User launch the url "https://bcgov.github.io/sso-requests-test"
        And User navigates through SSO Request "https://bcgov.github.io/sso-requests-test/my-dashboard/integrations" with Token '{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnQTNwVmd1VmRTZmVXWURETHVTcjhWZnVJRjIxU0pfRjNhRFZ3ZmJPYnB3In0.eyJleHAiOjE2NTQyMTczNDUsImlhdCI6MTY1NDE4MTM0NiwiYXV0aF90aW1lIjoxNjU0MTgxMzQ1LCJqdGkiOiIyMmMzMWZiNi01YzczLTQ5YmYtOWY4OC1hMTY5YWY4NTY4NzciLCJpc3MiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsImF1ZCI6InNzby1yZXF1ZXN0cyIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6InNzby1yZXF1ZXN0cyIsIm5vbmNlIjoiMTM2MzVjYTUtODY5Ny00MDlkLTlhN2MtOWNlMDYxM2Y4MzlhIiwic2Vzc2lvbl9zdGF0ZSI6ImQ5MjIzM2M1LTQ4MDgtNDk5ZC1iZWFhLTcyYjdjNWI2YjNiMCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9iY2dvdi5naXRodWIuaW8iLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImlkaXJfdXNlcmlkIjoiRjRENDU0NzIwNUYxNDlCRDg5QkI1NDk5NThCMkMxNEMiLCJzdWIiOiJqbW9oYW1tZUBpZGlyIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiJpZGlyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFmZmVyIE1vaGFtbWVkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam1vaGFtbWVAaWRpciIsImRpc3BsYXlfbmFtZSI6Ik1vaGFtbWVkLCBKYWZmZXIgQ0lUWjpFWCIsImdpdmVuX25hbWUiOiJKYWZmZXIiLCJmYW1pbHlfbmFtZSI6Ik1vaGFtbWVkIiwiZW1haWwiOiJqYWZmZXIubW9oYW1tZWRAZ292LmJjLmNhIn0.W26JfhxdS5aMa-GekPOL9vJajppEoq56pXB3dcWM2KMupGCg4ZnrWRF1IT9pNdSPtbfbLhX9rYHWn_iEW9DTqtP97U6NDoGqCmHVqPYj06u8OcK4eUYTHHbukL6PpbHx47g1_9mFkny_m9uar-nvmgDT3ASOXIOYpT43L2FK2C1GeE9GljXgm7_MBDUFoRNwB21hfrh6tnG-q5v3DhUCdkceWzkwwaa5r2eQQUJ6OaeDEBUf0TI2oYhW5RmCE6IsnAeXeXqBsUoLAwW_D8fgUs-g7qrDnRkbLXscSK6Xfv7_qmnWO1qWDwjwkhlZOzaoZB0SjuXv0O28eBG0z4UzFw","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1YzM3MWNlOC02ZTc1LTQ5MzEtYjM2NC1iOGRhMWUzMGQ0ZDgifQ.eyJleHAiOjE2NTQxODMxNDYsImlhdCI6MTY1NDE4MTM0NiwianRpIjoiOTY2NDY2NzktYzQyMy00ZDU3LTg3YzUtZGQyNDk0ZDE4ZDEyIiwiaXNzIjoiaHR0cHM6Ly9kZXYub2lkYy5nb3YuYmMuY2EvYXV0aC9yZWFsbXMvb25lc3RvcGF1dGgiLCJhdWQiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJzc28tcmVxdWVzdHMiLCJub25jZSI6IjEzNjM1Y2E1LTg2OTctNDA5ZC05YTdjLTljZTA2MTNmODM5YSIsInNlc3Npb25fc3RhdGUiOiJkOTIyMzNjNS00ODA4LTQ5OWQtYmVhYS03MmI3YzViNmIzYjAiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIn0.kvA_q9zoXhujE_bW62hJUuclsaGTkngQaZFdYAFcXWc","id_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnQTNwVmd1VmRTZmVXWURETHVTcjhWZnVJRjIxU0pfRjNhRFZ3ZmJPYnB3In0.eyJleHAiOjE2NTQyMTczNDUsImlhdCI6MTY1NDE4MTM0NiwiYXV0aF90aW1lIjoxNjU0MTgxMzQ1LCJqdGkiOiI2YTRhOGZlMy0yM2U0LTQwODktYTA0ZS1kODc4ZjhjMTlhNWEiLCJpc3MiOiJodHRwczovL2Rldi5vaWRjLmdvdi5iYy5jYS9hdXRoL3JlYWxtcy9vbmVzdG9wYXV0aCIsImF1ZCI6InNzby1yZXF1ZXN0cyIsInN1YiI6ImVjOTEyZjhlLWUxMjctNDMxOC1iZGZkLWQyMzE0NjAyMjQ1ZSIsInR5cCI6IklEIiwiYXpwIjoic3NvLXJlcXVlc3RzIiwibm9uY2UiOiIxMzYzNWNhNS04Njk3LTQwOWQtOWE3Yy05Y2UwNjEzZjgzOWEiLCJzZXNzaW9uX3N0YXRlIjoiZDkyMjMzYzUtNDgwOC00OTlkLWJlYWEtNzJiN2M1YjZiM2IwIiwiYWNyIjoiMSIsImlkaXJfdXNlcmlkIjoiRjRENDU0NzIwNUYxNDlCRDg5QkI1NDk5NThCMkMxNEMiLCJzdWIiOiJqbW9oYW1tZUBpZGlyIiwiaWRlbnRpdHlfcHJvdmlkZXIiOiJpZGlyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSmFmZmVyIE1vaGFtbWVkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam1vaGFtbWVAaWRpciIsImRpc3BsYXlfbmFtZSI6Ik1vaGFtbWVkLCBKYWZmZXIgQ0lUWjpFWCIsImdpdmVuX25hbWUiOiJKYWZmZXIiLCJmYW1pbHlfbmFtZSI6Ik1vaGFtbWVkIiwiZW1haWwiOiJqYWZmZXIubW9oYW1tZWRAZ292LmJjLmNhIn0.nHu3nY9uGs_WKFi606MoZfA5qnvpnH96n_aEebFv4db8A74oO6BRQHLuKZyYEJd1tmY80G4FtTfhqP2Kn5FY8dxn46_zjpcM9GWe-aKs6oFxT2Gd_OU5bey7_7IdMgub4L0bDslH9gvYR3mr_jDkJW1yDtOiiyDZp9hqi1mVtOpyL8ZK-ekdaaFrXpukZMl8UhFmmhUOOTd2cWpmebF0gPY5gIb8OsPPGXR1I4VweqNHRDPYSG7KBl42eB2hEajRZVNROx_lb8uTAakkOgBTpnLpqqziyGkKr0XTkssfm6NV9YIgTI-75fbnYx6lgBJO1GUuIVlAXaxpQp6oQpU_sA"}'


    Scenario: 04 - BCeID Basic Only No Teams and not an SSO ADMIN
        Given User is on CSS Dash Board page
        #Below is the reusable line for clicking on Button by Passing the button text in Gherkin line
        When User clicks on "+ Request SSO Integration" button
        #Below is the reusable line for inputting text box value by passing the textbox label and value
        And User Enter "CSS-HappyPath-end2end_GoldBCeidBasic02" on "Project Name" textbox
        #Below is the reusable line for selecting radio button by passing text for radio button and value for it
        And User select "No" for question "Would you like to allow multiple members to manage this integration?" on page
        And User select "Yes" for legend question "Are you the product owner or technical contact for this project?" on page
        And User clicks on "Next" button
        And User select "Public" for legend question "Select Client Type" on page
        And User select "BCeID Basic" for legend question "Choose Identity Provider(s)" on page
        And User select "Test" for legend question "Choose Environment(s)" on page
        And User clicks on "Next" button 
        And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        And User hover over info button for text "Keycloak Login Page Name" and verify the text "Enter a name that you would like to be displayed for users, as they're logging into the Keycloak Login Page."
        And User hover over info button for text "Redirect URIs" and verify the text "At least one redirect URI is required for each of DEV, TEST and PROD. If you don't know the redirect URI for one or"
        And User clicks on "Next" button
        And User Enters "https://localhost:3000" on "Redirect URIs" legend textbox at position "1"
        And User clicks on "Next" button
        #Below is reusableline for checkbox by passing value to select
        And User Checks "I agree to the Terms and Conditions"
        And User clicks on "Next" button
        #Below is reusable line for validation by passing values
        Then User validates information "Project Name" value is "CSS-HappyPath-end2end_GoldBCeidBasic02"
        And User validates information "Identity Providers Required" value is "bceidbasic"
        And User validates information "Dev Redirect URIs" value is "https://localhost:3000"
        And User clicks on "Submit" button
        And User clicks on "Confirm" button
        And User Verfiy "Status" is "Submitted" in Table
        And User Verfiy "Service Type" is "Gold" in Table
        And User waits for "20" minutes
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
        