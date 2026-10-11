import { Router } from '../router.js';
import { getCategoriasPrincipales, getSubcategorias, getTiendasActivas } from '../models/model.js';
import { SITE } from '../config.js';
import { html } from '../utils/html.js';
import { tarjetaCategoria } from './components/tarjetas.js';

export function homeView() {
  const destacadas = getSubcategorias();
  const principales = getCategoriasPrincipales();
  const tiendas = getTiendasActivas();

  const carrusel = html`
    <div class="container-fluid mb-3">
      <div class="row border-top px-xl-5">
        <div class="col-lg-12">
          <div id="header-carousel" class="carousel slide carrusel-inicio" data-ride="carousel">
            <div class="carousel-inner">
              ${destacadas.map(
                (c, i) => html`
                  <div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <img class="carrusel-img" src="${c.default_imagen_categoria}" alt="${c.nombre_categoria}">
                    <div class="carousel-caption carrusel-caption">
                      <h3 class="carrusel-titulo">${c.nombre_categoria}</h3>
                      <a href="${Router.href('/categoria', c.id_categoria)}" class="btn btn-light carrusel-btn">Comprar</a>
                    </div>
                  </div>`
              )}
            </div>
            <a class="carousel-control-prev" href="#header-carousel" data-slide="prev" aria-label="Anterior">
              <div class="btn btn-dark carrusel-flecha"><span class="carousel-control-prev-icon"></span></div>
            </a>
            <a class="carousel-control-next" href="#header-carousel" data-slide="next" aria-label="Siguiente">
              <div class="btn btn-dark carrusel-flecha"><span class="carousel-control-next-icon"></span></div>
            </a>
          </div>
        </div>
      </div>
    </div>`;

  const categorias = html`
    <div class="container-fluid pt-4">
      <div class="text-center mb-4">
        <h2 class="section-title px-5"><span class="px-2">Categorías</span></h2>
      </div>
      <div class="row px-xl-5 pb-3">${principales.map(tarjetaCategoria)}</div>
    </div>`;

  const vendedores = html`
    <div class="container-fluid py-5">
      <div class="text-center mb-4">
        <h2 class="section-title px-5"><span class="px-2">Tiendas Afiliadas</span></h2>
      </div>
      <div class="row px-xl-5">
        <div class="col">
          <div class="owl-carousel vendor-carousel">
            ${tiendas.map(
              (t) => html`
                <div class="vendor-item border p-4">
                  <a href="${Router.href('/tienda', t.id_tienda)}"><img src="${t.imagen_logo}" alt="Logo oficial de ${t.nombre_tienda}"></a>
                </div>`
            )}
          </div>
        </div>
      </div>
    </div>`;

  return {
    html: html`${carrusel}${categorias}${vendedores}`,
    seo: { titulo: SITE.tituloHome, descripcion: SITE.descripcionHome },
  };
}
