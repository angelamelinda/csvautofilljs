import { JSDOM } from 'jsdom'
import * as Papa from 'papaparse'

const globalAny: any = global

const documentHTML = '<!DOCTYPE html><html><body><div id="root"></div></body></html>'
globalAny.document = new JSDOM(documentHTML).window.document
globalAny.navigator = {
  platform: 'Mac'
}

globalAny.File = class MockFile {
  name: string
  type: string | undefined
  bits: (string | Blob | ArrayBuffer | ArrayBufferView)[]
  constructor(
    parts: (string | Blob | ArrayBuffer | ArrayBufferView)[],
    name: string,
    properties: FilePropertyBag
  ) {
    this.bits = parts
    this.name = name
    this.type = properties.type
  }
}

globalAny.Blob = class MockBlob {
  name: string
  bits: (string | Blob | ArrayBuffer | ArrayBufferView)[]
  constructor(
    parts: (string | Blob | ArrayBuffer | ArrayBufferView)[],
    name: string,
    properties: BlobPropertyBag
  ) {
    this.bits = parts
    this.name = name
  }
}

globalAny.parse = class Papa {
  file: File
  constructor(file: File, config?: Papa.ParseConfig | undefined) {
    this.file = file
  }
}

globalAny.FileReaderSync = class MockFileReaderSync {
  // tslint:disable-next-line:no-empty
  readAsArrayBuffer(blob: Blob) {}
  // tslint:disable-next-line:no-empty
  readAsBinaryString(blob: Blob) {}
  // tslint:disable-next-line:no-empty
  readAsText(blob: Blob) {}
  // tslint:disable-next-line:no-empty
  readAsDataUrl(blob: Blob) {}
}

const reader = new globalAny.FileReaderSync()

globalAny.FileReader = class MockFileReader {
  // tslint:disable-next-line:no-empty
  readAsText(blob: Blob) {}
}
