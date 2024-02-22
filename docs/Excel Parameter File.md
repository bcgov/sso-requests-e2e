# Excel and other Parameter Files for test execution

## Data-Driven Test Pattern

The data-driven test pattern refers to a methodology where test scripts are written in a way that separates test data from the test logic. This means that the test cases are driven by varying sets of data.
The primary benefit of this approach is its ability to run the same set of tests with multiple data inputs, enhancing test coverage and efficiency. It's important to note that this pattern allows for more scalable and maintainable test cases, as the core test logic remains the same while only the data changes.
This is especially useful for testing applications under different conditions and inputs without the need to write new tests for each scenario.

### Implementation

The test data is stored as files in the `fixtures` folder. The test data is stored in JSON format. The test data is then imported into the (driver) test script. The driver iterates through the test data and calls the different test activities (like create request, add role etc.) with the test data as parameters. This allows us to run the same test with different data sets.

For instance: We created a test to create a request. We feed that test with different data sets to create different requests. This allows us to test the application with different scenarios without having to write a new test for each.
The actual "create test" script is a little bit more complex because it needs to deal with multiple pages and different data sets. But the initial investment in creating the test script is worth it because we can then run the same test for many different scenarios.

### JSON Test Data

The test data is stored in JSON format. The JSON files are stored in the `fixtures` folder. The JSON files are named after the test category/group they are used for. For instance: `requests.json` contains the test data for the create/update/delete request tests.

The JSON files contain an array of objects. Each object represents a test case. The object contains the test data for that test case. The test data is stored as key/value pairs.

### Requests Test Data

The `requests.json` contains the following high level structure

```json
[
  {
    "id": "",
    "create": {},
    "update": {},
    "devroles": {},
    "testroles": {},
    "prodroles": {},
    "delete": true,
    "smoketest": false,
    "localtest": false
  }
]
```

Where:

- `id` is the id of the request. This is used to identify the request in the UI.
- `create` is the test data for the create request test.
- `update` is the test data for the update request test.
- `devroles` is the test data for adding/updating roles to dev.
- `testroles` is the test data for adding/updating roles to test.
- `prodroles` is the test data for adding/updating roles to production.
- `delete` is a boolean flag that indicates if the request should be deleted after the test is completed.
- `smoketest` is a boolean flag that indicates if the request should be used for smoke testing.

#### create example

```json
    "create": {
      "test_id": "Create Request v1 OIDC Confidential",
      "projectname": "Create OIDC 1 Public Team Confidential",
      "team": true,
      "teamname": "Roland and Training Account",
      "newteam": false,
      "projectlead": false,
      "protocol": "oidc",
      "authtype": "browser-login",
      "publicaccess": false,
      "identityprovider": ["IDIR", "IDIR - MFA", "", ""],
      "additionalroleattribute": "tbd",
      "environments": ["dev", "test", ""],
      "displayheader": true,
      "displayheadertest": true,
      "displayheaderprod": null,
      "ssoheaderdev": "SSO Header Dev",
      "ssoheadertest": "SSO Header Test",
      "ssoheaderprod": "",
      "redirecturi": ["https://bcgov.github.io/keycloak-example-apps/*"],
      "redirecturitest": ["https://bcgov.github.io/keycloak-example-apps/*"],
      "redirecturiprod": [],
      "submit": true,
      "confirm": true,
      "description": "Variant 6"
    }
```

- `test_id`: Test ID. This is used to identify the test case in the test planning documentation.
- `projectname`: Project Name used for the request.
- `team`: Boolean flag that indicates if a team should be used.
- `teamname`: Name of the team.
- `newteam`: Boolean flag that indicates if a new team should be created.
- `projectlead`: Boolean flag that indicates if the user should be added as project lead. Only used for new teams.
- `protocol`: Protocol used for the request. Choice is between `oidc` and `saml`.
- `authtype`: Use case for the request. Choice is between `browser-login`, `service-account` and `both`.
- `publicaccess`: Boolean Client Type. Choice is between `true` (public) and 'false` (confidential).
- `identityprovider`: Array of Identity Providers. Choices are `IDIR`, `IDIR - MFA`, `Basic BCeID`, `Business BCeID`, `Basic or Business BCeID`,
  `GitHub BC Gov`.
