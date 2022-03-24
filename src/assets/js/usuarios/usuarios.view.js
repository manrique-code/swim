// Importando e instanciando la clase de Abonados del modelo de datos.
import Usuarios from "../../../dao/usuarios/usuarios.model.js";
const usuarioModel = new Usuarios();
//const data = await usuarioModel.estadoUsuarioCreate()
//const data2 = await usuarioModel.tipoUsuarioCreate()
/*
const datos = await usuarioModel.nuevoUsuario(
    "caguilar",
    "123",
    "2022-03-18",
    1,
    1
);

console.log(datos);*/

document
  .getElementById("headerButtonSidebar")
  .addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sidebar = document.getElementById("sidebarSwim");
    if (sidebar.classList.contains("mostrar"))
      sidebar.classList.remove("mostrar");
    else sidebar.classList.add("mostrar");
  });
