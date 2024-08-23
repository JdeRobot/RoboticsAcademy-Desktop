import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { ResponeInterface } from './interfaces'
import {
  checkDockerAvailability,
  checkDockerRADIAvailability,
  checkRADIContainerRunning,
  startDockerRADIContainer,
  stopDockerRADIContainer
} from './Command'

const isMac = process.platform === 'darwin'
let mainWindow: BrowserWindow | null = null

// splash screen
function createSplashWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 525,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  })

  // console.log(process.resourcesPath)

  const splashScreenSrc = app.isPackaged
    ? join(process.resourcesPath, 'splashscreen.html')
    : join(__dirname, './../../', 'splashscreen.html')

  win.loadFile(splashScreenSrc)
  return win
}

const createWindow = (): BrowserWindow => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    show: false,
    frame: false,
    alwaysOnTop: false,
    transparent: true,
    focusable: true,
    icon: join(__dirname, './../../resources/icons/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true, //false
      webSecurity: true,
      sandbox: false,
      contextIsolation: true
    }
  })
  // ...(process.platform === 'linux' ? { icon } : {}),
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    if (details.responseHeaders === undefined) return
    callback({
      responseHeaders: Object.fromEntries(
        Object.entries(details.responseHeaders).filter(
          (header) => !/x-frame-options/i.test(header[0])
        )
      )
    })
  })
  // mainWindow.webContents.setWindowOpenHandler((details) => {
  //   shell.openExternal(details.url)
  //   return { action: 'deny' }
  // })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    // mainWindow.loadURL('http://localhost:7164/exercises/')
  }

  mainWindow.on('closed', (e) => {
    mainWindow = null
    console.log('main window closed')
    // e.preventDefault()
    // Optionally quit the application when the main window is closed
    // app.quit()
  })

  mainWindow.on('maximize', () => {
    console.log('Window is maximized')
    // Call your custom function here
    // onWindowMaximized()
  })
  mainWindow.on('unmaximize', () => {
    console.log('Window restored from maximized')
  })

  // Event listener for when the window is restored from minimized state
  mainWindow.on('restore', () => {
    console.log('Window restored from minimized')
  })

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  //* Store data

  // Modify the origin for all requests to the following urls.
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.roboticsacademy')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  //* IPC COMMUNICATION
  //* Docker check
  // ipcMain.handle('docker:CHECK_AVAILABILITY', async (event: IpcMainInvokeEvent) => {
  //   const win: BrowserWindow = createWindow()
  //   win.isMinimized() ? win.restore() : win.minimize()

  //   return { status: ResponseStatus.ERROR, msg: [''] }
  //   event.defaultPrevented
  //   try {
  //     const res: ResponeInterface = await checkDockerAvailability()
  //     return res
  //   } catch (error) {
  //     return { status: false, msg: ['something went wrong!', `${error}`] }
  //   }
  // })
  //* Stopping Docker RADI
  ipcMain.handle('docker:CHECK_RADI_RUNNING', async (event: IpcMainInvokeEvent) => {
    event.defaultPrevented
    try {
      const res: ResponeInterface = await checkRADIContainerRunning()
      // console.log('docker ', res)
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })
  //* Robotics Academy Docker Image
  ipcMain.handle('docker:CHECK_RADI_AVAILABILITY', async (event: IpcMainInvokeEvent) => {
    event.defaultPrevented
    try {
      const res: ResponeInterface = await checkDockerRADIAvailability()
      // console.log('docker ', res)
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })
  //* Running RADI docker images
  ipcMain.handle('docker:START_RADI_CONTAINER', async (event: IpcMainInvokeEvent) => {
    // event.defaultPrevented
    try {
      const res: ResponeInterface = await startDockerRADIContainer()
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })
  //* Stopping Docker RADI
  ipcMain.handle('docker:STOP_RADI_CONTAINER', async (event: IpcMainInvokeEvent) => {
    event.defaultPrevented
    try {
      const res: ResponeInterface = await stopDockerRADIContainer()
      // console.log('docker ', res)
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })
  //* App Window Resize
  // minimize the window
  ipcMain.on('app_window:MINIMIZE', (event) => {
    // event.preventDefault()
    if (!mainWindow?.isMinimized()) {
      mainWindow?.minimize()
    }
  })

  // maximize
  ipcMain.on('app_window:MAXIMIZE', (event) => {
    // event.preventDefault()
    if (!mainWindow?.isMinimized()) {
      mainWindow?.maximize()
    }
  })
  // unmaximize
  ipcMain.on('app_window:UNMAXIMIZE', (event) => {
    // event.preventDefault()
    if (mainWindow?.isMaximized()) {
      mainWindow?.restore()
    }
  })
  // close
  ipcMain.once('app_window:CLOSE', (event) => {
    event.preventDefault()
    // mainWindow?.close()
    // mainWindow = null
    // !isMac &&
    app.quit()
  })
  //* checkRADIContainerRunning Disappering splash screen and show main screen after 3 seconds.
  try {
    const splashScreen: BrowserWindow = createSplashWindow()
    const mainScreen: BrowserWindow = createWindow()

    mainScreen.once('ready-to-show', () => {
      setTimeout(
        () => {
          mainScreen.show()
          splashScreen.destroy()
        },
        app.isPackaged ? 3000 : 0
      )
    })

    //* minimize screen
    ipcMain.handle('docker:CHECK_AVAILABILITY', async (event: IpcMainInvokeEvent) => {
      try {
        const res: ResponeInterface = await checkDockerAvailability()
        return res
      } catch (error) {
        return { status: false, msg: ['something went wrong!', `${error}`] }
      }
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
app.on('window-all-closed', (e) => {
  if (!isMac) {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// const filter = {
//   urls: ['*://*.google.com/*']
// }
// const session = electron.remote.session
// session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
//   details.requestHeaders['Origin'] = null
//   details.headers['Origin'] = null
//   callback({ requestHeaders: details.requestHeaders })
// })
