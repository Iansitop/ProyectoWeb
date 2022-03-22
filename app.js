const express = require('express')
const categoriasRoute = require('./routes/categoriasRoute')
const productosRoute = require('./routes/productosRoute')
const pagosRoute = require('./routes/pagosRoute')
const clientesRoute = require('./routes/clientesRoute')
const destinosRoute = require('./routes/destinosRoute')
const pedidosRoute = require('./routes/pedidosRoute')

const app = express()

app.use(express.json())

app.use('/categorias', categoriasRoute)

app.use('/productos', productosRoute)

app.use('/pagos', pagosRoute)

app.use('/clientes', clientesRoute)

app.use('/destinos', destinosRoute)

app.use('/pedidos', pedidosRoute)

app.post('*', (req, res) => {
  res.status(404).send(`<h1>No se pudo encontrar ${req.originalUrl}</h1>`)
})

module.exports = app
