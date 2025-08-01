//ete componente tendrá 2 botones para que el usuario pueda repetir el juego o salir a la pantalla principal
import { useNavigate} from "react-router-dom";
import useGame from "../../../hook/useGame";
import { useTranslation } from "react-i18next";

const ButtonNavigation = ( ) => {
    //necesito el estado del  juego para saber sque botones mostrar al usuario
    const { userData } = useGame();
    //usare useTranslation
    const { t } = useTranslation();
    //hook para navegar entre paginas
    const backHome = useNavigate();
    //funcion de lcik para volver a la pagina principal
    const handleClick = ()=>{
        backHome( "/" )
    }

    //funcion para renderizar los botones de acuerdo al estado del juego
    const renderButtons = () =>{
        //si el estado es won entonces me devulve 2 botones repetir y salir
        if( userData.gameStatus === "won" ){
            return (
                <>
                    <button> { t( "buttonsModals.tryAgain" ) }</button>
                    <button onClick={ () => { handleClick() }  }>{ t("buttonsModals.exit" ) }</button>
                </>
            )
        }else if( userData.gameStatus === "timeOut" ){
            //si es timeOut entonces igual me devuelve 2 botones repetir y rendirse{
            return(
                <>
                    <button> { t( "buttonsModals.tryAgain" ) }</button>
                    <button>{ t("buttonsModals.giveUp" ) }</button>
                </>
            )
        }else{
            //si no es ningino de los dos entonces por ende es lost que me devolvera un boton de salir
            return <button onClick={ () => { handleClick() }  }>{ t("buttonsModals.exit" ) }</button>
        }
    }

    return (
        <div>
            { renderButtons() }
        </div>
    );

}
export default ButtonNavigation;