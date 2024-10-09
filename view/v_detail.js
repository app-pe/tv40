import { mostrarGaleriaImagenes,mostrarAtbProducto,mostrarNombreProducto,mostrarDescripcionProducto,mostrarPriceOferta,mostrarColores,mostrarTallas,mostrarNombreTienda,sumar_restar_carrito } from '../controller/c_detail.js';
import { enlazar_paginas } from '../model/ms_enlaces.js';

let detail =
`
    <div class="row px-xl-5">
        <div class="col-lg-5 pb-5">
            <div id="product-carousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner border" id="show_img_galeria">`+
                mostrarGaleriaImagenes()+
                `</div>
                <a class="carousel-control-prev" href="#product-carousel" data-slide="prev">
                    <i class="fa fa-2x fa-angle-left text-dark"></i>
                </a>
                <a class="carousel-control-next" href="#product-carousel" data-slide="next">
                    <i class="fa fa-2x fa-angle-right text-dark"></i>
                </a>
            </div>
        </div>
        <div class="col-lg-7 pb-5">
            <h3 class="font-weight-semi-bold">`+mostrarNombreProducto()+`</h3>`+
            mostrarAtbProducto()+`
        <!--<div class="d-flex mb-3">
                <div class="text-primary mr-2">
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star"></small>
                    <small class="fas fa-star-half-alt"></small>
                    <small class="far fa-star"></small>
                </div>
                <small class="pt-1">(50 Reviews)</small>
            </div>-->`+
            mostrarPriceOferta()+
            //<p class="mb-4">Volup erat ipsum diam elitr rebum et dolor. Est nonumy elitr erat diam stet sit clita ea. Sanc invidunt ipsum et, labore clita lorem magna lorem ut.</p>
            `<div class="d-flex mb-3">
                <p class="text-dark font-weight-medium mb-0 mr-3">Tallas:</p>
                <form id="show_tallas">`+
                mostrarTallas()+
                `</form>
            </div>
            <div class="d-flex mb-4">
                <p class="text-dark font-weight-medium mb-0 mr-3">Colores:</p>
                <form>`+
                mostrarColores()+
                `</form>
            </div>
            <div class="d-flex align-items-center mb-4 pt-2">
                <div class="input-group quantity mr-3" style="width: 130px;">
                    <div class="input-group-btn">
                        <button class="btn btn-primary btn-minus" >
                        <i class="fa fa-minus"></i>
                        </button>
                    </div>                    
                    <input type="text" class="form-control bg-secondary text-center" id="cantidad" value="1" min="1" max="10" readonly="readonly">                    
                    <div class="input-group-btn">
                        <button class="btn btn-primary btn-plus">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button id="btn_carrito" class="btn btn-primary px-3" data-toggle="modal" data-target="#exampleModalCenter"><i class="fa fa-shopping-cart mr-1"></i>Agregar Carrito</button>
            </div>
            <div class="d-flex pt-2">
                <p class="text-dark font-weight-medium mb-0">Vendido por:</p>`+                    
                mostrarNombreTienda()+
            `</div>
        </div>
    </div>
    <div class="row px-xl-5">
        <div class="col">
            <div class="nav nav-tabs justify-content-center border-secondary mb-4">
                <a class="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Descripción</a>
                <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Beneficios</a>
            <!--<a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Comentarios</a>-->
            </div>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="tab-pane-1">
                    <h4 class="mb-3">Producto de Alta Calidad</h4>`+
                    mostrarDescripcionProducto()+                    
                    `
                </div>
                <div class="tab-pane fade" id="tab-pane-2">
                    <h4 class="mb-3">Beneficios</h4>
                    <p>Los beneficios del producto te daran mucho confort, alegría y energía</p>
                    <div class="row">
                        <div class="col-md-6">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item px-0">
                                    Suavidad y frescura para tu cuerpo
                                </li>
                                <li class="list-group-item px-0">
                                    Fibras naturales de algodón
                                </li>
                                <li class="list-group-item px-0">
                                    Colores de moda
                                </li>
                                <li class="list-group-item px-0">
                                    Diseños personalizados
                                </li>
                              </ul> 
                        </div>              
                    </div>
                </div>
                <div class="tab-pane fade" id="tab-pane-3">
                    <div class="row">
                        <div class="col-md-6">
                            <h4 class="mb-4">1 review for "Colorful Stylish Shirt"</h4>
                            <div class="media mb-4">
                                <img src="img/user.jpg" alt="Image" class="img-fluid2 mr-3 mt-1" style="width: 45px;">
                                <div class="media-body">
                                    <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                    <div class="text-primary mb-2">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h4 class="mb-4">Leave a review</h4>
                            <small>Your email address will not be published. Required fields are marked *</small>
                            <div class="d-flex my-3">
                                <p class="mb-0 mr-2">Your Rating * :</p>
                                <div class="text-primary">
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                </div>
                            </div>
                            <form>
                                <div class="form-group">
                                    <label for="message">Your Review *</label>
                                    <textarea id="message" cols="30" rows="5" class="form-control"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="name">Your Name *</label>
                                    <input type="text" class="form-control" id="name">
                                </div>
                                <div class="form-group">
                                    <label for="email">Your Email *</label>
                                    <input type="email" class="form-control" id="email">
                                </div>
                                <div class="form-group mb-0">
                                    <input type="submit" value="Leave Your Review" class="btn btn-primary px-3">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`+
`
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title" id="exampleModalLongTitle">Se agregó producto al carrito</h6>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="modal_carrito">
        
        
        </div>
        <div class="modal-footer">
          <button type="button" id="btn_closemodalcar" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" id="btn_vercarrito" class="btn btn-primary" onclick="">Ver carrito</button>
        </div>
      </div>
    </div>
  </div>`;

function generarDetalleProducto(bodyy){
    const divDetalleProducto = document.createElement('div');
    divDetalleProducto.classList = 'container-fluid py-5';
    divDetalleProducto.id = 'show_detalleproducto';
    divDetalleProducto.innerHTML = detail;
    bodyy.appendChild(divDetalleProducto);
    bodyy.insertBefore(divDetalleProducto,bodyy.children[2]); 
    
    
    enlazar_paginas();
    sumar_restar_carrito();
}

export {generarDetalleProducto}