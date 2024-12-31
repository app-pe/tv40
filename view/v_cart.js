import { enlazar_paginas } from '../model/ms_enlaces.js';
import { verCarrito } from '../controller/c_carrito.js';
let cart =
`
<!-- Cart Start -->
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5">
                <table class="table table-bordered mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                            <th>Producto</th>                            
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">`+
                        verCarrito()+
                    `</tbody>
                </table>
            </div>
            <div class="col-lg-4">
            <!--
                <form class="mb-5" action="">
                    <div class="input-group">
                        <input type="text" class="form-control p-4" placeholder="Coupon Code">
                        <div class="input-group-append">
                            <button class="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form>-->
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Resumen</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3 pt-1">
                            <h6 class="font-weight-medium">Subtotal</h6>
                            <h6 id="resum_subtotal" class="font-weight-medium"></h6>                           
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Envío</h6>
                            <h6 id="resum_envio" class="font-weight-medium"></h6>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Total</h5>
                            <h5 id="resum_total" class="font-weight-bold"></h5>
                        </div>
                        <button id="registrar_pedido" class="btn btn-block btn-primary my-3 py-3">Registrar Pedido</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Cart End -->
    `;

    function generarCarrito(bodyy){
        const divCarrito = document.createElement('div');
        divCarrito.classList = 'container-fluid pt-5';
        divCarrito.id = 'show_carrito';
        divCarrito.innerHTML = cart;
        bodyy.appendChild(divCarrito);
        bodyy.insertBefore(divCarrito,bodyy.children[3]);   
        
        enlazar_paginas();   
        //masCantidad();
        //masCantidad(conta,precio,idp);
    }

export {generarCarrito}