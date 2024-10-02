import { FC } from 'react'
import Loader from './Loader'

interface AppClosingWarningInterface {}

const AppClosingWarning: FC<AppClosingWarningInterface> = ({}) => {
  return (
    <div className={`w-full h-[calc(100%-28px)] absolute top-[28px] left-0  z-[100]`}>
      <div
        className={`w-full h-full absolute top-0 left-0`}
        style={{ background: 'rgba(255, 255, 255, 0.09)', backdropFilter: 'blur(5px)' }}
      ></div>
      <div
        className={`w-full h-full absolute bottom-9 left-0 flex flex-col justify-end items-center gap-2 text-yellow-600 z-[52]`}
      >
        <Loader cssClass="border-yellow-600 border-t-yellow-200">
          <p className="text-lg font-medium ">Please Wait...</p>
        </Loader>
        <p className="text-base font-normal ">Stopping Background Process</p>
      </div>
    </div>
  )
}
AppClosingWarning.propTypes = {}
export default AppClosingWarning
