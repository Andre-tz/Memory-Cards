//este es el componente que tendra la lo principal de la aplicacoin, titulo, botones, etc

import { useTranslation } from "react-i18next";
import DifficultyPanel from "./DifficultyPanel";
import { useEffect, useState } from "react";
import useGame from "../../hook/useGame";
import NameModal from "./NameModal";
import InfoModal from "./InfoModal";
import ThemeSwitcher from "./ThemeSwitcher";
const Home = ( ) =>{

    const { t } = useTranslation();
    const { setUserData, userData } = useGame();
    //state que sirve para mostrar el modal del nombre
    const [ modalActive, setModalActive ] = useState<boolean>( false );
    //obtenemos shoeInfo desde el context
    const { showInfo } = useGame();
    
    //este useEffect servira para cambiar el estado del juego 
    useEffect ( ()=>{
        if( userData.gameStatus !== "waiting"){
            setUserData( prev => ( { ...prev, gameStatus :"waiting"} ) )
        }
    }, [setUserData, userData.gameStatus])//no necesita dependencias pero por siacaso le pondré

    //este hook se ejecutara apaneas la app se inicie
    useEffect( ()=>{
        if( !userData.name ){
            setModalActive( true );
        } else{
            setModalActive( false );
        }
    }, [ userData ])

    return(
        <section className="w-full max-w-md flex flex-col items-center gap-4 mt-6 text-center">
            <div className="self-end"><ThemeSwitcher /></div>

            { modalActive && <NameModal />}

            <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">MatchFlip</h1>
            <h2 className="text-base text-[var(--muted)]">{ t( "subtitle" ) }</h2>
            <div className="w-full mt-4 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                <DifficultyPanel />  
            </div>

            { showInfo && <InfoModal />}
        </section>
    )
}
export default Home;