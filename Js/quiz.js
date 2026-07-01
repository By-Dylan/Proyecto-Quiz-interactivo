
const seccion_cargando = document.getElementById("seccion-cargando");
const seccion_quiz = document.getElementById("seccion-quiz"); 
const seccionCorrectoIncorrectoError = document.getElementById("modalCorrectoIncorrectoError");

let preguntasDelQuiz = [];
let pregunta_actual_indice = 0; 
let puntaje = 0;
let opcionSeleccionada = "";
let respuestaCorrecta = "";
let indicePreguntaActual = 0;
const cNombre = localStorage.getItem("categoriaNombre");
const idAPI = localStorage.getItem("categoriaID");
const nivelDificultad = localStorage.getItem("dificultadSeleccionada");


if (cNombre && idAPI) {
    console.log("Nombre e ID de la categoría y nivel de dificultad obtenidos correctamente: " + cNombre + ", " + idAPI + ", " + nivelDificultad);
} else {
    console.log("No se lograron cargar los datos.");
}


window.realizar_nuevamente_quiz = generarQuiz;

generarQuiz(idAPI, nivelDificultad); 

async function generarQuiz(idAPI, nivelDificultad) {
    seccion_cargando.classList.remove("ocultar-circulo-cargando");

    try {
        const api_quiz = await fetch(`https://opentdb.com/api.php?amount=10&category=${idAPI}&difficulty=${nivelDificultad}&type=multiple&encode=url3986`);
        if (!api_quiz.ok) {
            throw new Error("Hubo un error en la peticion de la api");
        }

        const contenido_json = await api_quiz.json();
        console.log("datos de la api: ", contenido_json);

        const preguntas = contenido_json.results;
        
        console.log("********************");
        console.log("Traduciendo el array de preguntas... Por favor espera.");

        const preguntasTraducidas = [];
        const correo = "martyhonores2405@gmail.com";
        
        for (let i = 0; i < preguntas.length; i++) {

            const preguntaIngles = decodeURIComponent(preguntas[i].question);
            const urlProg = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(preguntaIngles)}&langpair=en|es&de=${correo}`;
            const resPreg = await fetch(urlProg);
            const datosPreg = await resPreg.json();
            const preguntaEspanol = datosPreg.responseData.translatedText;

            const correctaIngles = decodeURIComponent(preguntas[i].correct_answer);
            const urlCorr = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(correctaIngles)}&langpair=en|es&de=${correo}`;
            const resCorr = await fetch(urlCorr);
            const datosCorr = await resCorr.json();
            const correctaEspanol = datosCorr.responseData.translatedText;

            const incorrectasEspanol = [];
            for (let j = 0; j < preguntas[i].incorrect_answers.length; j++) {
                const incIngles = decodeURIComponent(preguntas[i].incorrect_answers[j]);
                const urlInc = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(incIngles)}&langpair=en|es&de=${correo}`;
                const resInc = await fetch(urlInc);
                const datosInc = await resInc.json();
                incorrectasEspanol.push(datosInc.responseData.translatedText);
            }

            preguntasTraducidas.push({
                categoria: decodeURIComponent(preguntas[i].category),
                tipo: decodeURIComponent(preguntas[i].type),
                dificultad: decodeURIComponent(preguntas[i].difficulty),
                pregunta: preguntaEspanol,
                respuesta_correcta: correctaEspanol,
                respuestas_incorrectas: incorrectasEspanol
            });
            console.log(`Progreso: ${i + 1}/10 traducidas.`);
        }

        console.log("********************");
        console.log("Variable preguntasTraducidas:", preguntasTraducidas);
        
        preguntasDelQuiz = preguntasTraducidas;
        iniciarTiempo();
        //inicializamos el quiz mostrando la primera pregunta
        indicePreguntaActual = 0;
        mostrarPregunta(indicePreguntaActual);
        
    } catch (e) {
        console.log("Error en el proceso: ", e);
    }
}


//martina
function mostrarPregunta(indice) {
    configurarBarraProgreso(indice, preguntasDelQuiz);
    opcionSeleccionada = "";
    respuestaCorrecta = "";

    seccion_cargando.classList.add("ocultar-circulo-cargando");

    
    if (indice >= preguntasDelQuiz.length) {
        detenerTiempo();
        resultados_quiz();
        return;
    }

    
    const dato= preguntasDelQuiz[indice];
    
    const todasLasRespuestas = [...dato.respuestas_incorrectas, dato.respuesta_correcta];
    todasLasRespuestas.sort(() => Math.random() - 0.5);

    
    seccion_quiz.innerHTML = ` <picture>
        <img src="/Img/Banner Proyecto Quiz Interactivo.png" class="img-fluid img-banner" alt="Banner de QuizMind">
    </picture>

    <div class="row">
        <h4 class="category-title">${dato.categoria}</h4> 
    </div>
    <div class="row">
        <h3 class="question-title">${dato.pregunta}</h3> 
    </div>

    <div class="btn-group-horizontal  text-center" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary alternativa-a btn-opcion">${todasLasRespuestas[0]}</button>
        <button type="button" class="btn btn-primary alternativa-b btn-opcion">${todasLasRespuestas[1]}</button>
    </div>
    <div class="btn-group-horizontal  text-center" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary alternativa-c btn-opcion">${todasLasRespuestas[2]}</button>
        <button type="button" class="btn btn-primary alternativa-d btn-opcion">${todasLasRespuestas[3]}</button>
    </div>
    
    <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary saltar" onclick="configurarBotonSaltar()">Saltar</button>
        <button type="button" class="btn btn-primary siguiente" onclick="configurarBotonSiguiente()">Siguiente</button>
    </div>
    `;

    configurarBotonesOpcion();
    respuestaCorrecta = dato.respuesta_correcta;
    return respuestaCorrecta;
}

function configurarBotonesOpcion() {
    const botones = document.querySelectorAll('.btn-opcion');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.target.style.border = "3px solid black"; 
            opcionSeleccionada = e.target.innerText;
        });
    });
}


function configurarBotonSiguiente() {
    if (opcionSeleccionada === "") {
        seccionCorrectoIncorrectoError.innerHTML = `
            <div class="modal d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="border: none;">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="cerrarModal('modalCorrectoIncorrectoError')" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Debe escoger una alternativa. De lo contrario, presione Saltar.</p>
                        </div>
                        <div class="modal-footer" style="border: none;"></div>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    if (opcionSeleccionada === respuestaCorrecta) {
        seccionCorrectoIncorrectoError.innerHTML = `
            <div class="modal d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="border: none;">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="cerrarModal('modalCorrectoIncorrectoError')" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Correcto!</p>
                        </div>
                        <div class="modal-footer" style="border: none;"></div>
                    </div>
                </div>
            </div>
        `;
    } else {
        seccionCorrectoIncorrectoError.innerHTML = `
            <div class="modal d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="border: none;">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="cerrarModal('modalCorrectoIncorrectoError')" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Incorrecto :(</p>
                        </div>
                        <div class="modal-footer" style="border: none;"></div>
                    </div>
                </div>
            </div>
        `;
    }
    pasarSiguientePregunta();
}

function pasarSiguientePregunta() {
    indicePreguntaActual++;
    mostrarPregunta(indicePreguntaActual);
}


function configurarBotonSaltar() {
    if (opcionSeleccionada != "") {
        seccionCorrectoIncorrectoError.innerHTML = `
            <div class="modal d-block" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header" style="border: none;">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="cerrarModal('modalCorrectoIncorrectoError')" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Ya marcaste una respuesta. Presione Siguiente.</p>
                        </div>
                        <div class="modal-footer" style="border: none;"></div>
                    </div>
                </div>
            </div>
        `;
        return;
    } else {
        pasarSiguientePregunta();
    }
}
const cerrarModal = (idContenedor) => {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        contenedor.innerHTML = "";
    }
};
//Logica: Configuracion barra de progreso: TODAVIA NO FUNCIONA
function configurarBarraProgreso(indice, preguntasDelQuiz){
    const barraProgreso = document.getElementById("barraProgreso");
    let porcentaje = (indice + 1) / preguntasDelQuiz.length * 100;
    barraProgreso.style.width = `${porcentaje}%`;
    barraProgreso.style.backgroundColor = "#A15100;";
}
//Logica: Configuracion del tiempo
let totalSegundos = 0;
let tiempoQuiz;
function iniciarTiempo(){
    totalSegundos = 0;
    const spanTiempo = document.getElementById("spanTiempo");
    clearInterval(tiempoQuiz); //sirve para limpiar el tiempo si es que quedo guardado
    tiempoQuiz = setInterval(() => {
        totalSegundos++;
        let minutos = Math.floor(totalSegundos / 60);
        let segundos = totalSegundos % 60;
        spanTiempo.innerHTML = `${minutos}:${segundos}`;
    }, 1000)
}
function detenerTiempo(){
    clearInterval(tiempoQuiz);
    localStorage.setItem("tiempoQuiz", totalSegundos);

}
function resultados_quiz() {
    seccion_quiz.innerHTML = `
        <div class="results">
            <div class="result-icon">
                <i class="bi bi-hourglass-split"></i>
            </div>
            <div class="score">Tu resultado es: ${puntaje}/${preguntasDelQuiz.length}</div>
            
            <button class="btn btn-primary" onclick="window.location.href = 'index.html';">salir</button>
            <button class="btn btn-primary" onclick="location.reload()">Intentar otra vez</button>
        </div>
    `;
}