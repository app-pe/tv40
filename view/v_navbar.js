import { generarNavbarMenuCategorias,generarMenuCategoriaCarouselLP } from '../controller/c_categories.js';
let no_navbar =
`
<div class="col-lg-3 d-none d-lg-block">
      <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style="height: 65px; margin-top: -1px; padding: 0 30px;">
          <h6 class="m-0">Categorias</h6>
          <i class="fa fa-angle-down text-dark"></i>
      </a>
      <nav class="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
          <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">
              <!-- <div class="nav-item dropdown">
                  <a href="#" class="nav-link" data-toggle="dropdown">Dresses <i class="fa fa-angle-down float-right mt-1"></i></a>
                  <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                      <a href="" class="dropdown-item">Men's Dresses</a>
                      <a href="" class="dropdown-item">Women's Dresses</a>
                      <a href="" class="dropdown-item">Baby's Dresses</a>
                  </div>
              </div> -->
              <a href="" class="nav-item nav-link">Moda Mujer</a>
              <a href="" class="nav-item nav-link">Moda Hombre</a>                        
              <a href="" class="nav-item nav-link">Moda Infantil</a>
              <!-- <a href="" class="nav-item nav-link">Shirts</a>
              <a href="" class="nav-item nav-link">Jeans</a>
              <a href="" class="nav-item nav-link">Swimwear</a>
              <a href="" class="nav-item nav-link">Sleepwear</a>
              <a href="" class="nav-item nav-link">Sportswear</a>
              <a href="" class="nav-item nav-link">Jumpsuits</a>
              <a href="" class="nav-item nav-link">Blazers</a>
              <a href="" class="nav-item nav-link">Jackets</a>
              <a href="" class="nav-item nav-link">Shoes</a> -->
          </div>
      </nav>
  </div>
`;

let carousel =
`
<div class="row border-top px-xl-5">
  
    <div class="col-lg-12">
        <div id="header-carousel" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">`+
              generarMenuCategoriaCarouselLP()+
              `</div>
              <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
                  <div class="btn btn-dark" style="width: 45px; height: 45px;">
                      <span class="carousel-control-prev-icon mb-n2"></span>
                  </div>
              </a>
              <a class="carousel-control-next" href="#header-carousel" data-slide="next">
                  <div class="btn btn-dark" style="width: 45px; height: 45px;">
                      <span class="carousel-control-next-icon mb-n2"></span>
                  </div>
              </a>
        </div>    
    </div>

</div>`;

let navbar =
`
<div class="row border-top px-xl-5">  
    <div class="col-lg-12">
        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <a href="https://app-pe.github.io/tv40/index.html" class="text-decoration-none d-block d-lg-none">
                <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">TV40</span>Shop</h1>
            </a>
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse2">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse2">
                <div class="navbar-nav mr-auto py-0">
                    <a href="index.html" class="nav-item nav-link active">Inicio</a>
                    <div class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Categorías</a>
                        <div class="dropdown-menu rounded-0 m-0">`+
                        generarNavbarMenuCategorias()+
                       `</div>
                    </div> 
                </div>
                <!--
                <div class="navbar-nav ml-auto py-0">
                    <a href="" class="nav-item nav-link">Login</a>
                    <a href="" class="nav-item nav-link">Register</a>
                </div> -->
            </div>
        </nav>      
    </div>
</div>`;

function generarNavbarCarousel(bodyy){
    const divNavbar = document.createElement('div');
    divNavbar.classList = 'container-fluid mb-5';
    divNavbar.id = 'show_navbar';
    divNavbar.innerHTML = navbar+carousel;
    bodyy.appendChild(divNavbar);
    bodyy.insertBefore(divNavbar,bodyy.children[1]);    
}

function generarNavbar(bodyy){
    const divNavbar = document.createElement('div');
    divNavbar.classList = 'container-fluid mb-1';
    divNavbar.id = 'show_navbar';
    divNavbar.innerHTML = navbar;
    bodyy.appendChild(divNavbar);
    bodyy.insertBefore(divNavbar,bodyy.children[1]);    
}

export { generarNavbarCarousel,generarNavbar };
