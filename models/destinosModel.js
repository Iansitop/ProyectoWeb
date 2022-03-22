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
//Esquema para clientes
const clienteSchema = mongoose.Schema({
  id_cliente: Number,
  nombre: String,
  email: String,
  contraseña: String,
  direccion: String,
  pagos: [pagoSchema],
})
//Esquema para destino
const destinoSchema = mongoose.Schema({
  id_destino: Number,
  pais: String,
  estado: String,
  colonia: String,
  calle: String,
  numCasa: String,
  telefono: String,
  cliente: clienteSchema,
})

//Definición del modelo
const destinosModel = mongoose.model('destinos', destinoSchema)
module.exports = destinosModel


