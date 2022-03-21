const mongoose = require('mongoose')
//Creando schemas
//Esquema para categoria
const categoriaSchema = mongoose.Schema({
  id_categoria: Number,
  nombre: String,
})
//Esquema para producto
const productoSchema = mongoose.Schema({
  id_producto: Number,
  nombre: String,
  precio: Number,
  categoria: categoriaSchema,
  unidades: Number,
})
//Definición del modelo
const productosModel = mongoose.model('productos', productoSchema)
module.exports = productosModel
