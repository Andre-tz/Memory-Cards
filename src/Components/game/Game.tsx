//este componente tendra todo el juego de memory cards
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGame from "../../hook/useGame";
import CountDown from "./CountDown";
import { IoMdArrowRoundBack } from "react-icons/io";
import getRandomImages from "../../helpers/getRandomImages";
import Cards from "./Cards";
import preloadImages from "../../helpers/preloadImages";
import { toast } from "sonner";
import useGameLogic from "../../hook/useGameLogic";
import CounterTimer from "./CounterTime";
import IndexModal from "./modals/IndexModal";

//este array contiene el nombre de todas las imagenes que se usaran en el juego
const allImages = [ "blue-eyes", "bombardera", "cortex", "crash", "dark-magician", "deimos", "goku", "kratos", "luigi", "mario", "palito-pez", "red-eyes", "vegeta", "yoshi", "zeus"]

const Game = () =>{
    //usamos el contexto para acceder a datos
    const { timerActive, setTimerActive, setTimer,  userData } = useGame();
    //obtener el hook para manejar el click en el boton de atras
    const navigation   = useNavigate();
    //esta constante sirve para condicionar cuando se debe mostrar mi juego
    const [ loadedImages, setLoadedImages ] = useState<boolean>( false );
    //desestructurando las varaibles d emi hook personalizado
    const { selectedCards,  matchedCards, handleCardClick, glitchWin, resetGame } = useGameLogic()
    //aqui usaré el helper que he creado para obtener mis imagenes en una nueva constante
    const [ gameImages, setGameImages ] = useState<string[]>( ()=> getRandomImages( allImages,userData.pairCards ))
    
    //manejando el click para navegar a otra pagina
    const handleClick = () =>{
        navigation("/") //esto nos lleva al inicio
    }
    
    //manejando el glitch
    const handleGlicth = () =>{
        glitchWin( gameImages );
    }

    //funcion para manejar el reinicio del juego, lo hago aca porque tengo acceso a los estados que necesito
    const handleResetGame = () => {
        resetGame(); //limpia matchedCards u selectedCards
        setGameImages( getRandomImages( allImages,userData.pairCards ) ) //cambia las cartas
        setTimer( 5 );//lreinicia el contador
        setTimerActive( true );//activa el contador
    }
    
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

    useEffect( ()=>{ console.log( userData. gameStatus, selectedCards ) }, [ userData, selectedCards ])
    return(
        <div>
           {/* contenedor del glitch */}
           <div className="w-10 h-10 bg-red-600" onClick={ handleGlicth }></div>
            <CounterTimer
                matchedCards={ matchedCards }
                gameImages={ gameImages} />
            {
                //cuando el timer esta activo se renderizara el componente CountDown 
                timerActive? 
                 <CountDown />
                 :
                 //si CpuntDown desaparece entonces preguntaremos si la imagenes aun no se han cargadp
                !loadedImages? 
                //si falta cargar me saldrá este mensaje
                <h1> Cargando Imágenes </h1>
                :
                //en caso que ya esten cargadas entonces comenzará  el juego
                <> 
                    <IoMdArrowRoundBack onClick={ handleClick } className="absolute left-4"/>
                    <h1>Componente del juego</h1>
                    <div className="flex flex-wrap gap-5">
                        { gameImages.map( ( card, index  ) => (
                            <Cards
                                key={ index }
                                id= { index }
                                image ={ card }
                                isFlipped = { //dependiendo al valor que esta aca se verá si lo carta se volteará o no
                                    selectedCards.some( c => c.name === card && c.index === index) ||
                                    matchedCards.some( c => c == card )
                                }
                                onClick={ ( card, index ) => handleCardClick( { name: card, index: index  }) }
                            />
                        ))}
                    </div>

                    <div>
                        {
                           ( userData.gameStatus!== "waiting" && userData.gameStatus!=="playing" && userData.gameStatus!=="countDown"  ) && ( <IndexModal status ={ userData.gameStatus } onReset={ handleResetGame} />) 
                        }
                    </div>
                </>
            }

        </div>
    )
}

export default Game;