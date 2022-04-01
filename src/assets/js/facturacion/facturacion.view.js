// Importando e instanciando la clase de Abonados del modelo de datos.
import Facturacion from "../../../dao/facturacion/facturacion.model.js";
const facturacionModel = new Facturacion();
let ID = "";
let idContrato = "";
let mes = 0;
let identidad = "";

//facturacionModel.actualizarFacturacion

// Ejecuta la funcion para agregar todos los meses del año
//const meses = await facturacionModel.mesCreate();

const insertar = async () => {
  let fechaActual
  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  if(month < 10){
    fechaActual = `${year}-0${month}-${day}`
  }else{
    fechaActual = `${year}-0${month}-${day}`
  }

  const uuidGenerado = await facturacionModel.generarUuid();
  const mesSeleccionado = document.getElementById("mesesFacturacion").value;
  await facturacionModel.nuevaFacturacion(
    uuidGenerado,
    fechaActual,
    800,
    idContrato,
    mesSeleccionado,
    1,
    (resultado) => {
      if (resultado.rowsAffected) {
        alert("Se realizo el pago");
      }
    }
  );
};
    
const actualizar = async (idPago,idCon) => {
  const uuidGenerado = idPago;
  const idContrato = idCon;
  const mesSeleccionado = document.getElementById("mesesFacturacion").value;
  console.log(mesSeleccionado)
  console.log(uuidGenerado)
  await facturacionModel.actualizarFacturacion(
    uuidGenerado,
    800,
    idContrato,
    mesSeleccionado,
    2,
    (resultado) => {
      if (resultado.rowsAffected) {
        alert("Se actualizo el pago");
      }
    }
  );
};


const eliminar = async (idPago) => {
  const uuidGenerado = idPago;
  await facturacionModel.eliminarFacturacion(
    uuidGenerado,
    (resultado) => {
      if (resultado.rowsAffected) {
        alert("Se elimino el pago");
      }
    }
  );
};

const select = document.getElementById("mesesFacturacion");
facturacionModel.obtenerMeses((nombreMeses) =>{
  let i = 1;
  nombreMeses.map((mes) => {
    const option = document.createElement("option");
    option.value = i++;
    option.text = mes?.nombreMes;
    select.appendChild(option);
  });
});

document.getElementById("btn-buscar").addEventListener("click", async (e) => {
  identidad = document.getElementById("buscador").value
  vaciarTablaContratos()
  llenarTablaAbonadosPorNombre(identidad);
});

document.getElementById("buscador").addEventListener("keyup", async (e) => {
  identidad = document.getElementById("buscador").value
  vaciarTablaContratos()
  llenarTablaAbonadosPorNombre(identidad);
});

document.getElementById("btn-actualizar").addEventListener("click", async (e) => {
  let modificar = null;
  e.preventDefault();
  e.stopPropagation();
  modificar = await actualizar(ID,idContrato);
  vaciarTabla();
  llenarTabla();
  document.getElementById("btn-actualizar").style.display = "none"
  document.getElementById("btn-pagar").style.display = "inline"
  document.getElementById("mesesFacturacion").value = 1
});

document.getElementById("btn-pagar").addEventListener("click", async (e) => {
  let facturado = null;
  e.preventDefault();
  e.stopPropagation();
  facturado = await insertar();
  vaciarTabla();
  llenarTabla();
  document.getElementById("mesesFacturacion").value = 1
});

document.getElementById("btn-irReporte").addEventListener("click", async (e) => {
  window.location = "reportesFacturacion.html"
})

document.getElementById("btn-cancelar").addEventListener("click", async (e) => {
  document.getElementById("btn-actualizar").style.display = "none"
  document.getElementById("btn-cancelar").style.display = "none"
  document.getElementById("btn-pagar").style.display = "inline"
  document.getElementById("mesesFacturacion").value = 1
});

const vaciarTabla = () =>{
  const idTabla = document.getElementById("tb-mesesPagados");
  while (idTabla.firstChild) {
    idTabla.removeChild(idTabla.firstChild);
  }
}

