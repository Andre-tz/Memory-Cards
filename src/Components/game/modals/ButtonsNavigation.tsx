//ete componente tendrá 2 botones para que el usuario pueda repetir el juego o salir a la pantalla principal
import { useNavigate} from "react-router-dom";
import useGame from "../../../hook/useGame";
import { useTranslation } from "react-i18next";

//clases para botones
const retryBtn = "bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition";
const exitBtn = "bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition";
const giveUpBtn = "bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition";

const ButtonNavigation = ( { onReset } : { onReset : ()=>void } ) => {
    //necesito el estado del  juego para saber sque botones mostrar al usuario
    const { userData, setUserData} = useGame();
    //usare useTranslation
    const { t } = useTranslation();
    //hook para navegar entre paginas
    const backHome = useNavigate();
    //funcion de lcik para volver a la pagina principal
    const handleExit = ()=>{
        backHome( "/" )
    }
    //funcion para cambiar el estado a lost del usuario
    const handleSurrender = ( )=>{
        setUserData( prev => ( { ...prev, gameStatus: "lost" } ) )
    }
    //funcion para renderizar los botones de acuerdo al estado del juego
    const renderButtons = () => {
        switch (userData.gameStatus) {
        case "won":
            return (
                <>
                    <button className={ retryBtn } onClick={ onReset }>{t("buttonModals.tryAgain")}</button>
                    <button onClick={ handleExit } className={exitBtn}>{t("buttonModals.exit")}</button>
                </>
            );

        case "timeOut":
            return (
                <>
                    <button className={ retryBtn } onClick={ onReset }>{t("buttonModals.tryAgain")}</button>
                    <button className={ giveUpBtn } onClick={ handleSurrender }>{t("buttonModals.giveUp")}</button>
                </>
            );

        case "lost":
        default:
            return (
                <button onClick={ handleExit } className={ exitBtn }>{t("buttonModals.exit")}</button>
            );
    }
};


    return (
        <div>
            { renderButtons() }
        </div>
    );

}
export default ButtonNavigation;