const fs = require('fs')
const { exec } = require('child_process')

const dir = 'pptFiles/'
// PowerPoint 실행 명령어
const powerpointCommand = 'start powerpnt.exe "ppt_merge.pptm"'

async function downloadPPTs(ppts, event) {
  try {
    //기존 디렉토리 삭제
    fs.rmSync(dir, { recursive: true, force: true })
    // 디렉토리가 없으면 생성
    fs.mkdirSync(dir, { recursive: true })

    // Promise.all을 사용하여 모든 다운로드 작업을 병렬로 실행
    await Promise.all(
      ppts.map(async (ppt) => {
        const response = await fetch(ppt.url)
        const pptBuffer = await response.arrayBuffer()
        // 파일 쓰기
        fs.writeFileSync(dir + String(ppt.index).padStart(5, '0') + '.pptx', Buffer.from(pptBuffer))
        event.sender.send('ppt-done', 1)
        console.log(`Downloaded ${ppt.index}.pptx from ${ppt.url}`)
      })
    )

    console.log('All files downloaded successfully!')
  } catch (error) {
    console.error('Error downloading files:', error)
  }

  event.sender.send('ppt-download-done', 1)

  // PowerPoint 실행 명령어
  // eslint-disable-next-line no-unused-vars
  exec(powerpointCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`)
      return
    }
    console.log(`PowerPoint opened successfully`)
  })
}

export { downloadPPTs }
