import { FC, useReducer } from 'react'
import CommandSettingsSidebar from './StartScreenSettingsSidebar'
import { SettingsInitialStateInterface } from '@renderer/utils/interfaces'
import { SettingsActionEnums, SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import StartScreenSettinsCommand from './StartScreenSettinsCommand'
import StartScreenSettingsConfigure from './StartScreenSettingsConfigure'
import StartScreenSettinsAdvance from './StartScreenSettinsAdvance'

interface CommandSettingsInterface {}

export const settingsInitialState: SettingsInitialStateInterface = {
  settingsScreenState: SettingsScreenStateEnums.COMMAND
}

export const reducer = (
  state: SettingsInitialStateInterface,
  action: SettingsReducerActionTypes
) => {
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

const StartScreenSettings: FC<CommandSettingsInterface> = ({}) => {
  const [{ settingsScreenState }, dispatch] = useReducer(reducer, settingsInitialState)
  return (
    <div className={`w-full h-full flex `}>
      {/* sidebar */}
      <CommandSettingsSidebar settingsScreenState={settingsScreenState} dispatch={dispatch} />
      {/* main input section */}
      <div className={`w-[calc(100%-142px)] h-full`}>
        {settingsScreenState === SettingsScreenStateEnums.COMMAND && (
          <StartScreenSettinsCommand
            settingsScreenState={settingsScreenState}
            dispatch={dispatch}
          />
        )}
        {settingsScreenState === SettingsScreenStateEnums.CONFIGURE && (
          <StartScreenSettingsConfigure
            settingsScreenState={settingsScreenState}
            dispatch={dispatch}
          />
        )}
        {settingsScreenState === SettingsScreenStateEnums.ADVANCE && (
          <StartScreenSettinsAdvance
            settingsScreenState={settingsScreenState}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  )
}

export default StartScreenSettings
