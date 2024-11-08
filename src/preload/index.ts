import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  AllCommandConfigureInterface,
  DatabaseFetching,
  ResponeInterface,
  ResponseStatus
} from '../main/interfaces'

// Custom APIs for renderer
const api = {
  // Utils
  getAppVersion: (): Promise<ResponeInterface> => ipcRenderer.invoke('app:APP_VERSION'),
  // Docker
  checkDockerAvailability: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:CHECK_AVAILABILITY'),
  checkDockerRADIAvailability: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:CHECK_RADI_AVAILABILITY'),
  startDockerRADIContainer: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:START_RADI_CONTAINER'),
  stopDockerRADIContainer: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:STOP_RADI_CONTAINER'),
  checkRADIContainerRunning: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:CHECK_RADI_RUNNING'),
  // App Window
  sendClosingApp: (msg) => ipcRenderer.send('app:CLOSING', msg),
  onClosingApp: (callBack): any => ipcRenderer.on('app:DOCKER_CLOSING', callBack),
  sendWindowResize: (channel): void => ipcRenderer.send(channel),
  // Database
  //! GET
  getAllCommandConfig: (): Promise<
    DatabaseFetching<ResponseStatus, AllCommandConfigureInterface[] | null, string[]>
  > => ipcRenderer.invoke('database:ALL_COMMAND_CONFIG'),
  getActiveCommandId: (): Promise<DatabaseFetching<ResponseStatus, number | null, string[]>> =>
    ipcRenderer.invoke('database:GET_ACTIVE_COMMAND_ID'),
  getActiveDockerImage: (): Promise<DatabaseFetching<ResponseStatus, string | null, string[]>> =>
    ipcRenderer.invoke('database:GET_ACTIVE_DOCKER_IMAGE'),
  //! POST
  addNewCommandConfig: (commandConfig): Promise<DatabaseFetching<ResponseStatus, null, string[]>> =>
    ipcRenderer.invoke('database:ADD_NEW_COMMAND_CONFIG', commandConfig),
  //! UPDATE
  updateCommands: (
    id: number,
    updatePorts
  ): Promise<DatabaseFetching<ResponseStatus, null, string[]>> =>
    ipcRenderer.invoke('database:UPDATE_COMMANDS', id, updatePorts),
  updateCommandUtils: (
    id: number,
    image: string
  ): Promise<DatabaseFetching<ResponseStatus, null, string[]>> =>
    ipcRenderer.invoke('database:UPDATE_COMMAND_UTILS', id, image),
  //! DELETE
  deleteCommandConfig: (id: number): Promise<DatabaseFetching<ResponseStatus, null, string[]>> =>
    ipcRenderer.invoke('database:DELETE_COMMAND_CONFIG', id)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
