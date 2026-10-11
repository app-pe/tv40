// Único dueño del localStorage del carrito.
// Mantiene la misma clave y los mismos campos que la versión anterior, de modo que los
// carritos ya guardados en el navegador de los visitantes siguen funcionando.

import { CARRITO, STORAGE } from '../config.js';

const EVENTO = 'carrito:cambio';

const acotar = (n) => Math.min(CARRITO.cantidadMax, Math.max(CARRITO.cantidadMin, n));

function normalizar(item) {
  const cantidad = acotar(parseInt(item.cantidad, 10) || CARRITO.cantidadMin);
  const precio = Number(item.precio_oferta) || 0;
  return { ...item, cantidad, precio_oferta: precio, subtotal: precio * cantidad };
}

// Identifica una línea del carrito (mismo producto, color y talla = misma línea).
export const claveItem = (item) => [item.id_atributo, item.color || '', item.tallax || ''].join('|');

function leer() {
  try {
    const guardado = JSON.parse(localStorage.getItem(STORAGE.carrito));
    return Array.isArray(guardado) ? guardado.map(normalizar) : [];
  } catch {
    return [];
  }
}

function guardar(items) {
  try {
    localStorage.setItem(STORAGE.carrito, JSON.stringify(items));
  } catch {
    /* almacenamiento lleno o bloqueado: el carrito vive solo en esta pestaña */
  }
  window.dispatchEvent(new CustomEvent(EVENTO));
}

export const Carrito = {
  EVENTO,

  items: leer,
  cantidadLineas: () => leer().length,

  // Devuelve false si esa variante (producto + color + talla) ya estaba en el carrito.
  agregar(item) {
    const items = leer();
    const nuevo = normalizar(item);
    if (items.some((i) => claveItem(i) === claveItem(nuevo))) return false;
    items.push(nuevo);
    guardar(items);
    return true;
  },

  cambiarCantidad(clave, delta) {
    const items = leer().map((i) => (claveItem(i) === clave ? normalizar({ ...i, cantidad: i.cantidad + delta }) : i));
    guardar(items);
  },

  eliminar(clave) {
    guardar(leer().filter((i) => claveItem(i) !== clave));
  },

  vaciar() {
    guardar([]);
  },

  totales(items = leer()) {
    const subtotal = items.reduce((suma, i) => suma + i.subtotal, 0);
    const envio = subtotal === 0 || subtotal >= CARRITO.envioGratisDesde ? 0 : CARRITO.costoEnvio;
    return { subtotal, envio, envioGratis: subtotal > 0 && envio === 0, total: subtotal + envio };
  },
};
