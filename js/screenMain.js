function inicioGame() {
    LimpiarPantalla();
    nuevogame();
  }

  function LimpiarPantalla() {
    document.getElementById("zonaBotonesJuego").style.display = "none";
    document.getElementById("zonaNuevaPalabra").style.display = "none";
    document.getElementById("zonaJuego").style.display = "";
    //document.getElementById("listLetrasIncorrectas").innerHTML = "";
    //document.getElementById("txtRecibePalabra").value = "";
    //document.getElementById("imgAhorcado").innerHTML = "";
    //document.getElementById("tempPalabraEncontrada").innerHTML = "";  
    totalVidas = 0;
    palabraEncontrada = [];
    palabraEncontradaTemp = [];
    listaLetrasIncorrectas = [];
  }

  (() => {//inicio

    document.getElementById("btnJugar").addEventListener("click", () => {
      inicioGame();
      console.log(palabras)
  });

  document.getElementById("btnNuevoJuego").addEventListener("click", () => {
      inicioGame();
  });

  document.getElementById("juegoStar").addEventListener("click", () => {
    inicioGame();
    console.log(palabras)
  });

  document.getElementById("btnSalirJuego").addEventListener("click", () => {
      location.reload();
  });

  document.getElementById("btnCancelarGuardarPalabra").addEventListener("click", () => {
      location.reload();
  });

    document.getElementById("btnNuevaPalabra").addEventListener("click", () => {
      document.getElementById("zonaBotonesJuego").style.display = "none";
      document.getElementById("zonaNuevaPalabra").style.display = "";
    });

  })();//fin