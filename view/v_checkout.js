import { enlazar_paginas } from '../model/ms_enlaces.js';
import { verProductos } from '../controller/c_checkout.js';
let checkout =
`

        <div class="row px-xl-5">
            <div class="col-lg-8">
                <div class="mb-4">
                    <h4 class="font-weight-semi-bold mb-4">Datos de Envío</h4>
                    <div class="row">
                        <div class="col-md-6 form-group">                            
                            <input id="vnombre" class="form-control" type="text" placeholder="Nombre">
                        </div>
                        <div class="col-md-6 form-group">                            
                            <input id="vapellido" class="form-control" type="text" placeholder="Apellido">
                        </div>
                        <div class="col-md-6 form-group">                            
                            <input id="vcorreo" class="form-control" type="text" placeholder="correo@gmail.com">
                        </div>
                        <div class="col-md-6 form-group">                            
                            <input id="vcelular" class="form-control" type="text" placeholder="celular">
                        </div>
                        <div class="col-md-6 form-group">                            
                            <input id="vdireccion" class="form-control" type="text" placeholder="dirección de envío">
                        </div>                        
                        <div class="col-md-6 form-group">                            
                            <input id="vubicacion" class="form-control" type="text" placeholder="ubicación de envío">
                        </div>                        
                        <div class="col-md-6 form-group">
                            <label>Distrito</label>
                            <select id="vdistrito" class="custom-select">                                
                                <option>Surco</option>
                                <option>Miraflores</option>
                                <option>San Isidro</option>
                                <option>Lima</option>
                            </select>
                        </div>
                        
                 
                    </div>
                </div>
                
            </div>
            <div class="col-lg-4">
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Total de Pedido</h4>
                    </div>`+
                        verProductos()+                        
                        `
                </div>
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Medio de Pago</h4>
                    </div>
                    
                    <div class="card-body">
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="plin">
                                <label class="custom-control-label" for="plin">plin</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="yape">
                                <label class="custom-control-label" for="yape">yape</label>
                            </div>
                        </div>
                        <div class="">
                            <div class="custom-control custom-radio">
                                <input type="radio" class="custom-control-input" name="payment" id="transferencia">
                                <label class="custom-control-label" for="transferencia">transferencia</label>
                            </div>
                        </div>
                    </div>

                    <a href="#" id="enlace">
                    <div class="card-footer border-secondary bg-transparent">
                        <button class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3" id="btn_enviarpedido" href="#">Enviar Pedido</button>
                    </div>
                    </a>
               <!--     <a href="#" id="enlace">
                        <button class="btn btn-block btn-primary my-3 py-3" id="btn_enviarpedido" onclick="enviarPedido()" href="#">Enviar Pedido</button>
                    </a>-->
                    <!--
                    <div class="card-footer border-secondary bg-transparent">
                        <button id="btn_enviarpedido" class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">Enviar Pedido</button>
                    </div>-->
                </div>
            </div>
        </div>

`;

    function generarCheckout(bodyy){
        const divCheckout = document.createElement('div');
        divCheckout.classList = 'container-fluid pt-5';
        divCheckout.id = 'show_checkout';
        divCheckout.innerHTML = checkout;
        bodyy.appendChild(divCheckout);
        bodyy.insertBefore(divCheckout,bodyy.children[3]);   
        
        enlazar_paginas();   
        
    }

export {generarCheckout}