const mongoose = require('mongoose')

const app = require('./app')

const port = 1500
const db =
  'mongodb+srv://ian:W6uKiTT3TTfSv9K@proyectoweb.neilh.mongodb.net/ProyectoWeb?retryWrites=true&w=majority'

const con = async () => {
  try {
    await mongoose.connect(db)
    console.log('Conexión exitosa')
  } catch (error) {
    console.log(err)
  }
}

app.listen(port, () => {
  console.log(`App running in port: ${port}`)
})

con()
