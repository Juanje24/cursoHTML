function iniciar() {
  zonadatos = document.getElementById("zonadatos");
  boton = document.getElementById("grabar");
  boton.addEventListener("click", agregarDB, false);
  var solicitud = indexedDB.open("miBD");
  solicitud.onsuccess = function (e) {
    bd = e.target.result;
  };
  solicitud.onupgradeneeded = function (e) {
    bd = e.target.result;
    if (!bd.objectStoreNames.contains("gente")) {
      bd.createObjectStore("gente", { keyPath: "clave" });
    }
  };
}
function agregarDB() {
  var clave = document.getElementById("clave").value;
  var titulo = document.getElementById("texto").value;
  var fecha = document.getElementById("fecha").value;
  if (clave === "") {
    alert("La clave es obligatoria");
    return;
  }

  var transaccion = bd.transaction(["gente"], "readwrite");
  var almacen = transaccion.objectStore("gente");
  var agregar = almacen.add({ clave: clave, titulo: titulo, fecha: fecha });
  agregar.onsuccess = function () {
    mostrar();
    console.log("Registro agregado con éxito");
  };

  agregar.onerror = function (e) {
    console.error("Error al agregar el registro: ", e.target.error);
  };
  document.getElementById("clave").value = "";
  document.getElementById("texto").value = "";
  document.getElementById("fecha").value = "";
}
function mostrar() {
  zonadatos.innerHTML = "";
  var transaccion = bd.transaction(["gente"], "readonly");
  var almacen = transaccion.objectStore("gente");
  var cursor = almacen.openCursor();
  cursor.addEventListener("success", muestraDatos, false);
}
function muestraDatos(e) {
  var cursor = e.target.result;
  if (cursor) {
    zonadatos.innerHTML +=
      "<div>" + cursor.value.clave + " - " + cursor.value.titulo + " - " + cursor.value.fecha + " </div>";
    cursor.continue();
  }
}
window.addEventListener("load", iniciar, false);
