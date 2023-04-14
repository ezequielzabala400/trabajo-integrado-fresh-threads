const carritoListaProductos = document.querySelector('.carrito-lista-productos');
const totalCarrito = document.getElementById('total-carrito');


let productoCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

const guardarAlLocalStorage = (array) => {
    localStorage.setItem('productosCarrito', JSON.stringify(array));
}



const renderizarProductoCarrito = ({title, image, id, total}) => {
    return`
    <div class="card mb-3 carrito-producto bg-black text-light" style="max-width: 540px;">
                    <i class="bi bi-trash3 borrar-producto" data-deleteId="${id}"></i>
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${image}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title carrito-producto__titulo">${title}</h5>
                          <p class="card-text">Talle: Xl</p>
                          <div data-contenedor="${id}" class="card-text d-flex justify-content-center align-items-center gap-3 btn-carrito-contenedor">
                            <button class="btn btn-restar btn-restar--limite">-</button>
                            <span class="cantidad">${total}</span>
                            <button class="btn btn-sumar">+</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    `
}

const cargarBtnsSumarRestar = () => {
  const contenedorDeBotonesCarrito = document.querySelectorAll('.btn-carrito-contenedor');
  console.log(contenedorDeBotonesCarrito);
  contenedorDeBotonesCarrito.forEach(contenedor => {
    contenedor.addEventListener('click', (e) => {
      const productoCantidad = productoCarrito.find(producto => producto.id === parseInt(contenedor.dataset.contenedor));
      console.log(productoCantidad);
      let contador = productoCantidad.total;
      let cantidad = contenedor.querySelector('.cantidad');
      const btnRestar = contenedor.querySelector('.btn-restar');
      
      
      if(e.target.classList.contains('btn-restar')){
        if(contador < 2) {
          btnRestar.classList.add('btn-restar--limite');
          return;
        };
        btnRestar.classList.remove('btn-restar--limite');

        
        contador++;
        
        return;
      }else if(e.target.classList.contains('btn-sumar')){
        btnRestar.classList.remove('btn-restar--limite');
       
        contador--;
      }
    })
  })
}

const mostrarProductoCarrito = () => {
    carritoListaProductos.innerHTML = productoCarrito.map(producto => renderizarProductoCarrito(producto)).join('');
    const precios = productoCarrito.map(producto => producto.price);
    totalCarrito.textContent = convertirDolarAPeso(precios.reduce((valorPrevio,ValorActual) => valorPrevio += ValorActual,0));
    cargarBtnsSumarRestar();
  }

mostrarProductoCarrito();

const cargarBtnsBorrarProducto = () => {
  const btnsDelete = document.querySelectorAll('.borrar-producto');
  btnsDelete.forEach(btn => {
    btn.addEventListener('click', borrarProductoCarrito)
  })
}

const borrarProductoCarrito = (e) => {
  let idProducto = parseInt(e.target.dataset.deleteid);
  productoCarrito = productoCarrito.filter(producto => producto.id !== idProducto)
  console.log(productoCarrito);
  mostrarProductoCarrito(productoCarrito);
  guardarAlLocalStorage(productoCarrito);
  cargarBtnsBorrarProducto();
  cargarBtnsSumarRestar();
}


window.addEventListener('DOMContentLoaded', cargarBtnsBorrarProducto)
window.addEventListener('DOMContentLoaded', cargarBtnsSumarRestar);

