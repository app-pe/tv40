// Plantillas HTML con escape automático.
//
//   html`<p>${nombre}</p>`        → `nombre` se escapa
//   html`<div>${raw(htmlDeJson)}</div>` → se inserta tal cual (solo para HTML de confianza)
//   html`<ul>${items.map(i => html`<li>${i}</li>`)}</ul>` → arrays y plantillas anidadas OK

class Raw {
  constructor(valor) {
    this.valor = valor;
  }
  toString() {
    return this.valor;
  }
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);
export const raw = (s) => new Raw(String(s ?? ''));

function renderValor(v) {
  if (v === null || v === undefined || v === false) return '';
  if (v instanceof Raw) return v.valor;
  if (Array.isArray(v)) return v.map(renderValor).join('');
  return esc(v);
}

export function html(strings, ...valores) {
  let salida = strings[0];
  valores.forEach((v, i) => {
    salida += renderValor(v) + strings[i + 1];
  });
  return new Raw(salida);
}
