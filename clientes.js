const mongoose = require('mongoose')
//Creando schemas
//Esquema para Cliente
const clienteSchema = mongoose.Schema({
  id_cliente: Number,
  nombre: String,
  email: String,
  contraseña: String,
  direccion: String,
  telefono: String,

})

//Esquema para clientes
const clienteSchema = mongoose.Schema({
    id_cliente: Number,
  nombre: String,
  email: String,
  contraseña: String,
  direccion: String,
  telefono: String,

  })

  //Definición del modelo
const userModel = mongoose.model('clientes', clienteSchema)

//Obtener Clientes
module.exports.obtenerTodos = async () => {
    try {
      const clientes = await userModel.find()
      console.log('-----Clientes-----')
      console.log(clientes)
    } catch (err) {
      console.log(err)
    }
  }

  //Obtener Clientes por nombre
module.exports.obtenerPorNombre = async (nombre) => {
    try {
      const clientes = await userModel.find({ nombre: nombre })
      console.log('-----Clientes-----')
      console.log(clientes)
    } catch (err) {
      console.log(err)
    }
  }
