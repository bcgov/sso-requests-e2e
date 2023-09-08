interface Link {
  url: string;
  anchorText: string;
  External: "true" | "false";
}

describe("Check Links", () => {
  let links: Link[] = [];
  it("Read Fixture", () => {
    cy.fixture("links.json").then((data: Link[]) => {
      links = data;
      cy.log(links[0]);
    });
  });
  links.forEach((link) => {
    it("Check link: ${link.anchorText}, ${link.url}", () => {
      cy.visit(Cypress.env("host"));
      cy.get("h1")
        .contains("Common Hosted Single Sign-on (CSS)")
        .should("be.visible");
      cy.get("a").contains(link.anchorText).click();
    });
  });
});
