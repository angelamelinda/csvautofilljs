import { JSDOM } from 'jsdom'
import * as Papa from 'papaparse'

const globalAny: any = global

const documentHTML = '<!DOCTYPE html><html><body><div id="root"></div></body></html>'
globalAny.document = new JSDOM(documentHTML).window.document

globalAny.File = class MockFile {
  name: string
  constructor(
    parts: (string | Blob | ArrayBuffer | ArrayBufferView)[],
    name: string,
    properties?: FilePropertyBag
  ) {
    this.name = name
  }
}

globalAny.parse = class Papa {
  file: File
  constructor(file: File, config?: Papa.ParseConfig | undefined) {
    this.file = file
  }
}
