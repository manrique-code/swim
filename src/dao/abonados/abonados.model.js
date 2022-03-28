// Importamos la Base de Datos (es global, se puede utilizar en cualquier script mientras sea importada)
import db from "../db.js";
class Abonados {
  // En este constructor creamos la tabla de la clase, en este caso Abonados.
  constructor() {
    /**
     * La sintáxis que utiliza es la misma que la de SQLITE3
     * Consultar aquí para más información:
     * https://sqlite.org/docs.html
     */
    const sexoStatement = `
      CREATE TABLE IF NOT EXISTS sexo(
        idSexo INTEGER PRIMARY KEY AUTOINCREMENT,
        nombreSexo TEXT NOT NULL
      );
    `;

    const abonadosStatement = `
    CREATE TABLE IF NOT EXISTS abonados(
      idAbonado TEXT PRIMARY KEY,
      identidad TEXT NOT NULL UNIQUE,
      nombres TEXT NOT NULL,
      apellidos TEXT NOT NULL,
      direccion TEXT NOT NULL,
      fechaNacimiento TEXT NOT NULL,
      telefono TEXT,
      correoElectronico TEXT,
      timestamp TEXT,
      idSexo INTEGER,
      FOREIGN KEY(idSexo) REFERENCES sexo(idSexo)
    );
    `;

    // Con este método basta para ejecutar consultas DDL y DML.
    db.transaction((tx) => {
      tx.executeSql(abonadosStatement);
      tx.executeSql(sexoStatement);
      console.log("base de datos creada correctamente!");
    });
  }

  generarUuid = async () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  /**
   * Método para crear los dos únicos sexos que existen en el mundo (basado).
   * @returns Promise
   */
  sexoCreate = async () => {
    const createCmd =
      "INSERT INTO sexo(nombreSexo) VALUES('Masculino'),('Femenino');";
    const datos = await db.transaction((tx) => tx.executeSql(createCmd));
    return datos;
  };

  /**
   * Método para obtener listado de los sexos de la base de datos
   * @param {function} callback Handler para obtener los items iterados
   */
  obtenerSexo = async (callback) => {
    const sql = `
      SELECT nombreSexo
      FROM sexo;
    `;
    let items = [];
    db.transaction((tx) => {
      tx.executeSql(sql, [], (tx, resultados) => {
        [...resultados.rows].map((fila) => items.push(fila));
        callback(items);
      });
    });
  };

