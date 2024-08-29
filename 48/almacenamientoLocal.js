function comenzar() {
  var boton = document.getElementById("grabar");
  boton.addEventListener("click", itemNuevo, false);
}
function itemNuevo() {
  var clave = document.getElementById("clave").value;
  var valor = document.getElementById("valor").value;
  localStorage.setItem(clave, valor);
  //localStorage[clave] = valor;
  leerMostrar(clave);
  document.getElementById("clave").value = "";
  document.getElementById("valor").value = "";
}
function leerMostrar(clave) {
  var zonadatos = document.getElementById("zonadatos");
  //var valor = localStorage[clave];
  zonadatos.innerHTML = '<div><button onclick="eliminar()">Eliminar todo</button></div>';
  for (var i = 0; i < localStorage.length; i++) {
    var clave = localStorage.key(i);
    var valor = localStorage.getItem(clave);
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
    localStorage.clear();
    leerMostrar();
  }
}
function eliminarItem(clave) {
  if (confirm("¿Seguro?")) {
    localStorage.removeItem(clave);
    leerMostrar();
  }
}
window.addEventListener("load", comenzar, false);
