const palabras = [
  'ALURA',
  'NIÑO',
  'AFINIDAD',
  'PROGRAMAR',
  'ORACLE',
  'YOUTUBE',
  'INFORMATICA',
  'CONCILIACION',
  'MURCIELAGO',
  'EDUCACION',
]
;(function(){
'use strict'



// variable para almacenar la configuracion actual
var game = null
// para ver si ya se ha enviado alguna alerta
var finalizado = false


var $html = {
  maniqui: document.getElementById('maniqui'),
  adivinado: document.querySelector('.adivinado'),
  equivocado: document.querySelector('.equivocado')
//equivocado: document.getElementsByClassName('equivocado'),
/*Si miras bien el nombre del método usado, getElementsByClassName, verás que está en plural: 
obtiene una colección de elementos, no un único elemento. En este caso será una colección con un 
único elemento, pero no deja de ser una colección (es decir, un array). por tanto, estás 
intentando llamar al método appendChild sobre un array, no sobre un elemento del DOM.

Por tanto puedes hacer:

var select = document.getElementsByClassName("select")[0];
o también:

const select = document.querySelector(".select");
*/

}

function draw(game) {
  // Actualizar la imagen del maniqui
  var $etiqueta
  $etiqueta = $html.maniqui

  var estado = game.estado
  if (estado === 7) {//matriz de 8 pocicioses [0-7]
    estado = game.previo
  }
  if(estado >= 0 && estado < 9){
  $etiqueta.src = 'assets/estados/ahorcado_0' + game.estado + '.png'}
  if (estado==9){
    $etiqueta.src = 'assets/estados/ahorcado_0' + game.estado + '.gif'}

  // Creamos las letras acertadas
  var palabra = game.palabra
  var adivinado = game.adivinado
  $etiqueta = $html.adivinado
  // borramos los elementos anteriores
  $etiqueta.innerHTML = ''
  for (let letra of palabra) {
    let $span = document.createElement('span')
    let $txt = document.createTextNode('')
    if (adivinado.has(letra)) {
      $txt.nodeValue = letra
    }
    $span.setAttribute('class', 'letra acertada')
    $span.appendChild($txt)
    $etiqueta.appendChild($span)
  }

  // Creamos las letras equivocadas
  var equivocado = game.equivocado
  $etiqueta = $html.equivocado
  // Borramos los elementos anteriores
  $etiqueta.innerHTML = ''
  for (let letra of equivocado) {
    let $span = document.createElement('span')
    let $txt = document.createTextNode(letra)
    $span.setAttribute('class', 'letra equivocada')
    $span.appendChild($txt)
    $etiqueta.appendChild($span)
  }
  
}

function transcicion(game, letra) {
  var estado = game.estado
  // Si ya se ha perdido, o ganado, no hay que hacer nada
  if (estado === 1 || estado === 9) {
    return
  }

  var adivinado = game.adivinado
  var equivocado = game.equivocado
  // Si ya hemos adivinado o equivocado la letra, no hay que hacer nada
  if (adivinado.has(letra) || equivocado.has(letra)) {//busca dentro del conjunto si lo contiene
//if (adivinado.indexOf(letra) >=0 || equivocado.indexOf(letra) >= 0) {//busca dentro del indice del arreglo
    return
  }

  var palabra = game.palabra
  var letras = game.letras
  // Si es letra de la palbra
  if (letras.has(letra)) {//if (letras.indexOf(letra) >= 0) {
    // agregamos a la lista de letras acertadas
    adivinado.add(letra)
  //adivinado.push(letra)
    // actualizamos las letras restantes
    game.restante--
    // Si ya se ha ganado, debemos indicarlo
    if (game.restante === 0) {
      game.previo = game.estado
      game.estado =  9//muestra estado de ganancia
    }
  } else {
    // Si no es letra de la palabra, acercamos al maniqui un paso más de su ahorca
    game.estado--
    // Agregamos la letra, a la lista de letras equivocadas
    equivocado.add(letra)//".add" para agregar en un conjunto 
  //equivocado.push(letra)//".push" para agregar en arreglo
  }
}

window.onkeypress = function transcicionLetra(e) {//capturamos la letra
  var letra = e.key
  letra = letra.toUpperCase()//se convierte a mayuscula la letra
  if (/[^A-ZÑ]/.test(letra)) {//caracter no dsea erroneo y letra sea validas
    return
  }
  
  transcicion(game, letra)
  var estado = game.estado
  if (estado === 9 && !finalizado) {//estado es 9 y no ha finalizado
    setTimeout(alertaGanado, 500)
    finalizado = true//finalizado se vuelve verdadero, para que alerta no se muestre otra vez
  }else if (estado === 1 && !finalizado) {//estado es 1 y no ha finalizado
    let palabra = game.palabra
    let fn = alertaPerdido.bind(undefined, palabra)
    setTimeout(fn, 500)
    finalizado = true//finalizado se vuelve verdadero, para que alerta no se muestre otra vez
  }
  draw(game);
  
}

window.nuevogame = function nuevogame() {
  var palabra = palabraAleatoria()
  game = {}
  game.palabra = palabra
  game.estado = 8//inicia imagen de nuevo juego
  game.adivinado = new Set()//crea el conjunto de datos si se adivinan(alamcena)//game.adivinado = []
  game.equivocado = new Set()//crea el conjunto de datos si se equivocan(alamcena)//game.equivocado = []
  finalizado = false//reinicia el estado de la alerta para que vuelva a aparecer

  var letras = new Set()//crea el conjunto de "letras"(alamcena)
  for (let letra of palabra) {//tomado el valor de palabra hacia letra
    letras.add(letra)//valores de letras añadida a letra
  //letras.push(letra)
  }
  game.letras = letras//devuelve las letras que contiene la palabra
  game.restante = letras.size//devuelve el valor de cuantas letras faltan por adivinar

  draw(game);
  console.log(game);
}


function palabraAleatoria() {//configuracon para palabra aleatoria 
  var index = ~~(Math.random() * palabras.length)//~~(Math.random())retorna un entero por la doble negacion
  return palabras[index]
}

function alertaGanado() {
  alert('Felicidades crack, ganaste!')
}

function alertaPerdido(palabra) {
  alert('Lo siento estimado, usted perdio... la palabra era: ' + palabra)
}

nuevogame();


document.getElementsByClassName("boton2")[0].addEventListener("click", () => {
  location.reload();//renuncia a la partida
});
/*document.getElementById("boton4").addEventListener("click", () => {
  location.reload();//renuncia a la partida
});*/

document.getElementById("frmNuevaPalabra").addEventListener("submit", (event) => {
  event.preventDefault();
  let nuevaPalabra = document.getElementById("txtNuevaPalabra").value;
  palabras.push(nuevaPalabra.toUpperCase());
  document.getElementById("txtNuevaPalabra").value = "";
  nuevogame(nuevaPalabra.toUpperCase());
});

document.getElementById("btnNuevaPalabra").addEventListener("click", () => {
  document.getElementById("zonaBotonesJuego").style.display = "none";
  document.getElementById("zonaNuevaPalabra").style.display = "";
});

}());