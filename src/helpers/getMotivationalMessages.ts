//esta helper se encargara de obtener todos los mensajes que se usará en el juego pero ya usando i18next
import type { TFunction } from "i18next";

//este type tendra las posibles fases del juego
type GamePhase = "start" | "midTime" | "lowTime" | "match"
const getMotivationalMessages = ( phase : GamePhase, t?: TFunction, userName : string = "" ) : string  =>{

    if( !t ) return ""
    const message = t( `motivation.${phase}`, { name : userName, returnObjects: true } ) as string[];
    //si no encuentra message retorna vacio 
    if( !message?.length ) return ""
    //aqui agarro un mesaje del array que tendre
    const index = Math.floor( Math.random( )*message.length )
    //retorno el mensaje seleccionado
    return message[ index ]
}
export default getMotivationalMessages;
