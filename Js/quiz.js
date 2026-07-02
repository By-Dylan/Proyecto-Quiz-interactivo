
const seccion_cargando = document.getElementById("seccion-cargando");
const seccion_quiz = document.getElementById("seccion-quiz"); 
const seccionCorrectoIncorrectoError = document.getElementById("modalCorrectoIncorrectoError");

let preguntasDelQuiz = [];
let pregunta_actual_indice = 0; 
let puntaje = 0;
let opcionSeleccionada = "";
let respuestaCorrecta = "";

let preguntas_incorrectas=[];

let rendimiento=[];

let informatica=0;
let ciencias=0;
let pelicula=0;
let geografia=0;
let musica=0;
let deportes=0;



let indicePreguntaActual = 0; //
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
        const correo = "martyhonores4564562405@gmail.com";
        
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
        iniciarTiempo(); //
        //inicializamos el quiz mostrando la primera pregunta
        indicePreguntaActual = 0;
        mostrarPregunta(indicePreguntaActual);
        
    } catch (e) {
        console.log("Error en el proceso: ", e);
    }
}
//Lógica: Imagenes segun la categoria en las preguntas
const imagenesCategorias = { //objeto que guarda las imagenes
    "18": "/Img/banner_Informática.jpg",
    "17": "/Img/banner_Ciencias.jpg",
    "11": "Img/banner_Películas.jpg",
    "22": "/Img/banner_Geografía.jpg",
    "12": "/Img/banner_Música.jpg",
    "21": "/Img/banner_Deportes.jpg"
}

