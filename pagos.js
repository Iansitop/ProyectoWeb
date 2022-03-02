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
const userModel = mongoose.model('pagos', pagoSchema)
//Método para obtener pagos
module.exports.obtenerTodos = async () => {
  try {
    const pagos = await userModel.find()
    console.log('-----Pagos-----')
    console.log(pagos)
  } catch (err) {
    console.log(err)
  }
}
//Agregar a un pago
module.exports.agregarPago = async (pago) => {
  try {
    const consulta = await userModel.find()
    if (consulta.length != 0) {
      const ultimo = await userModel.find().limit(1).sort({ $natural: -1 })
      pago.id_pago = ultimo[0].id_pago + 1
    } else {
      pago.id_pago = 0
    }
    const crearpago = new userModel(pago)
    const result = await crearpago.save()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
//Obtener pagos por ID
module.exports.obtenerPorID = async (id_pago) => {
  try {
    const pagos = await userModel.find({ id_pago: id_pago })
    console.log('-----Pagos-----')
    console.log(pagos)
  } catch (err) {
    console.log(err)
  }
}
//Método para actualizar pagos
module.exports.actualizarPorID = async (id_pago, pago) => {
  try {
    await userModel.updateOne(
      { id_pago: id_pago },
      {
        $set: {
          numTarjeta: pago.numTarjeta,
          propietario: pago.propietario,
          mesCaducidad: pago.mesCaducidad,
          anioCaducidad: pago.anioCaducidad,
        },
      }
    )
    console.log('Actualizado Correctamente')
  } catch (error) {
    console.log(error)
  }
}
//Método para borrar pago
module.exports.borrarPagoPorID = async (id_pago) => {
  try {
    await userModel.deleteOne({ id_pago: id_pago })
    console.log('Borrado Exitosamente')
  } catch (error) {
    console.log(error)
  }
}
