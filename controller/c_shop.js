//retornar imagen de tienda, logo, nombre, ruc, razon social
import { data } from '../model/ms_datos.js';
//import { data } from '../microservice/ms_category.js';
import { retornarId } from '../model/ms_enlaces.js';
import { retornarObjTienda,retornarProductosTienda,retornarUrlCategoriasTienda } from '../model/ms_filtros.js';
import { generarCatalogoProductos } from '../microservice/ms_catalogo.js';
//var tienda = data.tienda;
var productos = data.producto;
var imagenesatb = data.imagenes; 
var atributos = data.atributo_producto; 
var tiendas = data.tienda; 
var filtrarTienda2 = retornarObjTienda();
var filtrarProductosTienda = retornarProductosTienda();
var arrayidCategorias = retornarIdCategoriaProductosTienda();

function mostrarSellers(){
let show_seller = "";
for(var i=0;i<tiendas.length;i++){
var idtienda = tiendas[i].id_tienda;
var imglogo = tiendas[i].imagen_logo;
var estado = tiendas[i].estado;
var nombre_tienda = filtrarTienda2.nombre_tienda;
if(estado === 1){
show_seller +=
`
  <div class="vendor-item border p-4">
            <a href="shop.html?id=${idtienda}"><img src="${imglogo}" alt="Logo oficial de ${nombre_tienda}"></a>                
            </div>
`;
}

}
return show_seller;
}

function retornarIdCategoriaProductosTienda(){   
    //retorna las categorias del producto de la tienda    
    var arrayidCategoria = filtrarProductosTienda.map(function(cat){
        return cat.id_categoria
    });
    const arrayidCategorias = arrayidCategoria.reduce((acc,item)=>{
        if(!acc.includes(item)){
          acc.push(item);
        }
        return acc;
    },[])   
    //muestra el id sin repetir de las categorias de los productos de la tienda 
    console.log("<retornarIdCategoriaProductosTienda>");
    console.log(arrayidCategorias);
    return arrayidCategorias;
}

function crearCatalogoTienda(filtrarProductosTienda){
    console.log("crearCatalogoTienda------");
    var arrayatb = [];
      //var atbSinDuplicados = [];
      
      for(var i=0;i<filtrarProductosTienda.length;i++){
        var id_producto = filtrarProductosTienda[i].id_producto;
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
  
    for(var i=0;i<filtrarProductosTienda.length;i++){
        var id_producto = filtrarProductosTienda[i].id_producto;
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
          filtrarImagenAtb.nombre_producto = filtrarProductosTienda[i].nombre_producto;
          filtrarImagenAtb.precio_catalogo = filtrarProductosTienda[i].precio_catalogo;
          filtrarImagenAtb.precio_oferta = filtrarProductosTienda[i].precio_oferta;  
          filtrarImagenAtb.id_tienda = filtrarProductosTienda[i].id_tienda; 
          filtrarImagenAtb.cantidad = filtrarProductosTienda[i].cantidad; 
          filtrarImagenAtb.id_categoria = filtrarProductosTienda[i].id_categoria;  
          var id_categoria = filtrarProductosTienda[i].id_categoria;  
          //var url_imagen_categoria = 
          filtrarImagenAtb.url_imagen_categoria = retornarUrlCategoriasTienda(id_categoria);
          arrayatbprod = arrayatbprod.concat(filtrarImagenAtb);
  
        }
        
  
           
  
      } 
    }
    console.log("arrayatbprod-ok");     
    console.log(arrayatbprod);
    return arrayatbprod;
}

function mostrarCatalogoProductosTienda(){    
    //console.log(filtrarProductosTienda);
    var arrayatbprod = crearCatalogoTienda(filtrarProductosTienda);
    var catalogox = generarCatalogoProductos(arrayatbprod);  
    return catalogox;
}

function mostrarDatostienda(){
//<h4 class="font-weight-semi-bold">${nombre_tienda}</h4>   
var nombre_tienda = filtrarTienda2.nombre_tienda;
var ruc = filtrarTienda2.ruc;
var razon_social = filtrarTienda2.razon_social;   
let datosTienda =
`
${nombre_tienda ? `<p class="lh-sm"><h1>${nombre_tienda}</h1></p>` : ""}
${ruc ? `<p class="lh-sm">RUC: ${ruc}</p>` : ""}
${razon_social ? `<p class="lh-sm">RS: ${razon_social}</p>` : ""}
`;    
return datosTienda;
}
function mostrarBannertienda(){  
    var imagen_banner = filtrarTienda2.imagen_banner;  
    var nombre_tienda = filtrarTienda2.nombre_tienda;
    let datosTienda =
    `
    <div class="banner-container" style="width: 100%; height: auto; overflow: hidden;">
        <img src="${imagen_banner}" class="img-fluid banner-img" alt="Banner oficial de ${nombre_tienda}">
    </div>
    `;    
    return datosTienda;
}
function mostrarLogotienda(){ 
    var imagen_logo = filtrarTienda2.imagen_logo;  
    var nombre_tienda = filtrarTienda2.nombre_tienda; 
    let datosTienda =
    `
    <img src="${imagen_logo}" class="" alt="Logo oficial de ${nombre_tienda}">
    `;    
    return datosTienda;
}





export{mostrarBannertienda,mostrarLogotienda,mostrarDatostienda,mostrarCatalogoProductosTienda,crearCatalogoTienda,mostrarSellers}