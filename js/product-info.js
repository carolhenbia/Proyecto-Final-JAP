//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
} //función que divide los números en miles, así aparece el punto

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            function llamarDataProductos() {
                productInfo = result.data;
                productName = result.data.name;
                productDesc = result.data.description;
                productCost = result.data.cost;
                productCurr = result.data.currency;
                productSold = result.data.soldCount;
                productCategory = result.data.category;
                productImages = result.data.images;
                productRelated = result.data.relatedProducts;
            }
            llamarDataProductos();
            document.getElementById("tituloProducto").innerHTML = productName;
            document.getElementById("descripcionProducto").innerHTML = productDesc;
            document.getElementById("precioProducto").innerHTML = productCurr + " " + formatNumber(productCost);
            document.getElementById("categoriaProducto").innerHTML = productCategory;
            document.getElementById("subtituloPosicionamiento").innerHTML = `${productName} 2020 precio Uruguay`
            //la línea anterior fue generada como herramienta de posicionamiento
            //Al hacer keyword research descubrí que muchos buscan al comprar un auto el año más el precio en el país
            document.getElementById("cantidadVendidos").innerHTML = productSold;
            document.getElementById("imagen1Producto").src = productImages[0];
            document.getElementById("imagen2Producto").src = productImages[1];
            document.getElementById("imagen3Producto").src = productImages[2];
            document.getElementById("imagen4Producto").src = productImages[3];
            document.getElementById("imagen5Producto").src = productImages[4];
        }
    });
}); //proceso que recupera los datos del json de product info y después lo coloca en formato html

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            productComments = result.data;
            let htmlContentToAppend = ""

            for (let i = 0; i < productComments.length; i++) {
                let comentario = productComments[i]; //recorre uno por uno cada comentario

                var estrellas = "";

                for (n = 0; n < comentario.score; n++) {
                    estrellas += `<i class="fas fa-star fa-sm" style="color:#e72a79;"></i>`
                } //pone una estrella rellena por el número de puntaje de score

                var estrellasVacias = Math.abs(comentario.score - 5);
                //calcula la diferencia entre el score y el total de estrellas (5)
                //lo convierte en número absoluto

                for (n = 0; n < estrellasVacias; n++) {
                    estrellas += `<i class="far fa-star fa-sm" style="color:#e72a79;"></i>`
                } //coloca las estrellas vacias según la diferencia calculada antes

                htmlContentToAppend += `
                        <div class="media mt-3 mb-4">
                  <img class="d-flex mr-3 z-depth-1" src="./img/thumbComentario.png" width="62">
                  <div class="media-body">
                    <div class="d-sm-flex justify-content-between">
                      <p class="mt-1 mb-2">
                        <strong> @${comentario.user} </strong>
                        <span>– </span><span>${comentario.dateTime}</span>
                      </p>
                      <ul class="rating mb-sm-0">
                      ${estrellas}
                      </ul>
                    </div>
                    <p class="mb-0">${comentario.description}</p>
                  </div>
                </div>
                        `
                document.getElementById("reviews").innerHTML = htmlContentToAppend;
            } //esta función toma los comentarios del json y los coloca en formato html

            let formularioDeComentario = ""
            formularioDeComentario = `
            
              <h5 class="mt-4">Agrega tu opinión</h5>
              <div class="my-3">
              <div>
              <div class="rating-box">
              <div class="ratings">
                <span class="fa fa-star-o" onclick="clickStar(this)" data-value="1" ></span> 
                <span class="fa fa-star-o" onclick="clickStar(this)" data-value="2" ></span>
                <span class="fa fa-star-o" onclick="clickStar(this)" data-value="3" ></span>
                <span class="fa fa-star-o" onclick="clickStar(this)" data-value="4" ></span>
                <span class="fa fa-star-o" onclick="clickStar(this)" data-value="5" ></span>
                <span id="rating-value" style="display:none;"></span>
             </div>
             </div>
              <div>
                <div class="md-form md-outline">
                  <textarea id="comentarioNuevo" class="md-textarea form-control pr-6" rows="4" placeholder="Tu opinión o comentario" maxlength="200"></textarea>
                  <label for="form76"></label>
                </div>
                <div class="md-form md-outline">
                  <input type="text" id="comentarioNombre" class="form-control pr-6" placeholder="Nombre" maxlength="50">
                  <label for="form75"></label>
                </div>
                <div class="text-right pb-2">
                  <button type="button" onclick="enviarComentario();" class="btn btn-primary" style="background-color: #e72a79; border-color: #e72a79;">Comentar</button>
                </div>
              </div>
            </div>
          </div>
            </div>
        </div>
            `
            document.getElementById("info").innerHTML = formularioDeComentario;
            //agrega un formulario en formato html

            //función que coloca las estrellas para puntear y colorea o descolorea según el over o click del usuario
            const estrellasRating = document.querySelector(".ratings").children;
            const valorEstrella = document.querySelector("#rating-value");
            let index;


            for (let i = 0; i < estrellasRating.length; i++) {
                estrellasRating[i].addEventListener("mouseover", function () { //va recorriendo cada estrella al hacer over
                    for (let j = 0; j < estrellasRating.length; j++) {
                        estrellasRating[j].classList.remove("fa-star")
                        estrellasRating[j].classList.add("fa-star-o")
                    } //según el over desactiva o activa la clase de la estrella vacía o entera
                    for (let j = 0; j <= i; j++) {
                        estrellasRating[j].classList.remove("fa-star-o")
                        estrellasRating[j].classList.add("fa-star")
                    }
                })
                estrellasRating[i].addEventListener("click", function () {
                    valorEstrella.value = i + 1;
                    index = i;
                })
                estrellasRating[i].addEventListener("mouseout", function () {
                    //console.log(i)
                    for (let j = 0; j < estrellasRating.length; j++) {
                        estrellasRating[j].classList.remove("fa-star")
                        estrellasRating[j].classList.add("fa-star-o")
                    } //lo mismo que el mousover solo que cuando se saca el cursor de la estrella
                    for (let j = 0; j <= index; j++) {
                        estrellasRating[j].classList.remove("fa-star-o")
                        estrellasRating[j].classList.add("fa-star")
                    }
                })
            }
        }
    });
});

