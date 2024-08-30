function comenzar() {
  zonadatos = document.getElementById("zonadatos");
  var boton = document.getElementById("boton");
  boton.addEventListener("click", crear, false);
  document.getElementById("botonDir").addEventListener("click", crearDir, false);
  document.getElementById("botonDel").addEventListener("click", borrar, false);
  document.getElementById("botonBack").addEventListener("click", volver, false);
  document.getElementById("botonMove").addEventListener("click", mover, false);
  document.getElementById("botonRead").addEventListener("click", leerFichero, false);
  navigator.webkitPersistentStorage.requestQuota(5 * 1024 * 1024, acceso);
}

function acceso() {
  window.webkitRequestFileSystem(PERSISTENT, 5 * 1024 * 1024, crearsis, errores);
}
function crearsis(sistema) {
  espacio = sistema.root;
  ruta = "";
  mostrar();
}
function crear() {
  var nombreArchivo = document.getElementById("entrada").value;
  if (nombreArchivo != "") {
    nombreArchivo = ruta + nombreArchivo;
    espacio.getFile(nombreArchivo, { create: true, exclusive: false }, mostrar, errores);
  }
}
function crearDir() {
  var nombreArchivo = document.getElementById("entrada").value;
  if (nombreArchivo != "") {
    nombreArchivo = ruta + nombreArchivo;
    espacio.getDirectory(nombreArchivo, { create: true, exclusive: false }, mostrar, errores);
  }
}
function actualizaRuta() {
  var textoruta = document.getElementById("ruta");
  textoruta.innerHTML = "<span>" + ruta + "</span>";
}
function mostrar() {
  document.getElementById("entrada").value = "";
  zonadatos.innerHTML = "";
  espacio.getDirectory(ruta, null, leerDir, errores);
}
function leerDir(directorio) {
  lector = directorio.createReader();
  leer();
}
function leer() {
  lector.readEntries(function (archivos) {
    if (archivos.length) {
      listar(archivos);
    }
  }, errores);
}
function listar(archivos) {
  for (var i = 0; i < archivos.length; i++) {
    if (archivos[i].isFile) {
      zonadatos.innerHTML += archivos[i].name + "<br>";
    } else if (archivos[i].isDirectory) {
      zonadatos.innerHTML +=
        "<span onclick='cambiardir(\"" +
        archivos[i].name +
        "\")' class='directorio'>" +
        archivos[i].name +
        "</span><br>";
    }
  }
}
function cambiardir(nuevaruta) {
  if (ruta[ruta.length - 1] == "/") {
    ruta = ruta + nuevaruta + "/";
  } else {
    ruta = ruta + "/" + nuevaruta + "/";
  }
  mostrar();
  actualizaRuta();
}
function volver() {
  espacio.getDirectory(
    ruta,
    null,
    function (dirActual) {
      dirActual.getParent(function (dirPadre) {
        ruta = dirPadre.fullPath;
        mostrar();
        actualizaRuta();
      }, errores);
    },
    errores
  );
}
function mover() {
  var origen = document.getElementById("archivo").value;
  var destino = document.getElementById("directorio").value;
  espacio.getFile(
    origen,
    null,
    function (archivo) {
      espacio.getDirectory(
        destino,
        null,
        function (directorio) {
          archivo.moveTo(directorio, null, exito, errores);
        },
        errores
      );
    },
    errores
  );
}
function borrar() {
  var origen = document.getElementById("borrado").value;
  origen = ruta + origen;
  espacio.getFile(
    origen,
    null,
    function (archivo) {
      archivo.remove(exito, errores);
    },
    errores
  );
}
function leerFichero() {
  var archivo = document.getElementById("lectura").value;
  archivo = ruta + archivo;
  var lector = new FileReader();
  lector.onload = function (e) {
    var resultado = e.target.result;
    document.getElementById("lectura").value = "";
    document.getElementById("contFich").innerHTML = "Contenido: " + resultado;
  };
  lector.readAsText(archivo);
}
function exito() {
  document.getElementById("entrada").value = "";
  document.getElementById("borrado").value = "";
  document.getElementById("archivo").value = "";
  document.getElementById("directorio").value = "";
  alert("Operación realizada con éxito");
  mostrar();
  actualizaRuta();
}
function errores(e) {
  alert("Ha habido un error: " + e.code);
  console.error(e);
}
window.addEventListener("load", comenzar, false);
