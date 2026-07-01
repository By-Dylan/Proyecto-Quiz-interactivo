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









