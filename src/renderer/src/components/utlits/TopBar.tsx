import { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  WindowMinIcon,
  WindowMaximizeIcon,
  WindowCloseIcon,
  WindowUnMaximizeIcon
} from '@renderer/assets/icons/Icons'
import PropTypes from 'prop-types'
import { ResponseStatus } from '@renderer/utils/enums'
import { Logo } from '@renderer/assets'

interface TopBarInterface {
  setIsAppclosing: Dispatch<SetStateAction<boolean>>
}

const TopBar: FC<TopBarInterface> = ({ setIsAppclosing }) => {
  const [isMaximize, setIsMaximize] = useState<boolean>(false)
  const [isClosingProcess, setIsClosingProcess] = useState<boolean>(false)

  const maximizeUnmaximizeFunc = () => {
    // if window maximize before and unmaximize or else maximize the window
    window.api.sendWindowResize('app_window:MAX_UNMAX')
    setIsMaximize((prev) => !prev)
  }

  const handlewindowClose = () => {
    const closeAlart = confirm('Are you Sure?')
    if (!closeAlart) return

    setIsClosingProcess(true)

    if (isClosingProcess) return
    const stopDocker = async () => {
      try {
        const res = await window.api.stopDockerRADIContainer()
        if (res.status === ResponseStatus.SUCCESS) {
          window.api.sendWindowResize('app_window:CLOSE')
        } else {
          console.log(res.msg)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsAppclosing(false)
        setIsClosingProcess(false)
      }
    }
    const isRADIContainerRunning = async () => {
      setIsAppclosing(true)

      try {
        const res = await window.api.checkRADIContainerRunning()
        if (res.status === ResponseStatus.SUCCESS) {
          stopDocker()
        } else window.api.sendWindowResize('app_window:CLOSE')
      } catch (error) {
        window.api.sendWindowResize('app_window:CLOSE')
      } finally {
        setIsClosingProcess(false)
      }
    }

    isRADIContainerRunning()
  }
  return (
    <div
      className={`absolute w-full h-[28px] bg-[#454545] xbg-gray-600 z-[100] hover:cursor-pointer`}
    >
      <div className={`w-full h-full flex justify-between items-center`}>
        {/* dragable bar area */}
        <div className={`w-[calc(100%-90px)] h-full draggable flex justify-center items-center`}>
          <div className="flex justify-center items-center gap-2">
            <img src={Logo} alt="" className="w-[24px]" />
            <span className="font-medium text-base">Robotics Academy</span>
          </div>
        </div>
        {/* minimize & maximize */}
        <div className={`w-[90px] h-full flex justify-center items-center select-none`}>
          {/* minimize */}
          <div
            className={`flex justify-center items-center h-[28px] w-[30px]  hover:bg-gray-600 group  duration-300`}
            onClick={() => window.api.sendWindowResize('app_window:MINIMIZE')}
          >
            <WindowMinIcon cssClass="group-hover:fill-white fill-gray-300" />
          </div>

          {/* Maximize & Unminimize */}
          <div
            className={`flex justify-center items-center h-[28px] w-[30px] py-2 hover:bg-green-600 group  duration-300`}
            onClick={() => maximizeUnmaximizeFunc()}
          >
            {isMaximize ? (
              <WindowMaximizeIcon cssClass="group-hover:fill-white fill-gray-300" />
            ) : (
              <WindowUnMaximizeIcon cssClass="group-hover:fill-white  fill-gray-300" />
            )}
          </div>

          <div
            className={`flex justify-center items-center h-[28px] w-[30px]  hover:bg-red-600 group  duration-300`}
            onClick={() => handlewindowClose()}
          >
            <WindowCloseIcon cssClass="group-hover:fill-white fill-gray-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
TopBar.propTypes = {
  setIsAppclosing: PropTypes.func.isRequired
}

export default TopBar
