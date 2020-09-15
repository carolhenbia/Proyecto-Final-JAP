
/* document.addEventListener("DOMContentLoaded", function(e){
    var isLoggedIn = getCookie("isLoggedIn") //pide la cookie 
    if(isLoggedIn == undefined){ //si ve que el loggedin es igual a undefined (osea sin cookie)
        window.location.href = "login.html" //lo manda al login 
    }
});
var getCookie = function (name) { //funcion pre hecha que parsea los datos de cookie
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}; */

document.addEventListener("DOMContentLoaded", function (e) {
    var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
    if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
        window.location.href = "login.html" //lo manda al login 
    } else {document.getElementById("usuario").innerHTML = `Usuarie: ${isLoggedIn}`;}
});

/* function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
} */ //LO PUSE EN COMENTARIOS PORQUE EL LOGOUT DE GOOGLE NO SALE, (LO QUE VIMOS EN CLASE)

function logOut() {
    /* var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () { //el then hace que despues de terminar lo anterior, hace lo siguiente
        console.log('User signed out.');
    }); */ //LO PUSE EN COMENTARIOS PORQUE EL LOGOUT DE GOOGLE NO SALE, (LO QUE VIMOS EN CLASE)
    window.localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html" //lo manda al login 

}   

document.getElementById("usuario").innerHTML = window.localStorage.getItem("isLoggedIn", username);