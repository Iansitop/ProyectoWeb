const mongoose = require('mongoose')
//Creando schemas
//Esquema Pago
const pagoSchema = mongoose.Schema({
  id_pago: Number,
  numTarjeta: Number,
  propietario: String,
  mesCaducidad: Number,
  anioCaducidad: Number,
})
//Esquema para clientes
const clienteSchema = mongoose.Schema({
  id_cliente: Number,
  nombre: String,
  email: String,
  contraseña: String,
  direccion: String,
  pagos: [pagoSchema],
})
//Definición del modelo
const clientesModel = mongoose.model('clientes', clienteSchema)
module.exports = clientesModel
