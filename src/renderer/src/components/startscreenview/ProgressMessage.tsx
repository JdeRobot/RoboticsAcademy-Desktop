import { FC } from 'react'

interface ProgressMessageInterface {
  msg: string
  progress: number
  totalProgressSteps: number
}

const ProgressMessage: FC<ProgressMessageInterface> = ({ msg, progress, totalProgressSteps }) => {
  const calcProgress = (): string => {
    const percentage = Math.ceil((progress / totalProgressSteps) * 100)
    return `${percentage}%`
  }
  return (
    <div className={`w-full flex flex-col items-start gap-4`}>
      <div className={`flex items-center gap-4`}>
        {/* spinner */}
        <div className="border-[#D9D9D9] h-[16px] w-[16px] animate-spin rounded-full border-2 border-t-[#939393]" />
        <p className={`text-sm `}>{msg}</p>
      </div>
      {/* Progress bar */}
      <div className="w-full h-[6px] bg-[#D9D9D9] rounded-full ">
        <div
          className="w-full h-[6px]  bg-[#939393] rounded-full"
          style={{ width: calcProgress() }}
        ></div>
      </div>
      <div className={`w-full relative bottom-3 flex justify-center text-sm `}>
        {calcProgress()}
      </div>
    </div>
  )
}

export default ProgressMessage
