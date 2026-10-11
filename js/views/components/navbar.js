import { Router } from '../../router.js';
import { getCategoriasPrincipales } from '../../models/model.js';
import { html } from '../../utils/html.js';

export function renderNavbar() {
  const categorias = getCategoriasPrincipales();
  return html`
    <div class="row border-top px-xl-5">
      <div class="col-lg-12">
        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
          <a href="${Router.href('/home')}" class="text-decoration-none d-block d-lg-none">
            <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">TV40</span>Shop</h1>
          </a>
          <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse2">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse2">
            <div class="navbar-nav mr-auto py-0">
              <a href="${Router.href('/home')}" class="nav-item nav-link active">Inicio</a>
              <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Categorías</a>
                <div class="dropdown-menu rounded-0 m-0">
                  ${categorias.map(
                    (c) => html`<a href="${Router.href('/categoria', c.id_categoria)}" class="dropdown-item">${c.nombre_categoria}</a>`
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>`;
}
