const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('items');
const listaProductos = document.querySelector('#favoritos');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventos();

function cargarEventos() {
    //Se ejecuta cuando se presionar agregar carrito
    productos.addEventListener('click', (e) => { carro.comprarProducto(e) });

    //Cuando se elimina productos del carrito
    carrito.addEventListener('click', (e) => { carro.eliminarProducto(e) });

    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    productos.addEventListener('click', (e) => { carro.compartir(e) });

}