import { Dispatch, FC, useState } from 'react'
import PropTypes from 'prop-types'
import { RightArrowIcon, BackIcon, PowerIcon, GameConsoleIcon, PlayIcon } from '@renderer/assets'
import Loader from '../utlits/Loader'
import ButtonWrapper from '../buttons/ButtonWrapper'
import styles from '../../assets/styles/styles'
import { ActionEnums, ButtonEnums, ResponseStatus, ScreenStateEnums } from '@renderer/utils/enums'
import { ReducerActionTypes } from '@renderer/utils/types'
import { ResponeInterface } from '@renderer/utils/interfaces'
interface StartScrrenButtonsInterface {
  buttonState: string
  dispatch: Dispatch<ReducerActionTypes>
  setContent: Dispatch<boolean>
  isPortOnly: any
}

const StartScreenButtons: FC<StartScrrenButtonsInterface> = ({
  buttonState,
  dispatch,
  setContent,
  isPortOnly
}) => {
  // state
  const [isStopping, setIsStopping] = useState<boolean>(false)
  const stopDockerFunc = async () => {
    const stopAlert = confirm('Are you Sure?')
    if (!stopAlert) return

    setIsStopping(true)
    try {
      const res: ResponeInterface = await window.api.stopDockerRADIContainer()

      if (res.status == ResponseStatus.SUCCESS) {
        dispatch({
          type: ActionEnums.CHANGE_SCREEN,
          payload: {
            screenState: ScreenStateEnums.START,
            buttonState: ButtonEnums.START,
            errorWarningMsg: [],
            progress: 0
          }
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsStopping(false)
    }
  }
  return (
    <>
      {isPortOnly ? (
        <ButtonWrapper
          onClick={() => setContent(true)}
          cssClass={`bg-green-600 ${styles.startButtonSvg}`}
        >
          <>
            <span>
              <img src={GameConsoleIcon} alt="" className="w-[24px]" />
            </span>
            Exercise
          </>
        </ButtonWrapper>
      ) : (
        <>
          {/*  */}
          {buttonState === ButtonEnums.START && (
            <ButtonWrapper
              onClick={() =>
                dispatch({
                  type: ActionEnums.START,
                  payload: { screenState: ScreenStateEnums.LOADING }
                })
              }
              cssClass={`bg-yellow-600 ${styles.startButtonSvg}`}
            >
              <>
                Start
                <img src={PlayIcon} className={`w-[24px]`} />
              </>
            </ButtonWrapper>
          )}
          {/* //TODO: NEED TO WORK */}
          {buttonState === ButtonEnums.CONTINUE && (
            <ButtonWrapper
              onClick={() =>
                dispatch({
                  type: ActionEnums.START,
                  payload: { screenState: ScreenStateEnums.LOADING }
                })
              }
              cssClass={`bg-yellow-600 ${styles.startButtonSvg}`}
            >
              <>
                Continue{' '}
                <span>
                  <img src={RightArrowIcon} alt="" className="w-[24px]" />
                </span>
              </>
            </ButtonWrapper>
          )}
          {buttonState === ButtonEnums.BACK && (
            <ButtonWrapper
              onClick={() =>
                dispatch({
                  type: ActionEnums.RESET
                })
              }
              cssClass={`bg-blue-600 ${styles.startButtonSvg}`}
            >
              <>
                <span>
                  <img src={BackIcon} alt="" className="w-[24px]" />
                </span>{' '}
                Back
              </>
            </ButtonWrapper>
          )}

          {/* stop or exercise button */}
          {buttonState === ButtonEnums.STOP && (
            <div className={`flex items-center gap-2`}>
              {/* stop */}

              <ButtonWrapper
                onClick={() => stopDockerFunc()}
                cssClass={`bg-red-600 ${styles.startButtonSvg}`}
              >
                {isStopping ? (
                  <Loader>Stopping...</Loader>
                ) : (
                  <>
                    <span>
                      <img src={PowerIcon} alt="" className="w-[24px]" />
                    </span>{' '}
                    Stop
                  </>
                )}
              </ButtonWrapper>

              {/* exercise */}
              {!isStopping && (
                <ButtonWrapper
                  onClick={() => setContent(true)}
                  cssClass={`bg-green-600 ${styles.startButtonSvg}`}
                >
                  <>
                    <span>
                      <img src={GameConsoleIcon} alt="" className="w-[24px]" />
                    </span>
                    Exercise
                  </>
                </ButtonWrapper>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

StartScreenButtons.propTypes = {
  buttonState: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired
}

export default StartScreenButtons
