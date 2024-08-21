import { useEffect, useReducer, useRef, useState } from 'react'
import './assets/index.css'
import { TopBar } from './components'
import AppClosingWarning from './components/utlits/AppClosingWarning'
import StartScreen from './views/StartView'

const App = () => {
  const [isAppClosing, setIsAppclosing] = useState<boolean>(false)
  // window.api.onClosingApp((_event, msg) => {
  //   console.log('msg ', msg)
  // })
  const [content, setContent] = useState(false)

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
            // src={'http://localhost:5174/'}
            src={'http://localhost:7164/'}
          ></iframe>
        </div>
      )}
      {content && (
        <div
          className="absolute right-6 bottom-6 p-4 rounded-full z-[100] bg-red-600"
          onClick={() => {
            const response = confirm('Are You Sure?')
            if (response) setContent(false)
          }}
        >
          Home
        </div>
      )}
    </div>
  )
}

export default App
