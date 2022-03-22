// Importando e instanciando la clase de Abonados del modelo de datos.
import Abonados from "../../../dao/abonados/abonados.model.js";
const abonadoModel = new Abonados();

/**
 * Método para limpiar todos los campos del formulario.
 */
const limpiarFormulario = () => {
  document.getElementById("txtIdentidad").value = "";
  document.getElementById("txtNombres").value = "";
  document.getElementById("txtApellidos").value = "";
  document.getElementById("txtFechaNac").value = "";
  document.getElementById("txtSexo1").checked = false;
  document.getElementById("txtSexo2").checked = false;
  document.getElementById("txtDireccion").value = "";
  document.getElementById("txtTelefono").value = "";
  document.getElementById("txtCorreo").value = "";
};

const primeraTab = () => {
  const tabContacto = document.getElementById("pills-profile");
  const tabInfoPersonal = document.getElementById("pills-home");
  const titleTabPersonal = document.getElementById("tab-informacion");
  const titleTabContacto = document.getElementById("tab-contacto");
  titleTabPersonal.ariaSelected = true;
  titleTabPersonal.classList.add("active");
  titleTabContacto.ariaSelected = false;
  titleTabContacto.classList.remove("active");
  tabInfoPersonal.classList.add("active");
  tabInfoPersonal.classList.add("show");
  tabContacto.classList.remove("active");
  tabContacto.classList.remove("show");
};

/**
 * Método para cambiar de la ventana de información personal a información de contacto.
 * @param {Object} e Event de una acción.
 */
const cambiarTab = (e) => {
  const tabContacto = document.getElementById("pills-profile");
  const tabInfoPersonal = document.getElementById("pills-home");
  const titleTabPersonal = document.getElementById("tab-informacion");
  const titleTabContacto = document.getElementById("tab-contacto");
  titleTabPersonal.ariaSelected = false;
  titleTabPersonal.classList.remove("active");
  titleTabContacto.ariaSelected = true;
  titleTabContacto.classList.add("active");
  tabInfoPersonal.classList.remove("active");
  tabInfoPersonal.classList.remove("show");
  tabContacto.classList.add("active");
  tabContacto.classList.add("show");
};

const guardarAbonado = async () => {
  const uuidGenerado = await abonadoModel.generarUuid();
  const identidad = document.getElementById("txtIdentidad").value;
  const nombres = document.getElementById("txtNombres").value;
  const apellidos = document.getElementById("txtApellidos").value;
  const fechaNac = document.getElementById("txtFechaNac").value;
  const txtSexo1 = document.getElementById("txtSexo1");
  const txtSexo2 = document.getElementById("txtSexo2");
  const direccion = document.getElementById("txtDireccion").value;
  const telefono = document.getElementById("txtTelefono").value;
  const correo = document.getElementById("txtCorreo").value;
  const sexo = txtSexo1.checked ? txtSexo1.value : txtSexo2.value;
  await abonadoModel.nuevoAbonado(
    uuidGenerado,
    identidad,
    nombres,
    apellidos,
    direccion,
    fechaNac,
    sexo,
    telefono,
    correo,
    (resultado) => {
      if (resultado.rowsAffected) {
        limpiarFormulario();
        primeraTab();
        alert("Se guardó el abonado");
      }
    }
  );
};

document.getElementById("btn-siguiente").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  cambiarTab(e);
});

document
  .getElementById("btn-guardar-info")
  .addEventListener("click", async (e) => {
    let esAbonadoCreado = null;
    e.preventDefault();
    e.stopPropagation();
    esAbonadoCreado = await guardarAbonado();
  });

document.getElementById("txtIdentidad").addEventListener("keyup", (e) => {
  // const regex = /(\d{4})(\d{4})/g;
  const regex = /(\d{4})[-]?(\d{4})[-]?(\d{5})/g;
  e.target.value = e.target.value.replace(regex, (match, p1, p2, p3) => {
    return `${p1}-${p2}-${p3}`;
  });
});

document.getElementById("txtTelefono").addEventListener("keyup", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const regex = /(\d{4})[-]?(\d{4})/g;
  e.target.value = e.target.value.replace(
    regex,
    (match, p1, p2) => `${p1}-${p2}`
  );
});

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
