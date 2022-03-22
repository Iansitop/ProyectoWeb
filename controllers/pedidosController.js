const pedidosModel = require('../models/pedidosModel')
const catchAsync = require('../utils/catchAsync')

//Método para obtener Pedidos
exports.obtenerTodos = async (req, res) => {
  try {
    const pedidos = await pedidosModel.find()
    console.log('-----Pedidos-----')
    console.log(pedidos)
    res.status(201).json({
      status: 'success',
      data: {
        pedido: pedidos,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

//Agregar un Pedido
exports.agregarPedido = catchAsync(async (req, res) => {
  try {
    const consulta = await pedidosModel.find()
    if (consulta.length != 0) {
      const ultimo = await pedidosModel
        .find()
        .limit(1)
        .sort({ $natural: -1 })
      req.body.id_pedido = ultimo[0].id_pedido + 1
    } else {
      req.body.id_pedido = 0
    }
    console.log(req.body)
    const crearPedido = pedidosModel.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        pedido: crearPedido,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

//Método para obtener Pedido por ID
exports.obtenerPorID = catchAsync(async (req, res) => {
  console.log(req.params.id)
  const pedido = await destinosModel.findById(req.params.id)
  console.log('-----Pedidos-----')
  console.log(pedido)
  if (!pedido) {
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        pedido: pedido,
      },
    })
  }
})

//Método para actualizar Pedido

exports.actualizarPorID = catchAsync(async (req, res) => {
  const pedido = await pedidosModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!pedido) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
    console.log(error)
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        pedido: pedido,
      },
    })
  }
})

//Método para borrar Pedido

exports.borrarPedidoPorId = catchAsync(async (req, res) => {
  const borrado = await pedidosModel.findByIdAndDelete(req.params.id)

  if (!borrado) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
    console.log(error)
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        pedido: borrado,
      },
    })
  }
})
