import { useEffect, useReducer, useRef, useState } from 'react'
import './assets/index.css'
import { TopBar, SpeedDialUtils } from './components'
import AppClosingWarning from './components/utlits/AppClosingWarning'
import StartScreen from './views/StartView'
import { AllCommandConfigure, AllDockersImages } from './constants'

const App = () => {
  const [isAppClosing, setIsAppclosing] = useState<boolean>(false)
  const [content, setContent] = useState(false)
  const [url, setUrl] = useState<string>('http://localhost:7164/')

  // checking or store data on localstorage
  useEffect(() => {
    //checking if stored already
    const configureId = localStorage.getItem('currentConfigureId')
    if (configureId === null) {
      localStorage.setItem('ActiveConfigureId', String(1))
      localStorage.setItem('ActiveDockerImage', 'jderobot/robotics-academy')
      localStorage.setItem('AllCommandConfigure', JSON.stringify(AllCommandConfigure))
      localStorage.setItem('AllDockerImage', JSON.stringify(AllDockersImages))
    }
  }, [])

  return (
    <div className="absolute w-screen h-screen rounded-lg">
      {/* top bar */}
      <TopBar setIsAppclosing={setIsAppclosing} />
      {/* Waiting Screen in when window close */}
      {isAppClosing && <AppClosingWarning />}
      {/* Start Screen */}

      {!content && <StartScreen setContent={setContent} />}
      {/* new screen */}
      {content && (
        <div className="mt-6 w-full h-[calc(100%-24px)]">
          <iframe
            id={'iframe'}
            style={{
              width: '100%',
              height: '100%'
            }}
            src={url}
          ></iframe>
        </div>
      )}
      {content && <SpeedDialUtils setContent={setContent} setUrl={setUrl} />}
    </div>
  )
}

export default App
