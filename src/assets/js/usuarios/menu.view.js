const miStorage = window.localStorage;

const cerrarSesion = async () =>{
    miStorage.clear();
    window.location="./usuarios/login.html"
  }
  
  document
    .getElementById("btnCerrarSesion")
    .addEventListener("click", async (e) => {
      let cerrar;
      e.preventDefault();
      e.stopPropagation();
      cerrar = await cerrarSesion();
    });