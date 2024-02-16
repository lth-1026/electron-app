const ExcelJS = require('exceljs')

const workbook = new ExcelJS.Workbook()

workbook.creator = 'Me'
workbook.lastModifiedBy = 'Her'
workbook.created = new Date(1985, 8, 30)
workbook.modified = new Date()
workbook.lastPrinted = new Date(2016, 9, 27)

// create new sheet with pageSetup settings for A4 - landscape
const worksheet = workbook.addWorksheet('My Sheet', {
  pageSetup: { paperSize: 9, orientation: 'landscape' }
})

worksheet.views = [{ state: 'frozen', xSplit: 2, ySplit: 3, topLeftCell: 'G10', activeCell: 'A1' }]

workbook.csv.writeFile('Quote.csv')
