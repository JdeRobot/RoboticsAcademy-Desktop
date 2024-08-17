// import { FC } from 'react'

import { ButtonEnums, ResponseStatus, ScreenStateEnums } from './enums'

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

// response interfaec
export interface ResponeInterface {
  status: ResponseStatus
  msg: string[]
}
