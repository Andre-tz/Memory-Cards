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

 //esto sarrays contienen el nombre de todas las imagenes que se usaran en el juego
 const characters = [ "blue-eyes", "bombardera", "cortex", "crash", "dark-magician", "deimos", "goku", "kratos", "luigi", "mario", "palito-pez", "red-eyes", "vegeta", "yoshi", "zeus"]

const languages = [ "php", "js", "html", "css", "react", "jest", "git", "python", "typescript",     "ruby", "docker", "java", "nodejs", "c++", "go", "kotlin" ];

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
    const [ gameImages, setGameImages ] = useState<string[]>( [] )
    //este array obtendrá el tipo de imagenes que se requiere
    const allImages =userData.codeTheme? languages : characters
    //este useEffect cambiara el valor de mi gameImages
    useEffect( ()=>{
        setGameImages( getRandomImages( allImages, userData.pairCards ) )
    }, [ userData.codeTheme, userData.pairCards, allImages ])

    //estado que se usará para reiniciar el contador del tiempo
    const [ resetTime, setResetTime ]  = useState( 0 );
    
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
        setResetTime( prev => prev + 1 ) 
    }
    
     //usando mi helper para precargar las imagenes
    useEffect( ()=>{ 
        //con esto precargo lo las imagenes unicas no las duplicadas, para evitar guardar en cache iamgenes innecesarias
        const uniqueGameImage = [ ...new Set( gameImages ) ];
        const folder = userData.codeTheme? "languages" : "characters"
        preloadImages( uniqueGameImage, folder )
            .then( ()=>{
                setLoadedImages( true )
                toast.success( "Imagenes cargadas correctamente" )
            })
            .catch( error =>{
                console.error( error  )
                toast.error( "Ocurrió un problema al cargar imágenes" )
            })
    }, [ gameImages, userData.codeTheme ])

    return(
        <div className="relative px-4 py-6 flex flex-col justify-center items-center">
           {/* contenedor del glitch */}
           <div className="absolute top-4 right-4 w-10 h-10 rounded-md cursor-pointer opacity-0 hover:opacity-100 border border-[var(--border)]  bg-[var(--card)] shadow-[var(--shadow-card)] transition-opacity duration-300" onClick={ handleGlicth }></div>
            <CounterTimer
                matchedCards={ matchedCards }
                gameImages={ gameImages}
                resetTime={ resetTime } />
            {
                //cuando el timer esta activo se renderizara el componente CountDown 
                timerActive? 
                <div className="flex items-center justify-center mt-12">
                    <CountDown />
                </div>
                 :
                 //si CpuntDown desaparece entonces preguntaremos si la imagenes aun no se han cargadp
                !loadedImages? 
                //si falta cargar me saldrá este mensaje
                <h1 className="mt-12 text-center text-sm text-[var(--muted)]"> Cargando Imágenes </h1>
                :
                //en caso que ya esten cargadas entonces comenzará  el juego
                <> 
                    <IoMdArrowRoundBack onClick={ handleClick } className="absolute top-4 left-4 flex items-center justify-center w-9 h-9 rounded-md  text-[var(--text)] shadow-[var(--shadow-card)] cursor-pointer opacity-80 hover:opacity-100 active:scale-95 transition"/>
                    <h1 className="mt-8 mb-6 text-center text-lg font-semibold">MatchFlip</h1>
                    <div className=" h-auto flex flex-wrap justify-center gap-3">
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