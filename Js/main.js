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

// async function datos_api(){
//     try{
//         const datos=await fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&encode=url3986");
        

//         const datos_json=await datos.json();
//         console.log("datos de la api: ",datos_json);

//         const preguntas= datos_json.results;
        
//         console.log("********************");
        
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






