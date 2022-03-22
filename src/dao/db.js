const nombre = "SWIMDB";
const version = "1.0";
const descripcion = "Base de datos de SWIM app.";
const size = 50 * 1024 * 1024;
let db = window.openDatabase(nombre, version, descripcion, size);

export default db;
