import { ElectronAPI } from '@electron-toolkit/preload'
interface ApiInterface {
  checkDockerAvailability: () => Promise<ResponeInterface>
  checkDockerRADIAvailability: () => Promise<ResponeInterface>
  startDockerRADIContainer: () => Promise<ResponeInterface>
  stopDockerRADIContainer: () => Promise<ResponeInterface>
  checkRADIContainerRunning: () => Promise<ResponeInterface>
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
