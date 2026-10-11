// Lógica pura de filtrado (sin DOM). Reemplaza los ~1000 líneas duplicadas de
// c_category_filtros.js y c_shop_filtros.js.
//
// Regla: dentro de un mismo filtro las opciones se suman (blanco O negro) y entre
// filtros distintos se exige que se cumplan todos (precio Y color Y talla).

export function crearEstadoFiltros(precioMax) {
  return { precioMax, categorias: new Set(), colores: new Set(), tallas: new Set() };
}

export function alternar(conjunto, valor, activo) {
  if (activo) conjunto.add(valor);
  else conjunto.delete(valor);
}

export function aplicarFiltros(items, estado) {
  return items.filter((item) => {
    if (estado.precioMax !== null && item.precio_oferta > estado.precioMax) return false;
    if (estado.categorias.size && !estado.categorias.has(item.id_categoria)) return false;
    if (estado.colores.size && !estado.colores.has(item.id_color)) return false;
    if (estado.tallas.size && !item.tallas.some((t) => estado.tallas.has(t))) return false;
    return true;
  });
}
