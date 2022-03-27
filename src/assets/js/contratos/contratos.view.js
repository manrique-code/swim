// Importando e instanciando la clase de Abonados del modelo de datos.
import Contratos from "../../../dao/contrato/contrato.model.js";
const contratoModel = new Contratos();
import Abonados from "../../../dao/abonados/abonados.model.js"
const abonadosModel = new Abonados();

//FUNCION DE PRUEBA PARA CREAR ABONADOS
for (let index = 0; index < 15; index++) {
    const datos = await abonadosModel.nuevoAbonado(
        `1bd7d69d-3607-4cff-8d0c-e63460fc51fb${index}`,
        `0604-2000-004${index<=9?"0"+index.toString():index}`,
        "Jose Picaso",
        "Madero",
        "Col. Saturno",
        "2000-12-25",
        1,
        "9988-8899",
        `apartamentos${index}@gmail.com`,
        (result)=>{
           console.log(result) 
        }
    );
}
/**
 * FUNCION ME PERMITE CREAR ESTADOS POR DEFECTO
 * @param {Array} arr recive un arreglo con los estados 
 */
const inserEstados = (arr) =>{
    var scriptStatus = ""
    arr.map((data,i)=>{
        contratoModel.crearStados(i,data);
        scriptStatus +=`<option value=${i}>${data}</option>`
    })
    document.getElementById("optEstadoContrato").innerHTML =scriptStatus;
}
inserEstados(["Activo","Inactivo","Suspendido"]);

/**
 * FUNCION QUE PERMITE CREAR TIPOS PARA UN CONTRATO
 * @param {Array} arr recive como parametro un arreglo con todos los tipos para un contrato
 */
const inserTipos = (arr) =>{
    var scriptStatus = ""
    arr.map((data,i)=>{
        contratoModel.crearTipos(i,data);
        scriptStatus +=`<option value=${i}>${data}</option>`
    })
    document.getElementById("optTipoContrato").innerHTML =scriptStatus;
}
inserTipos(["Pila","Cisterna","Aereo"])



const prueba = async()=>{
    await contratoModel.verContratoAvanzado((result)=>{
        console.log(result)
    })
}
prueba();

//TERMINA APARTADO DE DATOS DE PRUEBAS


/**
 * FUNCION PARA LIMPIAR LAS ENTRADAS 
 */
const limpiar = ()=>{
    var bloqOption = document.getElementById("optBloque").value = 1;
    var estaOption = document.getElementById("optEstadoContrato").value = 0;
    var tipoOption = document.getElementById("optTipoContrato").value = 0;
    var abonadoId  = document.getElementById("abonadoName");
    var numCasa    = document.getElementById("txtNumCasa").value = "";
    var direccion  = document.getElementById("txtDireccion").value = "";
    abonadoId.removeAttribute("data-idabonado");
    abonadoId.text="Sin Asignar";
}


/**
 * FUNCION PARA CREAR UN CONTRATO
 *
 */

 const crearContrato = async()=>{

    var bloqOption = document.getElementById("optBloque").value;
    var estaOption = document.getElementById("optEstadoContrato").value;
    var tipoOption = document.getElementById("optTipoContrato").value;
    var abonadoId = document.getElementById("abonadoName").dataset.idabonado;;
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
        limpiar();
        llenarTabla();
    }else{
        alert("FALTAN DATOS");
    }
}

/**
 * FUNCION PARA ACTUALIZAR UN ABONADO
 */
const actualizarContrato = async(idContrato) =>{
    var bloqOption = document.getElementById("optBloque").value;
    var estaOption = document.getElementById("optEstadoContrato").value;
    var tipoOption = document.getElementById("optTipoContrato").value;
    var numCasa   = document.getElementById("txtNumCasa").value;
    var direccion = document.getElementById("txtDireccion").value;

    if (idContrato && numCasa && direccion && bloqOption && estaOption && tipoOption){
        var rslt = await contratoModel.actualizarContrato(
            idContrato,
            numCasa,
            direccion,
            parseInt(tipoOption),
            parseInt(estaOption),
            parseInt(bloqOption),
            1 //ACTUALIZAR CUANDO SE TENGA UN USUARIO
        )
        
        limpiar();
        llenarTabla();
    }else{
        alert("FALTAN DATOS");
    }
}
/**
 * FUNCION PARA ELIMINAR UN ABONADO
 */
const eliminarContrato = async(id) =>{
    const eliminar = confirm("Desea eliminar este contrato")? await contratoModel.eliminarContrato(id) : alert("Accion Cancelada")
    llenarTabla();
}



