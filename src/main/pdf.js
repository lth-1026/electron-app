const { PDFDocument } = require('pdf-lib')
const fs = require('fs')

async function mergePDFs(urls, outputPath) {
  const pdfBuffers = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.arrayBuffer()))
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

// Usage example
const inputPDFs = ['input1.pdf', 'input2.pdf']
const outputPDF = 'merged_output.pdf'

export { mergePDFs }
