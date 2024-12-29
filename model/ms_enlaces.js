import { mostrarCambioColoryTallas,mostrarCambioTallas,agregarCarrito } from '../controller/c_detail.js';
import { validarUrl } from '../controller/c_header.js';
import { generarMenuCategoriaLPIndex } from '../controller/c_categories.js';
import { verCarrito,eliminarProducto,massCantidad,menossCantidad,mostrarTotalconenvio,registrarPedido } from '../controller/c_carrito.js';
import { enviarPedido } from '../controller/c_checkout.js';
import { mostrarProductoFiltradoporPrecioTienda,mostrarProductoFiltradoporCategoria,mostrarProductoFiltradoporColor,mostrarProductoFiltradoporTalla } from '../controller/c_shop_filtros.js';
//import { mostrarProductoFiltradoporPrecioCategoria } from '../controller/c_category.js';
import { mostrarProductoFiltradoporPrecioCategoria,mostrarProductoFiltradoporColorCategoria,mostrarProductoFiltradoporTallaCategoria } from '../controller/c_category_filtros.js';

function enlazar_paginas(){
    console.log("--ENLAZAR PÁGINAS--");

    var pasarCategoriaTienda = document.getElementsByClassName('pasaridTienda');
        for(var i=0;i<pasarCategoriaTienda.length;i++){
            pasarCategoriaTienda[i].onclick=function(e){
                e.preventDefault();                
                window.open("shop.html?id="+this.id, "_self");                
            }
        }        
    //es el unico metodo que usamos para pasarCategoriaGaleria
    var pasarCategoriaGaleria = document.getElementsByClassName('pasarCategoriaGaleria');
    for(var i=0;i<pasarCategoriaGaleria.length;i++){
        pasarCategoriaGaleria[i].onclick=function(e){
            e.preventDefault();        
            //var nombrePaginaActual = validarUrl();
            // Convertir la cadena JSON a un objeto JavaScript
            const obj = JSON.parse(this.id); 
            if(obj.catMenu==='ms'){
                window.open("category.html?id="+obj.id_categoria, "_self");
            }else{
                generarMenuCategoriaLPIndex(obj.catTipo);
            }         
        }
    }

    //es el unico metodo que usamos para pasarCategoriaMenuNav
    var pasarCategoriaMenuNav = document.getElementsByClassName('pasarCategoriaMenuNav');
    for(var i=0;i<pasarCategoriaMenuNav.length;i++){
        pasarCategoriaMenuNav[i].onclick=function(e){
            e.preventDefault();               
            // Convertir la cadena JSON a un objeto JavaScript
            const obj = JSON.parse(this.id); 
            if(obj.catMenu==='mp'){
                window.open("category.html?id="+obj.id_categoria, "_self");
            }     
        }
    }
    
    //elegir categoria en category   
    var pasaridCategoria = document.getElementsByClassName('pasaridCategoria');
    for(var i=0;i<pasaridCategoria.length;i++){
        pasaridCategoria[i].onclick=function(e){
            e.preventDefault();            
            window.open("detail.html?id="+this.id, "_self");            
        }
    } 

    //elegir comprar en category   
    var pasaridCategoria2 = document.getElementsByClassName('pasaridCategoria2');
    for(var i=0;i<pasaridCategoria2.length;i++){
        pasaridCategoria2[i].onclick=function(e){
            e.preventDefault();            
            window.open("detail.html?id="+this.id, "_self");            
        }
    } 
   


    //elegir filtro color en category
    var pasaridchbColorCategoria = document.querySelectorAll('.pasaridchbColorCategoria');    
    for(var i=0;i<pasaridchbColorCategoria.length;i++){
        pasaridchbColorCategoria[i].onclick=function(e){  
            mostrarProductoFiltradoporColorCategoria(e); 
        }
    }  
    //elegir filtro talla en category 
    var pasaridchbTalla = document.querySelectorAll('.pasaridchbTallaCategoria');    
    for(var i=0;i<pasaridchbTalla.length;i++){
        pasaridchbTalla[i].onclick=function(e){  
            mostrarProductoFiltradoporTallaCategoria(e); 
        }
    }        

    //elegir filtro categoria en shop    
    var pasaridchbCategoria = document.querySelectorAll('.pasaridchbCategoria');    
    for(var i=0;i<pasaridchbCategoria.length;i++){
        pasaridchbCategoria[i].onclick=function(e){  
            mostrarProductoFiltradoporCategoria(e); 
        }
    }  
    
    //elegir filtro color en shop    
    var pasaridchbColor = document.querySelectorAll('.pasaridchbColor');    
    for(var i=0;i<pasaridchbColor.length;i++){
        pasaridchbColor[i].onclick=function(e){  
            mostrarProductoFiltradoporColor(e); 
        }
    }     
    
    //elegir filtro talla en shop    
    var pasaridchbTalla = document.querySelectorAll('.pasaridchbTalla');    
    for(var i=0;i<pasaridchbTalla.length;i++){
        pasaridchbTalla[i].onclick=function(e){  
            mostrarProductoFiltradoporTalla(e); 
        }
    }      
    //elegir color en Detail  
    var pasaridColor = document.querySelectorAll('.elegirColor');
    for(var i=0;i<pasaridColor.length;i++){
        pasaridColor[i].onclick=function(e){              
            var id_color = this.id;                
            //prueba(id_color);   
            mostrarCambioColoryTallas(id_color);                                      
        }        
    } 
    //elegir tallas
    var array_rbTallas = document.querySelectorAll('.elegirTalla');
    for(var i=0;i<array_rbTallas.length;i++){
    array_rbTallas[i].onclick = function(){
        var id_talla = this.id;
        console.log("TALLA ELEGIDA--->");
        console.log(id_talla);
        mostrarCambioTallas(id_talla);
    }
    }

    //AGREGAR CARRITO
    try {
    var btn_carrito = document.querySelector('#btn_carrito'); 
    btn_carrito.onclick = function(){
    agregarCarrito();
    }
    } catch (error) {
        
    }    
   
    //LINK CARRITO ICONO
    try {
    var linkcarrito = document.getElementById("link_carrito"); 
    linkcarrito.onclick = function(e){
        //verCarrito();
        e.preventDefault(); 
        window.open("cart.html", "_self"); 
    }
   
    } catch (error) {
        
    }  

    //sumar_restar_carrito
   /*  var sumarcarrito = document.getElementsByClassName('btn-plus');
    for(var i=0;i<sumarcarrito.length;i++){
        sumarcarrito[i].onclick=function(e){
        e.preventDefault();    
        var valor = document.getElementById("cantidadp").value;               
            if(valor < 10){
            var suma = parseInt(valor) + parseInt(1);                
            console.log("SUMAR......");           
            console.log(suma); 
                      
            }          
            document.getElementById("cantidadp").innerText = suma;        
            //window.open("shop.html?id="+this.id, "_self");                
        }
    }  */


    //elegir precio
    /* try {
        var elem = document.getElementById("show_filtros");         
        elem.onclick = function(){
            //prueba2();
            var nombrePaginaActual = validarUrl();
            console.log("nombrePaginaActual");
            console.log(nombrePaginaActual);
            if(nombrePaginaActual === "category.html"){
                mostrarProductoFiltradoporPrecioCategoria();                
            }
            if(nombrePaginaActual === "shop.html"){
                mostrarProductoFiltradoporPrecioTienda();
            }            
            
        }   
    } catch (error) {        
    } */

    //elegir precio de show_range
    try {
        var elem = document.getElementById("show_range");         
        elem.onclick = function(){
            //prueba2();
            var nombrePaginaActual = validarUrl();
            console.log("nombrePaginaActual");
            console.log(nombrePaginaActual);
            if(nombrePaginaActual === "category.html"){
                mostrarProductoFiltradoporPrecioCategoria();                
            }
            if(nombrePaginaActual === "shop.html"){
                mostrarProductoFiltradoporPrecioTienda();
            }            
            
        }   
    } catch (error) {        
    }

    //veliminarp
    var veliminarp = document.querySelectorAll('.veliminarp');
    for(var i=0;i<veliminarp.length;i++){
        veliminarp[i].onclick=function(e){
        e.preventDefault(); 
        eliminarProducto(e);
        }
    }
    //massCantidad
    var masCantidad = document.querySelectorAll('.masCantidad');
    for(var i=0;i<masCantidad.length;i++){
        masCantidad[i].onclick=function(e){
        e.preventDefault(); 
        massCantidad(e);
        }
    }

    //menossCantidad 
    var menosCantidad = document.querySelectorAll('.menosCantidad');
    for(var i=0;i<menosCantidad.length;i++){
        menosCantidad[i].onclick=function(e){
        e.preventDefault(); 
        menossCantidad(e);      
        }
    }

    //resum_subtotal carrito
    try {
        var vtotal = document.querySelector('#resum_subtotal');
        var vsubtotal = document.querySelectorAll(".vsubtotal");       
        var totalx = 0;   
        console.log("MARIOOOOOOOOOOOOOOOO----------");
        console.log(vtotal);
        console.log(vsubtotal);        
        for(var i=0;i<vsubtotal.length;i++){
            console.log(vsubtotal[i].innerHTML);
            totalx = totalx + parseInt(vsubtotal[i].innerHTML);         
        }       
        document.getElementById("resum_subtotal").innerHTML = totalx;
        //reutilizar metodo mostrarTotalconenvio
        mostrarTotalconenvio(totalx);        
    } catch (error) {
        
    }

    //registrar_pedido
    try {
        var vregpedido = document.getElementById('registrar_pedido');    
        vregpedido.onclick=function(e){
        e.preventDefault(); 
        registrarPedido();
        }
    } catch (error) {
        
    }
    //enviar pedido
    try {
        var btn_enviarpedido = document.getElementById('btn_enviarpedido');    
        btn_enviarpedido.onclick=function(e){
        //e.preventDefault(); 
        enviarPedido();        
        }
    } catch (error) {
        
    } 
        
    //medioPago     
    /* var pasarpago = document.getElementsByName('payment');
    for(var i=0;i<pasarpago.length;i++){
        pasarpago[i].onclick=function(e){ 
            medioPago(e);         
            //var pago = this.id;                
            //prueba(id_color);   
            //mostrarCambioColoryTallas(id_color);                                      
        }        
    }  */

    
       
   
    
}



function retornarId(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id")
    return id;
}
function retornarIdColor(){
   
    const urlSearchParams = new URLSearchParams(window.location.search);
    const valor = urlSearchParams.get("id")
    try {
        var pos = valor.indexOf("?");
        var id_atributo = valor.slice(0,pos);    
        var id_color = valor.slice(pos+1);
        return id_color;
    } catch (error) {
        
    }
    
}
function retornarIdAtributo(){   
    const urlSearchParams = new URLSearchParams(window.location.search);
    const valor = urlSearchParams.get("id")
    try {
        var pos = valor.indexOf("?");
        var id_atributo = valor.slice(0,pos);    
        var id_color = valor.slice(pos+1);
        return id_atributo;
    } catch (error) {
        
    }
    
}


export {enlazar_paginas,retornarId,retornarIdColor,retornarIdAtributo}