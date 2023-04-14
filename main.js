// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({

    // Window size
    width: 740,
    height: 540,

    // Window position
    // x: 0,
    // y: 0,

    // Window title
    title: "The Zone Pomodoro",

    // Window icon
    icon: path.join(__dirname, "./build/icon192.png"),
    

    // WebPreferences
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
    zoomFactor: 1.0,
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./build/index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Window need to be always on top, even when the user is using another app
  mainWindow.setAlwaysOnTop(true, "floating", 1);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algunas APIs pueden solamente ser usadas despues de que este evento ocurra.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
