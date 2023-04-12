

const traerProductos = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}

const filtrarProductos = async () => {
    const productos = await traerProductos();
    const productosFiltrados = productos.filter(producto => producto.category !== 'electronics');
    return productosFiltrados;
}
