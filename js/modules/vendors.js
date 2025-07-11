let vendors =
`
<div class="text-center mb-4">
    <h2 class="section-title px-5"><span class="px-2">Tiendas Afiliadas</span></h2>
</div>
<div class="row px-xl-5">
    <div class="col">
        <div class="owl-carousel vendor-carousel">
            <div class="vendor-item border p-4">
            <a href="https://app-pe.github.io/tv40/shop.html?id=shop4"><img src="img/vendor-1.jpg" alt=""></a>                
            </div>
            <div class="vendor-item border p-4">
            <a href="https://app-pe.github.io/tv40/shop.html?id=shop5"><img src="img/vendor-2.jpg" alt=""></a>                
            </div>
            <div class="vendor-item border p-4">
            <a href="https://app-pe.github.io/tv40/shop.html?id=shop6"><img src="img/vendor-3.jpg" alt=""></a>                
            </div> 
            <div class="vendor-item border p-4">
            <a href="https://app-pe.github.io/tv40/shop.html?id=shop7"><img src="img/vendor-4.jpg" alt=""></a>                
            </div>            
        </div>
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