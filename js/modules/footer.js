let footer =
`
<div class="row px-xl-5 pt-5">
    <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
        <a href="" class="text-decoration-none">
            <h1 class="mb-4 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border border-white px-3 mr-1">TV40</span>Shop</h1>
        </a>
        <p>Somos una plataforma virtual con un propósito definido que es servir a los emprendedores afiliados para promover su catálogo de productos por un periodo gratuito de 40 días.</p>        
        <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>tv40shop@gmail.com</p>
    </div>
    <div class="col-lg-8 col-md-12">
        <div class="row">
            <div class="col-md-4 mb-5">
                <h5 class="font-weight-bold text-dark mb-4">Enlaces</h5>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-dark mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Inicio</a>                    
                </div>
            </div>
            
        </div>
    </div>
 </div>
 <div class="row border-top border-light mx-xl-5 py-4">
     <div class="col-md-6 px-xl-0">
         <p class="mb-md-0 text-center text-md-left text-dark">
             &copy; <a class="text-dark font-weight-semi-bold" href="#">TV40</a>. All Rights Reserved.
         </p>
     </div>
     <div class="col-md-6 px-xl-0 text-center text-md-right">
         <img class="img-fluid2" src="img/payments.png" alt="">
     </div>
 </div>
 <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>
 `;

 function generarDivFooter(bodyy){
    const divFooter = document.createElement('div');
    divFooter.classList = 'container-fluid bg-secondary text-dark mt-5 pt-5';
    divFooter.id = 'show_footer';
    divFooter.innerHTML = footer;
    bodyy.appendChild(divFooter);
    bodyy.insertBefore(divFooter,bodyy.children[7]);    
}

export { generarDivFooter };
