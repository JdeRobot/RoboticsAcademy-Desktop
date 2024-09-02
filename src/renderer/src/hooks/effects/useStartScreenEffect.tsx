import { ResponeInterface } from '@renderer/utils/interfaces'
import { ActionEnums, ScreenStateEnums, ResponseStatus, ButtonEnums } from '@renderer/utils/enums'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { TIMER } from '@renderer/constants'

interface UseStartScreenEffectInterface {
  setIsloading: Dispatch<SetStateAction<boolean>>
  isPortOnly: boolean
  setMsg: Dispatch<SetStateAction<string>>
  screenState: ScreenStateEnums
  dispatch: any
}

export const useStartScreenEffect = ({
  setIsloading,
  isPortOnly,
  setMsg,
  screenState,
  dispatch
}: UseStartScreenEffectInterface) => {
  // show error to start screen
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
    dispatch({
      type: ActionEnums.EXPAND_DIV,
      payload: {
        isExpand: true
      }
    })
  }
  // UseEffect
  useEffect(() => {
    // 2) check RADI image running or not, if it's running previously than no need to start again.
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

    // 1) check Actice Docker image (if its `noDockerImage` than don't need to call other func)
    if (isPortOnly) {
      return
    }
    //2) check RADI image running or not with --name flag
    checkRADIContainerRunningFunc()
  }, [isPortOnly])

  // call func depend on change of screenState == LOADING
  useEffect(() => {
    // 5) Running command config and docker image from currently USE in Settings.
    const startDockerRADIContainerFunc = async (): Promise<void> => {
      try {
        const res: ResponeInterface = await window.api.startDockerRADIContainer()
        if (res.status != ResponseStatus.SUCCESS) {
          handleShowErrorScreen(res.msg)
          return
        }

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
        }, TIMER * 2)
      } catch (error) {
        handleShowErrorScreen(['Error When calling function.'])
      }
    }

    //4) check RADI image install or not in your system.
    const checkDockerRADIAvailabilityFunc = async (): Promise<void> => {
      try {
        const res: ResponeInterface = await window.api.checkDockerRADIAvailability() // its always check your chosen RADI image in settings.

        // if active RADI image not install
        if (res.status != ResponseStatus.SUCCESS) {
          handleShowErrorScreen(res.msg)
          return
        }

        // RADI image available
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
          // 5) Running command config and docker image from currently USE in Settings.
          startDockerRADIContainerFunc()
        }, TIMER * 2)
      } catch (error) {
        handleShowErrorScreen(['Error When calling docker.'])
      }
    }
    // 3) check docker install or not
    const checkDockerAvailabilityFunc = async (): Promise<void> => {
      try {
        setMsg('Checking docker on your system.')
        const res: ResponeInterface = await window.api.checkDockerAvailability()

        // if docker image not available on your system
        if (res.status != ResponseStatus.SUCCESS) {
          handleShowErrorScreen(res.msg)
          return
        }

        // update progress and call other func if docker avaialble.
        setTimeout(() => {
          setMsg(res.msg[0])
          dispatch({
            type: ActionEnums.UPDATE_PROGRESS,
            payload: { progress: 1 }
          })
        }, TIMER)
        setTimeout(() => {
          setMsg('Checking Robotics Academy Docker Image (RADI)')
          //4) if docker install in your system, then check RADI image install or not in your system.
          checkDockerRADIAvailabilityFunc()
        }, TIMER * 2)
      } catch (error) {
        handleShowErrorScreen(['Error When calling function.'])
      }
    }

    // when user click to start button
    if (screenState === ScreenStateEnums.LOADING) {
      // 3) check docker install or not
      checkDockerAvailabilityFunc()
    }
  }, [screenState])
}
