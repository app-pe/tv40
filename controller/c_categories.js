import {data} from '../model/ms_datos.js';
var categoria = data.categoria;

function generarMenuCategoriaLP(){
    var divCategorias="";    
    for(var i=0;i<categoria.length;i++){
        var id_categoria = categoria[i].id_categoria;
        var default_imagen_categoria = categoria[i].default_imagen_categoria;
        var nombre_categoria = categoria[i].nombre_categoria;
        //console.log(nombre_categoria);
        divCategorias += 
        `
        <div class="col-lg-4 col-md-6 pb-1">
            <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                <p class="text-right">15 Products</p>
                <a href="" class="cat-img position-relative overflow-hidden mb-3">
                    <img class="img-fluid pasarCategoriaGaleria" src="${default_imagen_categoria}" alt="" id="${id_categoria}">
                </a>
                <h5 class="font-weight-semi-bold m-0">${nombre_categoria}</h5>
            </div>
        </div>
        `;
    }    
    return divCategorias;    
}

export {generarMenuCategoriaLP}