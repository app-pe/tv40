// Configuración central de TV40Shop.
// Todo valor "de negocio" que antes estaba repartido por controllers y vistas vive aquí.

export const SITE = {
  nombre: 'TV40Shop',
  urlBase: 'https://app-pe.github.io/tv40/',
  email: 'tv40shop@gmail.com',
  tituloHome: 'TV40Shop | Marketplace para Emprendedores en Perú',
  descripcionHome:
    'Promociona tu marca y catálogo por 40 días sin comisiones. Conecta con clientes y emprendedores.',
};

// Clave de localStorage del carrito (se mantiene igual que en la versión anterior
// para no perder los carritos que los visitantes ya tengan guardados).
export const STORAGE = {
  carrito: 'items_carrito',
};

// Reglas del carrito / envío.
export const CARRITO = {
  cantidadMin: 1,
  cantidadMax: 10,
  envioGratisDesde: 100, // S/ — desde este subtotal el envío es gratis
  costoEnvio: 10, // S/
};

// WhatsApp: números en formato internacional, sin "+" ni espacios.
export const WHATSAPP = {
  // Se usa cuando el pedido mezcla tiendas o cuando la tienda no tiene número propio.
  porDefecto: '51999781083',
  porTienda: {
    shop4: '51999781083',
    shop5: '51999781083',
    shop6: '51945652763',
    shop7: '51988627732',
    shop8: '51997967183',
    shop9: '51999831439',
  },
};

// Tiendas que NO usan la ficha de detalle ni el carrito: el botón "Comprar"
// abre directamente un chat de WhatsApp con el producto.
export const TIENDAS_PEDIDO_DIRECTO = {
  shop10: {
    telefono: '593963229217',
    telefonoVisible: '+593 963229217',
    etiqueta: 'Ventas por Mayor y Menor',
    slogan: 'Machala El Oro de Ecuador',
  },
  shop11: {
    telefono: '593963229217',
    telefonoVisible: '+593 963229217',
    etiqueta: 'Ventas por Mayor y Menor',
    slogan: 'Machala El Oro de Ecuador',
  },
};

// Tipos de menú de categorías en bd-app.json: "mp" = principal, "ms" = subcategoría.
export const MENU = { principal: 'mp', sub: 'ms' };

export const MEDIOS_PAGO = ['plin', 'yape', 'transferencia'];
