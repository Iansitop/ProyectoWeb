const mongoose = require('mongoose')
//Creación de Esquemas
//Esquema Pago
const pagoSchema = mongoose.Schema({
  id_pago: Number,
  numTarjeta: Number,
  propietario: String,
  mesCaducidad: Number,
  anioCaducidad: Number,
})
//Definición del modelo
const pagosModel = mongoose.model('pagos', pagoSchema)

module.exports = pagosModel
