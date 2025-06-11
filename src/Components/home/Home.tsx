//este es el componente que tendra la lo principal de la aplicacoin, titulo, botones, etc

import { useTranslation } from "react-i18next";
import DifficultyPanel from "./DifficultyPanel";
const Home = ( ) =>{

    const { t } = useTranslation();
    return(
        <main className="bg-white-0 p-4 flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-5xl">{ t( "title" ) }</h1>
            <h2 className="text-2xl">{ t( "subtitle" ) }</h2>
            <DifficultyPanel />
            
        </main>
    )
}
export default Home;