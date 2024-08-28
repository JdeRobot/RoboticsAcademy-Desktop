import { useEffect, useReducer, useRef, useState } from 'react'
import './assets/index.css'
import { TopBar, SpeedDialUtils } from './components'
import AppClosingWarning from './components/utlits/AppClosingWarning'
import StartScreen from './views/StartView'
import { AllCommandConfigure, AllCommandConfigureInterface, AllDockersImages } from './constants'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [isAppClosing, setIsAppclosing] = useState<boolean>(false)
  const [content, setContent] = useState(false)
  const [url, setUrl] = useState<string>('http://localhost:7164/')

  // configure state
  const [commandConfigure, setCommandConfigure] = useState<AllCommandConfigureInterface | null>(
    null
  )
  const [dockerImage, setDockerImage] = useState<string | null>(null)

  function getAndStoreLocalStorageData() {
    //
    const activeConfigureIdData: string | null = localStorage.getItem('ActiveConfigureId')
    const commandConfigureData: string | null = localStorage.getItem('AllCommandConfigure')

    if (commandConfigureData === null || activeConfigureIdData === null) {
      setCommandConfigure(null)
      return
    }

    const commandConfigureDataParse: AllCommandConfigureInterface[] =
      JSON.parse(commandConfigureData)

    setCommandConfigure(
      commandConfigureDataParse.find((command) => {
        return command.id === activeConfigureIdData
      }) || null
    )

    // docker image
    const dockerImageData: string | null = localStorage.getItem('ActiveDockerImage')
    if (dockerImageData === null) {
      setDockerImage(null)
    } else setDockerImage(AllDockersImages[dockerImageData])
  }

  // checking or store data on localstorage
  useEffect(() => {
    const updateAllCommandConfig: AllCommandConfigureInterface[] = AllCommandConfigure.map(
      (config) => {
        return { ...config, id: uuidv4() }
      }
    )

    //checking if stored already
    const configureId = localStorage.getItem('currentConfigureId')
    if (configureId === null) {
      localStorage.setItem('ActiveConfigureId', String(updateAllCommandConfig[0].id))
      localStorage.setItem('ActiveDockerImage', 'jderobotRoboticsAcademy')
      localStorage.setItem('AllCommandConfigure', JSON.stringify(updateAllCommandConfig))
      localStorage.setItem('AllDockerImage', JSON.stringify(AllDockersImages))
    }

    getAndStoreLocalStorageData()
  }, [])

  return (
    <div className="absolute w-screen h-screen rounded-lg">
      {/* top bar */}
      <TopBar setIsAppclosing={setIsAppclosing} />
      {/* Waiting Screen in when window close */}
      {isAppClosing && <AppClosingWarning />}
      {/* Start Screen */}

      {!content && (
        <StartScreen
          setContent={setContent}
          dockerImage={dockerImage}
          commandConfigure={commandConfigure}
        />
      )}
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
