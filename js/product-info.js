//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            function llamarDataProductos() {
                productInfo = result.data;
                productName = result.data.name;
                productDesc = result.data.description;
                productCost = result.data.cost;
                productCurr = result.data.currency;
                productSold = result.data.soldCount;
                productCategory = result.data.category;
                productImages = result.data.images;
            }
            llamarDataProductos();
            document.getElementById("tituloProducto").innerHTML = productName;
            document.getElementById("descripcionProducto").innerHTML = productDesc;
            document.getElementById("precioProducto").innerHTML = productCurr + " " + formatNumber(productCost);
            document.getElementById("categoriaProducto").innerHTML = productCategory;
            document.getElementById("subtituloPosicionamiento").innerHTML = `${productName} 2020 precio Uruguay`
            document.getElementById("cantidadVendidos").innerHTML = productSold;
            document.getElementById("imagen1Producto").src = productImages[0];
            document.getElementById("imagen2Producto").src = productImages[1];
            document.getElementById("imagen3Producto").src = productImages[2];
            document.getElementById("imagen4Producto").src = productImages[3];
            document.getElementById("imagen5Producto").src = productImages[4];
            document.getElementById("tituloComentarios").innerHTML = `Opiniones del auto ${productName}`;
        }
    });
});


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            /*    console.log(result) */
            function llamarDataComentarios() {
                productComments = result.data;
                primerComment = productComments[0];
                segundoComment = productComments[1];
                tercerComment = productComments[2];
                cuartoComment = productComments[3];
            }
            llamarDataComentarios();

            document.getElementById("primerComentario").innerHTML = primerComment.description;
            document.getElementById("primerUsuario").innerHTML = `@ ${primerComment.user}`;
            document.getElementById("primerFecha").innerHTML = primerComment.dateTime;
            /* document.getElementById("").innerHTML = primerComment.score; */

            document.getElementById("segundoComentario").innerHTML = segundoComment.description;
            document.getElementById("segundoUsuario").innerHTML = `@ ${segundoComment.user}`;
            document.getElementById("segundoFecha").innerHTML = segundoComment.dateTime;
            /* document.getElementById("").innerHTML = segundoComment.score; */

            document.getElementById("tercerComentario").innerHTML = tercerComment.description;
            document.getElementById("tercerUsuario").innerHTML = `@ ${tercerComment.user}`;
            document.getElementById("tercerFecha").innerHTML = tercerComment.dateTime;
            /* document.getElementById("").innerHTML = segundoComment.score; */

            document.getElementById("cuartoComentario").innerHTML = cuartoComment.description;
            document.getElementById("cuartoUsuario").innerHTML = `@ ${cuartoComment.user}`;
            document.getElementById("cuartoFecha").innerHTML = cuartoComment.dateTime;
            /* document.getElementById("").innerHTML = segundoComment.score; */


        }
    });
});

/* function cambiarFoto(){
    foto1.innerHTML = foto2;
} */




/* document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("tituloProductInfo").innerHTML = productName;
});
 */


/* var productName = productInfo['name']
console.log(productName)
document.getElementsByTagName('h1').innerHTML = productName; */




$(document).ready(function () {
    // MDB Lightbox Init
    $(function () {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });
});


document.addEventListener("DOMContentLoaded", function (e) {
    var isLoggedIn = window.localStorage.getItem("isLoggedIn") //agarra el item
    if (isLoggedIn == undefined) { //si ve que el loggedin es igual a undefined 
        window.location.href = "login.html" //lo manda al login 
    } else { document.getElementById("usuario").innerHTML = `Usuario: ${isLoggedIn}`; }
});