const vaciarTablaContratos = () =>{
  const idTabla = document.getElementById("tb-contratos");
  while (idTabla.firstChild) {
    idTabla.removeChild(idTabla.firstChild);
  }
}

const llenarTabla = () =>{
  const idTabla = document.getElementById("tb-mesesPagados");
  facturacionModel.mesesPagados(idContrato,(mesPagado) => {
    let i = 1;
      mesPagado.map((mp) => {
        const hilera = document.createElement("tr");
        const idFacturacion = document.createElement("td");
        const idMes = document.createElement("td");
        const Enumeracion = document.createElement("td");
        const NombreMes = document.createElement("td");
        const ValorMes = document.createElement("td");
        const FechaPago = document.createElement("td");
        const btnActualizar = document.createElement("button");
        const btnEliminar = document.createElement("button");
        const txtEnum = document.createTextNode(i++)
        const txtNomMes = document.createTextNode(mp?.nombreMes)
        const txtValor = document.createTextNode(`${mp?.valor} L`)
        const txtFechaPago = document.createTextNode(mp?.fechaPago)
        const txtidFacturacion = document.createTextNode(mp?.idControlPago)
        const txtidMes = document.createTextNode(mp?.idMes)
        idFacturacion.style.display = "none";
        idMes.style.display = "none";
        btnActualizar.style.border = "none"
        btnActualizar.style.color = "green"
        btnActualizar.style.alignContent = "center"
        btnActualizar.style.marginRight = "5px"
        btnActualizar.innerHTML = `<i class="fa-solid fa-pencil fa-lg"></i>`
        btnEliminar.style.border = "none"
        btnEliminar.style.alignContent = "center"
        btnEliminar.style.color = "red"
        btnEliminar.innerHTML = `<i class="fa-solid fa-trash fa-lg"></i>`

        btnActualizar.onclick = function(){
          document.getElementById("btn-actualizar").style.display = "inline"
          document.getElementById("btn-cancelar").style.display = "inline"
          document.getElementById("btn-pagar").style.display = "none"
          ID =  txtidFacturacion.nodeValue;
          mes = txtidMes.nodeValue;
          document.getElementById("mesesFacturacion").value = mes
        };

        btnEliminar.onclick = function(){
          let text;
          if (confirm("Seguro que desesa eliminar el pago?") == true) {
            ID =  txtidFacturacion.nodeValue;
            eliminar(ID);
            vaciarTabla();
            llenarTabla();
            document.getElementById("btn-actualizar").style.display = "none"
            document.getElementById("btn-cancelar").style.display = "none"
            document.getElementById("btn-pagar").style.display = "inline"
            document.getElementById("mesesFacturacion").value = 1
          } else {
            text = "You canceled!";
          }
        };

        Enumeracion.appendChild(txtEnum)
        NombreMes.appendChild(txtNomMes)
        ValorMes.appendChild(txtValor)
        FechaPago.appendChild(txtFechaPago)
        idFacturacion.appendChild(txtidFacturacion)
        idMes.appendChild(txtidMes)
        hilera.appendChild(Enumeracion)
        hilera.appendChild(NombreMes)
        hilera.appendChild(ValorMes)
        hilera.appendChild(FechaPago)
        hilera.appendChild(idFacturacion)
        hilera.appendChild(idMes)
        hilera.appendChild(btnActualizar)
        hilera.appendChild(btnEliminar)
        idTabla.appendChild(hilera)
      })
    }
  );
}
llenarTabla();

