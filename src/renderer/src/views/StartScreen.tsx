import { Dispatch, FC, SetStateAction, useEffect, useReducer, useState } from 'react'
import PropType from 'prop-types'
import styles from './../assets/styles/startView.module.css'
import {
  LogoTitle,
  ProgressMessage,
  WarningErrorScreen,
  FooterLinks,
  Loader,
  StartScreenButtons,
  StartScreenSettings
} from '../components/index'
import { initialState, reducer } from '@renderer/hooks/reducers/useStartScrrenReducer'
import { useStartScreenEffect } from '@renderer/hooks/effects/useStartScreenEffect'
import { AllCommandConfigureInterface, DatabaseFetching } from '@renderer/utils/interfaces'
import { ResponseStatus, ScreenStateEnums } from '@renderer/utils/enums'

type StartScreenInterface = {
  setContent: Dispatch<SetStateAction<boolean>>
  setDjangoPort: Dispatch<SetStateAction<number>>
}

const StartScreen: FC<StartScreenInterface> = ({ setContent, setDjangoPort }) => {
  //* Use State
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [isPortOnly, setIsPortOnly] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')

  //* Use Hooks
  const [
    { screenState, buttonState, errorWarningMsg, progress, totalProgressSteps, isExpand },
    dispatch
  ] = useReducer(reducer, initialState)
  useStartScreenEffect({
    setIsloading,
    isPortOnly,
    setMsg,
    dispatch,
    screenState
  })

  useEffect(() => {
    const fetchPorts = async () => {
      try {
        const commandConfigIdRes: DatabaseFetching<ResponseStatus, number | null, string[]> =
          await window.api.getActiveCommandId()
        const commandConfigRes: DatabaseFetching<
          ResponseStatus,
          AllCommandConfigureInterface[] | null,
          string[]
        > = await window.api.getAllCommandConfig()

        const command: AllCommandConfigureInterface | null =
          commandConfigRes.data?.find((config) => config.id === commandConfigIdRes.data) || null
        setDjangoPort(command?.django.ports[0] ?? 7164)

        // check active docker image
        const activeDockerImageRes: DatabaseFetching<ResponseStatus, string | null, string[]> =
          await window.api.getActiveDockerImage()
        if (activeDockerImageRes.status != ResponseStatus.SUCCESS || !activeDockerImageRes.data) {
          setIsPortOnly(false)
          return
        }
        setIsPortOnly(activeDockerImageRes.data === `noDockerImage` ? true : false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPorts()
  }, [screenState])
  return (
    <div className={styles.backgroundVideo}>
      <div className={styles.blurLayer}></div>
      <div
        className={`${styles.startScreen} z-[3] w-[640px] duration-300 ${isExpand || screenState === ScreenStateEnums.SETTINGS || screenState === ScreenStateEnums.WARNING || screenState === ScreenStateEnums.ERROR ? `h-[639px]` : `h-[426px]`} overflow-hidden`}
      >
        <div className={`w-full h-full flex flex-col justify-between items-center py-2`}>
          {screenState === ScreenStateEnums.SETTINGS ? (
            <StartScreenSettings />
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
                      <Loader>
                        <span>fetching...</span>
                      </Loader>
                    ) : (
                      <StartScreenButtons
                        buttonState={buttonState}
                        dispatch={dispatch}
                        setContent={setContent}
                        isPortOnly={isPortOnly}
                      />
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
StartScreen.propTypes = {
  setContent: PropType.func.isRequired,
  setDjangoPort: PropType.func.isRequired
}
export default StartScreen
