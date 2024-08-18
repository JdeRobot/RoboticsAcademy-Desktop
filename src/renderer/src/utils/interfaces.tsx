// import { FC } from 'react'

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

// response interfaec
export interface ResponeInterface {
  status: ResponseStatus
  msg: string[]
}
