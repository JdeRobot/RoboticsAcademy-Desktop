import { FC, ReactNode } from 'react'
import Loader from '../utlits/Loader'

interface ButtonWrapperInterface {
  children: ReactNode
  isLoading?: boolean
  loadingText?: string
  onClick: () => void
  cssClass: string
}
const ButtonWrapper: FC<ButtonWrapperInterface> = ({
  children,
  isLoading,
  loadingText,
  onClick,
  cssClass
}) => {
  return (
    <div
      className={` w-[150px] h-[50px] mt-6 duration-300 rounded-[9px] cursor-pointer ${cssClass} `}
    >
      <div
        className={`w-full h-full flex items-center justify-center gap-2 font-bold`}
        onClick={() => onClick()}
      >
        {isLoading ? (
          <div>
            <Loader>{loadingText}</Loader>
          </div>
        ) : (
          <> {children} </>
        )}
      </div>
    </div>
  )
}

export default ButtonWrapper
