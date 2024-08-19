import { CommandIcon, CopyIcon, DeleteIcon, TaskIcon } from '@renderer/assets'
import ButtonWrapper from '@renderer/components/buttons/ButtonWrapper'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import { Dispatch, FC, useState } from 'react'

export const AllDockersImages = {
  noDockerImage: 'Run Without Docker Image',
  jderobotRoboticsAcademy: 'jderobot/robotics-academy',
  jderobotRoboticsBackend: 'jderobot/robotics-backend'
}

export interface AllCommandConfigureInterface {
  id: number
  default: boolean
  name: string
  command: string[]
  port1: number
  port1_1: number
  port2: number
  port2_2: number
  port3: number
  port3_3: number
  port4: number
  port4_4: number
  image: string
}
export const AllCommandConfigure: AllCommandConfigureInterface[] = [
  {
    id: 1,
    default: true,
    name: 'Basic Command',
    command: [`docker`, `run`, `--rm`, `-it`],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  },
  {
    id: 2,
    default: true,
    name: 'GPU Acceleration Intel',
    command: [`docker`, `run`, `--rm`, `-it`, `--device`, `/dev/dri`],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  },
  {
    id: 3,
    default: true,
    name: 'GPU Acceleration Nvidia',
    command: [`docker`, `run`, `--rm`, `-it`, `--gpus`, `all`, `--device`, `/dev/dri`],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  },
  {
    id: 4,
    default: true,
    name: 'Multiple Gpus',
    command: [
      `docker`,
      `run`,
      `--rm`,
      `-it`,
      `--gpus`,
      `all`,
      `--device`,
      `/dev/dri`,
      `-e`,
      `DRI_NA  ME=card1`
    ],
    port1: 7164,
    port1_1: 7164,
    port2: 6080,
    port2_2: 6080,
    port3: 1108,
    port3_3: 1108,
    port4: 7163,
    port4_4: 7163,
    image: `jderobot/robotics-backend`
  }
]

interface StartScreenSettinsCommandInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsCommand: FC<StartScreenSettinsCommandInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  const [dockerCommand, setDockerCommand] = useState<string>('')
  const [dockerImage, setDockerImage] = useState<string>(`noDockerImage`)
  const [commandConfig, setCommandConfig] = useState<number>(1)
  const [copied, setCopied] = useState(false)
  // on change func
  const handleChangeDockerImage = (e) => {
    setDockerImage(e.target.value)

    buildCommand()
  }
  const handleChangeCommandConfig = (e) => {
    setCommandConfig(e.target.value)
    buildCommand()
  }
  const buildCommand = () => {
    const cmdConfig: AllCommandConfigureInterface | undefined = AllCommandConfigure.find(
      (command) => command.id === commandConfig
    )
    if (cmdConfig === undefined) {
      setDockerCommand(``)
      return
    }

    const { command, port1, port1_1, port2, port2_2, port3, port3_3, port4, port4_4 } = cmdConfig

    let commands = command.join(' ')
    let ports = `-p ${port1}:${port1_1} -p ${port2}:${port2_2} -p ${port3}:${port3_3} -p ${port4}:${port4_4}`

    setDockerCommand([commands, ports, AllDockersImages[dockerImage]].join(' '))
  }

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
        }, 3000)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }
  return (
    <div className=" w-full flex flex-col  justify-start items-center gap-10">
      {/* select docker */}
      <div className="relative">
        <label htmlFor="default" className="block mb-2 text-base font-medium text-[#d9d9d9]">
          Select RADI Docker Image
        </label>

        <select
          id="default"
          className="w-[400px] h-[40px] bg-[#d9d9d9] border-gray-300 text-[#454545] text-base rounded-lg focus:ring-red-500 focus:border-red-500 block px-4"
          onChange={(e) => handleChangeDockerImage(e)}
        >
          {Object.keys(AllDockersImages).map((key, index) => (
            <option value={key} key={index}>
              {AllDockersImages[key]}
            </option>
          ))}
        </select>
        <span className="absolute top-[74px] left-0 text-sm text-red-800">
          something went wrong!
        </span>
      </div>
      {/* selet command  */}
      {dockerImage !== `noDockerImage` && (
        <div className="relative">
          <label htmlFor="default" className="block mb-2 text-base font-medium text-[#d9d9d9]">
            Select RADI Docker Image
          </label>

          <select
            id="default"
            className="w-[400px] h-[40px] bg-[#d9d9d9] border-gray-300 text-[#454545] text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 px-4 block"
            onChange={(e) => handleChangeCommandConfig(e)}
          >
            {AllCommandConfigure.map((command, index) => (
              <option key={index} value={command.id}>
                {command.name}
              </option>
            ))}
          </select>
          <span className="absolute top-[74px] left-0 text-sm text-red-800">
            something went wrong!
          </span>
        </div>
      )}

      {/* Commands */}
      {dockerCommand.length > 0 && dockerImage !== `noDockerImage` && (
        <div className={`relative w-[400px]`}>
          <div className={`flex justify-start items-center gap-3 mb-2`}>
            <img src={CommandIcon} alt="command icon" className={`h-[24px] w-[24px]`} />
            <span className="text-base font-medium text-[#d9d9d9]">Current Docker Command:</span>
          </div>
          <div
            className={`w-full h-[100px] text-[#454545] bg-[#d9d9d9] px-2 py-4 rounded-lg overflow-y-auto overflow-x-hidden select-text`}
            id="scrollbar-style"
          >
            {dockerCommand} {dockerCommand}
          </div>
          <img
            src={CopyIcon}
            alt="copy icon"
            className="absolute top-[105px] right-[4px] p-1.5 rounded-full cursor-pointer"
            onClick={() => copyToClipboard()}
          />
          {copied && (
            <div className="absolute top-[135px] bg-gray-400 text-[#454545] right-[-20px] px-3 py-1.5 rounded-full cursor-pointer duration-1000">
              Copied
            </div>
          )}
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
