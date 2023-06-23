import { FaRegStar, FaStar } from 'react-icons/Fa'
import { IconContext } from "react-icons";

interface SaveCityButtonProps {
    onSave: React.MouseEventHandler<HTMLDivElement>;
    check: boolean;
}

export const SaveCityButton:React.FC<SaveCityButtonProps> = ({onSave, check}) => {
    
    return (
        <div  
            className="flex items-center gap-4 cursor-pointer active:text-amber-400"
            onClick={onSave}
        >
            {check ? (
                <IconContext.Provider value={{ color: "#fde68a", size: "22px"}} >
                    <FaStar/>
                </IconContext.Provider>
            ) : (
                <IconContext.Provider value={{ color: "#fde68a", size: "22px"}} >
                    <FaRegStar/>
                </IconContext.Provider>
            )}
            <p className="uppercase text-lg md:text-2xl font-extrabold text-amber-200 active:text-amber-400">
                {check ? 'Saved!' : 'Save this city' } 
            </p>
        </div>
    )
}