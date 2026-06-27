const seccion_quiz= document.getElementById("seccion-quiz");

seccion_quiz.addEventListener("click",()=>{
    //aca de deberiamos borrar o oculat la seccion de eleccion de quiz(mate,historia,informatica)

    //casos de lo que seleccione el usuario
    const area_seleccionada = ""; //string vacio: recibira el id de la categoria que seleccione el usuario

    switch (area_seleccionada) {
    case "informatica":
        const informatica = document.getElementById("cInformatica");
        informatica.addEventListener("click", quiz_informatica());
        console.log("Acceso al Quiz de Infomática.");



        
        break;
    case "ciencia":
        console.log("Puedes editar contenido.");
        break;
    case "peliculas":
        console.log("Acceso total al sistema.");
        break;
    case "geografia":
        console.log("Acceso total al sistema.");
        break;
    case "musica":
        console.log("Acceso total al sistema.");
        break;
    case "deporte":
        console.log("Acceso total al sistema.");
        break;


    default:
        console.log("Rol no reconocido.");
    }

})

async function quiz_informatica(facil){

    //llmada a la api y verificar que tipo se seleccion hizo el usurio (facil,medio, avanzado)
    //en el fech poner una variable de la api si es facil o hard.

    try {
    //const api_quiz = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986");
    if(!api_quiz.ok){
            throw new Error("Hubo un error en la peticion de la api");
    }

    const ontenido_json = await datos.json();
    console.log("datos de la api: ", contenido_json);

    const preguntas = contenido_json.results;
    
    console.log("********************");
    console.log("Traduciendo el array de preguntas... Por favor espera.");

    // Variable donde se guardará todo el array traducido
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


    //preguntastraducidas contiene todo la array obtenida por la api open triva pero traducida

    //foreach la mostrar el contenido del primer elemtro de la array y luego esperar una respuesta de los botones del quiz

    preguntasTraducidas.forEach(dato=>{
        seccion_quiz.innerHTML +=`

        <picture>    <!--imagen-->
            <img src="/Img/Banner Proyecto Quiz Interactivo.png" class="img-fluid img-banner" alt="Banner de QuizMind">
        </picture>

        <div class="row">
            <h4 class="category-title">${dato.title}</h4> <!--configuar con js y css-->
        </div>
        <div class="row">
            <h3 class="question-title">¿Cuál es la unidad básica de información en la computación clásica que puede representar un estado de 0 o 1?</h3> <!--configurar con js y css-->
        </div>


        <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
            <button type="button" class="btn btn-primary alternativa-a">A. Byte</button>
            <button type="button" class="btn btn-primary alternativa-b">B. Bit</button>
        </div>
        <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
            <button type="button" class="btn btn-primary alternativa-c">C. Pixel</button>
            <button type="button" class="btn btn-primary alternativa-d">D. Hercio</button>
        </div>
        <!--botones de saltar y siguiente-->
        <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
            <button type="button" class="btn btn-primary saltar">Saltar</button>
            <button type="button" class="btn btn-primary siguiente">Siguiente</button>
        </div>
        
        `;

    })

    } catch (e) {
        console.log("Error en el proceso: ", e);
    }









}




