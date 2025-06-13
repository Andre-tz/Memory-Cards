import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './Components/home/Home.tsx';
import Game from './Components/game/Game.tsx';
import "./i18n"; // Ensure i18n is initialized before rendering
import { BrowserRouter} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import GameProvider from './Context/GameProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <GameProvider>
        <BrowserRouter>
            <Routes>
            <Route path= "/" element= { <App /> } > //es la ruta principal de la aplicacion, donde se renderiza el header, footer y la aplicación principal
                    <Route index element= { <Home /> } /> //esta es la ruta que se renderiza por defecto, el home esta reemplza el contenido de outlet por defecto
                    <Route path="/game" element={ < Game />} /> //esta es la ruta que se renderiza cuando se accede a /game, el componente Game es el que tendra todo el juego de memory cards
            </Route>
            </Routes>
        </BrowserRouter>
    </GameProvider>
)