const llenarTablaAbonados = () =>{
  const idTabla = document.getElementById("tb-contratos");
  facturacionModel.verContratosFactura((contrato) => {
    let i = 1;
      contrato.map((c) => {
        const hilera = document.createElement("tr");
        const Enumeracion = document.createElement("td");
        const identidad = document.createElement("td");
        const nombres = document.createElement("td");
        const apellidos = document.createElement("td");
        const tipoContrato = document.createElement("td");
        const btnSelect = document.createElement("button");
        const txtEnum = document.createTextNode(i++)
        const txtIdContrato = document.createTextNode(c?.idContrato)
        const txtIdentidad = document.createTextNode(c?.identidad)
        const txtNombre = document.createTextNode(c?.nombres)
        const txtApellido = document.createTextNode(c?.apellidos)
        const txtTipoContrato = document.createTextNode(c?.tipoContrato)
        const txtEtapa = document.createTextNode(c?.nombreEtapa)
        const txtBloque = document.createTextNode(c?.numBloque)
        btnSelect.style.border = "none"
        btnSelect.style.alignContent = "center"
        btnSelect.style.color = "green"
        btnSelect.innerHTML = `<i class="fa-solid fa-dollar-sign fa-xl"></i>`

        btnSelect.onclick = function(){
          document.getElementById("btn-actualizar").style.display = "none"
          document.getElementById("btn-cancelar").style.display = "none"
          document.getElementById("btn-pagar").style.display = "inline"
          document.getElementById("mesesFacturacion").value = 1
          idContrato =  txtIdContrato.nodeValue;
          vaciarTabla();
          llenarTabla();
          document.getElementById("nombreAbonado").value = `${txtNombre.nodeValue} ${txtApellido.nodeValue}`;
          document.getElementById("bloque").value = txtBloque.nodeValue;
          document.getElementById("etapa").value = txtEtapa.nodeValue;
        };

        Enumeracion.appendChild(txtEnum)
        identidad.appendChild(txtIdentidad)
        nombres.appendChild(txtNombre)
        apellidos.appendChild(txtApellido)
        tipoContrato.appendChild(txtTipoContrato)
        
        hilera.appendChild(Enumeracion)
        hilera.appendChild(identidad)
        hilera.appendChild(nombres)
        hilera.appendChild(apellidos)
        hilera.appendChild(tipoContrato)
        hilera.appendChild(btnSelect)
        idTabla.appendChild(hilera)
      })
    }
  );
}

llenarTablaAbonados();

const llenarTablaAbonadosPorNombre = () =>{
  const idTabla = document.getElementById("tb-contratos");
  facturacionModel.verContratosFacturaAvanzado(identidad,(contrato) => {
    let i = 1;
      contrato.map((c) => {
        const hilera = document.createElement("tr");
        const Enumeracion = document.createElement("td");
        const identidad = document.createElement("td");
        const nombres = document.createElement("td");
        const apellidos = document.createElement("td");
        const tipoContrato = document.createElement("td");
        const btnSelect = document.createElement("button");
        const txtEnum = document.createTextNode(i++)
        const txtIdContrato = document.createTextNode(c?.idContrato)
        const txtIdentidad = document.createTextNode(c?.identidad)
        const txtNombre = document.createTextNode(c?.nombres)
        const txtApellido = document.createTextNode(c?.apellidos)
        const txtTipoContrato = document.createTextNode(c?.tipoContrato)
        const txtEtapa = document.createTextNode(c?.nombreEtapa)
        const txtBloque = document.createTextNode(c?.numBloque)
        btnSelect.style.border = "none"
        btnSelect.style.alignContent = "center"
        btnSelect.style.color = "green"
        btnSelect.style.marginTop = "5px"
        btnSelect.style.marginBottom = "5px"
        btnSelect.style.marginRight = "5px"
        btnSelect.innerHTML = `<i class="fa-solid fa-pencil fa-lg"></i>`

        btnSelect.onclick = function(){
          idContrato =  txtIdContrato.nodeValue;
          vaciarTabla();
          llenarTabla();
          document.getElementById("nombreAbonado").value = `${txtNombre.nodeValue} ${txtApellido.nodeValue}`;
          document.getElementById("bloque").value = txtBloque.nodeValue;
          document.getElementById("etapa").value = txtEtapa.nodeValue;
        };

        Enumeracion.appendChild(txtEnum)
        identidad.appendChild(txtIdentidad)
        nombres.appendChild(txtNombre)
        apellidos.appendChild(txtApellido)
        tipoContrato.appendChild(txtTipoContrato)
        
        hilera.appendChild(Enumeracion)
        hilera.appendChild(identidad)
        hilera.appendChild(nombres)
        hilera.appendChild(apellidos)
        hilera.appendChild(tipoContrato)
        hilera.appendChild(btnSelect)
        idTabla.appendChild(hilera)
      })
    }
  );
}
