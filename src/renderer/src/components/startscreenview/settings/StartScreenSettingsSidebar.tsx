import { Dispatch, FC } from 'react'
import PropType from 'prop-types'
import { CmdIcon, ConfigureIcon, ConnectIcon } from '@renderer/assets/icons/Icons'
import { layout } from '@renderer/assets/styles/styles'
import { SettingsActionEnums, SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'

interface StartScreenSettingsSidebarrInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettingsSidebar: FC<StartScreenSettingsSidebarrInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  return (
    <div className={`w-[142px] h-full`}>
      <div className={`flex flex-col mt-5`}>
        <p className={`ml-6 text-2xl font-semibold text-white`}>Settings</p>
        <div className={`${layout.flexColCenter} gap-2 mt-6 pt-1 pb-2 border-r-2 border-[#d9d9d9]`}>
          {/* command */}
          <div
            className={`flex items-center w-[128px] h-[36px] gap-2 pl-4  rounded-full cursor-pointer duration-500 ${settingsScreenState === SettingsScreenStateEnums.COMMAND && `bg-yellow-600`}`}
            onClick={() =>
              dispatch({
                type: SettingsActionEnums.UPDATE_SCREEN,
                payload: { settingsScreenState: SettingsScreenStateEnums.COMMAND }
              })
            }
          >
            <ConnectIcon cssClass="" />
            <span className={` text-base font-medium text-white`}>Command</span>
          </div>
          {/* Configure */}

          <div
            className={`flex items-center w-[128px] h-[36px] gap-2 pl-4 rounded-full cursor-pointer duration-500 ${settingsScreenState === SettingsScreenStateEnums.CONFIGURE && `bg-yellow-600`}`}
            onClick={() =>
              dispatch({
                type: SettingsActionEnums.UPDATE_SCREEN,
                payload: { settingsScreenState: SettingsScreenStateEnums.CONFIGURE }
              })
            }
          >
            <ConfigureIcon cssClass="" />
            <span className={`text-white text-base font-medium`}>Configure</span>
          </div>
          {/* advance */}

          <div
            className={`flex items-center w-[128px] h-[36px] gap-2 pl-4 rounded-full cursor-pointer duration-500 ${settingsScreenState === SettingsScreenStateEnums.ADVANCE && `bg-yellow-600`}`}
            onClick={() =>
              dispatch({
                type: SettingsActionEnums.UPDATE_SCREEN,
                payload: { settingsScreenState: SettingsScreenStateEnums.ADVANCE }
              })
            }
          >
            <CmdIcon cssClass="" />
            <span className={`text-white text-base font-medium`}>Advance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

StartScreenSettingsSidebar.propTypes = {
  settingsScreenState: PropType.oneOf([
    SettingsScreenStateEnums.COMMAND,
    SettingsScreenStateEnums.ADVANCE,
    SettingsScreenStateEnums.CONFIGURE
  ]).isRequired,
  dispatch: PropType.func.isRequired
}

export default StartScreenSettingsSidebar
