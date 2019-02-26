import {
  CsvAutoFill,
  objectInArrayIsExist,
  arrayToCsv,
  checkUniqueCharCsv,
  parseData
} from '../src/csvautofilljs'
import * as helper from '../helper'
import * as FileSaver from 'file-saver'

describe('CsvAutoFill', () => {
  let props = helper.mockData()

  const fileCsv = new File([props.csvString], 'csv.csv', { type: 'text/csv' })

  const fileMsCsv = new File([props.csvString], 'csv.csv', { type: 'application/vnd.ms-excel' })

  const fileTxt = new File([props.csvString], 'csv.txt', { type: 'text/plain' })

  document.body.innerHTML =
    '<div>' +
    '<form>' +
    '<label for="csv-firstname">Please fill, your first name</label>' +
    '<input type="text" name="csv-firstname" />' +
    '<label for="csv-firstname">Please fill, your first name</label>' +
    '<input type="text" name="csv-firstname" />' +
    '<label for="csv-lastname"></label>' +
    '<input type="text" name="csv-lastname" />' +
    '</form>' +
    '</div>'

  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('return true if object is exist in the array', () => {
    expect(objectInArrayIsExist(props.arrayCsv, props.objectCsv[0])).toBe(true)
  })

  it('return false if object is exist in the array', () => {
    expect(objectInArrayIsExist(props.arrayCsv, props.objectCsv[1])).toBe(false)
  })

  it('return csv file', () => {
    expect(arrayToCsv(props.arrayCsv, props.prefix, false)).toBe(props.csvString)
  })

  it('return same text with the input', () => {
    expect(checkUniqueCharCsv('Please fill the name')).toBe('Please fill the name')
  })

  it('wrapped the text "" if contains " and add "', () => {
    expect(checkUniqueCharCsv('Please " fill the name')).toBe('"Please "" fill the name"')
  })

  it('wrapped the text "" if contains " and add "', () => {
    expect(checkUniqueCharCsv('Please "" fill the name')).toBe('"Please """" fill the name"')
  })

  it('wrapped the text "" if contains ,', () => {
    expect(checkUniqueCharCsv('Please, fill the name')).toBe('"Please, fill the name"')
  })

  it('wrapped the text if contains enter r', () => {
    expect(checkUniqueCharCsv('Please\r fill the name')).toBe('"Please\r fill the name"')
  })

  it('wrapped the text if contains enter n', () => {
    expect(checkUniqueCharCsv('Please\n fill the name')).toBe('"Please\n fill the name"')
  })

  it('test generate file', () => {
    spyOn(FileSaver, 'saveAs')

    CsvAutoFill.generateFile()
  })

  it('test generate file with name', () => {
    spyOn(FileSaver, 'saveAs')

    CsvAutoFill.generateFile({ name: 'templatex' })
  })

  it('test generate file with prefix', () => {
    spyOn(FileSaver, 'saveAs')

    CsvAutoFill.generateFile({ prefix: 'csv-' })
  })

  it('test generate file with name and prefix', () => {
    spyOn(FileSaver, 'saveAs')

    CsvAutoFill.generateFile({ name: 'templatex', prefix: 'csv-' })
  })

  it('test upload file with type text/csv', () => {
    let upload = CsvAutoFill.uploadFile({
      file: fileCsv
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  })

  it('test upload file with type application/vnd.ms-excel', () => {
    let upload = CsvAutoFill.uploadFile({
      file: fileMsCsv
    }).then(result => {
      console.log(result)
    })
  })

  it('test upload file with wrong file type', () => {
    let upload = CsvAutoFill.uploadFile({
      file: fileTxt
    }).then(result => {
      console.log(result)
    })
  })

  it('test upload file with prefix', () => {
    let upload = CsvAutoFill.uploadFile({
      prefix: 'csv-',
      file: fileCsv
    }).then(result => {
      console.log(result)
    })
  })
})
