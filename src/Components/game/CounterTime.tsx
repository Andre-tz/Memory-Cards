//este comonente memmostrara el tiempo del juego

import { useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";
import useGame from "../../hook/useGame";
import getInitialTime from "../../helpers/getInitialTime";
import changeMmSs from "../../helpers/changeMsSs";
import startCountdown from "../../helpers/startCountdown";

//recibirá props quer se usarán para manehar los modales
type ArraysProps ={
    matchedCards : string[];
    gameImages : string[];
    resetTime: number;
}
const CounterTimer =( { matchedCards, gameImages, resetTime  } : ArraysProps ) =>{
    //usando el contador del context
    const { userData, setUserData } = useGame();
    //estado que tendra la cantidad de timepo dependiendo el modo
    const [ time, setTime ] = useState<number>( ()=> getInitialTime( userData.difficulty ) );

    // useEffect para cambiar el estado cuando el matched y el gameImages sean iguales
    useEffect( () =>{
        if( matchedCards.length === gameImages.length / 2 ){
            //si son iguales entonces el estado del juego para a "won"
            setUserData( prev => ({ ...prev, gameStatus : "won" }))
        }
    }, [ time, gameImages, matchedCards, setUserData ] )

    //este useEffect se ejecuta cuando el timeo llega a 0
    useEffect( ()=>{ 
        if( time === 0 ){
            setUserData( prev => ({ ...prev, gameStatus : "timeOut" }))
        }
    }, [ time, setUserData])
    
    //este useEffect se encarga de renderizar el contador  el cual se saldrá si el gameStatus es diferente
    useEffect( ()=>{ 
        if( userData.gameStatus !== "playing" ) return;
        //usando el helper para dar cuenta atras++
        const interval = startCountdown( setTime );
        return ()=>{ clearInterval( interval) };
    }, [ userData.gameStatus ] )

    useEffect( ()=>{ setTime( getInitialTime( userData.difficulty ) ) }, [ resetTime, userData.difficulty ] )
    //esta funcion cambia el formato del timepo
    const [ minute, seconds ] = changeMmSs( time )

    return (
        <div className="flex items-center justify-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-md px-3 py-2 shadow-[var(--shadow-card)]">
            <FcAlarmClock className="text-lg" />
            <p className={`text-sm font-medium tabular-nums ${ time <= 10? "text-[var(--danger)]" : "text-[var(--text)]"}`}>{ `${ minute } : ${ seconds }`}</p>
        </div>
    );
}

export default CounterTimer;