import { ElectronAPI } from "@electron-toolkit/preload";
interface TestApi {
    testFunc: (string) => Promise<string>;
}
declare global {
    interface Window {
        electron: ElectronAPI;
        api: TestApi;
    }
}
