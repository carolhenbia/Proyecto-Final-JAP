//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});


var datosPersonales = {};


function agregarDatosPersonales(e) {
  e.preventDefault();
  var nombresUsuario = document.getElementById("nombres");
  var apellidosUsuario = document.getElementById("apellidos");
  var edad = document.getElementById("fechaNacimiento");
  var telefonoUsuario = document.getElementById("telefono");
  var emailUsuario = document.getElementById("email");

  if (nombresUsuario.value != "" && apellidosUsuario.value != ""
    && edad.value != "" && telefonoUsuario.value != "" && emailUsuario.value != "") {
    var datosPersonales = {
      nombres: nombresUsuario.value,
      apellidos: apellidosUsuario.value,
      edad: edad.value,
      telefono: telefonoUsuario.value,
      email: emailUsuario.value
    };
    localStorage.setItem("datosPersonales", JSON.stringify(datosPersonales));
    renderProfile();
  }
  var formularioInicial = document.getElementById("formInicial");
  formularioInicial.classList.add("was-validated");
}

document.addEventListener("DOMContentLoaded", function mostrarMiPerfil(e) {
  renderProfile();
});

function clickModificar() {
  renderProfile(true); //manda un true al renderProfile
  var formularioModificar = document.getElementById("modificarForm");
  formularioModificar.classList.add("was-validated");
}


var contenidoCarrito = [];
var productoCarrito = [];

/* document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_PRODUCTS).then(function (result){
    if (result.status === "ok"){
      contenidoCarrito = result.data.articles;   
      for (let i = 0; i < contenidoCarrito.length; i++) {
      let productoCarrito = contenidoCarrito[i];
      cantidadProdCarrito = contenidoCarrito.length;
      
      if(productoCarrito.currency == "UYU") {
        productoCarrito.unitCost = (productoCarrito.unitCost / 40).toFixed(0);
        productoCarrito.currency = "USD";
      }
      }
    }  
  });
}); */



