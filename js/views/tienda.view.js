import { Router } from '../router.js';
import { getCatalogoDeTienda, getProductosByTienda, getTienda } from '../models/model.js';
import { datosPedidoDirecto } from '../models/pedido.js';
import { html } from '../utils/html.js';
import { seoDeTienda } from '../utils/seo.js';
import { crearCatalogo } from './components/catalogo.js';
import { notFoundView } from './notfound.view.js';

export async function tiendaView(ctx) {
  const tienda = getTienda(ctx.param);
  if (!tienda) return notFoundView(ctx);
  // Tiendas inactivas no se muestran: se vuelve al inicio.
  if (tienda.estado !== 1) return { redirigir: Router.href('/home') };

  const slogan = datosPedidoDirecto(tienda.id_tienda)?.slogan;
  // Una URL relativa dentro de una variable CSS se resolvería respecto a css/app.css, no a la página.
  const urlBanner = new URL(tienda.imagen_banner, document.baseURI).href;
  const catalogo = crearCatalogo({
    productos: getProductosByTienda(tienda.id_tienda),
    items: getCatalogoDeTienda(tienda.id_tienda),
    incluirCategorias: true,
  });

  return {
    html: html`
      <div class="banner-container" style="--banner-url: url('${urlBanner}')">
        <img src="${tienda.imagen_banner}" class="banner-img" alt="Banner oficial de ${tienda.nombre_tienda}">
      </div>
      <div class="container-fluid tienda-cabecera">
        <div class="row align-items-center justify-content-center justify-content-md-start px-xl-5">
          <div class="col-12 col-md-auto marketplace-shop-info text-center mb-3 mb-md-0">
            <div class="shop-logo"><img src="${tienda.imagen_logo}" alt="Logo oficial de ${tienda.nombre_tienda}"></div>
          </div>
          <div class="col-12 col-md tienda-datos text-center text-md-left">
            ${tienda.nombre_tienda ? html`<h1>${tienda.nombre_tienda}</h1>` : ''}
            ${tienda.ruc ? html`<p>RUC: ${tienda.ruc}</p>` : ''}
            ${tienda.razon_social ? html`<p>RS: ${tienda.razon_social}</p>` : ''}
            <div class="d-flex justify-content-center justify-content-md-start mb-1">
              <p class="mr-2 mb-0">Calificación</p>
              <div class="text-primary mr-2">
                <small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star"></small><small class="fas fa-star-half-alt"></small><small class="far fa-star"></small>
              </div>
              <small class="pt-1">(50 Reviews)</small>
            </div>
            ${slogan ? html`<h4 class="mt-1">${slogan}</h4>` : ''}
          </div>
        </div>
      </div>
      <div class="container-fluid pt-3">${catalogo.html}</div>`,
    mount: catalogo.montar,
    seo: await seoDeTienda(tienda),
  };
}
