export default function validarCrearProducto(valores) {
  let errores = {};

  // Validar marca
  if (!valores.marca) {
    errores.marca = "La marca es obligatoria";
  }

  // validar modelo
  if (!valores.modelo) {
    errores.modelo = "El modelo es obligatorio";
  }

  //Validar Precio
  if (!valores.precio) {
    errores.precio = "El precio es obligatorio";
  }

  if (valores.precio < 0) {
    errores.precion = "El precio es invalido";
  }

  //Validar Categoria
  if (!valores.categoria) {
    errores.categoria = "La categoria es obligatoria";
  }
  return errores;
}
