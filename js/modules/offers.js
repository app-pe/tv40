let offers =
`
<div class="text-center mb-4">
    <h2 class="section-title px-5"><span class="px-2">Ofertas</span></h2>
</div>
<div class="row px-xl-5">
    <div class="col-md-6 pb-4">
        <div class="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
            <img src="img/offer-1.png" alt="">
            <div class="position-relative" style="z-index: 1;">
                <h5 class="text-uppercase text-primary mb-3">20% off the all order</h5>
                <h1 class="mb-4 font-weight-semi-bold">Spring Collection</h1>
                <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
            </div>
        </div>
    </div>
    <div class="col-md-6 pb-4">
        <div class="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
            <img src="img/offer-2.png" alt="">
            <div class="position-relative" style="z-index: 1;">
                <h5 class="text-uppercase text-primary mb-3">20% off the all order</h5>
                <h1 class="mb-4 font-weight-semi-bold">Winter Collection</h1>
                <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
            </div>
        </div>
    </div>
</div>`;

function generarDivOffers(bodyy){
    const divOffers = document.createElement('div');
    divOffers.classList = 'container-fluid offer pt-5';
    divOffers.id = 'show_offers';
    divOffers.innerHTML = offers;
    bodyy.appendChild(divOffers);
    bodyy.insertBefore(divOffers,bodyy.children[4]);    
}

export { generarDivOffers };