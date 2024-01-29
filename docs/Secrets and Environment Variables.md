# Secrets and Environment Variables

In order for the E2E tests to run, you will need to set the following environment variables locally through the cypress.env.json file. This file is not checked into source control, so you will need to create it yourself. The file should be placed in the root of the project.

The following is an example of the file contents:

```json
{
  "users": [
    {
      "type": "default",
      "username": "PFDRSSOT",
      "password": "<>"
    },
    {
      "type": "idir",
      "username": "",
      "password": ""
    },
    {
      "type": "azureidir",
      "username": "",
      "password": ""
    },
    {
      "type": "bceidbasic",
      "username": "",
      "password": ""
    },
    {
      "type": "bceidbusiness",
      "username": "",
      "password": ""
    },
    {
      "type": "githubbcgov",
      "username": "",
      "password": ""
    },
    {
      "type": "githubpublic",
      "username": "",
      "password": ""
    },
    {
      "type": "admin",
      "username": "",
      "password": ""
    }
  ],
  "host": "",
  "siteminder": "",
  "loginproxy": "",
  "guid": {
    "bcgov.sso@gov.bc.ca": "",
    "gh.bcgov.sso@gov.bc.ca": "",
    "test.azure.idir@gov.bc.ca": "",
    "pathfinder.ssotraining@gov.bc.ca": ""
  }
}
```

## Environment Variables Explanation

- **host**: The URL of the application you are testing. This should be the same URL you use to access the application in your browser.
- **siteminder**: The URL of the Siteminder server.
- **loginproxy**: The URL of the Login Proxy server.
- **guid**: The GUID of the user you are testing with. This is used to search for a user in the application.
- **users**: The list of users you are testing with. The type of user is used to determine which login method to use. The username and password are used to login to the application.
  These users can be selected by using the `cy.setid(<type>)` function. The `<type>` parameter should match the type of user you want to use. For example, if you want to use the default user, you would use `cy.setid('default')`. If you want to use the admin user, you would use `cy.setid('admin')`.

## Environment Variables for GitHub Actions

These environment variables are set in the GitHub Actions workflow file by means of GitHub Secrets.

For instance in the workflow file `main-e2e.yml`, the following is used to set the variables:

```yaml
env:
  CYPRESS_users: ${{ secrets.CYPRESS_USERS }}
  CYPRESS_BASE_URL: ${{ secrets.CYPRESS_BASEURL }}
  CYPRESS_host: ${{ secrets.CYPRESS_HOST }}
  CYPRESS_guid: ${{ secrets.CYPRESS_GUID }}
  CYPRESS_ENVIRONMENT: ${{ github.base_ref }}
  CYPRESS_loginproxy: ${{ secrets.CYPRESS_LOGINPROXY }}
  CYPRESS_siteminder: ${{ secrets.CYPRESS_SITEMINDER }}
  CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

All Uppercase names refer to Cypress environment variables. The Uppercase/lowercase names are the ones that are user-defined.

### Special Secrets

Both guid and users are special secrets as they actually contains JSON data. The JSON data is stored in the secrets as a string. The string is then parsed into JSON in the workflow file.

For instance, the following is used to set the guid variable:

```json
{
  "bcgov.sso@gov.bc.ca": "",
  "gh.bcgov.sso@gov.bc.ca": "",
  "test.azure.idir@gov.bc.ca": "",
  "pathfinder.ssotraining@gov.bc.ca": ""
}
```

And the following is set for the users variable:

```json
[
  {
    "type": "default",
    "username": "PFDRSSOT",
    "password": "<>"
  },
  {
    "type": "idir",
    "username": "",
    "password": ""
  },
  {
    "type": "azureidir",
    "username": "",
    "password": ""
  },
  {
    "type": "bceidbasic",
    "username": "",
    "password": ""
  },
  {
    "type": "bceidbusiness",
    "username": "",
    "password": ""
  },
  {
    "type": "githubbcgov",
    "username": "",
    "password": ""
  },
  {
    "type": "githubpublic",
    "username": "",
    "password": ""
  },
  {
    "type": "admin",
    "username": "",
    "password": ""
  }
]
```

The actual values for the fields are kept in a secure location and are not checked into source control.
