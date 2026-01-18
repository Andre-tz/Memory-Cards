//esta helper se encargara de obtener todos los mensajes que se usará en el juego pero ya usando i18next
import type { TFunction } from "i18next";

const motivationalMessages = ( t: TFunction, userName : string ) =>( {
    start: t( "motivational.start", { name : userName, returnObjects : true  } ) as string[],
    midTime: t( "motivational.midTime", { name : userName, returnObjects: true } )  as string[],
    lowTime: t( "motivational.lowTime", { name : userName, returnObjects : true }) as string[],
    match: t('motivation.match', { name: userName, returnObjects: true }) as string[],
} )

export default motivationalMessages;