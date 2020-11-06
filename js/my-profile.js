//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});


var datosPersonales = {};

function agregarDatosPersonales(e) {  //agarra los valores en el form y los convierte en un objeto
  var nombresUsuario = document.getElementById("nombres");
  var apellidosUsuario = document.getElementById("apellidos");
  var edad = document.getElementById("fechaNacimiento");
  var telefonoUsuario = document.getElementById("telefono");
  var emailUsuario = document.getElementById("email");
  var fotoUsuario = document.getElementById("foto");
  
  if (nombresUsuario.value != "" && apellidosUsuario.value != ""
    && edad.value != "" && telefonoUsuario.value != "" && emailUsuario.value != "") {
    var datosPersonales = {
      nombres: nombresUsuario.value,
      apellidos: apellidosUsuario.value,
      edad: edad.value,
      telefono: telefonoUsuario.value,
      email: emailUsuario.value,
      imagen: fotoUsuario.src,
    };
    localStorage.setItem("datosPersonales", JSON.stringify(datosPersonales));
    cargarProfile();
  }
  var formularioInicial = document.getElementById("formInicial");
  formularioInicial.classList.add("was-validated"); //al hacer click en form inicial, cambia la clase de los campos
  //para que aparezca el respectivo equis o cheque de campos faltantes
}

document.addEventListener("DOMContentLoaded", function mostrarMiPerfil(e) {
  cargarProfile();
});

function clickModificar() {
  cargarProfile(true); //manda un true al cargarProfile para poder modificar el perfil
  var formularioModificar = document.getElementById("modificarForm");
  formularioModificar.classList.add("was-validated");
  //cambia la clase de los campos
  //para que aparezca el respectivo equis o cheque de campos faltantes
}


var contenidoCarrito = [];
var productoCarrito = [];

