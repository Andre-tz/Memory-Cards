//Aca se creará el contexto con los datos que usaremos

import { createContext } from "react";

// tipo de datos que se usarán en el context
type GameContextType ={
    difficulty: string;
    setDifficulty: ( difficulty: string ) => void;
}

//aqui estoy creando el contexto el cual se exporta para que se pueda usar en otros componentes, el cual aceptara solo tipos de datos declarados en el type
const GameContext = createContext<GameContextType | null>(null);

export default GameContext;