- `additionalroleattribute`: Addtional Attribute for the role.
- `environments`: array of environments. Choices are `dev`, `test` and `prod`.
- `displayheader`: Boolean flag that indicates if the dev display header should be used.
- `displayheadertest`: Boolean flag that indicates if the test display header should be used.
- `displayheaderprod`: Boolean flag that indicates if the prod display header should be used.
- `ssoheaderdev`: SSO Header for dev.
- `ssoheadertest`: SSO Header for test.
- `ssoheaderprod`: SSO Header for prod.
- `redirecturi`: Array of redirect URIs. for dev.
- `redirecturitest`: Array of redirect URIs. for test.
- `redirecturiprod`: Array of redirect URIs. for prod.
- `agreeWithTermstrue`: Boolean flag that indicates if the user agrees with the terms of use.
- `submit`: Boolean flag that indicates if the request should be submitted.
- `confirm`: Boolean flag that indicates if the request should be confirmed.
- `description`: Comment that describes the test case, for documentation purposes only.

#### update example

```json
"update": {
  "test_id": "Update Request v1 OIDC Confidential",
  "projectname": "Update OIDC 1 Public Team Confidential",
  "team": true,
  "teamname": "test-team",
  "newteam": false,
  "projectlead": null,
  "protocol": "",
  "authtype": "",
  "publicaccess": true,
  "identityprovider": ["", "", "", ""],
  "additionalroleattribute": "TBD",
  "displayheader": true,
  "displayheadertest": true,
  "displayheaderprod": null,
  "ssoheaderdev": "Header Shown Dev",
  "ssoheadertest": "Header Shown Test",
  "ssoheaderprod": "",
  "redirecturi": ["https://dev.com"],
  "redirecturitest": ["https://test.com"],
  "redirecturiprod": [],
  "description": "Updates to OIDC 1 Public Team Confidential"
}
```

For description of the fields see the create example above.
The update values will fully replace the existing values. If a value is not specified it will not be updated.
If you want to reset a boolean value to empty you need to specify it as `null`.

### Requests Role Test Data

The `requests-role.json` contains a similar structure but it contains the test data for adding/updating roles to dev, test and prod.

```json
  "devroles": {
    "add": [
      {
        "test_id": "Roles-0002 Add Role",
        "role": "Role 2",
        "description": "Add Role1 OIDC 1 Team"
      },
      {
        "test_id": "Add Role2  to OIDC 1 Team",
        "role": "Role 3",
        "description": "Add Role2 OIDC 1 Team"
      }
    ],
    "composite": [
      {
        "test_id": "Roles-0000",
        "role_main": "Role 3",
        "role_second": "Role 2",
        "description": "Add Role 2 to Role 2"
      }
    ],
    "remove": [
      {
        "test_id": "Roles-0002 Remove Role",
        "role": "Role 2",
        "description": "Remove Role 3 from OIDC 1 Team"
      }
    ],
    "addusertorole": [
      {
        "test_id": "Add User 1 to Role 2",
        "role": "Role 2",
        "user": "Nithin",
        "description": "Add User 1 to Role 3"
      },
      {
        "test_id": "Add User 1 to Role 2",
        "role": "Role 3",
        "user": "Nithin",
        "description": "Add User 1 to Role 3"
      }
    ],
    "removeuserfromrole": [
      {
        "test_id": "Remove User 1 from Role 2",
        "role": "Role 2",
        "user": "Nithin",
        "description": "Remove User 1 from Role 2"
      }
    ]
  }
```

Dev, Test and Prod have their own sections for Roles. Each section contains the following fields:

