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
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepDown(); calcularCantidad(${i});"
                          class="minus" style="outline: none !important"></button>
                        <input class="quantity" min="1" name="quantity" value="${productoCarrito.count}" type="number"  id="inputCantidad${i}">
                        <button onclick="this.parentNode.querySelector('input[type=number]').stepUp(); calcularCantidad(${i});"
                          class="plus"style="outline: none !important"></button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3" style="color:#dd2f56"><i
                          class="fas fa-trash-alt mr-1"></i>Remover Producto </a>
                    </div>
                    <p class="mb-0"><span><strong>${productoCarrito.currency}</strong><strong id="precioUnitario${i}"> ${formatNumber(productoCarrito.unitCost)}</strong></span></p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-4">
          </div>
        <!-- Card -->`

      document.getElementById("listadoCompletoCarrito").innerHTML = listadoProdCarrito;

      var listadoPrecios = "";

      listadoPrecios = `
          <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
          ${productoCarrito.name} 
          <span id="costoFinal${[i]}" class="sumaSubtotal">${formatNumber(productoCarrito.unitCost)}</span>
          </li>
        `
      document.getElementById("productoUnitario").innerHTML += (listadoPrecios); 
      }
    }
  }); 
});


function calcularCantidad(index) {
  var precioUnitario = parseInt(document.getElementById(`precioUnitario${index}`).innerHTML.replace('.', ''));
  var inputCantidad = document.getElementById(`inputCantidad${index}`).value; 
  var precioNuevo = precioUnitario * inputCantidad; console.log(precioNuevo)
  document.getElementById(`costoFinal${index}`).innerHTML = formatNumber(precioNuevo);
}


window.addEventListener("load", function subtotal (e) {
  var subtotal = document.getElementsByClassName("sumaSubtotal"); console.log(subtotal[0])
  //var subtotales = Array.from(subtotal); console.log(subtotales)
  //subtotal += subtotal;
  //document.getElementById("subtotal").innerHTML = formatNumber(subtotal); 
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

