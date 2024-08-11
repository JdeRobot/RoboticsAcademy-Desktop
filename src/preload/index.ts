import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  testFunc: (msg: string): Promise<string> => ipcRenderer.invoke('test:testFunc', msg),
  dockerCheck: (): Promise<{ status: boolean; msg: string[] }> =>
    ipcRenderer.invoke('docker:check'),
  checkDockerRADI: (): Promise<{ status: boolean; msg: string[] }> =>
    ipcRenderer.invoke('docker:RADI'),
  startRADIContainer: (): Promise<{ status: boolean; msg: string[] }> =>
    ipcRenderer.invoke('docker:SART_RADI'),
  checkDockerImageRunning: (): Promise<{ status: boolean; msg: string[] }> =>
    ipcRenderer.invoke('docker:CHECK_RADI')
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
