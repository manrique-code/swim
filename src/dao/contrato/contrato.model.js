import db from "../db.js";

class Contratos{
    constructor(){

        const etapaStatement = `
            CREATE TABLE IF NOT EXISTS etapa(
                idEtapa INTEGER PRIMARY KEY AUTOINCREMENT,
                nombreEtapa TEXT NOT NULL
            );
        `
        const bloqueStatement = `
            CREATE TABLE IF NOT EXISTS bloque(
                idBloque INTEGER PRIMARY KEY AUTOINCREMENT,
                numBloque TEXT NOT NULL,
                idEtapa INTEGER NOT NULL,
                FOREIGN KEY(idEtapa) REFERENCES etapa(idEtapa)
            );
        `
        const tipoContratoStatement = `
            CREATE TABLE IF NOT EXISTS tipoContratos(
                idTipoContrato INTEGER PRIMARY KEY AUTOINCREMENT,
                tipoContrato TEXT NOT NULL
            );
        `
        const estadoContratoStatement = `
            CREATE TABLE IF NOT EXISTS estadoContrato(
                idEstadoContrato INTEGER PRIMARY KEY AUTOINCREMENT,
                estadoContrato TEXT NOT NULL
            );
        `
        const contratoStatement = `
            CREATE TABLE IF NOT EXISTS Contratos(
                idContrato INTEGER PRIMARY KEY AUTOINCREMENT,
                numCasa TEXT NOT NULL,
                direccionPegue TEXT NOT NULL,
                idAbonado TEXT NOT NULL,
                idTipoContrato INTEGER NOT NULL, 
                idEstadoContrato INTEGER NOT NULL,
                idBloque INTEGER NOT NULL, 
                idUsuario INTEGER NOT NULL,
                FOREIGN KEY(idAbonado) REFERENCES abonados(idAbonado),
                FOREIGN KEY(idTipoContrato) REFERENCES tipoContratos(idTipoContrato),
                FOREIGN KEY(idEstadoContrato) REFERENCES estadoContrato(idEstadoContrato),
                FOREIGN KEY(idBloque) REFERENCES bloque(idBloque),
                FOREIGN KEY(idUsuario) REFERENCES usuarios(idUsuario)
                );
            `

        db.transaction((tx)=>{
            tx.executeSql(etapaStatement);
            tx.executeSql(bloqueStatement);
            tx.executeSql(tipoContratoStatement);
            tx.executeSql(estadoContratoStatement);
            tx.executeSql(contratoStatement);
            console.log("base de datos creada correctamente!");
        })  
    }


    /**
     * METODO PARA CREAR UN CONTRATO
     * @param {String} numCasa Numero de casa a realizar el contrato 
     * @param {String} direccionPegue Direccion de la casa a realizar el contrato 
     * @param {String} idAbonado identificador del abonado del abonado 
     * @param {Integer} idTipoContrato identificador del tipo de contrato 
     * @param {Integer} idEstadoContrato identificador del estado del contrato 
     * @param {Integer} idBloque identificador del bloque
     * @param {Integer} idUsuario identificador del usuario que creo el contrato
     * @returns 
     */

    nuevoContrato = async(numCasa,direccionPegue,idAbonado,idTipoContrato,idEstadoContrato,idBloque,idUsuario)=>{
            
        const insertCmd = `INSERT INTO Contratos(
            numCasa,
            direccionPegue,
            idAbonado,
            idTipoContrato,
            idEstadoContrato,
            idBloque,
            idUsuario) 
            VALUES(?,?,?,?,?,?,?);`

        const values = [numCasa,direccionPegue,idAbonado,idTipoContrato,idEstadoContrato,idBloque,idUsuario]
        const rslt = await db.transaction((tx)=>{
            tx.executeSql(insertCmd,values);
        })
        return rslt;
        
    }

    actualizarContrato = async(idContrato,numCasa,direccionPegue,idTipoContrato,idEstadoContrato,idBloque,idUsuario)=>{
            
        const insertCmd = `UPDATE Contratos SET
            numCasa =?,
            direccionPegue =?,
            idTipoContrato = ?,
            idEstadoContrato =?,
            idBloque =?,
            idUsuario=? 
            WHERE idContrato = ?;`

        const values = [numCasa,direccionPegue,idTipoContrato,idEstadoContrato,idBloque,idUsuario,idContrato]
        const rslt = await db.transaction((tx)=>{
            tx.executeSql(insertCmd,values);
        })
        return rslt;
        
    }


