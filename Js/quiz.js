const seccion_quiz= document.getElementById("seccion-quiz"); //IMPORTANTE: Localstorage se lleva y trae datos SIEMPRE como string
if(!seccion_quiz){ //verificamos que exista el contenedor
    console.log("No existe la sección para el quiz en el html.");
}
//1) Obtenemos el nombre e id de la categoria guardados en el localstorage en el main.js con el metodo getItem y el nombre de la variable que usamos en el otro script
const cNombre = localStorage.getItem("categoriaNombre");
const idAPI = localStorage.getItem("categoriaID");
const nivelDificultad = localStorage.getItem("dificultadSeleccionada");
if(cNombre && idAPI){
    console.log("Nombre e ID de la categoría y nivel de dificultad obtenidos correctamente: " + cNombre + ", " + idAPI + ", " + nivelDificultad);
} else{
    console.log("No se lograron cargar los datos.");
}
//Función: Seleccion nivel de dificultad
//3) Función asincrónica a cargo de cargar las preguntas del quiz y generar la estructura html respectiva
async function generarQuiz(idAPI, nivelDificultad){
    //Le pasamos el nidel de dificultad a la API 
    try {
    const api_quiz = await fetch(`https://opentdb.com/api.php?amount=10&category=${idAPI}&difficulty=${nivelDificultad}&type=multiple&encode=url3986`);
    if(!api_quiz.ok){
        throw new Error("Hubo un error en la peticion de la api");
    }

    const contenido_json = await api_quiz.json();
    console.log("datos de la api: ", contenido_json);

    const preguntas = contenido_json.results;
    
    console.log("********************");
    console.log("Traduciendo el array de preguntas... Por favor espera.");

    // Variable donde se guardará todo el array traducido
    const preguntasTraducidas = [];
    const correo = "martyhonores2405@gmail.com";
    for (let i = 0; i < preguntas.length; i++) {
        // 1. Decodificar y traducir la PREGUNTA
        const preguntaIngles = decodeURIComponent(preguntas[i].question);
        const urlProg = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(preguntaIngles)}&langpair=en|es&de=${correo}`;
        const resPreg = await fetch(urlProg);
        const datosPreg = await resPreg.json();
        const preguntaEspanol = datosPreg.responseData.translatedText;

        // 2. Decodificar y traducir la RESPUESTA CORRECTA
        const correctaIngles = decodeURIComponent(preguntas[i].correct_answer);
        const urlCorr = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(correctaIngles)}&langpair=en|es&de=${correo}`;
        const resCorr = await fetch(urlCorr);
        const datosCorr = await resCorr.json();
        const correctaEspanol = datosCorr.responseData.translatedText;

        // 3. Decodificar y traducir las RESPUESTAS INCORRECTAS (es un array)
        const incorrectasEspanol = [];
        for (let j = 0; j < preguntas[i].incorrect_answers.length; j++) {
            const incIngles = decodeURIComponent(preguntas[i].incorrect_answers[j]);
            const urlInc = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(incIngles)}&langpair=en|es&de=${correo}`;
            const resInc = await fetch(urlInc);
            const datosInc = await resInc.json();
            incorrectasEspanol.push(datosInc.responseData.translatedText);
        }

        // 4. Guardar el objeto estructurado en nuestro nuevo array
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

    // Aquí ya tienes todo guardado en la variable list para usar en tu app
    console.log("********************");
    console.log("¡Traducción completada con éxito!");
    console.log("Variable 'preguntasTraducidas':", preguntasTraducidas);
    preguntasDelQuiz = preguntasTraducidas;
    // Inicializamos el quiz mostrando la primera pregunta (índice 0)
        indicePreguntaActual = 0;
        mostrarPregunta(indicePreguntaActual);
    } catch (e) {
        console.log("Error en el proceso: ", e);
    }
}
// NUEVA FUNCIÓN: Se encarga de pintar una sola pregunta en pantalla
function mostrarPregunta(indice) {
    // Validar que no hayamos llegado al final de las 10 preguntas
    if (indice >= preguntasDelQuiz.length) {
        seccion_quiz.innerHTML = "<h2>¡Felicidades! Has terminado el quiz.</h2>";
        return;
    }

    // Obtener los datos de la pregunta actual
    const dato = preguntasDelQuiz[indice];

    // Juntar la respuesta correcta y las incorrectas en un solo array y mezclarlas
    const todasLasRespuestas =[...dato.respuestas_incorrectas, dato.respuesta_correcta];
    todasLasRespuestas.sort(() => Math.random() - 0.5); // Truco rápido para mezclar el array

    // Insertar en el HTML usando "=" (reemplaza lo anterior, no lo acumula)
    seccion_quiz.innerHTML = `
    <picture>
        <img src="/Img/Banner Proyecto Quiz Interactivo.png" class="img-fluid img-banner" alt="Banner de QuizMind">
    </picture>

    <div class="row">
        <h4 class="category-title">${dato.categoria}</h4> 
    </div>
    <div class="row">
        <h3 class="question-title">${dato.pregunta}</h3> 
    </div>

    <div class="btn-group-horizontal  text-center" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary alternativa-a">${todasLasRespuestas[0]}</button>
        <button type="button" class="btn btn-primary alternativa-b">${todasLasRespuestas[1]}</button>
    </div>
    <div class="btn-group-horizontal  text-center" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary alternativa-c">${todasLasRespuestas[2]}</button>
        <button type="button" class="btn btn-primary alternativa-d">${todasLasRespuestas[3]}</button>
    </div>
        <!--botones de saltar y siguiente-->
    <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary saltar" onclick="pasarSiguientePregunta()">Saltar</button>
        <button type="button" class="btn btn-primary siguiente" onclick="pasarSiguientePregunta()">Siguiente</button>
    </div>
    
    `;

    // Asignar eventos para verificar si la respuesta es correcta
    configurarBotonesOpcion(dato.respuesta_correcta);
}
// FUNCIÓN PARA AVANZAR
function pasarSiguientePregunta() {
    indicePreguntaActual++;
    mostrarPregunta(indicePreguntaActual);
}

// FUNCIÓN PARA COMPROBAR LA RESPUESTA SELECCIONADA
function configurarBotonesOpcion(respuestaCorrecta) {
    const botones = document.querySelectorAll('.btn-opcion');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const opcionSeleccionada = e.target.innerText;
            
            if (opcionSeleccionada === respuestaCorrecta) {
                alert("Correcto");
            } else {
                alert(`Incorrecto`);
            }
            
            // Avanzar automáticamente tras responder
            pasarSiguientePregunta();
        });
    });
}
//Llamado a la fn
generarQuiz(idAPI, nivelDificultad); //sera la funcion general para todas las categoria