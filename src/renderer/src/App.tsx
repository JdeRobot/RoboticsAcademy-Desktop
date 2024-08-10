import './assets/index.css'
import StartScreen from './views/StartView'

const App = () => {
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
