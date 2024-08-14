import { Logo } from '@renderer/assets'
import Styles from './../../assets/styles/startView.module.css'
type Props = {}

const LogoTitle = (props: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className={`bg-[#d9d9d9] h-[96px] w-[96px] rounded-3xl`}>
        <img src={Logo} alt="" className={`h-[96px] w-[96px]`} />
      </div>
      <div>
        <p className={`text-[40px] font-bold`}>Robotics Academy</p>
        <p className="text-end text-sm">
          by{' '}
          <span
            className={`text-2xl font-semibold text-red-700 line-[10px] leading-[10px] ${Styles.orginzationText}`}
          >
            JdeRobot
          </span>
        </p>
      </div>
    </div>
  )
}

export default LogoTitle
