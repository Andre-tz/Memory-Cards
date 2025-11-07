//modal que se mostrará cuando el usuario decida rendirse
import { useTranslation } from "react-i18next";

const LoseModal = ( ) =>{
    const { t } = useTranslation();

    return (
        <div>
            <h2>{ t("loseModal.title" ) }</h2>
            <p>{ t("loseModal.message" ) }</p>
        </div>
    );
}

export default LoseModal;