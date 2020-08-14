
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

document.addEventListener("DOMContentLoaded", function(e){
    var isLoggedIn = window.localStorage.getItem("isLoggedIn") //pide la cookie 
    if(isLoggedIn == undefined){ //si ve que el loggedin es igual a undefined (osea sin cookie)
        window.location.href = "login.html" //lo manda al login 
    }
});
function init() {
    gapi.load('auth2', function() {
      /* Ready. Make a call to gapi.auth2.init or some other API */
      var auth2 = gapi.auth2.getAuthInstance();
      console.log(gapi);
    auth2.signOut().then(function () { //el then hace que despues de terminar lo anterior, hace lo siguiente
        console.log('User signed out.');
      });
    });
  }
function logOut(){
    
    window.localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html" //lo manda al login 

}   