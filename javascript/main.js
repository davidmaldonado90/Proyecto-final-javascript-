//array carrito
let carritoCompra = [];

//variables
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("info");
const contadorCarrito = document.getElementById("contador");
const precioTotal = document.getElementById("total");
const boton = document.getElementById("fin");

const mostrarProductos = () => {
  stockProductos.forEach((el) => {
    let div = document.createElement("div");
    div.innerHTML = `<div id="card" class="fresco">
                          <img src="${el.imagen}"/>
                          <h2>${el.nombre}</h2>
                          <p>$${el.precio}</p>
                          <a id=boton${el.id}>Agregar al Carrito<i class="fa-solid fa-cart-plus"></i></a>
                    </div>`;
    contenedorProductos.appendChild(div);
    let btnCompra = document.getElementById(`boton${el.id}`);
    //console.log(btnCompra);
    btnCompra.addEventListener("click", () => {
      agregarCarrito(el.id);
    });
  });
};

mostrarProductos();

const carritoVacio = () => {
  let vacio = document.getElementById("precioProducto");
  if (carritoCompra == "") {
    vacio.innerHTML = `<p>El carrito esta vacio</p>`;
  }
};

const agregarCarrito = (id) => {
  let productoAñadir = stockProductos.find((item) => item.id === parseInt(id));
  carritoCompra.push(productoAñadir);
  mostrarCarrito(productoAñadir);
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carritoCompra));
};

const mostrarCarrito = (productoAñadir) => {
  let div = document.createElement("div");
  div.classList.add("infoProducto");
  div.innerHTML = `<p>${productoAñadir.nombre}</p>
                    <p>$${productoAñadir.precio}</p>
                    <img src="${productoAñadir.imagen}"/>
                    <button id="eliminar${productoAñadir.id}" class="btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>`;
  contenedorCarrito.appendChild(div);
  let btnEliminar = document.getElementById(`eliminar${productoAñadir.id}`);
  btnEliminar.addEventListener("click", () => {
    btnEliminar.parentElement.remove();
    carritoCompra = carritoCompra.filter((ele) => ele.id !== productoAñadir.id);
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
