//import { data } from '../model/ms_datos.js';
function verCarrito(){
    console.log("ver carrito app");    
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];   
    let chart_carrito = "";    
    var nombre_producto = "";
    var url = "";
    var imagen = "";    
    var url_imagen = "";    
    var precio_oferta = "";
    var talla = "";
    var color = "";
    var cantidad = "";
    var conta = 0;
    var subtotalT = 0;
    var subtotal = 0;
    var idp = 0;
    for(var i=0;i<carrito.length;i++){          
       nombre_producto = carrito[i].nombre_producto;
       url = carrito[i].url_imagen_categoria;
       imagen = carrito[i].imagen_principal;
       url_imagen = carrito[i].url_img;
       precio_oferta = carrito[i].precio_oferta;
       talla = carrito[i].tallav;
       color = carrito[i].colorv;
       cantidad = carrito[i].cantidad;

       //var idp = carrito[i].id_producto;
       idp = carrito[i].id_atributo;
       var precio = carrito[i].precio_oferta;
       subtotal = parseFloat(precio)*parseInt(cantidad);

    chart_carrito +=
    `
    <tr name="vitem">
        <td class="align-middle small" id="${idp}"><img src="${url_imagen}" alt="" style="width: 40px;">${nombre_producto}</td>
        
        <td class="align-middle text-center" id="vprecio${conta}">S/${precio_oferta}</td>
        <td class="align-middle text-center">
            <div class="input-group quantity mx-auto" style="width: 100px;">
                <div class="input-group-btn">
                    <button class="btn btn-sm btn-primary menosCantidad">
                    <i class="fa fa-minus letra_btn_cant" id="${idp+"|"+conta+"$"+precio}"></i>
                    </button>
                </div>
                <!--<input type="text" class="form-control form-control-sm bg-secondary text-center" value="1">-->
                <input type="text" class="form-control form-control-sm bg-secondary text-center vcantidad" id="cantidad${conta}" name="vcantidad" value="${cantidad}" min="" max="" readonly="readonly">
                <div class="input-group-btn">
                    <button class="btn btn-sm btn-primary masCantidad">
                        <i class="fa fa-plus letra_btn_cant" id="${idp+"|"+conta+"$"+precio}"></i>
                    </button>
                </div>
            </div>
        </td>
        <td class="align-middle text-center vsubtotal" id="subTotal${conta}" name="vsubtotal" value="${subtotal}">${subtotal}</td>        
        <td class="align-middle text-center"><button class="btn btn-sm btn-primary veliminarp"><i class="fa fa-times" id="${idp+"|"+conta}"></i></button></td>        
       
    </tr>
    `;
    conta++;
    subtotalT = subtotalT + subtotal; 
    //actualizar cantidad y subtotal en carrito
    carrito[i].cantidad = cantidad;
    carrito[i].subtotal = subtotal;
    localStorage.setItem("items_carrito", JSON.stringify(carrito));    
    }    
    return chart_carrito;
}

