const categoriasModel = require('../models/categoriasModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

//Método para obtener categorias
exports.obtenerTodos = async (req, res, next) => {
  try {
    const categorias = await categoriasModel.find()
    console.log('-----Categorias-----')
    console.log(categorias)
    res.status(201).json({
      status: 'success',
      data: {
        categoria: categorias,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
//Agregar a un categoria
exports.agregarCategoria = catchAsync(async (req, res, next) => {
  try {
    const consulta = await categoriasModel.find()
    if (consulta.length != 0) {
      const ultimo = await categoriasModel
        .find()
        .limit(1)
        .sort({ $natural: -1 })
      req.body.id_categoria = ultimo[0].id_categoria + 1
    } else {
      req.body.id_categoria = 0
    }
    const existentes = await categoriasModel.find({ nombre: req.body.nombre })
    if (existentes.length != 0) {
      res.status(417).json({
        status: 'fail',
        message: `Ya hay una categoria llamada ${req.body.nombre}`,
      })
      return
    }
    console.log(req.body)
    const crearCategoria = categoriasModel.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        categoria: crearCategoria,
      },
    })
  } catch (error) {
    console.log(error)
  }
})
//Método para obtener categorias por nombre
exports.obtenerPorID = catchAsync(async (req, res, next) => {
  console.log(req.params.id)
  const categoria = await categoriasModel.findById(req.params.id)
  console.log('-----Categorias-----')
  console.log(categoria)
  if (!categoria) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        categoria: categoria,
      },
    })
  }
})
//Método para actualizar categorias
exports.actualizarPorID = catchAsync(async (req, res, next) => {
  const categoria = await categoriasModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!categoria) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        categoria: categoria,
      },
    })
  }
})
//Método para borrar categorias
exports.borrarCategoriaPorId = catchAsync(async (req, res, next) => {
  const borrado = await categoriasModel.findByIdAndDelete(req.params.id)

  if (!borrado) {
    return next(
      new AppError(`No hay categorias con el id: ${req.params.id}`, 404)
    )
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        categoria: borrado,
      },
    })
  }
})
