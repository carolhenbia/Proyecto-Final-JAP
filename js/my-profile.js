//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});


var datosPersonales = {};

function agregarDatosPersonales() {
    alert("hola")
    var nombresUsuario = document.getElementById("nombres");
    var apellidosUsuario = document.getElementById("apellidos");
    var edad = document.getElementById("fechaNacimiento");
    var telefonoUsuario = document.getElementById("telefono");
    var emailUsuario = document.getElementById("email");

    if ( nombresUsuario.value != "" && apellidosUsuario.value != "" 
    && edad.value != "" && telefonoUsuario.value != "" && emailUsuario.value != "" ) {
        var datosPersonales = {
            nombres: nombresUsuario.value,
            apellidos: apellidosUsuario.value,
            edad: edad.value,
            telefono: telefonoUsuario.value,
            email: emailUsuario.value
        };
        localStorage.setItem("datosPersonales", JSON.stringify(datosPersonales)); 
        console.log(datosPersonales)
    }
}

var contenidoMiPerfil = {};

document.addEventListener("DOMContentLoaded", function (e) {
    contenidoMiPerfil = JSON.parse(localStorage.getItem("datosPersonales"));   
    console.log({contenidoMiPerfil});
});

document.addEventListener("DOMContentLoaded", function mostrarMiPerfil(e) {
    let miPerfil = "";
    if (contenidoMiPerfil != undefined){
        miPerfil = `<h1>${contenidoMiPerfil.nombres}</h1> 
        `
    document.getElementById("conPerfil").innerHTML = miPerfil; 
    console.log(contenidoMiPerfil);   
    }
});





