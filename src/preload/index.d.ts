import { ElectronAPI } from '@electron-toolkit/preload'
import { AllCommandConfigureInterface } from './../main/interfaces'
interface ApiInterface {
  checkDockerAvailability: () => Promise<ResponeInterface>
  checkDockerRADIAvailability: () => Promise<ResponeInterface>
  startDockerRADIContainer: (
    commandConfigure: AllCommandConfigureInterface | null,
    dockerImage: string | null
  ) => Promise<ResponeInterface>
  stopDockerRADIContainer: () => Promise<ResponeInterface>
  checkRADIContainerRunning: () => Promise<ResponeInterface>
  // app window
  onClosingApp: (callBack: any) => any
  sendClosingApp: (msg: any) => any
  sendWindowResize: (chanel: string) => void
  // database
  getAllData: () => Promise<any>
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
