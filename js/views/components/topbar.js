import { Router } from '../../router.js';
import { Carrito } from '../../models/carrito.js';
import { html } from '../../utils/html.js';

export function renderTopbar() {
  return html`
    <div class="row align-items-center py-3 px-xl-5">
      <div class="col-lg-3 d-none d-lg-block">
        <a href="${Router.href('/home')}" class="text-decoration-none">
          <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">TV40</span>Shop</h1>
        </a>
      </div>
      <div class="col-lg-6 col-6 text-left">
        <form action="" data-buscador>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for products">
            <div class="input-group-append">
              <span class="input-group-text bg-transparent text-primary"><i class="fa fa-search"></i></span>
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg-3 col-6 text-right">
        <a href="${Router.href('/carrito')}" class="btn border" id="link_carrito">
          <i class="fas fa-shopping-cart text-primary"></i>
          <span class="badge" id="contador_carrito">0</span>
        </a>
      </div>
    </div>`;
}

export function montarTopbar(root) {
  const contador = root.querySelector('#contador_carrito');
  const actualizar = () => {
    contador.textContent = Carrito.cantidadLineas();
  };
  actualizar();
  // El contador se mantiene al día con cualquier cambio del carrito (agregar, quitar, otra pestaña).
  window.addEventListener(Carrito.EVENTO, actualizar);
  window.addEventListener('storage', actualizar);
  // El buscador todavía no tiene función: evitamos que el envío recargue la página.
  root.querySelector('[data-buscador]').addEventListener('submit', (e) => e.preventDefault());
}
