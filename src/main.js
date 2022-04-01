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

  win.loadFile("views/contratos/contratos.html");
  win.maximize();
};

ventanaInicioSesion = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  win.loadFile("views/usuarios/login.html");
  win.maximize();
};

app.whenReady().then(() => {
  ventanafacturacion();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      ventanafacturacion();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
