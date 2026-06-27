const btn_ComoFunciona=document.getElementById("btn-comofunciona");
const seccion_login=document.getElementById("seccion-login");
const login= document.querySelector("#login");
const alerta= document.querySelector("#alerta");
const icono_sesion_correcta=document.getElementById("icono-sesion-correcta")

const btn_enviar=document.getElementById("btn-enviar");
//btn_enviar.setAttribute('data-bs-dismiss', 'modal') //en argumento va el el atributo y su valor

btn_ComoFunciona.addEventListener("click", ()=>{
    window.scrollTo({ top: 870, behavior:"smooth"}); 
})


login.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    const{nombre,gmail,contraseña}=evento.target;
    console.log(nombre.value);

    const datos_usuario={
        nombre: nombre.value,
        gmail: gmail.value,
        contraseña: contraseña.value
    };

    localStorage.setItem('usuario_registrado', JSON.stringify(datos_usuario)); //se guardamos y se convierte el objeto a String Json

    window.alertaTimeout = setTimeout(() =>{
        alerta.innerHTML +=`
            <div class="alert alert-success" role="alert">
                Felicidades Iniciaste Sesion Correctamente!!!
            </div>
        `;
        verificarUsuario();
    },3000);    
    
    window.alertaTimeout = setTimeout(() => {          
            alerta.classList.add("desactivador-de-alerta");
        }, 6000);
    login.reset()  
    
})

function verificarUsuario(){
    const usuarioDeAlmacen=localStorage.getItem('usuario_registrado');
    
    if(usuarioDeAlmacen){
        seccion_login.classList.add("ocultar-register");

        icono_sesion_correcta.classList.remove("icono-sesionCorrecta");
    }
}

verificarUsuario();




console.log("inicio");


async function quiz_informatica(facil){

    //llmada a la api y verificar que tipo se seleccion hizo el usurio (facil,medio, avanzado)
    //en el fech poner una variable de la api si es facil o hard.

    try {
    const api_quiz = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple&encode=url3986");
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


    } catch (e) {
        console.log("Error en el proceso: ", e);
    }




}

quiz_informatica()





// async function datos_api(){
//     try{
//         const datos=await fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&encode=url3986");
        

//         const datos_json=await datos.json();
//         console.log("datos de la api: ",datos_json);

//         const preguntas= datos_json.results;
        
//         console.log("********************"); //quiero traducir todo el array (10)
        
//         for (let i = 0; i < preguntas.length; i++) {
//             const preguntaIngles = decodeURIComponent(preguntas[i].question);

//             const urlTraductor = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(preguntaIngles)}&langpair=en|es`;
//             const resTraduccion = await fetch(urlTraductor);
//             const datosTraduccion = await resTraduccion.json();
            
//             const preguntaEspanol = datosTraduccion.responseData.translatedText;

//             console.log(`${i + 1}. ${preguntaEspanol}`);
// }


//     }catch(e){
//         console.log(e);
//     }
// }


// datos_api();
//Logica: Redirrecionar al usuario al apretar cualquier categoria. 
//1) Obtenemos cada categoria del index por su id
const informatica = document.getElementById("cInformatica");
const ciencias = document.getElementById("cCiencias");
const peliculas = document.getElementById("cPeliculas");
const geografia = document.getElementById("cGeografia");
const musica = document.getElementById("cMusica");
const deportes = document.getElementById("cDeportes");

//2) Función guardar categorias: Utiliza localstorage con el metodo setItem para guardar cada categoria y pasarselas al quiz.html
function guardarCategoria(cNombre, c_idAPI){
    localStorage.setItem("categoriaNombre", cNombre);
    localStorage.setItem("categoriaID", c_idAPI);
    window.location.href = "quiz.html"; //Evento que redirreciona de la pagina index, a quiz, al momento de hacer click en cualquier categoria
}
//3) Se añade el evento click a cada categoria y se llama a la fn, pasandole el nombre de la categoria y su id de la API
if(informatica){
    informatica.addEventListener("click", () => {
        guardarCategoria("Informática", 18)
    });
}
if(ciencias){
    ciencias.addEventListener("click", () => {
        guardarCategoria("Ciencias", 17)
    });
}
if(peliculas){
    peliculas.addEventListener("click", () => {
        guardarCategoria("Películas", 11)
    });
}
if(geografia){
    geografia.addEventListener("click", () => {
        guardarCategoria("Geografía", 22)
    });
}
if(musica){
    musica.addEventListener("click", () => {
        guardarCategoria("Música", 12)
    });
}
if(deportes){
    deportes.addEventListener("click", () => {
        guardarCategoria("Deportes", 21)
    });
}





