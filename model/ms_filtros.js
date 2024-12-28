//retornar imagen de tienda, logo, nombre, ruc, razon social
import { data } from '../model/ms_datos.js';
//import { data } from '../microservice/ms_category.js';
import { retornarId,retornarIdColor,enlazar_paginas,retornarIdAtributo } from '../model/ms_enlaces.js';

//import { mostrarGaleriaImagenes } from '../controller/c_detail.js';
var tienda = data.tienda;
var productos = data.producto;
var atributos = data.atributo_producto;
var categorias = data.categoria;
var tallas = data.tallas;
var id_url = retornarId(); 
var imagenesatb = data.imagenes;


//filtros category producto
function retornarProductosCategoria(){  
    var id_categoria = id_url;
    var filtrarProductosCategoria = productos.filter(function(prod){                     
        return prod.id_categoria === id_categoria        
    });    
    filtrarProductosCategoria = Object(filtrarProductosCategoria);
    return filtrarProductosCategoria;
}
function retornarUrlCategorias(){  
    var id_categoria = id_url;
    var filtrarCategoria = categorias.find(function(cat){                     
        return cat.id_categoria === id_categoria        
    });    
    filtrarCategoria = Object(filtrarCategoria);
    return filtrarCategoria.url_imagen_categoria;
}


//filtros detail producto
function retornarObjProducto(){  
    //var id_producto = id_url;
    var id_producto = retornarIdproducto_Atb();
    var filtrarProducto = productos.find(function(prod){                     
        return prod.id_producto === id_producto        
    });    
    filtrarProducto = Object(filtrarProducto);
    return filtrarProducto;
}
function retornarUrlCategoria(){  
    var filtrarProducto = retornarObjProducto();
    var id_categoria = filtrarProducto.id_categoria;
    var filtrarCategoria = categorias.find(function(cat){                     
        return cat.id_categoria === id_categoria        
    });    
    filtrarCategoria = Object(filtrarCategoria);
    return filtrarCategoria;
}
//filtros de shop
function retornarUrlCategoriasTienda(id_categoria){  
    //var id_categoria = id_url;
    var filtrarCategoria = categorias.find(function(cat){                     
        return cat.id_categoria === id_categoria        
    });    
    filtrarCategoria = Object(filtrarCategoria);
    return filtrarCategoria.url_imagen_categoria;
}
function retornarNombreTienda(){  
    var filtrarProducto = retornarObjProducto();
    var id_tienda = filtrarProducto.id_tienda;
    var datosTienda = tienda.find(function(shop){                     
        return shop.id_tienda === id_tienda        
    });    
    datosTienda = Object(datosTienda);   
    return datosTienda;
}
function retornarObjTienda(){  
    var id_tienda = id_url;
    var filtrarTienda = tienda.find(function(shop){                     
        return shop.id_tienda === id_tienda        
    });    
    filtrarTienda = Object(filtrarTienda);
    return filtrarTienda;
}

function retornarProductosTienda(){   
    var id_tienda = id_url;    
    var filtrarProductosTienda = productos.filter(function(shop){                     
        return shop.id_tienda === id_tienda        
    });    
    filtrarProductosTienda = Object(filtrarProductosTienda);
    return filtrarProductosTienda;
}

function retornarObjAtributoProducto(){
    var valor = id_url;
    try {
        var pos = valor.indexOf("?");
        var id_atributo = valor.slice(0,pos);    
        var id_color = valor.slice(pos+1);
    } catch (error) {
        
    }
    var filtrarIdProducto = atributos.filter(function(prod){                     
        return prod.id_atributo === id_atributo & prod.id_color === id_color        
    });    
    filtrarIdProducto = Object(filtrarIdProducto);
    return filtrarIdProducto;
}
function retornarIdproducto_Atb(){
    var valor = id_url;
    try {
        var pos = valor.indexOf("?");
        var id_atributo = valor.slice(0,pos);    
        var id_color = valor.slice(pos+1);
    } catch (error) {
        
    }
    var filtrarIdProducto = atributos.find(function(prod){                     
        return prod.id_atributo === id_atributo & prod.id_color === id_color        
    });    
    filtrarIdProducto = Object(filtrarIdProducto);
    return filtrarIdProducto.id_producto;
}
//retorna id_color no repetido
function retornarColoresSinRepetir(){   
    var filtrarIdProducto = retornarObjAtributoProducto();    
    var filtrarColoresSinRepetir = filtrarIdProducto.reduce((acumulador, valorActual) => {
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
      //console.log("filtrarColoresProducto--->>");
      //console.log(filtrarColoresProducto);
      filtrarColoresSinRepetir = Object(filtrarColoresSinRepetir);
    return filtrarColoresSinRepetir;
}
function retornarTallasporColor(){ 
    var filtrarIdAtributoProducto = retornarObjAtributoProducto(); 
    var tallasx = filtrarIdAtributoProducto.id_tallas
    var filtrarColoresProducto = retornarColoresSinRepetir();    
    var arraytallasxcolor = [];
    //aqui recorro todos los id_colores
    for (var j = 0; j < filtrarColoresProducto.length; j++) { 
        var id_color = filtrarColoresProducto[j].id_color;
        console.log(id_color);
        //lepaso el id_color y me trae las tallas  
        var arraytallas = [];
        for (var a = 0; a < filtrarIdAtributoProducto.length; a++) {
            if(filtrarIdAtributoProducto[a].id_color === id_color){
                var id_tallas = filtrarIdAtributoProducto[a].id_tallas;
                console.log(id_tallas);
                arraytallas.push(id_tallas);                
            }           
        }
        var objtallas = {
            "id_color":id_color,
            "id_tallas":arraytallas

        };        
        
        arraytallasxcolor.push(objtallas);
    } 
    console.log("arraytallasxcolor");
    console.log(arraytallasxcolor);
    return arraytallasxcolor;
}



export{retornarProductosCategoria,retornarUrlCategorias,retornarObjProducto,retornarObjTienda,retornarUrlCategoria,retornarNombreTienda,retornarProductosTienda,retornarObjAtributoProducto,retornarColoresSinRepetir,retornarTallasporColor,retornarIdproducto_Atb,retornarUrlCategoriasTienda}