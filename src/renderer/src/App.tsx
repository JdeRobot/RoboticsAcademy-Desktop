import { useState } from 'react'
import './assets/index.css'
import StartScreen from './views/StartView'

const App = () => {
  window.api.onClosingApp((_event, msg) => {
    console.log('msg ', msg)
  })

  const [cursorType, setCursorType] = useState<'default' | 'grab' | 'pointer'>('default')
  const handleRightClick = (e) => {
    e.preventDefault()
    setCursorType('pointer')
    console.log('pointer')
  }
  const handleMouseLeave = (e) => {
    e.preventDefault()
    setCursorType('default')
  }

  return (
    <div className="absolute w-screen h-screen ">
      {/* top bar */}
      <div
        onContextMenu={handleRightClick}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: cursorType }}
        className={`absolute top-0 left-0 w-full h-[20px] bg-red-600 z-50 draggable hover:cursor-pointer`}
      ></div>
      {/* Waiting Screen in when window close */}
      <div className={`hidden w-full h-full absolute top-0 left-0 bg-black opacity-70 z-50`}>
        <div
          className={`w-full h-full flex flex-col gap-2 justify-center items-center text-[#d9d9d9]`}
        >
          <p>Please Wait...</p>
          <p>Stoping Background Process</p>
        </div>
      </div>
      <StartScreen />
      {/* Start Screen */}
    </div>
  )
}

export default App

/*
 const [msg, setMsg] = useState<string>('')
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const testApi = async (): Promise<void> => {
    try {
      const res = await window.api.testFunc('hello world')

      setMsg(res)
    } catch (error) {
      console.error(error)
    }
  }

*/
