import { Dispatch, FC, SetStateAction, useState } from 'react'
import PropTypes from 'prop-types'
import { HomeIcon, SettingsIcon } from '@renderer/assets'

interface SpeedDialUtilsInterface {
  setUrl: Dispatch<SetStateAction<string>>
  setContent: Dispatch<SetStateAction<boolean>>
}
const SpeedDialUtils: FC<SpeedDialUtilsInterface> = ({ setContent }) => {
  const [isOpenSpeedDial, setIsSpeedDial] = useState<boolean>(false)
  return (
    <div
      data-dial-init
      className="fixed end-6 bottom-6 group z-[90]"
      onMouseEnter={() => setIsSpeedDial(true)}
      onMouseLeave={() => setIsSpeedDial(false)}
    >
      <div
        id="speed-dial-menu-default"
        className="flex flex-col items-center xhidden mb-4 space-y-2"
      >
        {/* home */}
        <button
          type="button"
          data-tooltip-target="tooltip-copy"
          data-tooltip-placement="left"
          className={`${isOpenSpeedDial ? `opacity-100` : `opacity-0`} flex duration-100 justify-center items-center  w-14 h-14 bg-slate-600 rounded-full dark:border-gray-600  hover:bg-slate-700 shadow-lg shadow-gray-600`}
          onClick={() => {
            setContent(false)
            setTimeout(() => {
              setContent(true)
            }, 0)
          }}
        >
          <img src={HomeIcon} alt="settings" className="w-6" />
        </button>
        {/* settings */}
        <button
          type="button"
          data-tooltip-target="tooltip-copy"
          data-tooltip-placement="left"
          className={`${isOpenSpeedDial ? `opacity-100` : `opacity-0`} flex duration-100 justify-center items-center  w-14 h-14 bg-slate-600 rounded-full dark:border-gray-600  hover:bg-slate-700 shadow-lg shadow-gray-600`}
          onClick={() => setContent(false)}
        >
          <img src={SettingsIcon} alt="settings" className="w-6" />
        </button>
      </div>

      {/* default button */}
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-default"
        aria-controls="speed-dial-menu-default"
        aria-expanded="false"
        className="flex items-center justify-center text-white bg-yellow-600 rounded-full w-14 h-14 hover:bg-yellow-700 focus:ring-4 focus:ring-blue-300 focus:outline-none "
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:rotate-45"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </button>
    </div>
  )
}

SpeedDialUtils.propTypes = {
  setUrl: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired
}
export default SpeedDialUtils
