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

    localStorage.setItem('usuario_registrado', JSON.stringify(datos_usuario)); 

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




//Logica botón quiz rápido
const botonQuizRapido = document.getElementById("botonQuizRapido");
const contenedorModal = document.getElementById("contenedorModal");

botonQuizRapido.addEventListener("click", () => {
    contenedorModal.innerHTML = `
        <div class="modal d-block" tabindex="-1">
            <div class="modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title titulo-modal-btn">¿Cómo jugar?</h5>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <h3 class="h3-modal-btn">1º Crea tu cuenta</h3>
                            <img src="/Img/ejemplologinmodal.png" alt = "Referencia a la creación de una cuenta" class="img1-modal">
                            <p class="p-modal-btn">Dirígete a la esquina superior derecha de la pantalla y haz clic para registrarte. 
                            Solo necesitas ingresar un nombre de usuario, tu correo y una contraseña. ¡Así de fácil!</p>
                        </div>
                        <div class="row">
                            <h3 class="h3-modal-btn">2º Elige tu desafío</h3>
                            <div class="container" id="seccion-categorias">
                                <div class="row row-cols-7 gap-3 text-center ">
                                    <div class="col col-categorias justify-content-center">
                                        <a href="" class="text-decoration-none text-reset" id="cInformatica">
                                        <div id="icono1" class="mx-auto seccion-icono">
                                            <i class="bi bi-pc-display-horizontal icono-diseño"></i>
                                        </div>
                                        <div class="categorias-descripcion">
                                            <p class="mb-0">Informatica</p> 
                                        </div>
                                        </a>
                                    </div>

                                    <div class="col col-categorias justify-content-center">
                                        <a href="" class="text-decoration-none text-reset" id="cCiencia">
                                        <div id="icono2" class="mx-auto seccion-icono">
                                            <i class="fa-solid fa-flask-vial icono-diseño"></i>
                                        </div>

                                        <div class="categorias-descripcion">
                                            <p>Ciencia</p>
                                        </div>
                                        </a>
                                    </div>

                                    <div class="col col-categorias justify-content-center">
                                        <a href="" class="text-decoration-none text-reset "id="cPeliculas">
                                        <div id="icono3" class="mx-auto seccion-icono">
                                            <i class="bi bi-film icono-diseño"></i>
                                        </div>

                                        <div class="categorias-descripcion">
                                            <p>Peliculas</p>
                                        </div>
                                        </a>
                                    </div>

                                    <div class="col col-categorias justify-content-center">
                                        <a href="" class="text-decoration-none text-reset "id="cGeografia">
                                        <div id="icono4" class="mx-auto seccion-icono">
                                            <i class="bi bi-globe-americas icono-diseño"></i>
                                        </div>

                                        <div class="categorias-descripcion">
                                            <p>Geografia</p>
                                        </div>
                                        </a>
                                    </div>

                                    <div class="col col-categorias justify-content-center">
                                        <a href="" class="text-decoration-none text-reset "id="cMusica">
                                        <div id="icono5" class="mx-auto seccion-icono">
                                            <i class="bi bi-music-note-beamed icono-diseño"></i>
                                        </div>

                                        <div class="categorias-descripcion">
                                            <p>Musica</p>
                                        </div>
                                        </a>
                                    </div>

                                    <div class="col col-categorias justify-content-center">
                                        <a href="" class="text-decoration-none text-reset "id="cDeportes">
                                        <div id="icono6" class="mx-auto seccion-icono">
                                            <i class="fa-regular fa-futbol icono-diseño"></i>
                                        </div>

                                        <div class="categorias-descripcion">
                                            <p>Deporte</p>
                                        </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                            <p class="p-modal-btn">Explora las opciones y haz clic sobre la categoría que más te llame la atención para poner a prueba tus conocimientos.</p>
                        </div>
                        <div class="row">
                            <h3 class="h3-modal-btn">3º ¡A jugar!</h3> <!--añadir img cuando el modulo del quiz tenga css terminado-->
                            <picture>
                                <img src="/Img/ciencias.jpg" class="img-fluid img-quiz" alt="Banner de QuizMind">
                            </picture>

                            <div class="row">
                                <h4 class="category-title">Science</h4> 
                            </div>
                            <div class="row">
                                <h3 class="question-title">¿Cuál es el planeta más grande del sistema solar?</h3> 
                            </div>

                            <div class="btn-group-horizontal  text-center" role="group" aria-label="Horizontal button group">
                                <button type="button" class="btn btn-primary alternativa-a btn-opcion">Júpiter</button>
                                <button type="button" class="btn btn-primary alternativa-b btn-opcion">Marte</button>
                            </div>
                            <div class="btn-group-horizontal  text-center" role="group" aria-label="Horizontal button group">
                                <button type="button" class="btn btn-primary alternativa-c btn-opcion">Saturno</button>
                                <button type="button" class="btn btn-primary alternativa-d btn-opcion">Venus</button>
                            </div>
                                <!--botones de saltar y siguiente-->
                            <div class="btn-group-horizontal" role="group" aria-label="Horizontal button group">
                                <button type="button" class="btn btn-primary saltar" data-bs-toggle="modal" data-bs-target="#exampleModal">Saltar</button>
                                <button type="button" class="btn btn-primary siguiente" data-bs-toggle="modal" data-bs-target="#exampleModal">Siguiente</button>
                            </div>
                            <p class="p-modal-btn">Una vez elijas, te llevaremos automáticamente al módulo del quiz. Lee con atención y diviértete. ¡Mucho éxito!</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn2-cerrar-modal" onclick="cerrarModal('contenedorModal')">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
});




//logica redirrecionar al usuario al apretar cualquier categoria        (dilan hasta el final)
const informatica = document.getElementById("cInformatica");
const ciencias = document.getElementById("cCiencia");
const peliculas = document.getElementById("cPeliculas");
const geografia = document.getElementById("cGeografia");
const musica = document.getElementById("cMusica");
const deportes = document.getElementById("cDeportes");

//función guardar categorias
const guardarCategoria= (cNombre, c_idAPI) => {
    localStorage.setItem("categoriaNombre", cNombre);
    localStorage.setItem("categoriaID", c_idAPI);
}

//selección y guardado del nivel de dificultad del quiz
const nivelDeDificultad = document.getElementById("contenedorModalDificultad");

const seleccionnivelDeDificultad = () => {
    nivelDeDificultad.innerHTML = `
        <div class="modal d-block" tabindex="-1">
            <div class="modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title titulo-modal-btn">Nivel de Dificultad</h5>
                        <button type="button" class="btn-close btn1-cerrar-modal" onclick="cerrarModal('contenedorModalDificultad')" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col col-dificultad justify-content-center">
                                <a href="#" class="text-decoration-none text-reset" onclick = "guardarDificultad('easy')">
                                    <div id="iconoFacil" class="mx-auto seccion-dificultad">
                                        <i class="bi bi-battery iconos-dificultad"></i> 
                                    </div>
                                    <div class="dificultades">
                                        <p class="p-dificultad">Fácil</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col col-dificultad justify-content-center">
                                <a href="#" class="text-decoration-none text-reset" onclick = "guardarDificultad('medium')">
                                    <div id="iconoMedio" class="mx-auto seccion-dificultad">
                                        <i class="bi bi-battery-half iconos-dificultad"></i> 
                                    </div>
                                    <div class="dificultades">
                                        <p class="p-dificultad">Medio</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col col-dificultad justify-content-center">
                                <a href="#" class="text-decoration-none text-reset" onclick = "guardarDificultad('hard')">
                                    <div id="iconoDificil" class="mx-auto seccion-dificultad">
                                        <i class="bi bi-battery-full iconos-dificultad"></i>
                                    </div>
                                    <div class="dificultades">
                                        <p class="p-dificultad">Difícil</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn2-cerrar-modal" onclick="cerrarModal('contenedorModalDificultad')">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

//funcion para cerrar el modal
const cerrarModal= (idContenedor) => {
    const contenedor = document.getElementById(idContenedor);
    if(contenedor){
        contenedor.innerHTML = "";
    }
};



//funcion para guardar en memoria la dificultad
const guardarDificultad = (dificultad) => {
    if(dificultad === ""){
        alert("Debes seleccionar un nivel de dificultad");
        return;
    }else{
        localStorage.setItem("dificultadSeleccionada", dificultad);
        window.location.href = "quiz.html";
    }
};


//se añade el evento click a cada categoria y se llama a la fn, pasandole el nombre de la categoria y su id de la API
if(informatica){
    informatica.addEventListener("click", () => {
        guardarCategoria("Informática", 18);
        seleccionnivelDeDificultad();
    });
}
if(ciencias){
    ciencias.addEventListener("click", () => {
        guardarCategoria("Ciencias", 17);
        seleccionnivelDeDificultad();
    });
}
if(peliculas){
    peliculas.addEventListener("click", () => {
        guardarCategoria("Películas", 11);
        seleccionnivelDeDificultad();
    });
}
if(geografia){
    geografia.addEventListener("click", () => {
        guardarCategoria("Geografía", 22);
        seleccionnivelDeDificultad();
    });
}
if(musica){
    musica.addEventListener("click", () => {
        guardarCategoria("Música", 12);
        seleccionnivelDeDificultad();
    });
}
if(deportes){
    deportes.addEventListener("click", () => {
        guardarCategoria("Deportes", 21);
        seleccionnivelDeDificultad();
    });
}



const linkQuizDesdeIndex = document.getElementById("link-quiz-desde-index");

linkQuizDesdeIndex.addEventListener("click",(evento)=>{
    evento.preventDefault(); 
    console.log("hola desde validar redireccion");
    
    const categoriaElegida = localStorage.getItem("categoriaID");
    if(!categoriaElegida){
        alert("primero debes seleccionar una categoría.");
        return;
            
    }
    
})

localStorage.removeItem('categoriaID');



