// Router por hash (#/ruta/param1/param2?clave=valor).
// Mismo espíritu que el de manyalo (tabla de rutas + 404), con parámetros múltiples,
// query string y control de renders obsoletos.

const rutas = new Map();
let rutaNoEncontrada = null;
let tokenActual = 0;
const hooks = { antes: [], despues: [] };

function decodificar(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function parsearHash(hash = window.location.hash) {
  const bruto = hash.replace(/^#/, '');
  const i = bruto.indexOf('?');
  const rutaBruta = i === -1 ? bruto : bruto.slice(0, i);
  const queryBruta = i === -1 ? '' : bruto.slice(i + 1);
  const segmentos = rutaBruta.split('/').filter(Boolean).map(decodificar);
  return {
    path: `/${segmentos[0] || 'home'}`,
    params: segmentos.slice(1),
    param: segmentos[1],
    query: Object.fromEntries(new URLSearchParams(queryBruta)),
  };
}

export const Router = {
  add(path, accion) {
    rutas.set(path, accion);
    return Router;
  },
  notFound(accion) {
    rutaNoEncontrada = accion;
    return Router;
  },
  antes(fn) {
    hooks.antes.push(fn);
    return Router;
  },
  despues(fn) {
    hooks.despues.push(fn);
    return Router;
  },
  // Construye el href de una ruta: Router.href('/detalle', 'atbp1', 'c1') → '#/detalle/atbp1/c1'
  href(path, ...params) {
    return '#' + [path, ...params].map((p, i) => (i === 0 ? p : encodeURIComponent(p))).join('/');
  },
  go(path, ...params) {
    const destino = Router.href(path, ...params);
    if (window.location.hash === destino) Router.resolve();
    else window.location.hash = destino;
  },
  async resolve() {
    const token = ++tokenActual;
    const ctx = parsearHash();
    ctx.esObsoleto = () => token !== tokenActual;
    const accion = rutas.get(ctx.path) || rutaNoEncontrada;
    hooks.antes.forEach((fn) => fn(ctx));
    try {
      await accion?.(ctx);
    } catch (error) {
      console.error('[router] error en', ctx.path, error);
      if (!ctx.esObsoleto() && rutaNoEncontrada) await rutaNoEncontrada({ ...ctx, error });
    }
    if (!ctx.esObsoleto()) hooks.despues.forEach((fn) => fn(ctx));
  },
  iniciar() {
    window.addEventListener('hashchange', () => Router.resolve());
    return Router.resolve();
  },
};
