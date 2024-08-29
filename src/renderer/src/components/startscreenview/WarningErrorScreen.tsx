import { DropDownIcon, WarningIcon, ErrorIcon } from '@renderer/assets'
import { Dispatch, FC, SetStateAction } from 'react'

interface WarningErrorScreenInterface {
  isExpand: boolean
  dispatch: any
  screenState: string
  buttonState: string
  errorWarningMsg: string[]
}

const WarningErrorScreen: FC<WarningErrorScreenInterface> = ({
  isExpand,
  screenState,
  buttonState,
  errorWarningMsg,
  dispatch
}) => {
  return (
    <div
      className={`w-full ${isExpand ? `pb-4 pt-2 px-2` : `h-[32px]`} px-1  bg-[#D9D9D9] text-[#454545] rounded-[30px] duration-300 `}
    >
      {/* close mode */}
      <div className={`w-full h-[32px] flex items-center justify-between`}>
        <div className={`flex items-center justify-between gap-3`}>
          <img
            src={`${screenState === 'error' ? ErrorIcon : WarningIcon}`}
            alt=""
            className={`w-[24px] h-[24px]`}
          />

          <p className={`text-sm `}>
            <span className="font-semibold">
              {screenState === 'error' ? `Error :` : `Warning :`}
            </span>{' '}
            {errorWarningMsg[0]}
          </p>
        </div>

        <div
          className={`hover:bg-yellow-500 p-[1px] rounded-full duration-300 cursor-pointer  ${isExpand && `rotate-180`}`}
        >
          <img
            src={DropDownIcon}
            alt=""
            className={`w-[24px] h-[24px`}
            onClick={() => dispatch({ type: 'EXPAND_DIV', payload: { isExpand: true } })}
          />
        </div>
      </div>
      {/* show details in expand */}
      {isExpand && (
        <div
          className={`w-full h-[240px] py-2 px-2 text-sm text-wrap break-words  duration-300 scrollbar overflow-x-hidden overflow-scroll`}
          id="scrollbar-style"
        >
          <div className="select-text">
            {errorWarningMsg.map((msg, index) => (
              <p key={index}>{index !== 0 && msg}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WarningErrorScreen
