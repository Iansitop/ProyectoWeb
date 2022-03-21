const express = require('express')
const categoriaController = require('../controllers/categoriasController')

const router = express.Router()

router
  .route('/')
  .get(categoriaController.obtenerTodos)
  .post(categoriaController.agregarCategoria)

router
  .route('/:id')
  .get(categoriaController.obtenerPorID)
  .patch(categoriaController.actualizarPorID)
  .delete(categoriaController.borrarCategoriaPorId)

module.exports = router
