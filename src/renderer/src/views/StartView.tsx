import React, { FC } from 'react'
import './../assets/main.css'
type Props = {}

const StartScreen: FC<Props> = (props: Props) => {
  return (
    <div className="background-video">
      <div className="blur-layer"></div>
      <div className="z-[3] startScreen">hello world</div>
    </div>
  )
}

export default StartScreen
