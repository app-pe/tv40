// Tarjetas reutilizables: producto (catálogo) y categoría.

import { Router } from '../../router.js';
import { construirUrlPedidoDirecto, datosPedidoDirecto } from '../../models/pedido.js';
import { contarProductosDeCategoria } from '../../models/model.js';
import { html, raw } from '../../utils/html.js';
import { dinero, plural } from '../../utils/format.js';

// Una sola tarjeta para categoría, tienda y filtros (antes: ms_catalogo.js con dos ramas duplicadas).
export function tarjetaProducto(item) {
  const directo = datosPedidoDirecto(item.id_tienda);
  const hrefDetalle = Router.href('/detalle', item.id_atributo, item.id_color);
  const hrefTienda = Router.href('/tienda', item.id_tienda);
  const hrefComprar = directo ? construirUrlPedidoDirecto(item.id_tienda, item.nombre_producto) : hrefDetalle;
  const externo = directo ? raw('target="_blank" rel="noopener"') : '';

  const precios = directo
    ? html`
        <h6 class="text-left text-products">${directo.etiqueta}</h6>
        <h6 class="text-left precio-oferta">${directo.telefonoVisible}</h6>`
    : html`
        <h6 class="text-left precio-catalogo">S/ ${dinero(item.precio_catalogo)}</h6>
        <h6 class="text-left precio-oferta">S/ ${dinero(item.precio_oferta)}</h6>`;

  return html`
    <div class="col-12 col-md-6 col-lg-3 pb-1 d-flex">
      <article class="card product-item border mb-4">
        <div class="product-img position-relative overflow-hidden bg-transparent">
          <a href="${hrefComprar}" class="cat-img position-relative overflow-hidden" ${externo} aria-label="${item.nombre_producto}">
            <img class="cat-img" src="${item.img}" alt="${item.nombre_producto}" loading="lazy">
          </a>
        </div>
        <div class="producto-info">
          <h6 class="text-left producto-titulo" title="${item.nombre_producto}">${item.nombre_producto}</h6>
          <div class="producto-pie">
            <div class="producto-precios">${precios}</div>
            <div class="producto-acciones">
              <a href="${hrefTienda}" class="btn border btn-accion" title="Ver tienda" aria-label="Ver tienda"><i class="fas fa-eye text-primary"></i></a>
              <a href="${hrefComprar}" class="btn border btn-accion" title="Comprar" aria-label="Comprar" ${externo}><i class="fas fa-shopping-cart text-primary"></i></a>
            </div>
          </div>
        </div>
      </article>
    </div>`;
}

export function tarjetaCategoria(categoria) {
  const href = Router.href('/categoria', categoria.id_categoria);
  const total = contarProductosDeCategoria(categoria);
  return html`
    <div class="col-12 col-md-6 col-lg-4 pb-1 d-flex">
      <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
        <p class="text-right">${plural(total, 'producto', 'productos')}</p>
        <a href="${href}" class="cat-img position-relative overflow-hidden mb-3">
          <img class="img-fluid" src="${categoria.default_imagen_categoria}" alt="${categoria.nombre_categoria}" loading="lazy">
        </a>
        <h5 class="font-weight-semi-bold m-0"><a class="text-dark" href="${href}">${categoria.nombre_categoria}</a></h5>
      </div>
    </div>`;
}
