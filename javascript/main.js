
import { getData } from "./getData.js";

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();

  if (localStorage.getItem("carrito")) {
    recupero();
    actualizarCarrito();
  }
});

//Variables
const contenedorProductos = document.getElementById("productos"),
      contenedorCarrito = document.getElementById("info"),
      contadorCarrito = document.getElementById("contador"),
      precioTotal = document.getElementById("total"),
      boton = document.getElementById("fin"),
      verCarrito = document.getElementById("btn-carrito"),
      modal = document.querySelector(".carrito"),
      selectProducts = document.getElementById("selectProduct");
let cerrarCarrito = document.querySelector(".btn-cerrar");      
let products;


//Array carrito.
let carritoCompra = [];

//Filtrar productos.

selectProducts.addEventListener('change', () => {
  console.log(selectProducts.value);
  if (selectProducts.value === 'todos') {
    mostrarProductos()
    }else{
      mostrarProductos(products.filter (el => el.tipo === selectProducts.value))
    }
})


//Funcion para mostrar los productos al abrir la seccion productos.

const mostrarProductos = async (Array) => {
  products = await getData();
  contenedorProductos.innerHTML= ""
    Array = products.forEach((el) => {
      let div = document.createElement("div");
      div.innerHTML = `<div id="card" class="fresco">
                          <img src="${el.imagen}"/>
                          <h2>${el.nombre}</h2>
                          <p>$${el.precio}</p>
                          <a id=boton${el.id}>Agregar al Carrito<i class="fa-solid fa-cart-plus"></i></a>
                    </div>`;
      contenedorProductos.appendChild(div);

      
      //boton para agregar productos al carrito.

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

 
//funcion para mostrar cuando el carrito no tiene productos.

const carritoVacio = () => {
  let vacio = document.getElementById("precioProducto");
  vacio.innerHTML = `<p>El carrito esta vacio</p>`;
};

//funcion para indicar que el carrito tiene productos y borrar el mensaje de carrito vacio.
const carritoLleno = () => {
  let vacio = document.getElementById("precioProducto");
  vacio.innerHTML = "";
};

//Funcion para agregar productos al carrito de compras, se verifica que el producto no este repetido y en caso que si, se suma a la cantidad.
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


//Funcion para mostrar el carrito donde se renderiza el producto elegido con nombre, precio y cantidad. 

const mostrarCarrito = (productoAñadir) => {
  let div = document.createElement('div');
  div.classList.add("infoProducto");
  div.innerHTML = `<p>${productoAñadir.nombre}</p>
                    <p>$${productoAñadir.precio}</p>
                    <p id=cant${productoAñadir.id}>Cantidad: ${productoAñadir.cantidad}</p>
                    <button id= "eliminar${productoAñadir.id}" class="btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>`;
  contenedorCarrito.appendChild(div);

  //Boton para eliminar cantidad y/o total del producto en el carrito.
  let btnEliminar = document.getElementById(`eliminar${productoAñadir.id}`);
  btnEliminar.addEventListener('click', () => {
    
    if (productoAñadir.cantidad == 1){
    btnEliminar.parentElement.remove();
    console.log(btnEliminar)
    carritoCompra = carritoCompra.filter((ele) => ele.id !== productoAñadir.id);
    
      if(carritoCompra.length === 0){             
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

// Evento para cuando queremos vaciar el carrito.
let vaciarCarrito = document.getElementById("vaciar"); 
    vaciarCarrito.addEventListener('click', ()=>{
      vaciar()
    });
};

//Funcion para vaciar el carrito.
const vaciar = ()=>{
    carritoCompra = [];
    contenedorCarrito.innerText = "";
    carritoVacio()
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));
}

//Funcion para actualizar el carrito, cada vez que se sume productos o se eliminen. 
const actualizarCarrito = () => {
  contadorCarrito.innerText = carritoCompra.length;
  precioTotal.innerText = "Total :$" + carritoCompra.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  if (carritoCompra.length === 0 )precioTotal.innerText = ""; 
};


//Funcion para recuperar informacion del Localstorage.
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

//Funcion para mostrar el modal del carrito de compra.
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

//Funcion para finalizar la compra.
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