function cargarProfile(showForm = false) { //inicialmente se le manda un "false" para que solo sea "true" al modificar
  /*tiene 3 condicionales para mostrar o no el profile:
  1. Para modificar: si hay contenido en el local storage y se le envia un showform "true" como parametro
  2. Formulario inicial: si el local storage está vacío
  3. Mostrar perfil: si el local storage está lleno
  */
  var contenidoMiPerfil = JSON.parse(localStorage.getItem("datosPersonales")); //recupera datos del json
  let miPerfil = "";
  if (contenidoMiPerfil != null && showForm) {//si el contenido no es nulo y el showform es true
    //coloca en el "value" de los campos la información que ya se encontraba en el local storage
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
              <div class="valid-feedback">¡Listo!</div>          
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="apellidos">Apellidos</label>
              <input type="text" value="${contenidoMiPerfil.apellidos}" id="apellidos" placeholder="Aquí van tus apellidos" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" required>   
              <div class="invalid-feedback">Falta ingresar tu apellido.</div>
              <div class="valid-feedback">¡Listo!</div>              
            </div>
          </div>  
          <div class="col-lg-6">
            <label>Fecha de nacimiento</label>
              <div class="select-outline position-relative w-100">
              <input type="date" id="fechaNacimiento"  value="${contenidoMiPerfil.edad}" class="form-control mb-0 mb-lg-2" required>        
              <div class="invalid-feedback">Falta ingresar tu fecha de nacimiento.</div>
              <div class="valid-feedback">¡Listo!</div> 
              </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label>Teléfono</label>
              <input type="tel" id="telefono" name="telefono" value="${contenidoMiPerfil.telefono}"
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="form-control mb-0 mb-lg-2" required>  
              <div class="invalid-feedback">Falta ingresar tu teléfono.</div>
              <div class="valid-feedback">¡Listo!</div>                    
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Ingresa tu email" class="form-control mb-0 mb-lg-2"
              value="${contenidoMiPerfil.email}" 
              style="margin-bottom:1em !important;" name="email" required>   
              <div class="invalid-feedback">Falta ingresar tu email.</div>
              <div class="valid-feedback">¡Listo!</div>           
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">     
              <label for="foto">Foto de perfil</label> 
              <input type="file" accept="image/*" class="form-control mb-0 mb-lg-2"
              name="image" id="file"  onchange="loadFile(event)" style="display: none;" required>
              <b><label for="file" style="cursor: pointer;" class="form-control btn-comprar mb-0 mb-lg-2">Sube tu imagen</label></b>
              <p><img id="foto" src="${contenidoMiPerfil.imagen}" width="200" /></p>    
              <div class="invalid-feedback">Esta es tu imagen actual.</div>
              <div class="valid-feedback">¡Listo!</div>       
            </div>
          </div>  
        </div>  
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary btn-comprar" onclick="agregarDatosPersonales(event)">Listo</button>
        </div>
      </form>
      </div>
      </div>` )
  } else if (contenidoMiPerfil === null) { //si el local storage es nulo, o sea no se cargaron datos muestra form inicial
    document.getElementById("sinPerfil").innerHTML = (`
        <div style="display:contents;" class="modal fade" id="datosPersonalesVacio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
    <form id="formInicial" enctype="multipart/form-data">
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
            <label for="foto">Foto de perfil</label> 
              <input type="file" accept="image/*" class="form-control mb-0 mb-lg-2"
              name="image" id="file"  onchange="loadFile(event)" style="display: none; margin-bottom:1em !important;" required>
              <b><label for="file" style="cursor: pointer;" class="form-control btn-comprar mb-0 mb-lg-2">Sube tu imagen</label></b>
              <p><img id="foto" width="200" /></p>    
              <div class="invalid-feedback">Falta elegir una imagen.</div>
              <div class="valid-feedback">¡Listo!</div>   
          </div>  
        </div>  
        <div class="modal-footer">
          <button type="submit" id="comprobarDatos" class="btn btn-primary btn-comprar" onclick="agregarDatosPersonales(event)">Listo</button>
        </div>
      </form>
      </div>
      </div>` )

  } else { //si el local storage esta lleno, muestra el perfil obteniendo datos del local storage

    var contenidoCarrito = JSON.parse(localStorage.getItem("contenidoCarrito")); 
    //llama al local storage para saber la cantidad de productos comprados
    for (let i = 0; i < contenidoCarrito.length; i++) {
    cantidadProdCarrito = contenidoCarrito.length;}

    miPerfil = ` <section class="intro-section">
    <div class="container">
      <div class="row">
        <div class="col-md-1 col-lg-2"></div>
        <div class="col-md-10 col-lg-8">
          <div class="intro">
            <div class="profile-img" id="fotoPerfil">
            <img src="${contenidoMiPerfil.imagen}" border="0">
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
              <b>PRODUCTOS COMPRADOS: </b><span id="compradosUser">${cantidadProdCarrito}</span>
            </li>
          </ul>
          </div>
          <div class="modal-footer">
          <button class="btn btn-primary btn-comprar" onclick="clickModificar()">Modificar</button>
        </div>
        </div>
      </div>
    </div>
    </section> <div class="container"> <div class="row" style="justify-content:center"> <h3 style="margin-top:0.5em; margin-bottom:1em; font-size:1.5em">Mira los productos que compraste:</h3></div>
    <div class="row" id="productosComprados"></div></div>`
    
    document.getElementById("perfil").innerHTML = miPerfil; 
    
    var contenidoCarrito = JSON.parse(localStorage.getItem("contenidoCarrito")); 
    //vuelve a llamar al local storage, esta vez para mostrar los productos comprados debajo de la portada de perfil
    for (let i = 0; i < contenidoCarrito.length; i++) { //recorre el listado de productos
    let productoCarrito = contenidoCarrito[i];
    cantidadProdCarrito = contenidoCarrito.length;

    if(productoCarrito.currency == "UYU") {
      productoCarrito.unitCost = (productoCarrito.unitCost / 40).toFixed(0);
      productoCarrito.currency = "USD";
      } //convierte la moneda a dólares 
    
    document.getElementById("productosComprados").innerHTML += (`
      <div class="col-sm-6 col-md-4">
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
      `) //muestra los productos comprados 
    } 

    } 
}

//función que obtiene la fecha actual
var nuevaFecha = new Date();
nuevaFecha.getFullYear()

function calcularEdad() { //calcula la edad en base a lo ingresado en el calendario de form
  var contenidoMiPerfil = JSON.parse(localStorage.getItem("datosPersonales"));
  var arrayFecha = contenidoMiPerfil.edad.split("-"); //convierte la fecha del calendario en un array sacando los guiones
  var añoFecha = arrayFecha[0]; //obtiene el año de nacimiento
  var añoNacimiento = nuevaFecha.getFullYear() - añoFecha; //resta el año de nacimiento con el año actual 
  return añoNacimiento
} 


document.getElementById("comprobarDatos").addEventListener("submit", function () { //funcion que pone o quita clases segun los campos del formulario
  var nombresUsuario = document.getElementById("nombres");
  var chequeCruz = document.getElementById("cheque");

  //saca todas las clases que tenga inicialmente
  nombresUsuario.classList.remove('is-invalid');
  nombresUsuario.classList.remove('is-valid');
  chequeCruz.classList.remove('invalido');
  chequeCruz.classList.remove('valido');

  if (nombresUsuario.value === "") { //si el campo es vacio, coloca las clases de invalido
    nombresUsuario.classList.add('is-invalid');
    chequeCruz.classList.add('invalido');
  } else {
    nombresUsuario.classList.add('is-valid'); //de lo contrario, colocal las clases de valido
    chequeCruz.classList.add('valido');
  }
})


