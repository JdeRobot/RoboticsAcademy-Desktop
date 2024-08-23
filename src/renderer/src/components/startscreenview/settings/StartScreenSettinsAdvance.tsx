import { AddIcon } from '@renderer/assets'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import { FC, Dispatch, useReducer } from 'react'

interface SettingsAdvanceInitializeInterface {
  advanceScreenState: number
}
const SettingsAdvanceInitialize: SettingsAdvanceInitializeInterface = {
  advanceScreenState: 0
}
enum SettingsAdvanceActionEnums {
  CHANGE_SCREEN = 'CHANGE_SCREEN',
  RESET = 'RESET'
}
const reducer = (state: SettingsAdvanceInitializeInterface, action) => {
  switch (action.type) {
    case SettingsAdvanceActionEnums.CHANGE_SCREEN:
      return {
        ...state,
        advanceScreenState: action.payload.advanceScreenState
      }
    case SettingsAdvanceActionEnums.RESET:
      return { ...state }
    default:
      throw new Error(`Unknown Action!`)
  }
}

interface StartScreenSettinsAdvanceInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsAdvance: FC<StartScreenSettinsAdvanceInterface> = ({}) => {
  const [{ advanceScreenState }, advanceDispatch] = useReducer(reducer, SettingsAdvanceInitialize)
  return (
    <div className={`w-full flex flex-col justify-center items-center`}>
      <div>
        {/* Add Button */}
        {advanceScreenState === 0 && (
          <div
            className="w-full flex flex-col justify-center items-center gap-3 cursor-pointer"
            onClick={() =>
              advanceDispatch({
                type: SettingsAdvanceActionEnums.CHANGE_SCREEN,
                payload: { advanceScreenState: 1 }
              })
            }
          >
            <img src={AddIcon} alt="add icon" className={`w-[96px] h-[96px]`} />
            <span className="font-semibold text-2xl text-[#fff]">Add New Command</span>
          </div>
        )}
        {/*  */}
        {advanceScreenState === 1 && <div>hello world</div>}
      </div>
    </div>
  )
}

export default StartScreenSettinsAdvance
