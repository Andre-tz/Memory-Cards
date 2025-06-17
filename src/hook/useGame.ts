//este es un hook que se usara para protegerme si se usa el contexto fuera del Provider
//es decir accedemos al contexto  y si no se encuentra lanzamos un error ( cuando usamos fuera del provider ) y en caso de que haya lo exportamos y lo usamos con useGame

import { useContext } from "react";
import GameContext from "../Context/GameContext";
const useGame = () =>{
    const context = useContext( GameContext );

    if( !context ) {
        throw new Error( "UseGame must be used within a GameProvider" );
    }
    return context;
}

export default useGame;