import { ElectronAPI } from '@electron-toolkit/preload'
interface ApiInterface {
  checkDockerAvailability: () => Promise<ResponeInterface>
  checkDockerRADIAvailability: () => Promise<ResponeInterface>
  startDockerRADIContainer: () => Promise<ResponeInterface>
  stopDockerRADIContainer: () => Promise<ResponeInterface>
  checkRADIContainerRunning: () => Promise<ResponeInterface>
  onClosingApp: (callBack: any) => any
  sendClosingApp: (msg: any) => any
  sendWindowResize: (chanel: string) => void
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
