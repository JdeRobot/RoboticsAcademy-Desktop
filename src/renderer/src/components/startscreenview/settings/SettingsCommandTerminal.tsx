import { CommandIcon, CopyIcon } from '@renderer/assets'
import styles from '@renderer/assets/styles/startView.module.css'
import { FC, useState } from 'react'

interface SettingsCommandTerminalInterface {
  dockerCommand: string
}

const SettingsCommandTerminal: FC<SettingsCommandTerminalInterface> = ({ dockerCommand }) => {
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
      <div
        className={`flex justify-between items-center px-2 py-1 bg-slate-600 rounded-tl-lg rounded-tr-lg`}
      >
        <div className="flex items-center gap-3">
          <img src={CommandIcon} alt="command icon" className={`h-[16px] w-[16px]`} />
          <span className="text-sm font-medium text-[#d9d9d9]">Current Docker Command</span>
        </div>

        <div>
          <img
            src={CopyIcon}
            alt="copy icon"
            className="p-1.5 rounded-full cursor-pointer"
            onClick={() => copyToClipboard()}
          />
          <div
            className={`${styles.tooltips}  block ${copied ? `opacity-100` : 'opacity-0'} duration-500 absolute -top-[48px] -right-[16px]  z-[100] text-sm text-white bg-[#1e293b] px-4 py-2 rounded-full  cursor-pointer shadow-md shadow-[#1e293b]`}
          >
            copied
          </div>
        </div>
      </div>
      <div
        className={`w-full h-[80px] text-[#454545] bg-white px-1 py-2 rounded-bl-lg rounded-br-lg overflow-y-auto overflow-x-hidden select-text`}
        id="scrollbar-style"
      >
        {dockerCommand}
      </div>
    </div>
  )
}

export default SettingsCommandTerminal
