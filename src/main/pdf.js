import { checkExtenstion } from './utils'

const { PDFDocument } = require('pdf-lib')
const fs = require('fs')

async function mergePDFs(pdfs, outputPath, event) {
  pdfs = pdfs.filter((pdf) => checkExtenstion(pdf.name, ['.pdf']))
  const pdfBuffers = await Promise.all(
    pdfs.map((pdf) =>
      fetch(pdf.url).then((res) => {
        event.sender.send('download-done', 1)
        return res.arrayBuffer()
      })
    )
  )
  const mergedPdf = await PDFDocument.create()

  for (const pdfBuffer of pdfBuffers) {
    const pdf = await PDFDocument.load(pdfBuffer)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page)
    })
  }

  const mergedPdfBytes = await mergedPdf.save()
  fs.writeFileSync(outputPath, mergedPdfBytes)
  console.log('PDF files merged successfully!')
}

export { mergePDFs }
