import 'cypress-wait-until';

var currentUrl = window.location.href;

Given('User launch the url {string}', async function (Act_url) {
  await cy.visit(Act_url);
})

And('User navigates through SSO Request {string} with Token {string}', async function (SSO_url, Token) {

  cy.window().then((win) => {
    win.sessionStorage.setItem('tokens', Token)
  });
  await cy.wait(2000);
  await cy.xpath("//button[contains(.,'Request SSO Integration')]").click();
  await cy.visit(SSO_url);
})