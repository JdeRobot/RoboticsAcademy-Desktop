//* Start Screen
export type screenStateTypes =
  | 'checking'
  | 'start'
  | 'loading'
  | 'ready'
  | 'running'
  | 'error'
  | 'warning'
export type buttonTypes = 'start' | 'continue' | 'back' | 'stop'
export type ActionTypes = 'START' | 'CHANGE_SCREEN' | 'UPDATE_PROGRESS' | 'EXPAND_DIV' | 'RESET'

// Response Status Type
export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR'
}
