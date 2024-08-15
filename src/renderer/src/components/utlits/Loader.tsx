import React from 'react'

type Props = {}

const Loader = ({ children }) => {
  return (
    <div className={`flex items-center gap-2`}>
      <div className="border-[#D9D9D9] h-[16px] w-[16px] animate-spin rounded-full border-2 border-t-[#939393]" />
      <div>{children}</div>
    </div>
  )
}

export default Loader
