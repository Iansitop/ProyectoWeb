const productosModel = require('../models/productosModel')
const catchAsync = require('../utils/catchAsync')

//Método para obtener productos
exports.obtenerTodos = async (req, res) => {
  try {
    const productos = await productosModel.find()
    console.log('-----Productos-----')
    console.log(productos)
    res.status(201).json({
      status: 'success',
      data: {
        producto: productos,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
//Agregar a un producto
exports.agregarProducto = catchAsync(async (req, res) => {
  try {
    const consulta = await productosModel.find()
    if (consulta.length != 0) {
      const ultimo = await productosModel.find().limit(1).sort({ $natural: -1 })
      req.body.id_producto = ultimo[0].id_producto + 1
    } else {
      req.body.id_producto = 0
    }
    const existentes = await productosModel.find({ nombre: req.body.nombre })
    if (existentes.length != 0) {
      res.status(417).json({
        status: 'fail',
        message: `Ya hay una producto llamada ${req.body.nombre}`,
      })
      return
    }
    console.log(req.body)
    const crearProducto = productosModel.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        producto: crearProducto,
      },
    })
  } catch (error) {
    console.log(error)
  }
})
//Método para obtener productos por nombre
exports.obtenerPorID = catchAsync(async (req, res) => {
  console.log(req.params.id)
  const producto = await productosModel.findById(req.params.id)
  console.log('-----productos-----')
  console.log(producto)
  if (!producto) {
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        producto: producto,
      },
    })
  }
})
//Método para actualizar productos
exports.actualizarPorID = catchAsync(async (req, res) => {
  const producto = await productosModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!producto) {
    res.status(404).json({
      status: 'fail',
      message: error,
    })
    console.log(error)
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        producto: producto,
      },
    })
  }
})
//Método para borrar productos
exports.borrarProductoPorId = catchAsync(async (req, res) => {
  const borrado = await productosModel.findByIdAndDelete(req.params.id)

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
        producto: borrado,
      },
    })
  }
})
