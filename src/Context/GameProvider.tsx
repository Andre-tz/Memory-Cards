//este componente envolvera a los demas y usara el contexto que se creo en GameContext.ts
import  GameContext  from "./GameContext";
import { useState } from "react";

type Props ={
    children: React.ReactNode;
}

const GameProvider = ({ children } : Props)=>{

    const [ difficulty, setDifficulty ] = useState<string>( "easy" );

    return (
        <GameContext.Provider value ={ { difficulty, setDifficulty } }>
            { children }
        </GameContext.Provider>
    )
}

export default GameProvider;