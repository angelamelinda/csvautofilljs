import CsvAutoFill, { objectInArrayIsExist, arrayToCsv } from '../src/csvautofilljs'
import * as helper from '../helper'
import * as FileSaver from 'file-saver'
/**
 * CsvAutoFill
 */
describe('CsvAutoFill', () => {
  let props = helper.mockData()

  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('return uploadFile', () => {
    expect(CsvAutoFill.uploadFile()).toBe('uploadFile')
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

  it('test generate file', () => {
    spyOn(FileSaver, 'saveAs')

    CsvAutoFill.generateFile()
  })
})
