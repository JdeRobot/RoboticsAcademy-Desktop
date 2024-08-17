import { ActionEnums, ButtonEnums, ScreenStateEnums } from './enums'

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
    }
  | { type: ActionEnums.RESET }
