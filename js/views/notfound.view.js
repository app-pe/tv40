import { Router } from '../router.js';
import { html } from '../utils/html.js';

export function notFoundView() {
  return {
    html: html`
      <div class="container-fluid pt-5">
        <div class="text-center py-5">
          <h2 class="mb-3">Página no encontrada</h2>
          <p class="mb-4">La página que buscas no existe o ya no está disponible.</p>
          <a class="btn btn-primary" href="${Router.href('/home')}">Volver al inicio</a>
        </div>
      </div>`,
    seo: { titulo: 'Página no encontrada | TV40Shop' },
  };
}
