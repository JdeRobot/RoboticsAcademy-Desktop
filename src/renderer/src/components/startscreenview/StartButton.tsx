import React from 'react'

type Props = {}

const StartButton = (props: Props) => {
  return (
    <div
      className={`w-[248px] h-[40px] mb-10 text-center font-bold text-lg rounded-full bg-yellow-600 border-yellow-300 border-2 cursor-pointer hover:translate-y-[1px] hover:translate-x-[1px] flex justify-center items-center duration-75 shadow-md shadow-yellow-200`}
    >
      Start
    </div>
  )
}

export default StartButton