  /**
   * Método para obtener todos los abonados de la base de datos.
   * @param {function} callback Callback para obtener los Abonados de la base de datos
   * @param {string} orderBy Dato por el cual se van a ordernar los resultados
   */
  obtenerTodoAbonados = async (callback, orderBy = "nombres") => {
    try {
      // Constante donde iría el DML de la consulta a la base de datos.
      const sql = `
      SELECT *
      FROM abonados
      ORDER BY ${orderBy};
    `;
      // Arreglo donde se van a guardar los datos.
      let items = [];
      // Realizamos la consulta pero no la almacenamos en ninguna variable porque su resultado es asíncrono.
      db.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultados) => {
          /**
           * Mapeamos la propiedad de @var rows que es donde vienen los resultados.
           * Al ir iterando o mapeando los resultados los vamos almacenando en el arreglo @var items,
           * que en este caso pasará a ser un arreglo de objetos.
           */
          [...resultados.rows].map((fila) => items.push(fila));
          /**
           * En este punto todos los objetos de resultado fueron almacenados en el arreglo de @var items;
           * Se lo pasamos al @function callback (así es, es una función que va como argumento de una función, lo bonito de js ;) )
           * que nos retorna todo los resultados.
           * Esto se hace así por la naturaleza asíncrona de las funciones de Web SQL Database.
           */
          callback(items);
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * Método para obtener un Abonado por busqueda de Id
   * @param {string} id UUID del Abonado que se quiere obtener
   * @param {function} callback Callback para obtener el Abonado buscado
   */
  obtenerAbonadoPorId = (id, callback) => {
    const sql = `
      SELECT *
      FROM abonados
      WHERE idAbonado = ?
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

  /**
   * Método para obtener un Abonado por busqueda de identidad
   * @param {string} identidad Identidad del Abonado
   * @param {function} callback Callback para obtener el Abonado buscado
   */
  obtenerAbonadoPorIdentidad = (identidad, callback) => {
    const sql = `
      SELECT *
      FROM abonados
      WHERE identidad = ?
    `;
    let values = [identidad];
    let items = [];
    db.transaction((tx) => {
      tx.executeSql(sql, values, (tx, resultados) => {
        [...resultados.rows].map((fila) => items.push(fila));
        callback(items);
      });
    });
  };

  /**
   * Método para craer el Abonado de la base de datos.
   * @param {string} idAbonado UUID del Abonado
   * @param {string} identidad Identidad del Abonado (XXXX-XXXX-XXXXX)
   * @param {string} nombres Primer y Segundo (opcional) nombres del Abonado
   * @param {string} apellidos Primer y Segundo (opcional) apellidos del Abonado
   * @param {string} direccion Dirección donde vive el Abonado.
   * @param {string} fechaNacimiento Fecha en que nacio el abonado (YYYY-MM-DD)
   * @param {number} sexo Sexo del Abonado (1 = Masculino | 2 = Femenino)
   * @param {string} telefono Telefono del abonado abonado (opcional)
   * @param {string} correoElectronico Dirección de correo electrónico del abonado (opcional)
   * @param {function} callback Función para obtener sí el resultado fue correcto
   * @returns Promise
   */
  nuevoAbonado = async (
    idAbonado,
    identidad,
    nombres,
    apellidos,
    direccion,
    fechaNacimiento,
    sexo,
    telefono = "",
    correoElectronico = "",
    callback
  ) => {
    const createAbonadoSql = `
      INSERT INTO abonados(
        idAbonado,
        identidad,
        nombres,
        apellidos,
        direccion,
        fechaNacimiento,
        telefono,
        correoElectronico,
        timestamp,
        idSexo
      ) VALUES (
        ?,?,?,?,?,?,?,?,?,?
      );
    `;
    const values = [
      idAbonado,
      identidad,
      nombres,
      apellidos,
      direccion,
      fechaNacimiento,
      telefono,
      correoElectronico,
      `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      sexo,
    ];
    const resultado = await db.transaction((tx) =>
      tx.executeSql(createAbonadoSql, values, (tx, result) => {
        callback(result);
      })
    );
    return resultado;
  };

  /**
   * Método para actualizar el abonado de la base de datos.
   * @param {string} idAbonado Identificador del abonado a editar
   * @param {string} identidad Número de identidad con guiones del abonaod
   * @param {string} nombres Primer y segundo nombre del abonado
   * @param {string} apellidos Primer y segundo apellido del abonado
   * @param {string} direccion Dirección de viviendo del abonado
   * @param {string} fechaNacimiento Fecha de nacimiento del abonado (DD-MM-YYYY)
   * @param {number} sexo Género del abonado (1 - Hombre : 2 - Mujer)
   * @param {string} telefono Número telefónico del abonado
   * @param {string} correoElectronico Dirección de correo electrónico del abonado
   * @param {function} callback Callback para cuando el abonado sea ingresado en la base de datos
   * @returns Promise
   */
  actualizarAbonado = async (
    idAbonado,
    identidad,
    nombres,
    apellidos,
    direccion,
    fechaNacimiento,
    sexo,
    telefono = "",
    correoElectronico = ""
  ) => {
    const updateAbonadoSql = `
      UPDATE abonados
      SET identidad = ?,
          nombres = ?,
          apellidos = ?,
          direccion = ?,
          fechaNacimiento = ?,
          idSexo = ?,
          telefono = ?,
          correoElectronico = ?
      WHERE idAbonado = ?;
    `;
    const values = [
      identidad,
      nombres,
      apellidos,
      direccion,
      fechaNacimiento,
      sexo,
      telefono,
      correoElectronico,
      idAbonado,
    ];
    const resultado = await db.transaction((tx) =>
      tx.executeSql(updateAbonadoSql, values)
    );
    return resultado;
  };

  /**
   * Método para eliminar un abonado de la base de datos.
   * @param {string} id UUID del Abonado que se desea eliminar
   * @returns Promise
   */
  eliminarAbonado = async (id) => {
    const sql = `
      DELETE
      FROM abonados
      WHERE idAbonado = ?;
    `;
    const values = [id];
    const resultado = await db.transaction((tx) => tx.executeSql(sql, values));
    return resultado;
  };
}

export default Abonados;
