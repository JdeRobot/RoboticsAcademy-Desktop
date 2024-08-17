import { CmdIcon, ConnectIcon } from '@renderer/assets/icons/Icons'
import { layout } from '@renderer/assets/styles/styles'
import { FC } from 'react'

interface CommandSettingsSidebarInterface {}
const CommandSettingsSidebar: FC<CommandSettingsSidebarInterface> = ({}) => {
  return (
    <div className={`w-[142px] h-full`}>
      <div className={`flex flex-col mt-5`}>
        <p className={`ml-6 text-2xl font-semibold text-white`}>Settings</p>
        <div className={`${layout.flexColCenter} gap-2 mt-6 border-r-2 border-[#d9d9d9]`}>
          {/* command */}
          <div
            className={`${layout.flexCenter} w-[128px] h-[36px] gap-1 bg-yellow-600 rounded-full cursor-pointer`}
          >
            <ConnectIcon cssClass="" />
            <span className={`border-[#d9d9d9] text-base font-semibold`}>Command</span>
          </div>
          {/* advance */}
          <div
            className={`${layout.flexCenter} w-[128px] h-[32px] gap-1 xbg-yellow-600 rounded-full cursor-pointer`}
          >
            <CmdIcon cssClass="" />
            <span className={`border-[#d9d9d9] text-base font-semibold`}>Advance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommandSettingsSidebar
