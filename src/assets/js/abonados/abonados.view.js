// Importando e instanciando la clase de Abonados del modelo de datos.
import Abonados from "../../../dao/abonados/abonados.model.js";
import Contrato from "../../../dao/contrato/contrato.model.js";
const abonadoModel = new Abonados();
const contratoModel = new Contrato();

/**
 * Método para obtener la edad en años de un abonado
 * @param {string} fecha Fecha de nacimiento del abonado
 * @returns number: Edad en años
 */
const calcularEdad = (fecha) => {
  const fechaNacAbonado = new Date(fecha);
  const hoy = new Date();
  const edad = parseInt(hoy.getFullYear() - fechaNacAbonado.getFullYear());
  return edad;
};

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

/**
 * Función para pasar a la primera pestaña de insertar abonado
 */
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

/**
 * Función para ver el la vista de ver.
 */
const cambiartTabListadoAVer = () => {
  const tabInsertar = document.getElementById("pill-insertar");
  const titleInsertar = document.getElementById("tab-insertar");
  const sideBarInsertar = document.getElementById("crear-abonado-sidebar-tab");

  const tabVer = document.getElementById("pills-ver");
  const titleTabVer = document.getElementById("tab-ver-abonado");
  const sidebarVer = document.getElementById("ver-abonado-sidebar-tab");

  const tabListado = document.getElementById("pills-listado");
  const titleTabListado = document.getElementById("tab-listado");
  const sideBarListado = document.getElementById(
    "listado-abonados-sidebar-tab"
  );

  titleInsertar.ariaSelected = false;
  titleInsertar.classList.remove("active");
  tabInsertar.classList.remove("active", "show");
  sideBarInsertar.classList.remove("active", "fw-bold");

  titleTabListado.ariaSelected = false;
  titleTabListado.classList.remove("active");
  tabListado.classList.remove("active", "show");
  sideBarListado.classList.remove("active", "fw-bold");

  titleTabVer.ariaSelected = true;
  titleTabVer.classList.add("active");
  tabVer.classList.add("active", "show");
  sidebarVer.classList.add("active", "fw-bold");
};

/**
 * Función para pasar a la vista de insertar
 */
const cambiarInsertarVista = () => {
  const tabInsertar = document.getElementById("pill-insertar");
  const titleInsertar = document.getElementById("tab-insertar");
  const sideBarInsertar = document.getElementById("crear-abonado-sidebar-tab");

  const tabVer = document.getElementById("pills-ver");
  const titleTabVer = document.getElementById("tab-ver-abonado");
  const sideBarListado = document.getElementById(
    "listado-abonados-sidebar-tab"
  );

  const tabListado = document.getElementById("pills-listado");
  const titleTabListado = document.getElementById("tab-listado");
  const sidebarVer = document.getElementById("ver-abonado-sidebar-tab");

  titleInsertar.ariaSelected = true;
  titleInsertar.classList.add("active");
  tabInsertar.classList.add("active");
  tabInsertar.classList.add("show");
  sideBarInsertar.classList.add("active", "fw-bold");

  titleTabListado.ariaSelected = false;
  titleTabListado.classList.remove("active");
  tabListado.classList.remove("active");
  tabListado.classList.remove("show");
  sideBarListado.classList.remove("active", "fw-bold");

  titleTabVer.ariaSelected = false;
  titleTabVer.classList.remove("active");
  tabVer.classList.remove("active");
  tabVer.classList.remove("show");
  sidebarVer.classList.remove("active", "fw-bold");
};

/**
 * Función para pasar a la vista de listado de abonados
 */
const cambiarListadoVista = () => {
  const tabInsertar = document.getElementById("pill-insertar");
  const titleInsertar = document.getElementById("tab-insertar");
  const sideBarInsertar = document.getElementById("crear-abonado-sidebar-tab");

  const tabVer = document.getElementById("pills-ver");
  const titleTabVer = document.getElementById("tab-ver-abonado");
  const sidebarVer = document.getElementById("ver-abonado-sidebar-tab");

  const tabListado = document.getElementById("pills-listado");
  const titleTabListado = document.getElementById("tab-listado");
  const sideBarListado = document.getElementById(
    "listado-abonados-sidebar-tab"
  );

  titleInsertar.ariaSelected = false;
  titleInsertar.classList.remove("active");
  tabInsertar.classList.remove("active", "show");
  sideBarInsertar.classList.remove("active", "fw-bold");

  titleTabListado.ariaSelected = true;
  titleTabListado.classList.add("active");
  tabListado.classList.add("active", "show");
  sideBarListado.classList.add("active", "fw-bold");

  titleTabVer.ariaSelected = false;
  titleTabVer.classList.remove("active");
  tabVer.classList.remove("active", "show");
  sidebarVer.classList.remove("active", "fw-bold");
};

const moverDatosParaSerEditados = (idAbonado) => {
  const identidad = document.getElementById("txtIdentidad");
  const nombres = document.getElementById("txtNombres");
  const apellidos = document.getElementById("txtApellidos");
  const fechaNac = document.getElementById("txtFechaNac");
  const txtSexo1 = document.getElementById("txtSexo1");
  const txtSexo2 = document.getElementById("txtSexo2");
  const direccion = document.getElementById("txtDireccion");
  const telefono = document.getElementById("txtTelefono");
  const correo = document.getElementById("txtCorreo");
  const vistaAbonado = document.getElementById("vistaAbonado");
  abonadoModel.obtenerAbonadoPorId(idAbonado, (infoAbonado) => {
    infoAbonado.map((abonado) => {
      identidad.value = abonado?.identidad;
      nombres.value = abonado?.nombres;
      apellidos.value = abonado?.apellidos;
      fechaNac.value = abonado?.fechaNacimiento;
      abonado?.idSexo === 1
        ? (txtSexo1.checked = true)
        : (txtSexo2.checked = true);
      direccion.value = abonado?.direccion;
      telefono.value = abonado?.telefono ? abonado?.telefono : "";
      correo.value = abonado?.correoElectronico
        ? abonado?.correoElectronico
        : "";
    });
  });
  vistaAbonado.dataset.editando = true;
  vistaAbonado.dataset.idAbonado = idAbonado;
  cambiarInsertarVista();
};

/**
 * Método para guardar un abonado.
 */
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
        location.reload();
        alert("Se guardó el abonado");
      }
      console.log("resultado de vista", resultado);
    }
  );
};

/**
 * Método para modificar un abonado de la base de datos.
 * @param {string} idAbonado Identificador del abonado en la base de datos;
 */
const editarAbonado = async (idAbonado) => {
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
  await abonadoModel.actualizarAbonado(
    idAbonado,
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
        alert("Se modificó el abonado");
        cargarListadoVista();
        cambiarListadoVista();
      }
    }
  );
};

/**
 * Método propio de la vista para eliminar un abonado.
 * @param {string} idAbonado Identificador del abonado a eliminar
 */
const eliminarAbonado = async (idAbonado) => {
  await abonadoModel.eliminarAbonado(idAbonado, (resultado) => {
    if (resultado?.rowsAffected) {
      alert("El abonado fue eliminado");
      cargarListadoVista();
      cambiarListadoVista();
    } else
      alert("Error al eliminar el abonado. Por favor intentelo más tarde.");
  });
};

const limpiarModificacionAbonado = () => {
  document.getElementById("vistaAbonado").dataset.editando = "false";
  document.getElementById("vistaAbonado").dataset.idAbonado = "";
};

/**
 * Método para ver abonado con sus respectivos contratos.
 * @param {string} id Identificador del abonado del cual se quiere ver su información
 */
const verAbonadoConContratos = (id) => {
  cambiartTabListadoAVer();
  document.getElementById("txtVerUnAbonado") &&
    abonadoModel.obtenerAbonadoPorId(id, (abonado) => {
      abonado.map((abo, i, abos) => {
        document.getElementById(
          "abonadoName"
        ).innerText = `${abo?.nombres} ${abo?.apellidos}`;
        document.getElementById("txtNumeroIdentidad").innerText =
          abo?.identidad;
        document.getElementById("txtEdadAbonado").innerText = ` (${calcularEdad(
          abo?.fechaNacimiento
        )} años)`;
        document.getElementById("userImage").src =
          abo?.idSexo === 1
            ? `../../assets/img/male-student.png`
            : `../../assets/img/woman.png`;
        document.getElementById("txtAbonadoTelefono").innerText = abo?.telefono;
        document.getElementById("txtAbonadoCorreo").innerText =
          abo?.correoElectronico;
        document.getElementById("btnModificarAbonado").dataset.id =
          abo?.idAbonado;
      });
    });
};

/**
 * Método para generar el listado de abonados
 * @param {string} nombre Nombre del abonado
 * @param {string} identidad Identidad del abonado
 * @param {string} fechaAdd Fecha en que el abonado fue agreagado
 * @param {string} id Identificador del abonado
 * @param {number} numAbonado Numero del abonado en la lista
 * @param {number} cantidadAbonados Cantidad de abonados en la busqueda
 */
const generarListadoAbonados = (
  nombre,
  identidad,
  fechaAdd,
  id,
  numAbonado,
  cantidadAbonados = 0
) => {
  try {
    const itemsAbonados = document.createElement("div");
    const abonadoListadoNombreContainer = document.createElement("div");
    const abonadoListadoNombreInfo = document.createElement("div");
    const nombreAbonadoListado = document.createElement("h4");
    const identidadAbonadoListado = document.createElement("span");

    const abonadoListadoFecha = document.createElement("div");
    const iconoCalendario = document.createElement("i");
    const fechaSpan = document.createElement("span");

    const abonadoListadoInfo = document.createElement("div");
    const abonadoButtonVerAbonado = document.createElement("a");
    const abonadoButtonVerAbonadoTitle = document.createElement("span");
    const flechaDerecha = document.createElement("i");

    itemsAbonados.classList.add("items-abonados");
    abonadoListadoNombreContainer.classList.add(
      "abonado-listado-nombre-container"
    );
    abonadoListadoNombreInfo.classList.add("abonado-listado-nombre-info");

    abonadoListadoFecha.classList.add("abonado-listado-fecha", "text-muted");
    iconoCalendario.classList.add(
      "fa-solid",
      "fa-calendar",
      "icono-calendario"
    );

    abonadoListadoInfo.classList.add("abonado-listado-info");
    abonadoButtonVerAbonado.classList.add(
      "abonado-button-ver-abonado",
      "btn",
      "btn-primary"
    );
    abonadoButtonVerAbonadoTitle.classList.add(
      "abonado-button-ver-abonado-title"
    );
    flechaDerecha.classList.add("fa-solid", "fa-arrow-right");

    nombreAbonadoListado.innerText = `${numAbonado} ${nombre}`;
    identidadAbonadoListado.innerText = identidad;
    fechaSpan.innerText = fechaAdd;

    abonadoButtonVerAbonado.href = "#";
    abonadoButtonVerAbonado.dataset.tipo = "VER_CONTRATO";
    abonadoButtonVerAbonado.dataset.id = id;
    abonadoButtonVerAbonadoTitle.innerText = "Ver contratos";
    abonadoButtonVerAbonadoTitle.dataset.tipo = "VER_CONTRATO";
    abonadoButtonVerAbonadoTitle.dataset.id = id;
    flechaDerecha.dataset.tipo = "VER_CONTRATO";
    flechaDerecha.dataset.id = id;

    abonadoListadoNombreInfo.appendChild(nombreAbonadoListado);
    abonadoListadoNombreInfo.appendChild(identidadAbonadoListado);

    abonadoListadoFecha.appendChild(iconoCalendario);
    abonadoListadoFecha.appendChild(fechaSpan);

    abonadoListadoNombreContainer.appendChild(abonadoListadoNombreInfo);
    abonadoListadoNombreContainer.appendChild(abonadoListadoFecha);

    abonadoButtonVerAbonado.appendChild(abonadoButtonVerAbonadoTitle);
    abonadoButtonVerAbonado.appendChild(flechaDerecha);
    abonadoListadoInfo.appendChild(abonadoButtonVerAbonado);

    itemsAbonados.appendChild(abonadoListadoNombreContainer);
    itemsAbonados.appendChild(abonadoListadoInfo);

    document.getElementById(
      "totalBusqueda"
    ).innerText = `${cantidadAbonados} Abonados`;

    document.getElementById("itemAbonadoLista") &&
      document.getElementById("itemAbonadoLista").appendChild(itemsAbonados);
  } catch (e) {
    console.error(e);
  }
};

const cargarListadoVista = () => {
  document.getElementById("itemAbonadoLista").innerHTML = "";
  abonadoModel.obtenerTodoAbonados((abonados) => {
    abonados.map((abonado, i, arregloAbonados) => {
      generarListadoAbonados(
        `${abonado?.nombres} ${abonado?.apellidos}`,
        abonado?.identidad,
        abonado?.timestamp,
        abonado?.idAbonado,
        i + 1,
        arregloAbonados.length
      );
    });
  }, "nombres");
};

