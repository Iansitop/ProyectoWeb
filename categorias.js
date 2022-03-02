const mongoose = require('mongoose')
//Esquema para categoria
const categoriaSchema = mongoose.Schema({
  id_categoria: Number,
  nombre: String,
})
//Definición del modelo
const userModel = mongoose.model('categorias', categoriaSchema)
//Método para obtener categorias
module.exports.obtenerTodos = async () => {
  try {
    const categorias = await userModel.find()
    console.log('-----Categorias-----')
    console.log(categorias)
  } catch (err) {
    console.log(err)
  }
}
//Agregar a un categoria
module.exports.agregarCategoria = async (categoria) => {
  try {
    if ((await userModel.find().length) != 0) {
      const ultimo = await userModel.find().limit(1).sort({ $natural: -1 })
      categoria.id_categoria = ultimo[0].id_categoria + 1
    } else {
      categoria.id_categoria = 0
    }
    if ((await userModel.find({ nombre: categoria.nombre })).length != 0) {
      console.log(`Ya hay una categoria llamada ${categoria.nombre}`)
      return
    }
    const crearcategoria = new userModel(categoria)
    const result = await crearcategoria.save()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
//Método para obtener categorias por nombre
module.exports.obtenerPorNombre = async (nombre) => {
  try {
    const categorias = await userModel.find({ nombre: nombre })
    console.log('-----Categorias-----')
    console.log(categorias)
  } catch (err) {
    console.log(err)
  }
}
//Método para actualizar categorias
module.exports.actualizarPorNombre = async (nombre, categoria) => {
  try {
    await userModel.updateOne(
      { nombre: nombre },
      {
        $set: {
          nombre: categoria.nombre,
        },
      }
    )
    console.log('Actualizado Correctamente')
  } catch (error) {
    console.log(error)
  }
}
//Método para borrar categorias
module.exports.borrarCategoriaPorNombre = async (nombre) => {
  try {
    await userModel.deleteOne({ nombre: nombre })
    console.log('Borrado Exitosamente')
  } catch (error) {
    console.log(error)
  }
}
