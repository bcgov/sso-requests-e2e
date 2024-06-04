class DashboardPage {
  path: string = '/admin-dashboard';
  confirmDigitalCredentialButton: string = '[data-testid="confirm-digital-credential-approve"]';
  confirmBceidButton: string = '[data-testid="confirm-bceid-approve"]';
  confirmGithubButton: string = '[data-testid="confirm-github-approve"]';

  selectRequest(name: string) {
    cy.contains('td', name, { timeout: 10000 }).parent().click();
  }
}

export default DashboardPage;
