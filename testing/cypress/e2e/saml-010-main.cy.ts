describe('SAML Spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080');
    cy.get('#signOnUrl', { timeout: 10000 })
      .clear()
      .type('https://dev.sandbox.loginproxy.gov.bc.ca/auth/realms/standard/protocol/saml');
    cy.get('#logoutUrl', { timeout: 10000 })
      .clear()
      .type('https://dev.sandbox.loginproxy.gov.bc.ca/auth/realms/standard/protocol/saml');
    cy.get('#entityId', { timeout: 10000 }).clear().type('saml-test-1-10968');
    cy.get('#x509Cert', { timeout: 10000 })
      .clear()
      .type(
        'MIICnzCCAYcCBgGC3KXvWzANBgkqhkiG9w0BAQsFADATMREwDwYDVQQDDAhzdGFuZGFyZDAeFw0yMjA4MjcwMDEyMThaFw0zMjA4MjcwMDEzNThaMBMxETAPBgNVBAMMCHN0YW5kYXJkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk9h3uzpjdgNPSxzWk9VH+jEFSQhWdakI1nGt/Jm3CmUg5DAjhIGsPSWSwJ5masxezn7CIpHviygciIqUOT1fFl8hp3u00zy2VIIysMU2silmpdpW5mznYZCl8anudWd0cw8J5ZdXKZ8Gt4Z566nrS04H5pxL3juMqDrtyXyO3NWFo1zewcJr7nN+qT9oiMYoqfaCD79RFUuLuCz1kBxAaV7XcR+O5cX+PxZZebGMfmzZ0zEfATiHYEMZDNsHa3tvmVoEKXT+ITUcfHLEqKP8DE9AL3nd9BkAdeV0cdjQDr74dDv9Pg2oY5sGML23yWb+vyDrwtXV+JYPh35TiQaCDQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBmtpnDcO+bYagbMYODBzhUC6MKhS/MprLDb8Dp7nozcEjXLEEfHMVK2CfO+ic3rRhNaeOnBaZLALkFGTii6nNPgLpKcjSAJzAVHupouEZzAvS/GZuRAdXJ7jDZYtxySCRGKlRECf+KYOyi76tDPg16QedXJ/EX6ZUI2CICTr7UQWt7uuYtJtdbgNmXowSmFsbjn1iYMnUGbge5GukS1CVh47a4s2FLlMl/WCX9PyeovWOCnJ/7mB7+zmV4UeWGIBdC6Hrlp3L1ro63HlpB7hXegV3dch6iZNnuO8jq3miI1adW/Ymq2MdAQamTuOMDsas3L12XLCeUFY0ZnqIARhXg',
        { log: false },
      );
    cy.get('button[type="submit"]').click();

    const sentArgs = { user: Cypress.env('username'), pass: Cypress.env('password') };

    cy.origin(Cypress.env('siteminder'), { args: sentArgs }, ({ user, pass }) => {
      cy.get('#login-to').contains('Log in to ').should('be.visible');
      cy.get('#user').type(user);
      cy.get('#password').type(pass, { log: false });
      cy.get('input[name=btnSubmit]').click();
      cy.wait(1000);
    });

    cy.get('#myTabContent').within(() => {
      cy.get('#assertions-tab-pane').within(() => {
        cy.contains('td', 'family_name').siblings().contains('SSO Training').should('be.visible');
      });
    });

    cy.get('a[role="button"]', { timeout: 10000 }).contains('Logout').click();
  });
});
