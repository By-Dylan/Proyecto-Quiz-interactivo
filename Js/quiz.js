// Seleccionamos todas tus tarjetas por su clase real
const areas = document.querySelectorAll(".seccion-categoria");
const seccion_quiz=document.getElementById("seccion-quiz");
areas.forEach(area => {
    area.addEventListener('click', function(evento) {

        const padrePrincipal = this.closest("#menu-seleccion"); 
        padrePrincipal.classList.add("ocultar_categorias_quiz");

    });
});



// seccion_quiz.addEventListener("click",()=>{
//     //aca de deberiamos borrar o oculat la seccion de eleccion de quiz(mate,historia,informatica)

//     //casos de lo que seleccione el usuario
//     const area_seleccionada = "matematica"; //ejemplo(matematica(deberia ir una variable))

//     switch (area_seleccionada) {
//     case "informatica":
//         console.log("entrada a test informatica");

//         quiz_informatica();

        
//         break;
//     case "ciencia":
//         console.log("A");
//         break;
//     case "peliculas":
//         console.log("A");
//         break;
//     case "geografia":
//         console.log("A");
//         break;
//     case "musica":
//         console.log("A");
//         break;
//     case "deporte":
//         console.log("A");
//         break;


//     default:
//         console.log("Rol no reconocido.");
//     }

// })

// async function quiz_informatica(){

//     //llmada a la api y verificar que tipo se seleccion hizo el usurio (facil,medio, avanzado)
//     //en el fech poner una variable de la api si es facil o hard.

//     try {
//     const api_quiz = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986");
//     if(!api_quiz.ok){
//             throw new Error("Hubo un error en la peticion de la api");
//     }

//     const contenido_json = await aapi_quiz.json();
//     console.log("datos de la api: ", contenido_json);

//     const preguntas = contenido_json.results;
    
//     console.log("********************");
//     console.log("Traduciendo el array de preguntas... Por favor espera.");

//     // Variable donde se guardará todo el array traducido
//     const preguntasTraducidas = [];

//     for (let i = 0; i < preguntas.length; i++) {
//         // 1. Decodificar y traducir la PREGUNTA
//         const preguntaIngles = decodeURIComponent(preguntas[i].question);
//         const urlProg = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(preguntaIngles)}&langpair=en|es`;
//         const resPreg = await fetch(urlProg);
//         const datosPreg = await resPreg.json();
//         const preguntaEspanol = datosPreg.responseData.translatedText;

//         // 2. Decodificar y traducir la RESPUESTA CORRECTA
//         const correctaIngles = decodeURIComponent(preguntas[i].correct_answer);
//         const urlCorr = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(correctaIngles)}&langpair=en|es`;
//         const resCorr = await fetch(urlCorr);
//         const datosCorr = await resCorr.json();
//         const correctaEspanol = datosCorr.responseData.translatedText;

//         // 3. Decodificar y traducir las RESPUESTAS INCORRECTAS (es un array)
//         const incorrectasEspanol = [];
//         for (let j = 0; j < preguntas[i].incorrect_answers.length; j++) {
//             const incIngles = decodeURIComponent(preguntas[i].incorrect_answers[j]);
//             const urlInc = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(incIngles)}&langpair=en|es`;
//             const resInc = await fetch(urlInc);
//             const datosInc = await resInc.json();
//             incorrectasEspanol.push(datosInc.responseData.translatedText);
//         }

//         // 4. Guardar el objeto estructurado en nuestro nuevo array
//         preguntasTraducidas.push({
//             categoria: decodeURIComponent(preguntas[i].category),
//             tipo: decodeURIComponent(preguntas[i].type),
//             dificultad: decodeURIComponent(preguntas[i].difficulty),
//             pregunta: preguntaEspanol,
//             respuesta_correcta: correctaEspanol,
//             respuestas_incorrectas: incorrectasEspanol
//         });

//         console.log(`Progreso: ${i + 1}/10 traducidas.`);
//     }

//     // Aquí ya tienes todo guardado en la variable list para usar en tu app
//     console.log("********************");
//     console.log("¡Traducción completada con éxito!");
//     console.log("Variable 'preguntasTraducidas':", preguntasTraducidas);


//     //preguntastraducidas contiene todo la array obtenida por la api open triva pero traducida

