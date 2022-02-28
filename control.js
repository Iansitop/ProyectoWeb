const mongoose = require('mongoose')
//url de la base de datos
const url =
  'mongodb+srv://ian:W6uKiTT3TTfSv9K@proyectoweb.neilh.mongodb.net/ProyectoWeb?retryWrites=true&w=majority'
//Conectarse al url de mongoAtlas
module.exports.con = async () => {
  try {
    await mongoose.connect(url)
    console.log('Conexión exitosa')
  } catch (err) {
    console.log(err)
  }
}
