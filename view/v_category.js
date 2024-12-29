//import { mostrarCatalogoProductosCategoria,mostrarfiltroPreciosCategoria,mostrarFiltroCategoria,mostrarFiltroColoresCategoria,mostrarFiltroTallasCategoria } from '../controller/c_category.js';
import { mostrarCatalogoProductosCategoria,mostrarfiltroPreciosCategoria,mostrarFiltroCategoria,mostrarFiltroColoresCategoria,mostrarFiltroTallasCategoria } from '../controller/c_category_filtros.js';
import { enlazar_paginas } from '../model/ms_enlaces.js';
//import {  } from '../controller/c_shop_filtros.js';
// Selecciona el primer enlace con las clases especificadas

let category =
`
<!-- Shop Start -->

    <div class="row px-xl-5">
        <!-- Shop Sidebar Start -->
        <div class="col-lg-3 col-md-12">

      <div class="border-bottom mb-3 pb-3">
      <label for="customRange2" class="form-label text-primary font-weight-bold">Aplicar Filtros</label>
      <!--<input id="show_filtros" class="btn btn-primary" type="button" value="Aplicar filtros">-->            
      </div>

      <div class="accordion" id="accordionExample"> 
        <!-- Filter Price Start -->
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapsePrecio" aria-expanded="true" aria-controls="collapsePrecio">
                  Precio                  
                  <i class="fa fa-chevron-down arrow"></i>
                </button>
              </h2>
            </div> 
            <div id="collapsePrecio" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">
              <div><label for="customRange2" class="form-label">Elegir precio</label></div>
              `+mostrarfiltroPreciosCategoria()+`     
              </div>                 
            </div>
       
        <!-- filter Price End -->    
        <!-- Filter Catgory Start -->
            <div class="card-header" id="headingTwo">
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseCategoria" aria-expanded="true" aria-controls="collapseCategoria">
                  Categorías                  
                  <i class="fa fa-chevron-down arrow"></i>
                </button>
              </h2>
            </div> 
            <div id="collapseCategoria" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">              
              `+mostrarFiltroCategoria()+`     
              </div>                 
            </div>       
        <!-- Filter Catgory End -->  
        <!-- Filter Colors Start --> 
            <div class="card-header" id="headingThree">
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseColores" aria-expanded="true" aria-controls="collapseColores">
                  Colores                 
                  <i class="fa fa-chevron-down arrow"></i>
                </button>
              </h2>
            </div> 
            <div id="collapseColores" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">              
              `+mostrarFiltroColoresCategoria()+`     
              </div>                 
            </div>
        <!-- Filter Color End -->         
        <!-- Filter Tallas Start -->  
            <div class="card-header" id="headingFour">
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseTallas" aria-expanded="true" aria-controls="collapseTallas">
                  Tallas                 
                  <i class="fa fa-chevron-down arrow"></i>
                </button>
              </h2>
            </div> 
            <div id="collapseTallas" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div class="card-body">              
              `+mostrarFiltroTallasCategoria()+`     
              </div>                 
            </div>
        <!-- Filter Tallas End -->          
      </div>

      

  </div>
        <!-- Shop Sidebar End -->


        <!-- Shop Product Start -->
        <div class="col-lg-9 col-md-12">
            <div class="row pb-3">
                <div class="col-12 pb-1">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <form action="">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search by name">
                                <div class="input-group-append">
                                    <span class="input-group-text bg-transparent text-primary">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                        <div class="dropdown ml-4">
                            <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                        Sort by
                                    </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                                <a class="dropdown-item" href="#">Latest</a>
                                <a class="dropdown-item" href="#">Popularity</a>
                                <a class="dropdown-item" href="#">Best Rating</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row col-12" id="show_filtroprod">`+
                mostrarCatalogoProductosCategoria();+
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
    var elemento = document.querySelector('.dropdown-item.pasarCategoriaMenuNav');
}

export {generarProductosDeCategoria}