function renderProfile(showForm = false) {
  var contenidoMiPerfil = JSON.parse(localStorage.getItem("datosPersonales"));  
  let miPerfil = "";
  if (contenidoMiPerfil != null && showForm) {//si el contenido no es nulo y el showform es true
    document.getElementById("perfil").innerHTML = ('afterend', `
        <div style="display:contents;" class="modal fade" id="datosPersonalesVacio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
    <form id="modificarForm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">¡Modifica lo que desees!</h5>
      </div>
      <div class="modal-body">
        
          <div class="row">
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4 form-group">
              <label for="nombres">Nombres</label>
              <input type="text" value="${contenidoMiPerfil.nombres}" id="nombres" placeholder="Aquí van tus nombres" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" required>     
              <div class="invalid-feedback">Falta ingresar tu nombre.</div>
              <div class="valid-feedback">¡Genial!</div>          
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="apellidos">Apellidos</label>
              <input type="text" value="${contenidoMiPerfil.apellidos}" id="apellidos" placeholder="Aquí van tus apellidos" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" required>   
              <div class="invalid-feedback">Falta ingresar tu apellido.</div>
              <div class="valid-feedback">¡Genial!</div>              
            </div>
          </div>  
          <div class="col-lg-6">
            <label>Fecha de nacimiento</label>
              <div class="select-outline position-relative w-100">
              <input type="date" id="fechaNacimiento"  value="${contenidoMiPerfil.edad}" class="form-control mb-0 mb-lg-2" required>        
              <div class="invalid-feedback">Falta ingresar tu fecha de nacimiento.</div>
              <div class="valid-feedback">¡Genial!</div> 
              </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label>Teléfono</label>
              <input type="tel" id="telefono" name="telefono" value="${contenidoMiPerfil.telefono}"
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="form-control mb-0 mb-lg-2" required>  
              <div class="invalid-feedback">Falta ingresar tu teléfono.</div>
              <div class="valid-feedback">¡Genial!</div>                    
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Ingresa tu email" class="form-control mb-0 mb-lg-2"
              value="${contenidoMiPerfil.email}" 
              style="margin-bottom:1em !important;" name="email" required>   
              <div class="invalid-feedback">Falta ingresar tu email.</div>
              <div class="valid-feedback">¡Genial!</div>           
            </div>
          </div>  
          <div class="col-lg-6">
            <label for="zip">Tu foto de perfil</label>
            <div class="needsclick dz-clickable" id="file-upload">
              <div class="dz-message needsclick">
                Arrastra tus fotos aquí<br>
              </div>
            </div>
          </div>   
        </div>  
        <div class="modal-footer">
          <button type="submit" id="comprobarModificaciones" class="btn btn-primary btn-comprar" onclick="agregarDatosPersonales(event)">Listo</button>
        </div>
      </form>
      </div>
      </div>` )
  } else if (contenidoMiPerfil === null) { //si no hay nada en el local storage
    document.getElementById("sinPerfil").innerHTML = (`
        <div style="display:contents;" class="modal fade" id="datosPersonalesVacio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
    <form id="formInicial">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">¡Antes de empezar, ingresa tus datos personales!</h5>
      </div>
      <div class="modal-body">
          <div class="row">
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4 form-group">
              <label for="nombres">Nombres</label>
              <input type="text" id="nombres" placeholder="Aquí van tus nombres" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" required> <span id="cheque"></span>       
              <div class="invalid-feedback">Falta ingresar tu nombre.</div>
              <div class="valid-feedback">¡Genial!</div>     
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="apellidos">Apellidos</label>
              <input type="text" id="apellidos" placeholder="Aquí van tus apellidos" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" required>    
              <div class="invalid-feedback">Falta ingresar tu apellido.</div>
              <div class="valid-feedback">¡Genial!</div>            
            </div>
          </div>  
          <div class="col-lg-6">
            <label>Fecha de nacimiento</label>
              <div class="select-outline position-relative w-100">
              <input type="date" id="fechaNacimiento" class="form-control mb-0 mb-lg-2" required>   
              <div class="invalid-feedback">Falta ingresar tu fecha de nacimiento.</div>
              <div class="valid-feedback">¡Genial!</div>       
              </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label>Teléfono</label>
              <input type="tel" id="telefono" name="telefono" placeholder="Formato: 094256365"
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="form-control mb-0 mb-lg-2" required> 
              <div class="invalid-feedback">Falta ingresar tu teléfono.</div>
              <div class="valid-feedback">¡Genial!</div>                   
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Ingresa tu email" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" name="email" required>   
              <div class="invalid-feedback">Falta ingresar tu email.</div>
              <div class="valid-feedback">¡Genial!</div>           
            </div>
          </div>  
          <div class="col-lg-6">
            <label for="zip">Tu foto de perfil</label>
            <div class="needsclick dz-clickable" id="file-upload">
              <div class="dz-message needsclick">
                Arrastra tus fotos aquí<br>
              </div>
            </div>
          </div>   
        </div>  
        <div class="modal-footer">
          <button type="submit" id="comprobarDatos" class="btn btn-primary btn-comprar" onclick="agregarDatosPersonales(event)">Listo</button>
        </div>
      </form>
      </div>
      </div>` )

  } else { //si el local storage esta lleno
    miPerfil = ` <section class="intro-section">
    <div class="container">
      <div class="row">
        <div class="col-md-1 col-lg-2"></div>
        <div class="col-md-10 col-lg-8">
          <div class="intro">
            <div class="profile-img">
              <img src="/img/facebook-icon.png">
            </div>
          <h2>
            <b id="nombreUser">${contenidoMiPerfil.nombres} ${contenidoMiPerfil.apellidos}</b>
          </h2>
          <h4 id="mailUser">${contenidoMiPerfil.email}</h4>
          <ul class="information margin-tb-30">
            <li>
              <b>EDAD: </b><span id="edadUser">${calcularEdad()}</span>
            </li>
            <li>
              <b>TELÉFONO: </b><span id="telUser">${contenidoMiPerfil.telefono}</span>
            </li>
            <li>
              <b>PRODUCTOS COMPRADOS: </b><span id="compradosUser">25</span>
            </li>
          </ul>
          </div>
          <div class="modal-footer">
          <button class="btn btn-primary btn-comprar" onclick="clickModificar()">Modificar</button>
        </div>
        </div>
      </div>
    </div>
    </section> <div class="container"> <div class="row" style="justify-content:center"> <h3 style="margin-top:0.5em; margin-bottom:1em">Mira los productos que compraste:</h3></div>
    <div class="row" id="productosComprados"></div></div>`
    
    document.getElementById("perfil").innerHTML = miPerfil;
    
    var contenidoCarrito = JSON.parse(localStorage.getItem("contenidoCarrito"));
    for (let i = 0; i < contenidoCarrito.length; i++) {
    let productoCarrito = contenidoCarrito[i];
    cantidadProdCarrito = contenidoCarrito.length;

    console.log(contenidoCarrito)
    
    if(productoCarrito.currency == "UYU") {
      productoCarrito.unitCost = (productoCarrito.unitCost / 40).toFixed(0);
      productoCarrito.currency = "USD";
      }
    
    document.getElementById("productosComprados").innerHTML += (`
      <div class="col-sm-4">
      <div class="card mb-4 shadow-sm">
      <img class="bd-placeholder-img card-img-top" width="100%" height="250" 
      src="${productoCarrito.src}"></img>
      <div class="card-body">
        <p class="card-text">${productoCarrito.name}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${productoCarrito.currency} ${productoCarrito.unitCost}</small>
        </div>
      </div>
    </div>
      `)
    } 

    } 
}


