declare namespace Cypress {
  interface Chainable<Subject> {
    login(username: string, password: string, host: string, siteminder: string): Chainable<any>;

    logout(host: string): void;

    setid(type: string): boolean;

    querySelectorIncludesText(selector: string, text: string): Chainable<any>;

    assertValueCopiedToClipboard(value: string): void;

    generateUUID(): Chainable<any>;
  }
}
