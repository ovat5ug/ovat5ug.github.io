function guardaPalabra() {
    var salvada = document.getElementById("capPalabra").value;//captura lo que el usuario digita en la caja de texto    
    let cadena = salvada.toUpperCase();//captura palabra en minuscula y la convierte en mayuscula
    

    document.getElementById("capPalabra").focus();//se ubica la caja de texto, luego de mostrar alerta
    document.getElementById("capPalabra").value="";//se ubica la caja de texto, luego de mostrar alerta    
    console.log("palabra guardada "+salvada);
    palabras.push(cadena);
    console.log("palabra enviada "+cadena);
if (salvada=="") {
    alert("Usted no ha introducido ninguna palabra, intentelo otra vez.");
    document.getElementById("capPalabra").focus();//se ubica la caja de texto, luego de mostrar alerta
    document.getElementById("capPalabra").value="";//se ubica la caja de texto, luego de mostrar alerta    
    }
      
}
function empezarGame() {
    document.getElementById("zonaBotonesJuego").style.display = "none";
    document.getElementById("zonaJuego").style.display = "none";
    inicioGame("argumento");
}
