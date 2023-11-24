let environmenta = 0;
let environmentb = 1;

Then('User clicks on {string} tab on screen', async (TabName) => {
  cy.wait(1000);
  environmenta = 0;
  environmentb = 1;
  await cy.xpath("//*[@id='__next']/div[1]/div[2]//a[text()='" + TabName + "']").click();
});

And('User clicks on {string} button at position {string}', async function (buttonName, position) {
  // await cy.xpath(Request_SSO_Integration.PlusrequestSSOIntegrationBtn()).click();
  await cy.xpath("(//button[contains(.,'" + buttonName + "')])[" + position + ']').click();
  await cy.wait(2000);
});

And(
  'User Enters {string} on {string} textbox at row {string} on {string} pop-up',
  async (Value, TextboxName, RowNo, PopUpName) => {
    cy.wait(500);
    if (TextboxName === 'Role Name') {
      await cy
        .xpath("//th[text()='" + TextboxName + "']/ancestor::table//tbody//tr[" + RowNo + ']//td[1]//input')
        .type(Value);
    } else if (TextboxName === 'Environments') {
      environmenta += 1;
      if (environmenta == environmentb) {
        await cy
          .xpath("//th[text()='" + TextboxName + "']/ancestor::table//tbody//tr[" + RowNo + ']//td[2]//input')
          .clear();
      }

      await cy
        .xpath("//th[text()='" + TextboxName + "']/ancestor::table//tbody//tr[" + RowNo + ']//td[2]//input')
        .type(Value)
        .type('{enter}');
    }
  },
);

And('User clicks at {string} icon on screen', async (IconName) => {
  cy.wait(500);
  environmentb += 1;
  await cy.xpath("//span[text()='" + IconName + "']").click();
});

And('User Enters {string} on placeholder {string} textbox', async (Value, PlaceHolderName) => {
  await cy.wait(1000);
  await cy.xpath("//input[@placeholder='" + PlaceHolderName + "']").clear();
  await cy.xpath("//input[@placeholder='" + PlaceHolderName + "']").type(Value);
});

Then('User cliks on {string} label in table', async (LabelName) => {
  await cy.xpath("//td[text()='" + LabelName + "']").click();
});

And('User hover over info button for text {string} and verify the text {string}', async (Label, TextValue) => {
  // await cy.get('.sc-gPpHY > .svg-inline--fa').trigger('mouseover').invoke('show');
  await cy
    .xpath("//*[contains(text(),'" + Label + "')]//*[local-name()='svg']")
    .trigger('mouseover')
    .invoke('show');
  cy.contains(TextValue);
});

And('User select {string} in Environment dropdown', async (value) => {
  await cy.xpath("//select[@data-testid='user-role-filter-env']").select(value);
});
