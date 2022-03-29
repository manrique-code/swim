import db from "../db.js";

class Facturacion {
    constructor() {
        const mesStatement = `
        CREATE TABLE IF NOT EXISTS mes(
            idMes INTEGER PRIMARY KEY AUTOINCREMENT,
            nombreMes TEXT NOT NULL
        );
        `;

        const controlPagosStatement = `
        CREATE TABLE IF NOT EXISTS controlPagos(
        idControlPago TEXT PRIMARY KEY,
        fechaPago TEXT NOT NULL,
        valor DECIMAL(7,2) NOT NULL,
        idContrato INTEGER,
        idMes INTEGER,
        idUsuario INTEGER,
        FOREIGN KEY(idMes) REFERENCES mes(idMes)
        );
        `;

        // Con este método basta para ejecutar consultas DDL y DML.
        db.transaction((tx) => {
        tx.executeSql(controlPagosStatement);
        tx.executeSql(mesStatement);
        console.log("base de datos creada correctamente!");
        });
    }

    /* ----------------------------------------------------------------------------------------- */

    /**
     * Método para crear los meses que existen en el año.
     * @returns Promise
    */
    mesCreate = async () => {
        const createCmd =
        `INSERT INTO mes(nombreMes) VALUES('Enero'),('Febrero'),('Marzo'),
                                            ('Abril'),('Mayo'),('Junio'),
                                            ('Julio'),('Agosto'),('Septiembre'),
                                            ('Octubre'),('Noviembre'),('Diciembre')`;
        const datos = await db.transaction((tx) => tx.executeSql(createCmd));
        return datos;
    };

    /* ----------------------------------------------------------------------------------------- */

    obtenerMeses = async (callback) => {
        const sql = `
          SELECT nombreMes
          FROM mes;
        `;
        let items = [];
        db.transaction((tx) => {
          tx.executeSql(sql, [], (tx, resultados) => {
            [...resultados.rows].map((fila) => items.push(fila));
            callback(items);
          });
        });
      };

    /* ----------------------------------------------------------------------------------------- */

    mesesPagados = (id, callback) => {
      const sql = `
      SELECT *
      FROM controlPagos AS cp
      INNER JOIN mes AS m ON cp.idMes = m.idMes
      WHERE idContrato = ?
      ORDER BY cp.fechaPago, m.idMes desc LIMIT 12
      `;
      let values = [id];
      let items = [];
      db.transaction((tx) => {
        tx.executeSql(sql, values, (tx, resultados) => {
          [...resultados.rows].map((fila) => items.push(fila));
          callback(items);
        });
      });
    };

    /* ----------------------------------------------------------------------------------------- */


    generarUuid = async () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    };
  
  
    /* ----------------------------------------------------------------------------------------- */

    /**
     * 
     * @param {string} idControlPago UUID de la facturacion
     * @param {string} fechaPago  Fecha en la que realiza el pago (YYYY-MM-DD)
     * @param {number} valor  Valor del pago que se debe
     * @param {number} idContrato ID del contrato correspodiente a la paga
     * @param {number} idMes ID del mes que se pagara
     * @param {number} idUsuario ID del usuario que efectuo el pago
     * @returns promise
    */
    
    nuevaFacturacion = async (
        idControlPago,
        fechaPago,
        valor,
        idContrato,
        idMes,
        idUsuario
    ) => {
        const createFacturacionSql = `
        INSERT INTO controlPagos(
            idControlPago,
            fechaPago,
            valor,
            idContrato,
            idMes,
            idUsuario
        ) VALUES (
            ?,?,?,?,?,?
        );
        `;
        const values = [
            idControlPago,
            fechaPago,
            valor,
            idContrato,
            idMes,
            idUsuario
        ];
        const resultado = await db.transaction((tx) =>
        tx.executeSql(createFacturacionSql, values)
        );
        return resultado;
    };

    /* ----------------------------------------------------------------------------------------- */

    actualizarFacturacion = async (
        idControlPago,
        valor,
        idContrato,
        idMes,
        idUsuario
      ) => {
        const updateFacturacionSql = `
          UPDATE controlPagos
          SET valor = ?,
              idContrato = ?,
              idMes = ?,
              idUsuario = ?
          WHERE idControlPago = ?;
        `;
        const values = [
            valor,
            idContrato,
            idMes,
            idUsuario,
            idControlPago
        ];
        console.log(values)
        const resultado = await db.transaction((tx) =>
          tx.executeSql(updateFacturacionSql, values)
        );
        return resultado;
    };

    /* ----------------------------------------------------------------------------------------- */

    /**
         * Metodo para eliminar una facturación de la base de datos
         * @param {string} id UUID de la facturacion que se desea eliminar
         * @returns promise
     */

    eliminarFacturacion = async (id) => {
        const sql = `
          DELETE
          FROM controlPagos
          WHERE idControlPago = ?;
        `;
        const values = [id];
        const resultado = await db.transaction((tx) => tx.executeSql(sql, values));
        return resultado;
    };
}

export default Facturacion;
