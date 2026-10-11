# TV40Shop — arquitectura

SPA sin build, basada en el patrón de **manyalo**: una sola entrada (`index.html`), router por hash,
un `Model` como fachada de datos y vistas que reciben los parámetros de la ruta.
Mantiene el diseño de tv40 (Bootstrap 4, Poppins, `css/style.css`) y las librerías jQuery/Bootstrap/Owl.

## Estructura

```
index.html            Única entrada (topbar, navbar, <main id="app">, footer)
shop.html             Entrada real de tienda: shop.html?id=shopN arranca la SPA en #/tienda/shopN
category|detail|cart|checkout|contact.html   Redirigen a la ruta equivalente (enlaces antiguos)
data/bd-app.json      Datos (sin cambios). data/seo.json: título/descripción/keywords por tienda
css/style.css, css/app.css, lib/, img/       Estilos y recursos (sin cambios de rutas)
js/
├─ app.js             Arranque: cargar datos → layout → rutas → router
├─ config.js          WhatsApp por tienda, reglas de envío, tiendas de pedido directo, SEO base
├─ router.js          Router por hash con parámetros, query y control de renders obsoletos
├─ routes.js          Tabla de rutas + ciclo de vida de vistas (limpieza, SEO, scroll)
├─ layout.js          Esqueleto fijo (se pinta una vez)
├─ legacy.js          Compatibilidad con shop.html?id=…
├─ models/
│  ├─ db.js           Carga de bd-app.json e índices (sin await de nivel superior)
│  ├─ model.js        Fachada de lectura: getTienda, getCatalogoDeCategoria, getTallasDeVariante…
│  ├─ filtros.js      Filtrado puro (precio, categoría, color, talla)
│  ├─ carrito.js      Único dueño de localStorage ("items_carrito", misma clave y formato)
│  └─ pedido.js       Mensajes y URLs de WhatsApp
├─ views/             home, categoria, tienda, detalle, carrito, checkout, notfound (*.view.js)
│  └─ components/     topbar, navbar, footer, banner, catalogo (con filtros), tarjetas
└─ utils/             html (plantillas con escape), dom (delegación), format, seo, ui (puente jQuery)
```

## Rutas

| URL | Vista |
|---|---|
| `#/home` | Inicio |
| `#/categoria/:id` | Catálogo de la categoría (o sus subcategorías si no tiene productos) |
| `#/tienda/:id` | Tienda |
| `#/detalle/:atributo/:color` | Ficha de producto (`no` = producto sin variantes de color) |
| `#/carrito`, `#/checkout` | Carrito y pedido por WhatsApp |

## Convenciones

- **Vista** = función que devuelve `{ html, mount?, seo?, redirigir? }`. `mount({ root, signal })` enlaza
  eventos con delegación; el `signal` los elimina al salir de la ruta.
- Las vistas **solo leen datos vía `models/model.js`** y **solo tocan el carrito vía `models/carrito.js`**.
- Las plantillas `html\`…\`` escapan todo lo interpolado; el HTML de confianza (descripciones de
  `bd-app.json`) se marca con `raw()`.
- Cambios de negocio (teléfonos, envío gratis desde, tiendas de pedido directo) → `js/config.js`.

## Agregar una página

1. Crear `js/views/mi-pagina.view.js` que devuelva `{ html }`.
2. Registrarla en `js/routes.js`: `.add('/mi-pagina', montar(miPaginaView))`.
3. Enlazarla con `Router.href('/mi-pagina')`.
