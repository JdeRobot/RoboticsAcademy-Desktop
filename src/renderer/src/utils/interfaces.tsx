import { ButtonEnums, ResponseStatus, ScreenStateEnums, SettingsScreenStateEnums } from './enums'

// Start Screen
export interface CssClassProps {
  cssClass?: string
}

//* START SCREEN
export interface initialStateInterface {
  screenState: ScreenStateEnums
  buttonState: ButtonEnums
  errorWarningMsg: string[]
  progress: number
  totalProgressSteps: number
  isExpand: boolean
}

// Start Screen Settings
export interface SettingsInitialStateInterface {
  settingsScreenState: SettingsScreenStateEnums
}

export interface PortsInterface {
  name: string
  ports: number[]
}
export interface AllCommandConfigureInterface {
  id: number
  default: boolean
  name: string
  command: string[]
  django: PortsInterface
  gazebo: PortsInterface
  consoles: PortsInterface
  other: PortsInterface
}
export interface PortsInputInterface {
  name: string
  ports: number[]
}

// response interfaec
export interface ResponeInterface {
  status: ResponseStatus
  msg: string[]
}

export interface DatabaseFetching<Tstatus, Tdata, Tstring> {
  status: Tstatus
  data: Tdata
  msg: Tstring
}
