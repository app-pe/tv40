import {data} from '../model/ms_datos.js';
import { validarUrl } from '../controller/c_header.js';
import { enlazar_paginas,retornarId } from '../model/ms_enlaces.js';
var categoria = data.categoria;

function generarNavbarMenuCategorias(){       

    var linkCategorias=`
    <div class="nav-item dropdown">
                      <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Categorías</a>
                      <div class="dropdown-menu rounded-0 m-0">`
                      for(var i=0;i<categoria.length;i++){
                        var id_categoria = categoria[i].id_categoria;
                        var tipo_categoria = categoria[i].tipo_categoria;
                        var nombre_categoria = categoria[i].nombre_categoria;
                        var estado_categoria = categoria[i].estado_categoria;
                        var menu = categoria[i].menu;
                        if(estado_categoria === "activado" & menu === "mp"){ 
                        linkCategorias += 
                        `
                          <a href="#" class="dropdown-item pasarCategoriaGaleria3" id="${tipo_categoria}">${nombre_categoria}</a>
                        `
                        }
                      }  
                      `</div>
                  </div>    
    `;
    return linkCategorias;
}
function generarMenuCategoriaLPIndex(id_tipocat){
    console.log("CATEGORIASSSS&&&&&&"+id_tipocat);
    var divCategorias="";    
    for(var i=0;i<categoria.length;i++){
        var id_categoria = categoria[i].id_categoria;
        var default_imagen_categoria = categoria[i].default_imagen_categoria;
        var nombre_categoria = categoria[i].nombre_categoria;
        var estado_categoria = categoria[i].estado_categoria;
        var tipo_categoria = categoria[i].tipo_categoria;
        var menu = categoria[i].menu;       
        if(estado_categoria === "activado" & menu === "ms" & tipo_categoria === id_tipocat){ 
        divCategorias += 
        `
        <div class="col-lg-4 col-md-6 pb-1">
            <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                <p class="text-right">15 Products</p>
                <a href="" class="cat-img position-relative overflow-hidden mb-3">
                    <img class="img-fluid pasarCategoriaGaleria2" src="${default_imagen_categoria}" alt="${tipo_categoria}" id="${id_categoria}">
                </a>
                <h5 class="font-weight-semi-bold m-0">${nombre_categoria}</h5>
            </div>
        </div>
        `;
        }
    }    
    try {            
        document.getElementById("show_categorias").innerHTML = divCategorias;           
                    
    } catch (error) {
        
    }
    enlazar_paginas();
    //return divCategorias; 
}
function generarMenuCategoriaLP(){
    var nombrePaginaActual = validarUrl();
    console.log("nombrePaginaActual---$$$$$$$$");
    console.log(nombrePaginaActual);
    var divCategorias="";    
    for(var i=0;i<categoria.length;i++){
        var id_categoria = categoria[i].id_categoria;
        var default_imagen_categoria = categoria[i].default_imagen_categoria;
        var nombre_categoria = categoria[i].nombre_categoria;
        var estado_categoria = categoria[i].estado_categoria;
        var tipo_categoria = categoria[i].tipo_categoria;
        var menu = categoria[i].menu;       
        if(estado_categoria === "activado" & menu === "mp"){ 
        divCategorias += 
        `
        <div class="col-lg-4 col-md-6 pb-1">
            <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                <p class="text-right">15 Products</p>
                <a href="" class="cat-img position-relative overflow-hidden mb-3">
                    <img class="img-fluid pasarCategoriaGaleria" src="${default_imagen_categoria}" alt="${tipo_categoria}" id="${id_categoria}">
                </a>
                <h5 class="font-weight-semi-bold m-0">${nombre_categoria}</h5>
            </div>
        </div>
        `;
        }
    }    
    return divCategorias;    
}

export {generarNavbarMenuCategorias,generarMenuCategoriaLP,generarMenuCategoriaLPIndex}