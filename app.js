const express = require('express')
const categoriasRoute = require('./routes/categoriasRoute')
const productosRoute = require('./routes/productosRoute')
const pagosRoute = require('./routes/pagosRoute')
const clientesRoute = require('./routes/clientesRoute')
const destinosRoute = require('./routes/destinosRoute')
const pedidosRoute = require('./routes/pedidosRoute')

const app = express()

const appError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

app.use(express.json())

app.use('/api/v1/categorias', categoriasRoute)

app.use('/api/v1/productos', productosRoute)

app.use('/api/v1/pagos', pagosRoute)

app.use('/api/v1/clientes', clientesRoute)

app.use('/api/v1/destinos', destinosRoute)

app.use('/api/v1/pedidos', pedidosRoute)

app.post('*', (req, res) => {
  res.status(404).send(`<h1>No se pudo encontrar ${req.originalUrl}</h1>`)
})

app.use(globalErrorHandler)

module.exports = app
