// Puente con los plugins jQuery que se mantienen (Bootstrap 4, Owl Carousel).
// Es el único módulo que toca jQuery: el resto de la app no depende de él.

const jq = () => window.jQuery;

// Menús desplegables al pasar el mouse (solo escritorio) + botón "volver arriba".
export function iniciarComportamientosGlobales() {
  const $ = jq();
  if (!$) return;

  function alternarDropdownHover() {
    if ($(window).width() > 992) {
      $('.navbar .dropdown')
        .off('mouseover.hover mouseout.hover')
        .on('mouseover.hover', function () {
          $('.dropdown-toggle', this).trigger('click');
        })
        .on('mouseout.hover', function () {
          $('.dropdown-toggle', this).trigger('click').blur();
        });
    } else {
      $('.navbar .dropdown').off('mouseover.hover mouseout.hover');
    }
  }
  alternarDropdownHover();
  $(window).on('resize.hover', alternarDropdownHover);

  $(window).on('scroll.backtop', function () {
    if ($(this).scrollTop() > 100) $('.back-to-top').fadeIn('slow');
    else $('.back-to-top').fadeOut('slow');
  });
  $(document).on('click.backtop', '.back-to-top', function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });
}

// Inicializa carruseles de Bootstrap y Owl dentro de `root` (contenido recién renderizado).
export function iniciarPlugins(root) {
  const $ = jq();
  if (!$) return;

  $(root)
    .find('.carousel')
    .each(function () {
      $(this).carousel();
    });

  $(root)
    .find('.vendor-carousel')
    .owlCarousel({
      loop: true,
      margin: 29,
      nav: false,
      autoplay: true,
      smartSpeed: 1000,
      responsive: {
        0: { items: 2 },
        576: { items: 3 },
        768: { items: 4 },
        992: { items: 5 },
        1200: { items: 6 },
      },
    });
}

// Libera timers y overlays de la vista anterior antes de pintar la siguiente.
export function limpiarPlugins(root) {
  const $ = jq();
  if (!$) return;
  $(root).find('.vendor-carousel').trigger('destroy.owl.carousel');
  $(root)
    .find('.carousel')
    .each(function () {
      try {
        $(this).carousel('dispose');
      } catch {
        /* ya liberado */
      }
    });
  $(root).find('.modal').modal('dispose');
  $('.modal-backdrop').remove();
  document.body.classList.remove('modal-open');
  document.body.style.paddingRight = '';
}

export function mostrarModal(el) {
  jq()?.(el).modal('show');
}

export function ocultarModal(el, despues) {
  const $ = jq();
  if (!$) return despues?.();
  const $el = $(el);
  if (despues) $el.one('hidden.bs.modal', despues);
  $el.modal('hide');
}
