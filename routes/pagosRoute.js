const express = require('express')
const pagosController = require('../controllers/pagosController')

const router = express.Router()

router
  .route('/')
  .get(pagosController.obtenerTodos)
  .post(pagosController.agregarPago)

router
  .route('/:id')
  .get(pagosController.obtenerPorID)
  .patch(pagosController.actualizarPorID)
  .delete(pagosController.borrarPagoPorId)

module.exports = router
