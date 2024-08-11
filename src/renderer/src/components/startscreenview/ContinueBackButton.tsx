import { RightArrowIcon, BackIcon, RocketIcon } from '@renderer/assets'
import { FC } from 'react'

interface ContinueBackButtonInterface {
  buttonState: string
  dispatch: any
}

const ContinueBackButton: FC<ContinueBackButtonInterface> = ({ buttonState, dispatch }) => {
  return (
    <>
      <div
        className={` w-[150px] h-[50px] mt-6 bg-yellow-600  duration-300 rounded-[9px] cursor-pointer`}
      >
        <div className={`w-full h-full  text-[#D9D9D9] text-lg font-semibold`}>
          {/* Start Button */}
          {buttonState === 'start' && (
            <div
              className={`w-full h-full flex items-center justify-center gap-2 `}
              onClick={() => {
                dispatch({
                  type: 'START',
                  payload: { screenState: 'loading' }
                })
              }}
            >
              <p className={`text-center font-bold text-md uppercase text-[#d9d9d9]`}>Start</p>
              <img src={RocketIcon} className={`w-[20px]`} />
            </div>
          )}
          {/* continue button */}
          {buttonState === 'continue' && (
            <div
              className={`w-full h-full flex items-center justify-center text-md uppercase gap-2 `}
              onClick={() => {
                dispatch({
                  type: 'START',
                  payload: { screenState: 'loading' }
                })
              }}
            >
              Continue{' '}
              <span>
                <img src={RightArrowIcon} alt="" className="w-[24px]" />
              </span>
            </div>
          )}
          {/* back button */}
          {buttonState === 'back' && (
            <div
              className={`w-full h-full flex items-center justify-center gap-2 text-md uppercase `}
              onClick={() => {
                dispatch({
                  type: 'START',
                  payload: { buttonState: 'continue', screenState: 'warning', process: 0 }
                })
              }}
            >
              <span>
                <img src={BackIcon} alt="" className="w-[24px]" />
              </span>{' '}
              Back
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ContinueBackButton
