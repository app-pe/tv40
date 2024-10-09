import { buscarNombre_MenuHeader,buscarNombre_TituloCategoria } from '../controller/c_header.js';
var nom_menu = buscarNombre_MenuHeader();
var titulo_categoria = buscarNombre_TituloCategoria();
//console.log(nom_menu);
//console.log(titulo_categoria);
let header_menu =
`
<div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 100px">
    <h1 class="font-weight-semi-bold text-uppercase mb-3">${nom_menu}</h1>
    <div class="d-inline-flex">
        <p class="m-0"><a href="index.html">Inicio</a></p>
        <p class="m-0 px-2">-</p>
        <p class="m-0">${nom_menu}</p>
    </div>
</div>    
`;

let banner_categorias =
`
<div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 100px">
    <h3 class="font-weight-semi-bold mb-3">${titulo_categoria}</h3>
    <div class="d-inline-flex">
        <p class="m-0"><a href="index.html">Inicio</a></p>
        <p class="m-0 px-2">-</p>
        <p class="m-0">${nom_menu}</p>
    </div>
</div>`;

function generarNavbarHeader(bodyy){
    const divNavbarHeader = document.createElement('div');            
    divNavbarHeader.classList = 'container-fluid bg-secondary mb-4';
    divNavbarHeader.id = 'show_NavbarHeader';
    divNavbarHeader.innerHTML = header_menu;
    bodyy.appendChild(divNavbarHeader);
    bodyy.insertBefore(divNavbarHeader,bodyy.children[2]);
}

function generarNavbarHeaderCategory(bodyy){
    const divNavbarHeader1 = document.createElement('div');            
    divNavbarHeader1.classList = 'container-fluid bg-secondary mb-4';
    divNavbarHeader1.id = 'show_NavbarHeader';
    divNavbarHeader1.innerHTML = banner_categorias;
    bodyy.appendChild(divNavbarHeader1);
    bodyy.insertBefore(divNavbarHeader1,bodyy.children[2]);
}
export {generarNavbarHeader,generarNavbarHeaderCategory}