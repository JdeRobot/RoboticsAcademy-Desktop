import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import { Dispatch, FC } from 'react'

interface StartScreenSettingsConfigureInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}

const StartScreenSettingsConfigure: FC<StartScreenSettingsConfigureInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  return <div>StartScreenSettingsConfigure :{settingsScreenState}</div>
}

export default StartScreenSettingsConfigure
