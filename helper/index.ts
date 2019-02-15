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
    prefix: 'csv-',
    csvString:
      'key,value,guide\r\ncampaignisfullname,,True or Falsey\r\ncampaignerrorordernotfound,,'
  }
}