    /**
     * METODO PARA VER TODOS LOS CONTRATOS
     * @param {Function} callback retorna un arreglo de Contratos
     */
    verContratos = async (callback) =>{
        const sql = "SELECT * FROM CONTRATOS";
        let contratos = [];
        db.transaction((tx) => {
          tx.executeSql(sql, [], (tx, resultados) => {
            [...resultados.rows].map((fila) => contratos.push(fila));
            callback(contratos);
          });
        });
    }
    
    /**
     * METODO PARA VER UN CONTRATO POR ID
     * @param {Integer} id Identificador del contrato       
     * @param {Function} callback funcion que retorna el arreglo
     */
    verContratoPorId = async (id, callback) => {
        const sql = "SELECT *FROM Contratos WHERE idContrato = ?";
        let values = [id];
        let contrato = [];
        await db.transaction((tx) => {
          tx.executeSql(sql, values, (tx, resultados) => {
            [...resultados.rows].map((fila) => contrato.push(fila));
            callback(contrato);
          });
        });
    };

    /**
     * METODO PARA ELIMINAR UN CONTRATO
     * @param {Integer} id Identificador del contrato que se eliminara
     */
    eliminarContrato = async(id)=>{
        const sql = "DELETE FROM Contratos WHERE idContrato = ?";
        await db.transaction((tx)=>{
            tx.executeSql(sql,[id]);
        })
    }
    

    verContratoAvanzado =  async ( callback) => {
        const sql =`
        SELECT
        Contratos.idContrato AS idContrato,
        Contratos.numCasa AS numCasa,
        Contratos.direccionPegue AS direccionPegue,
        abonados.idAbonado AS idAbonado,
        abonados.nombres AS nombres,
        abonados.apellidos AS apellidos,
        tipoContratos.idTipoContrato AS idTipoContrato,
        tipoContratos.tipoContrato AS tipoContrato,
        estadoContrato.idEstadoContrato AS idEstadoContrato,
        estadoContrato.estadoContrato AS estadoContrato,
        Contratos.idUsuario,
        bloque.idBloque AS idBloque,
        bloque.numBloque AS numBloque

        FROM
        Contratos
        INNER JOIN abonados         ON abonados.idAbonado = Contratos.idAbonado
        INNER JOIN tipoContratos    ON tipoContratos.idTipoContrato = Contratos.idTipoContrato
        INNER JOIN estadoContrato   ON estadoContrato.idEstadoContrato = Contratos.idEstadoContrato
        INNER JOIN bloque           ON bloque.idBloque  = Contratos.idBloque;
        `

        let values = [];
        let contrato = [];
        await db.transaction((tx) => {
          tx.executeSql(sql, values, (tx, resultados) => {
            [...resultados.rows].map((fila) => contrato.push(fila));
            callback(contrato);
          });
        });
    }; 

    buscarContratoAvanzado =  async (identidad="",nombre="",apellido="",callback) => {
        const sql =`
        SELECT
        Contratos.idContrato AS idContrato,
        Contratos.numCasa AS numCasa,
        Contratos.direccionPegue AS direccionPegue,
        abonados.idAbonado AS idAbonado,
        abonados.identidad AS identidad,
        abonados.nombres AS nombres,
        abonados.apellidos AS apellidos,
        tipoContratos.idTipoContrato AS idTipoContrato,
        tipoContratos.tipoContrato AS tipoContrato,
        estadoContrato.idEstadoContrato AS idEstadoContrato,
        estadoContrato.estadoContrato AS estadoContrato,
        Contratos.idUsuario,
        bloque.idBloque AS idBloque,
        bloque.numBloque AS numBloque

        FROM
        Contratos
        INNER JOIN abonados         ON abonados.idAbonado = Contratos.idAbonado
        INNER JOIN tipoContratos    ON tipoContratos.idTipoContrato = Contratos.idTipoContrato
        INNER JOIN estadoContrato   ON estadoContrato.idEstadoContrato = Contratos.idEstadoContrato
        INNER JOIN bloque           ON bloque.idBloque  = Contratos.idBloque
        WHERE abonados.identidad LIKE ?;
        `
        //OR abonado.nombres LIKE = ? OR abonado.apellidos LIKE = ?
        
        var like = `%${identidad}`
        let values = [like];
        let contrato = [];
        await db.transaction((tx) => {
          tx.executeSql(sql, values, (tx, resultados) => {
            [...resultados.rows].map((fila) => contrato.push(fila));
            callback(contrato);
          });
        });
    }; 

