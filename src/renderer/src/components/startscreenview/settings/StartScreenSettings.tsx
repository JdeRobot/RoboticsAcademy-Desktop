import { FC, useReducer } from 'react'
import { SettingsInitialStateInterface } from '@renderer/utils/interfaces'
import { SettingsActionEnums, SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import {
  StartScreenSettingsSidebar,
  StartScreenSettinsCommand,
  StartScreenSettingsConfigure,
  StartScreenSettinsAdvance
} from '@renderer/components/index'

interface StartScreenSettingsInterface {
  getAndStoreLocalStorageData: any
}

const settingsInitialState: SettingsInitialStateInterface = {
  settingsScreenState: SettingsScreenStateEnums.COMMAND
}

const reducer = (state: SettingsInitialStateInterface, action: SettingsReducerActionTypes) => {
  switch (action.type) {
    case SettingsActionEnums.UPDATE_SCREEN:
      return {
        ...state,
        settingsScreenState: action.payload.settingsScreenState
      }
    case SettingsActionEnums.RESET:
      return { ...settingsInitialState }
    default:
      throw new Error('Unkown Action')
  }
}

const StartScreenSettings: FC<StartScreenSettingsInterface> = ({ getAndStoreLocalStorageData }) => {
  const [{ settingsScreenState }, dispatch] = useReducer(reducer, settingsInitialState)
  return (
    <div className={`w-full h-full flex`}>
      {/* sidebar */}
      <StartScreenSettingsSidebar settingsScreenState={settingsScreenState} dispatch={dispatch} />
      {/* main input section */}
      <div className={`w-[calc(100%-142px)]  h-[508px] mt-[50px] flex justify-center`}>
        <div className={`h-full w-[400px]`}>
          {settingsScreenState === SettingsScreenStateEnums.COMMAND && (
            <StartScreenSettinsCommand
              settingsScreenState={settingsScreenState}
              dispatch={dispatch}
              getAndStoreLocalStorageData={getAndStoreLocalStorageData}
            />
          )}
          {settingsScreenState === SettingsScreenStateEnums.CONFIGURE && (
            <StartScreenSettingsConfigure />
          )}
          {settingsScreenState === SettingsScreenStateEnums.ADVANCE && (
            <StartScreenSettinsAdvance
              settingsScreenState={settingsScreenState}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default StartScreenSettings
