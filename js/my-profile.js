//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});


var datosPersonales = {};
var nombresUsuario = document.getElementById("nombres");
var apellidosUsuario = document.getElementById("apellidos");
var edad = document.getElementById("fechaNacimiento");
var telefonoUsuario = document.getElementById("telefono");
var emailUsuario = document.getElementById("email");

function agregarDatosPersonales() {
    
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
        alert("agregueDatos")
        console.log(datosPersonales)
    } 
}

var contenidoMiPerfil = {};

document.addEventListener("DOMContentLoaded", function (e) {
    contenidoMiPerfil = JSON.parse(localStorage.getItem("datosPersonales"));
    console.log({ contenidoMiPerfil });
});

document.addEventListener("DOMContentLoaded", function mostrarMiPerfil(e) {
    let miPerfil = "";
    if (contenidoMiPerfil === null) {
        document.getElementById("sinPerfil").innerHTML = ('afterend', `<div style="display:contents;" class="modal fade" id="datosPersonalesVacio" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
    <form>
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">¡Antes de empezar, ingresa tus datos personales!</h5>
      </div>
      <div class="modal-body">
        
          <div class="row">
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="nombres">Nombres</label>
              <input type="text" id="nombres" placeholder="Aquí van tus nombres" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" required>            
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="apellidos">Apellidos</label>
              <input type="text" id="apellidos" placeholder="Aquí van tus apellidos" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" required>            
            </div>
          </div>  
          <div class="col-lg-6">
            <label>Fecha de nacimiento</label>
              <div class="select-outline position-relative w-100">
              <input type="date" id="fechaNacimiento" class="form-control mb-0 mb-lg-2" required>        
              </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label>Teléfono</label>
              <input type="tel" id="telefono" name="telefono" 
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="form-control mb-0 mb-lg-2" required>                  
            </div>
          </div>  
          <div class="col-lg-6">
            <div class="md-form md-outline mb-0 mb-lg-4">
              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Ingresa tu email" class="form-control mb-0 mb-lg-2" 
              style="margin-bottom:1em !important;" name="email" required>            
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
          <button type="submit" class="btn btn-primary btn-comprar" onclick="agregarDatosPersonales()">Listo</button>
        </div>
      </form>` )
    } else {
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
        </div>
      </div>
    </div>
    </section>
    `
        nombresUsuario.value = contenidoMiPerfil.nombres;
        apellidosUsuario.value = contenidoMiPerfil.apellidos;
        edad.value = contenidoMiPerfil.edad;
        telefonoUsuario.value = contenidoMiPerfil.telefono;
        emailUsuario.value = contenidoMiPerfil.email;

        document.getElementById("perfil").innerHTML = miPerfil;
        console.log(contenidoMiPerfil); 
    }
});


//función que obtiene la fecha al momento de hacer el comentario y la formatea de a misma forma que el resto de comentarios
var nuevaFecha = new Date();
var d = nuevaFecha.getDate();
var dia = (d < 10) ? '0' + d : d;
var m = nuevaFecha.getMonth() + 1;
var mes = (m < 10) ? '0' + m : m;
var fechaHoy = nuevaFecha.getFullYear() + "-" + mes + "-" + dia;
var hora = nuevaFecha.getHours() + ":" + nuevaFecha.getMinutes() + ":" + nuevaFecha.getSeconds();

function calcularEdad() {
    var arrayFecha = contenidoMiPerfil.edad.split("-");
    var añoFecha = arrayFecha[0];
    var añoNacimiento = nuevaFecha.getFullYear() - añoFecha;
    console.log(añoNacimiento)
    return añoNacimiento
} calcularEdad();







