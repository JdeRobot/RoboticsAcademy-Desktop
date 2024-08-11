import { ElectronAPI } from '@electron-toolkit/preload'
interface ApiInterface {
  testFunc: (string) => Promise<string>
  dockerCheck: () => Promise<{ status: boolean; msg: string[] }>
  checkDockerRADI: () => Promise<{ status: boolean; msg: string[] }>
  startRADIContainer: () => Promise<{ status: boolean; msg: string[] }>
  checkDockerImageRunning: () => Promise<{ status: boolean; msg: string[] }>
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
