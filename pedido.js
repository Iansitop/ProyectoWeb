const mongoose = require('mongoose')
//Creando schemas
//Esquema para Pedido
const categoriaSchema = mongoose.Schema({
    id_pedido: Number,
    destino: String,
    paqueteria: String,
    fechaCompra: Date,
    fechaEntrega: Date,
    estado: String
  })

  //Esquema para Pedido
const pedidosSchema = mongoose.Schema({
    id_pedido: Number,
    destino: String,
    paqueteria: String,
    fechaCompra: Date,
    fechaEntrega: Date,
    estado: String,
    producto: productoSchema,
    cliente: clienteSchema,
  })

  //Definición del modelo
const userModel = mongoose.model('pedidos', pedidoSchema)

//Agregar un Pedido
module.exports.agregarPedido = async (pedido) => {
    try {
      if ((await userModel.find().length) != 0) {
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
      const actualizarPedido = await userModel.updateOne(
        { id_pedido: id_pedido },
        {
          $set: {
            destino: pedido.destino,
            paqueteria: pedido.paqueteria,
            fechaCompra: pedido.fechaCompra,
            fechaEntrega: pedido.fechaEntrega,
            estado: pedido.estado
          },
        }
      )
      console.log('Actualizado Correctamente')
    } catch (error) {
      console.log(error)
    }
  }
//Eliminar Pedidos
module.exports.borrarPedido = async (id_pedido) => {
    try {
      const borrado = await userModel.deleteOne({ id_pedido: id_pedido })
      console.log('Borrado Exitoso')
    } catch (error) {
      console.log(error)
    }
  }


