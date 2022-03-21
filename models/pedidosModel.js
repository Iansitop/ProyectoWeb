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
//Esquema para Pedido
const pedidoSchema = mongoose.Schema({
  id_pedido: Number,
  estadoPedido: String,
  fechaCompra: Date,
  fechaEntrega: Date,
  productos: [productoSchema],
  cliente: clienteSchema,
  pago: pagoSchema,
})
//Definición del modelo
const userModel = mongoose.model('pedidos', pedidoSchema)
//Agregar un Pedido
module.exports.agregarPedido = async (pedido) => {
  try {
    const consulta = await userModel.find()
    if (consulta.length != 0) {
      const ultimo = await userModel.find().limit(1).sort({ $natural: -1 })
      pedido.id_pedido = ultimo[0].id_pedido + 1
    } else {
      pedido.id_pedido = 0
    }
    const crearPedido = new userModel(pedido)
    const result = await crearPedido.save()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
//Obtener Pedidos
module.exports.obtenerTodos = async () => {
  try {
    const pedidos = await userModel.find()
    console.log('-----Pedidos-----')
    console.log(pedidos)
  } catch (err) {
    console.log(err)
  }
}
//Obtener Pedidos por ID
module.exports.obtenerPorID = async (id_pedido) => {
  try {
    const pedidos = await userModel.find({ id_pedido: id_pedido })
    console.log('-----Pedidos-----')
    console.log(pedidos)
  } catch (err) {
    console.log(err)
  }
}
//Actualizar Pedidos por ID
module.exports.actualizarPorID = async (id_pedido, pedido) => {
  try {
    await userModel.updateOne(
      { id_pedido: id_pedido },
      {
        $set: {
          estadoPedido: pedido.estadoPedido,
          fechaCompra: pedido.fechaCompra,
          fechaEntrega: pedido.fechaEntrega,
          productos: pedido.productos,
          pago: pedido.pago,
          cliente: pedido.cliente,
        },
      }
    )
    console.log('Actualizado Correctamente')
  } catch (error) {
    console.log(error)
  }
}
//Eliminar Pedidos
module.exports.borrarPedidoPorID = async (id_pedido) => {
  try {
    await userModel.deleteOne({ id_pedido: id_pedido })
    console.log('Borrado Exitoso')
  } catch (error) {
    console.log(error)
  }
}
