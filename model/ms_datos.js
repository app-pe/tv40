var datos =
{
    "menu":[
        {"id_menu":"m1","nom_menu":"Inicio","nom_url":"index.html"},
        {"id_menu":"m2","nom_menu":"Catálogo","nom_url":"shop.html"},
        {"id_menu":"m3","nom_menu":"Caterogía","nom_url":"category.html"},
        {"id_menu":"m4","nom_menu":"Detalle","nom_url":"detail.html"},
        {"id_menu":"m5","nom_menu":"Carrito","nom_url":"cart.html"},
        {"id_menu":"m6","nom_menu":"Checkout","nom_url":"checkout.html"},
        {"id_menu":"m7","nom_menu":"Contacto","nom_url":"contact.html"}                 
    ]
};

class Products {
    constructor(url) {
        this.url = url;
    }
    getSingleProduct() {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("GET", this.url, true);
            request.responseType = "json";
            request.onreadystatechange = function() {
                if (request.status === 200) {
                    let ansWear = request.response;
                    if (ansWear) {
                        resolve(ansWear);
                    }
                } else {
                    reject();
                }
            }
            request.send();
        });
    }
}
//console.log("data---");
const data = await new Products("../model/bd-app.json").getSingleProduct()
//console.log(data);

export {datos,data}