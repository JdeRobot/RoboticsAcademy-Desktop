import { FC, useState } from 'react'
import styles from './../assets/styles/startView.module.css'
import { LogoTitle, StartButton, FooterLinks } from './../components/index'
type Props = {}

const StartScreen: FC<Props> = (props: Props) => {
  const [isExpand, setIsExpand] = useState<boolean>(false)

  return (
    <div className={styles.backgroundVideo}>
      <div className={styles.blurLayer}></div>
      <div
        className={`${styles.startScreen} z-[3] w-[640px] duration-300 ${isExpand ? `h-[639px]` : `h-[426px]`} overflow-hidden`}
      >
        <div className={`w-full h-full flex flex-col justify-between items-center py-3`}>
          <LogoTitle />
          <StartButton />
          <FooterLinks />
        </div>
        hello world
        <a className={``} onClick={() => setIsExpand((prev) => !prev)}>
          {isExpand ? `Close` : `Open`}
        </a>
      </div>
    </div>
  )
}

export default StartScreen
