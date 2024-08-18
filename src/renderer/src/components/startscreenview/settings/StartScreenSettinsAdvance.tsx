import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import { FC, Dispatch } from 'react'

interface StartScreenSettinsAdvanceInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsAdvance: FC<StartScreenSettinsAdvanceInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  return <div>StartScreenSettinsAdvance :{settingsScreenState}</div>
}

export default StartScreenSettinsAdvance
