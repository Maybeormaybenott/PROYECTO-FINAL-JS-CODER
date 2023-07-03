const productosCarrito = JSON.parse(localStorage.getItem("data-carrito"));

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const accionesCarrito = document.querySelector("#carrito-acciones");
const carritoCheck = document.querySelector("#carrito-comprado");
const carritoAcciones = document.querySelector(".carrito-acciones");
const carritoAccionesComprar = document.querySelector(
  "#carrito-acciones-comprar"
);
const carritoAccionesVaciar = document.querySelector(
  ".carrito-acciones-vaciar"
);
const carritoSuma = document.querySelector("#total");

let eliminarProductos = document.querySelectorAll(".carrito-producto-eliminar");

function cargarProductosCarrito() {
  carritoProductos.innerHTML = "";

  if (productosCarrito === null || productosCarrito.length === 0) {
    carritoVacio.innerHTML =
      "Carrito vacío. <br> No mientas... alguno seguro que te llama la atención.";
    carritoAcciones.style.display = "none";
  } else {
    productosCarrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `
                        <img
                            class="carrito-producto-imagen"
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                        />
                        <div class="carrito-producto-titulo">
                            <small>${producto.tipo}</small>
                            <h3>${producto.nombre}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                            
                        </div>
                        <button class="carrito-producto-eliminar btn btn-danger" id="${
                          producto.id
                        }">
                            Eliminar
                        </button>
                        
        `;

      carritoProductos.append(div);
    });
    actualizarBotonesEliminar();
    actualizarTotal();
  }
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
  eliminarProductos = document.querySelectorAll(".carrito-producto-eliminar");

  eliminarProductos.forEach((eliminar) => {
    eliminar.addEventListener("click", eliminarDelCarrito);
  });
}

function vaciarCarrito() {
  let productosCarrito = [];
  localStorage.removeItem("data-carrito");
  carritoProductos.innerHTML = "";
  carritoVacio.innerHTML =
    "Carrito vacío. <br> No mientas... alguno seguro que te llama la atención.";
  carritoAcciones.style.display = "none";
}
carritoAccionesVaciar.addEventListener("click", vaciarCarrito);

function eliminarDelCarrito(e) {
  const id = e.currentTarget.id;

  const indice = productosCarrito.findIndex((producto) => producto.id === id);

  if (indice !== -1) {
    if (productosCarrito[indice].cantidad > 1) {
      productosCarrito[indice].cantidad -= 1;
    } else {
      productosCarrito.splice(indice, 1);
    }

    carritoProductos.innerHTML = "";
    cargarProductosCarrito();
    localStorage.setItem("data-carrito", JSON.stringify(productosCarrito));
    actualizarBotonesEliminar();
  }
}

function actualizarTotal() {
  carritoSuma.innerText = `$${productosCarrito.reduce(
    (accumulador, producto) =>
      accumulador + producto.cantidad * producto.precio,
    0
  )}`;
}
function reemplazarCarritoPorTexto() {
  let productosCarrito = [];
  localStorage.removeItem("data-carrito");
  carritoProductos.innerHTML = "";
  carritoCheck.innerHTML =
    "Felicitaciones!. Compraste satisfactoriamente, a la brevedad un vendedor se comunicará contigo.";
  carritoAcciones.style.display = "none";
}
carritoAccionesComprar.addEventListener("click", reemplazarCarritoPorTexto);
