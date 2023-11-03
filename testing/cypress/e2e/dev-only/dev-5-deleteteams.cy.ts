// We are deleting teams that have been created during earlier tests and do not have any requests associated with them.

import Request from "../../appActions/Request";

describe("Delete Teams", () => {
  const regex = new RegExp(
    "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
  );
  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Delete Team", function () {
    let i = 0;
    let deleteTeams = [];
    cy.visit("/my-dashboard/teams");
    cy.get("button").contains("+ Create a New Team").should("be.visible");

    cy.get("table > tbody > tr > td:nth-child(1)")
      .each(($elm, index, $list) => {
        // text captured from column1
        let t = $elm.text();
        // matching criteria
        if (regex.test(t)) {
          deleteTeams[i] = index;
          i++;
        }
      })
      .then(() => {
        i = 0;
        let n = 0;
        while (deleteTeams.length > i) {
          cy.get('[data-testid="delete-team-button"]').eq(deleteTeams[i]-n).click(); // first click to focus
          cy.get('[data-testid="delete-team-button"]').eq(deleteTeams[i]-n).click(); // Second on to delete
          cy.wait(1000);
          cy.get("#delete-team-modal")
            .find("button")
            .contains("Delete Team")
            .click({ force: true });
          cy.wait(2000);
          i++;
          n++;
        }
      });
  });
});
