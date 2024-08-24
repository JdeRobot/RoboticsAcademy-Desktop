import {
  ActionEnums,
  ButtonEnums,
  ScreenStateEnums,
  SettingsActionEnums,
  SettingsScreenStateEnums
} from './enums'

//* Start Screen
export type ReducerActionTypes =
  | {
      type: ActionEnums.START
      payload: { screenState: ScreenStateEnums }
    }
  | {
      type: ActionEnums.CHANGE_SCREEN
      payload: {
        screenState: ScreenStateEnums
        buttonState: ButtonEnums
        errorWarningMsg: string[]
        progress: number
      }
    }
  | {
      type: ActionEnums.UPDATE_PROGRESS
      payload: {
        progress: number
      }
    }
  | {
      type: ActionEnums.EXPAND_DIV
      payload: {
        isExpand: boolean
      }
    }
  | { type: ActionEnums.RESET }

//* Start Screen Settings
export type SettingsReducerActionTypes =
  | {
      type: SettingsActionEnums.UPDATE_SCREEN
      payload: {
        settingsScreenState: SettingsScreenStateEnums
      }
    }
  | {
      type: SettingsActionEnums.RESET
    }
