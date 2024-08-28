import { ResponeInterface } from '@renderer/utils/interfaces'
import { ActionEnums, ScreenStateEnums, ResponseStatus, ButtonEnums } from '@renderer/utils/enums'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AllCommandConfigureInterface } from '@renderer/constants'

interface UseStartScreenEffectInterface {
  setIsloading: Dispatch<SetStateAction<boolean>>
  setMsg: Dispatch<SetStateAction<string>>
  screenState: ScreenStateEnums
  dispatch: any
  dockerImage: any
  commandConfigure: any
}
const TIMER: number = 1000

export const useStartScreenEffect = ({
  setIsloading,
  setMsg,
  screenState,
  dispatch,
  dockerImage,
  commandConfigure
}: UseStartScreenEffectInterface) => {
  //* func
  const handleShowErrorScreen = (error: string[]) => {
    dispatch({
      type: ActionEnums.CHANGE_SCREEN,
      payload: {
        screenState: ScreenStateEnums.ERROR,
        buttonState: ButtonEnums.BACK,
        errorWarningMsg: ['Something went wrong!', ...error],
        progress: 0
      }
    })
  }
  //* UseEffect
  useEffect(() => {
    const checkRADIContainerRunningFunc = async (): Promise<void> => {
      setIsloading(true)
      try {
        const res: ResponeInterface = await window.api.checkRADIContainerRunning()
        if (res.status === ResponseStatus.SUCCESS) {
          setMsg(res.msg[0])
          dispatch({
            type: ActionEnums.CHANGE_SCREEN,
            payload: {
              screenState: ScreenStateEnums.RUNNING,
              buttonState: ButtonEnums.STOP,
              errorWarningMsg: '',
              progress: 0
            }
          })
        } else {
          dispatch({
            type: ActionEnums.RESET
          })
        }
      } catch (error) {
        handleShowErrorScreen(['Error When calling function.'])
      } finally {
        setIsloading(false)
      }
    }

    checkRADIContainerRunningFunc()
  }, [])

  //
  useEffect(() => {
    const startDockerRADIContainerFunc = async (): Promise<void> => {
      try {
        const res: ResponeInterface = await window.api.startDockerRADIContainer(
          commandConfigure,
          dockerImage
        )
        if (res.status === ResponseStatus.SUCCESS) {
          setTimeout(() => {
            setMsg(res.msg[0])
            dispatch({
              type: ActionEnums.UPDATE_PROGRESS,
              payload: {
                progress: 1
              }
            })
          }, TIMER)

          setTimeout(() => {
            dispatch({
              type: ActionEnums.CHANGE_SCREEN,
              payload: {
                screenState: ScreenStateEnums.RUNNING,
                buttonState: ButtonEnums.STOP,
                errorWarningMsg: '',
                progress: 0
              }
            })
          }, TIMER * 3)
        } else {
          handleShowErrorScreen(res.msg)
        }
      } catch (error) {
        handleShowErrorScreen(['Error When calling function.'])
      }
    }
    const checkDockerRADIAvailabilityFunc = async (): Promise<void> => {
      try {
        const res: ResponeInterface = await window.api.checkDockerRADIAvailability()
        if (res.status === ResponseStatus.SUCCESS) {
          setTimeout(() => {
            setMsg(res.msg[0])
            dispatch({
              type: ActionEnums.UPDATE_PROGRESS,
              payload: {
                progress: 1
              }
            })
          }, TIMER)

          setTimeout(() => {
            setMsg(`Running jderoboto/robotics-academy image contianer.`)
            startDockerRADIContainerFunc()
          }, TIMER * 2)
        } else {
          handleShowErrorScreen(res.msg)
        }
      } catch (error) {
        handleShowErrorScreen(['Error When calling docker.'])
      }
    }
    const checkDockerAvailabilityFunc = async (): Promise<void> => {
      try {
        setMsg('Checking docker on your system.')
        const res: ResponeInterface = await window.api.checkDockerAvailability()
        if (res.status === ResponseStatus.SUCCESS) {
          setTimeout(() => {
            setMsg(res.msg[0])
            dispatch({
              type: ActionEnums.UPDATE_PROGRESS,
              payload: { progress: 1 }
            })
          }, TIMER)
          setTimeout(() => {
            setMsg('Checking Robotics Academy Docker Image (RADI)')
            checkDockerRADIAvailabilityFunc()
          }, TIMER * 2)
        } else {
          handleShowErrorScreen(res.msg)
        }
      } catch (error) {
        handleShowErrorScreen(['Error When calling function.'])
      }
    }
    if (screenState === ScreenStateEnums.LOADING) {
      checkDockerAvailabilityFunc()
    }
  }, [screenState])
}
