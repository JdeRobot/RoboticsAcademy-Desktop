import React from 'react'
import { RocketIcon } from '@renderer/assets'
// interface StartButtonInterface = {}

const StartButton = (props) => {
  return (
    <div
      className={`w-[248px] h-[48px] flex justify-center items-center rounded-full bg-yellow-600 border-yellow-300 border cursor-pointer`}
    >
      <div className={`flex justify-center items-center  gap-2`}>
        <p className={`text-center font-bold text-lg uppercase text-[#d9d9d9]`}>Start</p>
        <img src={RocketIcon} className={`w-[20px]`} />
      </div>
    </div>
  )
}

export default StartButton
