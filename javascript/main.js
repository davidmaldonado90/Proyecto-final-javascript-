import { getData } from "./getData.js";

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();

  if (localStorage.getItem("carrito")) {
    const carritoStorage = recupero();
    actualizarCarrito(carritoStorage);
  }
});

//array carrito
let carritoCompra = [];

//variables
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("info");
const contadorCarrito = document.getElementById("contador");
const precioTotal = document.getElementById("total");
const boton = document.getElementById("fin");
let products;

const mostrarProductos = async () => {
  products = await getData();
  if (products) {
    products.forEach((el) => {
      const div = document.createElement("div");
      div.innerHTML = `<div id="card" class="fresco">
                          <img src="${el.imagen}"/>
                          <h2>${el.nombre}</h2>
                          <p>$${el.precio}</p>
                          <a id=boton${el.id}>Agregar al Carrito<i class="fa-solid fa-cart-plus"></i></a>
                    </div>`;
      contenedorProductos.appendChild(div);
      let btnCompra = document.getElementById(`boton${el.id}`);
      btnCompra.addEventListener("click", () => {
        agregarCarrito(el.id);
        Toastify({
          text: "El producto se agrego al carrito",
          duration: 1000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #00555d, #e7e2cc)",
          },
        }).showToast();
      });
    });
  }
};

const carritoVacio = () => {
  let vacio = document.getElementById("precioProducto");
  vacio.innerHTML = `<p>El carrito esta vacio</p>`;
};

const carritoLleno = () => {
  let vacio = document.getElementById("precioProducto");
  vacio.innerHTML = "";
};

const agregarCarrito = (id) => {
  const productoAñadir = products.find((item) => item.id === parseInt(id));
  if (carritoCompra.some((item) => item.id === parseInt(id))) {
    const prodMejorado = carritoCompra.find((item) => item.id === parseInt(id));
    prodMejorado.cantidad = prodMejorado.cantidad + 1;
  } else {
    const prodMejorado = new Carrito(
      productoAñadir.id,
      productoAñadir.nombre,
      productoAñadir.precio,
      1
    );
    carritoCompra.push(prodMejorado);
  }
  carritoCompra.push(productoAñadir);
  carritoLleno();
  mostrarCarrito(productoAñadir);
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carritoCompra));
};

const mostrarCarrito = (productoAñadir) => {
  let div = document.createElement("div");
  div.classList.add("infoProducto");
  div.innerHTML = `<p>${productoAñadir.nombre}</p>
                    <p>$${productoAñadir.precio}</p>
                    <button id="eliminar${productoAñadir.id}" class="btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>`;
  contenedorCarrito.appendChild(div);
  let btnEliminar = document.getElementById(`eliminar${productoAñadir.id}`);
  btnEliminar.addEventListener("click", () => {
    btnEliminar.parentElement.remove();
    carritoCompra = carritoCompra.filter((ele) => ele.id !== productoAñadir.id);
    if (carritoCompra.length == 0) {
      carritoVacio();
    }
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));
  });
};

const actualizarCarrito = () => {
  contadorCarrito.innerText = carritoCompra.length;
};

const recupero = () => {
  let recuperar = JSON.parse(localStorage.getItem("carrito"));
  if (recuperar) {
    for (const elemento of recuperar) {
      mostrarCarrito(elemento);
      carritoCompra.push(elemento);
      actualizarCarrito();
    }
  }
};

recupero();

const modal = () => {
  let verCarrito = document.getElementById("btn-carrito");
  let modal = document.querySelector(".carrito");
  let cerrarCarrito = document.querySelector(".btn-cerrar");

  verCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("mostrar");
  });

  cerrarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("mostrar");
  });
};

modal();

const finalizar = () => {
  boton.addEventListener("click", () => {
    Swal.fire({
      title: "¿Desea Finalizar la Compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Finalizar",
    }).then((result) => {
      result.isConfirmed &&
        Swal.fire(
          "Gracias por su compra!",
          "El Total a Abonar es: $" +
            carritoCompra.reduce((acc, el) => acc + el.precio, 0),
          "success"
        );
    });
  });
};

finalizar();
