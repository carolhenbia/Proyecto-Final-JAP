const buscador = document.getElementById("product-search");
const button = document.getElementById("search-button"); 
const resultado = document.getElementById("resultado");

var productos = []

getJSONData(PRODUCTS_URL).then(function(result){ 
    console.log(result)
    productos = result.data
}) 

/*con el getJsonData busca el json. El then significa que cuando traiga el json haga lo siguiente
después de eso hace la función result, que trae el resultado
en el console log hay que fijarse qué es ese resultado
y despues pedirle que te traiga lo que quieras de ese resultado


/* 
console.log(productos) */

const filtrar = ()=>{
    /* console.log(buscador.value); */
    resultado.innerHTML = "";

    const texto = buscador.value.toLowerCase();
    var results = [] //crea un array para resultados, ademas del de productos
    for(let producto of productos){
        let nombre = producto.name.toLowerCase();
        if(nombre.indexOf(texto) !== -1){ //retorna -1 si el elemento no esta en el array
            results.push(producto) //si ve que esta, lo mete al array de resultados
        } else {
            let description = producto.description.toLowerCase();
            if(description.indexOf(texto) !== -1){ //retorna -1 si el elemento no esta en el array
                results.push(producto)
            }
        }
        
    } let htmlContentToAppend = "";
    for (let i = 0; i < results.length; i++) {
        let producto = results[i]; //revisa el array de resultados, producto por producto

        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name + `</h4>
                            <small class="text-muted">` + `<b>`+ formatNumber(producto.cost) + ` ` + producto.currency + `</b>`+ `</small>
                        </div>
                        <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">` + producto.description + `</p>
                        <small class="text-muted" style:"text-align:right;">` + formatNumber(producto.soldCount) + ` vendidos` + `</small>
                        </div> 
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

    /* resultadosBuscador(); */
    /* for(let producto of results){
        resultado.innerHTML += `<li>${producto.name}</li>`
    } */
    
    /* if(resultado.innerHTML === "") {
        resultado.innerHTML += `<li>Producto no encontrado.</li>` */




button.addEventListener('click', filtrar)
buscador.addEventListener('keyup', filtrar)
filtrar(); //para que ya aparezcan los productos


