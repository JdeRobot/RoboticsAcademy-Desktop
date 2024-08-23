import styles from '@renderer/assets/styles/startView.module.css'
import { FC, useState } from 'react'

interface SettingsCommandTerminalInterface {
  dockerCommand: string
  CommandIcon: string
  CopyIcon: string
}

const SettingsCommandTerminal: FC<SettingsCommandTerminalInterface> = ({
  dockerCommand,
  CommandIcon,
  CopyIcon
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(dockerCommand)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }
  return (
    <div className={`relative w-[400px]`}>
      <div className={`flex justify-start items-center gap-3 mb-2`}>
        <img src={CommandIcon} alt="command icon" className={`h-[16px] w-[16px]`} />
        <span className="text-base font-medium text-[#d9d9d9]">Current Docker Command:</span>
      </div>
      <div
        className={`w-full h-[100px] text-[#454545] bg-white px-2 py-4 rounded-lg overflow-y-auto overflow-x-hidden select-text`}
        id="scrollbar-style"
      >
        {dockerCommand}
      </div>
      <img
        src={CopyIcon}
        alt="copy icon"
        className="absolute top-[105px] right-[4px] p-1.5 rounded-full cursor-pointer"
        onClick={() => copyToClipboard()}
      />

      <div
        className={`${styles.tooltips}  block ${copied ? `opacity-100` : 'opacity-0'} duration-500 absolute top-[60px]  right-[-20px] z-[100] text-sm text-white bg-blue-600  px-4 py-2 rounded-full  cursor-pointer shadow-md shadow-gray-500`}
      >
        copied
      </div>
    </div>
  )
}

export default SettingsCommandTerminal
