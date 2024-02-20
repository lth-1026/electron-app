/* eslint-disable no-sparse-arrays */
const ExcelJS = require('exceljs')
const createOuterBorder = require('./createOuterBorder.js')

const defaultRowHeight = 18.75
const outlineBorderWidth = 'thick'

function formatDate(date) {
  // 월(Month) 이름 배열
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  // 날짜와 월을 추출합니다.
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear().toString().slice(-2) // 끝에서 두 자리만 추출합니다.

  // 월(Month) 이름을 가져옵니다.
  const monthName = monthNames[monthIndex]

  // dd-mmm-yy 형식으로 날짜를 반환합니다.
  return `${day}-${monthName}-${year}`
}

const today = formatDate(new Date())
console.log(today)

const docuNo = 'DMC_0115_01'
const eventTitle = 'Golden turtle ships of AB Planning Mexico'
const issueDate = today
const eventDate = today
const client = 'Grupoamasb'
const attn = 'Ximena Estrada Torres'
const contactNo = 'xestrada@grupoamasb.mx'
const cmo = { name: 'Kayla LEE', contact: 'kayla.lee@channelk.kr' }
const mannager = [
  { name: 'Jaden KIL', contact: 'jaden.kil@channelk.kr' },
  { name: 'James Eun', contact: 'james.eun@channelk.kr' }
]

const workbook = new ExcelJS.Workbook()

workbook.creator = 'Channelk'
workbook.lastModifiedBy = 'Channelk'
workbook.created = new Date()
workbook.modified = new Date()
workbook.lastPrinted = new Date()

// create new sheet with pageSetup settings for A4 - landscape
const worksheet = workbook.addWorksheet('Items for event', {
  properties: { defaultRowHeight: defaultRowHeight },
  pageSetup: { fitToPage: true, fitToWidth: 1 }
})

//header and footer
worksheet.headerFooter.differentFirst = true
worksheet.headerFooter.firstHeader = '&R&K542960&9 From now on,\nyour success story will be with us'
worksheet.headerFooter.firstFooter =
  // eslint-disable-next-line prettier/prettier, no-useless-escape
  '&C&KB3B3B3&\"Century Gothic\"&11 E-mail : info@channelk.kr l Tel : +82 (0)70 4268 5022 l Fax : +82 (0)2 430 5745\n(05836) C-1110, H business park, 26, Beobwon-ro 9-gil, Songpa-gu, Seoul, Republic of Korea&R&K542960&8(&P)'

//values
const rows = [
  ['Costing'],
  [null, , , , , , , 'Issue date', issueDate],
  [null, , , , , , , 'Docu No.', docuNo],
  ['event title', , , eventTitle],
  ['event date', , , eventDate],
  [null, , 'TO.', 'Client.', client],
  [null, , 'TO.', 'ATTN.', attn],
  [null, , 'TO.', 'Contact No.', contactNo],
  [null, , 'From.', 'CMO.', cmo.name],
  [null, , 'From.', , cmo.contact],
  [null, , 'From.', 'Mannager', mannager[0].name, , , mannager[1].name],
  [null, , 'From.', , mannager[0].contact, , , mannager[1].contact]
]

worksheet.addRows(rows)

//set column width
worksheet.getColumn(1).width = 7
worksheet.getColumn(2).width = 18
worksheet.getColumn(3).width = 50
worksheet.getColumn(4).width = 12
worksheet.getColumn(5).width = 10
worksheet.getColumn(6).width = 10
worksheet.getColumn(7).width = 15
worksheet.getColumn(8).width = 12
worksheet.getColumn(9).width = 20

//row1 style
worksheet.getRow(1).height = 37

worksheet.addConditionalFormatting({
  ref: 'A1:I1',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        font: { size: 20, color: { theme: 0 }, name: 'Century Gothic', family: 2, bold: true },
        fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: '542960' } },
        alignment: { vertical: 'middle' }
      }
    }
  ]
})

