//este es un hook que se usara para protegerme si se usa el contexto fuera del Provider

import { useContext } from "react";
import GameContext from "../Context/GameContext";
const UseGame = () =>{
    const context = useContext( GameContext );

    if( !context ) {
        throw new Error( "UseGame must be used within a GameProvider" );
    }
    return context;
}

export default UseGame;