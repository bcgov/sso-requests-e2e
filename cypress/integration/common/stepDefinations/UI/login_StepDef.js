import 'cypress-wait-until';

var currentUrl = window.location.href;


Given('the user is a PO or a technical leader or part of an existing team', async function () {

  await cy.visit("https://bcgov.github.io/sso-requests-dev");
  

})

Given('the user is a PO or a technical leader or part of an existing team newa', async function () {

  cy.window().then((win) => {
    win.sessionStorage.setItem('tokens', 'INSERT TOKEN HERE')
  });
  await cy.wait(2000);
  // await cy.contains(homePage.requestIntegrationBtn()).click(); //TODO: assertion to verify button exists
  await cy.xpath("//button[contains(.,'Request SSO Integration')]").click();
  await cy.visit("https://bcgov.github.io/sso-requests-dev/my-dashboard/integrations");
})

