const api = "../javascript/productos.json";

export const getData = async () => {
  const response = await fetch(api);
  const data = await response.json();

  return data;
};