- `add`: Array of roles to add.
- `composite`: Array of composite roles to add.
- `remove`: Array of roles to remove.
- `addusertorole`: Array of users to add to a role.
- `removeuserfromrole`: Array of users to remove from a role.

### Search Test Data

The `rolesusers.json` contains the test data for the search tests.

```json
{
  "id": "Test Automation do not delete",
  "environment": "Dev",
  "idp": "IDIR",
  "criterion": "First Name",
  "search_value": "Pathfinder",
  "error": false
}
```

- `id`: This is used to identify request that will be queried for users. This can be the request ID or the request name.
- `environment`: The environment to search for users. Choices are `Dev`, `Test` and `Prod`.
- `idp`: The IDP to search for users. Choices are `IDIR`, `IDIR - MFA`, `Basic or Business BCEID` and `GitHub BC Gov`.
- `criterion`: The search criterion. Choices are `First Name`, `Last Name`, `Email`, `Username`, `Display Name` and `IDP GUID`.
- `search_value`: The search value.
- `error`: Boolean flag that indicates if the search should return an error.

### IDIM Search Test Data

The `idim-search.json` contains the test data for the search IDIM tests.

```json
{
  "id": "Test Automation do not delete",
  "environment": "Dev",
  "idp": "IDIR",
  "criterion": "First Name",
  "search_value": "Pathfinder",
  "error": false,
  "smoketest": false,
  "localtest": false
}
```

- `id`: This is used to identify request that will be queried for users. This can be the request ID or the request name.
- `environment`: The environment to search for users. Choices are `Dev`, `Test` and `Prod`.
- `idp`: The IDP to search for users. For IDIM test, this is always `IDIR`.
- `criterion`: The search criterion. Choices are `First Name`, `Last Name`, `Email` and `Username`.
- `search_value`: The search value.
- `error`: Boolean flag that indicates if the search should return an error.
- `smoketest`: Boolean flag that indicates if the search should be used for smoke testing.

### Teams Test Data

The `teams.json` contains the test data for the teams tests.

```json
{
  "create": {
    "test_id": "Create Team 1",
    "teamname": "Team 1",
    "useremail": [
      "test.user@gov.bc.ca",
      "test.user@gmail.com",
      "test.user+test1@gmail.com",
      "test.user+test2@gmail.com",
      "test.user+test3@gmail.com",
      "test.user+test4@gmail.com",
      "test.user+test5@gmail.com"
    ],
    "userrole": ["admin", "admin", "member", "member", "member", "member", "member"],
    "description": ""
  },
  "update": {
    "test_id": "Update Team 1",
    "teamname": "Team 1 Updated",
    "adduser": [
      {
        "useremail": "test.user+test6@gmail.com",
        "userrole": "Admin"
      },
      {
        "useremail": "test.user+test7@gmail.com",
        "userrole": "Member"
      }
    ],
    "deleteuser": [
      {
        "useremail": "test.user@gmail.com"
      }
    ],
    "description": "Update Team 1"
  },
  "delete": true,
  "smoketest": false,
  "localtest": false
}
```

The main structure is similar to the requests test data. The `create` section contains the test data for the create team test. The `update` section contains the test data for the update team test. The `delete` section contains a boolean flag that indicates if the team should be deleted after the test is completed.

- `test_id`: Test ID. This is used to identify the test case in the test planning documentation.
- `teamname`: Name of the team.
- `useremail`: An Array of user emails that will be added to the team.
- `userrole`: An Array of user roles that will be added to the team. (In sync with the useremail array)
- `adduser`: An Array of users that will be added to the team. Each user contains the following fields:
  - `useremail`: The email of the user.
  - `userrole`: The role of the user.
- `deleteuser`: An Array of users that will be deleted from the team. Each user contains the following fields:
  - `useremail`: The email of the user.
- `description`: Comment that describes the test case, for documentation purposes only.
- `delete`: Boolean flag that indicates if the team should be deleted after the test is completed.
- `smoketest`: Boolean flag that indicates if the team should be used for smoke testing.

