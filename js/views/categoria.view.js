import { Router } from '../router.js';
import {
  getCatalogoDeCategoria,
  getCategoria,
  getProductosByCategoria,
  getSubcategorias,
} from '../models/model.js';
import { SITE } from '../config.js';
import { html } from '../utils/html.js';
import { renderBanner } from './components/banner.js';
import { crearCatalogo } from './components/catalogo.js';
import { tarjetaCategoria } from './components/tarjetas.js';
import { notFoundView } from './notfound.view.js';

export function categoriaView(ctx) {
  const categoria = getCategoria(ctx.param);
  if (!categoria) return notFoundView(ctx);

  const productos = getProductosByCategoria(categoria.id_categoria);
  const banner = renderBanner({ titulo: categoria.nombre_categoria, miga: 'Categoría', grande: false });
  const seo = {
    titulo: `${categoria.nombre_categoria} | ${SITE.nombre}`,
    descripcion: SITE.descripcionHome,
    canonicalUrl: SITE.urlBase,
  };

  // Categoría con productos → catálogo con filtros.
  if (productos.length) {
    const catalogo = crearCatalogo({ productos, items: getCatalogoDeCategoria(categoria.id_categoria) });
    return {
      html: html`${banner}<div class="container-fluid pt-2">${catalogo.html}</div>`,
      mount: catalogo.montar,
      seo,
    };
  }

  // Categoría sin productos propios (p. ej. "Libros", "Snacks") → sus subcategorías.
  const hermanas = getSubcategorias(categoria.tipo_categoria);
  return {
    html: html`
      ${banner}
      <div class="container-fluid pt-2">
        <div class="row px-xl-5 pb-3">
          ${hermanas.length
            ? hermanas.map(tarjetaCategoria)
            : html`<div class="col-12"><p class="text-muted">Aún no hay productos en esta categoría. <a href="${Router.href('/home')}">Volver al inicio</a></p></div>`}
        </div>
      </div>`,
    seo,
  };
}
