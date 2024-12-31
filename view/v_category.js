//import { mostrarCatalogoProductosCategoria,mostrarfiltroPreciosCategoria,mostrarFiltroCategoria,mostrarFiltroColoresCategoria,mostrarFiltroTallasCategoria } from '../controller/c_category.js';
import { mostrarCatalogoProductosCategoria,mostrarfiltroPreciosCategoria,mostrarFiltroColoresCategoria,mostrarFiltroTallasCategoria } from '../controller/c_category_filtros.js';
import { enlazar_paginas } from '../model/ms_enlaces.js';
//import {  } from '../controller/c_shop_filtros.js';
// Selecciona el primer enlace con las clases especificadas

let category =
`
<!-- Shop Start -->

    <div class="row px-xl-5">
        <!-- Shop Sidebar Start -->
        <!-- Shop Sidebar End -->

        <!-- Shop Product Start -->
        <div class="col-lg-12 col-md-12">
            <div class="row pb-3">
                <div class="col-12 pb-1" id="divFiltros">
                    <div class="d-flex align-items-center mb-4">
                        <label for="customRange2" class="form-label text-primary font-weight-bold">Filtros</label>
                        <div class="dropdown ml-4">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Precio
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="triggerId">
                                `+mostrarfiltroPreciosCategoria()+`
                            </div>
                        </div>
                        <div class="dropdown ml-4">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Colores
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="triggerId">
                                `+mostrarFiltroColoresCategoria()+`
                            </div>
                        </div>
                        <div class="dropdown ml-4">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Tallas
                                    </button>
                            <div class="dropdown-menu" aria-labelledby="triggerId">
                                `+mostrarFiltroTallasCategoria()+`
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row col-12" id="show_filtroprod">`+
                mostrarCatalogoProductosCategoria()+
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

function generarProductosDeCategoria(bodyy){
    const divCategories = document.createElement('div');
    divCategories.classList = 'container-fluid pt-2';
    divCategories.id = 'show_categories';
    divCategories.innerHTML = category;
    bodyy.appendChild(divCategories);
    bodyy.insertBefore(divCategories,bodyy.children[3]); 
    
    enlazar_paginas();
    if(mostrarFiltroTallasCategoria() === undefined || mostrarFiltroTallasCategoria() === ''){
      document.getElementById('divFiltros').innerHTML = '';
    }
    
}

export {generarProductosDeCategoria}