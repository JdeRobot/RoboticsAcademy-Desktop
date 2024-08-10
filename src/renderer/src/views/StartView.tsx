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

type buttonType = 'start' | 'continue' | 'back'
type startScreenStateType = 'start' | 'loading' | 'error' | 'warning'
type actionType = 'START'
// type actionType = 'START'
interface initialStateInterface {
  screenState: startScreenStateType
  buttonType: buttonType
}
const initialState: initialStateInterface = {
  screenState: 'start',
  buttonType: 'start'
}

interface ReducerActionInterface {
  type: actionType
  payload?: any
}
const reducer = (state: initialStateInterface, action: ReducerActionInterface) => {
  switch (action.type) {
    case 'START':
      console.log(action)
      return {
        ...state,
        screenState: action.payload.screenState
      }

    default:
      throw new Error('Unknown Action')
  }
}

const TIMER = 1000
const StartScreen: FC<Props> = (props: Props) => {
  const [{ screenState, buttonType }, dispatch] = useReducer(reducer, initialState)
  const [isExpand, setIsExpand] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')

  useEffect(() => {
    const checkDockerRADIFunc = async (): Promise<void> => {
      try {
        setMsg('Checking docker on your system.')
        const res: { status: boolean; msg: string } = await window.api.checkDockerRADI()
        if (res.status) {
          setTimeout(() => {
            setMsg(res.msg)
          }, TIMER)
        }
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
    const checkDockerFunc = async (): Promise<void> => {
      try {
        setMsg('Checking docker on your system.')
        const res: { status: boolean; msg: string } = await window.api.dockerCheck()
        if (res.status) {
          setTimeout(() => {
            setMsg(res.msg)
          }, TIMER)
          setTimeout(() => {
            setMsg('Checking Robotics Academy Docker Image (RADI)')
            checkDockerRADIFunc()
          }, TIMER * 2)
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
                <WarningErrorScreen isExpand={isExpand} setIsExtend={setIsExpand} />
              ))}
            {screenState !== 'loading' && (
              <ContinueBackButton buttonType={buttonType} dispatch={dispatch} />
            )}
            {screenState === 'loading' && <ProgressMessage msg={msg} />}
          </div>
          <FooterLinks />
        </div>
      </div>
    </div>
  )
}

export default StartScreen
