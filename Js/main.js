console.log("inicio");

async function datos_api(){
    try{
        const datos=await fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&encode=url3986");
        

        const datos_json=await datos.json();
        console.log("datos de la api: ",datos_json);

        const preguntas= datos_json.results;
        
        console.log("********************");
        
        for (let i = 0; i < preguntas.length; i++) {
            const preguntaIngles = decodeURIComponent(preguntas[i].question);

            const urlTraductor = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(preguntaIngles)}&langpair=en|es`;
            const resTraduccion = await fetch(urlTraductor);
            const datosTraduccion = await resTraduccion.json();
            
            const preguntaEspanol = datosTraduccion.responseData.translatedText;

            console.log(`${i + 1}. ${preguntaEspanol}`);
}



    }catch(e){
        console.log(e);
    }
}


datos_api();






