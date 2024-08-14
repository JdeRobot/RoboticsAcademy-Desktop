import { FC, useEffect, useReducer, useState } from 'react'
import styles from './../assets/styles/startView.module.css'
import {
  LogoTitle,
  ProgressMessage,
  WarningErrorScreen,
  FooterLinks,
  Loader
} from './../components/index'
import StartScrrenButtons from '@renderer/components/startscreenview/StartScreenButtons'
import {
  initialStateInterface,
  ReducerActionInterface,
  ResponeInterface
} from '@renderer/utils/interfaces'
import { ResponseStatus } from '@renderer/utils/types'
type Props = {}

// type actionType = 'START'

const initialState: initialStateInterface = {
  screenState: 'start',
  buttonState: 'start',
  errorWarningMsg: [],
  progress: 0,
  totalProgressSteps: 3
}

const reducer = (state: initialStateInterface, action: ReducerActionInterface) => {
  console.log('reducer ', state)
  switch (action.type) {
    case 'START':
      return {
        ...state,
        screenState: action.payload.screenState
      }
    case 'CHANGE_SCREEN':
      return {
        ...state,
        screenState: action.payload.screenState,
        buttonState: action.payload.buttonState,
        errorWarningMsg: action.payload.errorWarningMsg,
        progress: action.payload.progress
      }
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progress: state.progress + action.payload.progress
      }
    default:
      throw new Error('Unknown Action')
  }
}

const TIMER = 1000
const StartScreen: FC<Props> = (props: Props) => {
  const [{ screenState, buttonState, errorWarningMsg, progress, totalProgressSteps }, dispatch] =
    useReducer(reducer, initialState)
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')
  const [isLoading, setIsloading] = useState<boolean>(false)

  //* UseEffect
  useEffect(() => {
    const checkRADIContainerRunningFunc = async (): Promise<void> => {
      setIsloading(true)
      try {
        const res: ResponeInterface = await window.api.checkRADIContainerRunning()
        console.log('res ', res)
        if (res.status === ResponseStatus.SUCCESS) {
          setMsg(res.msg[0])
          dispatch({
            type: 'CHANGE_SCREEN',
            payload: {
              screenState: 'running',
              buttonState: 'stop',
              errorWarningMsg: '',
              progress: 0
            }
          })

          // setTimeout(() => {
          //   window.location.href = 'http://0.0.0.0:7164/exercises/'
          // }, TIMER * 5)
        } else {
          // dispatch({
          //   type: 'CHANGE_SCREEN',
          //   payload: {
          //     buttonState: 'back',
          //     screenState: 'error',
          //     errorWarningMsg: res.msg,
          //     progress: 0
          //   }
          // })
        }
        console.log(res)
      } catch (error) {
        console.error(error)
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
        const res: ResponeInterface = await window.api.startDockerRADIContainer()
        console.log('res ', res)
        if (res.status === ResponseStatus.SUCCESS) {
          setTimeout(() => {
            setMsg(res.msg[0])
            dispatch({
              type: 'UPDATE_PROGRESS',
              payload: {
                progress: 1
              }
            })
          }, TIMER)

          setTimeout(() => {
            // window.location.href = 'http://0.0.0.0:7164/exercises/'
            dispatch({
              type: 'CHANGE_SCREEN',
              payload: {
                screenState: 'running',
                buttonState: 'stop',
                errorWarningMsg: '',
                progress: 0
              }
            })
          }, TIMER * 3)
        } else {
          dispatch({
            type: 'CHANGE_SCREEN',
            payload: {
              buttonState: 'back',
              screenState: 'error',
              errorWarningMsg: res.msg,
              progress: 0
            }
          })
        }
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
    const checkDockerRADIAvailabilityFunc = async (): Promise<void> => {
      try {
        // setMsg('Checking docker on your system.')
        const res: ResponeInterface = await window.api.checkDockerRADIAvailability()
        if (res.status === ResponseStatus.SUCCESS) {
          setTimeout(() => {
            setMsg(res.msg[0])
            dispatch({
              type: 'UPDATE_PROGRESS',
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
          dispatch({
            type: 'CHANGE_SCREEN',
            payload: {
              buttonState: 'back',
              screenState: 'error',
              errorWarningMsg: res.msg,
              progress: 0
            }
          })
        }
        console.log(res)
      } catch (error) {
        console.error(error)
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
              type: 'UPDATE_PROGRESS',
              payload: { progress: 1 }
            })

            // if all ok got to continue screen
            // setTimeout(() => {
            //   dispatch({
            //     type:''
            //   })
            // }, 2000);
          }, TIMER)
          setTimeout(() => {
            setMsg('Checking Robotics Academy Docker Image (RADI)')
            checkDockerRADIAvailabilityFunc()
          }, TIMER * 2)
        } else {
          dispatch({
            type: 'CHANGE_SCREEN',
            payload: {
              buttonState: 'back',
              screenState: 'error',
              errorWarningMsg: res.msg,
              progress: 0
            }
          })
        }
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
    if (screenState === 'loading') {
      checkDockerAvailabilityFunc()
    }
  }, [screenState])

  return (
    <div className={styles.backgroundVideo}>
      <div className={styles.blurLayer}></div>
      <div
        className={`${styles.startScreen} z-[3] w-[640px] duration-300 ${isExpand ? `h-[639px]` : `h-[426px]`} overflow-hidden`}
      >
        <div className={`w-full h-full flex flex-col justify-between items-center py-3`}>
          <LogoTitle />
          <div
            className={`w-[426px]  flex flex-col justify-center items-center ${isExpand ? `mb-5` : `mb-10`}`}
          >
            {screenState === 'warning' ||
              (screenState === 'error' && (
                <WarningErrorScreen
                  isExpand={isExpand}
                  screenState={screenState}
                  setIsExtend={setIsExpand}
                  buttonState={buttonState}
                  errorWarningMsg={errorWarningMsg}
                />
              ))}
            {screenState !== 'loading' && (
              <>
                {isLoading ? (
                  <Loader>fetching...</Loader>
                ) : (
                  <StartScrrenButtons buttonState={buttonState} dispatch={dispatch} />
                )}
              </>
            )}
            {screenState === 'loading' && (
              <ProgressMessage
                msg={msg}
                progress={progress}
                totalProgressSteps={totalProgressSteps}
              />
            )}
          </div>
          <FooterLinks screenState={screenState} />
        </div>
      </div>
    </div>
  )
}

export default StartScreen
