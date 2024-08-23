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
import SettingsCommandTerminal from './SettingsCommandTerminal'

interface StartScreenSettinsCommandInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsCommand: FC<StartScreenSettinsCommandInterface> = ({}) => {
  const [dockerCommand, setDockerCommand] = useState<string>('')
  const [dockerImage, setDockerImage] = useState<string>(`jderobotRoboticsAcademy`)
  const [commandConfig, setCommandConfig] = useState<number>(1)
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

      const { command, django, consoles, gazebo, other } = cmdConfig

      const ports = `-p ${django.ports[0]}:${django.ports[1]} -p ${gazebo.ports[0]}:${gazebo.ports[1]} -p ${consoles.ports[0]}:${consoles.ports[1]} -p ${other.ports[0]}:${other.ports[1]}`

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
          value={dockerImage}
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
            value={commandConfig}
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
        <SettingsCommandTerminal
          CommandIcon={CommandIcon}
          CopyIcon={CopyIcon}
          dockerCommand={dockerCommand}
        />
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
