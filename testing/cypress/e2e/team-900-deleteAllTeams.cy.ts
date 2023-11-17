import Team from "../appActions/Team";

describe("Delete All Teams", () => {
  let team = new Team();
  beforeEach(() => {
    cy.login(null, null, null, null);
  });
  afterEach(() => {
    cy.logout(null);
  });

  it("Delete All Teams", function () {
    if (team.deleteAllTeams()){
      Cypress.log({
        name: 'Test Result',
        displayName: 'Result',
        message: `${"Delete All Teams"}, ${"- PASSED"}`,
      })
    }
    else {
      Cypress.log({
        name: 'Test Result',
        displayName: 'Result',
        message: `${"Delete All Teams"}, ${"- FAILED"}`,
      })
    }
  });
});
