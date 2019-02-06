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

  const fileCsv = new File(
    ['key,value,guide\r\nfirstname,Angela,"Please fill, your first name"\r\nlastname,Melinda,'],
    'csv.csv',
    { type: 'text/csv' }
  )

  const fileMsCsv = new File(
    ['key,value,guide\r\nfirstname,Angela,"Please fill, your first name"\r\nlastname,Melinda,'],
    'csv.csv',
    { type: 'application/vnd.ms-excel' }
  )

  const fileTxt = new File(
    ['key,value,guide\r\nfirstname,Angela,"Please fill, your first name"\r\nlastname,Melinda,'],
    'csv.txt',
    { type: 'text/plain' }
  )

  document.body.innerHTML =
    '<div>' +
    '<form>' +
    '<label for="csv-firstname" hidden>Please fill, your first name</label>' +
    '<input type="text" name="csv-firstname" />' +
    '<label for="csv-firstname" hidden>Please fill, your first name</label>' +
    '<input type="text" name="csv-firstname" />' +
    '<label for="csv-lastname" hidden></label>' +
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
    expect(arrayToCsv(props.arrayCsv, props.previx)).toBe(props.csvString)
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

  it('test generate file with previx', () => {
    spyOn(FileSaver, 'saveAs')

    CsvAutoFill.generateFile({ previx: 'csv-' })
  })

  it('test generate file with name and previx', () => {
    spyOn(FileSaver, 'saveAs')

    CsvAutoFill.generateFile({ name: 'templatex', previx: 'csv-' })
  })

  it('test upload file', () => {
    let upload = CsvAutoFill.uploadFile({
      file: fileCsv
    }).then(result => {
      console.log(result)
    })
  })

  it('test upload file', () => {
    let upload = CsvAutoFill.uploadFile({
      file: fileMsCsv
    }).then(result => {
      console.log(result)
    })
  })

  it('test upload file with wrong file', () => {
    let upload = CsvAutoFill.uploadFile({
      file: fileTxt
    }).then(result => {
      console.log(result)
    })
  })

  it('test upload file with previx', () => {
    let upload = CsvAutoFill.uploadFile({
      previx: 'csv-',
      file: fileCsv
    }).then(result => {
      console.log(result)
    })
  })

  it('test parse', () => {
    let x = parseData(fileCsv)
    console.log(x)
  })
})
