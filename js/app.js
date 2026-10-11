// Punto de entrada: carga datos → pinta el layout → registra rutas → arranca el router.

import { cargarDatos } from './models/db.js';
import { montarLayout } from './layout.js';
import { adaptarEntradaLegacy } from './legacy.js';
import { Router } from './router.js';
import { registrarRutas } from './routes.js';

function mostrarErrorDeCarga(error) {
  console.error(error);
  document.getElementById('app').innerHTML =
    '<div class="container text-center py-5"><h4>No pudimos cargar el catálogo</h4>' +
    '<p>Revisa tu conexión e inténtalo de nuevo.</p>' +
    '<button class="btn btn-primary" onclick="location.reload()">Reintentar</button></div>';
}

async function iniciar() {
  try {
    await cargarDatos();
  } catch (error) {
    return mostrarErrorDeCarga(error);
  }
  montarLayout();
  registrarRutas();
  adaptarEntradaLegacy();
  Router.iniciar();
}

iniciar();
