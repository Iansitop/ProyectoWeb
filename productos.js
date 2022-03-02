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
const userModel = mongoose.model('productos', productoSchema)
//Agregar a un producto
module.exports.agregarProducto = async (producto) => {
  try {
    const consulta = await userModel.find()
    if (consulta.length != 0) {
      const ultimo = await userModel.find().limit(1).sort({ $natural: -1 })
      producto.id_producto = ultimo[0].id_producto + 1
    } else {
      producto.id_producto = 0
    }
    if ((await userModel.find({ nombre: producto.nombre })).length != 0) {
      console.log(`Ya hay un producto llamado ${producto.nombre}`)
      return
    }
    const crearProducto = new userModel(producto)
    const result = await crearProducto.save()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
//Método para obtener productos
module.exports.obtenerTodos = async () => {
  try {
    const productos = await userModel.find()
    console.log('-----Productos-----')
    console.log(productos)
  } catch (err) {
    console.log(err)
  }
}
//Método para obtener productos por nombre
module.exports.obtenerPorNombre = async (nombre) => {
  try {
    const productos = await userModel.find({ nombre: nombre })
    console.log('-----Productos-----')
    console.log(productos)
  } catch (err) {
    console.log(err)
  }
}
//Método para actualizar productos
module.exports.actualizarPorNombre = async (nombre, producto) => {
  try {
    await userModel.updateOne(
      { nombre: nombre },
      {
        $set: {
          nombre: producto.nombre,
          precio: producto.precio,
          unidades: producto.unidades,
        },
      }
    )
    console.log('Actualizado Correctamente')
  } catch (error) {
    console.log(error)
  }
}
//Método para borrar productos
module.exports.borrarProductoPorNombre = async (nombre) => {
  try {
    await userModel.deleteOne({ nombre: nombre })
    console.log('Borrado Exitosamente')
  } catch (error) {
    console.log(error)
  }
}
