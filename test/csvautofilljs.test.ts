import CsvAutoFill from '../src/csvautofilljs'

/**
 * CsvAutoFill
 */
describe('CsvAutoFill', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })
  it('return generateFile', () => {
    expect(CsvAutoFill.generateFile()).toBe('generateFile')
  })
  it('return uploadFile', () => {
    expect(CsvAutoFill.uploadFile()).toBe('uploadFile')
  })
})
