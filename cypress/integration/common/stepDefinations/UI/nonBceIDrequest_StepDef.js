const { expect } = require('chai');

Given(/^User is on CSS Dash Board page$/, async function (callback) {
  await cy.url().should('include', 'my-dashboard');
  await cy.wait(5000);
});

And('User clicks on {string} button', async function (buttonName, callback) {
  // await cy.xpath(Request_SSO_Integration.PlusrequestSSOIntegrationBtn()).click();
  await cy.xpath("//button[contains(.,'" + buttonName + "')]").click();
  await cy.wait(2000);
});

And(/^User Enter \"([^\"]*)\" on \"([^\"]*)\" textbox$/, async function (Value, TextBoxLabel, callback) {
  await cy.xpath("//label[contains(.,'" + TextBoxLabel + "')]/following-sibling::input").type(Value);
});

And('User select {string} for question {string} on page', async function (value, questiontext, callback) {
  await cy.xpath("//div[text()='" + questiontext + "']//div/label//span[text()='" + value + "']").click();
  await cy.wait(2000);
});

And('User select {string} for legend question {string} on page', async function (value, legendquestiontext, callback) {
  await cy.xpath("//*[text()='" + legendquestiontext + "']/following-sibling::div//*[text()='" + value + "']").click();
});

And('User Enters {string} on {string} legend textbox', async function (value, LegendTextBoxLabel) {
  cy.xpath("//*[contains(.,'" + LegendTextBoxLabel + "')]/following-sibling::div//input").type(value);
});

And('User Checks {string}', async function (CheckboxText, callback) {
  cy.xpath("//*[contains(text(),'" + CheckboxText + "')]").click();
});

Then('User validates information {string} value is {string}', async function (HeadingText, value) {
  cy.xpath("//td[contains(text(),'" + HeadingText + "')]/ancestor::tr//span").should('contains.text', value);
});

Then('User Verfiy {string} is {string} in Table', async function (TableHeader, value) {
  if (TableHeader == 'Status') {
    cy.xpath('//table//tbody//tr[1]//td[3]').should('contains.text', value);
  }
});

And('User waits for {string} minutes', async function (Time) {
  await cy.wait(Time * 60 * 1000);
});

Then('User verifies the file {string} is downloaded', async function (fileName) {
  await cy.wait(2000);
  cy.verifyDownload(fileName + '-installation-dev.json');
});
