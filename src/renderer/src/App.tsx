import './assets/index.css'
// import { useState } from 'react'
import StartScreen from './views/StartView'

function App(): JSX.Element {
  return (
    <div className="absolute w-full h-full">
      <StartScreen />
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
