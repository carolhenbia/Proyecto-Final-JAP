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

                <h5 class="mb-4"><span>No. de productos: ${cantidadProdCarrito}</span></h5>

                <div class="row mb-4">
                  <div class="col-md-5 col-lg-3 col-xl-3">
                    <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                      <img class="img-fluid w-100" src="${productoCarrito.foto}" alt="">
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
                              class="minus"></button>
                            <input class="quantity" min="0" name="quantity" value="1" type="number">
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                              class="plus"></button>
                          </div>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <a href="#!" type="button" class="card-link-secondary small text-uppercase mr-3"><i
                              class="fas fa-trash-alt mr-1"></i>Remover Producto </a>
                        </div>
                        <p class="mb-0"><span><strong>${productoCarrito.precio}</strong></span></p>
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

                <h5 class="mb-4">Fecha de entrega esperada:</h5>

                <p class="mb-0">Viernes 20</p>
              </div>
            </div>
            <!-- Card -->

            <!-- Card -->
            <div class="card mb-3">
              <div class="card-body">

                <h5 class="mb-4">Aceptamos:</h5>

                <img class="mr-2" width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa">
                <img class="mr-2" width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express">
                <img class="mr-2" width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard">
                <img class="mr-2" width="45px"
                  src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                  alt="PayPal acceptance mark">
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
                    <span>${(productoCarrito.precio)}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Subtotal
                    <span>$25.98</span>
                  </li>
                  <hr>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    Envío
                    <span>1000</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Costo TOTAL</strong>
                        <p class="mb-0">(con IVA)</p>
                    </div>
                    <span><strong>$1000</strong></span>
                  </li>
                </ul>

                <button type="button" class="btn btn-primary btn-block waves-effect waves-light">Comprar</button>

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
    }

    document.getElementById("listadoCompletoCarrito").innerHTML = listadoProdCarrito;

});

/*  var contenido= JSON.parse(localStorage.getItem("lista"));
 var lista="";
 var cantidad=0;
 if (contenido!=null && contenido.length>0){
     cantidad = contenido.length;
 contenido.forEach(producto => {
     lista+= "<li>" + producto.nombre + " -- $ " + producto.edad +"</li>"; 
 });
 }else {
     lista+="<div class='alert alert-warning'> El carrito está vacío </div>";

 }
 document.getElementById('carrito').innerHTML=lista;
 document.getElementById('cont').innerHTML=cantidad; */





document.addEventListener("DOMContentLoaded", function (e) {
    var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
    if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
        window.location.href = "login.html" //lo manda al login 
    } else { document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`; }
});

