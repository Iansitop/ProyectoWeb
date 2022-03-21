const mongoose = require('mongoose')
//Esquema para categoria
const categoriaSchema = mongoose.Schema({
  id_categoria: Number,
  nombre: String,
})
//Definición del modelo
const categoriasModel = mongoose.model('categorias', categoriaSchema)
module.exports = categoriasModel
