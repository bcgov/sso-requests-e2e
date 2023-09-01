describe("Check for Broken Static Link", () => {
  beforeEach(() => {
    //cy.viewport(1280, 1000);
  });
  it("Check All Static Links", () => {
    cy.visit(Cypress.env("host"));

    cy.get("a").each((link) => {
      if (link.prop("href"))
        cy.request({
          url: link.prop("href"),
          failOnStatusCode: false,
        }).as("links");

      cy.get("@links").should((response) => {
        expect(response.status).to.eq(200);
      });

      cy.log(link.prop("innerText") + ": " + link.prop("href"));
    });
  });
});
