//este componente me dará una cuenta regresiva para iniciar el juego
import { useEffect } from "react";
import useGame from "../../hook/useGame";
import { useTranslation } from "react-i18next";
import startCountdown from "../../helpers/startCountdown";
import countdownMp3 from "../../assets/sounds/count-down.mp3"
import playSound from "../../helpers/playSound";
import getMotivationalMessages from "../../helpers/getMotivationalMessages";
import { toast } from "sonner";

const CountDown = () =>{
    //usare el contexto para activar el contador
    const { setTimerActive, setTimer, timer, setUserData,timerActive, userData } = useGame();
    //el traductor de texto
    const { t } = useTranslation( );
    //obteniendo mensaje de acompañamiento
    const startMessage = getMotivationalMessages( t, userData.name, "start")
    //este useEffect se disparará cuando se monte el componente 
    useEffect( () =>{
        setUserData( prev=> ( { ...prev, gameStatus: "countDown" } ) )
        //usando el helper para dar cuenta atras
        const interval = startCountdown( setTimer )
    
        return ( )=> clearInterval( interval );
    }, [ setTimer, setUserData, setTimerActive, timerActive ] );

    //cuando el timer llega a 0 entonces cambianos de estado al 
    useEffect( () =>{
        if( timer === 0 ) { 
            setTimerActive( false )
            toast( startMessage )
            setUserData( prev =>({
                ...prev,
                gameStatus : "playing"
        })) 
        }else if( timer == 3 ){
            playSound( countdownMp3 )
        }
    }, [ timer, setTimerActive, setUserData, startMessage ])
    
    return (
        <>
            <h1 className="text-center text-sm text-[var(--muted)] uppercase tracking-wide">{  t( "gameStartIn" ) }</h1>
            <p className={`mt-2 text-center text-5xl font-bold text-[var(--accenter)] tabular-nums transition ${ timer <= 3 ? "text-[var(--danger)] animate-pulse scale-110" : "text-[var(--accent)]"}`}>{ timer }</p>
        </>

    )
}

export default CountDown;