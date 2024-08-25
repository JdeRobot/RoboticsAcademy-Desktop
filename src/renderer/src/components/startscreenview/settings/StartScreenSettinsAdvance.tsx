import { FC, Dispatch, useReducer, ChangeEvent, FocusEvent, useState, useEffect } from 'react'
import { AddIcon } from '@renderer/assets'
import { SettingsScreenStateEnums } from '@renderer/utils/enums'
import { SettingsReducerActionTypes } from '@renderer/utils/types'
import SettingsCommandTerminal from './SettingsCommandTerminal'
import { layout } from '@renderer/assets/styles/styles'
import { ValidDockerLists } from '@renderer/constants'
import ButtonWrapper from '@renderer/components/buttons/ButtonWrapper'
import { NextArrowIcon } from '@renderer/assets/icons/Icons'

interface SettingsAdvanceInitializeInterface {
  advanceScreenState: number
  profileName: string
  dockerCommands: string[]
}
const SettingsAdvanceInitialize: SettingsAdvanceInitializeInterface = {
  advanceScreenState: 1,
  profileName: 'profile',
  dockerCommands: [`docker`, `run`, `--rm`, `-it`]
}
enum SettingsAdvanceActionEnums {
  CHANGE_SCREEN = 'CHANGE_SCREEN',
  UPDATE_DOCKER_COMMAND = 'UPDATE_DOCKER_COMMAND',
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
    case SettingsAdvanceActionEnums.UPDATE_DOCKER_COMMAND:
      return { ...state, dockerCommands: action.payload.dockerCommands }
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
  const [isInputRequired, setIsInputRequired] = useState<boolean>(false)
  const [selectedParam, setSelectedParam] = useState<string>(ValidDockerLists[0].command[0])
  const [userParams, setUserParams] = useState<string>('')
  const [dockerCommand, setDockerCommand] = useState<string>('')
  const [{ advanceScreenState, profileName, dockerCommands }, advanceDispatch] = useReducer(
    reducer,
    SettingsAdvanceInitialize
  )

  //* useEffect
  useEffect(() => {
    dockerCommandBuilder()
  }, [selectedParam])

  //* handle profile name change and blur
  const handleInputChangeAndBlur = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
    blur = false
  ) => {
    setErrorMsg(``)
    let profileName = e.target.value || ''

    if (profileName.length > 50) {
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
  const handleChangeParams = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value)

    const params = ValidDockerLists.find((param) => param.id === id)
    if (params === undefined) return

    setSelectedParam(params.command[0])
    setIsInputRequired(params.extraInput)
    setUserParams('')
  }

  const handleParamsInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserParams(e.target.value)
  }

  const addDockerParams = () => {
    const allParams = dockerCommands

    allParams.push(selectedParam)
    if (userParams.length > 0) allParams.push(userParams)

    advanceDispatch({
      type: SettingsAdvanceActionEnums.UPDATE_DOCKER_COMMAND,
      payload: {
        dockerCommands: allParams
      }
    })

    dockerCommandBuilder()
  }

  const dockerCommandBuilder = () => {
    const dockerCommand = dockerCommands.join(' ')

    setDockerCommand(dockerCommand)
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
              <SettingsCommandTerminal dockerCommand={dockerCommand} />
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
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeParams(e)}
                      // value={configId}
                    >
                      {ValidDockerLists.map((config) => (
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

                  {/* command input */}
                  {isInputRequired && (
                    <div className="w-full">
                      <label
                        htmlFor="command_input"
                        className="flex items-center justify-start gap-2 mb-2 "
                      >
                        <span className="text-base font-medium text-[#d9d9d9] ">User params:</span>
                      </label>
                      <div className="relative w-full h-[40px] flex items-start ">
                        <input
                          type="text"
                          id="command_input"
                          className=" bg-white rounded-lg  w-full h-[40px] font-medium text-start text-[#454545] text-base block  focus:border-none "
                          style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                          placeholder="params..."
                          value={userParams}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleParamsInput(e)}
                        />
                      </div>
                    </div>
                  )}

                  {/* show error */}
                  <div className={`text-sm text-red-800 font-extralight`}>{errorMsg}</div>

                  {/* buttons */}
                  <div className={`w-full flex justify-end items-center`}>
                    <div className={`mr-[76px]`}>
                      <ButtonWrapper
                        cssClass="bg-green-600 hover:bg-green-700"
                        onClick={() => addDockerParams()}
                      >
                        <img src={AddIcon} alt="save" className="w-[24px] h-[24px]" />
                        <span className="text-white font-semibold text-base">Add</span>
                      </ButtonWrapper>
                    </div>
                    <div
                      className={`w-[32px] mt-6 cursor-pointer group`}
                      onClick={() =>
                        advanceDispatch({
                          type: SettingsAdvanceActionEnums.CHANGE_SCREEN,
                          payload: { advanceScreenState: 2 }
                        })
                      }
                    >
                      <NextArrowIcon
                        cssClass={`w-[36px] h-[36px] rotate-[90deg] fill-[#ffffff] group-hover:fill-[#d9d9d9]`}
                      />
                    </div>
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
