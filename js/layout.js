// Esqueleto fijo de la página (topbar, navbar, footer). Se pinta una sola vez;
// lo que cambia entre rutas es solo <main id="app">.

import { iniciarComportamientosGlobales } from './utils/ui.js';
import { renderFooter } from './views/components/footer.js';
import { renderNavbar } from './views/components/navbar.js';
import { montarTopbar, renderTopbar } from './views/components/topbar.js';

export function montarLayout() {
  const topbar = document.getElementById('show_topbar');
  const navbar = document.getElementById('show_navbar');
  const footer = document.getElementById('show_footer');

  topbar.innerHTML = String(renderTopbar());
  navbar.innerHTML = String(renderNavbar());
  footer.innerHTML = String(renderFooter());

  montarTopbar(topbar);
  iniciarComportamientosGlobales();
}
