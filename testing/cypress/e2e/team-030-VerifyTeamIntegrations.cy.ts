import { faker } from "@faker-js/faker";
import Team from "../appActions/Team";

describe("Verify Team Integration", () => {
  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Team Integrations", function () {
    let team = new Team();
    cy.visit(team.teamPage.path);
  });
});
