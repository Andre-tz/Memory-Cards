import { useTranslation } from "react-i18next";

const TimeOutModal = ( ) =>{
    const { t } = useTranslation();

    return (
        <div>
            <h2>{ t("timeOutModal.title" ) }</h2>
            <p>{ t("timeOutModal.message" ) }</p>
        </div>
    );
}

export default TimeOutModal;