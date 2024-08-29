function comenzar() {
  var boton = document.getElementById("dameUbi");
  boton.addEventListener("click", localizar, false);
}
function localizar() {
  var parametros = { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 };
  navigator.geolocation.getCurrentPosition(mostrarPos, errores);
}
function mostrarPos(posicion) {
  var ubicacion = document.getElementById("ubicacion");
  var miubicacion = "";
  miubicacion += "Latitud: " + posicion.coords.latitude + "<br>";
  miubicacion += "Longitud: " + posicion.coords.longitude + "<br>";
  miubicacion += "Exactitud: " + posicion.coords.accuracy + "<br>";
  //   var mimapa =
  //     "https://maps.googleapis.com/maps/api/staticmap?center=" +
  //     posicion.coords.latitude +
  //     "," +
  //     posicion.coords.longitude +
  //     "," +
  //     "&zoom=12&size=400x400&sensor=false&markers=" +
  //     posicion.coords.latitude +
  //     "," +
  //     posicion.coords.longitude;
  ubicacion.innerHTML = miubicacion;
}
function errores(error) {
  alert("Error al encontrar tu ubicación\n" + error.code + " " + error.message);
}
window.addEventListener("load", comenzar, false);