{/* <div class="btn-group">
<button type="button" class="btn btn-sm btn-outline-secondary">Volver a comprar</button>
</div> */}

/* function volverAComprar(producto){
  var contenidoCarrito = JSON.parse(localStorage.getItem("contenidoCarrito"));
  var productoASumar = producto.dataset.value; console.log(productoASumar);
  contenidoCarrito.push(productoASumar);
  console.log(contenidoCarrito);
}
 */



//función que obtiene la fecha al momento de hacer el comentario y la formatea de a misma forma que el resto de comentarios
var nuevaFecha = new Date();
var d = nuevaFecha.getDate();
var dia = (d < 10) ? '0' + d : d;
var m = nuevaFecha.getMonth() + 1;
var mes = (m < 10) ? '0' + m : m;
var fechaHoy = nuevaFecha.getFullYear() + "-" + mes + "-" + dia;
var hora = nuevaFecha.getHours() + ":" + nuevaFecha.getMinutes() + ":" + nuevaFecha.getSeconds();

function calcularEdad() {
  var contenidoMiPerfil = JSON.parse(localStorage.getItem("datosPersonales"));
  var arrayFecha = contenidoMiPerfil.edad.split("-");
  var añoFecha = arrayFecha[0];
  var añoNacimiento = nuevaFecha.getFullYear() - añoFecha;
  return añoNacimiento
}


document.getElementById("comprobarDatos").addEventListener("submit", function () {
  var nombresUsuario = document.getElementById("nombres");
  var chequeCruz = document.getElementById("cheque");

  nombresUsuario.classList.remove('is-invalid');
  nombresUsuario.classList.remove('is-valid');
  chequeCruz.classList.remove('invalido');
  chequeCruz.classList.remove('valido');

  if (nombresUsuario.value === "") {
    nombresUsuario.classList.add('is-invalid');
    chequeCruz.classList.add('invalido');
  } else {
    nombresUsuario.classList.add('is-valid');
    chequeCruz.classList.add('valido');
  }
})

document.getElementById("comprobarModificaciones").addEventListener("submit", function () {
  var nombresUsuario = document.getElementById("nombres");
  var chequeCruz = document.getElementById("cheque");

  nombresUsuario.classList.remove('is-invalid');
  nombresUsuario.classList.remove('is-valid');
  chequeCruz.classList.remove('invalido');
  chequeCruz.classList.remove('valido');

  if (nombresUsuario.value === "") {
    nombresUsuario.classList.add('is-invalid');
    chequeCruz.classList.add('invalido');
  } else {
    nombresUsuario.classList.add('is-valid');
    chequeCruz.classList.add('valido');
  }
})


  (function () {
    'use strict';
    window.addEventListener('load', function () {
      // Get the forms we want to add validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

/* var nombresUsuario = document.getElementById("nombres");
  var apellidosUsuario = document.getElementById("apellidos");
  var edad = document.getElementById("fechaNacimiento");
  var telefonoUsuario = document.getElementById("telefono");
  var emailUsuario = document.getElementById("email"); */




