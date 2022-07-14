
import { getData } from "./getData.js";

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();

  if (localStorage.getItem("carrito")) {
    recupero();
    actualizarCarrito();
  }
});

//array carrito
let carritoCompra = [];
let products;

//variables
const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("info");
const contadorCarrito = document.getElementById("contador");
const precioTotal = document.getElementById("total");
const boton = document.getElementById("fin");
const verCarrito = document.getElementById("btn-carrito");
let cerrarCarrito = document.querySelector(".btn-cerrar");
const modal = document.querySelector(".carrito");



const mostrarProductos = async () => {
  products = await getData();
    products.forEach((el) => {
      let div = document.createElement("div");
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
          duration: 2000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #e7e2cc,  #00555d)",
          },
        }).showToast();
      });
    });
  }

 

const carritoVacio = () => {
  let vacio = document.getElementById("precioProducto");
  vacio.innerHTML = `<p>El carrito esta vacio</p>`;
};

const carritoLleno = () => {
  let vacio = document.getElementById("precioProducto");
  vacio.innerHTML = "";
};

const agregarCarrito = (id) => {

      let verificacion = carritoCompra.find(item => item.id === parseInt(id));

      if (verificacion){
        verificacion.cantidad += 1
        document.getElementById(`cant${verificacion.id}`).innerHTML = `<p id=cant${verificacion.id}"> Cantidad: ${verificacion.cantidad}</p>`
        console.log(verificacion);
      } else {
      let productoAñadir = products.find(item => item.id === parseInt(id))

      carritoCompra.push(productoAñadir)
      mostrarCarrito(productoAñadir);
    }
      actualizarCarrito();
      carritoLleno();
      localStorage.setItem("carrito", JSON.stringify(carritoCompra));
;}

const mostrarCarrito = (productoAñadir) => {
  let div = document.createElement('div');
  div.classList.add("infoProducto");
  div.innerHTML = `<p>${productoAñadir.nombre}</p>
                    <p>$${productoAñadir.precio}</p>
                    <p id=cant${productoAñadir.id}>Cantidad: ${productoAñadir.cantidad}</p>
                    <button id= "eliminar${productoAñadir.id}" class="btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>`;
  contenedorCarrito.appendChild(div);

  let btnEliminar = document.getElementById(`eliminar${productoAñadir.id}`);
  btnEliminar.addEventListener('click', () => {
    
    if (productoAñadir.cantidad == 1){
    btnEliminar.parentElement.remove();
    console.log(btnEliminar)
    carritoCompra = carritoCompra.filter((ele) => ele.id !== productoAñadir.id);
    
    if(carritoCompra.length == 0){        
      carritoVacio();
    }
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));

    }else {
      productoAñadir.cantidad -= 1;
      document.getElementById(`cant${productoAñadir.id}`).innerHTML = `<p id=cant${productoAñadir.id}> Cantidad: ${productoAñadir.cantidad}</p>`
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carritoCompra));
    }
  })
  
  let vaciarCarrito = document.getElementById("vaciar"); 
    vaciarCarrito.addEventListener('click', ()=>{
      vaciar()
    });
};

const vaciar = ()=>{
    carritoCompra = [];
    contenedorCarrito.innerText = "";
    carritoVacio()
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));
}

const actualizarCarrito = () => {
  contadorCarrito.innerText = carritoCompra.length;
  precioTotal.innerText = "Total :$" + carritoCompra.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
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

const modalForma = () => {    

  verCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("mostrar");
  });

  cerrarCarrito.addEventListener("click", (e) => {
    e.preventDefault();
      modal.classList.remove("mostrar")
  });
};

modalForma();

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
            carritoCompra.reduce((acc, el) => acc + el.precio * el.cantidad, 0),
          "success",
          vaciar(),
          cerrarCarrito = setTimeout(() => {
            modal.classList.remove("mostrar")     
            },2500)
          )
    });
  });
};

finalizar();
