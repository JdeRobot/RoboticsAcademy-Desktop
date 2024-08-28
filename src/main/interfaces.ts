export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface ResponeInterface {
  status: ResponseStatus
  msg: string[]
}

interface PortInterface {
  name: string
  ports: number[]
}
export interface AllCommandConfigureInterface {
  id: string
  default: boolean
  name: string
  command: string[]
  django: PortInterface
  gazebo: PortInterface
  consoles: PortInterface
  other: PortInterface
}