//row2 style
worksheet.getRow(2).height = defaultRowHeight

worksheet.addConditionalFormatting({
  ref: 'H2:I2',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        alignment: { horizontal: 'center' },
        border: { bottom: { style: 'thin' }, right: { style: outlineBorderWidth } }
      }
    }
  ]
})

worksheet.getCell('I2').font = { bold: true }

//row3 style
worksheet.getRow(3).height = defaultRowHeight

worksheet.getCell('H3').alignment = { horizontal: 'center' }
worksheet.getCell('I3').style = {
  font: { bold: true },
  alignment: { horizontal: 'center' }
}

//row4 style
worksheet.getRow(4).height = defaultRowHeight

worksheet.mergeCells('A4:C4')
worksheet.getCell('A4').style = {
  font: { bold: true },
  alignment: { horizontal: 'center' }
}
worksheet.addConditionalFormatting({
  ref: 'A4:C4',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        border: {
          top: { style: 'thin' },
          left: { style: outlineBorderWidth },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    }
  ]
})

worksheet.mergeCells('D4:I4')
worksheet.addConditionalFormatting({
  ref: 'D4:I4',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: outlineBorderWidth }
        }
      }
    }
  ]
})

//row5 style
worksheet.getRow(5).height = defaultRowHeight

worksheet.mergeCells('A5:C5')
worksheet.getCell('A5').style = {
  font: { bold: true },
  alignment: { horizontal: 'center' }
}
worksheet.addConditionalFormatting({
  ref: 'A5:C5',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        border: {
          top: { style: 'thin' },
          left: { style: outlineBorderWidth },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    }
  ]
})

worksheet.mergeCells('D5:I5')
worksheet.addConditionalFormatting({
  ref: 'D5:I5',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: outlineBorderWidth }
        }
      }
    }
  ]
})

//row6 ~ row8
//to
worksheet.getRow(6).height = defaultRowHeight
worksheet.getRow(7).height = defaultRowHeight
worksheet.getRow(8).height = defaultRowHeight

worksheet.mergeCells('C6:C8')
worksheet.getCell('C6').style = {
  font: { bold: true },
  alignment: { horizontal: 'center', vertical: 'middle' }
}
createOuterBorder(worksheet, { row: 6, col: 1 }, { row: 8, col: 3 })

//client, attn, contact no.
worksheet.addConditionalFormatting({
  ref: 'D6:D8',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        alignment: { horizontal: 'right' },
        font: { bold: true },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    }
  ]
})

//row9 ~ row12
//to
worksheet.getRow(9).height = defaultRowHeight
worksheet.getRow(10).height = defaultRowHeight
worksheet.getRow(11).height = defaultRowHeight
worksheet.getRow(12).height = defaultRowHeight

worksheet.mergeCells('C9:C12')
worksheet.getCell('C9').style = {
  font: { bold: true },
  alignment: { horizontal: 'center', vertical: 'middle' }
}
createOuterBorder(worksheet, { row: 9, col: 1 }, { row: 12, col: 3 })

//client, attn, contact no.
worksheet.addConditionalFormatting({
  ref: 'D9:D11',
  rules: [
    {
      type: 'expression',
      formulae: [true],
      style: {
        alignment: { horizontal: 'right' },
        font: { bold: true },
        border: {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    }
  ]
})
worksheet.getCell('D12').border = { bottom: { style: outlineBorderWidth } }

//client,attn,contact no values border
for (let rowIndex = 6; rowIndex <= 12; rowIndex++) {
  createOuterBorder(worksheet, { row: rowIndex, col: 5 }, { row: rowIndex, col: 9 })
}

//introduce scetion
createOuterBorder(worksheet, { row: 1, col: 1 }, { row: 12, col: 9 }, outlineBorderWidth)

//make file
workbook.xlsx.writeFile('Quote.xlsx')
