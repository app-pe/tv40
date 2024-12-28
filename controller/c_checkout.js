
function verProductos(){
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];
    console.log("=== VER CARRITO CHEKOUT ===");
    console.log(carrito);
    var chart_productos="";
    var chart_total="";
    var nombre_producto="";
    var color="";
    var talla="";
    var precio_oferta=0;
    var subtotal=0;
    var total=0;
    var envio=0;
    var cantidad="";
    var atb="";

    for(var i=0;i<carrito.length;i++){
    atb = carrito[i].atb;
    cantidad = carrito[i].cantidad;
    nombre_producto = carrito[i].nombre_producto;
    precio_oferta = carrito[i].precio_oferta;
    var totalconEnvio = 0;
    talla = carrito[i].tallav;
    color = carrito[i].colorv;
    envio = carrito[i].envio;
    subtotal = carrito[i].subtotal;
    total = total + subtotal;
    //total + envio
    totalconEnvio = total + envio;
    chart_productos +=
    `
    <div class="d-flex justify-content-between small">
        <label>${cantidad+" "+nombre_producto+" "+talla+" "+color+" "+atb}</label>
        <label>${subtotal}</label>
    </div>    
    `;
   
    }
    chart_total +=
    `    
    <div class="card-body">
    <h5 class="font-weight-medium mb-3">Productos</h5>`+
    chart_productos+
    `<hr class="mt-0">
        <div class="d-flex justify-content-between mb-3 pt-1">
            <h6 class="font-weight-medium">Subtotal</h6>
            <h6 class="font-weight-medium">${total}</h6>
        </div>
        <div class="d-flex justify-content-between">
            <h6 class="font-weight-medium">Envío</h6>
            <h6 id="resum_envio" class="font-weight-medium">${envio}</h6>
        </div>
    </div>
    <div class="card-footer border-secondary bg-transparent">
        <div class="d-flex justify-content-between mt-2">
            <h5 class="font-weight-bold">Total</h5>
            <h5 id="resum_total" class="font-weight-bold">${totalconEnvio}</h5>
        </div>
    </div> 
    `;
    return chart_total;
}
function validarCarrito(){
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];    
    if(carrito.length != 0){
        return carrito.length;                                    
    }    
}
function medioPago(){
    var radiob_payment = document.getElementsByName('payment'); 
    //console.log(radiob_payment);
    var op_pago = "";         
        radiob_payment.forEach((itempago) => {
        if (itempago.checked) {
            op_pago = itempago.id;
        }
    });
    //validamos op_pago
    if(op_pago != ""){
        return op_pago;                                            
    }else{
        alert("Debe seleccionar un MEDIO DE PAGO--"); 
    }

}
function enviarPedido(){
    console.log("---ENVIAR PEDIDO---");
    //PASO1: CAPTURAMOS DATOS DE LA PERSONA Y op_pago
    var vnombre = document.getElementById("vnombre").value;
    var vapellido = document.getElementById("vapellido").value;
    var vcorreo = document.getElementById("vcorreo").value;
    var vcelular = document.getElementById("vcelular").value;
    var vdireccion = document.getElementById("vdireccion").value;
    var vubicacion = document.getElementById("vubicacion").value;
    var vdistrito = document.getElementById("vdistrito");    
    vdistrito = vdistrito.options[vdistrito.selectedIndex].text; 
    //medioPago    
    var op_pago = medioPago();  

    //PASO2: VALIDAMOS QUE NO ESTEN VACIOS LOS DATOS DE LA PERSONA
    if(vnombre === ""){
        alert("Debe seleccionar un NOMBRE--");                                                   
    }       
    if(vapellido === ""){
        alert("Debe seleccionar un APELLIDO--");                                                   
    }       
    if(vcorreo === ""){
        alert("Debe seleccionar un CORREO--");                                                   
    }       
    if(vcelular === ""){
        alert("Debe seleccionar un CELULAR--");                                                   
    }       
    if(vdireccion === ""){
        alert("Debe seleccionar un DIRECCION--");                                                   
    }       
    if(vubicacion === ""){
        alert("Debe seleccionar un UBICACION--");                                                   
    }       
    if(vdistrito === ""){
        alert("Debe seleccionar un DISTRITO--");                                                   
    }      
    
    //SI ALGUN DATO ESTA VACIO NO SE REGISTRA NADA
    if(op_pago === undefined | vnombre === "" | vapellido === "" | vcorreo === "" | vcelular === "" | vdireccion === "" | vubicacion === "" | vdistrito === ""){
        //nada
    } 
    else{
    var op_envio = document.getElementById("resum_envio").innerHTML;
    var filas = "";
    var total = 0;
    var datos_persona = "";
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || [];
    carrito.forEach((item) => {        
        var total = item.subtotal+item.envio;
        filas += item.cantidad+" "+item.nombre_producto+" "+item.tallav+" "+item.colorv+" "+item.atb+" "+"S/"+item.subtotal+"%0D%0A";
    });
    console.log(filas);
    datos_persona = "Nombre: "+vnombre+" "+vapellido+"%0D%0A"+
                    "Correo: "+vcorreo+"%0D%0A"+
                    "Celular: "+vcelular+"%0D%0A"+
                    "Direccion: "+vdireccion+"%0D%0A"+
                    "Ubicacion: "+vubicacion+"%0D%0A"+
                    "Distrito: "+vdistrito;
    //botn enviar
    var url = document.getElementById('enlace');
    //armamos mensaje
    var cabecera = "DATOS DEL PEDIDO:"
    var cabecera2 = "DATOS PERSONA:"
    var mediopago = "Medio pago: "+op_pago;            
    
    
    var envio = "Envío: S/"+op_envio;
    var totalpagar = "Pago total:"+"%0D%0A"+"S/"+document.getElementById("resum_total").innerHTML;
    
    var cabecera_detalleprod =  "Detalle de Productos:";
    var cabecera_detalleprod2 =  "Detalle de Envío:";
    var cabecera_detallepagoyenvio =  "DETALLE DE PAGO Y ENVÍO";
    var cab = "|cantidad|producto|color|talla|precio|";   
        
    var baseUrl = "https://api.whatsapp.com/send?phone=51999781083&text="+cabecera+"%0D%0A"+cabecera_detalleprod+"%0D%0A"+
    filas+"%0D%0A"+cabecera_detallepagoyenvio+"%0D%0A"+mediopago+"%0D%0A"+envio+"%0D%0A"+totalpagar+"%0D%0A"+"%0D%0A"+
    cabecera2+"%0D%0A"+datos_persona;
      
    url.setAttribute('href',baseUrl);
    //localStorage.clear();
    }

}

export{verProductos,enviarPedido}