//este componente me dará una cuenta regresiva para iniciar el juego
import { useEffect } from "react";
import useGame from "../../hook/useGame";
import { useTranslation } from "react-i18next";
import startCountdown from "../../helpers/startCountdown";
const CountDown = () =>{
    //usare el contexto para activar el contador
    const { setTimerActive, setTimer, timer, setUserData,timerActive } = useGame();
    //el traductor de texto
    const { t } = useTranslation( );

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
            setUserData( prev =>({
                ...prev,
                gameStatus : "playing"
        })) 
        }
    }, [ timer, setTimerActive, setUserData])
    
    return (
        <>
            <h1>{  t( "gameStartIn" ) }</h1>
            <p>{ timer }</p>
        </>

    )
}

export default CountDown;