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
const userModel = mongoose.model('destinos', destinoSchema)
//Método para obtener destinos
module.exports.obtenerTodos = async () => {
  try {
    const destinos = await userModel.find()
    console.log('-----Destinos-----')
    console.log(destinos)
  } catch (err) {
    console.log(err)
  }
}
//Agregar a un destino
module.exports.agregardestino = async (destino) => {
  try {
    if ((await userModel.find().length) != 0) {
      const ultimo = await userModel.find().limit(1).sort({ $natural: -1 })
      destino.id_destino = ultimo[0].id_destino + 1
    } else {
      destino.id_destino = 0
    }
    const creardestino = new userModel(destino)
    const result = await creardestino.save()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
//Obtener destinos por ID
module.exports.obtenerPorID = async (id_destino) => {
  try {
    const destinos = await userModel.find({ id_destino: id_destino })
    console.log('-----Destinos-----')
    console.log(destinos)
  } catch (err) {
    console.log(err)
  }
}
//Método para actualizar destinos
module.exports.actualizarPorID = async (id_destino, destino) => {
  try {
    await userModel.updateOne(
      { id_destino: id_destino },
      {
        $set: {
          pais: destino.pais,
          estado: destino.estado,
          colonia: destino.colonia,
          calle: destino.calle,
          numCasa: destino.numCasa,
          telefono: destino.telefono,
          cliente: destino.cliente,
        },
      }
    )
    console.log('Actualizado Correctamente')
  } catch (error) {
    console.log(error)
  }
}
//Método para borrar destinos
module.exports.borrardestinoPorID = async (id_destino) => {
  try {
    await userModel.deleteOne({ id_destino: id_destino })
    console.log('Borrado Exitosamente')
  } catch (error) {
    console.log(error)
  }
}
