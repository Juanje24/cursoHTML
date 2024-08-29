var elemOrigen, elemDestino;

function comenzar() {
  elemOrigen = document.getElementById("imagen");
  elemOrigen.addEventListener("dragstart", comenzarArrastre, false);
  elemDestino = document.getElementById("zonadestino");

  elemDestino.addEventListener(
    "dragover",
    function (e) {
      e.preventDefault();
    },
    false
  );
  elemDestino.addEventListener("drop", soltado, false);
  elemOrigen.addEventListener("dragend", terminado, false);
  elemDestino.addEventListener("dragenter", entrando, false);
  elemDestino.addEventListener("dragleave", saliendo, false);
}
function comenzarArrastre(e) {
  var codigo = "<img src='" + elemOrigen.getAttribute("src") + "'>";
  e.dataTransfer.setData("Text", codigo);
}
function soltado(e) {
  e.preventDefault();
  elemDestino.innerHTML = e.dataTransfer.getData("Text");
}
function terminado(e) {
  var elemento = e.target;
  elemento.style.visibility = "hidden";
  elemento.style.border = 0;
}
function entrando(e) {
  e.preventDefault();
  elemDestino.style.background = "rgba(8,252,25,0.8)";
}
function saliendo(e) {
  e.preventDefault();
  elemDestino.style.visibility = "hidden";
}
window.addEventListener("load", comenzar, false);
