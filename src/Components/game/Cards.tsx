//este es el componente de las cartas
import useGame from "../../hook/useGame";
import "../../index.css"
//creamos el tipo del cual nuesta carta tomará valores
type CardsProps = {
    id: number;
    image: string;
    isFlipped : boolean;
    onClick  : ( iname: string, id: number )=> void
}

const Cards = ( {id,  image, isFlipped, onClick } : CardsProps )=>{
    const { userData } = useGame( );
    const route = userData.codeTheme? "languages" : "characters"

    return(
        <div className="perspective-[1000px]" onClick={ () => onClick( image, id ) } >
            <div className={ `relative w-[60px] h-[90px] sm:w-[100px] sm:h-[150px] rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-card)] transition duration-500 preserve-3d ${ isFlipped? "rotate-y-180" : "" } ` }>
                {/* Cara frontal */}
                <div className=" cursor-pointer absolute inset-0 flex items-center justify-center backface-hidden text-[var(--muted)] text-xl font-semibold">
                    <h1 className="text-2xl">¿?</h1>
                </div>
                {/* Cara trasera */}
                <div className="absolute inset-0 flex items-center justify-center rotate-y-180 backface-hidden bg-[var(--card-image-bg)] p-[var(--card-image-padding)]">
                    <img className="w-full h-full object-contain grayscale-[var(--card-image-filter)]" src={ `./src/images/${ route }/${ image }.webp`} alt={ `foto de ${ image }` }/>
                </div>
            </div>
        </div>
    )
}
export default Cards