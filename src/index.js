const { app, BrowserWindow } = require('electron');
const path = require('path');


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile('src/index.html');
  // mainWindow.webContents.openDevTools();
};

app.on('ready', () => {

  setTimeout(() => {
    createWindow()
  }, 5000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();

  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

