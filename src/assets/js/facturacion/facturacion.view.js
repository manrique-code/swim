// Importando e instanciando la clase de Abonados del modelo de datos.
import Facturacion from "../../../dao/facturacion/facturacion.model.js";
const facturacionModel = new Facturacion();
let ID = "";
let mes = 0;

facturacionModel.actualizarFacturacion

// Ejecuta la funcion para agregar todos los meses del año
// const meses = await facturacionModel.mesCreate();

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

  console.log(fechaActual)
  const uuidGenerado = await facturacionModel.generarUuid();
  const mesSeleccionado = document.getElementById("mesesFacturacion").value;
  await facturacionModel.nuevaFacturacion(
    uuidGenerado,
    fechaActual ="2023-01-5",
    800,
    5,
    mesSeleccionado,
    1,
    (resultado) => {
      if (resultado.rowsAffected) {
        alert("Se realizo el pago");
      }
    }
  );
};
    
const actualizar = async (idPago) => {
  const uuidGenerado = idPago;
  const mesSeleccionado = document.getElementById("mesesFacturacion").value;
  console.log(mesSeleccionado)
  console.log(uuidGenerado)
  await facturacionModel.actualizarFacturacion(
    uuidGenerado,
    800,
    5,
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

document.getElementById("btn-guardar").addEventListener("click", async (e) => {
  vaciarTabla();
  llenarTabla()
});

document.getElementById("btn-actualizar").addEventListener("click", async (e) => {
  let modificar = null;
  e.preventDefault();
  e.stopPropagation();
  modificar = await actualizar(ID);
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

const vaciarTabla = () =>{
  const idTabla = document.getElementById("tb-mesesPagados");
  while (idTabla.firstChild) {
    idTabla.removeChild(idTabla.firstChild);
  }
}

const llenarTabla = () =>{
  const idTabla = document.getElementById("tb-mesesPagados");
  facturacionModel.mesesPagados(5,(mesPagado) => {
    let i = 1;
      mesPagado.map((mp) => {
        const hilera = document.createElement("tr");
        const idFacturacion = document.createElement("td");
        const idMes = document.createElement("td");
        const Enumeracion = document.createElement("td");
        const NombreMes = document.createElement("td");
        const FechaPago = document.createElement("td");
        const btnActualizar = document.createElement("button");
        const btnEliminar = document.createElement("button");
        const txtEnum = document.createTextNode(i++)
        const txtNomMes = document.createTextNode(mp?.nombreMes)
        const txtFechaPago = document.createTextNode(mp?.fechaPago)
        const txtidFacturacion = document.createTextNode(mp?.idControlPago)
        const txtidMes = document.createTextNode(mp?.idMes)
        idFacturacion.style.display = "none";
        idMes.style.display = "none";
        btnActualizar.style.backgroundColor = "green"
        btnActualizar.style.alignContent = "center"
        btnActualizar.style.marginTop = "5px"
        btnActualizar.style.marginBottom = "5px"
        btnActualizar.style.marginRight = "5px"
        btnActualizar.innerHTML = `<i class="fa-solid fa-pencil fa-lg"></i>`
        btnEliminar.style.alignContent = "center"
        btnEliminar.style.backgroundColor = "red"
        btnEliminar.style.marginTop = "5px"
        btnEliminar.style.marginBottom = "5px"
        btnEliminar.innerHTML = `<i class="fa-solid fa-trash fa-lg"></i>`

        btnActualizar.onclick = function(){
          document.getElementById("btn-actualizar").style.display = "inline"
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
          } else {
            text = "You canceled!";
          }
        };

        Enumeracion.appendChild(txtEnum)
        NombreMes.appendChild(txtNomMes)
        FechaPago.appendChild(txtFechaPago)
        idFacturacion.appendChild(txtidFacturacion)
        idMes.appendChild(txtidMes)
        hilera.appendChild(Enumeracion)
        hilera.appendChild(NombreMes)
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

