// Seleccionamos todas tus tarjetas por su clase real
const area_categorias = document.querySelectorAll(".seccion-categoria");
const seccion_quiz=document.getElementById("seccion-quiz");
const seccion_cargando= document.getElementById("seccion-cargando");

area_categorias.forEach(area => {
    area.addEventListener("click", () => {
        const padre_categorias= area.closest("#menu-seleccion"); //closest sirve para buscar al padre del contenedor 
        padre_categorias.classList.add("ocultar_categorias_quiz");

        seccion_cargando.classList.remove("ocultar-circulo-cargando");
    });
});


// Hace que la función esté disponible para los onclick del HTML
window.quiz_informatica = quiz_informatica;

// VARIABLES GLOBALES DE ESTADO
let preguntas_respuestas_quiz= []; // Aquí guardaremos el array completo ya traducido
let pregunta_actual_indice= 0; // Controla qué pregunta se está mostrando (empieza en 0)
let puntaje= 0;

async function quiz_informatica() {
    seccion_cargando.classList.remove("ocultar-circulo-cargando");
    seccion_quiz.innerHTML ="";

    try {
        const api_quiz = await fetch("https://opentdb.com/api.php?amount=10&category=19&difficulty=easy&type=multiple&encode=url3986");
        if (!api_quiz.ok) {
            throw new Error("Hubo un error en la petición de la API");
        }

        const contenido_json = await api_quiz.json();
        const preguntas = contenido_json.results;
        


        // ... [AQUÍ VA TODO TU BUCLE FOR ACTUAL QUE TRADUCE LAS PREGUNTAS] ...
        // (Mantenlo exactamente igual a como lo tenías)
        const preguntas_traducidas= [];
        const correo = "medinadilan07@gmail.com";

            for (let i = 0; i < preguntas.length; i++) {
                // 1. Decodificar y traducir la PREGUNTA
                const preguntaIngles= decodeURIComponent(preguntas[i].question);
                const urlProg= `https://api.mymemory.translated.net/get?q=${encodeURIComponent(preguntaIngles)}&langpair=en|es&de=${correo}`;
                const resPreg= await fetch(urlProg);
                const datosPreg= await resPreg.json();
                const preguntaEspanol= datosPreg.responseData.translatedText;

                // 2. Decodificar y traducir la RESPUESTA CORRECTA
                const correctaIngles = decodeURIComponent(preguntas[i].correct_answer);
                const urlCorr = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(correctaIngles)}&langpair=en|es&de=${correo}`;
                const resCorr = await fetch(urlCorr);
                const datosCorr = await resCorr.json();
                const correctaEspanol = datosCorr.responseData.translatedText;

                // 3. Decodificar y traducir las RESPUESTAS INCORRECTAS (es un array)
                const respuestas_incorrectas_español= [];
                for (let j= 0; j < preguntas[i].incorrect_answers.length; j++) {
                    const incIngles = decodeURIComponent(preguntas[i].incorrect_answers[j]);
                    const urlInc = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(incIngles)}&langpair=en|es&de=${correo}`;
                    const resInc = await fetch(urlInc);
                    const datosInc = await resInc.json();
                    respuestas_incorrectas_español.push(datosInc.responseData.translatedText);
                }

                // 4. Guardar el objeto estructurado en nuestro nuevo array
                preguntas_traducidas.push({categoria: decodeURIComponent(preguntas[i].category),
                    tipo: decodeURIComponent(preguntas[i].type),
                    dificultad: decodeURIComponent(preguntas[i].difficulty),
                    pregunta: preguntaEspanol,
                    respuesta_correcta: correctaEspanol,
                    respuestas_incorrectas: respuestas_incorrectas_español
                });

                console.log(`Progreso: ${i + 1}/10 traducidas.`);
            }

            console.log("********************");
            console.log("traduccion preguntas':", preguntas_traducidas);

        preguntas_respuestas_quiz = preguntas_traducidas; //preguntas_respuestas_quiz, nuestra array global de preguntas y respuestas
        
        // Inicializamos el quiz mostrando la primera pregunta (índice 0)
        pregunta_actual_indice= 0;
        mostrar_preguntas(pregunta_actual_indice);

    } catch (e) {
        console.log("Error en el proceso: ", e);
    }
}

// NUEVA FUNCIÓN: Se encarga de pintar una sola pregunta en pantalla
function mostrar_preguntas(indice) {
    // Validar que no hayamos llegado al final de las 10 preguntas
    if (indice >= preguntas_respuestas_quiz.length) {
        resultados_quiz();
        return;
    }

    // Obtener los datos de la pregunta actual
    const dato= preguntas_respuestas_quiz[indice]; //estuadiar las 3 lineas de abajo
    

    // Juntar la respuesta correcta y las incorrectas en un solo array y mezclarlas
    const todasLasRespuestas =[...dato.respuestas_incorrectas, dato.respuesta_correcta];

    todasLasRespuestas.sort(() => Math.random() - 0.5); // Truco rápido para mezclar el array


    //aca quito el circulo cargando
    seccion_cargando.classList.add("ocultar-circulo-cargando");


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
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[0]}</button>
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[1]}</button>
    </div>
    <div class="btn-group-horizontal  text-center" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[2]}</button>
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[3]}</button>
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
    pregunta_actual_indice++;
    mostrar_preguntas(pregunta_actual_indice);
}

// FUNCIÓN PARA COMPROBAR LA RESPUESTA SELECCIONADA
function configurarBotonesOpcion(respuestaCorrecta) {
    const botones = document.querySelectorAll('.btn-opcion');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const opcionSeleccionada = e.target.innerText;
            
            if (opcionSeleccionada === respuestaCorrecta) {
                alert("correcto");
                puntaje++;

            } else {
                alert(`Incorrecto. La respuesta era: ${respuestaCorrecta}`);
            }
            
            // Avanzar automáticamente tras responder
            pasarSiguientePregunta();
        });
    });
}


function resultados_quiz() {
    seccion_quiz.innerHTML = `
                <div class="results">
                    <div class="result-icon">
                        <i class="bi bi-hourglass-split"></i>
                    </div>
                    <div class="score">Tu resultado es: ${puntaje}/${preguntas_respuestas_quiz.length}</div>
                    
                    <button class="btn btn-primary" onclick="quiz_informatica()">Intentar otra vez</button>
                    <button class="btn btn-primary"" onclick="location.reload()">Salir</button>
                </div>
            `;
}


//nueva funcionalidad posible reportar alguna pregunta con resultado incorrecto





function mezclar_respuestas(array){     //funcion para mezclar => cambiar por el mezclador que ocupamos
    let currentIndex = array.length;

  // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

// Used like so
let arr = ["hola", "pe", "causa", "mi bombo"];
mezclar_respuestas(arr);
console.log(arr);

