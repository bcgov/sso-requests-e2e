// Update of Integration request variants

import Request from '../appActions/Request';

describe('teamtest', () => {
  before(() => {
    cy.cleanGC();
  });
  /*   after(() => {
    cy.cleanGC();
  }); */
  beforeEach(() => {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
  });

  /*   afterEach(() => {
    cy.logout(null);
  }); */

  // Remove Roles
  it(`test`, () => {
    cy.visit('');
    cy.pause();
  });
});
