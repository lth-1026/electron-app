const fs = require('fs')
const PPTX = require('nodejs-pptx')

async function getPPT(pptUrls) {
  const pptContents = await Promise.all(
    pptUrls.map((url) => fetch(url).then((res) => res.arrayBuffer()))
  )

  const pptx = new PPTX.Composer()
  const pptFactory = pptx.presentation.powerPointFactory
  await pptFactory.loadFromRawFileData(pptContents[0])

  // const pptFactory2 = new PPTX.Composer().presentation.powerPointFactory
  // await pptFactory2.loadFromRawFileData(pptContents[1])

  // console.log(pptFactory.slides)
  // console.log(pptFactory2)

  // pptFactory.content[`ppt/media/image3.jpeg`] = ''
  // pptFactory.content[`ppt/media/image4.jpeg`] = ''
  // pptFactory.content[`ppt/media/image5.jpeg`] = ''

  // pptFactory.slides.slide3 = pptFactory2.slides.slide1
  // pptFactory.content[`ppt/slides/slide3.xml`] = pptFactory2.content[`ppt/slides/slide1.xml`]
  // pptFactory.content[`ppt/slides/_rels/slide3.xml.rels`] =
  //   pptFactory2.content[`ppt/slides/_rels/slide1.xml.rels`]
  // pptFactory.content[`docProps/app.xml`].Properties.Slides[0] = 3

  // console.log(pptFactory)

  // await pptx.compose((pres) => {
  //   pres.addSlide((slide) => {
  //     slide.addText((text) => {
  //       text.value('Hello World')
  //     })
  //   })
  // })

  await pptx.save('file.pptx')
  console.log(pptx)
}

export { getPPT }
