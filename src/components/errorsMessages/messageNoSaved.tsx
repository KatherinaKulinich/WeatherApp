import { GiModernCity } from 'react-icons/Gi'
import { IconContext } from "react-icons";

export const MessageNoSaved:React.FC = () => {
    return (
        <div className="flex flex-col gap-5 items-center">
            <IconContext.Provider value={{ color: "#bae6fd", size: "130px"}} >
                <GiModernCity/>
            </IconContext.Provider>
            <p className="uppercase text-2xl text-sky-100 font-extralight"> 
                You don't have any saved cities yet
            </p>
        </div>
    )
}