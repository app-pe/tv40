//import { algo } from '../controller/c_detail.js';
import { validarUrl } from '../controller/c_header.js';
import { generarTopbar } from '../view/v_topbar.js';
import { generarNavbarCarousel, generarNavbar } from '../view/v_navbar.js';
import { generarNavbarHeader,generarNavbarHeaderCategory } from '../view/v_header_menu.js';
import { generarDivCategories } from '../view/v_categories.js';
import { generarProductosDeCategoria } from '../view/v_category.js';
import { generarDetalleProducto } from '../view/v_detail.js';
import { generarShop } from '../view/v_shop.js';
import { generarShopCatalogo } from '../view/v_shop_catalogo.js';
import { generarCarrito } from '../view/v_cart.js';
import { generarCheckout } from '../view/v_checkout.js';


import { generarDivFeatured } from './modules/featured.js';
import { generarDivOffers } from './modules/offers.js';
import { generarDivProductsModa } from './modules/products.js';
import { generarDivVendors } from './modules/vendors.js';
import { generarDivFooter } from './modules/footer.js';

const bodyy = document.querySelector('body');
var nombrePaginaActual = validarUrl();

if(nombrePaginaActual === "index.html"){   
    generarTopbar(bodyy);//0 
    generarNavbarCarousel(bodyy);//1
    generarDivFeatured(bodyy);//2
    generarDivCategories(bodyy);//3
    generarDivOffers(bodyy);//4
    generarDivProductsModa(bodyy);//5
    generarDivVendors(bodyy);//6
    generarDivFooter(bodyy);//7   
}
if(nombrePaginaActual === "shop.html"){
    generarTopbar(bodyy);//0 
    generarNavbar(bodyy);//1 
    generarShop(bodyy);//2   
    generarShopCatalogo(bodyy);//3     
    generarDivFooter(bodyy);//4    
}
if(nombrePaginaActual === "category.html"){
    generarTopbar(bodyy);//0 
    generarNavbar(bodyy);//1
    generarNavbarHeaderCategory(bodyy)//2   
    generarProductosDeCategoria(bodyy);//3
    generarDivFooter(bodyy);//4    
}
if(nombrePaginaActual === "detail.html"){
    generarTopbar(bodyy);//0 
    generarNavbar(bodyy);//1
    generarDetalleProducto(bodyy);//2    
    generarDivFooter(bodyy);//4    
}
if(nombrePaginaActual === "cart.html"){
    generarTopbar(bodyy);//0     
    generarNavbar(bodyy);//1
    generarNavbarHeader(bodyy)//2 
    generarCarrito(bodyy);//3      
    generarDivFooter(bodyy);//4    
}
if(nombrePaginaActual === "checkout.html"){
    generarTopbar(bodyy);//0     
    generarNavbar(bodyy);//1
    generarNavbarHeader(bodyy)//2 
    generarCheckout(bodyy);//3      
    generarDivFooter(bodyy);//4    
}

(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
  /*   $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    }); */
    
})(jQuery);