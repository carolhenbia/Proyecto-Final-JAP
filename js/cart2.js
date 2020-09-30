//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
} //función que divide los números en miles, así aparece el punto

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_PRODUCTS).then(function (result) {
      if (result.status === "ok") {
        var contenidoCarrito = result.data.articles; 
        var listadoProdCarrito = "";
        var cantidadProdCarrito = 0;
      
        for (let i = 0; i < contenidoCarrito.length; i++) {
        let productoCarrito = contenidoCarrito[i]; 
        cantidadProdCarrito = contenidoCarrito.length;

        if(productoCarrito.currency == "UYU") {
          productoCarrito.unitCost = (productoCarrito.unitCost / 43).toFixed(0);
          productoCarrito.currency = "USD";
        }

        listadoProdCarrito += ` 
        <!-- Card -->
          <div class="card-body">
            <div class="row mb-4">
              <div class="col-md-5 col-lg-3 col-xl-3">
                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                  <img class="img-fluid w-100 imagenCarrito" src="${productoCarrito.src}" alt="">
                  <a href="#!"></a>
                </div>
              </div>
              <div class="col-md-7 col-lg-9 col-xl-9">
                <div>
                  <div class="d-flex justify-content-between">
                    <div>
                      <h5 class="nombreProd">${productoCarrito.name}</h5>
                      <p class="mb-3 text-muted text-uppercase small">AUTOS</p>
                    </div>
                    <div>
                      <div class="def-number-input number-input safari_only mb-0 w-100">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();calcularCantidad();"
                          class="minus" style="outline: none !important"></button>
                        <input class="quantity" min="1" name="quantity" value="${productoCarrito.count}" type="number"  id="inputCantidad${i}" onclick="">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp();calcularCantidad();"
                          class="plus" onclick="calcularCantidad();" style="outline: none !important"></button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3" style="color:#dd2f56"><i
                          class="fas fa-trash-alt mr-1"></i>Remover Producto </a>
                    </div>
                    <p class="mb-0"><span><strong>${productoCarrito.currency}</strong><strong id="precioUnitario"> ${formatNumber(productoCarrito.unitCost)}</strong></span></p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-4">
          </div>
        <!-- Card -->`

      document.getElementById("listadoCompletoCarrito").innerHTML = listadoProdCarrito;
      }
    }
  }); 
});

var productoUnitario = document.getElementById("productoUnitario").innerHTML
let elements = document.getElementsByClassName("nombreProd")[0].outerHTML; 
let listadoElements = Array.from(elements);
console.log(elements)




function calcularCantidad() {
  var precioUnitario = parseInt(document.getElementById("precioUnitario").innerHTML.replace('.', ''));
  var inputCantidad = document.getElementById("inputCantidad").value;
  var precioNuevo = precioUnitario * inputCantidad;
  document.getElementById("precioPorUnidad").innerHTML = formatNumber(precioNuevo);
}


document.addEventListener("DOMContentLoaded", function subtotal (e) {
  var precioUnitario = parseInt(document.getElementById("precioUnitario").innerHTML.replace('.', ''));
  document.getElementById("subtotal").innerHTML = formatNumber(precioUnitario); 
});

function total(){
  var subtotal = parseInt(document.getElementById("subtotal").innerHTML.replace('.', ''));
  var metEnvio = parseInt(document.getElementById("envio").innerHTML.replace('.', '')); console.log(metEnvio)

  if (metEnvio != NaN){
    document.getElementById("total").innerHTML = formatNumber(subtotal + metEnvio); 
  }
} 
  

function calcularMetodoEnvio() {
  var metEnvio = document.getElementsByName('metEnvio');
  var subtotal = parseInt(document.getElementById("subtotal").innerHTML.replace('.', ''));

  for (var i = 0, length = metEnvio.length; i < length; i++) {
    if (metEnvio[i].checked) {
      var metEnvioElegido = metEnvio[i].value;
      if (metEnvioElegido == "premium") {
        document.getElementById("envio").innerHTML = formatNumber((subtotal * 1.15).toFixed(0));
      }
      if (metEnvioElegido == "express") {
        document.getElementById("envio").innerHTML = formatNumber((subtotal * 1.07).toFixed(0));
      }
      if (metEnvioElegido == "standard") {
        document.getElementById("envio").innerHTML = formatNumber((subtotal * 1.05).toFixed(0));
      }
    }
  }
  total();
} 

document.addEventListener("DOMContentLoaded", function (e) {
  var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
  if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
    window.location.href = "login.html" //lo manda al login 
  } else { document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`; }
});

