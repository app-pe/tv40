var datos =
{
    "menu":[
        {"id_menu":"m1","nom_menu":"Inicio","nom_url":"index.html"},
        {"id_menu":"m2","nom_menu":"Catálogo","nom_url":"shop.html"},
        {"id_menu":"m3","nom_menu":"Servicios","nom_url":"service.html"},
        {"id_menu":"m4","nom_menu":"Precios","nom_url":"pricing.html"},
        {"id_menu":"m5","nom_menu":"Contacto","nom_url":"contact.html"}                 
    ]
};

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

function generarNavbarHeader(bodyy){
    var nombrePaginaActual = validarUrl();
    for(var i=0;i<datos.menu.length;i++){
        //validar si encuentra el nombre de la url            
        if(nombrePaginaActual===datos.menu[i].nom_url){            
            var nomMenu = datos.menu[i].nom_menu;            
            let header = `
            <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 100px">
                <h1 class="font-weight-semi-bold text-uppercase mb-3">${nomMenu}</h1>
                <div class="d-inline-flex">
                    <p class="m-0"><a href="">Inicio</a></p>
                    <p class="m-0 px-2">-</p>
                    <p class="m-0">${nomMenu}</p>
                </div>
            </div>`;
            const divNavbarHeaderMenu2 = document.createElement('div');            
            divNavbarHeaderMenu2.classList = 'container-fluid bg-secondary mb-5';
            divNavbarHeaderMenu2.id = 'show_divNavbarHeaderMenu2';
            divNavbarHeaderMenu2.innerHTML = header;
            bodyy.appendChild(divNavbarHeaderMenu2);
            bodyy.insertBefore(divNavbarHeaderMenu2,bodyy.children[2]);                           
        }
    }
}
export { validarUrl,generarNavbarHeader };