// MIS PRODUCTOS
const arrayProductos = [
  // RELOJES
  {
    id: "reloj-1",
    nombre: "Reloj enchapado",
    imagen: "./imgs/relojes/1.jpg",
    categoria: {
      nombre: "Relojes",
      id: "relojes",
    },
    descripcion: "Excelente calidad",
    tipo: "Enchapado",
    material: "Oro",
    malla: "Metal bañado",
    genero: "Unisex",
    precio: "1500",
  },
  {
    id: "reloj-2",
    nombre: "Reloj discreto oro",
    imagen: "./imgs/relojes/2.jpg",
    categoria: {
      nombre: "Relojes",
      id: "relojes",
    },
    descripcion: "Excelente calidad",
    tipo: "Discreto",
    material: "Oro 18k",
    malla: "Metal bañado",
    genero: "Unisex",
    precio: "2500",
  },
  {
    id: "reloj-3",
    nombre: "Reloj formal malla eco-cuero",
    imagen: "./imgs/relojes/3.jpg",
    categoria: {
      nombre: "Relojes",
      id: "relojes",
    },
    descripcion: "Excelente calidad",
    tipo: "Discreto",
    material: "Acero inoxidable",
    malla: "Eco-cuero",
    genero: "Unisex",
    precio: "1200",
  },

  // ANILLOS

  {
    id: "anillo-1",
    nombre: "Anillo en acero inox",
    imagen: "./imgs/anillos/1.jpg",
    categoria: {
      nombre: "Anillos",
      id: "anillos",
    },
    descripcion: "Excelente calidad",
    tipo: "Discreto",
    material: "Acero inoxidable",
    genero: "Unisex",
    precio: "590",
  },

  {
    id: "anillo-2",
    nombre: "Anillo GD-3",
    imagen: "./imgs/anillos/2.jpg",
    categoria: {
      nombre: "Anillos",
      id: "anillos",
    },
    descripcion: "Excelente calidad",
    tipo: "Elegante",
    material: "Acero inoxidable",
    genero: "Unisex",
    precio: "490",
  },

  // MOCHILAS
  {
    id: "mochilas-1",
    nombre: "Mochila práctica unisex",
    imagen: "./imgs/mochilas/1.jpeg",
    categoria: {
      nombre: "Mochilas",
      id: "mochilas",
    },
    descripcion: "Excelente calidad",
    tipo: "Práctica y anti-robo",
    material: "Lona impermeable",
    genero: "Unisex",
    precio: "2100",
  },

  {
    id: "mochilas-2",
    nombre: "Mochila de cuero",
    imagen: "./imgs/mochilas/2.jpg",
    categoria: {
      nombre: "Mochilas",
      id: "mochilas",
    },
    descripcion: "Excelente calidad",
    tipo: "Práctica y cómoda",
    material: "Eco-cuero",
    genero: "Unisex",
    precio: "2500",
  },

  // BOLSOS

  {
    id: "bolso-1",
    nombre: "Bolso de mano",
    imagen: "./imgs/bolsos/1.jpeg",
    categoria: {
      nombre: "Bolsos",
      id: "bolsos",
    },
    descripcion: "Excelente calidad",
    tipo: "Elegante",
    material: "Algodón orgánico",
    genero: "Unisex",
    precio: "3700",
  },

  // CARTUCHERAS

  {
    id: "cartuchera-1",
    nombre: "Cartuchera vichy",
    imagen: "./imgs/cartucheras/1.webp",
    categoria: {
      nombre: "Cartucheras",
      id: "cartucheras",
    },
    descripcion: "Excelente calidad",
    tipo: "Elegante",
    material: "Eco-cuero",
    genero: "Unisex",
    precio: "5000",
  },
];

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

cargarProductos(arrayProductos);

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
