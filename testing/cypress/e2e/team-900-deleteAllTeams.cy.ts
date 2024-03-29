// Delete all teams. Created teams all have a UUID in the name.
// By scanning for that pattern we'll find all teams and can then delete them.

import Team from '../appActions/Team';

describe('Delete All Teams', () => {
  before(() => {
    cy.cleanGC();
  });
  after(() => {
    cy.cleanGC();
  });
  let team = new Team();
  it('Delete All Teams as admin', function () {
    cy.setid('admin').then(() => {
      cy.login(null, null, null, null);
    });
    team.deleteAllTeams();
    cy.logout(null);
    cy.clearAllSessionStorage();
    cy.cleanGC();
  });

  it('Delete All Teams as default', function () {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    team.deleteAllTeams();
    cy.logout(null);
    cy.clearAllSessionStorage();
    cy.cleanGC();
  });
});
