export const mockData = () => {
  return {
    arrayCsv: [
      {
        key: 'csv-campaignisfullname',
        label: 'Full Name',
        value: 'Angela'
      },
      {
        key: 'csv-campaignerrorordernotfound',
        label: 'Error Order Not Found',
        value: ''
      }
    ],
    objectCsv: [
      {
        key: 'csv-campaignerrorordernotfound',
        label: 'Error Order Not Found',
        value: ''
      },
      {
        key: 'csv-campaignerrornetwork',
        label: 'Error Network',
        value: ''
      }
    ],
    prefix: 'csv-',
    csvString:
      'key,label,value\r\ncampaignisfullname,Full Name,Angela\r\ncampaignerrorordernotfound,Error Order Not Found,'
  }
}
