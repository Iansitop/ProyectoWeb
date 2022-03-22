const express = require('express')
const clientesController = require('../controllers/clientesController')

const router = express.Router()

router
  .route('/')
  .get(clientesController.obtenerTodos)
  .post(clientesController.agregarCliente)

router
  .route('/:id')
  .get(clientesController.obtenerPorID)
  .patch(clientesController.actualizarPorID)
  .delete(clientesController.borrarClientePorId)

module.exports = router
