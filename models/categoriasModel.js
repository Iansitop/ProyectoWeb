const mongoose = require('mongoose')
//Creando schemas

//Esquema para categoria
const categoriaSchema = mongoose.Schema({
  id_categoria: Number,
  nombre: String,
})

//Definición del modelo
const categoriasModel = mongoose.model('categorias', categoriaSchema)
module.exports = categoriasModel
