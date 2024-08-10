import { DropDownIcon, WarningIcon } from '@renderer/assets'
import { Dispatch, FC, SetStateAction } from 'react'

interface WarningErrorScreenInterface {
  isExpand: boolean
  setIsExtend: Dispatch<SetStateAction<boolean>>
}

const WarningErrorScreen: FC<WarningErrorScreenInterface> = ({ isExpand, setIsExtend }) => {
  return (
    <div
      className={`w-full ${isExpand ? `pb-4 pt-2 px-2` : `h-[32px]`} px-1  bg-[#D9D9D9] text-[#454545] rounded-[30px] duration-300 `}
    >
      {/* close mode */}
      <div className={`w-full h-[32px] flex items-center justify-between`}>
        <div className={`flex items-center justify-between gap-3`}>
          <img src={WarningIcon} alt="" className={`w-[24px] h-[24px]`} />

          <p className={`text-sm `}>
            <span className="font-semibold">Warning :</span> docker: Error response from daemon
          </p>
        </div>

        <div
          className={`hover:bg-yellow-500 p-[1px] rounded-full duration-300 cursor-pointer  ${isExpand && `rotate-180`}`}
        >
          <img
            src={DropDownIcon}
            alt=""
            className={`w-[24px] h-[24px`}
            onClick={() => setIsExtend((prev) => !prev)}
          />
        </div>
      </div>
      {/* show details in expand */}
      {isExpand && (
        <div
          className={`w-full h-[240px] py-2 px-2 text-sm text-wrap break-words  duration-300 scrollbar overflow-x-hidden overflow-scroll`}
          id="scrollbar-style"
        >
          <div>
            <p>
              docker: Error response from daemon: driver failed programming external connectivity on
              endpoint boring_lederberg
              (69fc4e8a9c6c9a0068546f113d109d36afe7bb6baf40288e49c3474c457cfe00): Bind for
              0.0.0.0:7164 failed: port is already allocated. Docker process exited with code 125
            </p>
            <p>
              docker: Error response from daemon: driver failed programming external connectivity on
              endpoint boring_lederberg
              (69fc4e8a9c6c9a0068546f113d109d36afe7bb6baf40288e49c3474c457cfe00): Bind for
              0.0.0.0:7164 failed: port is already allocated. Docker process exited with code 125
            </p>
            <p>
              docker: Error response from daemon: driver failed programming external connectivity on
              endpoint boring_lederberg
              (69fc4e8a9c6c9a0068546f113d109d36afe7bb6baf40288e49c3474c457cfe00): Bind for
              0.0.0.0:7164 failed: port is already allocated. Docker process exited with code 125
            </p>
          </div>
          {/* <div className="force-overflow"></div> */}
        </div>
      )}
    </div>
  )
}

export default WarningErrorScreen
