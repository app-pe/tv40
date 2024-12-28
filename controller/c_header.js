import { datos,data } from '../model/ms_datos.js';
let categoria = data.categoria;

function validarUrl(){        
    var paginaActual=window.location.pathname;
    var nombrePaginaActual = "";
    var nom_menu = "";
    var subcadena2 ="";
    if(paginaActual.slice(-1)==="/"){
        nombrePaginaActual = "index.html";
        return nombrePaginaActual;
    }else{
        for(var i=0;i<datos.menu.length;i++){
            subcadena2 = datos.menu[i].nom_url;
            nom_menu = datos.menu[i].nom_menu;            
            var pos = parseInt(paginaActual.indexOf(subcadena2));
            nombrePaginaActual = paginaActual.substring(pos);  
            //validar si encuentra la url            
            if(nombrePaginaActual===subcadena2){                
                return nombrePaginaActual;break;                
            }
        }
    }
}

function buscarNombre_MenuHeader(){
    var nombrePaginaActual = validarUrl();
    for(var i=0;i<datos.menu.length;i++){
        //validar si encuentra el nombre de la url            
        if(nombrePaginaActual===datos.menu[i].nom_url){            
            var nomMenu = datos.menu[i].nom_menu;   
            return nomMenu;break;    
        }
    }
}

function buscarNombre_TituloCategoria(){
    //var nombrePaginaActual = validarUrl();
    //capturo id_categoria de category.html
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id_categoria = urlSearchParams.get("id")
    for(var i=0;i<categoria.length;i++){
        //validar si encuentra el nombre de la url            
        if(id_categoria === categoria[i].id_categoria){            
            var nombre_tituloCategoria = categoria[i].nombre_categoria;   
            return nombre_tituloCategoria;break;    
        }
    }
    
}

export{validarUrl,buscarNombre_MenuHeader,buscarNombre_TituloCategoria}