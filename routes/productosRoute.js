const express = require('express')
const productoController = require('../controllers/productosController')

const router = express.Router()

router
  .route('/')
  .get(productoController.obtenerTodos)
  .post(productoController.agregarProducto)

router
  .route('/:id')
  .get(productoController.obtenerPorID)
  .patch(productoController.actualizarPorID)
  .delete(productoController.borrarProductoPorId)

module.exports = router
