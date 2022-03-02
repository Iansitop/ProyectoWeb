const control = require('./control.js')
const productoAdmin = require('./productos.js')
const categoriaAdmin = require('./categorias.js')
const clienteAdmin = require('./clientes.js')
const destinoAdmin = require('./destinos.js')
const pagoAdmin = require('./pagos.js')
const pedidoAdmin = require('./pedidos.js')
control.con()
/*
const producto = {
  nombre: 'fresa',
  precio: '6.50',
  categoria: { id_categoria: 0, nombre: 'frutas' },
}
*/
const categoria = {
  id_categoria: 0,
  nombre: 'verduras',
}

categoriaAdmin.borrarCategoria('electrodomesticos')
