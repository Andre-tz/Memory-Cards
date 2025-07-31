//este comonente memmostrara el tiempo del juego

import { useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";
import useGame from "../../hook/useGame";
import getInitialTime from "../../helpers/getInitialTime";
import changeMmSs from "../../helpers/changeMsSs";
import startCountdown from "../../helpers/startCountdown";

const CounterTimer =( ) =>{
    //usando el contador del context
    const { userData } = useGame();
    //estado que tendra la cantidad de timepo dependiendo el modo
    const [ time, setTime ] = useState<number>( ()=> getInitialTime( userData.difficulty ) );
    //este estado guardará el estado del counter
    //const [ counter, setCounter] = useState<boolean>( false )

    // useEffect para actualizar el valor sel timepo a cada momento;
    useEffect( () =>{

        if( userData.gameStatus !== "playing" ) return;
        //usando el helper para dar cuenta atras
        const interval = startCountdown( setTime );

    return ()=>{ clearInterval( interval) };

    }, [ userData.gameStatus ] )
    
    //esta funcion cambia el formato del timepo
    const [ minute, seconds ] = changeMmSs( time )

    useEffect( ()=>{ console.log( time ) }, [ time ])

    return (
        <div>
            <FcAlarmClock />
            <p>{ `${ minute } : ${ seconds }`}</p>
        </div>
    );
}

export default CounterTimer;