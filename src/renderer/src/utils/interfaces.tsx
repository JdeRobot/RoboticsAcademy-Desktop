// import { FC } from 'react'

import { ActionTypes, buttonTypes, ResponseStatus, screenStateTypes } from './types'

// Start Screen
export interface CssClassProps {
  cssClass?: string
}

//* START SCREEN
export interface initialStateInterface {
  screenState: screenStateTypes
  buttonState: buttonTypes
  errorWarningMsg: string[]
  progress: number
  totalProgressSteps: number
  isExpand: boolean
}
export interface ReducerActionInterface {
  type: ActionTypes
  payload?: any
}

// response interfaec
export interface ResponeInterface {
  status: ResponseStatus
  msg: string[]
}
