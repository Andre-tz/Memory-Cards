import { useEffect, useState } from "react";
import useGame from "../../hook/useGame";

//este componente es el que cambiará de tema el juego 
const ThemeSwitcher = ( ) => {
    const [ swichTheme, setSwitchTheme ] = useState<boolean>( false );
    const { setUserData } = useGame();

    //funcion para cambiar el tema
    const handleTheme = () =>{
        setSwitchTheme( prev => !prev )
    }
    //actualizando el localStorage
    useEffect( ()=>{
        setUserData( prev =>( {
            ...prev,
            codeTheme : swichTheme
        }))
    } , [swichTheme, setUserData])

    return (
        <div>
            <button onClick={ handleTheme } className="px-3 py-2 text-sm font-medium bg-[var(--card)] text-[var(--text)] border border-[var(--border)] rounded-md cursor-pointer transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"> Cambiar Tema</button>
        </div>
    )
}
export default ThemeSwitcher;