//     //foreach la mostrar el contenido del primer elemtro de la array y luego esperar una respuesta de los botones del quiz

//     preguntasTraducidas.forEach(dato=>{
//         seccion_quiz.innerHTML +=`

//         <picture>    <!--imagen-->
//             <img src="/Img/Banner Proyecto Quiz Interactivo.png" class="img-fluid img-banner" alt="Banner de QuizMind">
//         </picture>

//         <div class="row">
//             <h4 class="category-title">${dato.title}</h4> <!--configuar con js y css-->
//         </div>
//         <div class="row">
//             <h3 class="question-title">${dato.pregunta}</h3> <!--configurar con js y css-->
//         </div>


//         <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
//             <button type="button" class="btn btn-primary alternativa-a">${dato.respuestas_incorrectas[1]}</button>
//             <button type="button" class="btn btn-primary alternativa-b">${dato.respuesta_correcta}</button>
//         </div>
//         <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
//             <button type="button" class="btn btn-primary alternativa-c">${dato.respuestas_incorrectas[2]}</button>
//             <button type="button" class="btn btn-primary alternativa-d">${dato.respuestas_incorrectas[3]}</button>
//         </div>
//         <!--botones de saltar y siguiente-->
//         <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
//             <button type="button" class="btn btn-primary saltar">Saltar</button>
//             <button type="button" class="btn btn-primary siguiente">Siguiente</button>
//         </div>
        
//         `;

//     })

//     } catch (e) {
//         console.log("Error en el proceso: ", e);
//     }





// }

// VARIABLES GLOBALES DE ESTADO
let preguntasDelQuiz = []; // Aquí guardaremos el array completo ya traducido
let indicePreguntaActual = 0; // Controla qué pregunta se está mostrando (empieza en 0)

async function quiz_informatica() {
    try {
        const api_quiz = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986");
        if (!api_quiz.ok) {
            throw new Error("Hubo un error en la petición de la API");
        }

        const contenido_json = await api_quiz.json();
        const preguntas = contenido_json.results;
        


        // ... [AQUÍ VA TODO TU BUCLE FOR ACTUAL QUE TRADUCE LAS PREGUNTAS] ...
        // (Mantenlo exactamente igual a como lo tenías)
        const preguntasTraducidas = [];

            for (let i = 0; i < preguntas.length; i++) {
                // 1. Decodificar y traducir la PREGUNTA
                const preguntaIngles = decodeURIComponent(preguntas[i].question);
                const urlProg = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(preguntaIngles)}&langpair=en|es`;
                const resPreg = await fetch(urlProg);
                const datosPreg = await resPreg.json();
                const preguntaEspanol = datosPreg.responseData.translatedText;

                // 2. Decodificar y traducir la RESPUESTA CORRECTA
                const correctaIngles = decodeURIComponent(preguntas[i].correct_answer);
                const urlCorr = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(correctaIngles)}&langpair=en|es`;
                const resCorr = await fetch(urlCorr);
                const datosCorr = await resCorr.json();
                const correctaEspanol = datosCorr.responseData.translatedText;

                // 3. Decodificar y traducir las RESPUESTAS INCORRECTAS (es un array)
                const incorrectasEspanol = [];
                for (let j = 0; j < preguntas[i].incorrect_answers.length; j++) {
                    const incIngles = decodeURIComponent(preguntas[i].incorrect_answers[j]);
                    const urlInc = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(incIngles)}&langpair=en|es`;
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
        // Al terminar el bucle, guardamos el resultado en nuestra variable global
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
    const todasLasRespuestas = [...dato.respuestas_incorrectas, dato.respuesta_correcta];
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

    <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[0]}</button>
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[1]}</button>
    </div>
    <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[2]}</button>
        <button type="button" class="btn btn-primary btn-opcion">${todasLasRespuestas[3]}</button>
    </div>
    
    <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
        <button type="button" class="btn btn-secondary saltar" onclick="pasarSiguientePregunta()">Saltar</button>
        <button type="button" class="btn btn-success siguiente" onclick="pasarSiguientePregunta()">Siguiente</button>
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
                alert("¡Correcto!");
            } else {
                alert(`Incorrecto. La respuesta era: ${respuestaCorrecta}`);
            }
            
            // Avanzar automáticamente tras responder
            pasarSiguientePregunta();
        });
    });
}



