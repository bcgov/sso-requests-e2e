// Delete Integration request that were created in the previous tests

import data1 from '../fixtures/requests-rolesafter.json'; // The data file will drive the tests
import Request from '../appActions/Request';

const testData = data1; // Define the testData array

if (!Cypress.env('localtest')) {
  describe('Delete Integration Requests', () => {
    before(() => {
      cy.window().then((win) => {
        // window.gc is enabled with --js-flags=--expose-gc chrome flag
        if (typeof win.gc === 'function') {
          // run gc multiple times in an attempt to force a major GC between tests
          win.gc();
          win.gc();
          win.gc();
          win.gc();
          win.gc();
        }
      });
    });

    beforeEach(() => {
      cy.setid(null).then(() => {
        cy.login(null, null, null, null);
      });
    });

    afterEach(() => {
      cy.logout(null);
      cy.window().then((win) => {
        // window.gc is enabled with --js-flags=--expose-gc chrome flag
        if (typeof win.gc === 'function') {
          // run gc multiple times in an attempt to force a major GC between tests
          win.gc();
          win.gc();
          win.gc();
          win.gc();
          win.gc();
        }
      });
    });

    // Iterate through the JSON file and create a team for each entry
    // The set up below allows for reporting on each test case
    testData.forEach((data, index) => {
      // Only run the test if the smoketest flag is set and the test is a smoketest
      it(`Delete: ${data.create.projectname} (Test ID: ${data.create.test_id}) - ${data.create.description}`, () => {
        let req = new Request();
        if (data.delete) {
          req.showCreateContent(data);
          req.id = data.id;
          req.deleteRequest(req.id);
          req = null;
        }
      });
    });
  });
}
