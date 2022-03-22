const express = require('express')
const pedidosController = require('../controllers/pedidosController')

const router = express.Router()

router
  .route('/')
  .get(pedidosController.obtenerTodos)
  .post(pedidosController.agregarPedido)

router
  .route('/:id')
  .get(pedidosController.obtenerPorID)
  .patch(pedidosController.actualizarPorID)
  .delete(pedidosController.borrarPedidoPorId)

module.exports = router
