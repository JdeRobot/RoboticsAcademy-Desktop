import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { Database } from 'sqlite3'

import {
  AllCommandConfigureInterface,
  DatabaseFetching,
  ResponeInterface,
  ResponseStatus
} from './interfaces'
import {
  checkDockerAvailability,
  checkDockerRADIAvailability,
  checkRADIContainerRunning,
  startDockerRADIContainer,
  stopDockerRADIContainer
} from './Command'

import {
  addNewCommandConfig,
  dbInit,
  deleteCommandConfig,
  getActiveDockerImage,
  getAllCommandConfig,
  getCommandConfigId,
  insertCommandData,
  insertCommandUtilsData,
  updateCommands,
  updateCommandUtils
} from './db'

const isMac = process.platform === 'darwin'
let mainWindow: BrowserWindow | null = null

// connected to database
export const db: Database = dbInit()

// splash screen
function createSplashWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 525,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true
  })

  const splashScreenSrc = app.isPackaged
    ? join(process.resourcesPath, 'splashscreen.html')
    : join(__dirname, './../../', 'splashscreen.html')

  win.loadFile(splashScreenSrc)
  return win
}

// main window
const createWindow = async (): Promise<BrowserWindow> => {
  mainWindow = new BrowserWindow({
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
      nodeIntegration: false,
      webSecurity: true,
      sandbox: false,
      contextIsolation: true
    }
  })

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

app.whenReady().then(async () => {
  //Store data
  await insertCommandData(db)
  await insertCommandUtilsData(db)

  // TODO:
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
  //@ Stopping Docker RADI
  ipcMain.handle('docker:CHECK_RADI_RUNNING', async (_event: IpcMainInvokeEvent) => {
    try {
      const res: ResponeInterface = await checkRADIContainerRunning()
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })
  //@ Robotics Academy Docker Image
  ipcMain.handle('docker:CHECK_RADI_AVAILABILITY', async (_event: IpcMainInvokeEvent) => {
    try {
      const res: ResponeInterface = await checkDockerRADIAvailability()
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })
  //@ Running RADI docker images
  ipcMain.handle('docker:START_RADI_CONTAINER', async (_event: IpcMainInvokeEvent) => {
    try {
      const res: ResponeInterface = await startDockerRADIContainer()
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })
  //@ Stopping Docker RADI
  ipcMain.handle('docker:STOP_RADI_CONTAINER', async (_event: IpcMainInvokeEvent) => {
    _event.defaultPrevented
    try {
      const res: ResponeInterface = await stopDockerRADIContainer()
      return res
    } catch (error) {
      return { status: false, msg: ['something went wrong!'] }
    }
  })

  //* App Window Resize
  // minimize the window
  ipcMain.on('app_window:MINIMIZE', (_event) => {
    if (!mainWindow?.isMinimized()) {
      mainWindow?.minimize()
    }
  })

  // maximize
  ipcMain.on('app_window:MAX_UNMAX', (_event) => {
    if (mainWindow == null || mainWindow === undefined) return

    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  })

  // close
  ipcMain.once('app_window:CLOSE', (_event) => {
    app.quit()
  })

  //! database ipcMain
  //! GET
  //@ get All command row
  ipcMain.handle(
    'database:ALL_COMMAND_CONFIG',
    async (
      _event
    ): Promise<
      DatabaseFetching<ResponseStatus, AllCommandConfigureInterface[] | null, string[]>
    > => {
      try {
        const res: DatabaseFetching<
          ResponseStatus,
          AllCommandConfigureInterface[] | null,
          string[]
        > = await getAllCommandConfig(db)
        return res
      } catch (error) {
        return {
          status: ResponseStatus.ERROR,
          data: null,
          msg: [`something went wrong!`, String(error)]
        }
      }
    }
  )

  //@ get active command
  ipcMain.handle(
    'database:GET_ACTIVE_COMMAND_ID',
    async (_event): Promise<DatabaseFetching<ResponseStatus, number | null, string[]>> => {
      try {
        const res: DatabaseFetching<ResponseStatus, number | null, string[]> =
          await getCommandConfigId(db)
        return res
      } catch (error) {
        return {
          status: ResponseStatus.ERROR,
          data: -1,
          msg: [`something went wrong!`, String(error)]
        }
      }
    }
  )
  //@ get active docker image
  ipcMain.handle(
    'database:GET_ACTIVE_DOCKER_IMAGE',
    async (_event): Promise<DatabaseFetching<ResponseStatus, string | null, string[]>> => {
      try {
        const res: DatabaseFetching<ResponseStatus, string | null, string[]> =
          await getActiveDockerImage(db)
        return res
      } catch (error) {
        return {
          status: ResponseStatus.ERROR,
          data: ``,
          msg: [`something went wrong!`, String(error)]
        }
      }
    }
  )

  //! POST
  //@ add new command config to  commands table
  ipcMain.handle(
    'database:ADD_NEW_COMMAND_CONFIG',
    async (_event, commandConfig): Promise<DatabaseFetching<ResponseStatus, null, string[]>> => {
      try {
        const res: DatabaseFetching<ResponseStatus, null, string[]> = await addNewCommandConfig(
          db,
          commandConfig
        )
        return res
      } catch (error) {
        return {
          status: ResponseStatus.ERROR,
          data: null,
          msg: [`something went wrong!`, String(error)]
        }
      }
    }
  )
  //! UPDATE
  //@ update commands table
  ipcMain.handle(
    'database:UPDATE_COMMANDS',
    async (
      _event,
      id: number,
      updatePorts
    ): Promise<DatabaseFetching<ResponseStatus, null, string[]>> => {
      try {
        const res: DatabaseFetching<ResponseStatus, null, string[]> = await updateCommands(
          db,
          id,
          updatePorts
        )
        return res
      } catch (error) {
        return {
          status: ResponseStatus.ERROR,
          data: null,
          msg: [`something went wrong!`, String(error)]
        }
      }
    }
  )
  //@ update command utils table
  ipcMain.handle(
    'database:UPDATE_COMMAND_UTILS',
    async (
      _event,
      id: number,
      image: string
    ): Promise<DatabaseFetching<ResponseStatus, null, string[]>> => {
      try {
        const res: DatabaseFetching<ResponseStatus, null, string[]> = await updateCommandUtils(
          db,
          id,
          image
        )
        return res
      } catch (error) {
        return {
          status: ResponseStatus.ERROR,
          data: null,
          msg: [`something went wrong!`, String(error)]
        }
      }
    }
  )
  //! DELETE
  //@ delete commands row
  ipcMain.handle(
    'database:DELETE_COMMAND_CONFIG',
    async (_event, id: number): Promise<DatabaseFetching<ResponseStatus, null, string[]>> => {
      try {
        const res: DatabaseFetching<ResponseStatus, null, string[]> = await deleteCommandConfig(
          db,
          id
        )
        return res
      } catch (error) {
        return {
          status: ResponseStatus.ERROR,
          data: null,
          msg: [`something went wrong!`, String(error)]
        }
      }
    }
  )
  //@ Disappering splash screen and show main screen after 3 seconds.
  try {
    const splashScreen: BrowserWindow = createSplashWindow()
    const mainScreen: BrowserWindow = await createWindow()

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
    ipcMain.handle('docker:CHECK_AVAILABILITY', async (_event: IpcMainInvokeEvent) => {
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
app.on('window-all-closed', (_e) => {
  if (!isMac) {
    db.close((err) => {
      if (err) return console.error(err.message)
    })
    app.quit()
  }
})
