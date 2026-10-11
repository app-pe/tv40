// Carga de datos (bd-app.json) e índices en memoria.
// Reemplaza el `await` de nivel superior de la versión anterior: ahora la carga es una
// función explícita que app.js espera antes de montar la interfaz.

const URL_DATOS = new URL('../../data/bd-app.json', import.meta.url);

let datos = null;
export const indices = {
  tiendas: new Map(),
  categorias: new Map(),
  productos: new Map(),
  colores: new Map(),
  tallas: new Map(),
  atributosPorProducto: new Map(), // id_producto → filas de atributo_producto
  atributosPorClave: new Map(), // "atributo|color" → filas
  imagenesPorClave: new Map(), // "atributo|color" → filas de imagenes
};

const agrupar = (mapa, clave, valor) => {
  if (!mapa.has(clave)) mapa.set(clave, []);
  mapa.get(clave).push(valor);
};

function construirIndices(d) {
  d.tienda.forEach((t) => indices.tiendas.set(t.id_tienda, t));
  d.categoria.forEach((c) => indices.categorias.set(c.id_categoria, c));
  d.producto.forEach((p) => indices.productos.set(p.id_producto, p));
  d.colores.forEach((c) => indices.colores.set(c.id_color, c));
  d.tallas.forEach((t) => indices.tallas.set(t.id_talla, t));
  d.atributo_producto.forEach((a) => {
    agrupar(indices.atributosPorProducto, a.id_producto, a);
    agrupar(indices.atributosPorClave, `${a.id_atributo}|${a.id_color}`, a);
  });
  d.imagenes.forEach((i) => agrupar(indices.imagenesPorClave, `${i.id_atributo}|${i.id_color}`, i));
}

export async function cargarDatos() {
  if (datos) return datos;
  const respuesta = await fetch(URL_DATOS);
  if (!respuesta.ok) throw new Error(`No se pudieron cargar los datos (HTTP ${respuesta.status})`);
  datos = await respuesta.json();
  construirIndices(datos);
  return datos;
}

export function obtenerDatos() {
  if (!datos) throw new Error('Los datos aún no se han cargado: llama a cargarDatos() primero.');
  return datos;
}

// Permite probar los modelos en Node inyectando el JSON directamente.
export function inyectarDatos(json) {
  datos = json;
  construirIndices(json);
}
