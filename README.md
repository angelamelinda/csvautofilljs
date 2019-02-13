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

```javascript
import { CsvAutoFill } from 'csvautofilljs'
```

#### Generate File

The generateFile method accepts an object contains `optional filename and previx`.

```javascript
generateFile({ name: '<optional custom filename>', previx: '<optional custom previx>' })
```

The default value:

| Key    | Value    |
| ------ | -------- |
| name   | template |
| previx | csv-     |

The generateFile method returns csv file with this format:

| key       | value | guide                |
| --------- | ----- | -------------------- |
| firstName | Jane  | Only your first name |

##### Step to setup

- Add attribute name at the input/ textarea/select with prefix + the state.
  E.g if the state is `firstName` and the previx is `csv-`, then the input name is `csv-firstName`.
- If you want to put guide to help the user to fill the input/textarea/ select, add a hidden label with attribute htmlFor(if you use React) that refer to the input name.

Example:

```javascript
<label htmlFor="csv-firstName" hidden>Only your first name</label>
<input type="text" name="csv-firstName" value="..."/>
```

Example of custom file name:

```javascript
<button onClick={() => CsvAutoFill.generateFile({ name: 'csv-template' })}>Generate File</button>
```

Example of custom previx:

```javascript
<button onClick={() => CsvAutoFill.generateFile({ previx: 'csv' })}> Generate File</button>
```

Example of custom filename and previx:

```javascript
<button onClick={() => CsvAutoFill.generateFile({ name: 'csv-template', previx: 'csv' })}>
  Generate File
</button>
```

#### Upload File

The uploadFile method accepts an object contains `file` and `optional custom previx`.
The default value:
| Key | Value |
| ----- | ----- |
| previx | csv- |

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
            disabled: "<false or true>",
            guide: "<the guide>",
            key: "<the key>",
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

    let result = CsvAutoFill.uploadFile({ file: this.state.file }).then(
      result => {
          // the setState process
      }
    );
}

handleChooseFile(e) {
    const file = e.target.files[0];
    let state = {};
    if (file) {
      state = {
        fileName: file.name,
        file
      };
    } else {
      state = {
        fileName: null,
        file: null
      };
    }
    this.setState(state);
}

render() {
    return (
        <input type="file" onChange={this.handleChooseFile} />
        <button onClick={this.handleUpload}>Upload</button>
...
```

## Examples

This is the example of csvautofilljs.

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
