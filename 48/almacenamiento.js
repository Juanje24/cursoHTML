function comenzar() {
  var boton = document.getElementById("grabar");
  boton.addEventListener("click", itemNuevo, false);
}
function itemNuevo() {
  var clave = document.getElementById("clave").value;
  var valor = document.getElementById("valor").value;
  sessionStorage.setItem(clave, valor);
  //sessionStorage[clave] = valor;
  leerMostrar(clave);
  document.getElementById("clave").value = "";
  document.getElementById("valor").value = "";
}
function leerMostrar(clave) {
  var zonadatos = document.getElementById("zonadatos");
  //var valor = sessionStorage[clave];
  zonadatos.innerHTML = '<div><button onclick="eliminar()">Eliminar todo</button></div>';
  for (var i = 0; i < sessionStorage.length; i++) {
    var clave = sessionStorage.key(i);
    var valor = sessionStorage.getItem(clave);
    zonadatos.innerHTML +=
      "<div> Clave: " +
      clave +
      "--" +
      "Valor: " +
      valor +
      "<br><button onclick=\"eliminarItem('" +
      clave +
      "')\">Eliminar</button></div>";
  }
}
function eliminar() {
  if (confirm("¿Seguro?")) {
    sessionStorage.clear();
    leerMostrar();
  }
}
function eliminarItem(clave) {
  if (confirm("¿Seguro?")) {
    sessionStorage.removeItem(clave);
    leerMostrar();
  }
}
window.addEventListener("load", comenzar, false);
