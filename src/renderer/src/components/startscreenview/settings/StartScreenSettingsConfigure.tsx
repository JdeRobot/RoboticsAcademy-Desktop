import { ChangeEvent, Dispatch, FC, useState } from 'react'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import { layout } from '@renderer/assets/styles/styles'
import { AddIcon, MinusIcon, NextArrowIcon } from '@renderer/assets/icons/Icons'
import { LinkChainIcon } from '@renderer/assets'
import { AllCommandConfigure } from '@renderer/constants'

interface StartScreenSettingsConfigureInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}

const StartScreenSettingsConfigure: FC<StartScreenSettingsConfigureInterface> = ({
  settingsScreenState,
  dispatch
}) => {
  const [configureName, setConfigureName] = useState<string>(AllCommandConfigure[0].name)
  const [config, setConfig] = useState(AllCommandConfigure[1])
  const [configId, setConfigId] = useState(AllCommandConfigure[1].id)
  // const [config, setConfig] = useState(AllCommandConfigure[1])

  // const check = (port: number) => {
  //   if(port === 0 )
  // }

  const handleChangeConfigure = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value)
    const configure = AllCommandConfigure.find((config) => config.id === id)

    if (configure === undefined) return

    setConfig(configure)
    setConfigId(id)
  }

  const handlePortIncrement = (id) => {
    const [name, index] = id.split('_')
    const portIndex = Number(index)

    console.log(name, ' ', typeof portIndex)

    // let tmpConfig = AllCommandConfigure.find((config) => config.id === configId)
    // if (tmpConfig === undefined) return

    setConfig((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        ports: [
          portIndex === 0 ? prev[name].ports[0] + 1 : prev[name].ports[0],
          portIndex === 1 ? prev[name].ports[1] + 1 : prev[name].ports[1]
        ]
      }
    }))
  }
  const handlePortDecrement = (id: string) => {
    let [name, index] = id.split('_')
    const portIndex = Number(index)

    let tmpConfig = AllCommandConfigure.find((config) => config.id === configId)
    if (tmpConfig === undefined) return

    setConfig((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        ports: [
          portIndex === 0 ? prev[name].ports[0] - 1 : prev[name].ports[0],
          portIndex === 1 ? prev[name].ports[1] - 1 : prev[name].ports[1]
        ]
      }
    }))
  }

  const handleInputchange = (e) => {
    console.log(e)
  }

  return (
    <div className="w-full h-full flex flex-col xjustify-start items-center gap-4">
      {/* configure name */}
      <div className="w-full">
        <label htmlFor="configure_name" className="block mb-2 text-base font-medium text-[#d9d9d9]">
          Select RADI Docker Command
        </label>
        <select
          id="configure_name"
          className="bg-[#fff] border border-gray-300 text-[#454545]  h-[40px] text-base font-medium rounded-lg focus:ring-red-500 focus:border-red-500 block w-full "
          defaultValue={config.name}
          onChange={(e) => handleChangeConfigure(e)}
        >
          {AllCommandConfigure.map((config) => (
            <option
              defaultValue={config.id}
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
          {[config.django, config.gazebo, config.console, config.other].map((server, index) => (
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
                    type="text"
                    id={server.ports[0].toString()}
                    className="bg-white rounded-l-lg w-[94px] h-[40px] font-medium text-center text-[#454545] text-base block  focus:border-none "
                    style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                    placeholder="port"
                    value={server.ports[0]}
                    required
                  />

                  <button
                    className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] ${layout.flexCenter}`}
                    onClick={() => handlePortIncrement(`${server.name}_0`)}
                  >
                    <AddIcon cssClass="w-3 h-3 text-[#454545]" />
                  </button>
                  <button
                    type="button"
                    className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] rounded-r-lg ${layout.flexCenter}`}
                    onClick={() => handlePortDecrement(`${server.name}_0`)}
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
                    id={server.ports[1].toString()}
                    className="bg-white rounded-l-lg w-[94px] h-[40px] font-medium text-center text-[#454545] text-base block  focus:border-none "
                    style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                    placeholder="port"
                    value={server.ports[1]}
                    required
                  />

                  <button
                    type="button"
                    className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] ${layout.flexCenter}`}
                    onClick={() => handlePortIncrement(`${server.name}_1`)}
                  >
                    <AddIcon cssClass="w-3 h-3 text-[#454545]" />
                  </button>
                  <button
                    type="button"
                    id={server.name.toString() + '_' + 1}
                    className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] rounded-r-lg ${layout.flexCenter}`}
                    onClick={() => handlePortDecrement(`${server.name}_1`)}
                  >
                    <MinusIcon cssClass="w-3 h-3 text-[#454545]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <span className="absolute -bottom-8 left-[50%] text-sm font-extralight text-red-800 -translate-x-[50%]">
          Something went wrong!
        </span>
      </div>

      {/* next or previous */}
      <div className={`w-full flex justify-end mt-4 cursor-pointer group`}>
        <NextArrowIcon
          cssClass={`w-[36px] h-[36px] rotate-[90deg] fill-[#ffffff] group-hover:fill-[#d9d9d9]`}
        />
      </div>
    </div>
  )
}

export default StartScreenSettingsConfigure
