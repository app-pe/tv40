var articulos = [
    { nombre: "Bicicleta",costo:1500 },
    { nombre: "Tele HD",costo:4500 },
    { nombre: "Refrigeradora",costo:5500 },
    { nombre: "Audifonos",costo:200 },
    { nombre: "Laptop",costo:3500 },
    { nombre: "Lavadora",costo:3200 },
    { nombre: "Ropero",costo:1250 },
    { nombre: "Libro",costo:100 }
];

//metodo filter: va generar un nuevo array y no modifica al anterior
var articulosFiltrados = articulos.filter(function(articulo){    
    return articulo.costo <= 400
});
//metodo map: mapea ciertos articulos, se crea un nuevo array y no modifica al anterior
//como parametro pones el articulo que quieres mapear
var nombreArticulos = articulos.map(function(articulo){
    return articulo.nombre
});
//metodo find: encuentra algo dentro del array, genera un nuevo array con el valor que le estoy pasando como parametro
var encuentraArticulo = articulos.find(function(articulo){
    return articulo.nombre === "Laptop"
});
//metodo forEach: no genera un nuevo array, hace el filtrado sin modificarlo y retorma valores
//mando a llamar el arrya
//para hacer filtros para un ecomerce como ejemplo
articulos.forEach(function(articulo){
    
    
   
    //console.log(articulo.nombre);
});
//metoo some: crea un nuevo array y no modifica el anterior, hace una validacion logica y retorna solo true o false
var articuloHogar = articulos.some(function(articulo){
    return articulo.costo > 2000 
});
console.log(nombreArticulos);