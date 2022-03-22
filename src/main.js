const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      // devTools: true,
      enableRemoteModule: true,
    },
  });

  win.loadFile("views/abonados/abonados.html");
  win.maximize();
}

ventanaContrato = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  win.loadFile("views/abonados/contrato.html");
  win.maximize();
};

ventanaUsuario = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  win.loadFile("views/usuarios/usuarios.html");
  win.maximize();
};

app.whenReady().then(() => {
  ventanaUsuario();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      ventanaUsuario();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
