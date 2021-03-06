const destinosModel = require('../models/destinosModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
//Método para obtener Destinos
exports.obtenerTodos = async (req, res, next) => {
  try {
    const destinos = await destinosModel.find()
    console.log('-----Destinos-----')
    console.log(destinos)
    res.status(201).json({
      status: 'success',
      data: {
        destino: destinos,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

//Agregar un Destino
exports.agregarDestino = catchAsync(async (req, res, next) => {
  try {
    const consulta = await destinosModel.find()
    if (consulta.length != 0) {
      const ultimo = await destinosModel.find().limit(1).sort({ $natural: -1 })
      req.body.id_destino = ultimo[0].id_destino + 1
    } else {
      req.body.id_destino = 0
    }
    console.log(req.body)
    const crearDestino = destinosModel.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        destino: crearDestino,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

//Método para obtener Destino por ID
exports.obtenerPorID = catchAsync(async (req, res, next) => {
  console.log(req.params.id)
  const destino = await destinosModel.findById(req.params.id)
  console.log('-----Destinos-----')
  console.log(destino)
  if (!destino) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        destino: destino,
      },
    })
  }
})

//Método para actualizar Destino

exports.actualizarPorID = catchAsync(async (req, res, next) => {
  const destino = await destinosModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!destino) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        destino: destino,
      },
    })
  }
})

//Método para borrar Destino

exports.borrarDestinoPorId = catchAsync(async (req, res, next) => {
  const borrado = await destinosModel.findByIdAndDelete(req.params.id)

  if (!borrado) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        destino: borrado,
      },
    })
  }
})
