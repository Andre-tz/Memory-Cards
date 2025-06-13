//Aca se creará el contexto con los datos que usaremos

import { createContext } from "react";

//este type tendrá los datos del usuario
type  UserType ={
    name: string;
    difficulty: string;
    score: number;
    language : string;
}

// tipo de datos que se usarán en el context
type GameContextType ={
    userData: UserType;
    setUserData: React.Dispatch<React.SetStateAction<UserType>>;
}

//aqui estoy creando el contexto el cual se exporta para que se pueda usar en otros componentes, el cual aceptara solo tipos de datos declarados en el type
const GameContext = createContext<GameContextType | null>(null);

export default GameContext;