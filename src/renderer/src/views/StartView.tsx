import { Dispatch, FC, Reducer, ReducerWithoutAction, useEffect, useReducer, useState } from 'react'
import styles from './../assets/styles/startView.module.css'
import {
  LogoTitle,
  StartButton,
  ProgressMessage,
  WarningErrorScreen,
  FooterLinks
} from './../components/index'
import ContinueBackButton from '@renderer/components/startscreenview/ContinueBackButton'
type Props = {}

type buttonTypes = 'start' | 'continue' | 'back'
type screenStateTypes = 'start' | 'loading' | 'ready' | 'error' | 'warning'
type actionTypes = 'START' | 'CHANGE_SCREEN' | 'UPDATE_PROGRESS'
// type actionType = 'START'
interface initialStateInterface {
  screenState: screenStateTypes
  buttonState: buttonTypes
  errorWarningMsg: string[]
  progress: number
  totalProgressSteps: number
}
const initialState: initialStateInterface = {
  screenState: 'start',
  buttonState: 'start',
  errorWarningMsg: [],
  progress: 0,
  totalProgressSteps: 3
}

interface ReducerActionInterface {
  type: actionTypes
  payload?: any
}
const reducer = (state: initialStateInterface, action: ReducerActionInterface) => {
  console.log('reducer ', state)
  switch (action.type) {
    case 'START':
      // console.log(action)
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

  useEffect(() => {
    const startRADIContainer = async (): Promise<void> => {
      try {
        const res: { status: boolean; msg: string[] } = await window.api.startRADIContainer()
        if (res.status) {
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
            window.location.href = 'http://0.0.0.0:7164/exercises/'
          }, TIMER * 5)
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
    const checkDockerRADIFunc = async (): Promise<void> => {
      try {
        // setMsg('Checking docker on your system.')
        const res: { status: boolean; msg: string[] } = await window.api.checkDockerRADI()
        if (res.status) {
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
            startRADIContainer()
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
    const checkDockerFunc = async (): Promise<void> => {
      try {
        setMsg('Checking docker on your system.')
        const res: { status: boolean; msg: string[] } = await window.api.dockerCheck()
        if (res.status) {
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
            checkDockerRADIFunc()
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
      checkDockerFunc()
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
              <ContinueBackButton buttonState={buttonState} dispatch={dispatch} />
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
