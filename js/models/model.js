// Fachada de lectura sobre los datos (equivalente a `Model` de manyalo).
// Las vistas SOLO hablan con este módulo; nadie más lee bd-app.json directamente.

import { MENU } from '../config.js';
import { indices, obtenerDatos } from './db.js';

// ───────── Tiendas ─────────
export const getTiendas = () => obtenerDatos().tienda;
export const getTiendasActivas = () => getTiendas().filter((t) => t.estado === 1);
export const getTienda = (id) => indices.tiendas.get(id);

// ───────── Categorías ─────────
const estaActiva = (c) => c.estado_categoria === 'activado';
export const getCategoria = (id) => indices.categorias.get(id);
export const getCategoriasPrincipales = () =>
  obtenerDatos().categoria.filter((c) => estaActiva(c) && c.menu === MENU.principal);
export const getSubcategorias = (tipo = null) =>
  obtenerDatos().categoria.filter(
    (c) => estaActiva(c) && c.menu === MENU.sub && (tipo === null || c.tipo_categoria === tipo)
  );

// ───────── Productos ─────────
export const getProducto = (id) => indices.productos.get(id);
export const getProductosByCategoria = (idCategoria) =>
  obtenerDatos().producto.filter((p) => p.id_categoria === idCategoria);
export const getProductosByTienda = (idTienda) =>
  obtenerDatos().producto.filter((p) => p.id_tienda === idTienda);

// Cantidad de productos que "cuelgan" de una categoría: los propios, o —si es una
// categoría principal— los de todas sus subcategorías del mismo tipo.
export function contarProductosDeCategoria(categoria) {
  const propios = getProductosByCategoria(categoria.id_categoria).length;
  if (propios > 0 || categoria.menu !== MENU.principal) return propios;
  return getSubcategorias(categoria.tipo_categoria).reduce(
    (total, sub) => total + getProductosByCategoria(sub.id_categoria).length,
    0
  );
}

// ───────── Colores y tallas ─────────
export const getColor = (id) => indices.colores.get(id);
export const getTalla = (id) => indices.tallas.get(id);
export const SIN_COLOR = 'no'; // centinela de bd-app.json para productos sin variantes de color

// ───────── Variantes (atributo + color) ─────────
const claveVariante = (atributo, color) => `${atributo}|${color}`;

export const getFilasVariante = (atributo, color) =>
  indices.atributosPorClave.get(claveVariante(atributo, color)) || [];

export function getTallasDeVariante(atributo, color) {
  return getFilasVariante(atributo, color)
    .map((fila) => fila.id_tallas)
    .filter(Boolean)
    .map(getTalla)
    .filter(Boolean);
}

// Colores distintos que existen para un atributo, en el orden de bd-app.json.
export function getColoresDeAtributo(atributo) {
  const vistos = new Set();
  const colores = [];
  for (const fila of obtenerDatos().atributo_producto) {
    if (fila.id_atributo !== atributo || vistos.has(fila.id_color)) continue;
    vistos.add(fila.id_color);
    colores.push(getColor(fila.id_color));
  }
  return colores.filter(Boolean);
}

// URLs de las imágenes de una variante (usa la carpeta de la categoría del producto).
export function getImagenesDeVariante(atributo, color, producto) {
  const categoria = getCategoria(producto.id_categoria);
  const base = categoria?.url_imagen_categoria || '';
  const imagenes = indices.imagenesPorClave.get(claveVariante(atributo, color)) || [];
  const urls = imagenes.map((i) => base + i.nombre_img);
  return urls.length ? urls : [base + producto.imagen_principal];
}

// Código ATB que se muestra en el detalle y viaja en el pedido.
export function codigoAtb(atributo, color, talla) {
  return color === SIN_COLOR ? atributo.toUpperCase() : `${atributo}${color}${talla || ''}`.toUpperCase();
}

// ───────── Catálogo ─────────
// Un "item de catálogo" es una variante (producto + atributo + color) lista para pintar como tarjeta.
export function construirItemsCatalogo(productos) {
  const items = [];
  for (const producto of productos) {
    if (producto.cantidad === 0) continue; // sin stock: no se muestra (igual que antes)
    const vistos = new Set();
    for (const fila of indices.atributosPorProducto.get(producto.id_producto) || []) {
      const clave = claveVariante(fila.id_atributo, fila.id_color);
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      items.push({
        id_producto: producto.id_producto,
        id_atributo: fila.id_atributo,
        id_color: fila.id_color,
        id_tienda: producto.id_tienda,
        id_categoria: producto.id_categoria,
        nombre_producto: producto.nombre_producto,
        precio_catalogo: producto.precio_catalogo,
        precio_oferta: producto.precio_oferta,
        img: getImagenesDeVariante(fila.id_atributo, fila.id_color, producto)[0],
        tallas: getFilasVariante(fila.id_atributo, fila.id_color)
          .map((f) => f.id_tallas)
          .filter(Boolean),
      });
    }
  }
  return items;
}

export const getCatalogoDeCategoria = (idCategoria) =>
  construirItemsCatalogo(getProductosByCategoria(idCategoria));
export const getCatalogoDeTienda = (idTienda) =>
  construirItemsCatalogo(getProductosByTienda(idTienda));

// Opciones disponibles para los filtros de un conjunto de productos.
export function getOpcionesFiltro(productos) {
  const ids = new Set(productos.map((p) => p.id_producto));
  const colores = new Map();
  const tallas = new Map();
  for (const fila of obtenerDatos().atributo_producto) {
    if (!ids.has(fila.id_producto)) continue;
    if (fila.id_color !== SIN_COLOR) colores.set(fila.id_color, (colores.get(fila.id_color) || 0) + fila.cantidad);
    if (fila.id_tallas) tallas.set(fila.id_tallas, (tallas.get(fila.id_tallas) || 0) + fila.cantidad);
  }
  const categorias = new Map();
  for (const p of productos) categorias.set(p.id_categoria, (categorias.get(p.id_categoria) || 0) + p.cantidad);

  // Se respeta el orden en que están definidos colores/tallas/categorías en los datos.
  const ordenar = (lista, mapa, id, nombre) =>
    lista.filter((x) => mapa.has(x[id])).map((x) => ({ id: x[id], nombre: x[nombre], cantidad: mapa.get(x[id]) }));
  const precios = productos.map((p) => p.precio_oferta);
  return {
    colores: ordenar(obtenerDatos().colores, colores, 'id_color', 'nombre_color'),
    tallas: ordenar(obtenerDatos().tallas, tallas, 'id_talla', 'nombre_talla'),
    categorias: ordenar(obtenerDatos().categoria, categorias, 'id_categoria', 'nombre_categoria'),
    precioMin: precios.length ? Math.min(...precios) : 0,
    precioMax: precios.length ? Math.max(...precios) : 0,
  };
}
