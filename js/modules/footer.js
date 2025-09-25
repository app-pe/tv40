let footer =
`
<div class="row px-xl-5 pt-5">
    <div class="col-lg-6 col-md-12 mb-5 pr-3 pr-xl-5">
        <a href="https://app-pe.github.io/tv40/index.html" class="text-decoration-none">
            <h1 class="mb-4 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border border-white px-3 mr-1">TV40</span>Shop</h1>
        </a>        
        <h1 style="font-size: 18px; text-align: justify;">Impulsa tu negocio y conecta con clientes y emprendedores</h1>        
        <h2 style="font-size: 18px; text-align: justify;">Plataforma con propósito de servicio al emprendedor</h2>
        <h2 style="font-size: 18px; text-align: justify;">Muestra gratis tu marca y catálogo por 40 días sin comisiones. Impulsa tu negocio y conecta con clientes y emprendedores.</h2>        
        <p class="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>tv40shop@gmail.com</p>
    </div>
    <div class="col-lg-6 col-md-12">
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
             &copy; <a class="text-dark font-weight-semi-bold" href="https://app-pe.github.io/tv40/index.html">TV40</a>. All Rights Reserved.
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
