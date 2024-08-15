import React from 'react'

type Props = {}

const AppClosingWarning = (props: Props) => {
  return (
    <div className={`w-full h-full absolute top-0 left-0 bg-black opacity-70 z-50`}>
      <div
        className={`w-full h-full flex flex-col gap-2 justify-center items-center text-[#d9d9d9]`}
      >
        <p>Please Wait...</p>
        <p>Stoping Background Process</p>
      </div>
    </div>
  )
}

export default AppClosingWarning
