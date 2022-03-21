const pagosModel = require('../models/pagosModel')
const catchAsync = require('../utils/catchAsync')

//Método para obtener pagos
exports.obtenerTodos = async (req, res) => {
  try {
    const pagos = await pagosModel.find()
    console.log('-----Pagos-----')
    console.log(pagos)
    res.status(201).json({
      status: 'success',
      data: {
        pago: pagos,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
//Agregar a un pago
exports.agregarPago = catchAsync(async (req, res) => {
  try {
    const consulta = await pagosModel.find()
    if (consulta.length != 0) {
      const ultimo = await pagosModel.find().limit(1).sort({ $natural: -1 })
      req.body.id_pago = ultimo[0].id_pago + 1
    } else {
      req.body.id_pago = 0
    }
    const existentes = await pagosModel.find({
      numTarjeta: req.body.numTarjeta,
    })
    if (existentes.length != 0) {
      console.log(existentes.length)
      res.status(417).json({
        status: 'fail',
        message: `Ya hay un pago con el número de tarjeta ${req.body.numTarjeta}`,
      })
      return
    }
    console.log(req.body)
    const crearPago = pagosModel.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        pago: crearPago,
      },
    })
  } catch (error) {
    console.log(error)
  }
})
//Método para obtener pagos por nombre
exports.obtenerPorID = catchAsync(async (req, res) => {
  console.log(req.params.id)
  const pago = await pagosModel.findById(req.params.id)
  console.log('-----pagos-----')
  console.log(pago)
  if (!pago) {
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        pago: pago,
      },
    })
  }
})
//Método para actualizar pagos
exports.actualizarPorID = catchAsync(async (req, res) => {
  const pago = await pagosModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!pago) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
    console.log(error)
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        pago: pago,
      },
    })
  }
})
//Método para borrar pagos
exports.borrarPagoPorId = catchAsync(async (req, res) => {
  const borrado = await pagosModel.findByIdAndDelete(req.params.id)

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
        pago: borrado,
      },
    })
  }
})
