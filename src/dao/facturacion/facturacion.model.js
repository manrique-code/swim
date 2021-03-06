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
      idControlPago INTEGER PRIMARY KEY AUTOINCREMENT,
      fechaPago TEXT NOT NULL,
      valor DECIMAL(7,2) NOT NULL,
      idContrato INTEGER,
      idMes INTEGER,
      idUsuario INTEGER,
      FOREIGN KEY(idMes) REFERENCES mes(idMes)
      FOREIGN KEY(idContrato) REFERENCES Contratos(idContrato)
      FOREIGN KEY(idUsuario) REFERENCES usuarios(idUsuario)
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
    ORDER BY cp.idControlPago desc LIMIT 12
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


  /* ----------------------------------------------------------------------------------------- */

  verFacturacion = async (datoBusqueda="",tipo="",callback) =>{
    let values = []
    var part3 = ``
    var part2 = ``
    var part1 =`
    SELECT * 
    FROM controlPagos         AS cp
    INNER JOIN Contratos      AS c ON cp.idContrato = c.idContrato
    INNER JOIN abonados       AS a ON c.idAbonado = a.idAbonado
    INNER JOIN tipoContratos  AS t ON c.idTipoContrato = t.idTipoContrato
    INNER JOIN bloque         AS b ON c.idBloque = b.idBloque
    INNER JOIN etapa          AS e ON b.idEtapa = e.idEtapa
    INNER JOIN mes            AS m ON cp.idMes = m.idMes
    INNER JOIN estadoContrato AS ec ON ec.idEstadoContrato = c.idEstadoContrato
    INNER JOIN usuarios       AS u ON cp.idUsuario = u.idUsuario
    `;
    switch(tipo){
      case "1"://Identidad Abonado
          part2 = ` WHERE a.identidad LIKE '%' || ? || '%'`
          part3 = `ORDER BY cp.idContrato asc`
          values = [datoBusqueda]
          break;
      case "2"://Nombre Abonado
          part2 = ` WHERE a.nombres LIKE '%' || ? || '%'`
          part3 = `ORDER BY cp.idContrato asc`
          values = [`%${datoBusqueda}`]
          break;
      case "3"://idEstadoContrato
          part2 = ` WHERE ec.idEstadoContrato = ?`
          part3 = `ORDER BY cp.idContrato asc`
          values = [datoBusqueda]
          break;
      case "4"://idBloque
          part2 = ` WHERE t.idtipoContrato = ?`
          part3 = `ORDER BY cp.idContrato asc`
          values = [datoBusqueda]
          break;
      default:part2=``
      part3 = `ORDER BY cp.idContrato asc`;
          break
    } 
    var sql = part1+part2+part3
    let contrato = [];
    await db.transaction((tx) => {
      tx.executeSql(sql, values, (tx, resultados) => {
        [...resultados.rows].map((fila) => contrato.push(fila));
        callback(contrato);
      });
    });
  }

  verContratosFactura = async (callback) =>{
    const sql = `
      SELECT * 
      FROM Contratos AS c
      INNER JOIN abonados AS a ON c.idAbonado = a.idAbonado
      INNER JOIN tipoContratos AS t ON c.idTipoContrato = t.idTipoContrato
      INNER JOIN bloque AS b ON c.idBloque = b.idBloque
      INNER JOIN etapa AS e ON b.idEtapa = e.idEtapa
      WHERE c.idEstadoContrato = 0
      ORDER BY a.nombres asc
    `;
    let contratos = [];
    db.transaction((tx) => {
      tx.executeSql(sql, [], (tx, resultados) => {
        [...resultados.rows].map((fila) => contratos.push(fila));
        callback(contratos);
      });
    });
  }

  /* ----------------------------------------------------------------------------------------- */

  /* ----------------------------------------------------------------------------------------- */
  
  verContratosFacturaAvanzado = async (identidad,callback) =>{
    const sql = `
      SELECT * 
      FROM Contratos AS c
      INNER JOIN abonados AS a ON c.idAbonado = a.idAbonado
      INNER JOIN tipoContratos AS t ON c.idTipoContrato = t.idTipoContrato
      INNER JOIN bloque AS b ON c.idBloque = b.idBloque
      INNER JOIN etapa AS e ON b.idEtapa = e.idEtapa
      WHERE c.idEstadoContrato = 0 AND a.identidad LIKE '%' || ? || '%'
      ORDER BY a.nombres asc
    `;
    let values = [identidad];
    let items = [];
    db.transaction((tx) => {
      tx.executeSql(sql, values, (tx, resultados) => {
        [...resultados.rows].map((fila) => items.push(fila));
        callback(items);
      });
    });
  }


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
      fechaPago,
      valor,
      idContrato,
      idMes,
      idUsuario
  ) => {
      const createFacturacionSql = `
      INSERT INTO controlPagos(
          fechaPago,
          valor,
          idContrato,
          idMes,
          idUsuario
      ) VALUES (
          ?,?,?,?,?
      );
      `;
      const values = [
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
