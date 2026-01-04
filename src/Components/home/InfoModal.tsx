import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useGame from "../../hook/useGame";

//este modal le mostrará al usuario las reglas del juego
const InfoModal = ( ) => {
    //constante para usar el cambio de idioma
    const { t } = useTranslation( );
    //este constante tendra el hook de navegacion
    const navigate = useNavigate();
    //obteniendo showIndo del context
    const { setShowInfo } = useGame();
    //funcion para ir a la pagina del juego
    const handleNavigate = ( ) =>{
        navigate( "/game" )
        setShowInfo( false )
    }
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-[90%] max-w-sm bg-[var(--card)] text-[var(--text)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] p-6 text-center">
                <h1 className="text-xl font-semibold mb-2">{t("infoModal.title")}</h1>
                <p className="text-sm text-[var(--muted)] mb-5">{t("infoModal.message")}</p>
                <button onClick={handleNavigate} className="px-4 py-2 bg-[var(--accent)] text-white rounded-md font-medium transition hover:opacity-90">{t("infoModal.button")}</button>
            </div>
        </div>

    )
}

export default InfoModal;