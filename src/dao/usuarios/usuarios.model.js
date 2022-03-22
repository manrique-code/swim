import db from "../db.js";
class Usuarios {
  // En este constructor creamos la tabla de la clase, en este caso Usuarios.
  constructor() {
    /**
     * La sintáxis que utiliza es la misma que la de SQLITE3
     * Consultar aquí para más información:
     * https://sqlite.org/docs.html
     */
    const estadoUsuarioStatement = `
      CREATE TABLE IF NOT EXISTS estadoUsuario(
        idEstadoUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
        estadoUsuario TEXT NOT NULL
      );
    `;

    const tipoUsuarioStatement = `
      CREATE TABLE IF NOT EXISTS tipoUsuario(
        idTipoUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
        tipoUsuario TEXT NOT NULL
      );
    `;

    const usuariosStatement = `
    CREATE TABLE IF NOT EXISTS usuarios(
      idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nombreUsuario TEXT NOT NULL,
      contraseña TEXT NOT NULL,
      fechaRegistro TEXT NOT NULL,
      idEstadoUsuario INTEGER,
      idTipoUsuario INTEGER,
      FOREIGN KEY(idEstadoUsuario) REFERENCES estadoUsuario(idEstadoUsuario),
      FOREIGN KEY(idTipoUsuario) REFERENCES tipoUsuario(idTipoUsuario)
    );
    `;

    // Con este método basta para ejecutar consultas DDL y DML.
    db.transaction((tx) => {
      tx.executeSql(usuariosStatement);
      tx.executeSql(estadoUsuarioStatement);
      tx.executeSql(tipoUsuarioStatement);
      console.log("base de datos creada correctamente!");
    });
  }
  /**
   * Método para crear los dos estados en el que puede estar un usuario.
   * @returns Promise
   */
    estadoUsuarioCreate = async () => {
        const createCmd =
          "INSERT INTO estadoUsuario(estadoUsuario) VALUES('Activo'),('Inactivo');";
        const datos = await db.transaction((tx) => tx.executeSql(createCmd));
        return datos;
    };

 /**
   * Método para crear los tipos de usuario.
   * @returns Promise
   */
    tipoUsuarioCreate = async () => {
        const createCmd =
          "INSERT INTO tipoUsuario(tipoUsuario) VALUES('Administrador'),('Empleado');";
        const datos = await db.transaction((tx) => tx.executeSql(createCmd));
        return datos;
    };

    obtenerEstadoUsuario = async (callback) => {
        const sql = `
        SELECT estadoUsuario
        FROM estadoUsuario;
        `;
        let items = [];
        db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultados) => {
            [...resultados.rows].map((fila) => items.push(fila));
            callback(items);
        });
        });
    };

    obtenerTipoUsuario = async (callback) => {
        const sql = `
        SELECT tipoUsuario
        FROM tipoUsuario;
        `;
        let items = [];
        db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultados) => {
            [...resultados.rows].map((fila) => items.push(fila));
            callback(items);
        });
        });
    };

    obtenerTodoUsuarios = async (callback, orderBy = "nombreUsuario") => {
        const sql = `
          SELECT *
          FROM usuarios
          ORDER BY ${orderBy};
        `;
        let items = [];
        db.transaction((tx) => {
          tx.executeSql(sql, [], (tx, resultados) => {
            [...resultados.rows].map((fila) => items.push(fila));
            callback(items);
          });
        });
    };

    obtenerUsuarioPorId = (id, callback) => {
        const sql = `
          SELECT *
          FROM usuarios
          WHERE idAUsuario = ?
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

    nuevoUsuario = async (
        nombreUsuario,
        contraseña,
        fechaRegistro,
        estadoUsuario,
        tipoUsuario,
      ) => {
        const createUsuarioSql = `
          INSERT INTO usuarios(
            nombreUsuario,
            contraseña,
            fechaRegistro,
            idEstadoUsuario,
            idTipoUsuario
          ) VALUES (
            ?,?,?,?,?
          );
        `;
        const values = [
            nombreUsuario,
            contraseña,
            fechaRegistro,
            estadoUsuario,
            tipoUsuario,
        ];
        const resultado = await db.transaction((tx) =>
          tx.executeSql(createUsuarioSql, values)
        );
        return resultado;
    };

    actualizarUsuario = async (
        idUsuario,
        nombreUsuario,
        contraseña,
        fechaRegistro,
        estadoUsuario,
        tipoUsuario,
      ) => {
        const updateAbonadoSql = `
          UPDATE abonados
          SET nombreUsuario = ?,
              contraseña = ?,
              fechaRegistro = ?,
              idEstadoUsuario = ?,
              idTipoUsuario = ?
          WHERE idUsuario = ?;
        `;
        const values = [
            nombreUsuario,
            contraseña,
            fechaRegistro,
            estadoUsuario,
            tipoUsuario,
            idUsuario
        ];
        const resultado = await db.transaction((tx) =>
          tx.executeSql(updateAbonadoSql, values)
        );
        return resultado;
    };

    eliminarAbonado = async (id) => {
        const sql = `
          DELETE
          FROM usuarios
          WHERE idUsuario = ?;
        `;
        const values = [id];
        const resultado = await db.transaction((tx) => tx.executeSql(sql, values));
        return resultado;
    };

}

export default Usuarios;