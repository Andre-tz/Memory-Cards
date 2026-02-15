//este helper me hara escoger aleatoriamente los nombres de la imagenes de caulquier array ( normal o devEdition )
const getRandomImages = ( arrayImages: string[], totalImages: number )  =>{
    //creamos un nuevo array que obtendrá todos las imagenes para el juego
    const newArrayImages : string[] = [];
    //el total de Images  no debe ser mayor al tamaño del array
    if( arrayImages.length < totalImages ) return newArrayImages
    //prrimero clonamos el array original para no dejarlo sin valores
    const clonedArray = [ ...arrayImages ];
    //este bucle se ejecutara de acuerdo a la cantidad de pares que dependen de la dificultad
    for( let i : number = 0; i < totalImages ; i++ ){
        //con random obtengo un valor aleatorio entre 0 y el tamaño de mi array de imagenes
        const random = Math.floor( Math.random()* clonedArray.length )
        //una vez obtenido el numero  lo lo busco en mi array de imagenes, lo elimino  y a la vez lo obtengo en una variable
        const selectedImage = clonedArray.splice( random, 1 )[ 0 ];
        //lo agrego a mi nuevo array, ojo son en pares
        newArrayImages.push( ...[ selectedImage, selectedImage] )
    }
    //con el metodo sort lo mezclo para que me salgan aleatoriamente las imagenes
     newArrayImages.sort( () => Math.random() - 0.5 );
     //lo retorno para guardarlo en mi variable
     return newArrayImages
}

export default getRandomImages;