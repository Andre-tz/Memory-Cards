//modal que se mostrará cuando el usuario decida rendirse
import { useTranslation } from "react-i18next";

const LoseModal = ( ) =>{
    const { t } = useTranslation();

    return (
        <div className="text-center space-y-3">
            <h2 className="text-lg font-semibold text-[var(--text)]">{ t("loseModal.title" ) }</h2>
            <p className="text-sm text-[var(--muted)]">{ t("loseModal.message" ) }</p>
        </div>
    );
}

export default LoseModal;