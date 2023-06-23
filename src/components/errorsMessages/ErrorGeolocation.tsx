import { IconContext } from "react-icons";
import { GiSherlockHolmes } from 'react-icons/Gi'

export const ErrorGeolocation:React.FC = () => {
    return (
         <div className="flex flex-col items-center gap-10 w-full h-full">
            <p className="text-center uppercase text-xl sm:text-2xl text-sky-200 font-extralight ">
                Failed to detect geolocation automatically
            </p>
            <IconContext.Provider value={{ color: "#e0f2fe", size: "140px" }}>
                <GiSherlockHolmes/>
            </IconContext.Provider>
        </div>
)
}