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
        productRelated = result.data.relatedProducts;
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

/* document.getElementById("imagen2Producto").addEventListener("mouseover", function () {
  document.getElementById("imagen1Producto").src = this.src;
}); */

document.querySelector(".imgThumb").addEventListener("mouseover", function () {
  document.getElementById("imagen1Producto").src = this.src;
});

document.querySelector(".imgThumb").addEventListener("mouseout", function () {
  document.getElementById("imagen1Producto").src = productImages[0];
});

/* Podes aplicarle una clase en particular a las imagenes y usar querySellectorAll(".clase")
 */

/* starOVer();{
 document.getElementById("star1").innerHTML = `<i class="fas fa-star" style="color:#e72a79;"></i>`
}  */



document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
    if (result.status === "ok") {
      productComments = result.data;
      let htmlContentToAppend = ""

      for (let i = 0; i < productComments.length; i++) {
        let comentario = productComments[i];
        
        var estrellas = "";

        for (n = 0; n < comentario.score; n++) {
          estrellas += `<i class="fas fa-star fa-sm" style="color:#e72a79;"></i>`
        }

        var estrellasVacias = Math.abs(comentario.score - 5);

        for (n = 0; n < estrellasVacias; n++) {
          estrellas += `<i class="far fa-star fa-sm" style="color:#e72a79;"></i>`
        }

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
                      ${estrellas}
                      </ul>
                    </div>
                    <p class="mb-0">${comentario.description}</p>
                  </div>
                </div>
                        `
        document.getElementById("reviews").innerHTML = htmlContentToAppend;
      }


     /*  <div class="my-rating-4" data-rating="2.5"></div>
                      <i class="far fa-star star" id="score1" style="color:#e72a79;"></i>
                      <i class="far fa-star star" id="score2" style="color:#e72a79;"></i>
                      <i class="far fa-star star" id="score3" style="color:#e72a79;"></i>
                      <i class="far fa-star star" id="score4" style="color:#e72a79;"></i>
                      <i class="far fa-star star" id="score5" style="color:#e72a79;"></i>
              </div> */        
     
      let formularioDeComentario = ""
      formularioDeComentario = `
            
              <h5 class="mt-4">Agrega tu opinión</h5>
              <div class="my-3">
              <div>
              <div class="rating-box">
              <div class="ratings">
                <span class="fa fa-star-o" title="1"></span>
                <span class="fa fa-star-o" title="2"></span>
                <span class="fa fa-star-o" title="3"></span>
                <span class="fa fa-star-o" title="4"></span>
                <span class="fa fa-star-o" title="5"></span>
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

      const estrellasRating=document.querySelector(".ratings").children;
      const valorEstrella=document.querySelector("#rating-value");
      let index;
      

      for (let i = 0; i < estrellasRating.length; i++) {
        estrellasRating[i].addEventListener("mouseover",function(){
          //console.log(i)
          for (let j = 0; j < estrellasRating.length; j++) {
            estrellasRating[j].classList.remove("fa-star")
            estrellasRating[j].classList.add("fa-star-o")
          }
          for(let j = 0; j <=i; j++){
            estrellasRating[j].classList.remove("fa-star-o")
            estrellasRating[j].classList.add("fa-star")
          } 
        })
        estrellasRating[i].addEventListener("click",function(){
          valorEstrella.value=i+1;
          index=i;
        })
        estrellasRating[i].addEventListener("mouseout",function(){
          //console.log(i)
          for (let j = 0; j < estrellasRating.length; j++) {
            estrellasRating[j].classList.remove("fa-star")
            estrellasRating[j].classList.add("fa-star-o")
          }
          for(let j = 0; j<=index; j++){
            estrellasRating[j].classList.remove("fa-star-o")
            estrellasRating[j].classList.add("fa-star")
          } 
        })
      }

      

     /* 
      $(document).ready(function(){
        $(".my-rating-4").starRating({
          totalStars: 5,
          starShape: 'rounded',
          starSize: 40,
          emptyColor: 'lightgray',
          hoverColor: 'salmon',
          activeColor: 'crimson',
          useGradient: false
        });
      });

      function colorearEstrella() {
        $('#score1').mouseover(function () {
          $('.star').removeClass('far fa-star');
          $('.star').addClass('fas fa-star');
        })
      }


      function vaciarEstrella() {
        $('.star').mouseleave(function () {
          $('.star').removeClass('fas fa-star');
          $('.star').addClass('far fa-star');
        })
      }
 */
    /*   colorearEstrella();
      vaciarEstrella();
      colorearEstrella2();
      vaciarEstrella(); */




    }
  });
});

function enviarComentario() {
  var comentarioNew = crearObjetoComentario();
  productComments.push(comentarioNew);
  var comentariosActuales = document.getElementById("reviews")
  ;
  comentariosActuales.insertAdjacentHTML('afterend', `
    <div class="media mt-3 mb-4">
<img class="d-flex mr-3 z-depth-1" src="/img/thumbComentario.png" width="62">
<div class="media-body">
<div class="d-sm-flex justify-content-between">
  <p class="mt-1 mb-2">
    <strong> @${comentarioNew.user} </strong>
    <span>– </span><span>${comentarioNew.dateTime}</span>
  </p>
  <ul class="rating mb-sm-0"> 
      <i class="fas fa-star fa-sm" style="color:#e72a79;"></i>
      <i class="fas fa-star fa-sm" style="color:#e72a79;"></i>
      <i class="fas fa-star fa-sm" style="color:#e72a79;"></i>
      <i class="far fa-star fa-sm" style="color:#e72a79;"></i>
      <i class="far fa-star fa-sm" style="color:#e72a79;"></i>
  </ul>
</div>
<p class="mb-0">${comentarioNew.description}</p>
</div>
</div>
    `)

  document.getElementById("comentarioNuevo").value = "";
  document.getElementById("comentarioNombre").value = "";
  document.getElementById("nombreEmail").value = "";
}


var nuevaFecha = new Date();
var d = nuevaFecha.getDate();
var dia = (d < 10) ? '0' + d : d;
var m = nuevaFecha.getMonth() + 1;
var mes = (m < 10) ? '0' + m : m;
var fechaHoy = nuevaFecha.getFullYear() + "-" + mes + "-" + dia;
/* console.log(fechaHoy); */
var hora = nuevaFecha.getHours() + ":" + nuevaFecha.getMinutes() + ":" + nuevaFecha.getSeconds();




/* document.getElementsByClassName("fa fa-star").addEventListener("click",function(e){
  console.log(e);
  estrellaClickeada = e.target;
  estrellaClickeada.getAttribute("title");
});
 */
function crearObjetoComentario() {
  var comentarioNuevo = document.getElementById("comentarioNuevo");
  var nombreComentario = document.getElementById("comentarioNombre");
  
 /*  document.getElementsByClassName("fa fa-star").addEventListener("click",function(){
    var estrellasHTMLCollection = document.getElementsByClassName("fa fa-star");
    var estrellasSeleccionadas = [].slice.call(estrellasHTMLCollection);
    var scoreNuevo = estrellasSeleccionadas[estrellasSeleccionadas.length - 1].getAttribute("title");
    console.log(scoreNuevo)
  }); */
  
  var objComentarioNuevo = {
    score: null, 
    description: comentarioNuevo.value,
    user: nombreComentario.value,
    dateTime: fechaHoy + " " + hora
  }
  return objComentarioNuevo;
}

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
        /* console.log(productoRelacionado) */

        productosRelacionadosHTML += `
          <div class="col-md-6 col-lg-3 mb-5">
  
          <div class="">
    
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