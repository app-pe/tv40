export const $1 = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

// Delegación de eventos: un solo listener en `root` para todos los elementos que cumplan `selector`.
// Si se pasa `signal` (AbortSignal) el listener se elimina al cambiar de ruta.
export function on(root, tipo, selector, handler, signal) {
  root.addEventListener(
    tipo,
    (evento) => {
      const objetivo = evento.target instanceof Element ? evento.target.closest(selector) : null;
      if (objetivo && root.contains(objetivo)) handler(evento, objetivo);
    },
    { signal }
  );
}
