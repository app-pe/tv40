import { Router } from '../../router.js';
import { html } from '../../utils/html.js';

// Franja gris con el título de la página y las migas de pan ("Inicio - Carrito").
// `grande` = título h1 en mayúsculas (carrito, checkout); si no, h3 (categorías).
export function renderBanner({ titulo, miga, grande = true }) {
  return html`
    <div class="container-fluid bg-secondary mb-4">
      <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 100px">
        ${grande
          ? html`<h1 class="font-weight-semi-bold text-uppercase mb-3">${titulo}</h1>`
          : html`<h3 class="font-weight-semi-bold mb-3">${titulo}</h3>`}
        <div class="d-inline-flex">
          <p class="m-0"><a href="${Router.href('/home')}">Inicio</a></p>
          <p class="m-0 px-2">-</p>
          <p class="m-0">${miga}</p>
        </div>
      </div>
    </div>`;
}
