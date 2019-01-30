import Papa from 'papaparse'

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

export const checkUniqueCharCsv = (text: string) => {
  let str = text

  if (text.indexOf('"') > 0) {
    let newStr = []
    newStr.push('"')
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '"') {
        newStr.push('"')
        newStr.push(text[i])
      } else {
        newStr.push(text[i])
      }
    }
    newStr.push('"')
    str = newStr.join('')
  } else if (text.indexOf(',') > 0 || text.indexOf('\r') > 0 || text.indexOf('\n') > 0) {
    str = '"' + text + '"'
  }

  return str
}

export const arrayToCsv = (arrayValue: ICsvGenerateFile[], previx: string) => {
  const key = 'key'
  const value = 'value'
  const guide = 'guide'
  let csvContent = 'data:text/csv;charset=utf-8'
  csvContent += ',key,value,guide\r\n'
  arrayValue.map(val => {
    csvContent += checkUniqueCharCsv(val[key].substr(previx.length))
    csvContent += ','
    csvContent += checkUniqueCharCsv(val[value])
    csvContent += ','
    csvContent += checkUniqueCharCsv(val[guide])
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
    console.log(csvListsKey)
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
  uploadFile: () => {
    return 'uploadFile'
  }
}

export default CsvAutoFill
