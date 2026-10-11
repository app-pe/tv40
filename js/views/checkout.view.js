import { Router } from '../router.js';
import { Carrito } from '../models/carrito.js';
import { construirUrlPedido } from '../models/pedido.js';
import { MEDIOS_PAGO } from '../config.js';
import { on } from '../utils/dom.js';
import { dinero } from '../utils/format.js';
import { html } from '../utils/html.js';
import { renderBanner } from './components/banner.js';

export function checkoutView() {
  const items = Carrito.items();
  const banner = renderBanner({ titulo: 'Checkout', miga: 'Checkout' });

  if (!items.length) {
    return {
      html: html`
        ${banner}
        <div class="container-fluid pt-5 text-center py-5">
          <h4 class="mb-3">Tu carrito está vacío</h4>
          <a class="btn btn-primary" href="${Router.href('/home')}">Seguir comprando</a>
        </div>`,
      seo: { titulo: 'Checkout | TV40Shop' },
    };
  }

  const { subtotal, envio, envioGratis, total } = Carrito.totales(items);

  return {
    html: html`
      ${banner}
      <div class="container-fluid pt-5">
        <div class="row px-xl-5">
          <div class="col-lg-8">
            <div class="mb-4">
              <h4 class="font-weight-semi-bold mb-4">Datos de Envío</h4>
              <div class="alert alert-danger d-none" id="checkout-error" role="alert"></div>
              <div class="row">
                <div class="col-md-6 form-group"><input id="vnombre" class="form-control" type="text" placeholder="Nombre" autocomplete="name"></div>
                <div class="col-md-6 form-group"><input id="vcelular" class="form-control" type="tel" placeholder="celular" autocomplete="tel"></div>
                <div class="col-md-6 form-group"><input id="vdireccion" class="form-control" type="text" placeholder="dirección de envío" autocomplete="street-address"></div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card border-secondary mb-5">
              <div class="card-header bg-secondary border-0"><h4 class="font-weight-semi-bold m-0">Total de Pedido</h4></div>
              <div class="card-body">
                <h5 class="font-weight-medium mb-3">Productos</h5>
                ${items.map(
                  (i) => html`
                    <div class="d-flex justify-content-between small">
                      <label>${[i.cantidad, i.nombre_producto, i.tallav, i.colorv, i.atb].filter((x) => x !== '' && x != null).join(' ')}</label>
                      <label>${dinero(i.subtotal)}</label>
                    </div>`
                )}
                <hr class="mt-0">
                <div class="d-flex justify-content-between mb-3 pt-1"><h6 class="font-weight-medium">Subtotal</h6><h6 class="font-weight-medium">${dinero(subtotal)}</h6></div>
                <div class="d-flex justify-content-between"><h6 class="font-weight-medium">Envío</h6><h6 class="font-weight-medium">${envioGratis ? 'gratis' : dinero(envio)}</h6></div>
              </div>
              <div class="card-footer border-secondary bg-transparent">
                <div class="d-flex justify-content-between mt-2"><h5 class="font-weight-bold">Total</h5><h5 class="font-weight-bold">${dinero(total)}</h5></div>
              </div>
            </div>
            <div class="card border-secondary mb-5">
              <div class="card-header bg-secondary border-0"><h4 class="font-weight-semi-bold m-0">Medio de Pago</h4></div>
              <div class="card-body">
                ${MEDIOS_PAGO.map(
                  (medio) => html`
                    <div class="form-group">
                      <div class="custom-control custom-radio">
                        <input type="radio" class="custom-control-input" name="payment" id="${medio}" value="${medio}">
                        <label class="custom-control-label" for="${medio}">${medio}</label>
                      </div>
                    </div>`
                )}
              </div>
              <div class="card-footer border-secondary bg-transparent">
                <button type="button" class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" id="btn_enviarpedido">Enviar Pedido</button>
              </div>
            </div>
          </div>
        </div>
      </div>`,
    mount({ root, signal }) {
      const error = root.querySelector('#checkout-error');
      on(root, 'click', '#btn_enviarpedido', () => {
        const persona = {
          nombre: root.querySelector('#vnombre').value.trim(),
          celular: root.querySelector('#vcelular').value.trim(),
          direccion: root.querySelector('#vdireccion').value.trim(),
        };
        const medioPago = root.querySelector('input[name="payment"]:checked')?.value || '';

        const faltantes = [];
        if (!persona.nombre) faltantes.push('tu NOMBRE');
        if (!persona.celular) faltantes.push('tu CELULAR');
        if (!persona.direccion) faltantes.push('la DIRECCIÓN de envío');
        if (!medioPago) faltantes.push('un MEDIO DE PAGO');
        if (faltantes.length) {
          error.textContent = `Falta ingresar ${faltantes.join(', ')}.`;
          error.classList.remove('d-none');
          error.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        error.classList.add('d-none');

        const itemsActuales = Carrito.items();
        window.location.href = construirUrlPedido({
          items: itemsActuales,
          totales: Carrito.totales(itemsActuales),
          medioPago,
          persona,
        });
      }, signal);
    },
    seo: { titulo: 'Checkout | TV40Shop' },
  };
}
