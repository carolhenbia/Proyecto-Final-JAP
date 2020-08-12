document.addEventListener("DOMContentLoaded", function (e) {
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
