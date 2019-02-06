export const mockData = () => {
  return {
    arrayCsv: [
      {
        key: 'csv-campaignisfullname',
        value: '',
        guide: 'True or Falsey'
      },
      {
        key: 'csv-campaignerrorordernotfound',
        value: '',
        guide: ''
      }
    ],
    objectCsv: [
      {
        key: 'csv-campaignerrorordernotfound',
        value: '',
        guide: ''
      },
      {
        key: 'csv-campaignerrornetwork',
        value: '',
        guide: ''
      }
    ],
    previx: 'csv-',
    csvString:
      'data:text/csv;charset=utf-8,key,value,guide\r\ncampaignisfullname,,True or Falsey\r\ncampaignerrorordernotfound,,'
  }
}
