/*
    classList.add("nombre etiqueta");
    addEventListener('evento', function();

    El metodo addEventListener() relaciona la aparicion de un evento con la ejecucion de una función.

    Este metodo se aplica sobre un elemento HTML

    EVENTO LOAD
    Evento que se ejecuta cuando el documento se cargue.
    Solo se usa sobre el body
*/
let contadorA = 0;
let contadorN = 0;
let p, p2, posicion, posicion2;
let body = document.getElementsByTagName("body")[0];

body.addEventListener("load", CuentaAtras());
var tiempo=3;
function CuentaAtras() {

    document.getElementById('cuentaatras').innerHTML = tiempo

    if (tiempo == 0) {
        document.getElementsByTagName("section")[0].style.visibility = "hidden";
        tiempo = -1;
        pintarConsola();

        document.addEventListener("keydown", mover);
        document.addEventListener("keydown", resetear);
        setTimeout("CuentaAtras()", 1000);
    } else {
        tiempo -= 1;
        setTimeout("CuentaAtras()", 1000);
        if (tiempo == 2) {
            document.getElementById('cuentaatras').style.color = "black";
        }
    }
}
function pintarConsola() {
    let posicionObjetivo = [Math.floor(Math.random() * 13), Math.floor(Math.random() * 13)];
    let posicionInicio1 = [Math.floor(Math.random() * 13), Math.floor(Math.random() * 13)];
    let posicionInicio2 = [Math.floor(Math.random() * 13), Math.floor(Math.random() * 13)];

    let main = document.getElementsByTagName("main")[0];
    let contenedor = document.createElement("div");
    contenedor.classList.add("derecha")
    main.appendChild(contenedor);

    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {

            let div = document.createElement("div");
            div.classList.add("card");
            contenedor.appendChild(div);

            div.classList.add(i + "f");
            div.classList.add(j + "c");
            if (i == posicionObjetivo[0] && j == posicionObjetivo[1]) {
                div.classList.add("objetivo")
            }
            if (i == posicionInicio1[0] && j == posicionInicio1[1]) {
                div.classList.add("jugador1")

            }
            if (i == posicionInicio2[0] && j == posicionInicio2[1]) {
                div.classList.add("jugador2");
            }
        }
    }
}
/**
 * Necesito cualquier evento de tecla para poder mover el color de la casilla
 *  - DONDE: El evento lo aplico sobre todo el documento HTML(uso document.)
 *  - EVENTO: El evento elegido es "keydown"
 *  -FUNCION EJECUTADA : La funcion elegida es 'mover'
 *  -REALACION EVENTO, FUNCION Y LUGAR : el metodo elegido es addEventListener()
 */
