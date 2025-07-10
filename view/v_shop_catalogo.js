import { mostrarCatalogoProductosTienda } from '../controller/c_shop.js';
import { enlazar_paginas } from '../model/ms_enlaces.js';
import { mostrarfiltroPreciosTienda,mostrarFiltroCategoriasTienda,mostrarFiltroColoresTienda,mostrarFiltroTallasTienda } from '../controller/c_shop_filtros.js';

let shop_catalogo = 
`
<!-- Shop Start -->

    <div class="row px-xl-5">
        <!-- Shop Sidebar Start -->
        <!-- Shop Sidebar End -->

        <!-- Shop Product Start -->
        <div class="col-lg-12 col-md-12">
            <div class="row pb-3">
                <div class="col-12 pb-1" id="divFiltros">
                    <label for="customRange2" class="form-label text-primary font-weight-bold">Filtros</label>
                    <div class="d-flex align-items-center mb-4">
                        
                        <div class="dropdown ml-0">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Precio
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="triggerId">
                                `+mostrarfiltroPreciosTienda()+`
                            </div>
                        </div>
                        <div class="dropdown ml-0">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Categoría
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="triggerId">
                                `+mostrarFiltroCategoriasTienda()+`
                            </div>
                        </div>
                        <div class="dropdown ml-0">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Color
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="triggerId">
                                `+mostrarFiltroColoresTienda()+`
                            </div>
                        </div>
                        <div class="dropdown ml-0">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Talla
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="triggerId">
                                `+mostrarFiltroTallasTienda()+`
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row col-12" id="show_filtroprod">`+
                mostrarCatalogoProductosTienda()+
                `</div>
                <div class="col-12 pb-1">
                    <nav aria-label="Page navigation">
                      <ul class="pagination justify-content-center mb-3">
                        <li class="page-item disabled">
                          <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                          </a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                          <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                </div>
            </div>
        </div>
        <!-- Shop Product End -->
    </div>

<!-- Shop End -->
`;
function generarShopCatalogo(bodyy){
    const divShopCatalogo = document.createElement('div');
    divShopCatalogo.classList = 'container-fluid pt-5';
    divShopCatalogo.id = 'show_shopcatalogo';
    divShopCatalogo.innerHTML = shop_catalogo;
    bodyy.appendChild(divShopCatalogo);
    bodyy.insertBefore(divShopCatalogo,bodyy.children[3]); 
    
   
    //mostrarProductoFiltradoporPrecio();
    enlazar_paginas()
    if(mostrarFiltroTallasTienda() === undefined || mostrarFiltroTallasTienda() === ''){
      document.getElementById('divFiltros').innerHTML = '';
    }
}
export {generarShopCatalogo}