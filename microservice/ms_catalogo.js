import { retornarUrlCategorias } from '../model/ms_filtros.js';
import { enlazar_paginas } from '../model/ms_enlaces.js';
function generarCatalogoProductos(arrayprouctos){
    //este metdo debe reutilizarse con el de shop en uno solo  
    console.log("GENERAR CATALOGO PRODUCTO-------"); 
    console.log(arrayprouctos); 
    var url = retornarUrlCategorias(); 
    if(url === undefined){
        console.log("URL UNDEFINED SHOP-------");        
    }
    let catalogox = "";
    let id_categoria = "";
    let id_color = "";
    let id_tallas = "";
    let id_producto = "";
    let id_tienda = "";
    let id_atributo = "";
    let nombre_producto = "";
    let precio_catalogo = "";
    let precio_oferta = "";
    let nombre_img = "";
    //cambio de valor a url en shop
    for(var j=0;j<arrayprouctos.length;j++){  
        id_categoria = arrayprouctos[j].id_categoria;
        id_color = arrayprouctos[j].id_color;
        id_tallas = arrayprouctos[j].id_tallas;
        id_producto = arrayprouctos[j].id_producto;
        id_tienda = arrayprouctos[j].id_tienda;
        id_atributo = arrayprouctos[j].id_atributo;
        nombre_producto = arrayprouctos[j].nombre_producto;
        precio_catalogo = arrayprouctos[j].precio_catalogo;
        precio_oferta = arrayprouctos[j].precio_oferta;
        //nombre_img = arrayprouctos[j].imagen_principal;        
        nombre_img = arrayprouctos[j].nombre_img;        
        url = arrayprouctos[j].url_imagen_categoria;

    catalogox +=
    `
    <div class="col-lg-3 col-md-6 col-sm-12 pb-1 ${id_categoria} ${id_tallas} ${id_color}">
        <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                <img class="cat-img pasaridCategoria" src="${url+nombre_img}" id="${id_atributo+"?"+id_color}" alt="${nombre_producto}">
            </a>
            </div>
            <div class="card-body border-left border-right text-left p-0 pt-1 pb-1">                
                <div><h6 class="text-left text-products">${nombre_producto}</h6></div>
                <div><h6 class="text-left precio-catalogo">S/ ${precio_catalogo}</h6></div>
                <div><h6 class="text-left precio-oferta">S/ ${precio_oferta}</h6></div>                                   
                
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
                <a id="${id_tienda}" href="" class="btn btn-sm text-dark p-0 pasaridTienda"><i class="fas fa-eye text-primary mr-1"></i>Ver Tienda</a>
                <a id="${id_atributo+"?"+id_color}" href="" class="btn btn-sm text-dark p-0 pasaridCategoria2"><i class="fas fa-shopping-cart text-primary mr-1"></i>Comprar</a>
            </div>
        </div>
    </div>
    `; 
    
}

return catalogox;
    
}

function juntar(miarray){  
    var cadenatotal = "";  
    for(var i=0;i<miarray.length;i++){    
      cadenatotal+=miarray[i];    
    }  
    document.getElementById("show_filtroprod").innerHTML = cadenatotal
    //enlaza cuando hace clik en un producto filtrado
    enlazar_paginas();  
  }
export{generarCatalogoProductos,juntar}