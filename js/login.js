//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    const queryString = window.location.search; //me da lo que esta del signo de pregunta en adelante
    if(queryString !== "") {
        const urlParams = new URLSearchParams(queryString); //lo parsea a objeto 
        const username = urlParams.get('nombreUsuario');//al objeto le pedis el usuario
        const password = urlParams.get('password')
        if (username != "" && password != "") {
            window.localStorage.setItem("isLoggedIn", username) //setItem es una funcion publica recibe parametro valor y guarda ahi
            window.location.href="index.html" //el navegador te manda a otra url 
            //se le saca la barrita para que no sea absoluta sino relativa 
        } else {
            alert("Credenciales incorrectas"); 
        }    
    }
});

/* function onSignIn(googleUser) {
    console.log(googleUser)
    window.localStorage.setItem("isLoggedIn", googleUser) //setItem es una funcion publica recibe parametro valor y guarda ahi
    window.location.href = "index.html";
}
 */ //LO PUSE EN COMENTARIOS PORQUE EL LOGOUT DE GOOGLE NO SALE, (LO QUE VIMOS EN CLASE)