## Ways to create Test files

1. Update and edit existing JSON files in the `fixtures` folder.
2. Use the Excel spreadsheet route to create the JSON files.

### Excel Parameter File

For people not too familiar with JSON, we have created Excel spreadsheets that can be used to create the JSON files. The spreadsheets are located in the `fixtures` folder.

### CSV to JSON

Once the spreadsheets are completed, the JSON files can be created by exporting the _sheet_ as a CSV file. The CSV file can then be converted to JSON using the `csvtojson` npm package.

- Install the `csvtojson` npm package globally: `npm install -g csvtojson`
- Convert the CSV file to JSON: `csvtojson --downstreamFormat=array --checkType=true <csvfile> > <jsonfile>`
- Copy the JSON file to the `fixtures` folder.
- Update the test scripts to use the new JSON file if needed.

```bash
Usage: csvtojson [<command>] [<options>] filepath

Commands:
        parse: (Default)Parse a csv file to json
        version: Show version of current csvtojson
Options:
        --output: The format to be converted to. "json" (default) -- convert csv to json. "csv" -- convert csv to csv row array. "line" -- convert csv to csv line string
        --delimiter: delimiter to separate columns. Possible to give an array or just use 'auto'. default comma (,). e.g. --delimiter=# --delimiter='[",",";"]' --delimiter=auto
        --quote: quote surrounding a column content containing delimiters. To turn off quote, please use 'off' --quote=off. default double quote ("). e.g. chage to hash: --quote=#
        --trim: Indicate if parser trim off spaces surrounding column content. e.g. " content " will be trimmed to "content". Default: true
        --checkType: This parameter turns on and off whether check field type. default is false.
        --ignoreEmpty: This parameter turns on and off whether ignore empty column values while parsing. default is false
        --noheader: Indicating csv data has no header row and first row is data row. Default is false
        --headers: An array to specify the headers of CSV data. If --noheader is false, this value will override CSV header. Default: null. Example: --headers='["my field","name"]'
        --flatKeys: Don't interpret dots (.) and square brackets in header fields as nested object or array identifiers at all (treat them like regular
characters for JSON field identifiers). Default: false.
        --maxRowLength: the max character a csv row could have. 0 means infinite. If max number exceeded, parser will emit "error" of "row_exceed". if a possibly corrupted csv data provided, give it a number like 65535 so the parser wont consume memory. default: 10240
        --checkColumn: whether check column number of a row is the same as headers. If column number mismatched headers number, an error of "mismatched_column" will be emitted.. default: false
        --eol: Explicitly specify the end of line character to use.
        --quiet: If any error happens, quit the process quietly rather than log out the error. Default is false.
        --escape: escape character used in quoted column. Default is double quote (") according to RFC4108. Change to back slash (\) or other chars for your own case.
        --ignoreColumns: RegExp matched columns to ignore from input. e.g. --ignoreColumns=/(name|age)/
        --includeColumns: RegExp matched columns to include from input. e.g. --includeColumns=/(name|age)/
        --colParser: Specific parser for columns. e.g. --colParser='{"col1":"number","col2":"string"}'
        --alwaysSplitAtEOL: Always interpret each line (as defined by eol) as a row. This will prevent eol characters from being used within a row (even inside a quoted field). This ensures that misplaced quotes only break on row, and not all ensuing rows.
        --nullObject: How to parse if a csv cell contains 'null'. Default false will keep 'null' as string. Change to true if a null object is needed.
        --downstreamFormat: Option to set what JSON array format is needed by downstream. 'line' is also called ndjson format. This format will write lines of JSON
(without square brackets and commas) to downstream. 'array' will write complete JSON array string to downstream (suitable for file writable stream etc). Default 'line'
Examples:
        csvtojson < csvfile
        csvtojson <path to csvfile>
        cat <csvfile> | csvtojson
        csvtojson <csvfilepath> --checkType=false --trim=false --delimiter=#
```
