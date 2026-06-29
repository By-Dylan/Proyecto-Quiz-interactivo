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


