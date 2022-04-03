import Usuarios from "../../../dao/usuarios/usuarios.model.js";
const usuarioModel = new Usuarios();

const miStorage = window.localStorage;

const iniciarSesion = async ()=>{
    let nombreUsuario = document.getElementById("txtUsuario").value;
    let contraseña = document.getElementById("txtContraseña").value;
    
    if(nombreUsuario == ""){
        document.getElementById("txtUsuario").focus();
    }else if(contraseña == ""){
        document.getElementById("txtContraseña").focus();
    }else{
        usuarioModel.obtenerUsuarioPorNombre(nombreUsuario, (datos) =>{
            if(datos.length == 0){
                alert('Usuario o contraseña invalido.')
                document.getElementById("txtUsuario").value = "";
                document.getElementById("txtContraseña").value = "";
            }else{
                datos.map((d) =>{
                    if(d?.idEstadoUsuario == 2 ){
                        alert('El usuario está inactivo')
                        document.getElementById("txtUsuario").value = "";
                        document.getElementById("txtContraseña").value = "";
                    }else if(nombreUsuario == d?.nombreUsuario && contraseña == d?.contraseña){
                        if(d?.idTipoUsuario == 1){
                            miStorage.setItem('id', d?.idUsuario);
                            miStorage.setItem('usuario', d?.nombreUsuario);
                            miStorage.setItem('tipoUsuario', d?.idTipoUsuario)
                            window.location="../index.html";
                        }else{
                            miStorage.setItem('id', d?.idUsuario);
                            miStorage.setItem('usuario', d?.nombreUsuario);
                            miStorage.setItem('tipoUsuario', d?.idTipoUsuario)
                            window.location="../indexempleados.html";
                        }
                        
                        
                    }else{
                        alert('El usuario o la contraseña son incorrectos, verifique.')
                        document.getElementById("txtUsuario").value = "";
                        document.getElementById("txtContraseña").value = "";
                    }
                })
            }
        })
    }
}




document
  .getElementById("btnIngresar")
  .addEventListener("click", async (e) => {
    let ingresar;
    e.preventDefault();
    e.stopPropagation();
    ingresar = await iniciarSesion();
  });