import { ChangeEvent, FC, useEffect, useReducer, useState } from 'react'
import { layout } from '@renderer/assets/styles/styles'
import { AddIcon, MinusIcon, NextArrowIcon } from '@renderer/assets/icons/Icons'
import { LinkChainIcon, SaveIcon } from '@renderer/assets'
import { AllCommandConfigure } from '@renderer/constants'
import SettingsCommandTerminal from './SettingsCommandTerminal'
import ButtonWrapper from '@renderer/components/buttons/ButtonWrapper'

export enum SettingsConfigureActionEnums {
  UPDATE_SCREEN = 'UPDATE_SCREEN',
  CHANGE_CONFIG = 'CHANGE_CONFIG',
  UPDATE_PORT = 'UPDATE_PORT',
  UPDATE_DOCKER_COMMAND = 'UPDATE_DOCKER_COMMAND',
  RESET = 'RESET'
}
export interface SettingsConfigureInitializeInterface {
  configureScreenState: number
  selectedConfig: string
  configName: string
  configId: number
  dockerCommand: string
  django: {
    name: string
    ports: number[]
  }
  gazebo: {
    name: string
    ports: number[]
  }
  consoles: {
    name: string
    ports: number[]
  }
  other: {
    name: string
    ports: number[]
  }
}
const SetttingsConfigureInitialize: SettingsConfigureInitializeInterface = {
  configureScreenState: 0,
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
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [configureId, setConfigureId] = useState<number>(AllCommandConfigure[0].id)
  // REDUCER
  const [
    { configureScreenState, configName, configId, django, gazebo, consoles, other, dockerCommand },
    configDispatch
  ] = useReducer(reducer, SetttingsConfigureInitialize)
  useEffect(() => {
    const configures = AllCommandConfigure.find((config) => config.id === configureId)
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
  }, [configureId])

  const handleChangeConfigure = (e: ChangeEvent<HTMLSelectElement>) => {
    setConfigureId(Number(e.target.value))
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

    console.log('====================================')
    console.log('+- ', port1, port2)
    console.log('====================================')
    configDispatch({
      type: SettingsConfigureActionEnums.UPDATE_PORT,
      payload: { name, ports: [port1, port2] }
    })
  }

  const handleInputChangeAndBlur = (e: ChangeEvent<HTMLInputElement>, blur = false) => {
    const value = e.target.value
    const [name, idx] = e.target.id.split('_')
    const portIndex = Number(idx)

    if (blur) {
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

  return (
    <div className="w-full h-full flex flex-col xjustify-start items-center gap-4">
      {configureScreenState === 0 && (
        <div className={`w-full `}>
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
              {AllCommandConfigure.map((config) => (
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
          <div className={`relative w-full ${layout.flexColCenter}  gap-4`}>
            {/* Port Pairs */}
            <div className="w-[400px] flex flex-col items-center justify-between gap-4">
              {[django, gazebo, consoles, other].map((server, index) => (
                <div className="w-full flex items-center justify-between" key={index}>
                  <div className="w-[182px]">
                    <label
                      htmlFor="bedrooms-input"
                      className="flex items-center justify-start gap-2 mb-2 "
                    >
                      <img src={LinkChainIcon} alt="link" className={`w-[16px] h-[16px]`} />
                      <span className="text-base font-medium text-[#d9d9d9] ">
                        {server.name[0].toLocaleUpperCase() + server.name.substring(1)} Port:
                      </span>
                    </label>
                    <div className="relative w-[182px] h-[40px] flex items-center ">
                      <input
                        type="number"
                        id={`${server.name}_0`}
                        className=" bg-white rounded-l-lg w-[94px] h-[40px] font-medium text-center text-[#454545] text-base block  focus:border-none "
                        style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                        placeholder="port"
                        value={server.ports[0]}
                        onChange={(e) => handleInputChangeAndBlur(e)}
                        onBlur={(e) => handleInputChangeAndBlur(e, true)}
                      />

                      <button
                        className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] ${layout.flexCenter}`}
                        onClick={() => handleUpdatePort(`${server.name}_0_1`)}
                      >
                        <AddIcon cssClass="w-3 h-3 text-[#454545]" />
                      </button>
                      <button
                        type="button"
                        className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] rounded-r-lg ${layout.flexCenter}`}
                        onClick={() => handleUpdatePort(`${server.name}_0_-1`)}
                      >
                        <MinusIcon cssClass="w-3 h-3 text-[#454545]" />
                      </button>
                    </div>
                  </div>
                  <div className="text-4xl text-white font-extrabold mt-5">:</div>
                  <div className="w-[182px]">
                    <label
                      htmlFor="bedrooms-input"
                      className="flex items-center justify-start gap-2 mb-2 "
                    >
                      <img src={LinkChainIcon} alt="link" className={`w-[16px] h-[16px]`} />
                      <span className="text-base font-medium text-[#d9d9d9] ">
                        {server.name[0].toLocaleUpperCase() + server.name.substring(1)} Port:
                      </span>
                    </label>
                    <div className="relative w-[182px] h-[40px] flex items-center ">
                      <input
                        type="text"
                        id={`${server.name}_1`}
                        className="bg-white rounded-l-lg w-[94px] h-[40px] font-medium text-center text-[#454545] text-base block  focus:border-none "
                        style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                        placeholder="port"
                        value={server.ports[1]}
                        onChange={(e) => handleInputChangeAndBlur(e)}
                        onBlur={(e) => handleInputChangeAndBlur(e, true)}
                      />

                      <button
                        type="button"
                        className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] ${layout.flexCenter}`}
                        onClick={() => handleUpdatePort(`${server.name}_1_1`)}
                      >
                        <AddIcon cssClass="w-3 h-3 text-[#454545]" />
                      </button>
                      <button
                        type="button"
                        id={server.name.toString() + '_' + 1}
                        className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] rounded-r-lg ${layout.flexCenter}`}
                        onClick={() => handleUpdatePort(`${server.name}_1_-1`)}
                      >
                        <MinusIcon cssClass="w-3 h-3 text-[#454545]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <span className="absolute w-[400px] -bottom-8 left-[50%] text-sm font-extralight text-red-800 -translate-x-[50%]">
              {errorMsg}
            </span>
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
                onClick={() => console.log('clied')}
              >
                <img src={SaveIcon} alt="save" className="w-[24px] h-[24px]" />
                <span className="text-white font-semibold text-base">Save</span>
              </ButtonWrapper>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StartScreenSettingsConfigure
