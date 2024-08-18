import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import { Dispatch, FC } from 'react'

interface StartScreenSettinsCommandInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsCommand: FC<StartScreenSettinsCommandInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  return <div>StartScreenSettinsCommand: {settingsScreenState}</div>
}

export default StartScreenSettinsCommand
