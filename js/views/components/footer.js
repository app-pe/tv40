import { SITE } from '../../config.js';
import { Router } from '../../router.js';
import { html } from '../../utils/html.js';

export function renderFooter() {
  return html`
    <div class="row px-xl-5 pt-5">
      <div class="col-lg-6 col-md-12 mb-5 pr-3 pr-xl-5">
        <a href="${Router.href('/home')}" class="text-decoration-none">
          <h1 class="mb-4 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border border-white px-3 mr-1">TV40</span>Shop</h1>
        </a>
        <h1 style="font-size: 18px; text-align: justify;">Impulsa tu negocio y conecta con clientes y emprendedores.</h1>
        <h2 style="font-size: 18px; text-align: justify;">Plataforma con propósito de servicio al emprendedor.</h2>
        <h2 style="font-size: 18px; text-align: justify;">Muestra gratis tu marca y catálogo por 40 días sin comisiones.</h2>
        <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>${SITE.email}</p>
      </div>
      <div class="col-lg-6 col-md-12">
        <div class="row">
          <div class="col-md-4 mb-5">
            <h5 class="font-weight-bold text-dark mb-4">Enlaces</h5>
            <div class="d-flex flex-column justify-content-start">
              <a class="text-dark mb-2" href="${Router.href('/home')}"><i class="fa fa-angle-right mr-2"></i>Inicio</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row border-top border-light mx-xl-5 py-4">
      <div class="col-md-6 px-xl-0">
        <p class="mb-md-0 text-center text-md-left text-dark">
          &copy; <a class="text-dark font-weight-semi-bold" href="${Router.href('/home')}">TV40</a>. All Rights Reserved.
        </p>
      </div>
      <div class="col-md-6 px-xl-0 text-center text-md-right">
        <img class="img-fluid2" src="img/payments.png" alt="">
      </div>
    </div>
    <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>`;
}