function massCantidad(e){       
    //recibo valores
    console.log("-----e.target.id mas-----"); 
    console.log(e.target.id); 
    var valor = e.target.id;
    var pos = valor.indexOf("|");
    var idp = valor.slice(0,pos);    
    
    var pos2 = valor.indexOf("$");
    var conta = parseInt(valor.slice(pos+1,pos2));            
    
    var precio = valor.slice(pos2+1);
    console.log(idp); 
    console.log(conta);     
    console.log(precio);   

    //metodo
    var valorx = 0;
    var valoridpx = 0;
    var colorx = "";
    var tallax = "";
    var vcantidad = document.querySelectorAll(".vcantidad"); 
    var vcantidadx = parseInt(document.getElementById('cantidad'+conta).value);     
    //var vsubtotalx = document.getElementById('subTotal'+conta).value; 
    var vsubtotal = document.querySelectorAll(".vsubtotal");
    
    var sumax=0;
    var totalx = 0;
    if(vcantidadx < 10){
        console.log("entro---");
        console.log(vcantidadx);
        sumax = vcantidadx + parseInt(1); 
        document.getElementById('cantidad'+conta).value = sumax;
        //subtotalx
        var subtotalx = precio*sumax;
        console.log("subtotalx");
        console.log(subtotalx);
        document.getElementById('subTotal'+conta).innerText = subtotalx;

        //total        
        for(var i=0;i<vsubtotal.length;i++){
            //console.log(vcantidad[conta]);
            console.log("vsubtotal--");
            console.log(vsubtotal[i].innerText);
            totalx = totalx + parseInt(vsubtotal[i].innerText);                              
                  
        }
        console.log("totalx suma total"); 
        console.log(totalx); 
        document.getElementById("resum_subtotal").innerHTML = totalx;
        //reutilizar metodo mostrarTotalconenvio
        mostrarTotalconenvio(totalx);

        //actualizar carrito
        const carrito = JSON.parse(localStorage.getItem("items_carrito")) || []; 
        for(var c=0;c<carrito.length;c++){
            if(carrito[c].id_atributo === idp){
                console.log("lo encontre "+idp);
                //actualizar datos de carrito
                carrito[c].cantidad = sumax;
                carrito[c].subtotal = subtotalx;
                localStorage.setItem("items_carrito", JSON.stringify(carrito));
            }
        }      
    } 
      
}
function menossCantidad(e){  
    //recibo valores
    var valor = e.target.id;
    console.log("-----e.target.id menos-----"); 
    console.log(e.target.id); 
    var pos = valor.indexOf("|");
    var idp = valor.slice(0,pos);    
    
    var pos2 = valor.indexOf("$");
    var conta = parseInt(valor.slice(pos+1,pos2));            
    
    var precio = valor.slice(pos2+1);
    console.log(idp); 
    console.log(conta); 
    console.log(precio); 
    //metodo
    var valory = 0;
    var colorx = "";
    var tallax = "";
    
    var vcantidadx = document.getElementById('cantidad'+conta).value;
    var vsubtotal = document.querySelectorAll(".vsubtotal"); 
    var vcolor = document.querySelectorAll(".vcolor");
    var vtalla = document.querySelectorAll(".vtalla");
    //resta
    var restax=0;
    var totalx = 0;
    if(vcantidadx > 1){
        console.log("entro---");
        console.log(vcantidadx);
        restax = vcantidadx - parseInt(1); 
        document.getElementById('cantidad'+conta).value = restax;     
        //subtotalx
        var subtotalx = precio*restax;
        console.log("subtotalx");
        console.log(subtotalx);
        document.getElementById('subTotal'+conta).innerText = subtotalx;

        //total        
        for(var i=0;i<vsubtotal.length;i++){
            //console.log(vcantidad[conta]);
            console.log("vsubtotal--");
            console.log(vsubtotal[i].innerText);
            totalx = totalx + parseInt(vsubtotal[i].innerText);                              
                  
        }
        console.log("totalx suma total"); 
        console.log(totalx); 
        document.getElementById("resum_subtotal").innerHTML = totalx;
        //reutilizar metodo mostrarTotalconenvio
        mostrarTotalconenvio(totalx);

        //actualizar carrito
        const carrito = JSON.parse(localStorage.getItem("items_carrito")) || []; 
        for(var c=0;c<carrito.length;c++){
            if(carrito[c].id_atributo === idp){
                console.log("lo encontre "+idp);
                //actualizar datos de carrito
                carrito[c].cantidad = restax;
                carrito[c].subtotal = subtotalx;
                localStorage.setItem("items_carrito", JSON.stringify(carrito));
            }
        }
    }
           
}
function eliminarProducto(e){
    //valores
    var valor = e.target.id;
    console.log("-----e.target.id eliminar-----"); 
    console.log(e.target.id); 
    var pos = valor.indexOf("|");
    var idp = valor.slice(0,pos);    
    var conta = valor.slice(pos+1);
    
    console.log(idp); 
    console.log(conta); 

    //metodo   
    var items_carritox = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    //PASO1: BUSCAR SI EXISTE EL idp en carrito
    var foundId = items_carritox.find(function(item){
        return item.id_atributo === idp.toString()
        //return item.id === idp.toString() & item.talla === tallax & item.color === colorx
    });
    //console.log(foundId);
    items_carritox = items_carritox.filter(function(itemid){
        return itemid !== foundId;
    });
    //console.log(items_carritox);    
    //PASO2: ELIMINA tr y borra de carrito
    document.getElementsByName("vitem")[conta].innerText = "";
    //muestra total items carrito
    document.getElementById("contador_carrito").innerHTML = items_carritox.length;
    localStorage.setItem("items_carrito", JSON.stringify(items_carritox));

    //PASO3: MOSTRAR LOS SUBTOTALES EN LOS td     
    var totalx = 0;
    var vsubtotal = document.querySelectorAll(".vsubtotal"); 
    for(var i=0;i<vsubtotal.length;i++){
        //console.log(vcantidad[conta]);
        console.log("vsubtotal--");
        console.log(vsubtotal[i].innerText);
        totalx = totalx + parseInt(vsubtotal[i].innerText);                              
              
    }
    console.log("totalx suma total"); 
    console.log(totalx); 
    //actualizo totalx en resum_subtotal
    document.getElementById("resum_subtotal").innerHTML = totalx;
    //reutilizar metodo mostrarTotalconenvio
    mostrarTotalconenvio(totalx);

    verCarrito();
    

}
function mostrarTotalconenvio(totalx){        
    var totalconEnvio = 0;
    var envio = 0;
    if(totalx < 100){
        if(totalx === 0){
            //alert("DEBE AGREGAR UN PRODUCTO");
            window.open("index.html", "_self");
        }else{
            //resum_envio = 20 soles
            document.getElementById("resum_envio").innerHTML = 10;
            envio = 10;
        }
        
    }else{
        //resum_envio = gratis
        document.getElementById("resum_envio").innerHTML = "gratis";
        envio = 0;
    }
    //total con envio        
    totalconEnvio = totalx + envio;
    document.getElementById("resum_total").innerHTML = totalconEnvio;

    //actualizar carrito
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || []; 
    for(var c=0;c<carrito.length;c++){ 
    //actualizar datos envio de carrito
    carrito[c].envio = envio;            
    localStorage.setItem("items_carrito", JSON.stringify(carrito));
        
    } 
}
function validarCarrito(){
    console.log("---VALIDAR CARRITO----");
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    if(carrito.length != 0){
        return carrito.length;                                    
    }
    
}
function registrarPedido(){    
    console.log("<<<<registrarPedido>>>>>");
    var op_validarcarrito = validarCarrito();    
    
    if(op_validarcarrito != undefined){
        window.open("checkout.html", "_self");        
    }
    if(op_validarcarrito === undefined){        
        window.open("index.html", "_self");
    }
    

}
export {verCarrito,eliminarProducto,massCantidad,menossCantidad,mostrarTotalconenvio,registrarPedido}