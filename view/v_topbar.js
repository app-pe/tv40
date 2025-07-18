import { enlazar_paginas } from '../model/ms_enlaces.js';
let no_topbar =
`
<div class="row bg-secondary py-2 px-xl-5">
<div class="col-lg-6 d-none d-lg-block">
    <div class="d-inline-flex align-items-center">
        <a class="text-dark" href="">FAQs</a>
        <span class="text-muted px-2">|</span>
        <a class="text-dark" href="">Help</a>
        <span class="text-muted px-2">|</span>
        <a class="text-dark" href="">Support</a>
    </div>
</div>
<div class="col-lg-6 text-center text-lg-right">
    <div class="d-inline-flex align-items-center">
        <a class="text-dark px-2" href="">
            <i class="fab fa-facebook-f"></i>
        </a>
        <a class="text-dark px-2" href="">
            <i class="fab fa-twitter"></i>
        </a>
        <a class="text-dark px-2" href="">
            <i class="fab fa-linkedin-in"></i>
        </a>
        <a class="text-dark px-2" href="">
            <i class="fab fa-instagram"></i>
        </a>
        <a class="text-dark pl-2" href="">
            <i class="fab fa-youtube"></i>
        </a>
    </div>
</div>
</div>
`;

let topbar =
`
<div class="row align-items-center py-3 px-xl-5">
<div class="col-lg-3 d-none d-lg-block">
    <a href="https://app-pe.github.io/tv40/index.html" class="text-decoration-none">
        <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">TV40</span>Shop</h1>
    </a>
</div>
<div class="col-lg-6 col-6 text-left">
    <form action="">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for products">
            <div class="input-group-append">
                <span class="input-group-text bg-transparent text-primary">
                    <i class="fa fa-search"></i>
                </span>
            </div>
        </div>
    </form>
</div>
<div class="col-lg-3 col-6 text-right">
<!--    <a href="" class="btn border">
        <i class="fas fa-heart text-primary"></i>
        <span class="badge">0</span>
    </a>-->
    <a href="" class="btn border" id="link_carrito">
        <i class="fas fa-shopping-cart text-primary"></i>
        <span class="badge" id="contador_carrito">0</span>
    </a>
</div>
</div>`;


function generarTopbar(bodyy){
    const divTopbar = document.createElement('div');
    divTopbar.classList = 'container-fluid';
    divTopbar.id = 'show_topbar';
    divTopbar.innerHTML = topbar;
    bodyy.appendChild(divTopbar);
    bodyy.insertBefore(divTopbar,bodyy.children[0]);   
    
    enlazar_paginas();   
    const carrito = JSON.parse(localStorage.getItem("items_carrito")) || []; 
    document.getElementById("contador_carrito").innerHTML = carrito.length;
    //document.getElementById("contador_carrito").innerText = carritoT.length; 
}





export { generarTopbar };
