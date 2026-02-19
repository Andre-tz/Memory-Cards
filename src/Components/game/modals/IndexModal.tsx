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
        <div className="fixed inset-0 z50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"> 
            <div className="w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] p-5 space-y-5">
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
        </div>
    )
}

export default IndexModal;