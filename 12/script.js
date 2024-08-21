function ejecuta(){
    
    // for(var i=0;i<3;i++){
    //     document.getElementsByTagName("p")[i].onclick=saludo;
    // }
    
    // document.getElementById("importante").onclick=saludo;
    //document.getElementsByClassName("TODO")[0].onclick=saludo;
   // document.querySelector(".TODO").onclick=saludo;
   // document.querySelector("#principal p:last-child").onclick=saludo;
   var elementos = document.querySelectorAll("#principal p, span"); 
   for(var i=0;i<elementos.length;i++){
        elementos[i].onclick=saludo;
    }
    
}



function saludo(){
    alert("Hola mundo");
}

window.onload=ejecuta;