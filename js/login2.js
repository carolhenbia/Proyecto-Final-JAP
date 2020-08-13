/* document.addEventListener("DOMContentLoaded", function (e) {
    const queryString = window.location.search; //me da lo que esta del signo de pregunta en adelante
    if (queryString !== "") {
        const urlParams = new URLSearchParams(queryString); //lo parsea a objeto 
        const username = urlParams.get('nombreUsuario');//al objeto le pedis el usuario
        const password = urlParams.get('password')
        if (username == "admin" && password == "1234") {
            window.localStorage.setItem("isLoggedIn", "1"); //da el nombre y valor de la cookie a la funcion
            window.location.href = "index.html"; //el navegador te manda a otra url 
            //se le saca la barrita para que no sea absoluta sino relativa 
        } else {
            alert("Credenciales incorrectas");
        }
    }
});
 */

 /* const form = document.getElementById("login");
    const username = document.getElementById("nombreUsuario");
    const password = document.getElementById("password");
    form.addEventListener("submit", function(e){
        e.preventDefault();

        let users= 
        {
            nombreUsuario: username.value,
            password: password.value

        };
        localStorage.setItem("nombreUsuario", users.username)
        localStorage.setItem("password", users.password);
        location.href= "index.html";
});
 */

/* document.addEventListener("DOMContentLoaded", function(e){
    const queryString = window.location.search; //me da lo que esta del signo de pregunta en adelante
    if(queryString !== "") {
        const urlParams = new URLSearchParams(queryString); //lo parsea a objeto 
        const username = urlParams.get('nombreUsuario');//al objeto le pedis el usuario
        const password = urlParams.get('password')
        if (username == "admin" && password == "1234") {
            setCookie("isLoggedIn", "1") //da el nombre y valor de la cookie a la funcion
            window.location.href="index.html" //el navegador te manda a otra url 
            //se le saca la barrita para que no sea absoluta sino relativa 
        } else {
            alert("Credenciales incorrectas"); 
        }    
    }
}); */

/*var setCookie = function(name, value) {
    document.cookie = name+'='+value+'; expires=Fri, 31 Dec 2020 23:59:59 GMT'; } */
