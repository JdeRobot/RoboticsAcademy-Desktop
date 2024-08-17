import { FC } from 'react'
import CommandSettingsSidebar from './CommandSettingsSidebar'

interface CommandSettingsInterface {}
const CommandSettings: FC<CommandSettingsInterface> = ({}) => {
  return (
    <div className={`w-full h-full flex `}>
      {/* sidebar */}
      <CommandSettingsSidebar />
      {/* main input section */}
      <div className={`w-[calc(100%-142px)] h-full`}>input</div>
    </div>
  )
}

export default CommandSettings
