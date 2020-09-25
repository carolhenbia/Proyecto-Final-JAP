//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
} //función que divide los números en miles, así aparece el punto


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
                            <button onclick="this.parentNode.querySelector('input[type=number]').stepDown();calcularCantidad();"
                              class="minus" style="outline: none !important"></button>
                            <input class="quantity" min="1" name="quantity" value="1" type="number"  id="inputCantidad" onclick="">
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

                <div class="md-form md-outline mt-0">
                  <label for="direccion">Dirección de envío:</label>
                  <input type="text" id="direccion" placeholder="Ingrese su dirección: Calle, número, esquina" class="form-control" 
                  style="margin-bottom:1em !important;" required>            
                </div>

                <div class="md-form md-outline mt-0">
                  <label for="pais">País de envío:</label>
                  <input type="text" id="pais" placeholder="Ingrese su país: Ciudad, País" class="form-control" 
                  style="margin-bottom:1.2em !important;" required>            
                </div>

                <div class="form-check">
                  <input onclick="calcularMetodoEnvio();" class="form-check-input" type="radio" name="metEnvio" id="metEnvio1" value="premium" checked>
                  <label class="form-check-label" for="metEnvio1">
                    Premium: 2 a 5 días
                  </label>
                </div>
                <div class="form-check">
                  <input onclick="calcularMetodoEnvio();" class="form-check-input" type="radio" name="metEnvio" id="metEnvio2" value="express">
                  <label class="form-check-label" for="metEnvio2">
                    Express: 5 a 8 días
                  </label>
                </div>
                <div class="form-check">
                  <input onclick="calcularMetodoEnvio();" class="form-check-input" type="radio" name="metEnvio" id="metEnvio3" value="standard">
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
                  <input class="form-check-input" type="radio" name="metPago" id="metPago1" value="tarjeta" checked data-toggle="modal" data-target="#modalTarjeta">
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
                  <input class="form-check-input" type="radio" name="metPago" id="metPago2" value="transferencia" data-toggle="modal" data-target="#modalTransferencia">
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

            <!-- Modal Tarjeta de Crédito -->
            <div class="modal fade" id="modalTarjeta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" style="max-width: 40em">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ingrese los siguientes datos:</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  
                  <section>
                  
                    <!--Grid row-->
                    <div class="row">
                  
                      <!--Grid column-->
                      <div class="col-lg-12">
                  
                        <!-- Card -->
                        <div class="card wish-list pb-1">
                          <div class="card-body">
                  
                            <!-- Tarjeta -->
                            <div class="d-flex flex-wrap">
                              <label>Seleccione una tarjeta</label>
                              <div class="select-outline position-relative w-100">
                                <select class="mdb-select md-form md-outline dropdown-item" style="border: 1px solid #ced4da;
                                border-radius: .25rem; padding: .375rem .75rem; margin-bottom:1em !important;" required>
                                  <option value="" disabled selected>Tarjeta</option>
                                  <option value="Visa">Visa</option>
                                  <option value="American Express">American Express</option>
                                  <option value="Mastercard">Mastercard</option>
                                </select>                                
                              </div>
                            </div>
                  
                            <!-- Número de la tarjeta -->
                            <div class="md-form md-outline mt-0">
                              <label for="noTarjeta">Número de la tarjeta</label>
                              <input type="text" id="noTarjeta" placeholder="Ingresar los 16 dígitos de la tarjeta" class="form-control" 
                              maxlength="16" style="margin-bottom:1em !important;" required>
                            </div>

                            <!-- Fecha de vencimiento -->
                            <div class="d-flex flex-wrap">
                              <label>Fecha de vencimiento</label>
                              <div class="select-outline position-relative w-100">
                                <select class="mdb-select md-form md-outline dropdown-item" style="border: 1px solid #ced4da;
                                border-radius: .25rem; padding: .375rem .75rem; margin-bottom:1em !important;" required>
                                  <option value="" disabled selected>Mes</option>
                                  <option value="Enero">Enero</option>
                                  <option value="Febrero">Febrero</option>
                                  <option value="Marzo">Marzo</option>
                                  <option value="Abril">Abril</option>
                                  <option value="Mayo">Mayo</option>
                                  <option value="Junio">Junio</option>
                                  <option value="Julio">Julio</option>
                                  <option value="Agosto">Agosto</option>
                                  <option value="Setiembre">Setiembre</option>
                                  <option value="Octubre">Octubre</option>
                                  <option value="Noviembre">Noviembre</option>
                                  <option value="Diciembre">Diciembre</option>
                                </select>
                                <select class="mdb-select md-form md-outline dropdown-item" style="border: 1px solid #ced4da;
                                border-radius: .25rem; padding: .375rem .75rem; margin-bottom:1em !important;" required>
                                  <option value="" disabled selected>Año</option>
                                  <option value="2020">2020</option>
                                  <option value="2021">2021</option>
                                  <option value="2022">2022</option>
                                  <option value="2023">2023</option>
                                  <option value="2024">2024</option>
                                  <option value="2025">2025</option>
                                  <option value="2026">2026</option>
                                  <option value="2027">2027</option>
                                  <option value="2028">2028</option>
                                  <option value="2029">2029</option>
                                  <option value="2030">2030</option>
                                </select>                                                               
                              </div>
                            </div>
              
                            <!-- Pass -->
                            <div class="md-form md-outline mt-0">
                              <label for="pass">Código de seguridad</label>
                              <input type="text" id="pass" class="form-control" maxlength="3" 
                              style="margin-bottom:1em !important;" required max="5"
                              placeholder="3 dígitos al inverso de la tarjeta">                              
                            </div>

                            <!-- Titular de la tarjeta -->
                            <div class="md-form md-outline mt-0">
                              <label for="titular">Titular de la Tarjeta:</label>
                              <input type="text" id="titular" class="form-control" 
                              style="margin-bottom:1em !important;" required
                              placeholder="Nombres y apellidos que se muestran en la tarjeta">                              
                            </div>
                  
                            <!-- Email -->
                            <div class="md-form md-outline mt-0">
                              <label for="email">Email:</label>
                              <input type="email" id="email" class="form-control" style="margin-bottom:1em !important;">                              
                            </div>

                          </div>
                        </div>
                        <!-- Card -->
                  
                      </div>
                      <!--Grid column-->     
                    </div>
                    <!--Grid row-->
                  
                  </section>      
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary btn-comprar" id="botonTarjeta">Guardar cambios</button>
                  </div>
                </div>
              </div>
            </div>
    
            <!-- Modal Transferencia Bancaria -->
            <div class="modal fade" id="modalTransferencia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" style="max-width: 40em">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ingrese los siguientes datos:</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  
                  <section>
                  
                    <!--Grid row-->
                    <div class="row">
                  
                      <!--Grid column-->
                      <div class="col-lg-12">
                  
                        <!-- Card -->
                        <div class="card wish-list pb-1">
                          <div class="card-body">
                              
                            <!-- Grid row -->
                            <div class="row">
                  
                              <!-- Grid column -->
                              <div class="col-lg-6">
                  
                                <!-- Nombre -->
                                <div class="md-form md-outline mb-0 mb-lg-4">
                                  <label for="nombre">Nombre</label>
                                  <input type="text" id="nombre" class="form-control mb-0 mb-lg-2"
                                   placeholder="Ingrese su primer nombre" required>                                  
                                </div>                  
                              </div>
                              <!-- Grid column -->
                  
                              <!-- Grid column -->
                              <div class="col-lg-6">
                  
                                <!-- Apellido -->
                                <div class="md-form md-outline">
                                  <label for="apellido">Apellido</label>
                                  <input type="text" id="apellido" class="form-control" 
                                  placeholder="Ingrese su primer apellido" required>                                  
                                </div>
                              </div>
                              <!-- Grid column -->
                  
                            </div>
                            <!-- Grid row -->
                  
                            <!-- Banco -->
                            <div class="d-flex flex-wrap">
                              <label>Seleccione un banco</label>
                              <div class="select-outline position-relative w-100">
                                <select class="mdb-select md-form md-outline dropdown-item" style="border: 1px solid #ced4da;
                                border-radius: .25rem; padding: .375rem .75rem; margin-bottom:1em !important;">
                                  <option value="" disabled selected>Banco</option>
                                  <option value="Brou">Brou</option>
                                  <option value="Itau">Itau</option>
                                  <option value="Santander">Santander</option>
                                </select>                                
                              </div>
                            </div>
                  
                            <!-- Cuenta origen -->
                            <div class="md-form md-outline mt-0">
                              <label for="cuentaOrigen">Cuenta origen</label>
                              <input type="text" id="cuentaOrigen" placeholder="No. Cuenta de Origen" 
                              class="form-control" maxlength="12" style="margin-bottom:1em !important;" required>
                            </div>
                  
                            <!-- Cuenta destino -->
                            <div class="md-form md-outline mt-0">
                              <label for="destino">Destino</label>
                              <input type="text" id="destino" placeholder="Cuenta de eMercado"
                                class="form-control" disabled="true" style="margin-bottom:1em !important;" required>                              
                            </div>
                  
                            <!-- Teléfono -->
                            <div class="md-form md-outline mt-0">
                              <label for="telefono">Teléfono</label>
                              <input type="tel" id="telefono" class="form-control" maxlenght="9" 
                              style="margin-bottom:1em !important;" required=>                              
                            </div>
                  
                            <!-- Email -->
                            <div class="md-form md-outline mt-0">
                              <label for="email">Email:</label>
                              <input type="email" id="email" class="form-control" style="margin-bottom:1em !important;">                              
                            </div>
                  
                          </div>
                        </div>
                        <!-- Card -->
                  
                      </div>
                      <!--Grid column-->     
                    </div>
                    <!--Grid row-->
                  
                  </section>      
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary btn-comprar" id="botonTransferencia">Guardar cambios</button>
                  </div>
                </div>
              </div>
            </div>

            
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
  } else { listadoProdCarrito += `<p>¡El carrito está vacío!</p>` };
  document.getElementById("listadoCompletoCarrito").innerHTML = listadoProdCarrito;
});

function calcularCantidad() {
  var precioUnitario = parseInt(document.getElementById("precioUnitario").innerHTML.replace('.', ''));
  var inputCantidad = document.getElementById("inputCantidad").value;
  var precioNuevo = precioUnitario * inputCantidad;
  document.getElementById("precioUnitario").innerHTML = precioNuevo;
}

function calcularMetodoEnvio() {
  var metEnvio = document.getElementsByName('metEnvio');
  var subtotal = parseInt(document.getElementById("subtotal").innerHTML);

  for (var i = 0, length = metEnvio.length; i < length; i++) {
    if (metEnvio[i].checked) {
      var metEnvioElegido = metEnvio[i].value;
      if (metEnvioElegido == "premium") {
        document.getElementById("envio").innerHTML = subtotal * 1.15;
      }
      if (metEnvioElegido == "express") {
        document.getElementById("envio").innerHTML = subtotal * 1.07;
      }
      if (metEnvioElegido == "standard") {
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