/*
    Recibe por parametro el objeto event que referencia a la clase KeyboarEvent.
*/
function mover(event) {

    switch (event["key"]) {

        case "ArrowUp":
            //Hecho, no tocar
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    for (let k = 0; k < document.getElementsByClassName("derecha")[0]["children"].length; k++) {
                        if (document.getElementsByClassName("derecha")[0]["children"][k] == document.getElementsByClassName(`card ${i}f ${j}c jugador1`)[0]) {
                            posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador1`)[0];
                            posicion.classList.remove("jugador1");
                            if (i == 0) {
                                posicion.classList.add("jugador1");
                            } else {
                                posicion2 = document.getElementsByClassName(`card ${i - 1}f ${j}c`)[0];
                                posicion2.classList.add("jugador1");
                                if (posicion2 == document.getElementsByClassName(`card ${i - 1}f ${j}c objetivo`)[0]) {
                                    alert("¡Ha ganado el jugador Azul!");
                                    alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                    document.removeEventListener("keydown", mover);
                                    var div2 = document.getElementsByClassName("derecha")[0];
                                    div2.parentNode.removeChild(div2);
                                    contadorA++;
                                } else if (posicion2 == document.getElementsByClassName(`card ${i - 1}f ${j}c jugador2`)[0]) {
                                    posicion.classList.add("jugador1");
                                    posicion2.classList.remove("jugador1");
                                }
                            }
                        }
                    }
                }
            }
            break;
        case "ArrowDown":
            //Hecho, no tocar
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador1`)[0];
                    if (posicion != undefined) {
                        posicion2 = document.getElementsByClassName(`card ${i + 1}f ${j}c`)[0];
                        posicion.classList.remove("jugador1");
                        if (i == 12) {
                            posicion.classList.add("jugador1");

                        } else {
                            posicion2.classList.add("jugador1");
                            if (i < 12) {
                                i++;
                            } else {
                                i = 0;
                            }

                            if (posicion2.classList[3] == "objetivo") {
                                alert("¡Ha ganado el jugador Azul!");
                                alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                document.removeEventListener("keydown", mover);
                                var div2 = document.getElementsByClassName("derecha")[0];
                                div2.parentNode.removeChild(div2);
                                contadorA++;
                            } else if (posicion2.classList[3] == "jugador2") {
                                posicion.classList.add("jugador1");
                                posicion2.classList.remove("jugador1");
                            }
                        }
                    }
                }
            }
            break;
        case "ArrowLeft":
            //Hecho no tocar
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    for (let k = 0; k < document.getElementsByClassName("derecha")[0]["children"].length; k++) {
                        if (document.getElementsByClassName("derecha")[0]["children"][k] == document.getElementsByClassName(`card ${i}f ${j}c jugador1`)[0]) {
                            posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador1`)[0];
                            posicion.classList.remove("jugador1");

                            if (j == 0) {
                                posicion.classList.add("jugador1");
                            } else {
                                posicion2 = document.getElementsByClassName(`card ${i}f ${j - 1}c`)[0];
                                posicion2.classList.add("jugador1");

                                if (posicion2 == document.getElementsByClassName(`card ${i}f ${j - 1}c objetivo`)[0]) {
                                    alert("¡Ha ganado el jugador Azul!");
                                    alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                    document.removeEventListener("keydown", mover);
                                    var div2 = document.getElementsByClassName("derecha")[0];
                                    div2.parentNode.removeChild(div2);
                                    contadorA++;
                                } else if (posicion2 == document.getElementsByClassName(`card ${i}f ${j - 1}c jugador2`)[0]) {
                                    posicion.classList.add("jugador1");
                                    posicion2.classList.remove("jugador1");
                                }

                            }
                        }
                    }
                }
            }
            break;
        case "ArrowRight":
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador1`)[0];
                    if (posicion != undefined) {
                        posicion2 = document.getElementsByClassName(`card ${i}f ${j + 1}c`)[0];
                        posicion.classList.remove("jugador1");
                        if (j == 12) {
                            posicion.classList.add("jugador1");

                        } else {
                            posicion2.classList.add("jugador1");
                            if (j < 12) {
                                i++;
                            } else {
                                j = 0;
                            }

                            if (posicion2.classList[3] == "objetivo") {
                                alert("¡Ha ganado el jugador Azul!");
                                alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                document.removeEventListener("keydown", mover);
                                var div2 = document.getElementsByClassName("derecha")[0];
                                div2.parentNode.removeChild(div2);
                                contadorA++;
                            } else if (posicion2.classList[3] == "jugador2") {
                                posicion.classList.add("jugador1");
                                posicion2.classList.remove("jugador1");
                            }
                        }
                    }
                }
            }
            break;
        case "w":
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    for (let k = 0; k < document.getElementsByClassName("derecha")[0]["children"].length; k++) {
                        if (document.getElementsByClassName("derecha")[0]["children"][k] == document.getElementsByClassName(`card ${i}f ${j}c jugador2`)[0]) {
                            posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador2`)[0];
                            posicion.classList.remove("jugador2");

                            if (i == 0) {
                                posicion.classList.add("jugador2");
                            } else {
                                posicion2 = document.getElementsByClassName(`card ${i - 1}f ${j}c`)[0];
                                posicion2.classList.add("jugador2");

                                if (posicion2 == document.getElementsByClassName(`card ${i - 1}f ${j}c objetivo`)[0]) {
                                    alert("¡Ha ganado el jugador Naranja!");
                                    alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                    document.removeEventListener("keydown", mover);
                                    var div2 = document.getElementsByClassName("derecha")[0];
                                    div2.parentNode.removeChild(div2);
                                    contadorN++;
                                } else if (posicion2 == document.getElementsByClassName(`card ${i - 1}f ${j}c jugador1`)[0]) {
                                    posicion.classList.add("jugador2");
                                    posicion2.classList.remove("jugador2");
                                }
                            }
                        }
                    }
                }
            }
            break;
        case "a":
            //Hecho, no tocar
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    for (let k = 0; k < document.getElementsByClassName("derecha")[0]["children"].length; k++) {
                        if (document.getElementsByClassName("derecha")[0]["children"][k] == document.getElementsByClassName(`card ${i}f ${j}c jugador2`)[0]) {
                            posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador2`)[0];
                            posicion.classList.remove("jugador2");

                            if (j == 0) {
                                posicion.classList.add("jugador2");
                            } else {
                                posicion2 = document.getElementsByClassName(`card ${i}f ${j - 1}c`)[0];
                                posicion2.classList.add("jugador2");
                                if (posicion2 == document.getElementsByClassName(`card ${i}f ${j - 1}c objetivo`)[0]) {
                                    alert("¡Ha ganado el jugador Naranja!");
                                    alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                    document.removeEventListener("keydown", mover);
                                    var div2 = document.getElementsByClassName("derecha")[0];
                                    div2.parentNode.removeChild(div2);
                                    contadorN++;
                                } else if (posicion2 == document.getElementsByClassName(`card ${i}f ${j - 1}c jugador1`)[0]) {
                                    posicion.classList.add("jugador2");
                                    posicion2.classList.remove("jugador2");
                                }

                            }
                        }
                    }
                }
            }
            break;
        case "s":
            //Hecho, no tocar
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador2`)[0];
                    if (posicion != undefined) {
                        posicion2 = document.getElementsByClassName(`card ${i + 1}f ${j}c`)[0];
                        posicion.classList.remove("jugador2");
                        if (i == 12) {
                            posicion.classList.add("jugador2");

                        } else {
                            posicion2.classList.add("jugador2");
                            if (i < 12) {
                                i++;
                            } else {
                                i = 0;
                            }
                            if (posicion2.classList[3] == "objetivo") {
                                alert("¡Ha ganado el jugador Naranja!");
                                alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                document.removeEventListener("keydown", mover);
                                var div2 = document.getElementsByClassName("derecha")[0];
                                div2.parentNode.removeChild(div2);
                                contadorN++;
                            } else if (posicion2.classList[3] == "jugador1") {
                                posicion.classList.add("jugador2");
                                posicion2.classList.remove("jugador2");
                            }
                        }
                    }
                }
            }
            break;
        case "d":
            //Hecho, no tocar
            for (let i = 0; i < 13; i++) {
                for (let j = 0; j < 13; j++) {
                    posicion = document.getElementsByClassName(`card ${i}f ${j}c jugador2`)[0];
                    if (posicion != undefined) {
                        posicion2 = document.getElementsByClassName(`card ${i}f ${j + 1}c`)[0];
                        posicion.classList.remove("jugador2");
                        if (j == 12) {
                            posicion.classList.add("jugador2");

                        } else {
                            posicion2.classList.add("jugador2");
                            if (j < 12) {
                                j++;
                            } else {
                                j = 0;
                            }
                            if (posicion2.classList[3] == "objetivo") {
                                alert("¡Ha ganado el jugador Naranja!");
                                alert("Haz click en el botón Otra Partida para empezar de nuevo");
                                document.removeEventListener("keydown", mover);

                                var div2 = document.getElementsByClassName("derecha")[0];
                                div2.parentNode.removeChild(div2);
                                contadorN++;
                            } else if (posicion2.classList[3] == "jugador1") {
                                posicion.classList.add("jugador2");
                                posicion2.classList.remove("jugador2");
                            }
                        }
                    }
                }
            }
            break;
        default:

            break;
    }
}
function resetear(event) {
    if (event["key"] == "Enter") {
        tiempo=3;
        document.addEventListener("keydown", mover);
        document.getElementsByTagName("section")[0].style.visibility = "visible";
        pN = document.getElementsByClassName("marcadorN")[0];
        pN.textContent = contadorN;

        pA = document.getElementsByClassName("marcadorA")[0];
        pA.textContent = contadorA;

        if (contadorA > contadorN) {
            pA.style.color = " rgb(0, 247, 255)";
            pN.style.color = "black";
        } else if (contadorN > contadorA) {
            pA.style.color = "black";
            pN.style.color = " orange";
        } else {
            pA.style.color = "black";
            pN.style.color = "black";
        }

    }
}

function resetear2() {
    document.addEventListener("keydown", mover);
    document.getElementsByTagName("section")[0].style.visibility = "visible";
    tiempo = 3;

    pN = document.getElementsByClassName("marcadorN")[0];
    pN.textContent = contadorN;

    pA = document.getElementsByClassName("marcadorA")[0];
    pA.textContent = contadorA;

    if (contadorA > contadorN) {
        pA.style.color = " rgb(0, 247, 255)";
        pN.style.color = "black";
    } else if (contadorN > contadorA) {
        pA.style.color = "black";
        pN.style.color = " orange";
    } else {
        pA.style.color = "black";
        pN.style.color = "black";
    }
}




