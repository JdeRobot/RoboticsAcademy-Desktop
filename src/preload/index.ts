import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { AllCommandConfigureInterface, ResponeInterface } from '../main/interfaces'

// Custom APIs for renderer
const api = {
  checkDockerAvailability: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:CHECK_AVAILABILITY'),
  checkDockerRADIAvailability: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:CHECK_RADI_AVAILABILITY'),
  startDockerRADIContainer: (
    commandConfigure: AllCommandConfigureInterface | null,
    dockerImage: string | null
  ): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:START_RADI_CONTAINER', commandConfigure, dockerImage),
  stopDockerRADIContainer: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:STOP_RADI_CONTAINER'),
  checkRADIContainerRunning: (): Promise<ResponeInterface> =>
    ipcRenderer.invoke('docker:CHECK_RADI_RUNNING'),
  sendClosingApp: (msg) => ipcRenderer.send('app:CLOSING', msg),
  onClosingApp: (callBack): any => ipcRenderer.on('app:DOCKER_CLOSING', callBack),
  sendWindowResize: (channel): void => ipcRenderer.send(channel)
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
