
document.addEventListener("DOMContentLoaded", function(e){
    var isLoggedIn = getCookie("isLoggedIn")
    if(isLoggedIn == undefined){
        window.location = "/login.html"
    }
});
var getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};
