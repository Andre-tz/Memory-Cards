//este helper se encargará de realizar la cuenta atras del los distintos contadores
const startCountdown = ( 
    setTimer : React.Dispatch<React.SetStateAction<number>>, //este parametro maneja los setStates del los componentes
    onFinish? : () => void //con el "?" doy a entender que la funcion es opcional
)=>{
    //manejo el intervalo
    const interval = setInterval( () => {
        //actualizando el state
        setTimer( prev => {
            if( prev < 1 ){
                clearInterval( interval ) //limpiando el intervalo
                onFinish?.() //ejecuto la funcion solo si hay
                return 0 //retorno 0 al setState
            }
            return prev - 1 //si no entra a la condicional retorno el valor inicial del state  menos 1
        } ) 

    }, 1000);
    //retorno el intervalo para limpiarlo en mi useEffect
    return interval;
} 
export default startCountdown;