import { FC, useReducer, useState } from 'react'
import styles from './../assets/styles/startView.module.css'
import {
  LogoTitle,
  ProgressMessage,
  WarningErrorScreen,
  FooterLinks,
  Loader,
  CommandSettings
} from './../components/index'
import StartScrrenButtons from '@renderer/components/startscreenview/StartScreenButtons'
import { initialState, reducer } from '@renderer/hooks/reducers/useStartScrrenReducer'
import { useStartScreenEffect } from '@renderer/hooks/effects/useStartScreenEffect'
import { ScreenStateEnums } from '@renderer/utils/enums'

type StartScreenInterface = {}

const StartScreen: FC<StartScreenInterface> = ({}) => {
  //* Use State
  const [isLoading, setIsloading] = useState<boolean>(false)

  //* Use Hooks
  const [
    { screenState, buttonState, errorWarningMsg, progress, totalProgressSteps, isExpand },
    dispatch
  ] = useReducer(reducer, initialState)
  const [msg, setMsg] = useState<string>('')
  useStartScreenEffect({ setIsloading, setMsg, dispatch, screenState })

  return (
    <div className={styles.backgroundVideo}>
      <div className={styles.blurLayer}></div>
      <div
        className={`${styles.startScreen} z-[3] w-[640px] duration-300 ${isExpand ? `h-[639px]` : `h-[426px]`} overflow-hidden`}
      >
        <div className={`w-full h-full flex flex-col justify-between items-center py-2`}>
          {screenState === ScreenStateEnums.SETTINGS ? (
            <CommandSettings />
          ) : (
            <>
              <LogoTitle />
              <div
                className={`w-[426px]  flex flex-col justify-center items-center ${isExpand ? `mb-5` : `mb-10`}`}
              >
                {screenState === ScreenStateEnums.WARNING ||
                  (screenState === ScreenStateEnums.ERROR && (
                    <WarningErrorScreen
                      isExpand={isExpand}
                      screenState={screenState}
                      buttonState={buttonState}
                      errorWarningMsg={errorWarningMsg}
                      dispatch={dispatch}
                    />
                  ))}
                {screenState !== ScreenStateEnums.LOADING && (
                  <>
                    {isLoading ? (
                      <Loader>fetching...</Loader>
                    ) : (
                      <StartScrrenButtons buttonState={buttonState} dispatch={dispatch} />
                    )}
                  </>
                )}
                {screenState === ScreenStateEnums.LOADING && (
                  <ProgressMessage
                    msg={msg}
                    progress={progress}
                    totalProgressSteps={totalProgressSteps}
                  />
                )}
              </div>
            </>
          )}
          <FooterLinks screenState={screenState} dispatch={dispatch} />
        </div>
      </div>
    </div>
  )
}

export default StartScreen
