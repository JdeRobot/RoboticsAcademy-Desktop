import { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react'
import { DeleteIcon, TaskIcon } from '@renderer/assets'
import ButtonWrapper from '@renderer/components/buttons/ButtonWrapper'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'

import {
  // AllCommandConfigure,
  // AllDockersImages,
  AllCommandConfigureInterface
} from '@renderer/constants'
import SettingsCommandTerminal from './SettingsCommandTerminal'

interface StartScreenSettinsCommandInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsCommand: FC<StartScreenSettinsCommandInterface> = ({}) => {
  // command state
  const [activeCommandConfigId, setActiveCommandConfigId] = useState<number>(() => {
    const configIdData = localStorage.getItem('ActiveConfigureId')

    return configIdData ? Number(configIdData) : -1
  })
  const [allCommandConfigure, setAllCommandConfigure] = useState<
    AllCommandConfigureInterface[] | []
  >(() => {
    const allCommandConfigureData = localStorage.getItem('AllCommandConfigure')

    return allCommandConfigureData != null ? JSON.parse(allCommandConfigureData) : []
  })

  const [selectedCommandConfig, setSelectedCommandConfig] =
    useState<AllCommandConfigureInterface | null>(() => {
      const allCommandConfigureData = localStorage.getItem('AllCommandConfigure')

      if (allCommandConfigureData === null) return null

      const allCommandConfigureDataParse: AllCommandConfigureInterface[] =
        JSON.parse(allCommandConfigureData)

      const commandConfig = allCommandConfigureDataParse.find((config) => {
        return config.id === activeCommandConfigId
      })

      return commandConfig != null ? commandConfig : null
    })

  // docker image state
  const [allDockerImages, setAllDockerImages] = useState<{}>(() => {
    const allDockerImagesData = localStorage.getItem('AllDockerImage')
    return allDockerImagesData != null ? JSON.parse(allDockerImagesData) : {}
  })

  // update and current state
  const [currentCommandConfig, setCurrentCommandConfig] =
    useState<AllCommandConfigureInterface | null>(null)
  const [currentDockerImage, setCurrentDockerImage] = useState<string>(`jderobotRoboticsAcademy`)

  const [currentCommandConfigId, setCurrentCommandConfigId] = useState<number>(-1)

  const [dockerCommand, setDockerCommand] = useState<string>('')

  // useEffect
  useEffect(() => {
    const config = allCommandConfigure.find((config) => {
      return config.id === activeCommandConfigId
    })
    setSelectedCommandConfig(config != null ? config : null)
  }, [])

  //
  useEffect(() => {
    const buildCommand = () => {
      const cmdConfig: AllCommandConfigureInterface | undefined = allCommandConfigure.find(
        (command) => command.id === activeCommandConfigId
      )
      if (cmdConfig === undefined) {
        setDockerCommand(``)
        return
      }

      const { command, django, consoles, gazebo, other } = cmdConfig

      const ports = `-p ${django.ports[0]}:${django.ports[1]} -p ${gazebo.ports[0]}:${gazebo.ports[1]} -p ${consoles.ports[0]}:${consoles.ports[1]} -p ${other.ports[0]}:${other.ports[1]}`

      setDockerCommand([command.join(' '), ports, allDockerImages[currentDockerImage]].join(' '))
    }

    buildCommand()
  }, [currentDockerImage])

  // on change func
  const handleChangeDockerImage = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentDockerImage(e.target.value)
  }
  const handleChangeCommandConfig = (e: ChangeEvent<HTMLSelectElement>) => {
    // setCurrentCommandConfigId(Number(e.target.value))\
    const configId = Number(e.target.value)
    const configure = allCommandConfigure.find((config) => {
      return config.id === configId
    })

    setSelectedCommandConfig(configure != null ? configure : null)
  }
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
          value={currentDockerImage}
        >
          {Object.keys(allDockerImages).map((key, index) => (
            <option value={key} key={index}>
              {allDockerImages[key]}
            </option>
          ))}
        </select>
      </div>
      {/* selet command  */}
      {currentDockerImage !== `noDockerImage` && (
        <div className="relative">
          <label htmlFor="default" className="block mb-2 text-base font-medium text-[#d9d9d9]">
            Select RADI Docker Image
          </label>

          <select
            id="default"
            className="w-[400px] h-[40px]  bg-white border-gray-300 text-[#454545] text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 px-4 block"
            onChange={(e) => handleChangeCommandConfig(e)}
            value={selectedCommandConfig != null ? selectedCommandConfig.id : 0}
          >
            {allCommandConfigure.map((command, index) => (
              <option key={index} value={command.id}>
                {command.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Commands */}
      {dockerCommand.length > 0 && currentDockerImage !== `noDockerImage` && (
        <SettingsCommandTerminal dockerCommand={dockerCommand} />
      )}

      {/* Delete or Use */}
      <div className={`relative w-[400px] flex justify-between items-center`}>
        {}
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
