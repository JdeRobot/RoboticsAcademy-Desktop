import { useState } from 'react'
import './assets/index.css'
import { TopBar } from './components'
import AppClosingWarning from './components/utlits/AppClosingWarning'
import StartScreen from './views/StartView'

const App = () => {
  const [isAppClosing, setIsAppclosing] = useState<boolean>(false)
  // window.api.onClosingApp((_event, msg) => {
  //   console.log('msg ', msg)
  // })

  return (
    <div className="absolute w-screen h-screen rounded-lg">
      {/* top bar */}
      <TopBar setIsAppclosing={setIsAppclosing} />
      {/* Waiting Screen in when window close */}
      {isAppClosing && <AppClosingWarning />}
      <StartScreen />
      {/* Start Screen */}
    </div>
  )
}

export default App
