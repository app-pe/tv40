import { Router } from '../router.js';
import { Carrito } from '../models/carrito.js';
import {
  SIN_COLOR,
  codigoAtb,
  getColor,
  getColoresDeAtributo,
  getFilasVariante,
  getImagenesDeVariante,
  getProducto,
  getTalla,
  getTallasDeVariante,
  getTienda,
} from '../models/model.js';
import { CARRITO } from '../config.js';
import { on } from '../utils/dom.js';
import { dinero } from '../utils/format.js';
import { html, raw } from '../utils/html.js';
import { mostrarModal, ocultarModal } from '../utils/ui.js';
import { notFoundView } from './notfound.view.js';

const textoPlano = (fragmentoHtml) =>
  String(fragmentoHtml || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);

const galeria = (urls, nombre) =>
  urls.map(
    (url, i) => html`
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img class="w-100 h-100" src="${url}" alt="${nombre}">
      </div>`
  );

const radiosTallas = (tallas, seleccionada) =>
  tallas.map(
    (t) => html`
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" name="size" id="talla-${t.id_talla}" data-talla="${t.id_talla}" value="${t.nombre_talla}" ${seleccionada === t.id_talla ? raw('checked') : ''}>
        <label class="custom-control-label" for="talla-${t.id_talla}">${t.nombre_talla}</label>
      </div>`
  );

const radiosColores = (colores, seleccionado) =>
  colores.map(
    (c) => html`
      <div class="custom-control custom-radio custom-control-inline">
        <input type="radio" class="custom-control-input" name="colores_prod" id="color-${c.id_color}" data-color="${c.id_color}" value="${c.nombre_color}" ${seleccionado === c.id_color ? raw('checked') : ''}>
        <label class="custom-control-label" for="color-${c.id_color}">${c.nombre_color}</label>
      </div>`
  );

