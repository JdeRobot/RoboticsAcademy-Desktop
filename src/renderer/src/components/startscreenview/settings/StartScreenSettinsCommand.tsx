import { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react'
import { CommandIcon, CopyIcon, DeleteIcon, TaskIcon } from '@renderer/assets'
import ButtonWrapper from '@renderer/components/buttons/ButtonWrapper'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import styles from '@renderer/assets/styles/startView.module.css'

import {
  AllCommandConfigure,
  AllDockersImages,
  AllCommandConfigureInterface
} from '@renderer/constants'

interface StartScreenSettinsCommandInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsCommand: FC<StartScreenSettinsCommandInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  const [dockerCommand, setDockerCommand] = useState<string>('')
  const [dockerImage, setDockerImage] = useState<string>(`jderobotRoboticsAcademy`)
  const [commandConfig, setCommandConfig] = useState<number>(1)
  const [copied, setCopied] = useState(false)
  // on change func
  const handleChangeDockerImage = (e: ChangeEvent<HTMLSelectElement>) => {
    setDockerImage(e.target.value)
  }
  const handleChangeCommandConfig = (e: ChangeEvent<HTMLSelectElement>) => {
    setCommandConfig(Number(e.target.value))
  }

  useEffect(() => {
    const buildCommand = () => {
      const cmdConfig: AllCommandConfigureInterface | undefined = AllCommandConfigure.find(
        (command) => command.id === commandConfig
      )
      if (cmdConfig === undefined) {
        setDockerCommand(``)
        return
      }

      const { command, port1, port1_1, port2, port2_2, port3, port3_3, port4, port4_4 } = cmdConfig

      const ports = `-p ${port1}:${port1_1} -p ${port2}:${port2_2} -p ${port3}:${port3_3} -p ${port4}:${port4_4}`

      setDockerCommand([command.join(' '), ports, AllDockersImages[dockerImage]].join(' '))
    }

    buildCommand()
  }, [commandConfig, dockerImage])

  const handleDelete = () => {
    console.log('handle delete')
  }
  const handleUse = () => {
    console.log('handle use!')
  }

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
    <div className=" w-full flex flex-col justify-start items-center gap-4">
      {/* select docker */}
      <div className="relative ">
        <label htmlFor="default" className="block mb-2 text-base font-medium text-[#d9d9d9]">
          Select RADI Docker Image
        </label>

        <select
          id="default"
          className="w-[400px] h-[40px] bg-white border-gray-300 text-[#454545] text-base rounded-lg focus:ring-red-500 focus:border-red-500 block px-4"
          onChange={(e) => handleChangeDockerImage(e)}
          defaultValue={dockerImage}
        >
          {Object.keys(AllDockersImages).map((key, index) => (
            <option value={key} key={index}>
              {AllDockersImages[key]}
            </option>
          ))}
        </select>
      </div>
      {/* selet command  */}
      {dockerImage !== `noDockerImage` && (
        <div className="relative">
          <label htmlFor="default" className="block mb-2 text-base font-medium text-[#d9d9d9]">
            Select RADI Docker Image
          </label>

          <select
            id="default"
            className="w-[400px] h-[40px]  bg-white border-gray-300 text-[#454545] text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 px-4 block"
            onChange={(e) => handleChangeCommandConfig(e)}
            defaultValue={commandConfig}
          >
            {AllCommandConfigure.map((command, index) => (
              <option key={index} value={command.id}>
                {command.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Commands */}
      {dockerCommand.length > 0 && dockerImage !== `noDockerImage` && (
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
            className={`block ${copied ? `opacity-100` : 'opacity-0'} duration-500 absolute top-[60px]  right-[-20px] z-[100] text-sm text-white bg-blue-600  px-4 py-2 rounded-full  cursor-pointer ${styles.tooltips} shadow-md shadow-gray-500`}
          >
            copied
          </div>
        </div>
      )}

      {/* Delete or Use */}
      <div className={`relative w-[400px] flex justify-between items-center`}>
        <ButtonWrapper cssClass="bg-red-600" onClick={handleDelete}>
          <img src={DeleteIcon} alt="delete icon" className="w-[24px]" />
          <span className="text-[#d9d9d9] font-medium text-lg">Delete</span>
        </ButtonWrapper>
        <ButtonWrapper cssClass="bg-green-600" onClick={handleUse}>
          <img src={TaskIcon} alt="delete icon" className="w-[24px]" />
          <span className="text-[#d9d9d9] font-medium text-lg">Use</span>
        </ButtonWrapper>
      </div>
    </div>
  )
}

export default StartScreenSettinsCommand
