const persona = localStorage.getItem("usuario_registrado");
const seccion_bienvenido= document.getElementById("seccion-bienvenido");

const seccion_rendimiento= document.getElementById("seccion_rendimiento");

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


const seccion_retroalimentacion=document.getElementById("seccion-retroalimentacion");

function mostrar_respuestas_incorrectas(){
    const preguntas_incorrectas_localstorage= localStorage.getItem("quiz_respondido_incorrectamente");
    
    if(!preguntas_incorrectas_localstorage){
        seccion_retroalimentacion.innerHTML= `
            <div class="row ">
                <div class="col p-3 bg-white border rounded-3 shadow-sm" style="max-width: 1000px;">
                    <p class="fw-bold">Aun no realizanste Quiz...</p>
                </div>
            </div>
        `;
        console.log("hola desde mostrar repsuestas incorrectas retroalimentacion")
        return;
    }

    
    const preguntas_incorrectas = JSON.parse(preguntas_incorrectas_localstorage);

    seccion_retroalimentacion.innerHTML = "";
    preguntas_incorrectas.forEach(dato =>{
        
        seccion_retroalimentacion.innerHTML+=`
            <div class="row mb-3">
                <div class="col p-3 bg-white border rounded-3 shadow-sm" style="max-width: 1200px;">
                    <p><span class="fw-bold">Pregunta:</span> ${dato.pregunta}</p>

                    <p class="m-0 ">
                    <span class="fw-bold">Respuesta Correcta:</span> <span class="respuesta pregunta_ocultada"> ${dato.respuesta_correcta}</span>
                    </p>

                    <div class="d-flex justify-content-end ">
                        <button type="button" class="btn btn_mostrar_respuesta btn-sm mostrar-respuesta" style="width: 170px; height: 35px;">mostrar respuesta</button>
                    </div>
                </div>
            </div>
            `;        
    });

}

mostrar_respuestas_incorrectas();


const boton_mostrar_respuesta=document.querySelectorAll(".mostrar-respuesta");
boton_mostrar_respuesta.forEach(boton => {
    boton.addEventListener("click", () => {
        const contenedor= boton.closest(".col");
        console.log(contenedor)
        const respuesta= contenedor.querySelector(".respuesta");

        respuesta.classList.toggle("pregunta_ocultada");

        if(respuesta.classList.contains("pregunta_ocultada")) {
            boton.textContent="mostrar respuesta";
        }else{
            boton.textContent="ocultar respuesta";
        }

    });
});




function mostrar_rendimieto_usuario() { 
    const datos_rendimiento = localStorage.getItem("dato_rendimiento");

    if (datos_rendimiento) {
        const dato_rendimiento_json = JSON.parse(datos_rendimiento);

        // Comparamos el objeto "actual" con el "maximo" acumulado      //esto full IA tengo que realizarlo con mi logica
        const objeto_mayor = dato_rendimiento_json.reduce((maximo, actual) => {
            return (actual.puntaje > maximo.puntaje) ? actual : maximo;
        });

        const objeto_menor = dato_rendimiento_json.reduce((minimo, actual) => {
            return (actual.puntaje < minimo.puntaje) ? actual : minimo;
        });

        console.log(`El puntaje mayor es de ${objeto_mayor.puntaje} en la categoría: ${objeto_mayor.categoria}`);

        seccion_rendimiento.innerHTML=`
        <p class="m-0 fw-bold"><span class="color_morado_redimiento ">Area mas destacada:</span> ${objeto_mayor.categoria}</p>
        <p class="m-0 fw-bold"><span class="color_morado_redimiento ">Area más debil:</span> ${objeto_menor.categoria}</p>
        `;

    }
}


mostrar_rendimieto_usuario()



//hacer el progreso
const seccion_nivel=document.getElementById("seccion-nivel");

let rango=["Novato","principiante", "avanzado"];    // rango de avance: 0-10, 11-30, 31-infinito. (puntaje correcto)
function revision_rango(){
    const rendimiento_localstorage = localStorage.getItem("dato_rendimiento");
    const rendimiento_localstorage_json = JSON.parse(rendimiento_localstorage);
    
    if(!rendimiento_localstorage) {
        console.log("no hay datos en localStorage.");
        return 0; 
    }

    let respuestas_total=0;

    for(let i=0; i<rendimiento_localstorage_json.length; i++){
        const puntaje=rendimiento_localstorage_json[i].puntaje;

        respuestas_total= respuestas_total+puntaje;

    }

    const novato=10;
    const principiante=30;
    const avanzado=50;
    

    if(respuestas_total<= 10){
        const puntos_faltante=novato-respuestas_total;

        seccion_nivel.innerHTML=`
        <p class="m-0 fw-bold"><span class="color_morado_redimiento">Rango:</span> Novato</p>
        <p class="m-0 ">Tienes ${respuestas_total} puntos, te faltan ${puntos_faltante} para el siguiente nvl</p>
        `;
    }
    if( respuestas_total>=11 && respuestas_total<=30){
        const puntos_faltante=principiante-respuestas_total;
        seccion_nivel.innerHTML=`
        <p class="m-0 fw-bold"><span class="color_morado_redimiento">Rango:</span> Principiante</p>
        <p class="m-0 ">Tienes ${respuestas_total} puntos, te faltan ${puntos_faltante} para el siguiente nvl</p>
        `;
    }
    if(respuestas_total>=31){

        seccion_nivel.innerHTML=`
        <p class="m-0 fw-bold"><span class="color_morado_redimiento">Rango:</span> Avanzado</p>
        <p class="m-0 ">Llegaste al nivel mas alto </p>
        `;
    }
    return;

}



revision_rango();