import { ChangeEvent, FocusEvent, FC, useEffect, useReducer, useState } from 'react'
import { Ports, ButtonWrapper, SettingsCommandTerminal } from '@renderer/components'
import { AllCommandConfigure, TIMER } from '@renderer/constants'
import { SaveIcon } from '@renderer/assets'
import { NextArrowIcon } from '@renderer/assets/icons/Icons'
import {
  AllCommandConfigureInterface,
  DatabaseFetching,
  PortsInterface
} from '@renderer/utils/interfaces'
import { ResponseStatus } from '@renderer/utils/enums'

export enum SettingsConfigureActionEnums {
  SET_ALL_COMMAND_CONFIG = 'SET_ALL_COMMAND_CONFIG',
  UPDATE_SCREEN = 'UPDATE_SCREEN',
  CHANGE_CONFIG = 'CHANGE_CONFIG',
  UPDATE_PORT = 'UPDATE_PORT',
  UPDATE_DOCKER_COMMAND = 'UPDATE_DOCKER_COMMAND',
  RESET = 'RESET'
}
export interface SettingsConfigureInitializeInterface {
  configureScreenState: number
  allCommandConfig: AllCommandConfigureInterface | []
  selectedConfig: string
  configName: string
  configId: number
  dockerCommand: string
  django: PortsInterface
  gazebo: PortsInterface
  consoles: PortsInterface
  other: PortsInterface
}
const SetttingsConfigureInitialize: SettingsConfigureInitializeInterface = {
  configureScreenState: 0,
  allCommandConfig: [],
  selectedConfig: '',
  configName: '',
  configId: -1,
  dockerCommand: '',
  django: {
    name: 'django',
    ports: []
  },
  gazebo: {
    name: 'gazebo',
    ports: []
  },
  consoles: {
    name: 'console',
    ports: []
  },
  other: {
    name: 'other',
    ports: []
  }
}
const reducer = (state: SettingsConfigureInitializeInterface, action) => {
  switch (action.type) {
    case SettingsConfigureActionEnums.SET_ALL_COMMAND_CONFIG:
      return {
        ...state,
        allCommandConfig: action.payload.allCommandConfig
      }
    case SettingsConfigureActionEnums.UPDATE_SCREEN:
      return { ...state, configureScreenState: action.payload.configureScreenState }
    case SettingsConfigureActionEnums.CHANGE_CONFIG:
      return { ...state, ...action.payload }
    case SettingsConfigureActionEnums.UPDATE_PORT:
      state[action.payload.name] = action.payload
      return { ...state }
    case SettingsConfigureActionEnums.UPDATE_DOCKER_COMMAND:
      const config = AllCommandConfigure.find((conf) => conf.id === state.configId)
      if (config === undefined) return { ...state }

      let dockerCommand = config.command.join(' ')
      dockerCommand = `${dockerCommand}  -p ${state.django.ports[0]}:${state.django.ports[1]}  -p ${state.gazebo.ports[0]}:${state.gazebo.ports[1]}  -p ${state.consoles.ports[0]}:${state.consoles.ports[1]}  -p ${state.other.ports[0]}:${state.other.ports[1]}`

      return { ...state, dockerCommand }
    default:
      throw new Error('Unknown Action!')
  }
}

interface StartScreenSettingsConfigureInterface {}

