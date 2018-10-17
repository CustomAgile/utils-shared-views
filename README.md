# @agile-central-technical-services/utils-shared-views

This module provides overrides for Rally.ui.gridboard.SharedViewComboBox for bug fixes including:
* fixes a bug in the SharedViewComboBox which prevents a newly created
view from appearing in the view picker until after an app reload
* allows the `enableUrlSharing` option to work

## Installation
1. Install using npm (or yarn) `npm install @agile-central-technical-services/utils-shared-views`
2. Add the file to the `javascript` section of `config.json`
    ```
     "javascript": [
        "node_modules/@agile-central-technical-services/utils-shared-views/index.js",
        ...
    ```

## Developer Notes
To Update
1. `npm version patch` - This will update the package.json to a new version and create a git tag (e.g. `v1.0.1`). It will also run the `postversion` script
to push the changes and tag to GitHub.
2. `npm publish --access public` - This will publish the new version to npmjs.org
3. Create the new release in [`utils-shared-views/releases'](https://github.com/RallyTechServices/utils-shared-views/releases)


