import { mostrarBannertienda,mostrarLogotienda,mostrarDatostienda } from '../controller/c_shop.js';
let shop =
`

  <!-- Banner       -->`+
  mostrarBannertienda()+ 
  `<div class="row container">
        <div class="col-lg-3 marketplace-shop-info">             
            <div class="shop-logo mr-4">
                <a href="#">`+
                mostrarLogotienda()+
                `</a>
            </div>
        </div>  
        <div class="col-lg-8 mt-2">`+
        mostrarDatostienda()+              
        `<div class="d-flex mb-3">
                <p class="mr-2">Calificación</p>
                <div class="text-primary mr-2">
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star-half-alt"></small>
                    <small class="far fa-star"></small>
                </div>
                <small class="pt-1">(50 Reviews)</small>
            </div>                
        </div>
    </div>       

`;

function generarShop(bodyy){
    const divShop = document.createElement('div');
    divShop.classList = 'container-fluid';
    divShop.id = 'show_shop';
    divShop.innerHTML = shop;
    bodyy.appendChild(divShop);
    bodyy.insertBefore(divShop,bodyy.children[2]); 
    
   
    
}
export {generarShop}