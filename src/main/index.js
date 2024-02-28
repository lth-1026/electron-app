import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { mergePDFs } from './pdf.js'
import { downloadPPTs } from './ppt.js'

const { Client } = require('@notionhq/client')

//todo: 파일에서 가져오는 것으로 바꿀 것
const token = 'secret_HOa5UpkTWIiIYiCSAD75ikyTzy4Lof6cd5l78QaD0I2'
const databaseId = '42c3642bc808464a81aefd349f73a02e'

const notion = new Client({
  auth: token
})

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  async function getNotionData() {
    //노션에서 데이터 받아오기
    const query = {
      database_id: databaseId
    }

    let has_more = true
    const data = []

    while (has_more) {
      const response = await requestToNotionDatabase(query)
      data.push(...response.results)

      //만약 다음 페이지가 존재한다면 has_more과 다음 페이지 주소 받아와 query 넣은 후 notion에 데이터 요청
      has_more = response.has_more
      if (has_more) {
        query.start_cursor = response.next_cursor
      }
    }

    return data
  }

  async function requestToNotionDatabase(query) {
    return await notion.databases.query(query).catch((e) => console.error(e))
  }

  function processData(data) {
    console.log(data)
    const dataMap = new Map()
    data.forEach((item) => {
      //catagory
      item.properties.category.multi_select.forEach((_category) => {
        const category = _category.name

        //final 데이터 이름 삽입
        item.properties.name.title = item.properties.name.title.filter((name) => name.plain_text)

        //category가 key에 없다면 value를 새로운 map으로 생성
        if (!dataMap.has(category)) dataMap.set(category, new Map())

        //tag
        const tagMultiSelect = item.properties.tag.multi_select
        const currentCategory = dataMap.get(category)

        //만약 tag가 없다면 태그 없음으로 dataMap에 넣고 tag가 있다면 태그에 해당하는 내용 넣기
        if (tagMultiSelect.length == 0) {
          const tag = '태그 없음'
          pushToDataMap(tag, item)
        } else {
          item.properties.tag.multi_select.forEach((_tag) => {
            const tag = _tag.name
            pushToDataMap(tag, item)
          })
        }

        function pushToDataMap(tag, item) {
          if (!currentCategory.has(tag)) currentCategory.set(tag, [])
          currentCategory.get(tag).push(item)
        }
      })
    })

    console.log(dataMap)

    return dataMap
  }

  // 페이지가 로드된 후에 데이터 전송
  mainWindow.webContents.once('dom-ready', async () => {
    console.log('get-notion-data!')

    const data = await getNotionData()

    const dataMap = processData(data)

    // Renderer 프로세스에 Notion 데이터 전달
    mainWindow.webContents.send('notion-data', dataMap)
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
//getPPT('')

ipcMain.on('make-pdf-proposal', async (event, args) => {
  await mergePDFs(mappingForDownload(args, 'pdf'), 'merged_output.pdf', event).catch((error) =>
    console.error('Error merging PDFs:', error)
  )
  event.sender.send('proposal-process-done', 1)
})

ipcMain.on('make-ppt-proposal', async (event, args) => {
  await downloadPPTs(mappingForDownload(args, 'ppt'), event).catch((error) =>
    console.error('Error merging ppts:', error)
  )
  event.sender.send('proposal-process-done', 1)
})

//properties의 files 에 값이 존재하는 것들만 가져온 후 index와 url을 하나의 객체로 생성 후 배열로 반환
function mappingForDownload(items, propertiesName) {
  return items.reduce((accum, item) => {
    const files = item.properties[propertiesName].files
    //files에 값이 존재할 때만 file의 index와 name, url을 만들어 연산 수행
    if (files.length != 0) {
      files
        .sort((num1, num2) => num1 - num2) //files가 여러개면 이름 순서대로 정렬 됨.
        .forEach((file) => {
          accum.push({
            index: accum.length,
            name: file.name,
            url: file.file.url
          })
        })
    }
    return accum
  }, [])
}
