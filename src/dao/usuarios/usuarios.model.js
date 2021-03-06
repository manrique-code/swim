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

    usuarioAdminCreate = async () => {
      const createCmd =
        "INSERT INTO usuarios(nombreUsuario, contraseña, fechaRegistro, idEstadoUsuario, idTipoUsuario) VALUES('admin', '123', '2022-04-01', 1, 1);";
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

    obtenerTodoUsuarios = async (callback) => {
        const sql = `
          SELECT u.idUsuario AS idUsuario, 
          u.nombreUsuario AS nombreUsuario,
          u.contraseña AS contraseña, 
          u.fechaRegistro AS fechaRegistro, 
          e.estadoUsuario AS estadoUsuario, 
          tp.tipoUsuario AS tipoUsuario
          FROM usuarios AS u
          INNER JOIN estadoUsuario AS e ON u.idEstadoUsuario = e.idEstadoUsuario
          INNER JOIN tipoUsuario AS tp ON u.idTipoUsuario = tp.idTipoUsuario;
        `;
        let items = [];
        db.transaction((tx) => {
          tx.executeSql(sql, [], (tx, resultados) => {
            [...resultados.rows].map((fila) => items.push(fila));
            callback(items);
          });
        });
    };

    obtenerUsuarioPorNombre = (nombre, callback) => {
        const sql = `
          SELECT *
          FROM usuarios
          WHERE nombreUsuario = ?
        `;
        let values = [nombre];
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
        callback
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
          tx.executeSql(createUsuarioSql, values, (tx, result) => {
            callback(result);
          })
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

    eliminarUsuario = async (id) => {
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