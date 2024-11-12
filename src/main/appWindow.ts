import { is } from '@electron-toolkit/utils'
import { app, BrowserWindow, shell } from 'electron'
import { join } from 'path'

export function createSplashWindow(info): BrowserWindow {
  const win = new BrowserWindow({
    width: 525,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      devTools: !app.isPackaged,
      nodeIntegration: false,
      webSecurity: true,
      sandbox: false,
      contextIsolation: true
    }
  })

  const splashScreenSrc = app.isPackaged
    ? join(process.resourcesPath, 'splashscreen.html')
    : join(__dirname, './../../', 'splashscreen.html')

  win.loadFile(splashScreenSrc)

  if (!app.isPackaged) {
    // win.webContents.openDevTools()
  } else win.webContents.openDevTools = () => {}

  win.webContents.on('did-finish-load', () => {
    win.webContents
      .executeJavaScript(
        `
        const version = document.getElementById('version')
        version.textContent = '${info.appVersion}'
        `
      )
      .then((result) => {
        console.log('Executed in renderer:', result)
      })
      .catch(console.error)
  })

  return win
}

export function createUpdaterWindow(version: string): BrowserWindow {
  const win = new BrowserWindow({
    width: 500,
    height: 250,
    frame: false,
    transparent: true,
    show: false,
    resizable: false,
    maximizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: join(__dirname, './../preload/index.js'),
      devTools: !app.isPackaged,
      nodeIntegration: false,
      webSecurity: true,
      sandbox: false,
      contextIsolation: true
    }
  })

  const updaterScreenSrc = app.isPackaged
    ? join(process.resourcesPath, 'updaterScreen.html')
    : join(__dirname, './../../', 'updaterScreen.html')

  win.loadFile(updaterScreenSrc)

  // dev tool
  if (!app.isPackaged) {
    // win.webContents.openDevTools()
  } else win.webContents.openDevTools = () => {}

  win.webContents.on('did-finish-load', () => {
    win.webContents
      .executeJavaScript(
        `
        const version = document.getElementById('update-version')
        version.textContent = '${version}'
        `
      )
      .then((result) => {
        console.log('Executed in renderer:', result)
      })
      .catch(console.error)
  })

  return win
}

export const createWindow = async (): Promise<BrowserWindow> => {
  let mainWindow: BrowserWindow | null =
    new BrowserWindow({
      width: 1280,
      height: 720,
      minWidth: 1280,
      minHeight: 720,
      show: false,
      frame: false,
      alwaysOnTop: false,
      transparent: false,
      focusable: true,
      icon: join(__dirname, './../../resources/icons/icon.png'),
      autoHideMenuBar: true,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        devTools: !app.isPackaged,
        nodeIntegration: false,
        webSecurity: true,
        sandbox: false,
        contextIsolation: true
      }
    }) || null

  //
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
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // dev tool
  if (!app.isPackaged) {
    // mainWindow.webContents.openDevTools()
  } else mainWindow.webContents.openDevTools = () => {}

  // window resize/close func
  mainWindow.on('closed', (_e) => {
    mainWindow = null
  })
  mainWindow.on('maximize', () => {})
  mainWindow.on('unmaximize', () => {})
  // Event listener for when the window is restored from minimized state
  mainWindow.on('restore', () => {})

  return mainWindow
}
