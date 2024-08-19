import { Dispatch, FC } from 'react'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
interface StartScreenSettingsConfigureInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}

const StartScreenSettingsConfigure: FC<StartScreenSettingsConfigureInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  return (
    <div className=" w-full flex flex-col justify-start items-center gap-4">
      <div className="w-full">
        {/* configure name */}
        <div className="w-full">
          <label
            htmlFor="configure_name"
            className="block mb-2 text-base font-medium text-[#d9d9d9]"
          >
            Select RADI Docker Command
          </label>
          <select
            id="configure_name"
            className="bg-[#fff] border border-gray-300 text-[#454545] text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
          >
            <option value="US">United States</option>
            <option value="CA" selected={true}>
              Canada
            </option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
        {/*  */}
      </div>
    </div>
  )
}

export default StartScreenSettingsConfigure
