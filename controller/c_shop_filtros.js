import { data } from '../model/ms_datos.js';
import { enlazar_paginas, retornarId } from '../model/ms_enlaces.js';
import { retornarProductosTienda,retornarUrlCategoriasTienda } from '../model/ms_filtros.js';
//import { generarCatalogoProductosTienda } from '../controller/c_shop.js';
import { generarCatalogoProductos,juntar } from '../microservice/ms_catalogo.js';
import { crearCatalogoTienda } from '../controller/c_shop.js';
var filtrarProductosTienda = retornarProductosTienda();
var categoriasp = data.categoria;
var productos = data.producto;
var imagenesatb = data.imagenes; 
var atributos = data.atributo_producto;
var colores = data.colores;
var tallas = data.tallas;

//precio
function mostrarfiltroPreciosTienda(){    
    try {    
    const precioMenor = filtrarProductosTienda.reduce((prev, cur) =>
    cur.precio_oferta < prev.precio_oferta ? cur : prev
    );    
    const precioMayor = filtrarProductosTienda.reduce((prev, cur) =>
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

function mostrarProductoFiltradoporPrecioTienda(){  
  var id_tiendax = retornarId();    
  console.log("ENTRO FILTRO PERECIOS CATEGORIA");
  try {      
    var range = document.getElementById("show_range").value;
    console.log("ELEGIR PRECIO FILTRO");
    console.log(range);
    var filtrarProductosPrecio = productos.filter(function(prod){                     
        return prod.precio_oferta <= range & prod.id_tienda === id_tiendax       
    });    
    filtrarProductosPrecio = Object(filtrarProductosPrecio);
    console.log("filtrarProductosPrecio---FILTRO");
    console.log(filtrarProductosPrecio)
    //reutilizo metodo
    var arrayatbprod = crearCatalogoTienda(filtrarProductosPrecio);
    var catalogox = generarCatalogoProductos(arrayatbprod);
    document.getElementById("show_filtroprod").innerHTML = catalogox
    //enlaza cuando hace clik en un producto filtrado
    enlazar_paginas(); 
  } catch (error) {        
  } 

}

//categorias tienda
function mostrarFiltroCategoriasTienda(){    
    var show_categorias = "";    
    //sumar las cantidad del producto con categorias repetidas y mostrar 
    const miCarritoSinDuplicados = filtrarProductosTienda.reduce((acumulador, valorActual) => {
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

      var nombre_categoria = "";
      var id_categoria = "";
      var cantidadp = 0;
    for(var i=0;i<miCarritoSinDuplicados.length;i++){
      cantidadp = miCarritoSinDuplicados[i].cantidad;
        for(var j=0;j<categoriasp.length;j++){
        if(miCarritoSinDuplicados[i].id_categoria === categoriasp[j].id_categoria){  
             
            nombre_categoria = categoriasp[j].nombre_categoria;
            id_categoria = categoriasp[j].id_categoria;
            
            show_categorias +=
            `
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-2">
            <input type="checkbox" class="custom-control-input pasaridchbCategoria" id="${id_categoria}">
            <label class="custom-control-label" for="${id_categoria}">${nombre_categoria}</label>
            <span class="">${cantidadp}</span>                    
            </div>            
            `;      
            //arrayProductosdeCategoriasElegidas.push(filtrarProductosTienda[i]);

        }
        }
    }

    return show_categorias;
}

var arraychbcategorias = [];
var arraycatalogo = [];
function mostrarProductoFiltradoporCategoria(e){
  console.log("MOSTRAR PRODUCTO FILTRADO POR CATEGORIA--------");  
  var id_tienda = retornarId(); 
  var id_categoria = "";
 
if(e.target.checked === true){
    //console.log("si se agrega");     
    id_categoria = e.target.id;
    arraychbcategorias.push(id_categoria); 
    var filtrarProductosCategoriaTienda = productos.filter(function(shop){                           
      return shop.id_categoria === id_categoria & shop.id_tienda === id_tienda        
    }); 
    console.log("filtrarProductosCategoriaTienda-->"); 
    console.log(filtrarProductosCategoriaTienda); 
    //    
    var arrayatbprod = crearCatalogoTienda(filtrarProductosCategoriaTienda);
    var catalogox = generarCatalogoProductos(arrayatbprod);
    console.log(catalogox); 
    arraycatalogo.push(catalogox);
    document.getElementById("show_filtroprod").innerHTML = catalogox 
}else{    
    console.log("no se agrega");    
    document.getElementById("show_filtroprod").innerHTML = ""    
    id_categoria = e.target.id;
    console.log(id_categoria); 
    //buscamos si id_color esta dentro de arraycatalogocolores
    for(var i=0;i<arraycatalogo.length;i++){
      if(arraycatalogo[i].includes(id_categoria)){        
        //en la posicio i , 1=borrar 0=agregar
        arraycatalogo.splice(i, 1);break;        
      }      
    }
}
//muestro catalogo
console.log(arraycatalogo); 
juntar(arraycatalogo);
}

//colores tienda
function mostrarFiltroColoresTienda(){ 
  console.log("FILTRO COLORES TIENDA---");   
    var categorias = "";
    var cantidad = 0;
    var arraycolores = [];   
    for(var i=0;i<filtrarProductosTienda.length;i++){      
      for(var a=0;a<atributos.length;a++){
        if(filtrarProductosTienda[i].id_producto === atributos[a].id_producto){
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
    console.log("arraycolores TIENDA-");
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
    console.log("ATRIBUTOS-SINDUPLICADOS COLORES TIENDA-");
    console.log(atributos_sinduplicados);

    for(var i=0;i<colores.length;i++){
        for(var j=0;j<atributos_sinduplicados.length;j++){
        if(colores[i].id_color === atributos_sinduplicados[j].id_color){
            var nombre_color = colores[i].nombre_color;
            var id_color = colores[i].id_color;
            var cantidadp = atributos_sinduplicados[j].cantidad;
            show_color +=
            `
            <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-2">
            <input type="checkbox" class="custom-control-input pasaridchbColor" id="${id_color}">
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
function mostrarProductoFiltradoporColor(e){ 
  console.log("MOSTRAR PRODUCTOS FILTRADOS POR COLOR TIENDA#####"); 
  //console.log(filtrarProductosTienda);  
  var id_colorx = ""; 
  var arraycolorescat = [];
  if(e.target.checked === true){    
    //var arraycolorescat = [];
    console.log("si se agrega color");
    //id_color = e.target.id;       
    id_colorx = e.target.id;      
    //PASO1: BUSCAR ATRIBUTOS DE LOS PRODUCTOS DE LA CATEGORIA ELEGIDA      
    for(var i=0;i<filtrarProductosTienda.length;i++){    
      for(var a=0;a<atributos.length;a++){
        if(filtrarProductosTienda[i].id_producto === atributos[a].id_producto){
          var id_tienda = filtrarProductosTienda[i].id_tienda;
          var id_producto = filtrarProductosTienda[i].id_producto;
          var nombre_producto = filtrarProductosTienda[i].nombre_producto;
          var precio_catalogo = filtrarProductosTienda[i].precio_catalogo;
          var precio_oferta = filtrarProductosTienda[i].precio_oferta;    
          var id_categoria = filtrarProductosTienda[i].id_categoria;    
          var url_imagen_categoria = retornarUrlCategoriasTienda(id_categoria);      

          var id_atributo = atributos[a].id_atributo;
          var id_color = atributos[a].id_color;
          var id_tallas = atributos[a].id_tallas;        
          var cantidad = atributos[a].cantidad;
          //var imagen_principal = atributos[a].imagen_secundaria[0];
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
    //arraycolorescat mostrar todos los colores de los productos de la categoria elegida
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
    //PASO5: BUSCAR si id_color esta dentro de arraycatalogocolorcategoria y borrar esa posicion
    for(var i=0;i<arraycatalogocolorcategoria.length;i++){
      if(arraycatalogocolorcategoria[i].includes(id_colorx)){        
        //en la posicio i , 1=borrar 0=agregar
        arraycatalogocolorcategoria.splice(i, 1);break;        
      }      
    }
  }
//PASO6: CONSOLIDAR TODOS LOS CATALOGOS CON EL METODO JUNTAR
//console.log("arraycatalogotallas-"); 
//console.log(arraycatalogocolorcategoria); 
juntar(arraycatalogocolorcategoria);

}

//tallas tienda
function mostrarFiltroTallasTienda(){ 
  console.log("MOSTRAR FILTRO TALLAS DE LA TIENDA-->");
  console.log(filtrarProductosTienda);       
  var cantidad = 0;   
  var arraytallas = [];   
  for(var i=0;i<filtrarProductosTienda.length;i++){    
    for(var a=0;a<atributos.length;a++){
      if(filtrarProductosTienda[i].id_producto === atributos[a].id_producto){
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
  console.log("arraytallas de la tienda-->");
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
  console.log("ATRIBUTOS-SINDUPLICADOS TALLAS DE LA TIENDA Y CANTIDAD");
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
          <input type="checkbox" class="custom-control-input pasaridchbTalla" id="${id_talla}">
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
function mostrarProductoFiltradoporTalla(e){ 
  console.log("MOSTRAR RESULTADO DE FILTRO TALLAS DE TIENDA-->");
  console.log(filtrarProductosTienda);
  var arraytallas = [];
  var id_tallax = "";
  if(e.target.checked === true){   
    console.log("si se agrega talla");   
    id_tallax = e.target.id;    
    //PASO1: BUSCAR ATRIBUTOS DE LOS PRODUCTOS DE LA CATEGORIA ELEGIDA
    for(var i=0;i<filtrarProductosTienda.length;i++){    
      for(var a=0;a<atributos.length;a++){
        if(filtrarProductosTienda[i].id_producto === atributos[a].id_producto){
          var id_tienda = filtrarProductosTienda[i].id_tienda;
          var id_producto = filtrarProductosTienda[i].id_producto;
          var nombre_producto = filtrarProductosTienda[i].nombre_producto;
          var precio_catalogo = filtrarProductosTienda[i].precio_catalogo;
          var precio_oferta = filtrarProductosTienda[i].precio_oferta;
          var id_categoria = filtrarProductosTienda[i].id_categoria; 
          var url_imagen_categoria = retornarUrlCategoriasTienda(id_categoria);
          
          var id_atributo = atributos[a].id_atributo;
          var id_color = atributos[a].id_color;
          var id_tallas = atributos[a].id_tallas;        
          var cantidad = atributos[a].cantidad;         

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
    //console.log("arraytallas de tienda mostrar--");
    //console.log(arraytallas);
//PASO2: OBTENER TODOS los productos de la categoria elegida filtrando por el id_tallax - con duplicados de id_producto xq varian el id_color y id_tallax    
    var filtrarProductosTallaTiendaSeparados = arraytallas.filter(function(shop){                           
      return shop.id_tallas === id_tallax
    });        
    //console.log("filtrarProductosTallaTiendaSeparados mostrar--");
    //console.log(filtrarProductosTallaTiendaSeparados);
//PASO3: CREAR CATALOGO de la talla elegida
    var catalogox = generarCatalogoProductos(filtrarProductosTallaTiendaSeparados);       
    arraycatalogotallascategoria.push(catalogox);      
    document.getElementById("show_filtroprod").innerHTML = catalogox    
    enlazar_paginas();
  }else{
    console.log("no se agrega talla"); 
    document.getElementById("show_filtroprod").innerHTML = ""    
    id_tallax = e.target.id;   
    //PASO4: BUSCAR si id_tallax esta dentro de arraycatalogotallascategoria y borrar esa posicion
    for(var i=0;i<arraycatalogotallascategoria.length;i++){
      if(arraycatalogotallascategoria[i].includes(id_tallax)){        
        //en la posicio i , 1=borrar 0=agregar
        arraycatalogotallascategoria.splice(i, 1);break;        
      }      
    }
  }
//PASO5: CONSOLIDAR TODOS LOS CATALOGOS CON EL METODO JUNTAR
//console.log("arraycatalogotallascategoria-"); 
//console.log(arraycatalogotallascategoria); 
juntar(arraycatalogotallascategoria); 
}

export{mostrarfiltroPreciosTienda,mostrarProductoFiltradoporPrecioTienda,mostrarFiltroCategoriasTienda,mostrarFiltroColoresTienda,mostrarFiltroTallasTienda,mostrarProductoFiltradoporCategoria,mostrarProductoFiltradoporColor,mostrarProductoFiltradoporTalla}