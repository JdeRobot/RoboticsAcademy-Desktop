import { PortsInterface } from './../renderer/src/utils/interfaces'
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
  //!GET
  getAllCommandConfig: () => Promise<
    DatabaseFetching<ResponseStatus, AllCommandConfigureInterface[] | null, string[]>
  >
  getActiveCommandId: () => Promise<DatabaseFetching<ResponseStatus, number, string[]>>
  getActiveDockerImage: () => Promise<DatabaseFetching<ResponseStatus, string, string[]>>
  //! POST
  //! UPDATE
  updateCommands: (
    id: number,
    updatePorts
  ) => Promise<DatabaseFetching<ResponseStatus, null, string[]>>
  updateCommandUtils: (
    id: number,
    image: string
  ) => Promise<DatabaseFetching<ResponseStatus, null, string[]>>
  //! DELETE
  deleteCommandConfig: (id: number) => Promise<DatabaseFetching<ResponseStatus, null, string[]>>
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
