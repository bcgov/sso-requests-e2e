import Request from '../appActions/Request';

describe('Delete All Integrations', () => {
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

  after(() => {
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

  it('Delete All Requests as default user', function () {
    cy.setid(null).then(() => {
      cy.login(null, null, null, null);
    });
    let req = new Request();
    req.deleteAllRequests();
    cy.logout(null);
  });
});
