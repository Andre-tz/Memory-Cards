//este componente centralizará los modales en uno
import VictoryModal from "./VictoryModal";
import TimeOutModal from "./TimeOutModal";
import ButtonNavigation from "./ButtonsNavigation";
//tipo de los diferentes estados que recibirá como propiedad
type UserStatus= "won" |"timeOut"

const indexModal = ( status : UserStatus ) =>{
 
    return (
        <div> 
            {
                status === "won"?
                    <VictoryModal />
                    :
                    <TimeOutModal />
            }
            <ButtonNavigation />
        </div>
    )
}

export default indexModal;