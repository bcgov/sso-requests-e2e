var a = 0;
var b = 1;

Then("User clicks on {string} tab on screen", async (TabName) => {
    cy.wait(1000);
    a = 0;
    b = 1;
    await cy.xpath("//*[@id='__next']/div[1]/div[2]//a[text()='" + TabName + "']").click();
})

And('User clicks on {string} button at position {string}', async function (buttonName, position) {
    // await cy.xpath(Request_SSO_Integration.PlusrequestSSOIntegrationBtn()).click();
    await cy.xpath("(//button[contains(.,'" + buttonName + "')])[" + position +  "]").click();
    await cy.wait(2000);
  });

And("User Enters {string} on {string} textbox at row {string} on {string} pop-up", async (Value, TextboxName, RowNo, PopUpName) => {
    cy.wait(500);
    if (TextboxName == 'Role Name') {
        await cy.xpath("//th[text()='" + TextboxName + "']/ancestor::table//tbody//tr[" + RowNo + "]//td[1]//input").type(Value)
    } else if (TextboxName == 'Environments') {
        a += 1;
        if (a == b) {
            await cy.xpath("//th[text()='" + TextboxName + "']/ancestor::table//tbody//tr[" + RowNo + "]//td[2]//input").clear();
        }

        await cy.xpath("//th[text()='" + TextboxName + "']/ancestor::table//tbody//tr[" + RowNo + "]//td[2]//input").type(Value).type('{enter}');
    }
})

And("User clicks at {string} icon on screen", async (IconName) => {
    cy.wait(500);
    b += 1;
    await cy.xpath("//span[text()='" + IconName + "']").click();
})

And("User Enters {string} on placeholder {string} textbox", async (Value, PlaceHolderName) => {
    await cy.xpath("//input[@placeholder='" + PlaceHolderName + "']").type(Value);
})

Then("User cliks on {string} label in table", async (LabelName) => {
    await cy.xpath("//td[text()='" + LabelName + "']").click();
})
