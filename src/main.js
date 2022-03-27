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

ventanafacturacion = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  win.loadFile("views/facturacion/facturacion.html");
  win.maximize();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
