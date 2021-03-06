# csvautofilljs

[![Build Status](https://travis-ci.org/angelamelinda/csvautofilljs.svg?branch=master)](https://travis-ci.org/angelamelinda/csvautofilljs)
[![Coverage Status](https://coveralls.io/repos/github/angelamelinda/csvautofilljs/badge.svg?branch=master)](https://coveralls.io/github/angelamelinda/csvautofilljs?branch=master)

**AutoFillJS** is a **front-end** library package that serves one purpose: fill the form without have to re-type the same value over and over again. By using CSV and attach it, people are able to just re-fill same value to different form without spending more time and work.

## Goal

- User takes less time and work to duplicate the data, for e.g. events, campaigns, etc.
- Standardise **front-end** code to be more uniform.

## Installation

To install the library, refer to this link:
[https://www.npmjs.com/package/csvautofilljs](https://www.npmjs.com/package/csvautofilljs)
or

```bash
npm install --save csvautofilljs
```

## How to use

Import CsvAutoFill from the library

```bash
import { CsvAutoFill } from 'csvautofilljs'
```

#### Generate File

The generateFile method accepts an object contains `optional filename and prefix`.

```javascript
generateFile({ name: '<optional custom filename>', prefix: '<optional custom prefix>' })
```

The default value:

| param  | value    |
| ------ | -------- |
| name   | template |
| prefix | csv-     |

The generateFile method returns csv file with this format:

| key       | label      | value |
| --------- | ---------- | ----- |
| firstName | First Name | Jane  |

##### Step to setup

- Add attribute name at the input/ textarea/select with prefix + the state.
  E.g if the state is `firstName` and the prefix is `csv-`, then the input name is `csv-firstName`.
- If you want to put label to help the user to fill the input/textarea/select, add a label with attribute htmlFor(if you use React) that refer to the input name.

Example:

```javascript
<label htmlFor="csv-firstName">First Name</label>
<input type="text" name="csv-firstName" value="..."/>
```

Example of custom filename and prefix:

```javascript
<button onClick={() => CsvAutoFill.generateFile({ name: 'csv-template', prefix: 'csv' })}>
  Generate File
</button>
```

#### Upload File

The uploadFile method accepts an object contains `file` and `optional custom prefix`.

The default value:

| param  | value |
| ------ | ----- |
| prefix | csv-  |

The uploadFile method returns an object contains data and status code.
If the file is wrong, the return will be:

```javascript
{
    data: {
        message: "Please choose a csv file"
    },
    statusCode: 0
}
```

If the file is csv and the element is exist, the return will be:

```javascript
{
    data: [
        {
            disabled: <false or true>,
            key: "<the key>",
            label: "<the label>",
            value: "<the value>"
        }
    ],
    statusCode: 1
}
```

##### Step to setup

Example of how to use the method:

```javascript
...
constructor() {
    this.state = {
        file: null,
        fileName: ""
    }

    this.handleUpload = this.handleUpload.bind(this);
    this.handleChooseFile = this.handleChooseFile.bind(this);
}

handleUpload(e) {
    e.preventDefault();

    CsvAutoFill.uploadFile({ file: this.state.file }).then(
      result => {
          // the setState process
      }
    );
}

handleChooseFile(e) {
    const file = e.target.files[0];
    let state = file
      ? {
          fileName: file.name,
          file
        }
      : {
          fileName: null,
          file: null
        };

    this.setState(state);
    e.target.value = null;
}

render() {
    return (
        <input type="file" onChange={this.handleChooseFile} />
        <button onClick={this.handleUpload}>Upload</button>
...
```

## Examples

This is the example of csvautofilljs:
[https://github.com/angelamelinda/sample-csvautofill](https://github.com/angelamelinda/sample-csvautofill)

## Contributing

Please refer to each project's style guidelines and guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1. **Fork** the repo on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull request** so that we can review your changes
   NOTE: Be sure to merge the latest from "upstream" before making a pull request.

## License

csvautofilljs is released under the MIT license.