    reporteContratoAvanzado =  async (datoBusqueda="",tipo="",callback) => {
        let values = []
        var part2 = ``
        var part1 =`
        SELECT
        Contratos.idContrato AS idContrato,
        Contratos.numCasa AS numCasa,
        Contratos.direccionPegue AS direccionPegue,
        abonados.idAbonado AS idAbonado,
        abonados.identidad AS identidad,
        abonados.nombres AS nombres,
        abonados.apellidos AS apellidos,
        tipoContratos.idTipoContrato AS idTipoContrato,
        tipoContratos.tipoContrato AS tipoContrato,
        estadoContrato.idEstadoContrato AS idEstadoContrato,
        estadoContrato.estadoContrato AS estadoContrato,
        Contratos.idUsuario,
        bloque.idBloque AS idBloque,
        bloque.numBloque AS numBloque

        FROM
        Contratos
        INNER JOIN abonados         ON abonados.idAbonado = Contratos.idAbonado
        INNER JOIN tipoContratos    ON tipoContratos.idTipoContrato = Contratos.idTipoContrato
        INNER JOIN estadoContrato   ON estadoContrato.idEstadoContrato = Contratos.idEstadoContrato
        INNER JOIN bloque           ON bloque.idBloque  = Contratos.idBloque
        `
        switch(tipo){
            case "1"://Identidad Abonado
                part2 = ` WHERE abonados.identidad = ?`
                values = [datoBusqueda]
                break;
            case "2"://Nombre Abonado
                part2 = ` WHERE abonados.nombres LIKE ?`
                values = [`%${datoBusqueda}`]
                break;
            case "3"://idEstadoContrato
                part2 = ` WHERE estadoContrato.idEstadoContrato = ?`
                values = [datoBusqueda]
                break;
            case "4"://idBloque
                part2 = ` WHERE bloque.idBloque = ?`
                values = [datoBusqueda]
                break;
            default:part2=``;
                break
        }
        
        var sql = part1+part2
        let contrato = [];
        await db.transaction((tx) => {
          tx.executeSql(sql, values, (tx, resultados) => {
            [...resultados.rows].map((fila) => contrato.push(fila));
            callback(contrato);
          });
        });
    }; 



    /**
     * FUNCION PARA INSERTAR BLOQUES
     * @param {text} numBloque numero de bloque
     * @param {integer} idEtapa llave foranea de etapa
     */

    crearBloque = async(numBloque,idEtapa)=>{
        var sql = "INSERT INTO bloque(numBloque, idEtapa) values(?,?)"
        var data = [numBloque,idEtapa]
        await db.transaction((tx)=>{
            tx.executeSql(sql,data);
        })
    } 

    /**
     * FUNCION PARA VER BLOQUES
     * @param {Function} callback retorna un arreglo de bloqyues
     */
    verBloques = async(callback)=>{
        var bloques = []
        await db.transaction((tx)=>{
            tx.executeSql("SELECT * FROM bloque",[],(tx,result)=>{
                [...result.rows].map((datos)=>{
                    bloques.push(datos)
                })
                callback(bloques);
            })
        })
    }



    crearEtapa = async(nombreEtapa)=>{
        var sql = "INSERT INTO etapa(nombreEtapa) values(?)"
        var data = [nombreEtapa]
        await db.transaction((tx)=>{
            tx.executeSql(sql,data);
        })
    } 


    verEtapa = async(callback)=>{
        var etapas = []
        await db.transaction((tx)=>{
            tx.executeSql("SELECT * FROM etapa",[],(tx,result)=>{
                [...result.rows].map((datos)=>{
                    etapas.push(datos)
                })
                callback(etapas);
            })
        })
    }

    crearStados = async(id,estado)=>{
        var sql = "INSERT INTO estadoContrato(idEstadoContrato,estadoContrato) VALUES(?,?)"
        await db.transaction((tx)=>{
            tx.executeSql(sql,[id,estado])
        })
    }

    crearTipos= async(id,tipo)=>{
        var sql = "INSERT INTO tipoContratos(idTipoContrato,tipoContrato) VALUES(?,?)"
        await db.transaction((tx)=>{
            tx.executeSql(sql,[id,tipo])
        })
    }

}

export default Contratos;