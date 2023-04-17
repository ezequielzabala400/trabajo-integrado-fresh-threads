const carritoListaProductos = document.querySelector('.carrito-lista-productos');
const totalCarrito = document.getElementById('total-carrito');
const comprarBtn = document.getElementById('comprar-btn');
const burbujaCarrito = document.querySelector('.burbuja-carrito');


let productoCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

const guardarAlLocalStorage = (array) => {
    localStorage.setItem('productosCarrito', JSON.stringify(array));
}



const renderizarProductoCarrito = ({title, image, id, total, talle}) => {
    return`
    <div class="card mb-3 carrito-producto bg-black text-light" style="max-width: 540px;">
                    <i class="bi bi-trash3 borrar-producto" data-deleteId="${id}"></i>
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${image}" class="img-fluid rounded-start" alt="${title}">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title carrito-producto__titulo">${title}</h5>
                          <p class="card-text">Talle: ${talle}</p>
                          <div data-contenedor="${id}" class="card-text d-flex justify-content-center align-items-center gap-3 btn-carrito-contenedor">
                            <button data-btn="${id}"class="btn btn-restar">-</button>
                            <span class="cantidad">${total}</span>
                            <button data-btn="${id}"class="btn btn-sumar">+</button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    `
}


const cargarBtnsSumarRestar = () => {
  const contenedoresBtns = document.querySelectorAll('.btn-carrito-contenedor');
  contenedoresBtns.forEach(contenedor => {
    const contenedorId = parseInt(contenedor.dataset.contenedor);
    contenedor.addEventListener('click', (e) => {
      if(!e.target.classList.contains('btn')) return;
      if(parseInt(e.target.dataset.btn) !== contenedorId) return;
    

      if(e.target.classList.contains('btn-sumar')){
        productoCarrito = productoCarrito.map(producto => {
          if(producto.id === contenedorId){
            return {
              ...producto,
              total: producto.total + 1,
              price: producto.price + (producto.price / producto.total)
            }
          } else return producto;
        })
        
        mostrarProductoCarrito();
        cargarBtnsSumarRestar();
        cargarBtnsBorrarProducto();
        guardarAlLocalStorage(productoCarrito);
        return;
      }

      if(e.target.classList.contains('btn-restar')){
        productoCarrito = productoCarrito.map(producto => {
          if(producto.id === contenedorId){
            if(producto.total < 2) {
              mostrarProductoCarrito();
              cargarBtnsSumarRestar();
              cargarBtnsBorrarProducto();
              return producto;
            };
            return{
              ...producto,
              total: producto.total - 1,
              price: producto.price - (producto.price / producto.total)
            }
          } else return producto;
        })
        mostrarProductoCarrito();
        cargarBtnsSumarRestar();
        cargarBtnsBorrarProducto();
        guardarAlLocalStorage(productoCarrito);
      }
    })
  })
}



const mostrarProductoCarrito = () => {
    carritoListaProductos.innerHTML = productoCarrito.map(producto => renderizarProductoCarrito(producto)).join('');
    const precios = productoCarrito.map(producto => producto.price);
    totalCarrito.textContent = '$ ' + convertirDolarAPeso(precios.reduce((valorPrevio,ValorActual) => valorPrevio += ValorActual,0));
  }





const cargarBtnsBorrarProducto = () => {
  const btnsDelete = document.querySelectorAll('.borrar-producto');
  btnsDelete.forEach(btn => {
    btn.addEventListener('click', borrarProductoCarrito)
  })
}

const borrarProductoCarrito = (e) => {
  Swal.fire({
    title: '¿Desea eliminar el producto?',
    text: "El producto será removido de la lista",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4638A6',
    cancelButtonColor: '#000000',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      let idProducto = parseInt(e.target.dataset.deleteid);
      productoCarrito = productoCarrito.filter(producto => producto.id !== idProducto)
      mostrarProductoCarrito();
      guardarAlLocalStorage(productoCarrito);
      cargarBtnsBorrarProducto();
      cargarBtnsSumarRestar();
      mostrarBurbuja();
      Swal.fire(
        'Eliminado!',
        'El producto se quitó de la lista.',
        'success'
      )
    }
  })
}



const comprarProductos = () => {
  if(productoCarrito.length === 0){
    Swal.fire(
      'Error',
      'El carrito está vacío',
      'error'
    )
    return;
  }

  Swal.fire({
    title: '¿Quiere finalizar la compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4638A6',
    cancelButtonColor: '#000000',
    confirmButtonText: 'Comprar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log('Los productos comprados son:');
      console.log(productoCarrito);
      productoCarrito = [];
      mostrarProductoCarrito();
      guardarAlLocalStorage(productoCarrito);
      mostrarBurbuja();
      Swal.fire(
        'Compra finalizada',
        'Muchas gracias por la compra y que lo disfrute :D.',
        'success'
      )
    }
  })
}

const mostrarBurbuja = () => {
  if(productoCarrito.length < 1){
    burbujaCarrito.classList.remove('mostrar-burbuja');
    burbujaCarrito.textContent = productoCarrito.length;
  }else {
    burbujaCarrito.classList.add('mostrar-burbuja');
    burbujaCarrito.textContent = productoCarrito.length;
  }
}

mostrarBurbuja();
mostrarProductoCarrito();

window.addEventListener('DOMContentLoaded', cargarBtnsBorrarProducto)
window.addEventListener('DOMContentLoaded', cargarBtnsSumarRestar)
comprarBtn.addEventListener('click', comprarProductos);



