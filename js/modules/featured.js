let featured =
`
<div class="row px-xl-5 pb-3">
    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
            <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
            <h5 class="font-weight-semi-bold m-0">Calidad producto</h5>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
            <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
            <h5 class="font-weight-semi-bold m-0">Envío gratis</h5>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
            <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
            <h5 class="font-weight-semi-bold m-0">Compra 24/7</h5>
        </div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
            <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
            <h5 class="font-weight-semi-bold m-0">Apoyo emprendedores</h5>
        </div>
    </div>
</div>`;

function generarDivFeatured(bodyy){
    const divFeatured = document.createElement('div');
    divFeatured.classList = 'container-fluid pt-5';
    divFeatured.id = 'show_featured';
    divFeatured.innerHTML = featured;
    bodyy.appendChild(divFeatured);
    bodyy.insertBefore(divFeatured,bodyy.children[2]);    
}

export { generarDivFeatured };