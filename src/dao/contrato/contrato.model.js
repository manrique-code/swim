import db from "../db.js";

class Contratos{
    constructor(){

        const etapaStatement = `
            CREATE TABLE IF NOT EXISTS etapa(
                idEtapa INTEGER PRIMARY KEY AUTOINCREMENT,
                numEtapa TEXT NOT NULL
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

}

export default Contratos;