import { parse } from 'papaparse'
import { saveAs } from 'file-saver'

interface ICsvGenerate {
  name?: string
  prefix?: string
}

interface ICsvGenerateFile {
  key: string
  value: string
  label: string
}

interface ICsvUpload {
  file: File
  prefix?: string
}

interface ICsvUploadFile {
  key: string
  value: string
  label: string
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

export const checkValueType = (value: any, type: string) => {
  if (type === 'checkbox' || type === 'radio') {
    return value !== '' ? true : false
  } else {
    return value
  }
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

export const arrayToCsv = (arrayValue: ICsvGenerateFile[], prefix: string) => {
  const key = 'key'
  const label = 'label'
  const value = 'value'
  let delimiter = navigator.platform.toLowerCase().match(/(win)/i) ? ';' : ','
  let newLine = '\r\n'
  let csvContent = key + delimiter + label + delimiter + value + newLine
  arrayValue.forEach((val, id) => {
    csvContent += checkUniqueCharCsv(val[key].substr(prefix.length))
    csvContent += delimiter
    csvContent += checkUniqueCharCsv(val[label])
    csvContent += delimiter
    csvContent += checkUniqueCharCsv(val[value])
    if (id !== arrayValue.length - 1) {
      csvContent += newLine
    }
  })

  return csvContent
}

export const parseData = (content: File) => {
  let data: any
  return new Promise(resolve => {
    const reader = new FileReader()
    let delimiter
    reader.readAsText(content),
      (reader.onload = () => {
        const resultReader = reader.result as string
        const resultSubs = resultReader.substring(0, resultReader.indexOf('value'))
        delimiter = resultSubs.substring(4, 3)
        parse(content, {
          delimiter: delimiter,
          complete: (result: any) => {
            data = result.data
            resolve(data)
          }
        })
      })
  })
}

export const CsvAutoFill = {
  generateFile: function(param?: ICsvGenerate) {
    const fileName = param && param.name ? param.name : 'template'
    const prefix = param && param.prefix ? param.prefix : 'csv-'
    const csvListsKey = Array.from(document.querySelectorAll('[name^="' + prefix + '"]'))
    const csvArray: ICsvGenerateFile[] = []

    csvListsKey.forEach(list => {
      const label = document.querySelector('label[for="' + list.getAttribute('name') + '"]')
      const labelText = label && label.textContent ? label.textContent : ''
      const csvList = {
        key: list.getAttribute('name')!,
        label: labelText,
        value: ''
      }
      if (!objectInArrayIsExist(csvArray, csvList)) {
        csvArray.push(csvList)
      }
    })
    const csvContent = arrayToCsv(csvArray, prefix)

    saveAs(new Blob([csvContent], { type: 'text/csv' }), `${fileName}.csv`)
  },

  uploadFile: async function(param: ICsvUpload) {
    const csvPrefix = param && param.prefix ? param.prefix : 'csv-'
    const f: File = param.file
    let resultCsv: Array<ICsvUploadFile> = []
    let result

    if (
      (f && f.name.substr(f.name.length - 4) === '.csv' && f.type === 'text/csv') ||
      (f && f.name.substr(f.name.length - 4) === '.csv' && f.type === 'application/vnd.ms-excel')
    ) {
      await parseData(f).then((data: any) => {
        if (data) {
          data.forEach((val: any, idx: any) => {
            if (idx !== 0) {
              const el = document.getElementsByName(csvPrefix + val[0]) as any
              if (el.length > 0) {
                resultCsv.push({
                  key: val[0],
                  label: val[1],
                  value: checkValueType(val[2], el[0].getAttribute('type')),
                  disabled: !!el.disabled
                })
              }
            }
          })
        }
      })

      result = {
        data: resultCsv,
        statusCode: 1
      }
    } else {
      result = {
        data: {
          message: 'Please choose a csv file'
        },
        statusCode: 0
      }
    }
    return result
  }
}
