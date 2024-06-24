const { app, BrowserWindow } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
    app.quit();
}

// splash screen
function createSplashWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 200,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
    });

    win.loadFile("./src/splash.html");
    return win;
}
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 500,
        minHeight: 500,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadFile("src/index.html");
    // mainWindow.webContents.openDevTools();

    return mainWindow;
};

//* when app ready
app.whenReady().then(async () => {
    try {
        const splashScreen = createSplashWindow();
        const mainScreen = createWindow();

        mainScreen.once("ready-to-show", () => {
            setTimeout(() => {
                mainScreen.show();
                splashScreen.destroy();
            }, 3000);
        });
    } catch (error) {
        console.log(error);
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
