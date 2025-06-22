//este componente tendra todo el juego de memory cards
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGame from "../../hook/useGame";
import CountDown from "./CountDown";
import { IoMdArrowRoundBack } from "react-icons/io";
import getRandomImages from "../../herlpers/getRandomImages";
import Cards from "./Cards";
import preloadImages from "../../herlpers/preloadImages";
import { toast } from "sonner";

//este array contiene el nombre de todas las imagenes que se usaran en el juego
const allImages = [ "blue-eyes", "bombardera", "cortex", "crash", "dark-magician", "deimos", "goku", "kratos", "luigi", "mario", "palito-pez", "red-eyes", "vegeta", "yoshi", "zeus"]

const Game = () =>{
    //usamos el contexto para acceder a datos
    const { timerActive, userData } = useGame();
    //obtener el hook para manejar el click en el boton de atras
    const navigation   = useNavigate();
    //esta constante sirve para condicionar cuando se debe mostrar mi juego
    const [ loadedImages, setLoadedImages ] = useState<boolean>( false );
    
    //manejando el click para navegar a otra pagina
    const handleClick = () =>{
        navigation("/") //esto nos lleva al inicio
    }

    //aqui usaré el helper que he creado para obtener mis imagenes en una nueva constante
    const gameImages = getRandomImages( allImages,userData.pairCards )
    
     //usando mi helper para precargar las imagenes
    useEffect( ()=>{ 
        //con esto precargo lo las imagenes unicas no las duplicadas, para evitar guardar en cache iamgenes innecesarias
        const uniqueGameImage = [ ...new Set( gameImages ) ];
        preloadImages( uniqueGameImage )
            .then( ()=>{
                setLoadedImages( true )
            })
            .catch( error =>{
                console.error( error  )
                toast.error( "Ocurrió un problema al cargar imágenes" )
            })
    }, [ gameImages ])

    useEffect( ()=>{ toast.success( "Imágenes cargadas" ) }, [ loadedImages])
    //cuando el timer esta activo se renderizara el componente CountDown
    if( timerActive ) { return <CountDown /> }

    if( !loadedImages ){
        return ( 
            <h1>Cargando Imagenes</h1>
        )
    } else{
        //cuando el timer llega a 0 enotnces me retornara el juego en si
        return (
            <> 
                <IoMdArrowRoundBack onClick={ handleClick } className="absolute left-4"/>
                <h1>Componente del juego</h1>
                <div className="flex flex-wrap gap-5">
                    { gameImages.map( ( card, index  ) => (
                        <Cards
                            key={ index }
                            name ={ card }
                        />
                    ))}
                </div>
            </>
        )
    }
}

export default Game;