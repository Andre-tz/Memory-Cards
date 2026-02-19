// esta archivo sirve para precargar las imagenes antes de iniciar e l juego
//crea como una copia de la imagen en memoria, por lo que cuando renderices el componente card y vean que las rutas coincidan con la de memoria
//entonces no neceseitaras vovler a cargar, ya lo tendrá listo
const preloadImages = ( arrayImages : string[], folder : "languages" | "characters" ) : Promise< void[] > =>{
    const base = import.meta.env.BASE_URL;
    //esta funcion nos va a retornar un lista de promesas 
    return Promise.all( // con promise all esperara a que se resuelvan las promesas dentro para recien retornar
        arrayImages.map( path  => {//como promise.all trabaja con lista de promesas. use map para trabajar con cada item de la lista
            return new Promise<void> ( ( resolve, reject ) =>{ // ahora cada item me devolvera un promesas el cual se puede manejar con resolve  y reject
                const img = new Image(); // con new Image creamos un etiqueta <img> en memoria 
                img.src = `${base}images/${ folder }/${ path }.webp`; //le damos su src
                img.alt = `Imagen de ${ path }`; //tambien le damos su texto alternativo
                img.onload = ()=> resolve(); //cuando la imagen este lista se ejecutara la funcion resolver
                img.onerror= ()=> reject( "Error al cargar la Imagen" ); // si hay un error se ejecutará la funcion reject
            })
        })
    )
}

export default preloadImages; // lo exportamos
