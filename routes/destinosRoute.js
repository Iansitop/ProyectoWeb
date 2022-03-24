const express = require('express')
const destinosController = require('../controllers/destinosController')

const router = express.Router()

router
  .route('/')
  .get(destinosController.obtenerTodos)
  .post(destinosController.agregarDestino)

router
  .route('/:id')
  .get(destinosController.obtenerPorID)
  .patch(destinosController.actualizarPorID)
  .delete(destinosController.borrarDestinoPorId)

//Hola Eli
module.exports = router
