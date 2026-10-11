import { Router } from '../router.js';
import { Carrito, claveItem } from '../models/carrito.js';
import { CARRITO } from '../config.js';
import { on } from '../utils/dom.js';
import { dinero } from '../utils/format.js';
import { html } from '../utils/html.js';
import { renderBanner } from './components/banner.js';

function filas(items) {
  return items.map(
    (i) => html`
      <tr>
        <td class="align-middle small">
          <img src="${i.url_img}" alt="" style="width: 40px;">${i.nombre_producto}
          ${i.tallav || i.colorv
            ? html`<div class="text-muted">${[i.tallav && `talla ${i.tallav}`, i.colorv && `color ${i.colorv}`].filter(Boolean).join(' · ')}</div>`
            : ''}
        </td>
        <td class="align-middle text-center">S/${dinero(i.precio_oferta)}</td>
        <td class="align-middle text-center">
          <div class="input-group quantity mx-auto" style="width: 100px;">
            <div class="input-group-btn">
              <button type="button" class="btn btn-sm btn-primary" data-accion="menos" data-clave="${claveItem(i)}" aria-label="Menos"><i class="fa fa-minus letra_btn_cant"></i></button>
            </div>
            <input type="text" class="form-control form-control-sm bg-secondary text-center" value="${i.cantidad}" readonly="readonly" aria-label="Cantidad">
            <div class="input-group-btn">
              <button type="button" class="btn btn-sm btn-primary" data-accion="mas" data-clave="${claveItem(i)}" aria-label="Más"><i class="fa fa-plus letra_btn_cant"></i></button>
            </div>
          </div>
        </td>
        <td class="align-middle text-center">${dinero(i.subtotal)}</td>
        <td class="align-middle text-center">
          <button type="button" class="btn btn-sm btn-primary" data-accion="eliminar" data-clave="${claveItem(i)}" aria-label="Eliminar"><i class="fa fa-times"></i></button>
        </td>
      </tr>`
  );
}

function contenido() {
  const items = Carrito.items();
  if (!items.length) {
    return html`
      <div class="text-center py-5">
        <h4 class="mb-3">Tu carrito está vacío</h4>
        <a class="btn btn-primary" href="${Router.href('/home')}">Seguir comprando</a>
      </div>`;
  }
  const { subtotal, envio, envioGratis, total } = Carrito.totales(items);
  return html`
    <div class="row px-xl-5">
      <div class="col-lg-8 table-responsive mb-5">
        <table class="table table-bordered mb-0">
          <thead class="bg-secondary text-dark">
            <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Eliminar</th></tr>
          </thead>
          <tbody class="align-middle">${filas(items)}</tbody>
        </table>
      </div>
      <div class="col-lg-4">
        <div class="card border-secondary mb-5">
          <div class="card-header bg-secondary border-0"><h4 class="font-weight-semi-bold m-0">Resumen</h4></div>
          <div class="card-body">
            <div class="d-flex justify-content-between mb-3 pt-1">
              <h6 class="font-weight-medium">Subtotal</h6><h6 class="font-weight-medium">${dinero(subtotal)}</h6>
            </div>
            <div class="d-flex justify-content-between">
              <h6 class="font-weight-medium">Envío</h6><h6 class="font-weight-medium">${envioGratis ? 'gratis' : dinero(envio)}</h6>
            </div>
            ${!envioGratis
              ? html`<small class="text-muted">Envío gratis desde S/${dinero(CARRITO.envioGratisDesde)}</small>`
              : ''}
          </div>
          <div class="card-footer border-secondary bg-transparent">
            <div class="d-flex justify-content-between mt-2">
              <h5 class="font-weight-bold">Total</h5><h5 class="font-weight-bold">${dinero(total)}</h5>
            </div>
            <button type="button" class="btn btn-block btn-primary my-3 py-3" data-accion="registrar">Registrar Pedido</button>
          </div>
        </div>
      </div>
    </div>`;
}

export function carritoView() {
  return {
    html: html`
      ${renderBanner({ titulo: 'Carrito', miga: 'Carrito' })}
      <div class="container-fluid pt-5" id="vista-carrito">${contenido()}</div>`,
    mount({ root, signal }) {
      const zona = root.querySelector('#vista-carrito');
      const repintar = () => {
        zona.innerHTML = String(contenido());
      };
      on(root, 'click', '[data-accion]', (_e, boton) => {
        const { accion, clave } = boton.dataset;
        if (accion === 'mas') Carrito.cambiarCantidad(clave, +1);
        else if (accion === 'menos') Carrito.cambiarCantidad(clave, -1);
        else if (accion === 'eliminar') Carrito.eliminar(clave);
        else if (accion === 'registrar') return Router.go(Carrito.cantidadLineas() ? '/checkout' : '/home');
        repintar();
      }, signal);
    },
    seo: { titulo: 'Carrito | TV40Shop' },
  };
}
