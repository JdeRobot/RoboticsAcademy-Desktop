import { ConnectIcon } from '@renderer/assets/icons/Icons'
import { FC } from 'react'

interface CommandSettingsInterface {}
const CommandSettings: FC<CommandSettingsInterface> = ({}) => {
  return (
    <div className={`w-full h-full flex `}>
      <div className={`w-[142px] h-full`}>
        <div className={`flex flex-col mt-5`}>
          <p className={`ml-6 text-2xl font-semibold text-white`}>Settings</p>
          <div className={`mt-6 border-r-2 border-[#d9d9d9]`}>
            <div className={`flex gap-2 items-center ml-5`}>
              <ConnectIcon cssClass="fill-yellow-600 text-red-900" />
              <span className={`text-yellow-600 text-base font-semibold`}>Command</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`w-[calc(100%-142px)] h-full`}>input</div>
    </div>
  )
}

export default CommandSettings
