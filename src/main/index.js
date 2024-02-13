import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { mergePDFs } from './pdf.js'

const { Client } = require('@notionhq/client')

const notion = new Client({
  auth: 'secret_HOa5UpkTWIiIYiCSAD75ikyTzy4Lof6cd5l78QaD0I2' // 여기에 발급받은 토큰을 넣어주세요.
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

  // 페이지가 로드된 후에 데이터 전송
  mainWindow.webContents.once('dom-ready', async () => {
    console.log('get-notion-data!')
    try {
      const response = await notion.databases.query({
        database_id: '42c3642bc808464a81aefd349f73a02e' // 여기에 Notion 데이터베이스의 ID를 넣어주세요.
      })

      const data = response.results

      const dataMap = new Map()
      data.forEach((item) => {
        item.properties.태그.multi_select.forEach((tagData) => {
          const tagName = tagData.name
          let finalData = item
          finalData.properties.이름.title = item.properties.이름.title.filter(
            (mItem) => mItem.plain_text
          )
          if (!dataMap.has(tagName)) dataMap.set(tagName, [])
          dataMap.get(tagName).push(finalData)
        })
      })

      // Renderer 프로세스에 Notion 데이터 전달
      mainWindow.webContents.send('notion-data', dataMap)
    } catch (error) {
      console.error('Error fetching Notion data:', error.message)
    }
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

ipcMain.on('proposal-data', (event, args) => {
  console.log(args)
  mergePDFs(
    args.map((item) => item.properties.pdf.files[0].file.url),
    'merged_output.pdf'
  ).catch((error) => console.error('Error merging PDFs:', error))
})
