//array productos
let stockProductos = [];

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
    1,
    "Filet de merluza",
    "Fresco",
    750,
    "../imagenes/FiletMerluza.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    2,
    "Filet de Pez Gallo",
    "Fresco",
    800,
    "../imagenes/PezGallo.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    3,
    "Filet de Salmon Rosado",
    "Fresco",
    2800,
    "../imagenes/salmon-salvaje.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    4,
    "Filet de Abadejo",
    "Fresco",
    1100,
    "../imagenes/Abadejo.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    5,
    "Mejillon Media valva",
    "Congelado",
    750,
    "../imagenes/MediaValva.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    6,
    "Tubo de Calamar",
    "Congelado",
    750,
    "../imagenes/TuboCalamar.jpg",
    1
  )
);

stockProductos.push(
  new producto(
    7,
    "Cola de Langostino",
    "Congelado",
    1500,
    "../imagenes/ColaLangostino.jpg",
    1
  )
);
stockProductos.push(
  new producto(
    8,
    "Filet de merluza",
    "Congelado",
    750,
    "../imagenes/FiletMerluza.jpg",
    1
  )
);

console.log(JSON.stringify(stockProductos));
// stockProductos.push(
//   new producto(
//     9,
//     "Filet de merluza",
//     Fresco,
//     750,
//     "../imagenes/FiletMerluza.jpg",
//     1
//   )
// );
// stockProductos.push(
//   new producto(
//     10,
//     "Filet de merluza",
//     Fresco,
//     750,
//     "../imagenes/FiletMerluza.jpg",
//     1
//   )
// );
// stockProductos.push(
//   new producto(
//     11,
//     "Filet de merluza",
//     Fresco,
//     750,
//     "../imagenes/FiletMerluza.jpg",
//     1
//   )
// );
