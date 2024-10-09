import {data} from '../model/ms_datos.js';
import { retornarId,enlazar_paginas } from '../model/ms_enlaces.js';
import { retornarProductosCategoria } from '../model/ms_filtros.js';
import { generarCatalogoProductos } from '../microservice/ms_catalogo.js';
var categoriasp = data.categoria;
var productos = data.producto; 
var atributos = data.atributo_producto; 
var colores = data.colores;
var filtrarProductosCategoria = retornarProductosCategoria();


function mostrarCatalogoProductosCategoria(){    
    console.log("filtrarProductosCategoria-->");
    console.log(filtrarProductosCategoria);
  


    var catalogox = generarCatalogoProductos(filtrarProductosCategoria);  
    return catalogox;
}


let categorym =
`
<div class="col-lg-4 col-md-6 col-sm-12 pb-1">
    <div class="card product-item border-0 mb-4">
        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img class="img-fluid w-100" src="img/product-2.jpg" alt="">
        </div>
        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
            <div class="d-flex justify-content-center">
                <h6>$123.00</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
            </div>
        </div>
        <div class="card-footer d-flex justify-content-between bg-light border">
            <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
            <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
        </div>
    </div>
</div>
`;

function mostrarfiltroPreciosCategoria(){    
    try {    
    const precioMenor = filtrarProductosCategoria.reduce((prev, cur) =>
    cur.precio_oferta < prev.precio_oferta ? cur : prev
    );    
    const precioMayor = filtrarProductosCategoria.reduce((prev, cur) =>
    cur.precio_oferta > prev.precio_oferta ? cur : prev
    );
    var catalogo =
    `
    <output>S/${precioMenor.precio_oferta}</output>
    <input id="show_range" type="range" value="" min="${precioMenor.precio_oferta}" max="${precioMayor.precio_oferta}" oninput="this.nextElementSibling.value = this.value">
    S/<output>${precioMayor.precio_oferta}</output>
    `;
    return catalogo;

    } catch (error) {
        console.error(error);
    }
}
function mostrarFiltroCategoria(){    
    var categorias = "";
    var cantidad = 0;
    //sumar las cantidad del producto con categorias repetidas y mostrar 
    const miCarritoSinDuplicados = filtrarProductosCategoria.reduce((acumulador, valorActual) => {
        const elementoYaExiste = acumulador.find(elemento => elemento.id_categoria === valorActual.id_categoria);
        if (elementoYaExiste) {
          return acumulador.map((elemento) => {
            if (elemento.id_categoria === valorActual.id_categoria) {
              return {
                ...elemento,
                cantidad: elemento.cantidad + valorActual.cantidad
              }
            }
      
            return elemento;
          });
        }
      
        return [...acumulador, valorActual];
      }, []);
      console.log("miCarritoSinDuplicados");
      console.log(miCarritoSinDuplicados);

    for(var i=0;i<categoriasp.length;i++){
        for(var j=0;j<miCarritoSinDuplicados.length;j++){
        if(categoriasp[i].id_categoria === miCarritoSinDuplicados[j].id_categoria){  
            console.log(categoriasp[i].nombre_categoria);  
            var nombre_categoria = categoriasp[i].nombre_categoria;
            var id_categoria = categoriasp[i].id_categoria;
            var cantidadp = miCarritoSinDuplicados[j].cantidad;
            categorias +=
            `
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-2">
            <input type="checkbox" class="custom-control-input" id="${id_categoria}">
            <label class="custom-control-label" for="${id_categoria}">${nombre_categoria}</label>
            <span class="">${cantidadp}</span>                    
            </div>            
            `;      
            //arrayProductosdeCategoriasElegidas.push(filtrarProductosTienda[i]);

        }
        }
    }

    return categorias;
}
function mostrarFiltroColoresCategoria(){    
    var categorias = "";
    var cantidad = 0;
    var arraycolores = [];   
    for(var i=0;i<filtrarProductosCategoria.length;i++){
      var id_producto_categoria = filtrarProductosCategoria[i].id_producto;
      for(var a=0;a<atributos.length;a++){
        if(filtrarProductosCategoria[i].id_producto === atributos[a].id_producto){
          var id_atributo = atributos[a].id_atributo;
          var id_color = atributos[a].color;
          var cantidad = atributos[a].cantidad;
          var show_color = "";
          var obj_color = {
            "id_atributo" : id_atributo,
            "id_color" : id_color,
            "cantidad" : cantidad
          };
          arraycolores.push(obj_color);         
        }
      }       
    }
    //arraycolores repetidos 
    const atributos_sinduplicados = arraycolores.reduce((acumulador, valorActual) => {
      const elementoYaExiste = acumulador.find(elemento => elemento.id_color === valorActual.id_color);      
      if (elementoYaExiste) {
        return acumulador.map((elemento) => {
          if (elemento.id_color === valorActual.id_color) {
            return {
              ...elemento,
              cantidad: elemento.cantidad + valorActual.cantidad
            }
          }    
          return elemento;
        });
      }    
      return [...acumulador, valorActual];
    }, []);
    console.log("ATRIBUTOS-SINDUPLICADOS");
    console.log(atributos_sinduplicados);

    for(var i=0;i<colores.length;i++){
        for(var j=0;j<atributos_sinduplicados.length;j++){
        if(colores[i].nombre_color === atributos_sinduplicados[j].id_color){  
            console.log(colores[i].nombre_color);  
            var nombre_color = colores[i].nombre_color;
            var id_color = colores[i].id_color;
            var cantidadp = atributos_sinduplicados[j].cantidad;
            show_color +=
            `
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-2">
            <input type="checkbox" class="custom-control-input pasaridchbColorCategoria" id="${id_color}">
            <label class="custom-control-label" for="${id_color}">${nombre_color}</label>
            <span class="">${cantidadp}</span>                    
            </div>            
            `; 
        }
        }
    }
    return show_color;
}
function mostrarFiltroTallasCategoria(){    
    var categorias = "";
    var cantidad = 0;
    //sumar las cantidad del producto con categorias repetidas y mostrar 
    const miCarritoSinDuplicados = filtrarProductosCategoria.reduce((acumulador, valorActual) => {
        const elementoYaExiste = acumulador.find(elemento => elemento.id_categoria === valorActual.id_categoria);
        if (elementoYaExiste) {
          return acumulador.map((elemento) => {
            if (elemento.id_categoria === valorActual.id_categoria) {
              return {
                ...elemento,
                cantidad: elemento.cantidad + valorActual.cantidad
              }
            }
      
            return elemento;
          });
        }
      
        return [...acumulador, valorActual];
      }, []);
      

    for(var i=0;i<categoriasp.length;i++){
        for(var j=0;j<miCarritoSinDuplicados.length;j++){
        if(categoriasp[i].id_categoria === miCarritoSinDuplicados[j].id_categoria){  
            console.log(categoriasp[i].nombre_categoria);  
            var nombre_categoria = categoriasp[i].nombre_categoria;
            var id_categoria = categoriasp[i].id_categoria;
            var cantidadp = miCarritoSinDuplicados[j].cantidad;
            categorias +=
            `
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-2">
            <input type="checkbox" class="custom-control-input" id="${id_categoria}">
            <label class="custom-control-label" for="${id_categoria}">${nombre_categoria}</label>
            <span class="">${cantidadp}</span>                    
            </div>            
            `;      
            //arrayProductosdeCategoriasElegidas.push(filtrarProductosTienda[i]);

        }
        }
    }

    return categorias;
}
function mostrarProductoFiltradoporPrecioCategoria(){  
    var id_categoria = retornarId();    
    console.log("ENTRO FILTRO PERECIOS CATEGORIA");
    try {      
      var range = document.getElementById("show_range").value;
      console.log("ELEGIR PRECIO FILTRO");
      console.log(range);
      var filtrarProductosPrecio = productos.filter(function(prod){                     
          return prod.precio_oferta <= range & prod.id_categoria === id_categoria       
      });    
      filtrarProductosPrecio = Object(filtrarProductosPrecio);
      console.log("filtrarProductosPrecio---FILTRO");
      console.log(filtrarProductosPrecio)
      //reutilizo metodo
      var catalogox = generarCatalogoProductos(filtrarProductosPrecio);
      document.getElementById("show_filtroprod").innerHTML = catalogox
      //enlaza cuando hace clik en un producto filtrado
      enlazar_paginas(); 
    } catch (error) {        
    } 

}

export {mostrarCatalogoProductosCategoria,mostrarfiltroPreciosCategoria,mostrarFiltroCategoria,mostrarFiltroColoresCategoria,mostrarFiltroTallasCategoria,mostrarProductoFiltradoporPrecioCategoria}