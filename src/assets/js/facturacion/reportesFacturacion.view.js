import Facturacion from "../../../dao/facturacion/facturacion.model.js";
const facturacionModel = new Facturacion();
import Contratos from "../../../dao/contrato/contrato.model.js";
const contratoModel = new Contratos();

document.getElementById("btn-reporte").addEventListener("click", (e) => {
  let tReportes = document.getElementById("tabla-reporte")
  let libro = XLSX.utils.table_to_book(tReportes)
  let ws = libro.Sheets["Sheet1"];
  XLSX.utils.sheet_add_aoa(ws, [["Creado "+new Date().toISOString()]], {origin:-1});
  XLSX.writeFile(libro, "ReporteFacturacion.xlsx");
});

const inserEstados = (arr) =>{
  var scriptStatus = `<option>Seleccionar</option>`
  arr.map((data,i)=>{
      contratoModel.crearStados(i,data);
      scriptStatus +=`<option value=${i}>${data}</option>`
  })
  document.getElementById("selectEstadoReporte").innerHTML=scriptStatus;
}
inserEstados(["Activo","Inactivo","Suspendido"]);

const inserTipos = (arr) =>{
  var scriptStatus = `<option>Seleccionar</option>`
  arr.map((data,i)=>{
      contratoModel.crearTipos(i,data);
      scriptStatus +=`<option value=${i}>${data}</option>`
  })
  document.getElementById("optTipoContrato").innerHTML =scriptStatus;
}
inserTipos(["Pila","Cisterna","Aereo"])

document.getElementById("btn-irReporte").addEventListener("click", async (e) => {
  window.location = "facturacion.html"
})

const mostrarIdentidad= () =>{
  document.getElementById("txtReportId").style.display = "block"
  document.getElementById("txtReportNombre").style.display = "none"
  document.getElementById("selectEstadoReporte").style.display = "none"
  document.getElementById("optTipoContrato").style.display = "none"
}
const mostrarNombre= () =>{
  document.getElementById("txtReportId").style.display = "none"
  document.getElementById("txtReportNombre").style.display = "block"
  document.getElementById("selectEstadoReporte").style.display = "none"
  document.getElementById("optTipoContrato").style.display = "none"
}
const mostrarEstado= () =>{
  document.getElementById("txtReportId").style.display = "none"
  document.getElementById("txtReportNombre").style.display = "none"
  document.getElementById("selectEstadoReporte").style.display = "block"
  document.getElementById("optTipoContrato").style.display = "none"
}
const mostrarTipo= () =>{
  document.getElementById("txtReportId").style.display = "none"
  document.getElementById("txtReportNombre").style.display = "none"
  document.getElementById("selectEstadoReporte").style.display = "none"
  document.getElementById("optTipoContrato").style.display = "block"
}
const noMostrarFiltros = ()=>{
  document.getElementById("txtReportId").style.display = "none"
  document.getElementById("txtReportNombre").style.display = "none"
  document.getElementById("selectEstadoReporte").style.display = "none"
  document.getElementById("optTipoContrato").style.display = "none"
}

document.getElementById("tipoReporte").addEventListener("change",()=>{
  var valTipo = document.getElementById("tipoReporte").value;
  
  switch(valTipo){
    case "0" : noMostrarFiltros();
                vaciarTablaReportes()
                llenarTablaReportes()
      break;
    case "1" : mostrarIdentidad();
      break;
    case "2" : mostrarNombre();         
      break;
    case "3" : mostrarEstado();          
      break;
    case "4" : mostrarTipo();
      break
    default:mostrarIdentidad();
        llenarTablaReportes();
      break;
  }
})

const vaciarTablaReportes = () =>{
  const idTabla = document.getElementById("tb-reportes");
  while (idTabla.firstChild) {
    idTabla.removeChild(idTabla.firstChild);
  }
}

const llenarTablaReportes = (buscar,tipo) =>{
    const idTabla = document.getElementById("tb-reportes");
    facturacionModel.verFacturacion(buscar,tipo,(contrato) => {
      let i = 1;
        contrato.map((c) => {
          const hilera = document.createElement("tr");
          const Enumeracion = document.createElement("td");
          const identidad = document.createElement("td");
          const nombres = document.createElement("td");
          const apellidos = document.createElement("td");
          const mes = document.createElement("td");
          const valor = document.createElement("td");
          const fecha = document.createElement("td");
          const idContrato = document.createElement("td");
          const estado = document.createElement("td");
          const tipoContrato = document.createElement("td");
          const txtEnum = document.createTextNode(i++)
          const txtIdentidad = document.createTextNode(c?.identidad)
          const txtNombre = document.createTextNode(c?.nombres)
          const txtApellido = document.createTextNode(c?.apellidos)
          const txtMes = document.createTextNode(c?.nombreMes)
          const txtValor = document.createTextNode(c?.valor)
          const txtFecha = document.createTextNode(c?.fechaPago)
          const txtIdContrato = document.createTextNode(c?.idContrato)
          const txtEstado = document.createTextNode(c?.estadoContrato)
          const txtTipoContrato = document.createTextNode(c?.tipoContrato)
  
          Enumeracion.appendChild(txtEnum)
          identidad.appendChild(txtIdentidad)
          nombres.appendChild(txtNombre)
          apellidos.appendChild(txtApellido)
          mes.appendChild(txtMes)
          valor.appendChild(txtValor)
          fecha.appendChild(txtFecha)
          idContrato.appendChild(txtIdContrato)
          estado.appendChild(txtEstado)
          tipoContrato.appendChild(txtTipoContrato)
          
          hilera.appendChild(Enumeracion)
          hilera.appendChild(identidad)
          hilera.appendChild(nombres)
          hilera.appendChild(apellidos)
          hilera.appendChild(mes)
          hilera.appendChild(valor)
          hilera.appendChild(fecha)
          hilera.append(idContrato)
          hilera.appendChild(estado)
          hilera.appendChild(tipoContrato)
          idTabla.appendChild(hilera)
        })
      }
    );
  }
  
  llenarTablaReportes()

document.getElementById("txtReportId").addEventListener("keyup",(e)=>{
    let valS = document.getElementById("txtReportId").value;
    let valT = document.getElementById("tipoReporte").value;
    vaciarTablaReportes()
    llenarTablaReportes(valS,valT);
})
document.getElementById("txtReportNombre").addEventListener("keyup",(e)=>{
    let valS = document.getElementById("txtReportNombre").value
    let valT = document.getElementById("tipoReporte").value
    vaciarTablaReportes()
    llenarTablaReportes(valS,valT);
})
document.getElementById("selectEstadoReporte").addEventListener("change",(e)=>{
    let valS = document.getElementById("selectEstadoReporte").value
    let valT = document.getElementById("tipoReporte").value
    console.log(valS)
  console.log(valT)
    vaciarTablaReportes()
    llenarTablaReportes(valS,valT);
})

document.getElementById("optTipoContrato").addEventListener("change",(e)=>{
  let valS = document.getElementById("optTipoContrato").value
  let valT = document.getElementById("tipoReporte").value
  console.log(valS)
  console.log(valT)
  vaciarTablaReportes()
  llenarTablaReportes(valS,valT);
})

