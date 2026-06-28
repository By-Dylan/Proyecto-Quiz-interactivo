const btn_ComoFunciona=document.getElementById("btn-comofunciona");
const seccion_login=document.getElementById("seccion-login");
const login= document.querySelector("#login");
const alerta= document.querySelector("#alerta");
const icono_sesion_correcta=document.getElementById("icono-sesion-correcta")

const btn_enviar=document.getElementById("btn-enviar");
//btn_enviar.setAttribute('data-bs-dismiss', 'modal') //en argumento va el el atributo y su valor

btn_ComoFunciona.addEventListener("click", ()=>{
    window.scrollTo({ top: 1180, behavior:"smooth"}); //870
})


login.addEventListener("submit",(evento)=>{
    evento.preventDefault()
    const{nombre,gmail,contraseña}=evento.target;
    console.log(nombre.value);

    const datos_usuario={
        nombre: nombre.value,
        gmail: gmail.value,
        contraseña: contraseña.value,
        notificacion_registro: "no"
    };

    localStorage.setItem('usuario_registrado', JSON.stringify(datos_usuario)); //se guardamos y se convierte el objeto a String Json
    location.reload();
        
})

function verificarUsuario(){
    const usuarioDeAlmacen=localStorage.getItem('usuario_registrado');
    
    if(usuarioDeAlmacen){
        seccion_login.classList.add("ocultar-register");
        icono_sesion_correcta.classList.remove("icono-sesionCorrecta");
        notificacion_msj()  
    }
}

function notificacion_msj(){
    const dato_notificacion_string= localStorage.getItem("usuario_registrado");
    const dato_notificacion_json= JSON.parse(dato_notificacion_string);

    if(dato_notificacion_json.notificacion_registro ==="no"){
        window.alertaTimeout = setTimeout(() =>{
            alerta.innerHTML +=`
                <div class="alert alert-success" role="alert">
                    Tu cuenta fue registrada correctamente  :D
                </div>
            `;

        },2000);    
        
        window.alertaTimeout = setTimeout(() => {          
                alerta.classList.add("desactivador-de-alerta");
        }, 6000);

        dato_notificacion_json.notificacion_registro="si";
        localStorage.setItem('usuario_registrado', JSON.stringify(dato_notificacion_json));

    }

}

verificarUsuario();




console.log("inicio");





