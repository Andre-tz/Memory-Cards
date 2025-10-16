import { useState } from "react";

type Card ={
    name: string;
    index: number;
}
const useGameLogic = ()=>{

    //este estado guardara las ccartas seleccionadas por el usuario
    const [ selectedCards, setSelectedCards ] = useState<Card[]>( [] );
    //este estado guarda los nombres de las cartas volteadas
    const [ matchedCards, setMatchedCards ] = useState<string[]>( [] );

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
                //ahora limpiamos el array
                setTimeout( ()=>{
                    setSelectedCards( [] )
                }, 500 )
            }else{
                //si son diferentes se voltean y limpiamos el array 
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
