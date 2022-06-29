//array carrito
let carritoCompra = [];

//array productos
let stockProductos = [];

//variables
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("info");
const contadorCarrito = document.getElementById("contador");
const precioTotal = document.getElementById("total");
const boton = document.getElementById("fin");

//constructor de producto

class producto {
  constructor(id, nombre, tipo, precio, imagen, cantidad) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = cantidad;
  }
}

stockProductos.push(
  new producto(
    0,
    "Filet de merluza",
    "Fresco",
    750,
    "../imagenes/FiletMerluza.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    1,
    "Filet de Pez Gallo",
    "Fresco",
    800,
    "../imagenes/PezGallo.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    2,
    "Filet de Salmon Rosado",
    "Fresco",
    2800,
    "../imagenes/salmon-salvaje.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    3,
    "Filet de Abadejo",
    "Fresco",
    1100,
    "../imagenes/Abadejo.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    4,
    "Mejillon Media valva",
    "Congelado",
    750,
    "../imagenes/MediaValva.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    5,
    "Tubo de Calamar",
    "Congelado",
    750,
    "../imagenes/TuboCalamar.jpg",
    1
  )
);

// stockProductos.push(new producto(6, "Filet de merluza", Fresco, 750, "../imagenes/FiletMerluza.jpg", 1));
// stockProductos.push(new producto(7, "Filet de merluza", Fresco, 750, "../imagenes/FiletMerluza.jpg", 1));
// stockProductos.push(new producto(8, "Filet de merluza", Fresco, 750, "../imagenes/FiletMerluza.jpg", 1));
// stockProductos.push(new producto(9, "Filet de merluza", Fresco, 750, "../imagenes/FiletMerluza.jpg", 1));
// stockProductos.push(new producto(10, "Filet de merluza", Fresco, 750, "../imagenes/FiletMerluza.jpg", 1));

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
  precioTotal.innerText = carritoCompra.reduce((acc, el) => acc + el.precio, 0);
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
          "El Total a Abonar es: ",
          "success"
        );
    });
  });
};

finalizar();
// //funcion para comenzar la compra

// let total = 0;

// const carrito = () => {
//   let otroProducto;
//   let producto;
//   let cantidad = 0;
//   let precio = 0;
//   do {
//     producto = prompt("elegi el producto deseado");
//     cantidad = parseInt(prompt("ingresa la cantidad"));

//     switch (producto) {
//       case misProductos[0].nombre:
//         precio = misProductos[0].precio;
//         break;
//       case misProductos[1].nombre:
//         precio = misProductos[1].precio;
//         break;
//       case misProductos[2].nombre:
//         precio = misProductos[2].precio;
//         break;
//       default:
//         alert("el producto no existe");
//     }

//     total = total + precio * cantidad;
//     otroProducto = confirm("¿desea agregar otro producto?");
//   } while (otroProducto);
// };

// // funcion para descuento

// const descuento = (total) => {
//   if (total >= 3000) {
//     total = total * 0.9;
//     alert("tenes un descuento del 10%");
//   }
//   return total;
// };

// //cobro de envio

// const cobroEnvio = (total) => {
//   let confirmacion = confirm("¿te lo enviamos a domicilio?");
//   if (confirmacion && total >= 1500) {
//     alert("tenes envio gratis. El total de tu compra es: " + total);
//   } else if (confirmacion && total < 1500) {
//     total = total + 300;
//     alert("el total de la compra es: " + total);
//   } else {
//     alert("el total de la compra es: " + total);
//   }
//   return total;
// };

// //finalizar compra

// const Compra = () => {
//   ordenarLista();
//   carrito();
//   cobroEnvio(descuento(total));
// };

// Compra();
// alert("gracias por su visita");
