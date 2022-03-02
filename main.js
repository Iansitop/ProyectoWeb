const control = require('./control.js')
const categoriaAdmin = require('./categorias.js')
const productoAdmin = require('./productos.js')
const clienteAdmin = require('./clientes.js')
const destinoAdmin = require('./destinos.js')
const pagoAdmin = require('./pagos.js')
const pedidoAdmin = require('./pedidos.js')
control.con()

const categoria = {
  nombre: 'frutas',
}
const producto = {
  nombre: 'fresa',
  precio: '6.50',
  categoria: categoria,
}
const pago = {
  numTarjeta: 1243459823471239,
  propietario: 'Ian Salas López',
  mesCaducidad: 3,
  anioCaducidad: 2023,
}
const cliente = {
  nombre: 'Ian Salas López',
  email: 'iansalas@outlook.com',
  contraseña: 'jijijaja',
  direccion: '300 y Colima',
  pagos: [pago],
}
const destino = {
  pais: 'México',
  estado: 'Sonora',
  colonia: 'Centro',
  calle: 'Colima',
  numCasa: '127',
  telefono: '6441898185',
  cliente: cliente,
}

const pedido = {
  estadoPedido: 'En proceso',
  fechaCompra: '2022-11-03',
  fechaEntrega: '2022-11-13',
  productos: [producto],
  cliente: cliente,
  pago: pago,
}

/////////////AGREGADO/////////////
/*
categoriaAdmin.agregarCategoria(categoria)
productoAdmin.agregarProducto(producto)
pagoAdmin.agregarPago(pago)
clienteAdmin.agregarCliente(cliente)
destinoAdmin.agregarDestino(destino)
pedidoAdmin.agregarPedido(pedido)
*/
/////////////ACTUALIZADO/////////////
/*
categoria.nombre = 'electrodomesticos'
categoriaAdmin.actualizarPorNombre('frutas', categoria)
producto.nombre = 'locomotora'
productoAdmin.actualizarPorNombre('fresa', producto)
cliente.nombre = 'Elizabeth Flores'
clienteAdmin.actualizarPorNombre('Ian Salas López', cliente)
destino.pais = 'Russia'
destinoAdmin.actualizarPorID(0, destino)
pago.propietario = 'Elizabeth Flores'
pagoAdmin.actualizarPorID(0, pago)
pedido.estadoPedido = 'Pendiente'
pedidoAdmin.actualizarPorID(0, pedido)
*/
/////////////BORRADO/////////////
/*
categoriaAdmin.borrarCategoriaPorNombre('electrodomesticos')
productoAdmin.borrarProductoPorNombre('locomotora')
clienteAdmin.borrarClientePorNombre('Elizabeth Flores')
destinoAdmin.borrardestinoPorID(0)
pagoAdmin.borrarPagoPorID(0)
pedidoAdmin.borrarPedidoPorID(0)
*/
