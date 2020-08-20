const buscador = document.getElementById("product-search");
const button = document.getElementById("search-button"); 
const resultado = document.getElementById("resultado");

const productos = [
    {nombre: "Caro", edad: "23"},
    {nombre: "Oscar", edad: "35"},
    {nombre: "Pepito", edad: "40"},
]



/* 
console.log(productos) */

const filtrar = ()=>{
    /* console.log(buscador.value); */
    resultado.innerHTML = "";

    const texto = buscador.value.toLowerCase();

    for(let producto of productos){
        let nombre = producto.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){ //retorna -1 si el elemento no esta en el array
            resultado.innerHTML += `<li>${producto.nombre}</li>`
        }
    }
    if(resultado.innerHTML === "") {
        resultado.innerHTML += `<li>Producto no encontrado.</li>`
} 
}

button.addEventListener('click', filtrar)
buscador.addEventListener('keyup', filtrar)
filtrar(); //para que ya aparezcan los productos
 

const obtenerProductos = getJSON(PRODUCTS_URL, name);
console.log(obtenerProductos)

/* 
const obtenerProductos = getJSONData(PRODUCTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        var product = resultObj.data;
        }
});

console.log(obtenerProductos) */



/* document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORY_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.productCount;
            productCriteriaHTML.innerHTML = category.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
}); */