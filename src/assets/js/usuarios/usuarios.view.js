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

const limpiarFormulario = () => {
  document.getElementById("txtNombreUsuario").value = "";
  document.getElementById("txtContraseña").value = "";
  document.getElementById("txtFechaRegistro").value = "";
  document.getElementById("txtEstado1").checked = false;
  document.getElementById("txtEstado2").checked = false;
  document.getElementById("cboTipoUsuario").value = 0;
};

const select = document.getElementById("cboTipoUsuario");
usuarioModel.obtenerTipoUsuario((tipoUsuarios) =>{
  let i = 1;
  tipoUsuarios.map((tipo) =>{
    const option = document.createElement("option");
    option.value = i++;
    option.text = tipo?.tipoUsuario;
    select.appendChild(option)
  });
});

const guardarUsuario = async () => {
  const nombreUsuario = document.getElementById("txtNombreUsuario").value;
  const contraseña = document.getElementById("txtContraseña").value;
  const fechaRegistro = document.getElementById("txtFechaRegistro").value;
  const txtEstado1 = document.getElementById("txtEstado1");
  const txtEstado2 = document.getElementById("txtEstado2");
  const tipoUsuario = document.getElementById("cboTipoUsuario").value;
  const estado = txtEstado1.checked ? txtEstado1.value : txtEstado2.value;
  await usuarioModel.nuevoUsuario(
    nombreUsuario,
    contraseña,
    fechaRegistro,
    estado,
    tipoUsuario,
    (resultado) => {
      if (resultado.rowsAffected) {
        limpiarFormulario();
        alert("Se guardó el usuario");
      }
    }
  );
};

document
  .getElementById("btn-guardar-info")
  .addEventListener("click", async (e) => {
    let esUsuarioCreado;
    e.preventDefault();
    e.stopPropagation();
    esUsuarioCreado = await guardarUsuario();
  });

  document.getElementById("btnIrCrearUsuarios").addEventListener("click", async (e) => {
    window.location = "usuariosLog.html"
  })
  
  document.getElementById("btnIrListadoUsuarios").addEventListener("click", async (e) => {
    window.location = "listadousuarios.html"
  })