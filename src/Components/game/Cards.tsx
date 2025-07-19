//este es el componente de las cartas
import "../../index.css"
//creamos el tipo del cual nuesta carta tomará valores
type CardsProps = {
    id: number;
    image: string;
    isFlipped : boolean;
    onClick  : ( iname: string, id: number )=> void
}

//clases predefinidas para las cartas
const cardsStyles = "w-full h-full backface-hidden"
const imgStyles = "max-w-[80] max-h-[80%]"

const Cards = ( {id,  image, isFlipped, onClick } : CardsProps )=>{

    return(
        <div className="perspective-[1000px]" onClick={ () => onClick( image, id ) } >
            <div className={ `w-[100px] h-[150px] rounded-[20px] border relative flex justify-center items-center transition ${ isFlipped? "rotate-y-180 duration-500 preserve-3d" : "" } ` }>
                <div className={ `${ cardsStyles } flex justify-center items-center`}>
                    <h1 className="text-2xl">¿?</h1>
                </div>
                <div className={ `${ cardsStyles } absolute top-0 left-0 rotate-y-180 flex justify-center items-center`}>
                    <img className={ `${ imgStyles} object-contain` } src={ `./src/images/${ image }.webp`} alt={ `foto de ${ image }` }/>
                </div>
            </div>
        </div>
    )
}
export default Cards