import { app, BrowserWindow } from 'electron'
import { join } from 'path'

export function createUpdaterWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 500,
    height: 250,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    x: 0,
    y: 0,
    webPreferences: {
      preload: join(__dirname, './../preload/index.js'),
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

  //   win.webContents.on('did-finish-load', () => {
  //     win.webContents
  //       .executeJavaScript(
  //         `
  //         const version = document.getElementById('version')
  //         version.textContent = '${appVersion}'
  //         `
  //       )
  //       .then((result) => {
  //         console.log('Executed in renderer:', result)
  //       })
  //       .catch(console.error)
  //   })

  return win
}
