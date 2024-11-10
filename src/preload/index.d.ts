import { PortsInterface } from './../renderer/src/utils/interfaces'
import { ElectronAPI } from '@electron-toolkit/preload'
import {
  AllCommandConfigureInterface,
  DatabaseFetching,
  ResponeInterface
} from './../main/interfaces'
interface ApiInterface {
  // Util
  getAppVersion: () => Promise<ResponeInterface>
  // Docker
  checkDockerAvailability: () => Promise<ResponeInterface>
  checkDockerRADIAvailability: () => Promise<ResponeInterface>
  startDockerRADIContainer: () => Promise<ResponeInterface>
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
  getActiveCommandId: () => Promise<DatabaseFetching<ResponseStatus, number | null, string[]>>
  getActiveDockerImage: () => Promise<DatabaseFetching<ResponseStatus, string | null, string[]>>
  //! POST
  addNewCommandConfig: (commandConfig) => Promise<DatabaseFetching<ResponseStatus, null, string[]>>
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

  // updater-window
  updaterWindowClose: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiInterface
  }
}
