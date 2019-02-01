import { parse } from 'papaparse'
import { saveAs } from 'file-saver'

interface ICsvGenerate {
  name?: string
  previx?: string
}

interface ICsvGenerateFile {
  key: string
  value: string
  guide: string
}

interface ICsvUpload {
  file: File
  previx?: string
}

interface ICsvUploadFile {
  key: string
  value: string
  guide: string
  disabled: boolean
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
    let temp = text.split('"')
    for (let i = 0; i < temp.length; i++) {
      if (i === temp.length - 1) {
        newStr.push(temp[i])
      } else {
        newStr.push(temp[i])
        newStr.push('""')
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
  generateFile: (param?: ICsvGenerate) => {
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

  uploadFile: (param: ICsvUpload) => {
    const csvPrefix = param && param.previx ? param.previx : 'csv-'
    const f: File = param.file
    let resultCsv: ICsvUploadFile[] = []

    if (
      (f && f.name.substr(f.name.length - 4) === '.csv' && f.type === 'text/csv') ||
      (f && f.name.substr(f.name.length - 4) === '.csv' && f.type === 'application/vnd.ms-excel')
    ) {
      parse(f, {
        complete: (result: any) => {
          let resultArr = result.data
          resultArr.forEach((val: any, idx: any) => {
            if (idx !== 0) {
              const el = document.getElementsByName(csvPrefix + val[0]) as any
              if (el) {
                resultCsv.push({
                  key: val[0],
                  value: val[1],
                  guide: val[2],
                  disabled: !!el.disabled
                })
              }
            }
          })
        }
      })
      return {
        data: resultCsv,
        statusCode: 1
      }
    } else {
      return {
        data: {
          message: 'Please choose a csv file'
        },
        statusCode: 0
      }
    }
  }
}

export default CsvAutoFill
