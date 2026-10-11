// Catálogo con barra de filtros, compartido por la página de categoría y la de tienda
// (antes duplicado en v_category.js / v_shop_catalogo.js / c_*_filtros.js).

import { getOpcionesFiltro } from '../../models/model.js';
import { alternar, aplicarFiltros, crearEstadoFiltros } from '../../models/filtros.js';
import { on } from '../../utils/dom.js';
import { html } from '../../utils/html.js';
import { dinero } from '../../utils/format.js';
import { tarjetaProducto } from './tarjetas.js';

const casillas = (tipo, opciones) =>
  opciones.map(
    (o) => html`
      <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-2">
        <input type="checkbox" class="custom-control-input" id="f-${tipo}-${o.id}" data-filtro="${tipo}" data-valor="${o.id}">
        <label class="custom-control-label" for="f-${tipo}-${o.id}">${o.nombre}</label>
        <span>${o.cantidad}</span>
      </div>`
  );

const desplegable = (id, titulo, contenido) => html`
  <div class="dropdown ml-0">
    <button class="btn border dropdown-toggle" type="button" id="${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${titulo}</button>
    <div class="dropdown-menu" aria-labelledby="${id}">
      <form class="px-3" data-filtros-form>${contenido}</form>
    </div>
  </div>`;

function grilla(items) {
  if (!items.length) return html`<div class="col-12"><p class="text-muted">No hay productos que coincidan con los filtros elegidos.</p></div>`;
  return items.map(tarjetaProducto);
}

/**
 * @param {object[]} productos  productos del conjunto (categoría o tienda)
 * @param {object[]} items      variantes ya construidas para pintar
 * @param {boolean}  incluirCategorias  muestra el filtro "Categoría" (solo en tienda)
 */
export function crearCatalogo({ productos, items, incluirCategorias = false }) {
  const opciones = getOpcionesFiltro(productos);
  // Igual que antes: la barra de filtros solo aparece cuando el conjunto tiene tallas
  // (ropa y uniformes); los snacks, libros y plantas se muestran sin filtros.
  const mostrarFiltros = opciones.tallas.length > 0;

  const barra = !mostrarFiltros
    ? ''
    : html`
        <div class="col-12 pb-1" id="divFiltros">
          <label class="form-label text-primary font-weight-bold">Filtros</label>
          <div class="d-flex align-items-center mb-4">
            ${desplegable(
              'filtro-precio',
              'Precio',
              html`
                <output>S/${dinero(opciones.precioMin)}</output>
                <input type="range" id="show_range" data-precio min="${opciones.precioMin}" max="${opciones.precioMax}" step="1" value="${opciones.precioMax}">
                S/<output data-precio-salida>${dinero(opciones.precioMax)}</output>`
            )}
            ${incluirCategorias ? desplegable('filtro-categoria', 'Categoría', casillas('categoria', opciones.categorias)) : ''}
            ${desplegable('filtro-color', 'Color', casillas('color', opciones.colores))}
            ${desplegable('filtro-talla', 'Talla', casillas('talla', opciones.tallas))}
          </div>
        </div>`;

  const contenido = html`
    <div class="row px-xl-5">
      <div class="col-lg-12 col-md-12">
        <div class="row pb-3">
          ${barra}
          <div class="row col-12" id="show_filtroprod">${grilla(items)}</div>
        </div>
      </div>
    </div>`;

  function montar({ root, signal }) {
    const estado = crearEstadoFiltros(opciones.precioMax);
    const destino = root.querySelector('#show_filtroprod');
    const repintar = () => {
      destino.innerHTML = String(grilla(aplicarFiltros(items, estado)));
    };

    on(root, 'change', 'input[data-filtro]', (_e, input) => {
      const conjunto = { categoria: estado.categorias, color: estado.colores, talla: estado.tallas }[input.dataset.filtro];
      alternar(conjunto, input.dataset.valor, input.checked);
      repintar();
    }, signal);

    on(root, 'input', 'input[data-precio]', (_e, rango) => {
      estado.precioMax = Number(rango.value);
      const salida = root.querySelector('[data-precio-salida]');
      if (salida) salida.textContent = dinero(rango.value);
      repintar();
    }, signal);

    // El formulario solo sirve para que Bootstrap no cierre el menú al marcar casillas.
    on(root, 'submit', 'form[data-filtros-form]', (e) => e.preventDefault(), signal);
  }

  return { html: contenido, montar };
}
