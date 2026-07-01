const persona = localStorage.getItem("usuario_registrado");
const seccion_bienvenido= document.getElementById("seccion-bienvenido");

if(persona){
    const usuario= JSON.parse(persona);
    
    seccion_bienvenido.innerHTML +=`
        <div class="col-8">
                <h1 class="text-start">Bienvenido, ${usuario.nombre}</h1>
        </div>
        <div class="col-4">
        </div>
    `;

    console.log(usuario.nombre, usuario.gmail, usuario.contraseña);
}
//Lógica: Gráfico de estadísticas 1 
const datosEstadistica1 = localStorage.getItem("listaDificultades") || "[]";
const datosEstadistica1Array = JSON.parse(datosEstadistica1); //pasa de string hacia array
let cFacil = 0;
let cMedio = 0;
let cDificil = 0;
datosEstadistica1Array.forEach((dificultad) => {
    if(dificultad === "easy"){
        cFacil ++;
    } else if(dificultad === "medium"){
        cMedio ++;
    } else{
        cDificil ++;
    }
});
console.log(`Facil: ${cFacil}, Media: ${cMedio}, Dificil: ${cDificil}`);
//Diseño de la grafica
const canvas1 = document.getElementById("idEstadistica1").getContext("2d");
let chart1 = new Chart(canvas1, {
    type: "bar", 
    data: {
        labels : ["Fácil", "Media", "Difícil"],
        datasets:[
            {
                label: "Niveles de dificultad",
                backgroundColor: "#06B6D4",
                borderColor: "#7C3AED",
                borderWidth: 3,
                data: [cFacil, cMedio, cDificil]
            }
        ]
    }
}); //


