const productosContenedor = document.querySelector('.productos-contenedor');
const verMasBtn = document.getElementById('ver-mas');
const contenedorBtnCategorias = document.getElementById('contenedor__btn--categorias');
const btnsCategorias = document.querySelectorAll('.btn--categorias');


const renderizarProducto = ({ id, title, image, price, description}) => {
    return`
    <div class="card productos__card" style="width: 18rem;">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title" title="${title}">${title}</h5>
                  <p class="card-text card__info" title="${description}">${description}</p>
                  <div class="d-flex justify-content-between pb-4">
                    <label>Elegí tu talle:</label>
                    <select name="talle" class="d-block bg-black text-light rounded-2 w-50 talle">
                      <option name="talle" value="S">S</option>
                      <option name="talle" value="M">M</option>
                      <option name="talle" value="L">L</option>
                      <option name="talle" value="XL">XL</option>
                      <option name="talle" value="XXL">XXL</option>
                    </select>
                    

                  </div>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <p class="fw-bold">Precio: $${convertirDolarAPeso(price)} Ars</p>
                    <button type="button" class="btn btn-outline-light btn-agregar" data-producto="${id}">Añadir</button>
                  </div>
                </div>
              </div>
    `
}

const productosPartes = [];


let productosControles = {
    tamanio: 6,
    comienzo: 0
}


const mostrarProductos = async (tamanio = 6, comienzo = 0) => {
    const productos = await filtrarProductos();
    for(let i = comienzo; i < tamanio; i++){
        if(productos[i] === undefined) continue;
        productosPartes.push(productos[i]);
    }
    productosContenedor.innerHTML = productosPartes.map(producto => renderizarProducto(producto)).join('');
    cargarBtnsProductoCarrito();
  }



const mostrarMasProductos = () => {
        productosControles = {...productosControles, comienzo: productosControles.tamanio,tamanio: productosControles.tamanio+=3}
        mostrarProductos(productosControles.tamanio, productosControles.comienzo);
        mostrarMasBtn();
    }

const mostrarMasBtn = (id = 'all') => {

      if(id !== 'all'){
        verMasBtn.classList.add('ver-mas-oculto');
      } else{
        verMasBtn.classList.remove('ver-mas-oculto');
      }
    
    if(productosPartes.length > 9){
        verMasBtn.classList.add('ver-mas-oculto');
    }
}

const mostrarProductosPorCategoria = async (id) => {
  
  const productos = await filtrarProductos();
  const productosCategoria = productos.filter(producto => producto.category == id);
  productosContenedor.innerHTML = productosCategoria.map(producto => renderizarProducto(producto)).join('');
  cargarBtnsProductoCarrito();
}

const seleccionarCategoria = (e) => {
  if(!e.target.classList.contains('btn--categorias')) return;
  btnsCategorias.forEach(btn => {
    if(btn.classList.contains('btn--categorias--activo')){
      if(e.target.classList.contains('btn--categorias--activo')) return;
      btn.classList.remove('btn--categorias--activo');
      e.target.classList.add('btn--categorias--activo');
      let id = e.target.dataset.id;
      mostrarMasBtn(id);
      if(id === 'all'){
        mostrarMasProductos();
      }else{
        mostrarProductosPorCategoria(id);
      }
    }
  })
}

const agregarProductoCarrito = async (e) => {
  const btnContenedor = e.target.parentElement;
  const productoContenedor = btnContenedor.parentElement;
  const selectTalle = productoContenedor.querySelector('.talle');
  
  const listaDeProductos = await filtrarProductos();
  const {producto} = e.target.dataset;
  const productoSeleccionado = listaDeProductos.find(productoElemento => productoElemento.id === parseInt(producto))
  if(productoCarrito.some(producto => producto.id === productoSeleccionado.id)) {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'El producto ya está en el carrito.'
    })
    return;
  };
  productoSeleccionado.talle = selectTalle.value;
  productoSeleccionado.total = 1;
  productoCarrito.push(productoSeleccionado);
  mostrarProductoCarrito();
  guardarAlLocalStorage(productoCarrito);
  cargarBtnsBorrarProducto();
  cargarBtnsSumarRestar();
}

const cargarBtnsProductoCarrito = () => {
  const agregarBtns = document.querySelectorAll('.btn-agregar');
  agregarBtns.forEach(btn => {
    btn.addEventListener('click', agregarProductoCarrito);
  })
}



function init(){
    verMasBtn.addEventListener('click', mostrarMasProductos);
    contenedorBtnCategorias.addEventListener('click', seleccionarCategoria);
    mostrarProductos();
    mostrarMasBtn();
}

init();