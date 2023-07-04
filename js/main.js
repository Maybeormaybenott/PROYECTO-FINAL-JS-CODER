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
  actualizarBotonesEliminar();
}

// SELECTOR DE PRODUCTOS

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

function actualizarBotonesEliminar() {
  const botonesEliminar = document.querySelectorAll(".eliminar-producto");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
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
  Toastify({
    text: "Producto agregado correctamente",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

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

function eliminarDelCarrito(e) {
  const id = e.currentTarget.id;

  const indice = productosCarrito.findIndex((producto) => producto.id === id);

  if (indice !== -1) {
    if (productosCarrito[indice].cantidad > 1) {
      productosCarrito[indice].cantidad--;
    } else {
      productosCarrito.splice(indice, 1);
    }

    Toastify({
      text: "Producto eliminado correctamente",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();

    actualizarNumeroCarrito();
    localStorage.setItem("data-carrito", JSON.stringify(productosCarrito));
    cargarProductosCarrito();
    actualizarBotonesEliminar();
  }
}

function actualizarNumeroCarrito() {
  let numeroCarritoNuevo = productosCarrito.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    0
  );

  numeroCarrito.innerText = numeroCarritoNuevo;
}
