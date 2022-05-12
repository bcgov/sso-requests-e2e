
class myProjectsPage {

    static requestSSOIntegrationBtn() {
        return "+ Request SSO Integration";
    }
    static typeInUsername() {
        return "//input[@name='user']";
    }
    static typeInPassword() {
        return "//input[@name='password']";
    }
    static continueBtn() {
        return "//input[@name='btnSubmit']";
    }
    static adminProjectDashboard() {
        return "//div[contains(text(),'Project name')]";
    }

    static selectProject(value) {
        return "//div[contains(text(),'" + value + "')]";
    }
    static logoutIcon() {
        return "(//iac-icon[@class='navigation-caret-icon'])[2]";
    }
    static clickSignout() {
        return "//iac-list-item[contains(.,'Sign out')]";
    }
}
export default myProjectsPage;
