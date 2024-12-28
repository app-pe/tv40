import { data } from '../model/ms_datos.js';
import { retornarId,retornarIdColor,retornarIdAtributo,enlazar_paginas } from '../model/ms_enlaces.js';
import { retornarObjProducto,retornarObjTienda,retornarUrlCategoria,retornarNombreTienda,retornarObjAtributoProducto,retornarColoresSinRepetir,retornarTallasporColor,retornarUrlCategorias,retornarIdproducto_Atb } from '../model/ms_filtros.js';
//data
//var producto = data.producto;
var productos = data.producto;
var tienda = data.tienda;
//var atributo_producto = data.atributo_producto;
var atributos = data.atributo_producto;
var imagenesatb = data.imagenes; 
var tallas = data.tallas;
var colores = data.colores;
var categorias = data.categoria;
//reutilizar funciones que retornan valor
var id_producto = retornarId();
var filtrarProducto = retornarObjProducto();
var filtrarTienda = retornarObjTienda();

function mostrarGaleriaImagenes(){
    var objAtributoProducto = retornarObjAtributoProducto();
    console.log("MOSTRAR DETAIL objAtributoProducto----");
    console.log(objAtributoProducto);
   
    var char_galeria = "";  
    //tiene que enviarme el atb y mostrame lo que elegi del filtro
    var atbSinDuplicados = objAtributoProducto.reduce((acumulador, valorActual) => {
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
      console.log("atbSinDuplicados--galeria");
      console.log(atbSinDuplicados);
      
      
     
    //filtrar imagenes
    for(var i=0;i<atbSinDuplicados.length;i++){        
        //var arraynombreimagen = objAtributoProducto[i].imagen_secundaria; 
        var filtrarImagenAtb = imagenesatb.filter(function(prod){                     
            return prod.id_atributo === atbSinDuplicados[i].id_atributo & prod.id_color === atbSinDuplicados[i].id_color       
        });  

        console.log(filtrarImagenAtb);

        //sacando url cattegoria
        var id_producto = filtrarImagenAtb[0].id_producto;
        var filtrarProducto = productos.find(function(prod){                     
            return prod.id_producto === id_producto        
        }); 
        console.log(filtrarProducto.id_categoria);
        var filtrarCategoria = categorias.find(function(cat){                     
            return cat.id_categoria === filtrarProducto.id_categoria        
        });       
        console.log(filtrarCategoria.url_imagen_categoria);
        var url_img_cat = filtrarCategoria.url_imagen_categoria;
        //mostrar galeria img
        for(var k=0;k<filtrarImagenAtb.length;k++){
            var url = filtrarImagenAtb[k].nombre_img;
        if(k === 0){            
            char_galeria +=
            `
            <div class="carousel-item src_img_galeria active" id="${url_img_cat+url}">
            <img class="w-100 h-100" src="${url_img_cat+url}" alt="Image">
            </div>
            `;  
        }else{            
            char_galeria += 
            `
            <div class="carousel-item">
            <img class="w-100 h-100" src="${url_img_cat+url}" alt="Image">
            </div>
            `;
            } 
        }

     
    }   
    return char_galeria;
}
function mostrarNombreTienda(){    
    //var objprod = retornarObjProducto();
    //var atbprod = retornarIdproducto_Atb();
    var tienda = retornarNombreTienda();
    let link_nombreTienda =
    `
    <div class="d-inline-flex">
        <a class="text-dark px-2" href="">
            <h5 class="pasaridTienda" id="${tienda.id_tienda}">${tienda.nombre_tienda}</h5>
        </a>                        
    </div>
    `;
    return link_nombreTienda;
}
function mostrarAtbProducto(){ 
    console.log("MOSTRAR DETAIL mostrarAtbProducto----");
   
    var id_url = retornarId(); 
    console.log("id_url");
    console.log(id_url);
    
    try {
    var objAtributoProducto = retornarObjAtributoProducto();    
    console.log("objAtributoProducto----");
    console.log(objAtributoProducto);
    var atb = (objAtributoProducto[0].id_atributo+objAtributoProducto[0].id_color+objAtributoProducto[0].id_tallas).toUpperCase();
        
    } catch (error) {
        
    }    
    //<h5 id="codigo_atb" class="font-weight-semi-bold">ATB: ${atb}</h5>
    let atbProducto =
    `
    <div class="form-group form-inline">                            
        <label class="font-weight-semi-bold" for="exampleInputEmail1">ATB: </label>
        <label id="codigo_atb" class="font-weight-semi-bold ml-2" for="exampleInputEmail1">${atb}</label>            
    </div>    
    `;    
    return atbProducto;
}
function mostrarNombreProducto(){    
    let nombreProducto =
    `
    <h3 class="font-weight-semi-bold">${filtrarProducto.nombre_producto}</h3>
    `;    
    return nombreProducto;
}
function mostrarDescripcionProducto(){    
    let nombreProducto = filtrarProducto.descripcion;
    
    return nombreProducto;
}
function mostrarPriceOferta(){    
    let priceOferta =
    `
    <div class="form-group form-inline">                            
        <label for="exampleInputEmail1">Normal: </label>
        <label class="font-weight-semi-bold precio-detail ml-2" for="exampleInputEmail1"> S/ ${filtrarProducto.precio_catalogo}</label>            
    </div>
    <div class="form-group form-inline">                            
        <label for="exampleInputEmail1">Internet: </label>
        <label class="font-weight-semi-bold ml-2" for="exampleInputEmail1"> S/ ${filtrarProducto.precio_oferta}</label>            
    </div>   
    `;    
    return priceOferta;
}
function mostrarColores(){
    console.log("MOSTRAR COLORES-------");
    let char_colores = "";       
    var atbColorElegido = [];      
    var filtrarColoresSinRepetir = retornarColoresSinRepetir();
    console.log("filtrarColoresSinRepetir---colores"); 
    console.log(filtrarColoresSinRepetir); 
    for (var j = 0; j < filtrarColoresSinRepetir.length; j++) {               
        //retorna id_color no repetido         
        var id_atributo = filtrarColoresSinRepetir[j].id_atributo; 
        var id_color = filtrarColoresSinRepetir[j].id_color; 
        var filtrarAtb = atributos.filter(function(prod){                     
            return prod.id_atributo === id_atributo       
        });  
        console.log("filtrarAtb---"); 
        console.log(filtrarAtb); 

        atbColorElegido = filtrarAtb.reduce((acumulador, valorActual) => {
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
          console.log("atbSinDuplicados--colores buton");
          console.log(atbColorElegido);

    }
    //mostrar colores
    
    var id_colors = retornarIdColor();
    //console.log(id_color);
    var filtrarImagenAtb = [];
    for (var f = 0; f < atbColorElegido.length; f++) {  
        //var nombre_color = colores[c].nombre_color;                
        //var id_color = colores[c].id_color; 
        var id_atributo = atbColorElegido[f].id_atributo; 
        var id_color = atbColorElegido[f].id_color; 
        filtrarImagenAtb = colores.find(function(prod){                     
            return prod.id_color === id_color       
        });  
        
        //console.log("filtrarImagenAtb->");
        //console.log(filtrarImagenAtb);
        if(id_colors === filtrarImagenAtb.id_color){
            console.log("entro iguales checked");
            console.log(filtrarImagenAtb.id_color);
            char_colores +=
            `
            <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input elegirColor" checked="checked" id="${filtrarImagenAtb.id_color}" name="colores_prod" value="${filtrarImagenAtb.nombre_color}">
                            <label class="custom-control-label" for="${filtrarImagenAtb.id_color}">${filtrarImagenAtb.nombre_color}</label>
                        </div>
            `;
        }
        if(id_colors !== filtrarImagenAtb.id_color){
            console.log("entro <> no checked");
            console.log(filtrarImagenAtb.id_color);     
            char_colores += `
            <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input elegirColor" id="${filtrarImagenAtb.id_color}" name="colores_prod" value="${filtrarImagenAtb.nombre_color}">
                            <label class="custom-control-label" for="${filtrarImagenAtb.id_color}">${filtrarImagenAtb.nombre_color}</label>
                        </div>
            `;   
        }
    }
    return char_colores;
}
function mostrarTallas(){  
    console.log("MOSTRAR TALLAS-------");
    var char_tallas = "";   
    //lepaso el id_color y me trae las tallas     
    var arraytallasxcolor = retornarTallasporColor();
    console.log("MOSTRAR arraytallasxcolor-------");
    console.log(arraytallasxcolor);
    var nombreTallas = arraytallasxcolor.map(function(talla){
        return talla.id_tallas
    });
    nombreTallas = Object(nombreTallas);    
    var arraynomtalladefault = Object(nombreTallas[0]);
    for (var j = 0; j < arraynomtalladefault.length; j++) {         
        var id_talla = arraynomtalladefault[j];       
        for (var i = 0; i < tallas.length; i++) { 
            if(arraynomtalladefault[j] === tallas[i].id_talla){ 
                var nombre_talla = tallas[i].nombre_talla;                 
                if(j === 0){            
                    char_tallas =
                    `
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input elegirTalla" checked id="${id_talla}" name="size" value="${nombre_talla}">
                        <label class="custom-control-label" for="${id_talla}">${nombre_talla}</label>
                    </div>
                    `;             
                    console.log("RETORNAR TALLA SELECCIONADA EN 0");
                    console.log(id_talla);            
                }else{            
                    char_tallas +=
                    `
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input elegirTalla" id="${id_talla}" name="size" value="${nombre_talla}">
                        <label class="custom-control-label" for="${id_talla}">${nombre_talla}</label>
                    </div>
                    `;             
                   /*  console.log("RETORNAR LAS DEMAS TALLAS <> 0");
                    console.log(id_talla); */
                    }
            }
        }
    }
    //console.log(char_tallas);
    return char_tallas;

}
function mostrarCambioColoryTallas(id_color){
    console.log("--MOSTRAR CAMBIO COLOR Y TALLAS--");
 
    var id_atributo = retornarIdAtributo();
    console.log("id_atributo--");
    console.log(id_atributo);
    var filtrarIdAtbProducto = atributos.filter(function(prod){                     
        return prod.id_atributo === id_atributo & prod.id_color === id_color        
    });    
    console.log("filtrarIdAtbProducto--");
    console.log(filtrarIdAtbProducto);

    //MOSTRAR  EL CODIGO ATB    
    var id_colorx=id_color;       
    var atb = (filtrarIdAtbProducto[0].id_atributo+filtrarIdAtbProducto[0].id_color+filtrarIdAtbProducto[0].id_tallas).toUpperCase();
    document.getElementById('codigo_atb').innerText = atb;
    
    //atbSinDuplicados
    var atbSinDuplicados = filtrarIdAtbProducto.reduce((acumulador, valorActual) => {
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
      console.log("atbSinDuplicados--galeria");
      console.log(atbSinDuplicados);
    //filtrar imagenes-- reutilizado de mostrar_galeria en c_detail
    var char_galeria = "";  
    var char_tallas = "";  
    for(var i=0;i<atbSinDuplicados.length;i++){        
        //var arraynombreimagen = objAtributoProducto[i].imagen_secundaria; 
        var filtrarImagenAtb = imagenesatb.filter(function(prod){                     
            return prod.id_atributo === atbSinDuplicados[i].id_atributo & prod.id_color === atbSinDuplicados[i].id_color       
        });  

        console.log(filtrarImagenAtb);

        //sacando url categoria
        var id_producto = filtrarImagenAtb[0].id_producto;
        var filtrarProducto = productos.find(function(prod){                     
            return prod.id_producto === id_producto        
        }); 
        console.log(filtrarProducto.id_categoria);
        var filtrarCategoria = categorias.find(function(cat){                     
            return cat.id_categoria === filtrarProducto.id_categoria        
        });       
        console.log(filtrarCategoria.url_imagen_categoria);
        var url_img_cat = filtrarCategoria.url_imagen_categoria;
        //mostrar galeria img
        for(var k=0;k<filtrarImagenAtb.length;k++){
            var url = filtrarImagenAtb[k].nombre_img;
        if(k === 0){            
            char_galeria +=
            `
            <div class="carousel-item src_img_galeria active" id="${url_img_cat+url}">            
            <img class="w-100 h-100" src="${url_img_cat+url}" alt="Image">
            </div>
            `;  
        }else{            
            char_galeria += 
            `
            <div class="carousel-item">
            <img class="w-100 h-100" src="${url_img_cat+url}" alt="Image">
            </div>
            `;
            } 
        }
                
        
    }

    //lleno los rb_tallas
    for (var j = 0; j < filtrarIdAtbProducto.length; j++) { 
    for (var i = 0; i < tallas.length; i++) { 
        if(filtrarIdAtbProducto[j].id_tallas === tallas[i].id_talla){ 
            var nombre_talla = tallas[i].nombre_talla;                 
            var id_talla = tallas[i].id_talla;                 
            if(j === 0){            
                char_tallas +=
                `
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input elegirTalla" checked id="${id_talla}" name="size" value="${nombre_talla}">
                    <label class="custom-control-label" for="${id_talla}">${nombre_talla}</label>
                </div>
                `;             
                console.log("RETORNAR TALLA SELECCIONADA EN 0");
                console.log(id_talla);          
            }else{            
                char_tallas +=
                `
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" class="custom-control-input elegirTalla" id="${id_talla}" name="size" value="${nombre_talla}">
                    <label class="custom-control-label" for="${id_talla}">${nombre_talla}</label>
                </div>
                `;             
                console.log("RETORNAR LAS DEMAS TALLAS <> 0");
                console.log(id_talla);
                }
        }
    }
}
     
    
    //show_img_galeria - cambiamos la imagen
    document.getElementById("show_img_galeria").innerHTML = char_galeria;
    //show_tallas - cambiamos las tallas
    document.getElementById("show_tallas").innerHTML = char_tallas;
    
    
    enlazar_paginas();
}

function mostrarCambioTallas(id_talla){
    console.log("MOSTRAR CAMBIO DE TALLAS--------");
    console.log(id_talla);

    var id_atributo = retornarIdAtributo();
    console.log("id_atributo--");
    console.log(id_atributo);
    //elegirColor
    var vcolor = document.querySelectorAll(".elegirColor"); 
    var id_color = "";
    for(var i=0;i<vcolor.length;i++){
        if(vcolor[i].checked){
            id_color = vcolor[i].id;
        }
    }
    console.log("valorcolor--");
    console.log(id_color);

    var filtrarIdAtbProducto = atributos.filter(function(prod){                     
        return prod.id_atributo === id_atributo & prod.id_color === id_color      
    });    
    console.log("filtrarIdAtbProducto--");
    console.log(filtrarIdAtbProducto);

    var objtallap = filtrarIdAtbProducto.find(function(prod){                     
        return prod.id_tallas === id_talla      
    }); 
    console.log("objtallap--");
    console.log(objtallap);
    //MOSTRAR  EL CODIGO ATB  
    var atb = (id_atributo+id_color+objtallap.id_tallas).toUpperCase();
    document.getElementById('codigo_atb').innerText = atb;

}

function agregarCarrito(){
    console.log("AGREGAR CARRITO----");
    //traigo carrito del localstorage
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];
    var objCarrito = retornarObjProducto();
    console.log("objCarrito--------->>>");
    console.log(objCarrito);
    //nombre,precio,descripcion son iguales
    //color,talla,cantidad pueden varias y se cogen del html
    //console.log(filtrarProducto);
    //caputor valores de tallas y colores seleccionados
    var radiob_tallas = document.querySelectorAll('.elegirTalla'); 
    var radio_colores = document.querySelectorAll(".elegirColor"); 
    var cantidad = document.querySelector("#cantidad").value; 
    var modal_carrito = document.querySelector("#modal_carrito");
    var tallax = "";
    var tallav = "";
    var colorx = "";
    var colorv = "";
    var chart_modal_carrito = "";
    //show_tallas
    //elegirColor
    radiob_tallas.forEach((talla) => {
        if (talla.checked) {
            tallax = talla.id;
            tallav = talla.value;
        }
    });
    console.log("tallax");
    console.log(tallax);
    radio_colores.forEach((color) => {
        if (color.checked) {
            colorx = color.id;
            colorv = color.value;
        }
    });
    console.log("colorx");
    console.log(colorx);

    var id_atributo = retornarIdAtributo();
    //VALIDAR QUE NO SE REPITAN CUANDO AGREGO EL PRODUCTO AL CARRITO
    const repeat = carrito.some((repeatProduct) => repeatProduct.id_atributo === id_atributo & repeatProduct.tallav === tallav & repeatProduct.color === colorx);
    
    console.log("REPEAT--------------->");
    console.log(repeat);
    if(repeat){
        console.log("PRODUCTO REPETIDO--CANTIDAD(+)");   
        chart_modal_carrito += `
                <div class="d-inline-block">YA EXISTE EN EL CARRITO</div>
                 `;
        modal_carrito.innerHTML = chart_modal_carrito;
        //ver carrito
        var obj_vercarrito = document.getElementById("btn_vercarrito");
        obj_vercarrito.onclick = function() { 
            window.open("cart.html", "_self"); 
        };             
    }else{  
        console.log("PRODUCTO NO REPETIDO--CANTIDAD(+)");
        //MOSTRAR  EL CODIGO ATB  
        var atb = (id_atributo+colorx+tallax).toUpperCase();

        objCarrito.atb = atb;
        objCarrito.tallax = tallax;
        objCarrito.tallav = tallav;
        objCarrito.color = colorx;
        objCarrito.colorv = colorv;
        objCarrito.cantidad = cantidad;
        //var img_detail = document.querySelector("#show_img_galeria");
        var img_detail = document.querySelector(".src_img_galeria");
        //img_detail.href
        console.log("img_detail--");
        console.log(img_detail.id);
        objCarrito.url_img = img_detail.id;
        //retornarIdAtributo()
        
        objCarrito.id_atributo = id_atributo;
        
        console.log(objCarrito);
        carrito.push(objCarrito);
        //agrego carrito al localstorage
        localStorage.setItem("items_carrito", JSON.stringify(carrito));
    
        chart_modal_carrito += `
                <div class="d-inline-block">${objCarrito.cantidad}</div>    
                <div class="d-inline-block">${objCarrito.nombre_producto}</div>
                <div class="d-inline-block">color: ${objCarrito.colorv}</div>
                <div class="d-inline-block">talla: ${objCarrito.tallav}</div>
                <div class="d-inline-block" value="${objCarrito.precio_oferta}">precio: S/ ${objCarrito.precio_oferta}</div>    
                <div class=""></div>
                 `;
        modal_carrito.innerHTML = chart_modal_carrito;
        //ver carrito
        var obj_vercarrito = document.getElementById("btn_vercarrito");
        obj_vercarrito.onclick = function() { 
            window.open("cart.html", "_self"); 
        };
        var btn_closemodalcar = document.getElementById("btn_closemodalcar");
        btn_closemodalcar.onclick = function() { 
            document.getElementById("contador_carrito").innerHTML = carrito.length;
        };


       
    }     


}

function sumar_restar_carrito(){
    var sumarcarrito = document.querySelectorAll('.btn-plus');
    //console.log(sumarcarrito.length);
    for(var i=0;i<sumarcarrito.length;i++){
        sumarcarrito[i].onclick=function(e){
        e.preventDefault();    
        var valor = document.querySelector("#cantidad").value;               
            if(valor < 10){
            var suma = parseInt(valor) + parseInt(1);  
            console.log("suma---");  
            console.log(suma);  
           
            document.getElementById("cantidad").value = suma;     
                  
            }                 
            //window.open("shop.html?id="+this.id, "_self");                
        }
    }    
    var restarcarrito = document.getElementsByClassName('btn-minus');
    for(var i=0;i<restarcarrito.length;i++){
        restarcarrito[i].onclick=function(e){
        e.preventDefault();    
        var valor = document.getElementById("cantidad").value;               
            if(valor > 1){
            var resta = parseInt(valor) - parseInt(1);      
            console.log("resta---");  
            console.log(resta);  
            document.getElementById("cantidad").value = resta;
            }            
            //window.open("shop.html?id="+this.id, "_self");                
        }
    }    
    
}






export{mostrarGaleriaImagenes,mostrarAtbProducto,mostrarNombreProducto,mostrarDescripcionProducto,mostrarPriceOferta,mostrarColores,mostrarTallas,mostrarNombreTienda,mostrarCambioColoryTallas,mostrarCambioTallas,agregarCarrito,sumar_restar_carrito}
