// Armado de los mensajes de WhatsApp (pedido del carrito y pedido directo por producto).

import { TIENDAS_PEDIDO_DIRECTO, WHATSAPP } from '../config.js';
import { dinero } from '../utils/format.js';

const SALTO = '\r\n';
const urlWhatsApp = (telefono, texto) =>
  `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(texto)}`;

// Si todo el pedido es de una sola tienda se usa su número; si no, el número por defecto.
export function telefonoDelPedido(items) {
  const tiendas = new Set(items.map((i) => i.id_tienda));
  if (tiendas.size === 1) {
    const [unica] = tiendas;
    return WHATSAPP.porTienda[unica] || WHATSAPP.porDefecto;
  }
  return WHATSAPP.porDefecto;
}

export function construirUrlPedido({ items, totales, medioPago, persona }) {
  const lineas = items.map((i) =>
    [i.cantidad, i.nombre_producto, i.tallav, i.colorv, i.atb, `S/${dinero(i.subtotal)}`].filter((x) => x !== '' && x != null).join(' ')
  );
  const texto = [
    'DATOS DEL PEDIDO:',
    'Detalle de Productos:',
    ...lineas,
    '',
    'DETALLE DE PAGO Y ENVÍO',
    `Medio pago: ${medioPago}`,
    `Envío: ${totales.envioGratis ? 'gratis' : `S/${dinero(totales.envio)}`}`,
    'Pago total:',
    `S/${dinero(totales.total)}`,
    '',
    'DATOS PERSONA:',
    `Nombre: ${persona.nombre}`,
    `Celular: ${persona.celular}`,
    `Direccion: ${persona.direccion}`,
  ].join(SALTO);
  return urlWhatsApp(telefonoDelPedido(items), texto);
}

// Tiendas de "pedido directo" (shop10, shop11): el botón Comprar abre WhatsApp con el producto.
export const esPedidoDirecto = (idTienda) => idTienda in TIENDAS_PEDIDO_DIRECTO;
export const datosPedidoDirecto = (idTienda) => TIENDAS_PEDIDO_DIRECTO[idTienda];

export function construirUrlPedidoDirecto(idTienda, nombreProducto) {
  const datos = TIENDAS_PEDIDO_DIRECTO[idTienda];
  return urlWhatsApp(datos.telefono, ['PEDIDO:', nombreProducto].join(SALTO));
}