/**
 * FUNCION PARA LLENAR TABLA DE DATOS DE CONTRATOS EXISTENTES EN LA BASE DE DATOS
 */
const llenarTabla = ()=>{
    var dataContratos = contratoModel.verContratoAvanzado((datos)=>{
        var script2=""
        datos.map((dato,i,array)=>{
            var idContrato = dato.idContrato;
            var numCasa = dato.numCasa;
            var bloque = dato.idBloque;
            var numBloque = dato.numBloque;
            var idAbonado = dato.idAbonado
            var estado = dato.estadoContrato;
            var direccion = dato.direccionPegue
            var tipo = dato.tipoContrato
            script2+=`
                <tr>
                    <td>${numCasa}</td>
                    <td>${numBloque}</td>
                    <td>${estado}</td>
                    <td>${direccion}</td>
                    <td>${tipo}</td>
                    <td>
                    <a class="btnEdit"
                        data-id=${idContrato} 
                        data-num=${numCasa} 
                        data-bloq=${bloque} 
                        data-est=${dato.idEstadoContrato}
                        data-dir="${direccion}"
                        data-tipo=${dato.idTipoContrato}
                        data-idabon=${idAbonado} 
                    >          
                        <i
                        class="fa-solid fa-pen me-3 text-primary align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    <a class="btnDel" data-id=${idContrato} >          
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
        var abonTab = document.getElementById("dataContratos")
        abonTab.innerHTML = script2
    })  

    //ASIGNAR LOS EVENTOS DESPUES DE QUE LA TABLA SE CARGUE
    setTimeout(function() { 
        /**
         * EVENTO PARA EL BOTON DE EDITAR Y ASIGNAR LOS ELEMENTOS EN LOS INPUTS PARA EDITARLOS
         */
        var btns = document.querySelectorAll(".btnEdit")
        btns.forEach((e)=>{
            e.addEventListener("click",()=>{
                mostrarBotonEditar();
                var dt = e.dataset
                limpiar();

                abonadosModel.obtenerAbonadoPorId(dt.idabon,(result)=>{
                    var rs = result[0]
                    var nombre = rs.nombres+" "+rs.apellidos
                    var id = rs.idAbonado
                    var readAbonado = document.getElementById("abonadoName")
                    readAbonado.setAttribute("data-idabonado",id)
                    readAbonado.value=nombre;
                })

                document.getElementById("optBloque").value = dt.bloq;
                document.getElementById("optEstadoContrato").value = dt.est;
                document.getElementById("optTipoContrato").value =dt.tipo;
                document.getElementById("txtNumCasa").value = dt.num;
                document.getElementById("txtDireccion").value = dt.dir;

                document.getElementById("btnGuardar").setAttribute("data-idcontrato",dt.id)
            })
        })
        /**
         * EVENTO PARA EL BOTON DE ELIMINAR
         */
        var btns = document.querySelectorAll(".btnDel")
        btns.forEach((e)=>{
            e.addEventListener("click",()=>{
                eliminarContrato(e.dataset.id)
            })
        })
        }, 500
    );
}

//LLENANDO LA TABLA AL INICIAR
llenarTabla();

/**
 * FUNCION DE BUSQUEDA AVANZADA DE CONTRATOS POR ABONADOS
 */

 const busquedaAvanzada = (datoFiltro)=>{
     
    var dataContratos = contratoModel.buscarContratoAvanzado(datoFiltro,datoFiltro,datoFiltro,
        (datos)=>{
        var script2=""
        datos.map((dato,i,array)=>{
            var idContrato = dato.idContrato;
            var numCasa = dato.numCasa;
            var bloque = dato.idBloque;
            var numBloque = dato.numBloque;
            var idAbonado = dato.idAbonado
            var estado = dato.estadoContrato;
            var direccion = dato.direccionPegue
            var tipo = dato.tipoContrato
            script2+=`
                <tr>
                    <td>${numCasa}</td>
                    <td>${numBloque}</td>
                    <td>${estado}</td>
                    <td>${direccion}</td>
                    <td>${tipo}</td>
                    <td>
                    <a class="btnEdit"
                        data-id=${idContrato} 
                        data-num=${numCasa} 
                        data-bloq=${bloque} 
                        data-est=${dato.idEstadoContrato}
                        data-dir="${direccion}"
                        data-tipo=${dato.idTipoContrato}
                        data-idabon=${idAbonado} 
                    >          
                        <i
                        class="fa-solid fa-pen me-3 text-primary align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    <a class="btnDel" data-id=${idContrato} >          
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
        var abonTab = document.getElementById("dataContratos")
        abonTab.innerHTML = script2
    })  
    console.log(dataContratos)

    //ASIGNAR LOS EVENTOS DESPUES DE QUE LA TABLA SE CARGUE
    setTimeout(function() { 
        /**
         * EVENTO PARA EL BOTON DE EDITAR Y ASIGNAR LOS ELEMENTOS EN LOS INPUTS PARA EDITARLOS
         */
        var btns = document.querySelectorAll(".btnEdit")
        btns.forEach((e)=>{
            e.addEventListener("click",()=>{
                mostrarBotonEditar();
                var dt = e.dataset
                limpiar();

                abonadosModel.obtenerAbonadoPorId(dt.idabon,(result)=>{
                    var rs = result[0]
                    var nombre = rs.nombres+" "+rs.apellidos
                    var id = rs.idAbonado
                    var readAbonado = document.getElementById("abonadoName")
                    readAbonado.setAttribute("data-idabonado",id)
                    readAbonado.value=nombre;
                })

                document.getElementById("optBloque").value = dt.bloq;
                document.getElementById("optEstadoContrato").value = dt.est;
                document.getElementById("optTipoContrato").value =dt.tipo;
                document.getElementById("txtNumCasa").value = dt.num;
                document.getElementById("txtDireccion").value = dt.dir;

                document.getElementById("btnGuardar").setAttribute("data-idcontrato",dt.id)
            })
        })
        /**
         * EVENTO PARA EL BOTON DE ELIMINAR
         */
        var btns = document.querySelectorAll(".btnDel")
        btns.forEach((e)=>{
            e.addEventListener("click",()=>{
                eliminarContrato(e.dataset.id)
            })
        })
        }, 500
    );
}
//CREAR EL EVENTO PARA REALIZAR LA BUSQUEDA 
var inputBusqueda= document.getElementById("searchContrato")
inputBusqueda.addEventListener("change",(e)=>{
    var val = inputBusqueda.value
    console.log(val);
    busquedaAvanzada(val);

})



// EVENTO PARA CREAR CONTRATOS
document.getElementById("btnCrear").addEventListener("click",(e)=>{
    e.preventDefault();
    e.stopPropagation();
    crearContrato();
})
//EVENTOS PARA EDITAR CONTRATO
document.getElementById("btnGuardar").addEventListener("click",(e)=>{
    e.preventDefault();
    e.stopPropagation();
    ocultarBotonEditar();
    var id =document.getElementById("btnGuardar").dataset.idcontrato;
    actualizarContrato(id)
})
//EVENTO PARA CANCERLAR EDITAR CONTRATO
document.getElementById("btnCancelar").addEventListener("click",()=>{
    ocultarBotonEditar();
    limpiar();
})
//EVENTO MOSTRAR BOTON GUARDAR
function mostrarBotonEditar(){
    document.getElementById("btnCrear").style.display = "none"
    document.getElementById("btnGuardar").style.display = "block"
    document.getElementById("btnCancelar").style.display = "block"
}
//EVENTO OCULTAR BOTON EDITAR
function ocultarBotonEditar(){
    document.getElementById("btnCrear").style.display = "block"
    document.getElementById("btnGuardar").style.display = "none"
    document.getElementById("btnCancelar").style.display = "none"
}

/**
 * FUNCIONES PARA MODAL DE ABONADOS
 */
 function openModalAbonados() {
    //document.getElementById("backdrop").style.display = "block"
    document.getElementById("abonadosModal").style.display = "block"
    document.getElementById("abonadosModal").classList.add("show")

}
function closeModalAbonados() {
    //document.getElementById("backdrop").style.display = "none"
    document.getElementById("abonadosModal").style.display = "none"
    document.getElementById("abonadosModal").classList.remove("show")
}


// EVENTOS DE BOTONES QUE PERTENECEN AL MODAL ABONADOS
document.getElementById("btnModAbonados").addEventListener("click",(e)=>{
    openModalAbonados();
});
document.getElementById("btnCloseModalAbonados").addEventListener("click",(e)=>{
    closeModalAbonados();
});


/**
 * FUNCION PARA OBTENER ABONADOS Y MOSTRARLOS EN EL MODAL
 */
const llenarAbonados = async() =>{
    var dataAbonados = await abonadosModel.obtenerTodoAbonados((result)=>{
        var scriptAbonado =  ""
        result.map((data,i)=>{
            var nombre = `${data.nombres} ${data.apellidos}`;
            var identidad = data.identidad;
            var idAbonado = data.idAbonado;
            scriptAbonado+= `
                <tr>
                    <td class="col">${identidad}</td>
                    <td class="col">${nombre}</td>
                    
                    <td class="col">
                    <a class="btnSelectAbonado"
                        data-id="${idAbonado}"
                        data-nombre="${nombre}" 
                    >          
                        <i
                        class="fa-solid fa-circle-check me-3 text-primary align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    </td>
                </tr>
            `
        });
        document.getElementById("dataAbonados").innerHTML = scriptAbonado;
    })

    setTimeout(function() { //ESTA FUNCION SE UTILIZA PARA ASIGNAR LOS EVENTOS 5,0s despues de ser creados los elementos
        //Edit
        var btns = document.querySelectorAll(".btnSelectAbonado")
        btns.forEach((e)=>{
            e.addEventListener("click",()=>{
                //console.log(e)
                var abonadoInfo= document.getElementById("abonadoName")
                abonadoInfo.value =e.dataset.nombre;
                abonadoInfo.setAttribute("data-idabonado",e.dataset.id)
                closeModalAbonados();
            })
        })
        
        }, 500
    );
}

llenarAbonados()

/**
 * LLENAR TABLA ETAPAS
 */

 const llenarEtapas = async() =>{
    var data = await contratoModel.verEtapa((result)=>{
        var scriptSelect = ""
        var scriptEtapas =  ""
        result.map((data,i)=>{
            
            var idEtapa = data.idEtapa;
            var etapa = data.nombreEtapa;
            scriptEtapas+= `
                <tr>
                    <td class="col">${idEtapa}</td>
                    <td class="col">${etapa}</td>
                    
                    <td class="col">
                    <td>
                    <a class="btnEditEtapa"
                        data-id=${idEtapa} 
                        data-nombre=${etapa}
                    >          
                        <i
                        class="fa-solid fa-pen me-3 text-primary align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    <a class="btnDelEtapa" data-id=${idEtapa} >          
                        <i
                        class="fa-solid fa-trash me-3 text-danger align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    </td>
                </tr>
            `
            scriptSelect += `<option value="${idEtapa}">${etapa}</option>`
        });
        document.getElementById("dataEtapas").innerHTML = scriptEtapas;
        document.getElementById("selectEtapas").innerHTML = scriptSelect;
    })

}

llenarEtapas();


/**
 * CREAR ETAPA
 */

document.getElementById("btnCrearEtapa").addEventListener("click",async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    var nombre = document.getElementById("txtEtapa").value;
    var evl = confirm(`Deseas crear la etapa "${nombre}"?`)
    if(evl && nombre){    
        await contratoModel.crearEtapa(nombre)
        llenarEtapas();
    }
    else{
        alert("Error")
    }
})

const llenarBloques = async() =>{
    var bloquesDato = await contratoModel.verBloques((datos)=>{
        var scriptBloque = "";
        var selectBloque = "";
        datos.map((data)=>{  
            var idBloque = data.idBloque
            var bloque = data.numBloque
            var etapa = data.idEtapa
            scriptBloque += `
                <tr>
                    <td class="col">${idBloque}</td>
                    <td class="col">${bloque}</td>
                    <td class="col">${etapa}</td>
                    <td>
                    <a class="btnEditBloque"
                        data-id=${idBloque} 
                        data-nombre=${bloque}
                        data-etapa=${etapa}
                    >          
                        <i
                        class="fa-solid fa-pen me-3 text-primary align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    <a class="btnDelBloque" data-id=${idBloque} >          
                        <i
                        class="fa-solid fa-trash me-3 text-danger align-items-center"
                        style="height: 20px; width: 20px"
                        ></i>
                    </a>
                    </td>
                </tr>
            `;
            selectBloque+= `
                <option value=${idBloque}>${bloque}</option>
            `
            
        })
        document.getElementById("dataBloques").innerHTML = scriptBloque;
        document.getElementById("optBloque").innerHTML = selectBloque;
    })
    
    
    
}
llenarBloques();

/**
 * CREAR BLOQUE 
 */
document.getElementById("btnCrearBloque").addEventListener("click",async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    var bloque = document.getElementById("txtBloque")
    var etapa = document.getElementById("selectEtapas")
    var textoEtapa = etapa.options[etapa.selectedIndex].text;
    console.log(etapa.value)
    var evl = confirm(`Desea crear el bloque ${bloque.value} en la etapa ${textoEtapa}`)
    
    if(evl && bloque && etapa !=""){
        await contratoModel.crearBloque(bloque.value,etapa.value)
        llenarBloques();
    }

})


