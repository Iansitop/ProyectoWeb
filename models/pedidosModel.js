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
//Esquema para Categoria
const categoriaSchema = mongoose.Schema({
  id_categoria: Number,
  nombre: String,
})
//Esquema para Producto
const productoSchema = mongoose.Schema({
  id_producto: Number,
  nombre: String,
  precio: Number,
  categoria: categoriaSchema,
  unidades: Number,
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

//Esquema para Pedido
const pedidoSchema = mongoose.Schema({
  id_pedido: Number,
  estadoPedido: String,
  fechaCompra: Date,
  fechaEntrega: Date,
  productos: [productoSchema],
  cliente: clienteSchema,
  destino: destinoSchema,
  pago: pagoSchema,
})

//Definición del modelo
const pedidosModel = mongoose.model('pedidos', pedidoSchema)
module.exports = pedidosModel
