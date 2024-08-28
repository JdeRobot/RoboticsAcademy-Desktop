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
