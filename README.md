# sso-requests-e2e

The Automation process workflow is for end to end testing

## About

This is a ATDD/BDD framework tool , cypress.io to Automate the single-sign-on request process from end to end.
It consists of:

- Cypress folder that consists of different folders like downloads,fixture, integration, plugins,and support
- Fixture folder consists of json files to store and maintain values
- Integration folder consists of all the codes, feature files and Step Definations
- Plugins folder consists of index.js file that defines cypress-cucumber-preprocessor
- Support folder consists of command.js and index.js. Command.js is used to create utility programs and index.js that includes cucumber hooks like "before" and "after" each scenarios
- Github actions scripts that handles execution on the CI/CD 


## About Execution Scripts

The test execution scripts are written in Package.json:
	 
      "test:open": "cypress open",
 	      - To open Cypress Player to execute script

 	   "test:qabox": "npx cypress-tags run --env \"TAGS=@qabox\"",
	     - To run cypress test with single tag

      "test:tn1NOTtn2": "npx cypress-tags run --env \"TAGS=@tagname1 and not @tagname2\"",
       - To run cypress tes with Multiple tags with and & not combinatin

      "test:tn1ANDtn2": "npx cypress-tags run --env \"TAGS=@tagname1 AND @tagname2\"",
       - To run cypress tes with Multiple tags with AND combinatin

      "test:tn1ORtn2": "npx cypress-tags run --env \"TAGS=@tagname1 OR @tagname2\"",
       - To run cypress tes with Multiple tags with OR combinatin

      "clean:reports": "if exist cypress\\reports rmdir /S/Q cypress\\reports",
	 - To run script to remove directory 'cypress\\reports' if exist

      "pretest": "npm run clean:reports",
	 - To run pretest , to clean report folder

      "scripts": "cypress run --browser chrome",
	 - To run script to run cypress test on specific browser

      "posttest": "node cucumber-html-report.js",
	 - To run posttest script

	"test:tags": "cypress-tags run -e TAGS=\"@AccessSSO\" --browser chrome || npm run posttest"
  	 - To Combine script with Tags, browser and posttest and run on commandline

      "test": "npm run scripts || npm run posttest",
       - To combine script with browser, posttest and run on commandline

    

## Getting Started

In the package.json directories install dependencies with `npm install`

**Run Test**
- Insert Token in Gherkin step on "1.create-integration-submitted.feature" on line SSO Navigation with "INSERT TOKEN HERE"
- In the package.json directory run "npm test"
- To run individual scenarios, copy the scenario Tag to package.json file line "test:tags" and run "npm run test:tags"
______________________________________________________________________________________________________________________________
Example: 
   	@**IDIROnlyGOLD**
    	Scenario: 03 - IDIR Only No Teams and not an SSO ADMIN
        Given User is on CSS Dash Board page
	....................................
	
In package.json file, on line Test:Tags
"test:tags": "npm run pretest && cypress-tags run -e TAGS=\"@**IDIROnlyGOLD**\" --browser chrome && npm run posttest"
______________________________________________________________________________________________________________________________

Note : - Generate the Token from https://bcgov.github.io/keycloak-example-apps/
       - Login with your IDIR user name and password
       - Copy the Payload and insert it in the "1.create-integration-submitted.feature"

**Report, Videos and screenshots**

- In Report folder, report with index.html name will be available
- In Screenshots folder, the snaps will be available in case of any errors
- In Videos folder, video of full execution will be available

**Downloaded File - Validation/Verification**

- While executing the Cypress Automation script, whatever file is downloaded will always appear in the "Download" folder of Cypress structure
- Script will verify the following:

  A. Whether the file is downloaded (Example : Then User verifies the file "FileName" is downloaded)
  B. The downloaded file shouldn't be empty (Example : And User validates that downloaded file "FileName" is not empty)

**Trouble Shooting Steps**
- 'Expected to find element: `//button[contains(.,'+ Request SSO Integration')]`, but never found it.'
This error means that locater of any element is not correct. If you see above error, try with latest Token
- ' Error: Step implementation missing for:  User is on CSS Dash Board page'
This error means that implementation of Step Defination mention line is missing. Create a Step Defination for missing Gherkin Line
- 'CompositeParserException: Parser errors:'
This error means there is syntax error in Feature file. Verfiy the feature file to fix the syntax
