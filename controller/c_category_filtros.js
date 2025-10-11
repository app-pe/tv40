import {data} from '../model/ms_datos.js';
import { retornarId,enlazar_paginas } from '../model/ms_enlaces.js';
import { retornarProductosCategoria,retornarUrlCategorias,retornarTipoCategoria } from '../model/ms_filtros.js';
import { generarCatalogoProductos,juntar } from '../microservice/ms_catalogo.js';
import { generarCategoriasHTML } from '../controller/c_categories.js';
var categoriasp = data.categoria;
var productos = data.producto; 
var atributos = data.atributo_producto; 
var imagenesatb = data.imagenes; 
var colores = data.colores;
var tallas = data.tallas;
var filtrarProductosCategoria = retornarProductosCategoria();



function crearCatalogo(filtrarProductosCategoria){
  var arrayatb = [];
    //var atbSinDuplicados = [];
    
    for(var i=0;i<filtrarProductosCategoria.length;i++){
      var id_producto = filtrarProductosCategoria[i].id_producto;
      var filtrarAtributoProducto = atributos.filter(function(prod){                     
        return prod.id_producto === id_producto        
      });    
      console.log(filtrarAtributoProducto);
      var atbSinDuplicados = filtrarAtributoProducto.reduce((acumulador, valorActual) => {
        const elementoYaExiste = acumulador.find(elemento => elemento.id_color === valorActual.id_color & elemento.id_atributo === valorActual.id_atributo);
        if (elementoYaExiste) {
          return acumulador.map((elemento) => {
            if (elemento.id_color === valorActual.id_color & elemento.id_atributo === valorActual.id_atributo) {
              return {
                ...elemento
              }
            }    
            return elemento;
          });
        }    
        return [...acumulador, valorActual];
      }, []);
      arrayatb = arrayatb.concat(atbSinDuplicados);
      
    }
    console.log("arrayatb---");
    console.log(arrayatb);
    //agregaos la imagen 
    var filtrarImagenAtb = [];
    var arrayatbprod = [];

  for(var i=0;i<filtrarProductosCategoria.length;i++){
      var id_producto = filtrarProductosCategoria[i].id_producto;
    for(var m=0;m<arrayatb.length;m++){
      var id_productoat = arrayatb[m].id_producto;
      var id_atributo = arrayatb[m].id_atributo;
      var id_color = arrayatb[m].id_color;
      filtrarImagenAtb = imagenesatb.find(function(prod){                     
        return prod.id_atributo === id_atributo & prod.id_color === id_color       
      });   

      /* console.log("filtrarImagenAtb-");     
      console.log(filtrarImagenAtb); */

      if(id_productoat === id_producto){
        //console.log(filtrarProductosCategoria[i].nombre_producto);
        filtrarImagenAtb.nombre_producto = filtrarProductosCategoria[i].nombre_producto;
        filtrarImagenAtb.precio_catalogo = filtrarProductosCategoria[i].precio_catalogo;
        filtrarImagenAtb.precio_oferta = filtrarProductosCategoria[i].precio_oferta;  
        filtrarImagenAtb.id_tienda = filtrarProductosCategoria[i].id_tienda;  
        filtrarImagenAtb.id_categoria = filtrarProductosCategoria[i].id_categoria;  
        filtrarImagenAtb.cantidad = filtrarProductosCategoria[i].cantidad;
        //var url_imagen_categoria = 
        filtrarImagenAtb.url_imagen_categoria = retornarUrlCategorias();
        arrayatbprod = arrayatbprod.concat(filtrarImagenAtb);

      }
      

         

    } 
  }
  console.log("arrayatbprod-ok");     
  console.log(arrayatbprod);
  return arrayatbprod;
}

