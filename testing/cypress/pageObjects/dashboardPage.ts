class DashboardPage {
  path: string = '/admin-dashboard';
  confirmBceidButton: string = '[data-testid="confirm-delete-bceid-approve"]';
  confirmGithubButton: string = '[data-testid="confirm-delete-github-approve"]';
  confirmBCSCButton: string = '[data-testid="confirm-delete-bc-services-card-approve"]';

  selectRequest(name: string) {
    cy.contains('td', name, { timeout: 10000 }).parent().click();
  }
}

export default DashboardPage;
