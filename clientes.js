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

//Agregar a un Cliente
module.exports.agregarCliente = async (cliente) => {
  try {
    if ((await userModel.find().length) != 0) {
      const ultimo = await userModel.find().limit(1).sort({ $natural: -1 })
      cliente.id_cliente = ultimo[0].id_cliente + 1
    } else {
      cliente.id_cliente = 0
    }
    const crearCliente = new userModel(cliente)
    const result = await crearCliente.save()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

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

  //Actualizar clientes por nombre
module.exports.actualizarPorNombre = async (nombre, cliente) => {
    try {
      const actualizarCliente = await userModel.updateOne(
        { nombre: nombre },
        {
          $set: {
            
            nombre: cliente.nombre,
            email: cliente.email,
            contraseña: cliente.contraseña,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
          },
        }
      )
      console.log('Actualizado Correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  //Eliminar Clientes
module.exports.borrarCliente = async (nombre) => {
    try {
      const borrado = await userModel.deleteOne({ nombre: nombre })
      console.log('Borrado Exitoso')
    } catch (error) {
      console.log(error)
    }
  }