//función que obtiene la fecha al momento de hacer el comentario y la formatea de a misma forma que el resto de comentarios
var nuevaFecha = new Date();
var d = nuevaFecha.getDate();
var dia = (d < 10) ? '0' + d : d;
var m = nuevaFecha.getMonth() + 1;
var mes = (m < 10) ? '0' + m : m;
var fechaHoy = nuevaFecha.getFullYear() + "-" + mes + "-" + dia;
var hora = nuevaFecha.getHours() + ":" + nuevaFecha.getMinutes() + ":" + nuevaFecha.getSeconds();

function cleanForm() {
    document.getElementById("comentarioNuevo").value = "";
    document.getElementById("comentarioNombre").value = "";
} //función que borra el contenido que se escribió en el form de comentarios al momento de haber sido enviado el comentario


//función que permite convertir y obtener el valor la estrella clickeada 
var scoreNuevo = "";

function clickStar(starElement) {
    //console.log(starElement.dataset.value)
    scoreNuevo = starElement.dataset.value;
}
//la estrella tiene un onclick="clickStar(this)"
//eso hace que cuando le den click a la estrella agarra ese elemento y lo pasa a la funcion como parametro
//el dataset es una forma de pasar datos. Se escribe "data" - "nombre que querramos"
//para agarrar el dato, se escribe "dataset" y despues el nombre que se haya colocado despues del guion


function crearObjetoComentario() {
    var comentarioNuevo = document.getElementById("comentarioNuevo");
    var nombreComentario = document.getElementById("comentarioNombre");
    //Determina que el comentario y nombre se obtienen de esa casilla de formulario

    //convierte en un nuevo objeto, para el array de comentarios (objetos), los valores del formulario
    var objComentarioNuevo = {
        score: scoreNuevo, //agarra el valor con la función de clickStar
        description: comentarioNuevo.value,
        user: nombreComentario.value,
        dateTime: fechaHoy + " " + hora //agarra la fecha según la función de fecha hecha
    }
    return objComentarioNuevo; //devuelve el objeto nuevo
}

function enviarComentario() {
    var comentarioNew = crearObjetoComentario(); //convierte la respuesta de objeto nuevo en una variable
    productComments.push(comentarioNew); //suma al array de comentarios el nuevo comentario
    var comentariosActuales = document.getElementById("reviews");

    var estrellasNuevas = "";

    for (n = 0; n < comentarioNew.score; n++) {
        estrellasNuevas += `<i class="fas fa-star fa-sm" style="color:#e72a79;"></i>`
    }

    var estrellasVaciasNuevas = Math.abs(comentarioNew.score - 5);

    for (n = 0; n < estrellasVaciasNuevas; n++) {
        estrellasNuevas += `<i class="far fa-star fa-sm" style="color:#e72a79;"></i>`
    }
    comentariosActuales.innerHTML += `
  <div class="media mt-3 mb-4">
<img class="d-flex mr-3 z-depth-1" src="./img/thumbComentario.png" width="62">
<div class="media-body">
<div class="d-sm-flex justify-content-between">
<p class="mt-1 mb-2">
  <strong> @${comentarioNew.user} </strong>
  <span>– </span><span>${comentarioNew.dateTime}</span>
</p>
<ul class="rating mb-sm-0"> 
${estrellasNuevas}
</ul>
</div>
<p class="mb-0">${comentarioNew.description}</p>
</div>
</div>
  `;
    cleanForm();
} //agrega el comentario nuevo de la misma forma que se agregan los comentarios actuales




var productos = [];

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            productos = result.data;
            productRelated = productRelated.map(el => { //igual a escribir function(el){}
                return productos[el]
            })
            //map, recorre el array y le aplica una funcion a cada elemento
            //a la funcion le pasa el parametro de el
            //"el" es cada elemento del array de relacionados
            //con el productos [el], devuelve el objeto en 
            //la posicion que indica los elementos del array de relacionados 

            let productosRelacionadosHTML = ""

            for (let i = 0; i < productRelated.length; i++) {
                let productoRelacionado = productRelated[i];
                //recorre los productos relacionados y los muestra en html

                productosRelacionadosHTML += `
          <div class="col-md-6 col-lg-3 mb-5">
          <div>
            <div class="view zoom overlay z-depth-2 rounded">
              <img class="img-fluid w-100"
                src="${productoRelacionado.imgSrc}" alt="">
            </div>
            <div class="pt-4">
              <h5 id="tituloProductoRelacionado">${productoRelacionado.name}</h5>
              <h6 id="precioProductoRelacionado">${productoRelacionado.currency} ${formatNumber(productoRelacionado.cost)}</h6>
            </div>
          </div>
        </div>
      </div>`
                document.getElementById("productosRelacionados").innerHTML = productosRelacionadosHTML;
            }


        }


    });
});

document.addEventListener("DOMContentLoaded", function (e) {
    var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
    if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
        window.location.href = "login.html" //lo manda al login 
    } else { document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`; }
});