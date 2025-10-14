import { mostrarSellers } from '../../controller/c_shop.js';

let vendors =
`
<div class="text-center mb-4">
    <h2 class="section-title px-5"><span class="px-2">Tiendas Afiliadas</span></h2>
</div>
<div class="row px-xl-5">
    <div class="col">
        <div class="owl-carousel vendor-carousel">`+
            mostrarSellers()+                       
        `</div>
    </div>
</div>`;

function generarDivVendors(bodyy){
    const divVendors = document.createElement('div');
    divVendors.classList = 'container-fluid py-5';
    divVendors.id = 'show_vendors';
    divVendors.innerHTML = vendors;
    bodyy.appendChild(divVendors);
    bodyy.insertBefore(divVendors,bodyy.children[6]);    
}

export { generarDivVendors };