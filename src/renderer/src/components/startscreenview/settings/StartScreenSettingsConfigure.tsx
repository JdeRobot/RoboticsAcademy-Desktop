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

  const handleChangeConfigureName = (e: ChangeEvent<HTMLSelectElement>) => {
    setConfigureName(e.target.value)
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
          onChange={(e) => handleChangeConfigureName(e)}
        >
          {AllCommandConfigure.map((config, index) => (
            <option
              value={config.name}
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
        <div className="w-[400px] flex flex-col items-center justify-between ">
          {[
            config.port1,
            config.port1_1,
            config.port2,
            config.port2_2,
            config.port3,
            config.port3_3,
            config.port4,
            config.port4_4
          ].map((port, index) => (
            <div className={`w-[182px]`} key={index}>
              <label
                htmlFor="bedrooms-input"
                className="flex items-center justify-start gap-2 mb-2 "
              >
                <img src={LinkChainIcon} alt="link" className={`w-[16px] h-[16px]`} />
                <span className="text-base font-medium text-[#d9d9d9] ">Django port: {port} </span>
              </label>
              <div className="relative w-[182px] h-[40px] flex items-center ">
                <input
                  type="text"
                  id={port.toString()}
                  className="bg-white rounded-l-lg w-[94px] h-[40px] font-medium text-center text-[#454545] text-base block  focus:border-none "
                  style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                  placeholder="port"
                  value={port}
                  required
                />

                <button
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="bedrooms-input"
                  className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] ${layout.flexCenter}`}
                >
                  <MinusIcon cssClass="w-3 h-3 text-[#454545]" />
                </button>
                <button
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="bedrooms-input"
                  className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] rounded-r-lg ${layout.flexCenter}`}
                >
                  <AddIcon cssClass="w-3 h-3 text-[#454545]" />
                </button>
              </div>
            </div>
          ))}
          {/* {(index & 1) === 0 && <div className="text-4xl text-white font-extrabold mt-5">:</div>} */}
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
