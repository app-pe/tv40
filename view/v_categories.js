import { generarMenuCategoriaLP } from '../controller/c_categories.js';
import { enlazar_paginas } from '../model/ms_enlaces.js';
let categories =
`
<div class="text-center mb-4">
    <h2 class="section-title px-5"><span class="px-2">Categorías</span></h2>
</div>
<div class="row px-xl-5 pb-3">`
+generarMenuCategoriaLP()+
`</div>`;

function generarDivCategories(bodyy){
    const divCategories = document.createElement('div');
    divCategories.classList = 'container-fluid pt-5';
    divCategories.id = 'show_categories';
    divCategories.innerHTML = categories;
    bodyy.appendChild(divCategories);
    bodyy.insertBefore(divCategories,bodyy.children[3]); 
    
    enlazar_paginas();
}

export { generarDivCategories };
