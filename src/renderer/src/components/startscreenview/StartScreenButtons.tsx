import { RightArrowIcon, BackIcon, PowerIcon, GameConsoleIcon, PlayIcon } from '@renderer/assets'
import { FC, useState } from 'react'
import Loader from '../utlits/Loader'
import ButtonWrapper from '../buttons/ButtonWrapper'
import styles from './../../styles'
interface StartScrrenButtonsInterface {
  buttonState: string
  dispatch: any
}

const StartScrrenButtons: FC<StartScrrenButtonsInterface> = ({ buttonState, dispatch }) => {
  const [isStopping, setIsStopping] = useState<boolean>(false)
  const stopDockerFunc = async () => {
    const stopAlert = confirm('Are you Sure?')
    if (!stopAlert) return

    setIsStopping(true)
    try {
      const res: { status: boolean; msg: string[] } = await window.api.stopDockerRADIContainer()

      if (res.status) {
        dispatch({
          type: 'CHANGE_SCREEN',
          payload: {
            screenState: 'start',
            buttonState: 'start',
            errorWarningMsg: '',
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
      {buttonState === 'start' && (
        <ButtonWrapper
          onClick={() =>
            dispatch({
              type: 'START',
              payload: { screenState: 'loading' }
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
      {buttonState === 'continue' && (
        <ButtonWrapper
          onClick={() =>
            dispatch({
              type: 'START',
              payload: { screenState: 'loading' }
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
      {buttonState === 'back' && (
        <ButtonWrapper
          onClick={() =>
            dispatch({
              type: 'RESET'
            })
          }
          cssClass={`"bg-blue-600 ${styles.startButtonSvg}`}
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
      {buttonState === 'stop' && (
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
              onClick={() => (window.location.href = 'http://0.0.0.0:7164/exercises')}
              cssClass={`bg-green-600 ${styles.startButtonSvg}`}
            >
              <>
                <span>
                  <img src={GameConsoleIcon} alt="" className="w-[24px]" />
                </span>{' '}
                Exercise
              </>
            </ButtonWrapper>
          )}
        </div>
      )}
    </>
  )
}

export default StartScrrenButtons
