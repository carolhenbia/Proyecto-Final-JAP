//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/* document.addEventListener("DOMContentLoaded", function(e){
    const queryString = window.location.search; //me da lo que esta del signo de pregunta en adelante
    if(queryString !== "") {
        const urlParams = new URLSearchParams(queryString); //lo parsea a objeto 
        const username = urlParams.get('nombreUsuario');//al objeto le pedis el usuario
        const password = urlParams.get('password')
        if (username == "admin" && password == "1234") {
            window.location.href="index.html" //el navegador te manda a otra url 
            //se le saca la barrita para que no sea absoluta sino relativa 
            setCookie("isLoggedIn", "1") //da el nombre y valor de la cookie a la funcion
        } else {
            alert("Credenciales incorrectas"); 
        }    
    }
});

var setCookie = function(name, value) {
    document.cookie = name+'='+value+'; expires=Fri, 31 Dec 2020 23:59:59 GMT';
} */ //Coloca la cookie y pone la fecha en que expira

//window es una variable del navegador que te da herramientas para manejarlo

/* function onSignIn(googleUser) {
    window.location.href = "index.html";
} */
