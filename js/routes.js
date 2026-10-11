// Tabla de rutas: qué vista pinta cada URL (equivalente al bloque "Routes" de manyalo).

import { Router } from './router.js';
import { aplicarSeo } from './utils/seo.js';
import { iniciarPlugins, limpiarPlugins } from './utils/ui.js';
import { carritoView } from './views/carrito.view.js';
import { categoriaView } from './views/categoria.view.js';
import { checkoutView } from './views/checkout.view.js';
import { detalleView } from './views/detalle.view.js';
import { homeView } from './views/home.view.js';
import { notFoundView } from './views/notfound.view.js';
import { tiendaView } from './views/tienda.view.js';

let abortador = null;

// Contrato de una vista: devuelve { html, mount?, seo?, redirigir? }.
//   html      → contenido que se inserta en <main id="app">
//   mount     → ({ root, signal, ctx }) enlaza eventos; `signal` los elimina al salir de la ruta
//   seo       → título/descripción/canonical de la página
//   redirigir → href al que se salta en lugar de pintar
function montar(vista) {
  return async (ctx) => {
    const outlet = document.getElementById('app');
    const resultado = await vista(ctx);
    if (ctx.esObsoleto()) return;

    abortador?.abort();
    limpiarPlugins(outlet);

    if (resultado.redirigir) {
      window.location.replace(resultado.redirigir);
      return;
    }

    outlet.innerHTML = String(resultado.html);
    abortador = new AbortController();
    resultado.mount?.({ root: outlet, signal: abortador.signal, ctx });
    iniciarPlugins(outlet);
    aplicarSeo(resultado.seo);
    window.scrollTo({ top: 0 });
  };
}

export function registrarRutas() {
  Router.add('/home', montar(homeView))
    .add('/categoria', montar(categoriaView))
    .add('/tienda', montar(tiendaView))
    .add('/detalle', montar(detalleView))
    .add('/carrito', montar(carritoView))
    .add('/checkout', montar(checkoutView))
    .notFound(montar(notFoundView));
}
