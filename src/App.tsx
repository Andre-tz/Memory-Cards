//App tendra la aplicacoin completa, header, footer y el home
import Header from "./Components/Header";
import Footer from "./Components/Footer"
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import useGame from "./hook/useGame";
import { useEffect, useState } from "react";

function App() {
    const { userData } = useGame();
    //esta constante guardará el tipo de fuente
    const [ font, setFont ] = useState<string>( "" );
    //con useEffect cambiara el valor de la variable cada vez que el usuario cambie de tema
   useEffect( ()=>{
    if( userData.codeTheme ) { 
        setFont( "font-['Ubuntu_Mono']")
    } else { 
        setFont( "font-['Rubik']" )
    }
   }, [ userData.codeTheme])

  return (
    <div className={ `${ font } ${ userData.codeTheme ? "theme-code" : "theme-normal"} min-h-screen box-border bg-[var(--bg)] text-[var(--text)] flex flex-col items-center px-4 py-4 transition-colors duration-300`}>
        <Header />
        <main className="p-4 flex flex-col items-center justify-center relative z-0 flex-1">
            <Outlet /> 
        </main>
        <Footer />
        <Toaster position="top-center" />
    </div>
  )
}

export default App;
