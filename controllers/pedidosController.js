const pedidosModel = require('../models/pedidosModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
//Método para obtener Pedidos
exports.obtenerTodos = async (req, res, next) => {
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
exports.agregarPedido = catchAsync(async (req, res, next) => {
  try {
    const consulta = await pedidosModel.find()
    if (consulta.length != 0) {
      const ultimo = await pedidosModel.find().limit(1).sort({ $natural: -1 })
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
exports.obtenerPorID = catchAsync(async (req, res, next) => {
  console.log(req.params.id)
  const pedido = await destinosModel.findById(req.params.id)
  console.log('-----Pedidos-----')
  console.log(pedido)
  if (!pedido) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
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

exports.actualizarPorID = catchAsync(async (req, res, next) => {
  const pedido = await pedidosModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!pedido) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
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

exports.borrarPedidoPorId = catchAsync(async (req, res, next) => {
  const borrado = await pedidosModel.findByIdAndDelete(req.params.id)

  if (!borrado) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        pedido: borrado,
      },
    })
  }
})
