import { FC, ReactNode } from 'react'

interface ButtonWrapperInterface {
  children: ReactNode
  onClick: () => void
  cssClass: string
}
const ButtonWrapper: FC<ButtonWrapperInterface> = ({ children, onClick, cssClass }) => {
  return (
    <div
      className={` w-[160px] h-[50px] mt-6 duration-300 rounded-[9px] cursor-pointer ${cssClass} `}
    >
      <div
        className={`w-full h-full flex items-center justify-center gap-2 font-bold`}
        onClick={() => onClick()}
      >
        {children}
      </div>
    </div>
  )
}

export default ButtonWrapper
