import Usuarios from "../../../dao/usuarios/usuarios.model.js";
const usuarioModel = new Usuarios();
let ID = "";

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

const vaciarTabla = () =>{
    const idTabla = document.getElementById("tb-usuarios");
    while (idTabla.firstChild) {
      idTabla.removeChild(idTabla.firstChild);
    }
  }

const eliminarUsuario = async (idUsuario) => {
    const uuidGenerado = idUsuario;
    await usuarioModel.eliminarUsuario(
        uuidGenerado,
        (resultado) => {
        if (resultado.rowsAffected) {
            alert("Se elimino el pago");
        }
        }
    );
};
const llenarTabla = () =>{
    const idTabla = document.getElementById("tb-usuarios");
    usuarioModel.obtenerTodoUsuarios((usuarios) => {
      let i = 1;
        usuarios.map((u) => {
          const hilera = document.createElement("tr");
          const idUsuario = document.createElement("td");
          const Enumeracion = document.createElement("td");
          const NombreUsuario = document.createElement("td");
          const Contraseña = document.createElement("td");
          const FechaRegistro = document.createElement("td");
          const EstadoUsuario = document.createElement("td");
          const TipoUsuario = document.createElement("td");
          const btnActualizar = document.createElement("button");
          const btnEliminar = document.createElement("button");
          const txtEnum = document.createTextNode(i++)
          const txtNombreUsuario = document.createTextNode(u?.nombreUsuario)
          const txtContraseña = document.createTextNode(u?.contraseña)
          const txtFechaRegistro = document.createTextNode(u?.fechaRegistro)
          const txtEstadoUsuario = document.createTextNode(u?.estadoUsuario)
          const txtTipoUsuario = document.createTextNode(u?.tipoUsuario)
          const txtIdUsuario = document.createTextNode(u?.idUsuario)
          idUsuario.style.display = "none";
          btnActualizar.style.border = "none"
          btnActualizar.style.color = "green"
          btnActualizar.style.alignContent = "center"
          btnActualizar.style.marginTop = "5px"
          btnActualizar.style.marginBottom = "5px"
          btnActualizar.style.marginRight = "5px"
          btnActualizar.innerHTML = `<i class="fa-solid fa-pencil fa-lg"></i>`
          btnEliminar.style.border = "none"
          btnEliminar.style.alignContent = "center"
          btnEliminar.style.color = "red"
          btnEliminar.style.marginTop = "5px"
          btnEliminar.style.marginBottom = "5px"
          btnEliminar.innerHTML = `<i class="fa-solid fa-trash fa-lg"></i>`
  
          btnActualizar.onclick = function(){
            document.getElementById("btn-actualizar").style.display = "inline"
            document.getElementById("btn-pagar").style.display = "none"
            ID =  txtIdUsuario.nodeValue;
            document.getElementById("mesesFacturacion").value = mes
          };
  
          btnEliminar.onclick = function(){
            let text;
            if (confirm("Seguro que desesa eliminar el usuario?") == true) {
              ID =  txtIdUsuario.nodeValue;
              eliminarUsuario(ID);
              vaciarTabla();
              llenarTabla();
            } else {
              text = "You canceled!";
            }
          };
  
          Enumeracion.appendChild(txtEnum)
          NombreUsuario.appendChild(txtNombreUsuario)
          Contraseña.appendChild(txtContraseña)
          FechaRegistro.appendChild(txtFechaRegistro)
          EstadoUsuario.appendChild(txtEstadoUsuario)
          TipoUsuario.appendChild(txtTipoUsuario)
          idUsuario.appendChild(txtIdUsuario)
          hilera.appendChild(Enumeracion)
          hilera.appendChild(NombreUsuario)
          hilera.appendChild(Contraseña)
          hilera.appendChild(FechaRegistro)
          hilera.appendChild(EstadoUsuario)
          hilera.appendChild(TipoUsuario)
          hilera.appendChild(idUsuario)
          hilera.appendChild(btnEliminar)
          idTabla.appendChild(hilera)
        })
      }
    );
  }
  llenarTabla();

  document.getElementById("btnIrCrearUsuarios").addEventListener("click", async (e) => {
    window.location = "usuariosLog.html"
  })
  
  document.getElementById("btnIrListadoUsuarios").addEventListener("click", async (e) => {
    window.location = "listadousuarios.html"
  })