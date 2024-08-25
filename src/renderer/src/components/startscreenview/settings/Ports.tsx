import { FC } from 'react'
import { LinkChainIcon } from '@renderer/assets'
import { AddIcon, MinusIcon } from '@renderer/assets/icons/Icons'
import { layout } from '@renderer/assets/styles/styles'

interface PortsInterface {
  django
  gazebo
  consoles
  other
  errorMsg
  handleInputChangeAndBlur
  handleUpdatePort
}
const Ports: FC<PortsInterface> = ({
  django,
  gazebo,
  consoles,
  other,
  errorMsg,
  handleInputChangeAndBlur,
  handleUpdatePort
}) => {
  return (
    <div className={`relative w-full ${layout.flexColCenter}  gap-4`}>
      {/* Port Pairs */}
      <div className="w-[400px] flex flex-col items-center justify-between gap-4">
        {[django, gazebo, consoles, other].map((server, index) => (
          <div className="w-full flex items-center justify-between" key={index}>
            <div className="w-[182px]">
              <label
                htmlFor="bedrooms-input"
                className="flex items-center justify-start gap-2 mb-2 "
              >
                <img src={LinkChainIcon} alt="link" className={`w-[16px] h-[16px]`} />
                <span className="text-base font-medium text-[#d9d9d9] ">
                  {server.name[0].toLocaleUpperCase() + server.name.substring(1)} Port:
                </span>
              </label>
              <div className="relative w-[182px] h-[40px] flex items-center ">
                <input
                  type="number"
                  id={`${server.name}_0`}
                  className=" bg-white rounded-l-lg w-[94px] h-[40px] font-medium text-center text-[#454545] text-base block  focus:border-none "
                  style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                  placeholder="port"
                  value={server.ports[0]}
                  onChange={(e) => handleInputChangeAndBlur(e)}
                  onBlur={(e) => handleInputChangeAndBlur(e, true)}
                />

                <button
                  className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] ${layout.flexCenter}`}
                  onClick={() => handleUpdatePort(`${server.name}_0_1`)}
                >
                  <AddIcon cssClass="w-3 h-3 text-[#454545]" />
                </button>
                <button
                  type="button"
                  className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] rounded-r-lg ${layout.flexCenter}`}
                  onClick={() => handleUpdatePort(`${server.name}_0_-1`)}
                >
                  <MinusIcon cssClass="w-3 h-3 text-[#454545]" />
                </button>
              </div>
            </div>
            <div className="text-4xl text-white font-extrabold mt-5">:</div>
            <div className="w-[182px]">
              <label
                htmlFor="bedrooms-input"
                className="flex items-center justify-start gap-2 mb-2 "
              >
                <img src={LinkChainIcon} alt="link" className={`w-[16px] h-[16px]`} />
                <span className="text-base font-medium text-[#d9d9d9] ">
                  {server.name[0].toLocaleUpperCase() + server.name.substring(1)} Port:
                </span>
              </label>
              <div className="relative w-[182px] h-[40px] flex items-center ">
                <input
                  type="text"
                  id={`${server.name}_1`}
                  className="bg-white rounded-l-lg w-[94px] h-[40px] font-medium text-center text-[#454545] text-base block  focus:border-none "
                  style={{ boxShadow: '0px 0px 0px white', border: 'none' }}
                  placeholder="port"
                  value={server.ports[1]}
                  onChange={(e) => handleInputChangeAndBlur(e)}
                  onBlur={(e) => handleInputChangeAndBlur(e, true)}
                />

                <button
                  type="button"
                  className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] ${layout.flexCenter}`}
                  onClick={() => handleUpdatePort(`${server.name}_1_1`)}
                >
                  <AddIcon cssClass="w-3 h-3 text-[#454545]" />
                </button>
                <button
                  type="button"
                  id={server.name.toString() + '_' + 1}
                  className={`bg-gray-100 hover:bg-gray-200 w-[44px] h-full border-l-[1px] border-[#B3B3B3] rounded-r-lg ${layout.flexCenter}`}
                  onClick={() => handleUpdatePort(`${server.name}_1_-1`)}
                >
                  <MinusIcon cssClass="w-3 h-3 text-[#454545]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <span className="absolute w-[400px] -bottom-8 left-[50%] text-sm font-extralight text-red-800 -translate-x-[50%]">
        {errorMsg}
      </span>
    </div>
  )
}

export default Ports
