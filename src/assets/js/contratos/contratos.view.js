// Importando e instanciando la clase de Abonados del modelo de datos.
import Contratos from "../../../dao/contrato/contrato.model.js";
const contratoModel = new Contratos();

var bloques = document.getElementById("optBloque")
var data = ["BQ1","BQ2","BQ3","BQ4","BQ5","BQ6"]

var script = data.map((dato,i,array)=>{
    return(`<option value="${i+1}">${dato}</option>`)
})
bloques.innerHTML = script

bloques.addEventListener("change", ()=>{
    console.log(`change to: `,bloques.value)
});




//LLENAR UNA TABLA 
const llenarTabla = ()=>{
    var dataContratos = contratoModel.verContratos((datos)=>{
        var script2=""
        console.log(datos)
        datos.map((dato,i,array)=>{
            var idContrato = i+1;
            var numCasa = dato.numCasa;
            var bloque = dato.idBloque;
            var estado = dato.idEstadoContrato ==1? "Activo":"Inactivo"
            var direccion = dato.direccionPegue
            var tipo = "";
            switch (dato.idTipoContrato) {
                case 1:
                    tipo="Pila"
                    break;
                case 2: 
                    tipo="Cisterna"
                    break;
                case 3:
                    tipo="RotoPlast"
                    break;
                default:
                    break;
            }
            script2+=`
                <tr>
    
                    <td>${idContrato}</td>
                    <td>${numCasa}</td>
                    <td>${bloque}</td>
                    <td>${estado}</td>
                    <td>${direccion}</td>
                    <td>${tipo}</td>
                    <td>
                    <a class="btnEdit"
                        data-id=${idContrato} 
                        data-num=${numCasa} 
                        data-bloq=${bloque} 
                        data-est=${estado}
                        data-dir=${direccion}
                        data-tipo=${tipo} 
                    >          
                        <i
                        class="fa-solid fa-pen me-3 text-primary align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    <a class="btnDel">          
                        <i
                        class="fa-solid fa-trash me-3 text-danger align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    </td>
                </tr>
            `
        });
    
        //AGREGA TODOS LOS DATOS
        var abonTab = document.getElementById("dataAbonado")
        abonTab.innerHTML = script2
    })  

    //ASIGNAR LOS EVENTOS DESPUES DE QUE LA TABLA SE CARGUE
    setTimeout(function() { 
        //Edit
        var btns = document.querySelectorAll(".btnEdit")
        btns.forEach((e)=>{
            e.addEventListener("click",()=>{
                console.log("Editar")
                alert("AUN SIN PROGRAMAR EDICION")
            })
        })
        //btnDel
        var btns = document.querySelectorAll(".btnDel")
        btns.forEach((e)=>{
            e.addEventListener("click",()=>{
                console.log("Eliminar")
                alert("AUN SIN PROGRAMAR ELIMINAR")

            })
        })
        }, 50
    );
}

//LLENANDO LA TABLA AL INICIAR
llenarTabla();








//OBTENER LOS DATOS DEL CONTRATO 

/**
 * FUNCION PARA CREAR UN CONTRATO
 *
 */

const crearContrato = async()=>{

    var bloqOption = document.getElementById("optBloque").value;
    var estaOption = document.getElementById("optEstadoContrato").value;
    var tipoOption = document.getElementById("optTipoContrato").value;

    var abonadoId = document.getElementById("abonadoName").dataset.id;
    var numCasa   = document.getElementById("txtNumCasa").value;
    var direccion = document.getElementById("txtDireccion").value;

    if (abonadoId && numCasa && direccion && bloqOption && estaOption && tipoOption){
        var rslt = await contratoModel.nuevoContrato(
            numCasa,
            direccion,
            abonadoId,
            parseInt(tipoOption),
            parseInt(estaOption),
            parseInt(bloqOption),
            1 //ACTUALIZAR CUANDO SE TENGA UN USUARIO
        )
        llenarTabla();
        cargarEventos();
    }else{
        alert("FALTAN DATOS");
    }

}
// EVENTO PARA CREAR CONTRATOS
var btnCrear = document.getElementById("btnCrear")
btnCrear.addEventListener("click",()=>{
    crearContrato();
})

