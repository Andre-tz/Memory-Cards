//este comonente memmostrara el tiempo del juego

import { useEffect, useRef, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";
import useGame from "../../hook/useGame";
import getInitialTime from "../../helpers/getInitialTime";
import changeMmSs from "../../helpers/changeMsSs";
import startCountdown from "../../helpers/startCountdown";
import { toast } from "sonner";
import getMotivationalMessages from "../../helpers/getMotivationalMessages";
import { useTranslation } from "react-i18next";

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
    //i18next para usar la traduccion
    const { t } = useTranslation()
    //useRef para guardar el timpo inicial
    const initialTimeRef = useRef<number>( time );
    //medio timepo
    const midTime = initialTimeRef.current / 2
    //mensaje de medio timepo
    const midTimeMessage = getMotivationalMessages( t, userData.name, "midTime")
    //mensaje de poco tiempo
    const lowTimeMessage = getMotivationalMessages( t, userData.name, "lowTime")
    // useEffect para cambiar el estado cuando el matched y el gameImages sean iguales
    useEffect( () =>{
        if( matchedCards.length === gameImages.length / 2 ){
            //si son iguales entonces el estado del juego para a "won"
            setUserData( prev => ({ ...prev, gameStatus : "won" }))
        }
    }, [ time, gameImages, matchedCards, setUserData ] )

    //este useEffect se ejecuta cuando el timeo llega a 0
    useEffect( ()=>{ 
        if( time === midTime ){ toast( midTimeMessage )}
        if( time === 10 ) { toast( lowTimeMessage )}
        if( time === 0 ){
            setUserData( prev => ({ ...prev, gameStatus : "timeOut" }))
        }
    }, [ time, setUserData, midTimeMessage, lowTimeMessage, midTime ])
    
    //este useEffect se encarga de renderizar el contador  el cual se saldrá si el gameStatus es diferente
    useEffect( ()=>{ 
        if( userData.gameStatus !== "playing" ) return;
        //usando el helper para dar cuenta atras++
        const interval = startCountdown( setTime );
        return ()=>{ clearInterval( interval) };
    }, [ userData.gameStatus ] )

    useEffect( ()=>{ setTime( getInitialTime( userData.difficulty ) ) }, [ resetTime, userData.difficulty ] )
    //esta funcion cambia el formato del timepo
    const counterTime = changeMmSs( time )

    return (
        <div className="flex items-center justify-center gap-2 bg-[var(--card)] border border-[var(--border)] rounded-md px-3 py-2 shadow-[var(--shadow-card)]">
            <FcAlarmClock className="text-lg" />
            <p className={`text-sm font-medium tabular-nums ${ time <= 10? "text-[var(--danger)]" : "text-[var(--text)]"}`}>{ counterTime }</p>
        </div>
    );
}

export default CounterTimer;