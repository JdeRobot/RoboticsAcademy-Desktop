export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface DatabaseFetching<Tstatus, Tdata, Tstring> {
  status: Tstatus
  data: Tdata
  msg: Tstring
}

export interface ResponeInterface {
  status: ResponseStatus
  msg: string[]
}

interface PortsInterface {
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
