// Importando e instanciando la clase de Abonados del modelo de datos.
import Abonados from "../../../dao/abonados/abonados.model.js";
const abonadoModel = new Abonados();
const datos = await abonadoModel.nuevoAbonado(
  "1bd7d69d-3607-4cff-8d0c-e63460fc51fb",
  "0604-2000-00415",
  "Jose Picaso",
  "Madero",
  "Col. Saturno",
  "2000-12-25",
  1,
  "9988-8899",
  "apartamentos@gmail.com"
);
console.log(datos);
