import { useState } from "react";
import matchMp3 from "../assets/sounds/match.mp3"
import noMatchMp3 from "../assets/sounds/no-match.mp3"
import playSound from "../helpers/playSound";
import getMotivationalMessages from "../helpers/getMotivationalMessages";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import useGame from "./useGame";

type Card ={
    name: string;
    index: number;
}
const useGameLogic = ()=>{
    const { userData } = useGame();
    const { t } = useTranslation();

    //este estado guardara las ccartas seleccionadas por el usuario
    const [ selectedCards, setSelectedCards ] = useState<Card[]>( [] );
    //este estado guarda los nombres de las cartas volteadas
    const [ matchedCards, setMatchedCards ] = useState<string[]>( [] );
    //obteniendo mensajje
    const matchMessage = getMotivationalMessages( "match", t, userData.name )

    // esta funcion manejara los click a las cartas con su posicion
    const handleCardClick = ( card : Card ) =>{
        //si el tamaño del array es 2 entonces no habra mas clicks
        if( selectedCards.length === 2 ) return;
        //si la carta misma carta es añadida de nuevo entonces tambien lo retorno
        //if( selectedCards.includes( cardName ) ) return;
        if( selectedCards.some( infoCard => infoCard.index === card.index ) ) return;
        //como React los valores se actualizan de manera asincroma debo trabajar con una variable de apoyo para trabahar con los valores mas actuales
        const newSelected = [ ...selectedCards, { name: card.name, index: card.index } ];
        //actualizando el estado
        setSelectedCards( newSelected )

        if( newSelected.length === 2 ){
            const [ firstCard, secondCard ] = newSelected

            if( firstCard.name === secondCard.name ){
                //si ambos son iguales, hay un match
                setMatchedCards( prev => [ ...prev, firstCard.name ] )
                //reproducimos sonido de match
                playSound( matchMp3 )
                //aplicando mensaje de match
                if( matchMessage ) toast( matchMessage )
                //ahora limpiamos el array
                setTimeout( ()=>{
                    setSelectedCards( [] )
                }, 500 )
            }else{
                //si son diferentes se voltean y limpiamos el array 
                //sonido de no match
                playSound( noMatchMp3 )
                setTimeout(() => {
                    setSelectedCards( [] );
                }, 1000);
            }
        }
    }
    //codigo para el glitch
    const glitchWin = ( gameImages : string[] )=>{
        //quitamos los  duplicados porque React se sigue quedando con los valores viejos
        const uniqueImages = [ ...new Set( gameImages ) ];
        const matches = uniqueImages.filter( images => !matchedCards.includes( images ))
        setMatchedCards( prev=> [ ...prev, ...matches])
    }

    //funcion para reiniciar el juego
    const resetGame = ()=> {
        setMatchedCards( [ ] );
        setSelectedCards( [ ] );
    }

    return{ selectedCards, matchedCards, handleCardClick, glitchWin, resetGame }
}

export default useGameLogic;
