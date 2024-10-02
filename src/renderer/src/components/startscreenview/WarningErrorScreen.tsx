import { FC } from 'react'
import PropTypes from 'prop-types'
import { DropDownIcon, WarningIcon, ErrorIcon } from '@renderer/assets'

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
  errorWarningMsg,
  dispatch
}) => {
  return (
    <div
      className={`w-full ${isExpand ? `pb-4 pt-2 px-2 gap-x-8 h-[300px]` : `h-[32px]`} px-2  bg-[#D9D9D9] text-[#454545] rounded-[30px] duration-500 overflow-hidden`}
    >
      {/* close mode */}
      <div className={`w-full h-[32px] flex items-center justify-between`}>
        <div className={`flex items-center justify-between gap-3`}>
          <img
            src={`${screenState === 'error' ? ErrorIcon : WarningIcon}`}
            alt=""
            className={`w-[24px] h-[24px]`}
          />

          <p className={`text-sm`}>
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
            onClick={() => dispatch({ type: 'EXPAND_DIV', payload: { isExpand: !isExpand } })}
          />
        </div>
      </div>
      {/* show details in expand */}
      {isExpand && (
        <div
          className={`${isExpand ? `h-[240px]` : `h-[0px]`} w-full  py-2 px-2 text-sm text-wrap break-words xduration-300 scrollbar overflow-x-hidden overflow-scroll`}
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

WarningErrorScreen.propTypes = {
  isExpand: PropTypes.bool.isRequired,
  dispatch: PropTypes.any,
  screenState: PropTypes.string.isRequired,
  buttonState: PropTypes.string.isRequired,
  errorWarningMsg: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any]))
    .isRequired
}
export default WarningErrorScreen
