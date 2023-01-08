if(document.addEventListener){
	window.addEventListener("load",comienzo);
}else if(document.attachEvent){
	window.attachEvent("onload",comienzo);
}
var cartas = ["1P","2P","3P","4P","5P","6P","7P","8P","9P","XP","JP","QP","KP",
                "1C","2C","3C","4C","5C","6C","7C","8C","9C","XC","JC","QC","KC",
                "1T","2T","3T","4T","5T","6T","7T","8T","9T","XT","JT","QT","KT",
                "1D","2D","3D","4D","5D","6D","7D","8D","9D","XD","JD","QD","KD"];
var cont=0;
var puntuacionJug = 0;
var puntuacionIA = 0;
var seguir = true;


function comienzo(){
    
    shuffleArray(cartas);
    console.log(cartas);
    let reglas = document.getElementById("reglas");
    let cerrar = document.getElementById("cerrar");
    let carta = document.getElementById("carta");
    let plantarse = document.getElementById("plantarse");
    let Njuego = document.getElementById("juego");

    
    console.log(puntuacionJug);
    if(document.addEventListener){
        reglas.addEventListener("click",abrir_dialogo);
        cerrar.addEventListener("click",cerrar_dialogo);
        carta.addEventListener("click",jugador);
        plantarse.addEventListener("click",juegoIA);
        Njuego.addEventListener("click",nuevoJuego);
       
    }else if (document.attachEvent){
        reglas.attachEvent("onclick",abrir_dialogo);
        cerrar.attachEvent("onclick",cerrar_dialogo);
        carta.attachEvent("onclick",jugador);
        plantarse.attachEvent("onclick",juegoIA);
        Njuego.attachEvent("onclick",nuevoJuego);
    }
}

/*en nuevo juego lo pongo a 0 y mezclo la baraja otra vez
ya que si no al llegar al final de la baraja decir que pare*/
function nuevoJuego(){
    puntuacionJug = 0;
    puntuacionIA = 0;
    cont=0;
    seguir=true;
    shuffleArray(cartas);
    document.getElementById("carta").removeAttribute("disabled");
    let mazo = document.getElementById("mazo");
    while (mazo.firstChild) {
        mazo.removeChild(mazo.firstChild);
    }
    let mazoIA = document.getElementById("mazoIA");
    while (mazoIA.firstChild) {
        mazoIA.removeChild(mazoIA.firstChild);
    }
    let resultado = document.getElementById("resultado").innerHTML = '';
}

function abrir_dialogo(){
    document.getElementById("dialogo").setAttribute("open","true");
}

function cerrar_dialogo(){
	document.getElementById("dialogo").removeAttribute("open");
}

function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

function jugador(){
    console.log(puntuacionJug);
    if(puntuacionJug >= 21) {
        document.getElementById("carta").setAttribute("disabled","true");
    }
    else{
        repartirCarta();
    }
}

function repartirCarta(){
    let mazo = document.getElementById("mazo");
    let nuevo = document.createElement("img");
    nuevo.src = "img/" + cartas[cont] + ".png";
    mazo.appendChild(nuevo);
    console.log("CARTA GENERADA -> " +cartas[cont]);
    puntuacionJug = puntuacionJug + puntos();
}

function juegoIA(){
    document.getElementById("carta").setAttribute("disabled","true");
    while(seguir){
        console.log(puntuacionIA);
        if((puntuacionIA >= 18 || puntuacionIA > puntuacionJug) || (puntuacionJug > 21 && puntuacionIA >0)){
            seguir=false;
        }
        else{
            let mazo = document.getElementById("mazoIA");
            let nuevo = document.createElement("img");
            nuevo.src = "img/" + cartas[cont] + ".png";
            mazo.appendChild(nuevo);
            console.log("CARTA GENERADA -> " +cartas[cont]);
            puntuacionIA = puntuacionIA + puntos();
        }
    }
    if(seguir==false){
        resultados();
    }
}

function puntos(){
    let puntuacion = cartas[cont].substring(0,1);
    if(isNaN(puntuacion) == true) puntuacion = 10;
    cont++;
    return Number(puntuacion);
}

function resultados(){
    let resultado = document.getElementById("resultado");
    let nuevo = "";
    console.log("PUNTUACION JUG -> "+puntuacionJug + "  PUNTUACION MAQ -> "+puntuacionIA);
    if((puntuacionJug > puntuacionIA && puntuacionJug <=21) || (puntuacionIA > 21 && puntuacionJug <=21)){
        nuevo = document.createTextNode("Gana el jugador");
    }if((puntuacionIA > puntuacionJug && puntuacionIA <=21) || (puntuacionJug > 21 && puntuacionIA <=21)){
        nuevo = document.createTextNode("Gana la Máquina");
    } if (puntuacionIA == puntuacionJug && puntuacionIA <=21 && puntuacionJug <=21){
        nuevo = document.createTextNode("Empate");
    }
    
    resultado.appendChild(nuevo);
}