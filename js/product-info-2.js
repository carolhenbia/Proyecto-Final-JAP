//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

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
            }
            llamarDataProductos();
            document.getElementById("tituloProducto").innerHTML = productName;
            document.getElementById("descripcionProducto").innerHTML = productDesc;
            document.getElementById("precioProducto").innerHTML = productCurr + " " + formatNumber(productCost);
            document.getElementById("categoriaProducto").innerHTML = productCategory;
            document.getElementById("subtituloPosicionamiento").innerHTML = `${productName} 2020 precio Uruguay`
            document.getElementById("cantidadVendidos").innerHTML = productSold;
            document.getElementById("imagen1Producto").src = productImages[0];
            document.getElementById("imagen2Producto").src = productImages[1];
            document.getElementById("imagen3Producto").src = productImages[2];
            document.getElementById("imagen4Producto").src = productImages[3];
            document.getElementById("imagen5Producto").src = productImages[4];
            /* document.getElementById("tituloComentarios").innerHTML = `Opiniones del auto ${productName}`; */
        }
    });
});





/* var emailComentario = document.getElementById("nombreEmail"); */
/* var fechaActual = new Date();
document.write(fechaActual.getDate() + "/" + (fechaActual.getMonth() +1) + "/" + fechaActual.getFullYear()); */


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            productComments = result.data;
            console.log(result.data)
            let htmlContentToAppend = ""

            for (let i = 0; i < productComments.length; i++) {
                let comentario = productComments[i]; //revisa el array de resultados, producto por producto
                console.log(comentario.user)

                htmlContentToAppend += `
                        <div class="media mt-3 mb-4">
                  <img class="d-flex mr-3 z-depth-1" src="/img/thumbComentario.png" width="62">
                  <div class="media-body">
                    <div class="d-sm-flex justify-content-between">
                      <p class="mt-1 mb-2">
                        <strong> @${comentario.user} </strong>
                        <span>– </span><span>${comentario.dateTime}</span>
                      </p>
                      <ul class="rating mb-sm-0">
                          <i class="fas fa-star fa-sm text-primary"></i>
                          <i class="fas fa-star fa-sm text-primary"></i>
                          <i class="fas fa-star fa-sm text-primary"></i>
                          <i class="far fa-star fa-sm text-primary"></i>
                          <i class="far fa-star fa-sm text-primary"></i>
                      </ul>
                    </div>
                    <p class="mb-0">${comentario.description}</p>
                  </div>
                </div>
                        `
                document.getElementById("reviews").innerHTML = htmlContentToAppend;
            }

            let formularioDeComentario = ""
            formularioDeComentario = `
            
              <h5 class="mt-4">Agrega tu opinión</h5>
              <div class="my-3">
                      <i class="fas fa-star fa-sm text-primary"></i>
                      <i class="fas fa-star fa-sm text-primary"></i>
                      <i class="fas fa-star fa-sm text-primary"></i>
                      <i class="fas fa-star fa-sm text-primary"></i>
                      <i class="far fa-star fa-sm text-primary"></i>
              </div>
              <div>
                <!-- Your review -->
                <div class="md-form md-outline">
                  <textarea id="comentarioNuevo" class="md-textarea form-control pr-6" rows="4" placeholder="Tu opinión o comentario" maxlength="200"></textarea>
                  <label for="form76"></label>
                </div>
                <!-- Name -->
                <div class="md-form md-outline">
                  <input type="text" id="comentarioNombre" class="form-control pr-6" placeholder="Nombre" maxlength="50">
                  <label for="form75"></label>
                </div>
                <!-- Email -->
                <div class="md-form md-outline">
                  <input type="email" id="comentarioEmail" class="form-control pr-6" placeholder="Email">
                  <label for="form77"></label>
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

            function enviarComentario() {
                comentario = crearObjetoComentario()
                productComments.push(comentario);
            }
            
            function crearObjetoComentario() {
                var comentarioNuevo = document.getElementById("comentarioNuevo");
                var nombreComentario = document.getElementById("comentarioNombre");
                var objComentarioNuevo = {
                    score: null,
                    description: comentarioNuevo.value,
                    user: nombreComentario.value,
                    dateTime: null
                }
                return objComentarioNuevo; 
            } 
        }
        
    });
});


/* function cambiarFoto(){
    foto1.innerHTML = foto2;
}


/* document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("tituloProductInfo").innerHTML = productName;
});
 */


/* var productName = productInfo['name']
console.log(productName)
document.getElementsByTagName('h1').innerHTML = productName; */




$(document).ready(function () {
    // MDB Lightbox Init
    $(function () {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });
});


document.addEventListener("DOMContentLoaded", function (e) {
    var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
    if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
        window.location.href = "login.html" //lo manda al login 
    } else { document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`; }
});