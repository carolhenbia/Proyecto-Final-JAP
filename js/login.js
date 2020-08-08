//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    const queryString = window.location.search; //me da lo que esta del signo de pregunta en adelante
    if(queryString !== "") {
        const urlParams = new URLSearchParams(queryString); //lo parsea a objeto 
        const username = urlParams.get('nombreUsuario');//al objeto le pedis el usuario
        const password = urlParams.get('password')
        if (username == "admin" && password == "1234") {
            window.location="/index.html" //el navegador te manda a otra url 
            setCookie("isLoggedIn", "1") //da el nombre y valor de la cookie a la funcion
        } else {
            alert("Credenciales incorrectas");
        }    
    }
});

var setCookie = function(name, value) {
    document.cookie = name+'='+value+'; expires=Fri, 31 Dec 2020 23:59:59 GMT';
} //Coloca la cookie y pone la fecha en que expira


//EXPLICAR DESPUES

//window es una variable del navegador que te da herramientas para manejarlo
/*
class Perro {
    const name = "";

    function constructor(name){
        this.name = name;
    }

    function ladrar(){...}
}

class Persona {
    const name = "";
    const apellido = "";
    const perro = null;

    function constructor(name, apellido){
        this.name = name;
        this.apellido = apellido;
    }

    function correr(){...}
    function adoptarPerro(perro){
        this.perro = perro;
    }
}

const perroDeCaro = new Perro("pepito")
const perroDeFau = new Perro("guille")

const persona1 = new Persona("caro", "henderson");
const persona2 = new Persona("fau", "sanchez");

persona2.correr()

persona1.adoptarPerro(perroDeCaro)*/