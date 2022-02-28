const control = require('./control.js')
const productoAdmin = require('./productos.js')
const categoriaAdmin = require('./categorias.js')
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
