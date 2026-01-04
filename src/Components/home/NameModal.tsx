import { useState } from "react";
import { useTranslation } from "react-i18next"
import useGame from "../../hook/useGame";

//este modal aparecerá para que el usuasrio colocque su nombre
const NameModal = ( )=>{
    //useTranslation para la traduccion
    const { t } = useTranslation();
    //estado que manejara el valor del input
    const [ inputValue, setInputValue ] = useState<string>( "" );
    //usando el estado global
    const { setUserData } = useGame();
    //funcion para capturar el valor del input
    const handleChange = ( e : React.ChangeEvent<HTMLInputElement> ) =>{
        setInputValue( e.target.value )
    }

    //funcion que guardará el nombre de la persona
    const handleClick = ( ) =>{
        setUserData( prev => ( { ...prev, name: inputValue } ) )
    }

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="w-[90%] max-w-md rounded-xl bg-[var(--bg)] p-6 text-[var(--text)] shadow-lg">
                <h1 className="text-2xl font-bold mb-2">{ t( "nameModal.title" ) }</h1>
                <p className="mb-4 text[var(--muted)]"> { t( "nameModal.message" ) }</p>

                <label className="block mb-4">
                    <input className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2  outline-none placeholder:text-[var(--muted)]" onChange={ handleChange } value={ inputValue }  type="text" placeholder={ t( "nameModal.placeholder" ) } />
                </label>

                <button className="w-full bg-[var(--accent)] text-white py-2 rounded-md font-semibold transition hover:opacity-90 cursor-pointer" onClick={ handleClick }>{ t( "nameModal.button" ) }</button>
            </div>
        </div>
    )
}

export default NameModal;