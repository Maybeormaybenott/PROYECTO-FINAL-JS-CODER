// MIS PRODUCTOS
let arrayProductos = [];

fetch("./js/arrayProductos.json")
  .then((response) => response.json())
  .then((data) => {
    arrayProductos = data;
    cargarProductos(arrayProductos);
  });

// TRAIGO OBJETOS DEL DOM

const productosContenedor = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");

let agregarProductos = document.querySelectorAll(".agregar-producto");

const numeroCarrito = document.querySelector(".numero-carrito");

function cargarProductos(productosSeleccionados) {
  productosContenedor.innerHTML = "";

  productosSeleccionados.forEach((arrayProducto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `  <div class="informacion-producto align-items-center">
                          <img class="img-producto" src="${arrayProducto.imagen}"alt="${arrayProducto.nombre}">
                          <h3 class="nombre-producto">${arrayProducto.nombre}</h3>
                          <p class="descripcion-producto align-items-center">${arrayProducto.descripcion}</p>
                          <p class="precio-producto align-items-center">$${arrayProducto.precio}</p>
                            <div class="botones-producto align-items-center">
                              <button class="agregar-producto btn btn-outline-success btn-sm" id="${arrayProducto.id}">Agregar al carrito</button>
                              <button class="eliminar-producto btn btn-outline-danger btn-sm" id="${arrayProducto.id}">Eliminar del carrito</button>
                            </div>
                        </div>
    `;

    productosContenedor.append(div);
  });

  actualizarBotonesAgregar();
}

// CHEQUEAR

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todoslosproductos") {
      const botonProductos = arrayProductos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(botonProductos);
    } else {
      cargarProductos(arrayProductos);
    }
  });
});

function actualizarBotonesAgregar() {
  agregarProductos = document.querySelectorAll(".agregar-producto");

  agregarProductos.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

// CARRITO

let productosCarrito;
let productosCarritoLocalStorage = localStorage.getItem("data-carrito");

if (productosCarritoLocalStorage) {
  productosCarrito = JSON.parse(productosCarritoLocalStorage);
  actualizarNumeroCarrito();
} else {
  productosCarrito = [];
}

function agregarAlCarrito(e) {
  const id = e.currentTarget.id;
  const productoAgregado = arrayProductos.find(
    (producto) => producto.id === id
  );

  if (productosCarrito.some((producto) => producto.id === id)) {
    const indice = productosCarrito.findIndex((producto) => producto.id === id);
    productosCarrito[indice].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }

  actualizarNumeroCarrito();

  localStorage.setItem("data-carrito", JSON.stringify(productosCarrito));
}

function actualizarNumeroCarrito() {
  let numeroCarritoNuevo = productosCarrito.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    0
  );

  numeroCarrito.innerText = numeroCarritoNuevo;
}
