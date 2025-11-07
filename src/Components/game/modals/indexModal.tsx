//este componente centralizará los modales en uno
import VictoryModal from "./VictoryModal";
import TimeOutModal from "./TimeOutModal";
import ButtonNavigation from "./ButtonsNavigation";
import LoseModal from "./LoseModal";
//tipo de los diferentes estados que recibirá como propiedad
type UserStatus= "won" |"timeOut" | "lost"
type PropsModal = {
    status : UserStatus;
    onReset : ()=> void;
}

const IndexModal = ( { status, onReset  } : PropsModal ) =>{

    return (
        <div> 
            {
                status === "won"?
                    <VictoryModal />
                    :
                    status === "timeOut"?
                    <TimeOutModal />
                    :
                    <LoseModal />
            }
            
            <ButtonNavigation onReset={ onReset }/>
        </div>
    )
}

export default IndexModal;