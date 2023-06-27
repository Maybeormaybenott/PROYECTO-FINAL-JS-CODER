// MIS PRODUCTOS
const arrayProductos = [
  // RELOJES
  {
    id: "reloj-1",
    nombre: "Reloj enchapado en oro 18 kilates",
    imagen: "./imgs/relojes/1.jpg",
    categoria: {
      nombre: "Relojes",
      id: "relojes",
    },
    tipo: "Enchapado",
    material: "Oro",
    malla: "Metal bañado",
    genero: "Unisex",
    precio: 100,
  },
  {
    id: "reloj-2",
    nombre: "Reloj discreto oro",
    imagen: "./imgs/relojes/2.jpg",
    categoria: {
      nombre: "Relojes",
      id: "relojes",
    },
    tipo: "Discreto",
    material: "Oro 18k",
    malla: "Metal bañado",
    genero: "Unisex",
    precio: 100,
  },
  {
    id: "reloj-3",
    nombre: "Reloj formal malla eco-cuero",
    imagen: "./imgs/relojes/3.jpg",
    categoria: {
      nombre: "Relojes",
      id: "relojes",
    },
    tipo: "Discreto",
    material: "Acero inoxidable",
    malla: "Eco-cuero",
    genero: "Unisex",
    precio: 100,
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
    tipo: "Discreto",
    material: "Acero inoxidable",
    genero: "Unisex",
    precio: 100,
  },

  {
    id: "anillo-2",
    nombre: "Anillo GD-3",
    imagen: "./imgs/anillos/2.jpg",
    categoria: {
      nombre: "Anillos",
      id: "anillos",
    },
    tipo: "Elegante",
    material: "Acero inoxidable",
    genero: "Unisex",
    precio: 100,
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
    tipo: "Práctica y anti-robo",
    material: "Lona impermeable",
    genero: "Unisex",
    precio: 100,
  },

  {
    id: "mochilas-2",
    nombre: "Mochila de cuero",
    imagen: "./imgs/mochilas/2.jpg",
    categoria: {
      nombre: "Mochilas",
      id: "mochilas",
    },
    tipo: "Práctica y cómoda",
    material: "Eco-cuero",
    genero: "Unisex",
    precio: 100,
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
    tipo: "Elegante",
    material: "Algodón orgánico",
    genero: "Unisex",
    precio: 100,
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
    tipo: "Elegante",
    material: "Eco-cuero",
    genero: "Unisex",
    precio: 100,
  },
];

// TRAIGO OBJETOS DEL DOM

const productosContenedor = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let agregarProductos = document.querySelectorAll(".agregar-producto");
let eliminarProductos = document.querySelectorAll(".eliminar-producto");
const numeroCarrito = document.querySelectorAll(".numero-carrito");

function cargarProductos(productosSeleccionados) {
  productosContenedor.innerHTML = "";

  productosSeleccionados.forEach((arrayProducto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `  <div class="informacion-producto">
                          <img class="img-producto" src="${arrayProducto.imagen}"alt="${arrayProducto.nombre}">
                          <h3 class="nombre-producto">${arrayProducto.nombre}</h3>
                          <p class="descripcion-producto">${arrayProducto.descripcion}</p>
                          <p class="precio-producto">${arrayProducto.precio}</p>
                          <div class="botones-producto">
                          <button class="agregar-producto" id="${arrayProducto.id}">Agregar al carrito</button>
                          <button class="eliminar-producto" id="${arrayProducto.id}">Eliminar del carrito</button>
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

const productosCarrito = [];

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
}

function actualizarNumeroCarrito() {
  let numeroCarrito = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
}
