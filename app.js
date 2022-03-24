const express = require('express')
const categoriasRoute = require('./routes/categoriasRoute')
const productosRoute = require('./routes/productosRoute')
const pagosRoute = require('./routes/pagosRoute')
const clientesRoute = require('./routes/clientesRoute')
const destinosRoute = require('./routes/destinosRoute')
const pedidosRoute = require('./routes/pedidosRoute')
const jwt = require('jsonwebtoken')
const keys = require('./settings/keys')

const app = express()

const appError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

app.set('key', keys.key)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/categorias', categoriasRoute)

app.use('/api/v1/productos', productosRoute)

app.use('/api/v1/pagos', pagosRoute)

app.use('/api/v1/clientes', clientesRoute)

app.use('/api/v1/destinos', destinosRoute)

app.use('/api/v1/pedidos', pedidosRoute)

app.use('/login', (req, res) => {
  if (req.body.usuario == 'admin' && req.body.pass == '12345') {
    const payload = {
      check: true,
    }
    const token = jwt.sign(payload, app.get('key'), {
      expiresIn: '1d',
    })
    res.json({
      message: '¡AUTENTICACIÓN EXITOSA!',
      token: token,
    })
  } else {
    res.json({
      message: 'EY, NO TE PASES DE LANZA >:(',
    })
  }
})

const verificacion = express.Router()
verificacion.use((req, res, next) => {
  let token = req.headers['x-acces.token'] || req.headers['authorization']
  if (!token) {
    res.status(401).send({
      error: ' Es necesario un token de autenticación',
    })
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
    console.log(token)
  }
  if (token) {
    jwt.verify(token, app.get('key'), (error, decoded) => {
      if (error) {
        return res.json({
          message: 'El token no es válido',
        })
      } else {
        res.decoded = decoded
        next()
      }
    })
  }
})

app.get('/info', verificacion, (req, res) => {
  res.json('INFORMACIÓN IMPORTANTE ENTREGADA')
})

app.post('*', (req, res) => {
  res.status(404).send(`<h1>No se pudo encontrar ${req.originalUrl}</h1>`)
})

app.use(globalErrorHandler)

module.exports = app