export function detalleView(ctx) {
  const [atributo, colorInicial] = ctx.params;
  const filasIniciales = getFilasVariante(atributo, colorInicial);
  if (!filasIniciales.length) return notFoundView(ctx);

  const producto = getProducto(filasIniciales[0].id_producto);
  const tienda = getTienda(producto.id_tienda);
  const sinColor = colorInicial === SIN_COLOR;
  const colores = getColoresDeAtributo(atributo);

  // Estado de la ficha: variante elegida.
  const estado = { color: colorInicial, talla: null, imagenes: [] };
  const tallasDe = (color) => getTallasDeVariante(atributo, color);
  const cargarVariante = (color) => {
    estado.color = color;
    estado.imagenes = getImagenesDeVariante(atributo, color, producto);
    estado.talla = tallasDe(color)[0]?.id_talla ?? null;
  };
  cargarVariante(colorInicial);
  const atbActual = () => codigoAtb(atributo, estado.color, estado.talla);

  const vista = html`
    <div class="container-fluid py-2">
      <div class="row px-xl-5">
        <div class="col-lg-5 pb-2">
          <div id="product-carousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner border" id="show_img_galeria">${galeria(estado.imagenes, producto.nombre_producto)}</div>
            <a class="carousel-control-prev" href="#product-carousel" data-slide="prev"><i class="fa fa-2x fa-angle-left text-dark"></i></a>
            <a class="carousel-control-next" href="#product-carousel" data-slide="next"><i class="fa fa-2x fa-angle-right text-dark"></i></a>
          </div>
        </div>
        <div class="col-lg-7 pb-5">
          <h3 class="font-weight-semi-bold">${producto.nombre_producto}</h3>
          <div class="form-group form-inline">
            <label class="font-weight-semi-bold">ATB: </label>
            <label id="codigo_atb" class="font-weight-semi-bold ml-2">${atbActual()}</label>
          </div>
          <div class="form-group form-inline">
            <label>Normal: </label>
            <label class="font-weight-semi-bold precio-detail ml-2"> S/ ${dinero(producto.precio_catalogo)}</label>
          </div>
          <div class="form-group form-inline">
            <label>Internet: </label>
            <label class="font-weight-semi-bold ml-2"> S/ ${dinero(producto.precio_oferta)}</label>
          </div>
          ${sinColor
            ? ''
            : html`
                <div id="divrbFtallaycolor">
                  <div class="d-flex mb-3">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Tallas:</p>
                    <form id="show_tallas">${radiosTallas(tallasDe(estado.color), estado.talla)}</form>
                  </div>
                  <div class="d-flex mb-4">
                    <p class="text-dark font-weight-medium mb-0 mr-3">Colores:</p>
                    <form id="show_colores">${radiosColores(colores, estado.color)}</form>
                  </div>
                </div>`}
          <div class="d-flex align-items-center mb-4 pt-2">
            <div class="input-group quantity mr-3" style="width: 130px;">
              <div class="input-group-btn">
                <button type="button" class="btn btn-primary btn-minus" aria-label="Menos"><i class="fa fa-minus letra_btn_cant"></i></button>
              </div>
              <input type="text" class="form-control bg-secondary text-center" id="cantidad" value="${CARRITO.cantidadMin}" readonly="readonly">
              <div class="input-group-btn">
                <button type="button" class="btn btn-primary btn-plus" aria-label="Más"><i class="fa fa-plus letra_btn_cant"></i></button>
              </div>
            </div>
            <button type="button" id="btn_carrito" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i>Agregar Carrito</button>
          </div>
          <div class="d-flex pt-2">
            <p class="text-dark font-weight-medium mb-0">Vendido por:</p>
            <div class="d-inline-flex">
              <a class="text-dark px-2" href="${Router.href('/tienda', tienda.id_tienda)}"><h5>${tienda.nombre_tienda}</h5></a>
            </div>
          </div>
        </div>
      </div>
      <div class="row px-xl-5">
        <div class="col">
          <div class="nav nav-tabs justify-content-center border-secondary mb-4">
            <a class="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Descripción</a>
            <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Beneficios</a>
          </div>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="tab-pane-1">
              <h4 class="mb-3">Producto de Alta Calidad</h4>
              ${raw(producto.descripcion)}
            </div>
            <div class="tab-pane fade" id="tab-pane-2">${raw(producto.beneficio)}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modal-carrito" tabindex="-1" role="dialog" aria-labelledby="modal-carrito-titulo" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title" id="modal-carrito-titulo">Se agregó producto al carrito</h6>
            <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body" id="modal_carrito"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" data-ver-carrito>Ver carrito</button>
          </div>
        </div>
      </div>
    </div>`;

  function montar({ root, signal }) {
    const cantidad = root.querySelector('#cantidad');
    const codigo = root.querySelector('#codigo_atb');
    const modal = root.querySelector('#modal-carrito');

    // Cambiar de color: nueva galería, nuevas tallas y nuevo código. La URL se actualiza sin recargar.
    on(root, 'change', 'input[data-color]', (_e, input) => {
      cargarVariante(input.dataset.color);
      root.querySelector('#show_img_galeria').innerHTML = String(galeria(estado.imagenes, producto.nombre_producto));
      root.querySelector('#show_tallas').innerHTML = String(radiosTallas(tallasDe(estado.color), estado.talla));
      codigo.textContent = atbActual();
      history.replaceState(null, '', Router.href('/detalle', atributo, estado.color));
    }, signal);

    on(root, 'change', 'input[data-talla]', (_e, input) => {
      estado.talla = input.dataset.talla;
      codigo.textContent = atbActual();
    }, signal);

    on(root, 'click', '.btn-plus', () => {
      cantidad.value = Math.min(CARRITO.cantidadMax, Number(cantidad.value) + 1);
    }, signal);
    on(root, 'click', '.btn-minus', () => {
      cantidad.value = Math.max(CARRITO.cantidadMin, Number(cantidad.value) - 1);
    }, signal);

    on(root, 'click', '#btn_carrito', () => {
      const talla = estado.talla ? getTalla(estado.talla)?.nombre_talla || '' : '';
      const colorNombre = sinColor ? '' : getColor(estado.color)?.nombre_color || '';
      const item = {
        id_producto: producto.id_producto,
        id_tienda: producto.id_tienda,
        id_categoria: producto.id_categoria,
        id_atributo: atributo,
        nombre_producto: producto.nombre_producto,
        precio_catalogo: producto.precio_catalogo,
        precio_oferta: producto.precio_oferta,
        atb: atbActual(),
        tallax: estado.talla || '',
        tallav: talla,
        color: sinColor ? '' : estado.color,
        colorv: colorNombre,
        cantidad: Number(cantidad.value),
        url_img: estado.imagenes[0],
      };
      const agregado = Carrito.agregar(item);
      root.querySelector('#modal-carrito-titulo').textContent = agregado
        ? 'Se agregó producto al carrito'
        : 'Este producto ya está en tu carrito';
      root.querySelector('#modal_carrito').innerHTML = String(
        agregado
          ? html`
              <div class="d-inline-block">${item.cantidad}</div>
              <div class="d-inline-block">${item.nombre_producto}</div>
              ${talla ? html`<div class="d-inline-block">talla: ${talla}</div>` : ''}
              ${colorNombre ? html`<div class="d-inline-block">color: ${colorNombre}</div>` : ''}
              <div class="d-inline-block">precio: S/ ${dinero(item.precio_oferta)}</div>`
          : html`<div class="d-inline-block">YA EXISTE EN EL CARRITO</div>`
      );
      mostrarModal(modal);
    }, signal);

    // Cerramos el modal antes de navegar para no dejar su fondo oscuro sobre la página siguiente.
    on(root, 'click', '[data-ver-carrito]', () => ocultarModal(modal, () => Router.go('/carrito')), signal);
  }

  return {
    html: vista,
    mount: montar,
    seo: {
      titulo: `${producto.nombre_producto} | ${tienda.nombre_tienda} | TV40Shop`,
      descripcion: textoPlano(producto.descripcion),
    },
  };
}

