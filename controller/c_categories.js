import {data} from '../model/ms_datos.js';
import { validarUrl } from '../controller/c_header.js';
import { enlazar_paginas,retornarId } from '../model/ms_enlaces.js';
var categoria = data.categoria;

// Función común para generar categorías
function generarCategoriasHTML(menu, tipo_categoria = null) {
    let divCategorias = "";    
    let divcarouselItemsHTML = '';
    let linkCategorias = "";
    let activeIndex = 0;  // Contador para determinar si es el primer elemento

    // Filtrar las categorías que están activadas y que pertenecen al menú correcto
    for (let i = 0; i < categoria.length; i++) {
        const { id_categoria, default_imagen_categoria, nombre_categoria, estado_categoria, tipo_categoria: catTipo, menu: catMenu } = categoria[i];

        // Comprobar si la categoría está activada y pertenece al menú adecuado
        if (estado_categoria === "activado" && catMenu === menu && (tipo_categoria === null || tipo_categoria === catTipo)) {
            //creo objt para pasar los datos
            let obj = {catTipo: catTipo,catMenu: catMenu,id_categoria: id_categoria};
            let json_obj = JSON.stringify(obj);
            //let encodedString = encodeURIComponent(jsonString);
            linkCategorias += `
                <a href="#" class="dropdown-item pasarCategoriaMenuNav" id='${json_obj}'>${nombre_categoria}</a>
            `;

            divCategorias += `
                <div class="col-lg-4 col-md-6 pb-1">
                    <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                        <p class="text-right">15 Products</p>
                        <a href="#" class="cat-img position-relative overflow-hidden mb-3">
                            <img class="img-fluid pasarCategoriaGaleria" src="${default_imagen_categoria}" alt="" id='${json_obj}'>
                        </a>
                        <h5 class="font-weight-semi-bold m-0">${nombre_categoria}</h5>
                    </div>
                </div>
            `;
            
        // Crear los elementos 'carousel-item'       
        const isActive = (activeIndex === 0) ? 'active' : ''; // Solo el primer item será "active"    
        divcarouselItemsHTML += `
            <div class="carousel-item ${isActive}" style="height: 410px;">
                <img class="img-fluid" src="${default_imagen_categoria}" alt="" id="${id_categoria}">
                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div class="p-3" style="max-width: 700px;">
                        <h4 class="text-light text-uppercase font-weight-medium mb-3"></h4>
                        <h3 class="display-4 text-white font-weight-semi-bold mb-4">${nombre_categoria}</h3>
                        <a href="" class="btn btn-light py-2 px-3 pasarCategoriaGaleria" id='${json_obj}'>Comprar</a>
                    </div>
                </div>
            </div>
        `;        
        activeIndex++; // Incrementar el contador para marcar el siguiente como no activo
        }  
    }    
    return {divCategorias,divcarouselItemsHTML,linkCategorias};
}
// Función para generar el menú de categorías en el navbar
function generarNavbarMenuCategorias() {
    const datos = generarCategoriasHTML("mp");
    return datos.linkCategorias;
}

// Función para generar el menú de categorías en la página de inicio (LP)
function generarMenuCategoriaLP() {
    const datos = generarCategoriasHTML("mp");
    return datos.divCategorias;    
}
// Función para generar el menú de categorías en carousel en la página de inicio (LP)
function generarMenuCategoriaCarouselLP() {
    const datos = generarCategoriasHTML("ms");
    return datos.divcarouselItemsHTML;    
}

// Función para generar el menú de categorías en la página de índice de LP
function generarMenuCategoriaLPIndex(id_tipocat) {
    const divCategorias2 = generarCategoriasHTML("ms", id_tipocat);

    // Renderizar las categorías generadas en el contenedor con id "show_categorias"
    try {
        document.getElementById("show_categorias").innerHTML = divCategorias2.divCategorias;
    } catch (error) {
        console.error("Error al intentar renderizar las categorías:", error);
    }

    enlazar_paginas();  // Llamar a la función enlazar_paginas si es necesario
}

export {generarNavbarMenuCategorias,generarMenuCategoriaLP,generarMenuCategoriaCarouselLP,generarMenuCategoriaLPIndex}