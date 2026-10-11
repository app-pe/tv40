// Muestra enteros sin decimales (S/ 79) y el resto con dos (S/ 79.50).
export const dinero = (n) => {
  const v = Number(n);
  if (!Number.isFinite(v)) return '0';
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

export const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
