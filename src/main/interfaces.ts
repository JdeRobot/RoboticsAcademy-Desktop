export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}

export interface ResponeInterface {
  status: ResponseStatus
  msg: string[]
}
