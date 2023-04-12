const carritoListaProductos = document.querySelector('.carrito-lista-productos');
const totalCarrito = document.getElementById('total-carrito');
const productoCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

const guardarAlLocalStorage = (array) => {
    localStorage.setItem('productosCarrito', JSON.stringify(array));
}

const renderizarProductoCarrito = ({title, image}) => {
    return`
    <div class="card mb-3 carrito-producto bg-black text-light" style="max-width: 540px;">
                    <i class="bi bi-trash3"></i>
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${image}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title carrito-producto__titulo">${title}</h5>
                          <p class="card-text">Talle: Xl</p>
                          <div class="card-text d-flex justify-content-center align-items-center gap-3">
                            <button class="btn">-</button>
                            <span>1</span>
                            <button class="btn">+</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    `
}

const mostrarProductoCarrito = () => {
    carritoListaProductos.innerHTML = productoCarrito.map(producto => renderizarProductoCarrito(producto)).join('');
    const precios = productoCarrito.map(producto => producto.price);
    totalCarrito.textContent = convertirDolarAPeso(precios.reduce((valorPrevio,ValorActual) => valorPrevio += ValorActual));
}

mostrarProductoCarrito();


