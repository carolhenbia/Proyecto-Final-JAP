//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});




document.addEventListener("DOMContentLoaded", function (e) {
  var contenidoCarrito = JSON.parse(localStorage.getItem("listaCarrito"));

  var listadoProdCarrito = "";
  var cantidadProdCarrito = 0;

  if (contenidoCarrito != null && contenidoCarrito.length > 0) {
    cantidadProdCarrito = contenidoCarrito.length;
    contenidoCarrito.map(productoCarrito => {
      listadoProdCarrito += `  <div class="col-lg-8">

            <!-- Card -->
            <div class="card wish-list mb-3">
              <div class="card-body">

                <h5 class="mb-4"><span>No. de productos: <strong>${cantidadProdCarrito}</strong></span></h5>

                <div class="row mb-4">
                  <div class="col-md-5 col-lg-3 col-xl-3">
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                      <img class="img-fluid w-100" src="${productoCarrito.foto}" alt=""  id="imagenCarrito">
                      <a href="#!"></a>
                    </div>
                  </div>
                  <div class="col-md-7 col-lg-9 col-xl-9">
                    <div>
                      <div class="d-flex justify-content-between">
                        <div>
                          <h5>${productoCarrito.nombre}</h5>
                          <p class="mb-3 text-muted text-uppercase small">${productoCarrito.categoria}</p>
                        </div>
                        <div>
                          <div class="def-number-input number-input safari_only mb-0 w-100">
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                              class="minus" style="outline: none !important"></button onclick="calcularCantidad();">
                            <input class="quantity" min="1" name="quantity" value="1" type="number"  id="inputCantidad" onclick="calcularCantidad();">
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                              class="plus" onclick="calcularCantidad();" style="outline: none !important"></button>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3" style="color:#dd2f56"><i
                              class="fas fa-trash-alt mr-1"></i>Remover Producto </a>
                        </div>
                        <p class="mb-0"><span><strong>${productoCarrito.moneda}</strong><strong> ${productoCarrito.precio}</strong></span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="mb-4">
              </div>
            </div>
            <!-- Card -->

            <!-- Card -->
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="mb-4">Seleccionar método de envío:</h5>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="metEnvio" id="metEnvio1" value="premium" checked>
                  <label class="form-check-label" for="metEnvio1">
                    Premium: 2 a 5 días
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="metEnvio" id="metEnvio2" value="express">
                  <label class="form-check-label" for="metEnvio2">
                    Express: 5 a 8 días
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="metEnvio" id="metEnvio3" value="standard">
                  <label class="form-check-label" for="metEnvio3">
                    Standard: 12 a 15 días
                  </label>
                </div>
              </div>
            </div>
            <!-- Card -->

            <!-- Card -->
            <div class="card mb-3">
              <div class="card-body">

                <h5 class="mb-4">Seleccionar método de pago:</h5>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="metPago" id="metPago1" value="tarjeta" checked>
                  <label class="form-check-label" for="metPago1">
                    Tarjeta de Crédito
                    <img class="mr-2" width="45px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                    alt="Visa" style="margin-left:0.5em";>
                    <img class="mr-2" width="45px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                    alt="American Express">
                    <img class="mr-2" width="45px"
                    src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                    alt="Mastercard">
                  </label>
                </div>
                <div class="form-check" style="margin-top:1em";>
                  <input class="form-check-input" type="radio" name="metPago" id="metPago2" value="transferencia">
                  <label class="form-check-label" for="metPago2">
                    Transferencia Bancaria
                    <img class="mr-2" width="35em"
                    src="./img/brou.png"
                    alt="Brou" style="margin-left:0.5em";>
                    <img class="mr-2" width="35em"
                    src="./img/itau.png"
                    alt="Itau">
                    <img class="mr-2" width="35em"
                    src="./img/santander.png"
                    alt="Santander">
                  </label>
                </div>
              </div>
            </div>
            <!-- Card -->

          </div>
          <!--Grid column-->

          <!--Grid column-->
          <div class="col-lg-4">

            <!-- Card -->
            <div class="card mb-3">
              <div class="card-body">

                <h5 class="mb-3">Precio total</h5>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  ${productoCarrito.nombre}
                    <span id="precioUnitario">${(productoCarrito.precio)}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Subtotal
                    <span id="subtotal">100</span>
                  </li>
                  <hr>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Envío
                    <span id="envio">XXX</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Costo TOTAL</strong>
                        <p class="mb-0">(con IVA)</p>
                    </div>
                    <span><strong>XXX</strong></span>
                  </li>
                </ul>

                <button type="button" class="btn btn-primary btn-comprar btn-block waves-effect waves-light">Comprar</button>

              </div>
            </div>
            <!-- Card -->

            <!-- Card -->
            <div class="card mb-3">
              <div class="card-body">

                <a class="dark-grey-text d-flex justify-content-between" data-toggle="collapse" href="#collapseExample1"
                  aria-expanded="false" aria-controls="collapseExample1">
                  Agregar código de descuento
                  <span><i class="fas fa-chevron-down pt-1"></i></span>
                </a>

                <div class="collapse" id="collapseExample1">
                  <div class="mt-3">
                    <div class="md-form md-outline mb-0">
                      <input type="text" id="discount-code1" class="form-control font-weight-light"
                        placeholder="Ingrese código de descuento" maxlength=5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Card -->

          </div>`;
          
    }); 
  } else {listadoProdCarrito += `<p>¡El carrito está vacío!</p>`};
    document.getElementById("listadoCompletoCarrito").innerHTML = listadoProdCarrito;
}); 

function calcularCantidad() {
  var precioUnitario = document.getElementById("precioUnitario").innerHTML;
  var inputCantidad = document.getElementById("inputCantidad").value;
  var precioNuevo = precioUnitario * inputCantidad;
  precioUnitario.innerHTML = precioNuevo;
}

function calcularMetodoEnvio(){
  var metEnvio = document.getElementsByName('metEnvio');
  var subtotal = document.getElementById("subtotal");

    for (var i = 0, length = metEnvio.length; i < length; i++) {
      if (metEnvio[i].checked) {
        var metEnvioElegido = metEnvio[i].value;

        if(metEnvioElegido == "premium"){
          document.getElementById("envio").innerHTML = subtotal * 1.15;
        } 
        if(metEnvioElegido == "express"){
          document.getElementById("envio").innerHTML = subtotal * 1.07;
        }
        if(metEnvioElegido == "standard"){
          document.getElementById("envio").innerHTML = subtotal * 1.05;
        }
        }
      }
}

 


document.addEventListener("DOMContentLoaded", function (e) {
  var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
  if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
    window.location.href = "login.html" //lo manda al login 
  } else { document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`; }
});

