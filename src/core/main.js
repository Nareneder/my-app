const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
autoUpdater.setFeedURL('https://github.com/Nareneder/my-app/releases')

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
	  contextIsolation:false
    },
  });
  mainWindow.loadFile('src/gui/index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
	  autoUpdater.checkForUpdates()
  });
}

app.on('ready', () => {
  createWindow();
  updateApp = require('update-electron-app');

    updateApp({
        // repo: 'PhiloNL/electron-hello-world', // defaults to package.json
        updateInterval: '5 minutes',
        notifyUser: true
    });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  //
})

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
   autoUpdater.quitAndInstall()
})

