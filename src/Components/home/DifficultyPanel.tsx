//este componente es el que tendra la logica de los botones de dificultad, y la descripcion de cada uno
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGame from "../../hook/useGame";

//estas constantes tendran los estilos de lo botones
const stylesButton = "px-2 border-2 border-red-600 w-40 rounded-2xl cursor-pointer transition-colors duration-300"
const buttonDisabled = "bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed opacity-50";
const buttonsLevels =[ "easy", "medium", "hard", "godMode" ];

const DifficultyPanel = () => {
    //vamos a usar el hook useTranslation para traducir los textos
    const { t } = useTranslation();
    //este estado guardara el nivel de dificultad seleccionado
    const [ selected, setSelected ] = useState<string>( "" );

    const { setUserData } = useGame();

    //este useEffect se ejecutara cada vez que el usuario cambie la dificultad, y actualizara el contexto con el nuevo valor
    useEffect( () => {
        if( selected ) {
            //cada vez que la seleccion del usuario cambia, se modifica el valor del contexto
            setUserData ( prevData => ( {
                ...prevData,
                difficulty: selected
            }))
        }
    }, [ selected, setUserData ] ); // 

    //esta funcion maneja el click en los botones de dificultad
    const handleClick = ( level : string)=>{
        setSelected( level );
    }
    return (
        <>
            <div>
                <div className="flex flex-col justify-between items-center">
                    { buttonsLevels.map(( level, index ) => {
                        return(
                            <button
                                key={ index }
                                className={ `${ stylesButton } ${ selected === level ? "bg-red-600 text-white" : "" }` }
                                onClick={  ( ) => handleClick( level ) }
                                >{ t ( `difficulty.${ level }`) }
                            </button>
                        )
                    })}
                </div>

                <p className="mt-4 text-gray-600 text-center">{ !selected? "escoge tu dificultad" : t(`description.${ selected }`)}</p>
            </div>

            <Link to= "/game"><button className={ selected? "" : buttonDisabled }>{ t( "startGame" ) }</button></Link>
            
        </>
        
    );
}

export default DifficultyPanel;