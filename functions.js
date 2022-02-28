let id1 = 0;
let puntuacion = 0;
let click = true;
let opcion = "";

function ayudaMenu(){
    $("#cartas").html("El juego consiste en adivinar las parejas de todas las cartas.<br>\
        Para elegir un tipo de palo de la baraja deberá hacer click sobre la imagen que desee.<br><br>\
        <img src=\"img/bastos/1.jpg\" class=\"menu\" onclick=\"bastos()\">\
        <img src=\"img/copas/1.jpg\" class=\"menu\" onclick=\"copas()\">\
        <img src=\"img/oro/1.jpg\" class=\"menu\" onclick=\"oros()\">\
        <img src=\"img/espadas/1.jpg\" class=\"menu\" onclick=\"espadas()\">");
}

function bastos(){
    $("#cartas").html("");
    opcion = "bastos";
    cargar();
}

function copas(){
    $("#cartas").html("");
    opcion = "copas";
    cargar();
}

function oros(){
    $("#cartas").html("");
    opcion = "oro";
    cargar();
}

function espadas(){
    $("#cartas").html("");
    opcion = "espadas";
    cargar();
}

function cargar() {
    const Arraynum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const numRepetidos = [];
    const constante = 12;
    let contador = 0;
    puntuacion = 0;


    for (let i = 0; i < Arraynum.length; i++) {
        let buscar = 0;
        var num = Math.floor((Math.random() * (12 - 1 + 1)) + 1);
        if (Arraynum.indexOf(num) != -1) {
            if (numRepetidos.indexOf(num) != -1) {
                let suma = Number(num) + Number(constante);
                console.log(suma);
                $("#cartas").append(`<img src=\"img/posterior.png\" width="120px" id="${suma}" onclick="comprobar(${suma})">`);
            } else {
                $("#cartas").append(`<img src=\"img/posterior.png\" width="120px" id="${num}" onclick="comprobar(${num})">`);
            }
            buscar = Arraynum.indexOf(num);
            numRepetidos.push(num);
            Arraynum.splice(buscar, 1, 0);
            contador++;
        } else {
            i--;
        }
        if (contador == 8) {
            $("#cartas").append(`<br><br>`);
            contador = 0;
        }
    }
}


function comprobar(id){
    if(click){
        voltear(id, opcion);
    }
}

function siJugar() {
    desvanecer();
    $("#cartas").html("");
    cargar();
}

function cambiarTipo(){
    desvanecer();
    $("#cartas").html("");
    $("#cartas").html("Seleccione el tipo de cartas : <br><br>\
    <button onclick=\"ayudaMenu()\">Ayuda</button> <br><br>\
    <img src=\"img/bastos/1.jpg\" class=\"menu\" onclick=\"bastos()\">\
    <img src=\"img/copas/1.jpg\" class=\"menu\" onclick=\"copas()\">\
    <img src=\"img/oro/1.jpg\" class=\"menu\" onclick=\"oros()\">\
    <img src=\"img/espadas/1.jpg\" class=\"menu\" onclick=\"espadas()\">");
}

function desvanecer() {
    $('#popup').fadeOut('slow');
    $('.popup-overlay').fadeOut('slow');
    return false;
}


function finJuego() {
    $('#popup').fadeIn('slow');
    $('.popup-overlay').fadeIn('slow');
    $('.popup-overlay').height($(window).height());
    return false;
}

function voltear(id, opcion) {
    nId = id - 12;
    pId = id + 12;
    console.log(id);
    if (id > 12) {
        $("#" + id).attr("src", `img/${opcion}/${nId}.jpg`);
    } else {
        $("#" + id).attr("src", `img/${opcion}/${id}.jpg`);
    }
    if (id1 != 0) {
        click = false;
        if (id1 == id || id1 == nId || id1 == pId) {
            puntuacion++;
            $("#" + id).removeAttr("onclick");
            $("#" + id1).removeAttr("onclick");
            id1 = 0;
            click = true;
        } else {
            setTimeout(function () {
                $("#" + id).attr("src", `img/posterior.png`);
                $("#" + id1).attr("src", `img/posterior.png`);
                id1 = 0;
                click = true;
            }, 500);
        }

    } else {
        id1 = id;
    }

    if (puntuacion == 12) {
        finJuego();
    }
}