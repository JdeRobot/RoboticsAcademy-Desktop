import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

// splash screen
function createSplashWindow() {
  const win = new BrowserWindow({
    width: 350 * 1.5,
    height: 200 * 1.5,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  })

  console.log(process.resourcesPath)

  const splashScreenSrc = app.isPackaged
    ? join(process.resourcesPath, '', 'splashscreen.html')
    : join(__dirname, './../../', 'splashscreen.html')

  win.loadFile(splashScreenSrc)
  return win
}

function createWindow(): BrowserWindow {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 500,
    minHeight: 500,
    show: false,
    icon: join(__dirname, './../../resources/icons/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false
    }
  })
  // ...(process.platform === 'linux' ? { icon } : {}),

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

  return mainWindow
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
  ipcMain.handle(
    'test:testFunc',
    async (event: Electron.IpcMainInvokeEvent, msg: string): Promise<string> => {
      // const { canceled, filePaths } = await dialog.showOpenDialog({});
      // if (!canceled) {
      //     return filePaths[0];
      // }
      console.log('====================================')
      console.log('main file ', event.defaultPrevented)
      console.log('====================================')

      return `Your Msg was : ${msg}`
    }
  )

  // Disappering splash screen and show main screen after 3 seconds.
  try {
    const splashScreen: BrowserWindow = createSplashWindow()
    const mainScreen: BrowserWindow = createWindow()

    mainScreen.once('ready-to-show', () => {
      setTimeout(() => {
        mainScreen.show()
        splashScreen.destroy()
      }, 3000)
    })
  } catch (error) {
    console.error(error)
  }

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
