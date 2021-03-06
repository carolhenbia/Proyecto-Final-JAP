//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
} //función que divide los números en miles, así aparece el punto

var contenidoCarrito = [];
var metEnvio = 0;
var cantidadProdCarrito = 0;

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_PRODUCTS).then(function (result){
    if (result.status === "ok"){
      contenidoCarrito = result.data.articles;
      mostrarCarrito(contenidoCarrito);
      mostrarTotal(contenidoCarrito);
      calcularSubtotal();
      localStorage.setItem("contenidoCarrito", JSON.stringify(contenidoCarrito));
      console.log(localStorage)
    }  
  });
}); //funcion que llama los datos del json y ejecuta las funciones iniciales



function mostrarCarrito(contenidoCarrito){
  let listadoProdCarrito = ``;

  for (let i = 0; i < contenidoCarrito.length; i++) {
    let productoCarrito = contenidoCarrito[i];
    cantidadProdCarrito = contenidoCarrito.length;

    if(productoCarrito.currency == "UYU") {
      productoCarrito.unitCost = (productoCarrito.unitCost / 40).toFixed(0);
      productoCarrito.currency = "USD";
    } //pasa los pesos a dólares

    document.getElementById("badge").innerHTML = cantidadProdCarrito;

    listadoProdCarrito += ` 
        <!-- Card -->
          <div class="card-body" id="prodCard${i}">
            <div class="row mb-4">
              <div class="col-md-5 col-lg-3 col-xl-3">
                <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                  <img class="img-fluid w-100 imagenCarrito" src="${productoCarrito.src}">
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
                          class="plus" style="outline: none !important"></button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <a href="#!" onclick="removerProd(this, contenidoCarrito)" data-value="${i}"  type="button"  class="card-link-secondary small text-uppercase mr-3" style="color:#dd2f56">
                      <i class="fas fa-trash-alt mr-1"></i>Remover Producto</a>
                    </div>
                    <p class="mb-0"><span><strong>${productoCarrito.currency}</strong><strong id="precioUnitario${i}"> ${formatNumber(productoCarrito.unitCost)}</strong></span></p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-4">
          </div>
        <!-- Card -->`
} document.getElementById("listadoCompletoCarrito").innerHTML = listadoProdCarrito;
} //recorre el array y va mostrando los productos en el html


function removerProd(producto, contenidoCarrito){
  var productoABorrar = producto.dataset.value; //pasa el indice del producto que se clickeo "remover"
  contenidoCarrito.splice(productoABorrar,1); //elimina el producto del array de productos
  mostrarCarrito(contenidoCarrito); // ejecuta las funciones correspondientes
  mostrarTotal(contenidoCarrito);
  calcularSubtotal();
} 

function mostrarTotal(contenidoCarrito) {
  var listadoPrecios = "";

  for (let i = 0; i < contenidoCarrito.length; i++) {
    let productoCarrito = contenidoCarrito[i];
    cantidadProdCarrito = contenidoCarrito.length;

  listadoPrecios = `
      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
      ${productoCarrito.name} 
      <span id="costoFinal${[i]}" class="sumaSubtotal">${formatNumber(productoCarrito.unitCost)}</span>
      </li>
    `
  document.getElementById("productoUnitario").innerHTML += listadoPrecios; 
  }
} //pasa a una tabla los datos de precio y nombre 

function calcularSubtotal(){
  var prods = document.querySelectorAll("#productoUnitario li span");
  var subtotal = 0;
  for (let i = 0; i < prods.length; i++) {
    const prod = prods[i].innerHTML.replace(".", "");
    subtotal += parseInt(prod);
  }
  document.getElementById("subtotal").innerHTML = formatNumber(subtotal);
} //agarra todos los li dentro de la tabla de precios y los suma para calcular el subtotal

function calcularCantidad(index) {
  var precioUnitario = parseInt(document.getElementById(`precioUnitario${index}`).innerHTML.replace('.', ''));
  //obtiene el precio del producto clickeado
  var inputCantidad = document.getElementById(`inputCantidad${index}`).value; 
  //obtiene el valor dentro del input de subir y bajar cantidad
  var precioNuevo = precioUnitario * inputCantidad; //multiplica los valores
  document.getElementById(`costoFinal${index}`).innerHTML = formatNumber(precioNuevo);
  calcularSubtotal(); //ejecuta las funciones correspondientes
  calcularMetodoEnvio();
  total();
} 

function total(){
  var subtotal = parseInt(document.getElementById("subtotal").innerHTML.replace('.', ''));
  var metEnvio = parseInt(document.getElementById("envio").innerHTML.replace('.', ''));

  if (metEnvio != NaN){
    document.getElementById("total").innerHTML = formatNumber(subtotal + metEnvio); 
  }
} //suma el metodo de envio más el subtotal
  
function calcularMetodoEnvio() {
  var metEnvio = document.getElementsByName('metEnvio'); 
  var subtotal = parseInt(document.getElementById("subtotal").innerHTML.replace('.', ''));

  for (var i = 0, length = metEnvio.length; i < length; i++) {
    if (metEnvio[i].checked) {
      var metEnvioElegido = metEnvio[i].value; //manda el valor segun el indice de los metodos de envio
      if (metEnvioElegido == "premium") {
        document.getElementById("envio").innerHTML = formatNumber((subtotal * 0.15).toFixed(0));
      }
      if (metEnvioElegido == "express") {
        document.getElementById("envio").innerHTML = formatNumber((subtotal * 0.07).toFixed(0));
      }
      if (metEnvioElegido == "standard") {
        document.getElementById("envio").innerHTML = formatNumber((subtotal * 0.05).toFixed(0));
      }
    }
  }
  total();
} //recorre el radio de metodos de envio, envia el valor del método elegido, y compara si se asimila el nombre del valor
//según el valor elegido multiplica lo correspondiente

function compraConfirmada(){
  var envio = document.getElementById("envio").innerHTML;
  var direccion = document.getElementById("direccion"); console.log(direccion)
  var pais = document.getElementById("pais");
  if(envio != "" && direccion.value != "" && pais.value != ""){
    var borrar = document.getElementById("carritoCompleto");
    borrar.remove();
    var vacio = document.getElementById("vacio");
    vacio.innerHTML = `<div class="container-fluid mt-100">
    <div class="row">
        <div class="col-md-12">
            
                
                <div class="card-body cart">
                    <div class="col-sm-12 empty-cart-cls text-center"> <img src="./img/carrito.png" width="130" height="130" class="img-fluid mb-4 mr-3">
                        <h3><strong>¡Compra realizada con éxito!</strong></h3>
                        <h4>Gracias por tu compra :)</h4> <a href="/products.html" class="btn btn-primary cart-btn-transform m-3 btn-comprar" data-abc="true">Continuar comprando</a>
                    </div>
                </div>
            
        </div>
    </div>
</div>`
  } else { document.getElementById("faltaMetodo").innerHTML = ('afterend',`<div class="modal fade" id="carritoVacioAlert" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">¡Falta información!</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <b>Asegurate de haber seleccionado un método de envío y un método de pago.</b> Chequea que todos los campos estén completos.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-comprar" data-dismiss="modal">Entendido</button>
      </div>
    </div>
  </div>
</div>`)}
} //chequea que los campos de envio esten seleccionados, si no lo están muestra modal alertando
//si esta completo, muestra un mensaje de compra realizada con éxito



document.addEventListener("DOMContentLoaded", function (e) {
  var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
  if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
    window.location.href = "login.html" //lo manda al login 
  } else { document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`; }
});