const busquedaAbonadoPorNombre = (nombre) => {
  document.getElementById("itemAbonadoLista").innerHTML = "";
  abonadoModel.buscarAbonadoPorNombre(nombre, (resultados) => {
    resultados.length !== 0
      ? resultados.map((abonado, i, arregloAbonados) => {
          generarListadoAbonados(
            `${abonado?.nombres} ${abonado?.apellidos}`,
            abonado?.identidad,
            abonado?.timestamp,
            abonado?.idAbonado,
            i + 1,
            arregloAbonados.length
          );
        })
      : (document.getElementById("totalBusqueda").innerText =
          "No hay resultados");
  });
};

document.getElementById("txtBusquedaAbonado") &&
  document
    .getElementById("txtBusquedaAbonado")
    .addEventListener("keyup", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.target.value.trim() === ""
        ? cargarListadoVista()
        : busquedaAbonadoPorNombre(e.target.value.trim());
    });

document.getElementById("ver-abonado-sidebar-tab") &&
  document
    .getElementById("ver-abonado-sidebar-tab")
    .addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      cambiartTabListadoAVer();
    });

document.getElementById("crear-abonado-sidebar-tab") &&
  document
    .getElementById("crear-abonado-sidebar-tab")
    .addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      cambiarInsertarVista();
    });

/**
 * Listener del evento cuando damos click en el botón "Eliminar abonado"
 */
document.getElementById("btnEliminarAbonado") &&
  document
    .getElementById("btnEliminarAbonado")
    .addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        confirm("¿Desea eliminar el abonado? Esta acción no se podrá revertir.")
      )
        eliminarAbonado(
          document.getElementById("btnModificarAbonado").dataset?.id
        );
    });

document
  .getElementById("listado-abonados-sidebar-tab")
  .addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    cambiarListadoVista();
  });

document.addEventListener("click", (e) => {
  switch (e.target.dataset.tipo) {
    case "VER_CONTRATO":
      e.preventDefault();
      e.stopPropagation();
      verAbonadoConContratos(e.target.dataset.id);
      break;
  }
});

/**
 * Listener del evento click en el botón de "Modificar Abonado".
 */
document.getElementById("btnModificarAbonado") &&
  document
    .getElementById("btnModificarAbonado")
    .addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      moverDatosParaSerEditados(
        e.target.dataset.id
          ? e.target.dataset.id
          : document.getElementById("btnModificarAbonado").dataset.id
      );
    });

/**
 * Listener para mostrar el listado de los abonados.
 */
document.getElementById("listadosAbonados") && cargarListadoVista();

/**
 * Listener del evento cuando damos click en el botón "Siguiente" de la vista Insertar Abonado
 */
document.getElementById("btn-siguiente") &&
  document.getElementById("btn-siguiente").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    cambiarTab(e);
  });

/**
 * Listener del evento de dar click al guardar el abonado.
 * Bien para guardar uno nuevo o para guardar un abonado editado.
 */
document.getElementById("btn-guardar-info") &&
  document
    .getElementById("btn-guardar-info")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        document.getElementById("vistaAbonado").dataset?.editando === "true"
      ) {
        editarAbonado(
          document.getElementById("vistaAbonado").dataset?.idAbonado
        );
        limpiarModificacionAbonado();
      } else await guardarAbonado();
    });

document.getElementById("txtIdentidad") &&
  document.getElementById("txtIdentidad").addEventListener("keyup", (e) => {
    // const regex = /(\d{4})(\d{4})/g;
    const regex = /(\d{4})[-]?(\d{4})[-]?(\d{5})/g;
    e.target.value = e.target.value.replace(regex, (match, p1, p2, p3) => {
      return `${p1}-${p2}-${p3}`;
    });
  });

document.getElementById("txtTelefono") &&
  document.getElementById("txtTelefono").addEventListener("keyup", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const regex = /(\d{4})[-]?(\d{4})/g;
    e.target.value = e.target.value.replace(
      regex,
      (match, p1, p2) => `${p1}-${p2}`
    );
  });

document.getElementById("headerButtonSidebar") &&
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
