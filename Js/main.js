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
//Lógica botón quiz rápido
const botonQuizRapido = document.getElementById("botonQuizRapido");
const contenedorModal = document.getElementById("contenedorModal");
botonQuizRapido.addEventListener("click", () => {
    contenedorModal.innerHTML = `
        <div class="modal d-block" tabindex="-1">
            <div class="modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title titulo-modal-btn">¿Cómo jugar?</h5>
                        <button type="button" class="btn-close btn1-cerrar-modal" onclick="cerrarModal()" aria-label="Close"></button>
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
                            <img src="/Img/ejemplocategoriasmodal.png" alt = "Referencia a la elección de categoría" class="img2-modal">
                            <p class="p-modal-btn">Explora las opciones y haz clic sobre la categoría que más te llame la atención para poner a prueba tus conocimientos.</p>
                        </div>
                        <div class="row">
                            <h3 class="h3-modal-btn">3º ¡A jugar!</h3> <!--añadir img cuando el modulo del quiz tenga css terminado-->
                            <img src="/Img/ejemplologinmodal.png" alt = "Referencia a la creación de una cuenta" class="img1-modal">
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
//Logica: Redirrecionar al usuario al apretar cualquier categoria. 
//1) Obtenemos cada categoria del index por su id
const informatica = document.getElementById("cInformatica");
const ciencias = document.getElementById("cCiencia");
const peliculas = document.getElementById("cPeliculas");
const geografia = document.getElementById("cGeografia");
const musica = document.getElementById("cMusica");
const deportes = document.getElementById("cDeportes");

//2) Función guardar categorias: Utiliza localstorage con el metodo setItem para guardar cada categoria y pasarselas al quiz.html
const guardarCategoria = (cNombre, c_idAPI) => {
    localStorage.setItem("categoriaNombre", cNombre);
    localStorage.setItem("categoriaID", c_idAPI);
}
//Lógica: Selección y guardado del nivel de dificultad del quiz
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
//Función para cerrar el modal
const cerrarModal = (idContenedor) => {
    const contenedor = document.getElementById(idContenedor);
    if(contenedor){
        contenedor.innerHTML = "";
    }
};
//Falta, cargar los datos de todas las categorias segun esta, avanzar segun boton sgt y no alert 
//Función para guardar en memoria la dificultad
const guardarDificultad = (dificultad) => {
    if(dificultad === ""){
        alert("Debes seleccionar un nivel de dificultad");
        return;
    }else{
        localStorage.setItem("dificultadSeleccionada", dificultad);
        window.location.href = "quiz.html";
    }
};
//) Se añade el evento click a cada categoria y se llama a la fn, pasandole el nombre de la categoria y su id de la API
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
//Lógica: Validar que el usuario no vaya al quiz sin antes haber seleccionado una categoria TODAVIA NO FUNCIONA 
const linkQuizDesdeIndex = document.getElementById("link-quiz-desde-index");
//Función para evitar redirrecionamiento al quiz sin haber elegido una categoria
const validarRedirrecion = (linkQuiz) => {
    linkQuiz.addEventListener("click", (linkQuiz) => {
        linkQuiz.preventDefault(); //elimina el redirrecionamiento automatico, permitiendo que entre al if
        const categoriaElegida = localStorage.getItem("categoriaID");
        if(!categoriaElegida){
            alert("Primero debes seleccionar una categoría.");
            return;
        }
        else{
            window.location.href = "quiz.html"; //Evento que redirreciona de la pagina index, a quiz, al momento de hacer click en cualquier categoria
        }
    });
};
validarRedirrecion(linkQuizDesdeIndex);