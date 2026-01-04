//este componente es el que tendra la logica de los botones de dificultad, y la descripcion de cada uno
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useGame from "../../hook/useGame";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

//estas constantes tendran los estilos de lo botones
const buttonsLevels =[ "easy", "medium", "hard", "godMode" ];

const DifficultyPanel = () => {
    //vamos a usar el hook useTranslation para traducir los textos
    const { t } = useTranslation();
    //este estado guardara el nivel de dificultad seleccionado
    const [ selected, setSelected ] = useState<string>( "" );
    //usando el context
    const { setUserData, setTimerActive, setTimer, setShowInfo, setWasShown, wasShown} = useGame();
    //
    const navigate = useNavigate()
    //este useEffect se ejecutara cada vez que el usuario cambie la dificultad, y actualizara el contexto con el nuevo valor
    useEffect( () => {
        if( selected ) {
            //cada vez que la seleccion del usuario cambia, se modifica el valor del contexto
            setUserData ( prevData => ( {
                ...prevData,
                difficulty: selected,
                pairCards: selected === "easy" ? 6 : selected === "medium" ? 8 : selected === "hard" ? 10 : 15 // dependiendo de la dificultad, se asigna un numero de cartas
            }))
        }
    }, [ selected, setUserData ] ); // 

    //esta funcion maneja el click en los botones de dificultad
    const handleClick = ( level : string)=>{
        setSelected( level );
    }

    const handleModal = () => {
        if( !selected ) {
            toast.warning( t( "levelWarning" ) ); // si no se ha seleccionado una dificultad, mostramos un mensaje de error
            return;
        }else{
            if( !wasShown ){
                setWasShown( true )
                setShowInfo( true )
            }else{
                navigate( "/game")
            }            
        }
    }
    //este useEffect se ejecuta una vez al montar el componente, y activa el contador
    //y reinicia el contador a 5 segundos
    useEffect( () =>{
        setTimerActive( true ); //activamos el contador
        setTimer( 5 ); // reiniciamos el contador
    }, [ setTimerActive, setTimer ] ); // se ejecuta una vez al montar el componente
    useEffect( ( )=>{ console.log( "fue visto " + wasShown) } , [ wasShown] )
    return (
        <>
            <div className="w-full flex flex-col items-center gap-4">
                <div className="flex flex-col gap-3 w-full">
                    { buttonsLevels.map(( level, index ) => {
                        return(
                            <button
                                key={ index }
                                className={ `w-full py-2 border rounded-md transition text-center font-medium cursor-pointer ${ selected === level? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-[var(--bg)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--card)]" }` }
                                onClick={  ( ) => handleClick( level ) }
                                >{ t ( `difficulty.${ level }`) }
                            </button>
                        )
                    })}
                </div>

                <p className="text-sm text-[var(--muted)] text-center min-h-[2.5rem]">{ !selected? "escoge tu dificultad" : t(`description.${ selected }`)}</p>
            </div>
            
         <button className={` cursor-pointer mt-4 w-full py-2 rounded-md font-semibold transition ${ selected?  "bg-[var(--accent)] text-white hover:opacity-90}" : "bg-[var(--border)] text-[var(--muted)] cursor-not-allowed"} `} onClick={ handleModal }>{ t( "startGame" ) }</button>
            
        </>
        
    );
}

export default DifficultyPanel;