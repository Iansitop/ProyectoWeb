const express = require('express')
const categoriasRoute = require('./routes/categoriasRoute')
const productosRoute = require('./routes/productosRoute')
const pagosRoute = require('./routes/pagosRoute')

const app = express()

app.use(express.json())

app.use('/categorias', categoriasRoute)

app.use('/productos', productosRoute)

app.use('/pagos', pagosRoute)

app.post('*', (req, res) => {
  res.status(404).send(`<h1>No se pudo encontrar ${req.originalUrl}</h1>`)
})

module.exports = app
