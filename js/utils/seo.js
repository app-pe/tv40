import { SITE } from '../config.js';

let seoTiendas = null;

export async function cargarSeoTiendas() {
  if (seoTiendas) return seoTiendas;
  try {
    const r = await fetch(new URL('../../data/seo.json', import.meta.url));
    seoTiendas = r.ok ? await r.json() : {};
  } catch {
    seoTiendas = {};
  }
  return seoTiendas;
}

function metaTag(nombre, atributo = 'name') {
  let el = document.head.querySelector(`meta[${atributo}="${nombre}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(atributo, nombre);
    document.head.appendChild(el);
  }
  return el;
}

function canonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = url;
}

// Aplica título, descripción y canonical de la ruta actual.
export function aplicarSeo({ titulo, descripcion, keywords, canonicalUrl } = {}) {
  const t = titulo || SITE.tituloHome;
  const d = descripcion || SITE.descripcionHome;
  document.title = t;
  metaTag('description').setAttribute('content', d);
  if (keywords) metaTag('keywords').setAttribute('content', keywords);
  metaTag('og:title', 'property').setAttribute('content', t);
  metaTag('og:description', 'property').setAttribute('content', d);
  canonical(canonicalUrl || SITE.urlBase);
}

export async function seoDeTienda(tienda) {
  const todos = await cargarSeoTiendas();
  const propio = todos[tienda.id_tienda];
  return {
    titulo: propio?.title || `${tienda.nombre_tienda} | ${SITE.nombre}`,
    descripcion: propio?.description || tienda.descripcion_tienda || SITE.descripcionHome,
    keywords: propio?.keywords,
    canonicalUrl: `${SITE.urlBase}shop.html?id=${encodeURIComponent(tienda.id_tienda)}`,
  };
}
