import Versions from "./components/Versions";
import electronLogo from "./assets/electron.svg";
import { useState } from "react";

function App(): JSX.Element {
    const [msg, setMsg] = useState<string>("");
    const ipcHandle = (): void => window.electron.ipcRenderer.send("ping");

    const testApi = async (): Promise<void> => {
        try {
            const res = await window.api.testFunc("hello world");

            setMsg(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <img alt='logo' className='logo' src={electronLogo} />
            <div className='creator'>Powered by electron-vite</div>
            <div className='text'>
                Build an Electron app with <span className='react'>React</span>
                &nbsp;and <span className='ts'>TypeScript</span>
            </div>
            <p className='tip'>
                Please try pressing <code>F12</code> to open the devTool
            </p>
            <div className='actions'>
                <div className='action'>
                    <a
                        href='https://electron-vite.org/'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Documentation
                    </a>
                </div>
                <div className='action'>
                    <a target='_blank' rel='noreferrer' onClick={ipcHandle}>
                        Send IPC
                    </a>
                    <a className='action' onClick={testApi}>
                        Test IPC
                    </a>
                </div>
            </div>
            <div>{msg}</div>
            <Versions></Versions>
        </>
    );
}

export default App;
