import { saveAs } from 'file-saver'

interface ICsv {
  name?: string
  previx?: string
}

interface ICsvGenerateFile {
  key: string
  value: string
  guide: string
}

export const objectInArrayIsExist = (
  arrayValue: ICsvGenerateFile[],
  objectValue: ICsvGenerateFile
) => {
  return arrayValue.some(function(el) {
    return el.key === objectValue.key
  })
}

export const arrayToCsv = (arrayValue: ICsvGenerateFile[], previx: string) => {
  const key = 'key'
  const value = 'value'
  const guide = 'guide'
  let csvContent = 'data:text/csv;charset=utf-8'
  csvContent += ',key,value,guide\r\n'
  arrayValue.map(val => {
    csvContent += val[key].substr(previx.length)
    csvContent += ','
    csvContent += '"'
    csvContent += val[value]
    csvContent += '"'
    csvContent += ','
    csvContent += '"'
    csvContent += val[guide]
    csvContent += '"'
    csvContent += '\r\n'
  })

  return csvContent
}

const CsvAutoFill = {
  generateFile: (param?: ICsv) => {
    const fileName = param && param.name ? param.name : 'template'
    const previx = param && param.previx ? param.previx : 'csv-'
    const csvListsKey = Array.from(document.querySelectorAll('[name^="' + previx + '"]'))
    const csvArray: ICsvGenerateFile[] = []

    csvListsKey.forEach((list, idx) => {
      const csvGuide = document.querySelector('label[for="' + list.getAttribute('name') + '"]')
      const guideText = csvGuide && csvGuide.textContent ? csvGuide.textContent : ''
      const csvList = {
        guide: guideText,
        key: list.getAttribute('name')!,
        value: ''
      }
      if (!objectInArrayIsExist(csvArray, csvList)) {
        csvArray[idx] = csvList
      }
    })

    const encodedUri = encodeURI(arrayToCsv(csvArray, previx))

    saveAs(encodedUri, `${fileName}.csv`)
  },
  uploadFile: (param?: ICsv) => {
    return 'uploadFile'
  }
}

export default CsvAutoFill
