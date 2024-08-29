import Loader from './Loader'

type Props = {}

const AppClosingWarning = (props: Props) => {
  return (
    <div className={`w-full h-[calc(100%-20px)] absolute top-[20px] left-0  z-[100]`}>
      <div
        className={`w-full h-full absolute top-0 left-0 z-[51]`}
        style={{ background: 'rgba(255, 255, 255, 0.09)', backdropFilter: 'blur(15px)' }}
      ></div>
      <div
        className={`w-full h-full absolute bottom-9 left-0 flex flex-col justify-end items-center gap-2 text-[#454545] z-[52]`}
      >
        <Loader>
          <p className="text-lg font-medium ">Please Wait...</p>
        </Loader>
        <p className="text-base font-normal ">Stopping Background Process</p>
      </div>
    </div>
  )
}

export default AppClosingWarning
