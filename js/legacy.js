// Compatibilidad con las URLs de la versión multipágina.
//
// shop.html?id=shopN sigue siendo una página real (indexable, con su canonical y metadatos
// propios): arranca la misma SPA directamente en #/tienda/shopN sin cambiar la URL visible.

export function adaptarEntradaLegacy() {
  const { pathname, search, hash } = window.location;
  if (hash && hash !== '#') return;

  if (/\/shop\.html$/.test(pathname)) {
    const id = new URLSearchParams(search).get('id');
    const destino = id ? `#/tienda/${encodeURIComponent(id)}` : '#/home';
    window.history.replaceState(null, '', `${pathname}${search}${destino}`);
  }
}
