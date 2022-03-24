const clientesModel = require('../models/clientesModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
//Método para obtener Clientes
exports.obtenerTodos = async (req, res, next) => {
  try {
    const clientes = await clientesModel.find()
    console.log('-----Clientes-----')
    console.log(clientes)
    res.status(201).json({
      status: 'success',
      data: {
        cliente: clientes,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
//Agregar a un Cliente
exports.agregarCliente = catchAsync(async (req, res, next) => {
  try {
    const consulta = await clientesModel.find()
    if (consulta.length != 0) {
      const ultimo = await clientesModel.find().limit(1).sort({ $natural: -1 })
      req.body.id_cliente = ultimo[0].id_cliente + 1
    } else {
      req.body.id_cliente = 0
    }
    console.log(req.body)
    const crearCliente = clientesModel.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        cliente: crearCliente,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

//Método para obtener Cliente por ID
exports.obtenerPorID = catchAsync(async (req, res, next) => {
  console.log(req.params.id)
  const cliente = await clientesModel.findById(req.params.id)
  console.log('-----Clientes-----')
  console.log(cliente)
  if (!cliente) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        cliente: cliente,
      },
    })
  }
})

//Método para actualizar Cliente

exports.actualizarPorID = catchAsync(async (req, res, next) => {
  const cliente = await clientesModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!cliente) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        cliente: cliente,
      },
    })
  }
})

//Método para borrar Cliente

exports.borrarClientePorId = catchAsync(async (req, res, next) => {
  const borrado = await clientesModel.findByIdAndDelete(req.params.id)

  if (!borrado) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        cliente: borrado,
      },
    })
  }
})