const StartScreenSettingsConfigure: FC<StartScreenSettingsConfigureInterface> = ({}) => {
  // state
  const [configureId, setConfigureId] = useState<number>(1)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')
  const [isSavingButtonLoading, setIsSavingButtonLoading] = useState<boolean>(false)
  // REDUCER
  const [
    {
      configureScreenState,
      allCommandConfig,
      configName,
      configId,
      django,
      gazebo,
      consoles,
      other,
      dockerCommand
    },
    configDispatch
  ] = useReducer(reducer, SetttingsConfigureInitialize)

  //! fetching data from db.
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const commandRes: DatabaseFetching<
          ResponseStatus,
          AllCommandConfigureInterface[] | null,
          string[]
        > = await window.api.getAllCommandConfig()
        if (commandRes.status != ResponseStatus.SUCCESS || !commandRes.data) {
          setErrorMsg(commandRes.msg[0])
          return
        }

        configDispatch({
          type: SettingsConfigureActionEnums.SET_ALL_COMMAND_CONFIG,
          payload: {
            allCommandConfig: commandRes.data
          }
        })
        setConfigureId(commandRes.data?.[0]?.id ?? 0)

        const { name, django, consoles, other, gazebo, id } = commandRes.data?.[0]
        configDispatch({
          type: SettingsConfigureActionEnums.CHANGE_CONFIG,
          payload: {
            configName: name,
            configId: id,
            django,
            gazebo,
            consoles,
            other,
            dockerCommand
          }
        })
      } catch (error) {
        setErrorMsg(`Something went wrong!`)
      } finally {
        setTimeout(() => {
          setErrorMsg(``)
        }, 3000)
      }
    }
    fetchingData()
  }, [])

  const handleChangeConfigure = (e: ChangeEvent<HTMLSelectElement>) => {
    const configId = Number(e.target.value)
    setConfigureId(configId)

    const configures = allCommandConfig.find((config) => config.id === configId)
    if (configures === undefined) return

    const { name, django, consoles, other, gazebo, id } = configures
    configDispatch({
      type: SettingsConfigureActionEnums.CHANGE_CONFIG,
      payload: {
        configName: name,
        configId: id,
        django,
        gazebo,
        consoles,
        other,
        dockerCommand
      }
    })
  }

  const handleUpdatePort = (id: string) => {
    const [name, index, step] = id.split('_')
    const portIndex = Number(index)
    const steps = Number(step)

    let port1 = 0,
      port2 = 0

    switch (name) {
      case 'django':
        port1 = django.ports[0]
        port2 = django.ports[1]
        break
      case 'gazebo':
        port1 = gazebo.ports[0]
        port2 = gazebo.ports[1]
        break
      case 'consoles':
        port1 = consoles.ports[0]
        port2 = consoles.ports[1]
        break
      case 'other':
        port1 = other.ports[0]
        port2 = other.ports[1]
        break
      default:
        throw new Error('Unknown Action!')
    }
    if (portIndex === 0) port1 += steps
    else if (portIndex === 1) port2 += steps
    configDispatch({
      type: SettingsConfigureActionEnums.UPDATE_PORT,
      payload: { name, ports: [port1, port2] }
    })
  }

  const handleInputChangeAndBlur = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement, Element>,
    isBlur = false
  ) => {
    const value = e.target.value
    const [name, idx] = e.target.id.split('_')
    const portIndex = Number(idx)

    if (isBlur) {
      setErrorMsg(``)

      if (Number(value) === 0) {
        setErrorMsg(`Invalid Input`)
        return
      }
    }

    let port1 = 0,
      port2 = 0

    switch (name) {
      case 'django':
        port1 = django.ports[0]
        port2 = django.ports[1]
        break
      case 'gazebo':
        port1 = gazebo.ports[0]
        port2 = gazebo.ports[1]
        break
      case 'consoles':
        port1 = consoles.ports[0]
        port2 = consoles.ports[1]
        break
      case 'other':
        port1 = other.ports[0]
        port2 = other.ports[1]
        break
      default:
        throw new Error('Unknown Action!')
    }

    if (portIndex === 0) {
      port1 = Number(value)
    } else if (portIndex === 1) {
      port2 = Number(value)
    }

    configDispatch({
      type: SettingsConfigureActionEnums.UPDATE_PORT,
      payload: {
        name,
        ports: [port1, port2]
      }
    })
  }

  const handleUpdatedConfigurePortSave = async () => {
    setIsSavingButtonLoading(true)
    try {
      const updatePorts = { django, gazebo, consoles, other }
      const updatePortRes: DatabaseFetching<ResponseStatus, null, string[]> =
        await window.api.updateCommands(configureId, updatePorts)
      if (updatePortRes.status != ResponseStatus.SUCCESS) {
        setErrorMsg(updatePortRes.msg[0])
        return
      }

      setSuccessMsg(`configure update successfully.`)
    } catch (error) {
      console.error(error)

      setErrorMsg(`Something went wrong!`)
    } finally {
      setTimeout(() => {
        setErrorMsg(``)
        setSuccessMsg(``)
        setIsSavingButtonLoading(false)
        configDispatch({
          type: SettingsConfigureActionEnums.UPDATE_SCREEN,
          payload: {
            configureScreenState: 0
          }
        })
      }, TIMER)
    }
  }

  return (
    <div className="w-full h-full flex flex-col xjustify-start items-center gap-2">
      {configureScreenState === 0 && (
        <div className={`w-full flex flex-col gap-4`}>
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
              className="bg-[#fff] border border-gray-300 text-[#454545]  h-[40px] text-base font-medium rounded-lg focus:ring-red-500 focus:border-red-500 block w-full "
              onChange={(e) => handleChangeConfigure(e)}
              value={configId}
            >
              {allCommandConfig.map((config) => (
                <option
                  value={config.id}
                  className="text-[#454545] text-base font-medium"
                  key={config.id}
                >
                  {config.name}
                </option>
              ))}
            </select>
          </div>
          {/* All Ports */}
          <div>
            {django != null &&
            django != undefined &&
            gazebo != null &&
            gazebo != undefined &&
            consoles != null &&
            consoles != undefined &&
            other != null &&
            other != undefined ? (
              <Ports
                django={django}
                gazebo={gazebo}
                consoles={consoles}
                other={other}
                errorMsg={errorMsg}
                handleInputChangeAndBlur={handleInputChangeAndBlur}
                handleUpdatePort={handleUpdatePort}
              />
            ) : (
              <div>Invalid Ports</div>
            )}
          </div>

          {/* next */}
          <div
            className={`w-full flex justify-end mt-8 cursor-pointer group`}
            onClick={() => {
              configDispatch({
                type: SettingsConfigureActionEnums.UPDATE_DOCKER_COMMAND
              })
              configDispatch({
                type: SettingsConfigureActionEnums.UPDATE_SCREEN,
                payload: { configureScreenState: 1 }
              })
            }}
          >
            <NextArrowIcon
              cssClass={`w-[36px] h-[36px] rotate-[90deg] fill-[#ffffff] group-hover:fill-[#d9d9d9]`}
            />
          </div>
        </div>
      )}
      {configureScreenState === 1 && (
        <div className="w-full">
          <SettingsCommandTerminal dockerCommand={dockerCommand} />

          <div className={`w-full flex justify-start items-center`}>
            <div
              className={`w-[32px] mt-6 cursor-pointer group`}
              onClick={() =>
                configDispatch({
                  type: SettingsConfigureActionEnums.UPDATE_SCREEN,
                  payload: { configureScreenState: 0 }
                })
              }
            >
              <NextArrowIcon
                cssClass={`w-[36px] h-[36px] -rotate-[90deg] fill-[#ffffff] group-hover:fill-[#d9d9d9]`}
              />
            </div>
            <div className={`ml-[76px]`}>
              <ButtonWrapper
                cssClass="bg-green-600 hover:bg-green-700"
                onClick={() => handleUpdatedConfigurePortSave()}
                isLoading={isSavingButtonLoading}
                loadingText="saving..."
              >
                <img src={SaveIcon} alt="save" className="w-[24px] h-[24px]" />
                <span className="text-white font-semibold text-base">Save</span>
              </ButtonWrapper>
            </div>
          </div>
        </div>
      )}

      {/* show error*/}
      {errorMsg && <div className="mt-4 text-sm text-red-700 font-extralight">{errorMsg}</div>}
      {/* show success*/}
      {successMsg && (
        <div className="mt-4 text-sm text-green-500 font-extralight">{successMsg}</div>
      )}
    </div>
  )
}

StartScreenSettingsConfigure.propTypes = {}
export default StartScreenSettingsConfigure
