import { FC, Dispatch, useReducer, ChangeEvent, FocusEvent, useState } from 'react'
import { AddIcon } from '@renderer/assets'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import SettingsCommandTerminal from './SettingsCommandTerminal'
import { layout } from '@renderer/assets/styles/styles'
import { AllCommandConfigure } from '@renderer/constants'

interface SettingsAdvanceInitializeInterface {
  advanceScreenState: number
  profileName: string
}
const SettingsAdvanceInitialize: SettingsAdvanceInitializeInterface = {
  advanceScreenState: 1,
  profileName: 'profile'
}
enum SettingsAdvanceActionEnums {
  CHANGE_SCREEN = 'CHANGE_SCREEN',
  UDPATE_PROFILE_NAME = 'UDPATE_PROFILE_NAME',
  RESET = 'RESET'
}
const reducer = (state: SettingsAdvanceInitializeInterface, action) => {
  switch (action.type) {
    case SettingsAdvanceActionEnums.CHANGE_SCREEN:
      return {
        ...state,
        advanceScreenState: action.payload.advanceScreenState
      }
    case SettingsAdvanceActionEnums.UDPATE_PROFILE_NAME:
      return { ...state, profileName: action.payload.profileName }
    case SettingsAdvanceActionEnums.RESET:
      return { ...state }
    default:
      throw new Error(`Unknown Action!`)
  }
}

interface StartScreenSettinsAdvanceInterface {
  settingsScreenState: SettingsScreenStateEnums
  dispatch: Dispatch<SettingsReducerActionTypes>
}
const StartScreenSettinsAdvance: FC<StartScreenSettinsAdvanceInterface> = ({}) => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [{ advanceScreenState, profileName }, advanceDispatch] = useReducer(
    reducer,
    SettingsAdvanceInitialize
  )

  //* handle profile name change and blur
  const handleInputChangeAndBlur = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
    blur = false
  ) => {
    let profileName = e.target.value || ''

    if (profileName.length === 51) {
      setErrorMsg(`Max character 50.`)
      return
    }
    if (blur) {
      profileName = profileName.trim()
      if (profileName.length === 0) {
        setErrorMsg(`profile name can't be empty!`)
        profileName = 'profile'
      }
    }

    advanceDispatch({
      type: SettingsAdvanceActionEnums.UDPATE_PROFILE_NAME,
      payload: {
        profileName
      }
    })
  }
  return (
    <div className={`w-full flex flex-col justify-center items-center`}>
      <div>
        {/* Add Button */}
        {advanceScreenState === 0 && (
          <div
            className="w-full flex flex-col justify-center items-center gap-3 cursor-pointer"
            onClick={() =>
              advanceDispatch({
                type: SettingsAdvanceActionEnums.CHANGE_SCREEN,
                payload: { advanceScreenState: 1 }
              })
            }
          >
            <img src={AddIcon} alt="add icon" className={`w-[96px] h-[96px]`} />
            <span className="font-semibold text-2xl text-[#fff]">Add New Command</span>
          </div>
        )}
        {/*  */}
        {advanceScreenState !== 0 && (
          <>
            <div className={`${layout.flexColCenter} gap-3`}>
              {/* command */}
              <SettingsCommandTerminal
                dockerCommand={'hello world hello world hello world hello world hello world '}
              />
              {advanceScreenState === 1 && (
                <div className="w-full flex flex-col items-center gap-3">
                  {/* profile name */}
                  <div className="w-full">
                    <label
                      htmlFor="config_name"
                      className="flex items-center justify-start gap-2 mb-2 "
                    >
                      <span className="text-base font-medium text-[#d9d9d9] ">Profile Name:</span>
                    </label>
                    <div className="relative w-full h-[40px] flex items-start ">
                      <input
                        type="text"
                        id="config_name"
                        className=" bg-white rounded-lg  w-full h-[40px] font-medium text-start text-[#454545] text-base block  focus:border-none "
                        style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                        placeholder="profile name"
                        // defaultValue={`hello world!`}
                        value={profileName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChangeAndBlur(e)}
                        onBlur={(e: FocusEvent<HTMLInputElement>) =>
                          handleInputChangeAndBlur(e, true)
                        }
                      />
                    </div>
                  </div>
                  {/* select command */}
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
                      // onChange={(e) => handleChangeConfigure(e)}
                      // value={configId}
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
                </div>
              )}
              {advanceScreenState === 2 && <div>next page</div>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StartScreenSettinsAdvance