function mostrarPregunta(indice) {
    configurarBarraProgreso(indice, preguntasDelQuiz); //
    opcionSeleccionada = "";
    respuestaCorrecta = "";

    seccion_cargando.classList.add("ocultar-circulo-cargando");

    
    if (indice >= preguntasDelQuiz.length) {
        detenerTiempo(); //
        guardar_datos_localstorage();
        resultados_quiz();
        extrae_guarda_redimiento_localstorage();
        return;
    }

    const imagenCategoria = imagenesCategorias[idAPI];
    const dato= preguntasDelQuiz[indice];
    const todasLasRespuestas = [...dato.respuestas_incorrectas, dato.respuesta_correcta];
    todasLasRespuestas.sort(() => Math.random() - 0.5);


    const categoria=localStorage.getItem("categoriaNombre"); //tipo de categoria para el banner
    console.log("cat:", categoria)
    
    seccion_quiz.innerHTML = ` <picture>
        <img src="${imagenCategoria}" class="img-quiz object-fit-cover" alt="Imágen referente a la categoría">
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
    // return respuestaCorrecta;
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


function configurarBotonSiguiente() {   ///de aca empezaria yo(dilan)
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
        puntaje++;

        guardar_rediemiento(cNombre);



    }else{
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
        const contenido_pregunta=preguntasDelQuiz[indicePreguntaActual];
        preguntas_incorrectas.push(contenido_pregunta)
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
//Logica: Configuracion barra de progreso: 
function configurarBarraProgreso(indice, preguntasDelQuiz){
    const barraProgreso = document.getElementById("barraProgreso");
    let porcentaje = (indice + 1) / preguntasDelQuiz.length * 100;
    barraProgreso.style.width = `${porcentaje}%`;
    barraProgreso.style.backgroundColor = "#A15100";
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
    let datosQuiz = localStorage.getItem("datosQuizes") || "[]"; //lista para añadir los datos
    let historialQuiz = JSON.parse(datosQuiz);
    let historialQuizActual = { //ver si es necesario añadir el puntaje, objeto con los datos
        "categoria": cNombre,
        "tiempo": totalSegundos,
    };
    historialQuiz.push(historialQuizActual); //añadimos el objeto a la lista
    localStorage.setItem("datosQuizes", JSON.stringify(historialQuiz)); //lo transformamos a texto para darselo al localstorage


} //
function resultados_quiz() {
    seccion_quiz.innerHTML = `
        <div class="results">
            <div class="result-icon">
                <i class="bi bi-hourglass-split"></i>
            </div>
            <div class="score">Tu resultado es: ${puntaje}/${preguntasDelQuiz.length}</div>
            
            <button class="btn btn-primary salir" onclick="window.location.href = 'index.html';">Salir</button>
            <button class="btn btn-primary intentarOtraVez" onclick="location.reload()">Intentar otra vez</button>
        </div>
    `;

}

function guardar_datos_localstorage(){  //guardo las preguntas donde se responda incorrectamente

    const preguntas_incorrectas_localstorage= localStorage.getItem("quiz_respondido_incorrectamente");
    if(preguntas_incorrectas_localstorage){

        const P_incorrectas_localstorage=JSON.parse(preguntas_incorrectas_localstorage);    //convierto de string a json
        const union_preguntas_incorretas = [...P_incorrectas_localstorage, ...preguntas_incorrectas];
        
        localStorage.setItem("quiz_respondido_incorrectamente", JSON.stringify(union_preguntas_incorretas));

    }else{
        localStorage.setItem("quiz_respondido_incorrectamente", JSON.stringify(preguntas_incorrectas));
    }
    
}



function guardar_rediemiento(nombre_categoria){
    console.log("hola desde guardar rendimiento:", nombre_categoria);
    if(nombre_categoria==="Informática"){
        informatica++;
        console.log("contador informatica:", informatica);
    }
    if(nombre_categoria==="Ciencias"){
        ciencias++;
    }
    if(nombre_categoria==="Película"){
        pelicula++;
    }
    if(nombre_categoria==="geografía"){
        geografia++;
    }
    if(nombre_categoria==="Música"){
        musica++;
    }
    if(nombre_categoria==="Deportes"){
        deportes++;
    }
    

}


function extrae_guarda_redimiento_localstorage() {
    const rendimiento_localstorage = localStorage.getItem("dato_rendimiento");

    if (!rendimiento_localstorage) {
        rendimiento = [
            { categoria: "informatica", puntaje: informatica },
            { categoria: "ciencias", puntaje: ciencias },
            { categoria: "pelicula", puntaje: pelicula },
            { categoria: "geografia", puntaje: geografia },
            { categoria: "musica", puntaje: musica },
            { categoria: "deportes", puntaje: deportes }
        ];
        
        localStorage.setItem('dato_rendimiento', JSON.stringify(rendimiento)); 
        console.log("Se guardaron los primeros datos como [{}, {}] en local...");
        return;
    }

    const rendimiento_localstorage_json = JSON.parse(rendimiento_localstorage);

    let suma_informatica = rendimiento_localstorage_json[0].puntaje + informatica;
    let suma_ciencias    = rendimiento_localstorage_json[1].puntaje + ciencias;
    let suma_pelicula    = rendimiento_localstorage_json[2].puntaje + pelicula;
    let suma_geografia   = rendimiento_localstorage_json[3].puntaje + geografia;
    let suma_musica      = rendimiento_localstorage_json[4].puntaje + musica;
    let suma_deportes    = rendimiento_localstorage_json[5].puntaje + deportes;

    //se sobre escribe con las sumas nuevas totales
    rendimiento = [
        { categoria: "informatica", puntaje: suma_informatica },
        { categoria: "ciencias", puntaje: suma_ciencias },
        { categoria: "pelicula", puntaje: suma_pelicula },
        { categoria: "geografia", puntaje: suma_geografia },
        { categoria: "musica", puntaje: suma_musica },
        { categoria: "deportes", puntaje: suma_deportes }
    ];

    localStorage.setItem('dato_rendimiento', JSON.stringify(rendimiento)); 
    
    console.log("Datos totales actualizados con estructura de objetos:", rendimiento);
}







