import { initialStateInterface } from '@renderer/utils/interfaces'
import { ActionEnums, ButtonEnums, ScreenStateEnums } from '@renderer/utils/enums'
import { ReducerActionTypes } from '@renderer/utils/types'

export const initialState: initialStateInterface = {
  screenState: ScreenStateEnums.START, //ScreenStateEnums.SETTINGS,
  buttonState: ButtonEnums.START,
  errorWarningMsg: [],
  progress: 0,
  totalProgressSteps: 3, // count of steps is 3
  isExpand: false
}

export const reducer = (state: initialStateInterface, action: ReducerActionTypes) => {
  switch (action.type) {
    case ActionEnums.START:
      return {
        ...state,
        screenState: action.payload.screenState
      }
    case ActionEnums.CHANGE_SCREEN:
      return {
        ...state,
        screenState: action.payload.screenState,
        buttonState: action.payload.buttonState,
        errorWarningMsg: action.payload.errorWarningMsg,
        progress: action.payload.progress
      }
    case ActionEnums.UPDATE_PROGRESS:
      return {
        ...state,
        progress: state.progress + action.payload.progress
      }
    case ActionEnums.EXPAND_DIV:
      return {
        ...state,
        isExpand: action.payload.isExpand
      }
    case ActionEnums.RESET:
      return {
        ...initialState
      }
    default:
      throw new Error('Unknown Action')
  }
}