function mostrarCatalogoProductosCategoria(){     
  console.log("MOSTRAR CATALOGO DE PRODUCTOS POR CATEGORIA---"); 
  const tipo_categoria = retornarTipoCategoria();
  const datos = generarCategoriasHTML("ms",tipo_categoria);





    console.log("datos-->");
    console.log(datos);  
    console.log("filtrarProductosCategoria-->");
    console.log(filtrarProductosCategoria); 
    //crear catalogo
    var arrayatbprod = crearCatalogo(filtrarProductosCategoria);
    //generar catalogo
    var catalogox = generarCatalogoProductos(arrayatbprod);  
    //si catalogox ''
    if(catalogox === ''){
      catalogox = datos.divCategorias;
    }
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

function mostrarProductoFiltradoporPrecioCategoria(){  
  var id_categoria = retornarId();    
  console.log("ENTRO FILTRO PERECIOS CATEGORIA");
  try {      
    var range = document.getElementById("show_range").value;
    console.log("ELEGIR PRECIO FILTRO");
    console.log(range);
    //juntar valores de productos y atributos
    var filtrarProductosPrecio = productos.filter(function(prod){                     
        return prod.precio_oferta <= range & prod.id_categoria === id_categoria       
    });    
    filtrarProductosPrecio = Object(filtrarProductosPrecio);
    console.log("filtrarProductosPrecio-precio");
    console.log(filtrarProductosPrecio);
    //copiar igual
    var arrayatbprod = crearCatalogo(filtrarProductosPrecio);
    //reutilizo metodo
    var catalogox = generarCatalogoProductos(arrayatbprod);
    document.getElementById("show_filtroprod").innerHTML = catalogox
    //enlaza cuando hace clik en un producto filtrado
    enlazar_paginas(); 
  } catch (error) {        
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
  console.log("FILTRO COLORES CATEGORIA---");   
    var categorias = "";
    var cantidad = 0;
    var arraycolores = [];   
    for(var i=0;i<filtrarProductosCategoria.length;i++){      
      for(var a=0;a<atributos.length;a++){
        if(filtrarProductosCategoria[i].id_producto === atributos[a].id_producto){
          var id_atributo = atributos[a].id_atributo;
          var id_color = atributos[a].id_color;          
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
    console.log("arraycolores CATEGORIAS TODAS-");
    console.log(arraycolores);
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
    console.log("ATRIBUTOS-SINDUPLICADOS COLORES CATEGORIAS-");
    console.log(atributos_sinduplicados);

    for(var i=0;i<colores.length;i++){
        for(var j=0;j<atributos_sinduplicados.length;j++){
        if(colores[i].id_color === atributos_sinduplicados[j].id_color){
          console.log(colores[i].id_color);
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

var arraycatalogocolorcategoria = [];
function mostrarProductoFiltradoporColorCategoria(e){ 
  console.log("MOSTRAR PRODUCTOS FILTRADOS POR COLOR CATEGORIA--->");   
  //console.log(filtrarProductosCategoria); 
  var url_imagen_categoria = retornarUrlCategorias();
  var id_colorx = ""; 
  var arraycolorescat = [];
  if(e.target.checked === true){ 
    console.log("si se agrega color");        
    id_colorx = e.target.id;
    //console.log(id_colorx);
    //var arraycolorescat = []; 
    //PASO1: BUSCAR ATRIBUTOS DE LOS PRODUCTOS DE LA CATEGORIA ELEGIDA      
    for(var i=0;i<filtrarProductosCategoria.length;i++){    
      for(var a=0;a<atributos.length;a++){
        if(filtrarProductosCategoria[i].id_producto === atributos[a].id_producto){
          var id_tienda = filtrarProductosCategoria[i].id_tienda;
          var id_producto = filtrarProductosCategoria[i].id_producto;
          var nombre_producto = filtrarProductosCategoria[i].nombre_producto;
          var precio_catalogo = filtrarProductosCategoria[i].precio_catalogo;
          var precio_oferta = filtrarProductosCategoria[i].precio_oferta;          

          var id_atributo = atributos[a].id_atributo;
          var id_color = atributos[a].id_color;
          var id_tallas = atributos[a].id_tallas;        
          var cantidad = atributos[a].cantidad;
         
          for(var m=0;m<imagenesatb.length;m++){
            if(imagenesatb[m].id_atributo === atributos[a].id_atributo & imagenesatb[m].id_color === id_colorx){             
              var imagen_principal = imagenesatb[m].nombre_img;break;
            }
          }
          
          var obj_colorcat = {
            "id_tienda" : id_tienda,
            "id_producto" : id_producto,
            "nombre_producto" : nombre_producto,
            "precio_catalogo" : precio_catalogo,
            "precio_oferta" : precio_oferta,
            "id_color" : id_color,
            "id_atributo" : id_atributo,
            "id_tallas" : id_tallas,
            "cantidad" : cantidad,
            "url_imagen_categoria" : url_imagen_categoria,
            "nombre_img" : imagen_principal
          };               
          arraycolorescat.push(obj_colorcat);         
        }
      }       
    }
    //arraycolorescat mostrar todos los colores de los productos de la categoria elegida--    
    //console.log(arraycolorescat);
    //PASO2: OBTENER TODOS los productos de la categoria elegida filtrando por el id_color - con duplicados
    var productosDeCategoria_filtradoPorColor = arraycolorescat.filter(function(shop){                           
      return shop.id_color === id_colorx
    });        
    //console.log("productosDeCategoria_filtradoPorColor");
    //console.log(productosDeCategoria_filtradoPorColor);
    //PASO3: OBTNER los productos de la categoria elegida filtrando por id_producto y id_color - sin duplicados
    var colorSinDuplicados = productosDeCategoria_filtradoPorColor.reduce((acumulador, valorActual) => {
      const elementoYaExiste = acumulador.find(elemento => elemento.id_color === valorActual.id_color & elemento.id_producto === valorActual.id_producto);
      if (elementoYaExiste) {
        return acumulador.map((elemento) => {
          if (elemento.id_color === valorActual.id_color & elemento.id_producto === valorActual.id_producto) {
            return {
              ...elemento
            }
          }    
          return elemento;
        });
      }    
      return [...acumulador, valorActual];
    }, []);
    //console.log("colorSinDuplicados CATEGORIAS----<<");
    //console.log(colorSinDuplicados);
    //PASO4: CREAR CATALOGO del color elegido
    var catalogox = generarCatalogoProductos(colorSinDuplicados);     
    arraycatalogocolorcategoria.push(catalogox);      
    document.getElementById("show_filtroprod").innerHTML = catalogox    
    enlazar_paginas();    
  }else{
    console.log("no se agrega color"); 
    document.getElementById("show_filtroprod").innerHTML = ""    
    id_colorx = e.target.id;
    console.log(id_colorx); 
    //PASO5: BUSCAR si id_color esta dentro de arraycatalogocolorcategoria y borrar esa posicion
    for(var i=0;i<arraycatalogocolorcategoria.length;i++){
      if(arraycatalogocolorcategoria[i].includes(id_colorx)){        
        //en la posicio i , 1=borrar 0=agregar
        arraycatalogocolorcategoria.splice(i, 1);break;        
      }      
    }
  }
//PASO6: CONSOLIDAR TODOS LOS CATALOGOS CON EL METODO JUNTAR
console.log("arraycatalogotallas-"); 
console.log(arraycatalogocolorcategoria); 
juntar(arraycatalogocolorcategoria);
}

function mostrarFiltroTallasCategoria(){  
  console.log("MOSTRAR FILTRO TALLAS DE CATEGORIA-->");
  console.log(filtrarProductosCategoria);      
  var cantidad = 0;    
  var arraytallas = [];   
  for(var i=0;i<filtrarProductosCategoria.length;i++){    
    for(var a=0;a<atributos.length;a++){
      if(filtrarProductosCategoria[i].id_producto === atributos[a].id_producto){
        var id_atributo = atributos[a].id_atributo;
        var id_color = atributos[a].id_color;
        var id_tallas = atributos[a].id_tallas;        
        var cantidad = atributos[a].cantidad;
        var show_talla = "";
        var obj_talla = {
          "id_color" : id_color,
          "id_atributo" : id_atributo,
          "id_tallas" : id_tallas,
          "cantidad" : cantidad
        };               
        arraytallas.push(obj_talla);         
      }
    }       
  }
  console.log("arraytallas de categoria-->");
  console.log(arraytallas);
  const atributos_sinduplicados = arraytallas.reduce((acumulador, valorActual) => {
    const elementoYaExiste = acumulador.find(elemento => elemento.id_tallas === valorActual.id_tallas);      
    if (elementoYaExiste) {
      return acumulador.map((elemento) => {
        if (elemento.id_tallas === valorActual.id_tallas) {
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
  console.log("ATRIBUTOS-SINDUPLICADOS TALLAS DE CATEGORIA y CANTIDAD");
  console.log(atributos_sinduplicados);

  for(var i=0;i<tallas.length;i++){
      for(var j=0;j<atributos_sinduplicados.length;j++){
      if(tallas[i].id_talla === atributos_sinduplicados[j].id_tallas){ 
          var nombre_talla = tallas[i].nombre_talla;
          var id_talla = tallas[i].id_talla;
          var cantidadp = atributos_sinduplicados[j].cantidad;
          var id_atributo = atributos_sinduplicados[j].id_atributo;
          show_talla +=
          `
          <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-"2>
          <input type="checkbox" class="custom-control-input pasaridchbTallaCategoria" id="${id_talla}">
          <label class="custom-control-label" for="${id_talla}">${nombre_talla}</label>
          <span class="">${cantidadp}</span>                    
          </div>            
          `; 
      }
      }
  }
  return show_talla;
}

var arraycatalogotallascategoria = [];
function mostrarProductoFiltradoporTallaCategoria(e){ 
  console.log("MOSTRAR RESULTADO DE FILTRO TALLAS DE CATEGORIA-->");
  //console.log(filtrarProductosCategoria);
  var arraytallas = [];
  var id_tallax = "";
  var url_imagen_categoria = retornarUrlCategorias();  
  if(e.target.checked === true){   
    console.log("si se agrega talla");   
    id_tallax = e.target.id;
    //console.log(id_tallax);
    //PASO1: BUSCAR ATRIBUTOS DE LOS PRODUCTOS DE LA CATEGORIA ELEGIDA
    for(var i=0;i<filtrarProductosCategoria.length;i++){    
      for(var a=0;a<atributos.length;a++){
        if(filtrarProductosCategoria[i].id_producto === atributos[a].id_producto){
          var id_tienda = filtrarProductosCategoria[i].id_tienda;
          var id_producto = filtrarProductosCategoria[i].id_producto;
          var nombre_producto = filtrarProductosCategoria[i].nombre_producto;
          var precio_catalogo = filtrarProductosCategoria[i].precio_catalogo;
          var precio_oferta = filtrarProductosCategoria[i].precio_oferta;         

          var id_atributo = atributos[a].id_atributo;
          var id_color = atributos[a].id_color;
          var id_tallas = atributos[a].id_tallas;        
          var cantidad = atributos[a].cantidad;        
          //muestra todas las imagenes que tiene atb, si le pongo break solo toma la 1era imagen
          for(var m=0;m<imagenesatb.length;m++){
            if(imagenesatb[m].id_atributo === atributos[a].id_atributo & imagenesatb[m].id_color === atributos[a].id_color){ 
              var imagen_principal = imagenesatb[m].nombre_img;break;
            }
          }
          
          var obj_talla = {
            "id_tienda" : id_tienda,
            "id_producto" : id_producto,
            "nombre_producto" : nombre_producto,
            "precio_catalogo" : precio_catalogo,
            "precio_oferta" : precio_oferta,
            "id_color" : id_color,
            "id_atributo" : id_atributo,
            "id_tallas" : id_tallas,
            "cantidad" : cantidad,
            "url_imagen_categoria" : url_imagen_categoria,
            "nombre_img" : imagen_principal
          };               
          arraytallas.push(obj_talla);         
        }
      }       
    }
    //console.log("arraytallas de categoria mostrar--");
    //console.log(arraytallas);
//PASO2: OBTENER TODOS los productos de la categoria elegida filtrando por el id_tallax - con duplicados de id_producto xq varian el id_color y id_tallax    
    var filtrarProductosTallaTiendaSeparados = arraytallas.filter(function(shop){                           
      return shop.id_tallas === id_tallax
    });        
    console.log("filtrarProductosTallaTiendaSeparados mostrar--");
    console.log(filtrarProductosTallaTiendaSeparados);
//PASO3: CREAR CATALOGO de la talla elegida
    var catalogox = generarCatalogoProductos(filtrarProductosTallaTiendaSeparados);       
    arraycatalogotallascategoria.push(catalogox);      
    document.getElementById("show_filtroprod").innerHTML = catalogox    
    enlazar_paginas();
  }else{
    console.log("no se agrega color"); 
    document.getElementById("show_filtroprod").innerHTML = ""    
    id_tallax = e.target.id;
    console.log(id_tallax); 
//PASO4: BUSCAR si id_tallax esta dentro de arraycatalogotallascategoria y borrar esa posicion
    for(var i=0;i<arraycatalogotallascategoria.length;i++){
      if(arraycatalogotallascategoria[i].includes(id_tallax)){        
        //en la posicio i , 1=borrar 0=agregar
        arraycatalogotallascategoria.splice(i, 1);break;        
      }      
    }
  }
//PASO5: CONSOLIDAR TODOS LOS CATALOGOS CON EL METODO JUNTAR
console.log("arraycatalogotallascategoria-"); 
console.log(arraycatalogotallascategoria); 
juntar(arraycatalogotallascategoria);  
}



export {mostrarCatalogoProductosCategoria,mostrarfiltroPreciosCategoria,mostrarFiltroCategoria,mostrarFiltroColoresCategoria,mostrarFiltroTallasCategoria,mostrarProductoFiltradoporPrecioCategoria,mostrarProductoFiltradoporColorCategoria,mostrarProductoFiltradoporTallaCategoria}