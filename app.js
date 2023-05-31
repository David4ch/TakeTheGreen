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
let button = document.getElementById("boton");
body.addEventListener("load", CuentaAtras());
var tiempo=3;
/**Función que empieza al cargar la página, el tiempo son 3 segundos, cuando llegue a 0 ejecuta la función pintar consola la cual pinta el tablero y el contador lo oculta
 * pongo el tiempo en -1 para q no de problemas y añado el event mover() y resetear()
 */
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
/**
 * Crea un div contenedor que contiene todos los divs de una cuadricula de 13x13, pinta el jugador naranja y el azul y el cuadrado verde para llegar
 */
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

/*
    Recibe por parametro el objeto event que referencia a la clase KeyboarEvent. Cuando hay que mover hacia arriba y a la izquierda lo hice de una forma
    y cuando hay que moverse hacia abajo y a la derecha de otra forma
    1a forma: Con un tercer for fui recorriendo cada div que se habia generado (13x13) los cuales estaban dentro de un contenedor en el array 'children'
    hasta que encuentre el div que tenga la clase jugador1, cuando lo encuentre le quita la clase jugador1 y al div que está una fila/columna menos se lo añade.
    2a forma: iba buscando uno a uno los divs, poniendoles la variable posicion, y como solo uno tiene la clase jugador1 los demás salen como undefined
    entonces cuando no sea undefined cojo al div que está una fila/columna menos se lo añade

    En ambas formas la forma de ganar es la misma, si el siguiente div tiene la clase objetivo, sale un alert que te dice que eres el ganador, suma al contador un uno
    quita el event de mover() y eliminar por completo el div contenedor que tenia la cuadricula de 13x13

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
                                    button.setAttribute("onclick", "resetear2()");
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
                                button.setAttribute("onclick", "resetear2()");
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
                                    button.setAttribute("onclick", "resetear2()");
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
                                button.setAttribute("onclick", "resetear2()");
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
                                    button.setAttribute("onclick", "resetear2()");
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
                                    button.setAttribute("onclick", "resetear2()");
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
                                button.setAttribute("onclick", "resetear2()");
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
                                button.setAttribute("onclick", "resetear2()");
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
/**
 * 
 * @param {*} event Funcion que recibe el evento keydown y es para que el botón funcione con la tecla Enter aparte de dandole click encima
 * Cuando se activa, pone el tiempo a 3 para que vuelva al primer function, añade de nuevo el event mover previamente eliminado, vuelve a poner visible
 * el section donde está la cuenta atrás, coge el texto del marcador y le pone el contenido del contador ganador y luego el if es para que cuando vaya ganando
 * uno se ponga de su color.   
 */
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
/**
 * Hace lo mismo que el function anterior pero este se activa al darle clic al botón, a diferencia del de arriba q se activa al darle a la tecla Enter
 */
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




