//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

document.addEventListener("DOMContentLoaded", function (e) {
    var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
    if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
        window.location.href = "login.html" //lo manda al login 
    } else {document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`;}
});