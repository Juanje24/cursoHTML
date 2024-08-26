var mivideo, reproducir, barra, progreso, maximo;
var botonvolumen, barravol, progresovol;
maximo = 600;

function comenzar() {
  mivideo = document.getElementById("mivideo");
  reproducir = document.getElementById("reproducir");
  barra = document.getElementById("barra");
  progreso = document.getElementById("progreso");
  botonvolumen = document.getElementById("volume");
  barravol = document.getElementById("barravol");
  progresovol = document.getElementById("progresovol");

  reproducir.addEventListener("click", clicando, false);
  barra.addEventListener("click", adelantando, false);
  botonvolumen.addEventListener("click", barravolumen, false);
  barravol.addEventListener("click", gestionarvolumen, false);
}

function clicando() {
  if (mivideo.paused == false && mivideo.ended == false) {
    mivideo.pause();
    reproducir.innerHTML = "Play";
  } else {
    mivideo.play();
    reproducir.innerHTML = "Pause";
    bucle = setInterval(estado, 10);
  }
}

function estado() {
  if (mivideo.ended == false) {
    var total = parseInt((mivideo.currentTime * maximo) / mivideo.duration);
    progreso.style.width = total + "px";
  }
}

function adelantando(posicion) {
  if (mivideo.paused == false && mivideo.ended == false) {
    var ratonx = posicion.pageX - barra.offsetLeft;
    var nuevoTiempo = (ratonx * mivideo.duration) / maximo;
    mivideo.currentTime = nuevoTiempo;
    progreso.style.width = ratonx + "px";
  }
}
function barravolumen() {
  if (barravol.style.border == "0px") {
    barravol.style.border = "1px solid rgb(0,0,0)";
    var volumenActual = mivideo.volume;
    var tramobarra = (volumenActual * 200) / 1.0;
    progresovol.style.height = tramobarra + "px";
  } else {
    barravol.style.border = 0;
    progresovol.style.height = 0 + "px";
  }
}

function gestionarvolumen(posicion) {
  var ratony = posicion.pageY - barravol.offsetTop;
  var nuevoVol = (ratony * 1.0) / 200;
  mivideo.volume = nuevoVol;
  progresovol.style.height = ratony + "px";
}
window.addEventListener("load", comenzar, false);
