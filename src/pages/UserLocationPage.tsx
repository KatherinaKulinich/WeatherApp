import { useState } from "react"
import { IconContext } from "react-icons";
import { GiSherlockHolmes } from 'react-icons/Gi'
import { WeatherDisplay } from "../components/WeatherDisplay";

export const UserLocationPage: React.FC = () => {
    const [location, setLocation] = useState('')


    return (
        <div className="py-9">
            {location !== '' ? (
                <WeatherDisplay 
                    cityName={"Kharkiv"}
                    country={"ua"} 
                    currentDate={0} 
                    cityTimeZone={""}                    
                />
            ) : (
                <div className="flex flex-col items-center gap-10 w-full h-full">
                    <p className="text-center uppercase text-xl sm:text-2xl text-sky-200 font-extralight ">
                        Failed to detect geolocation automatically
                    </p>
                    <IconContext.Provider value={{ color: "#e0f2fe", size: "140px" }}>
                        <GiSherlockHolmes/>
                    </IconContext.Provider>
                </div>
            )}
        </div>
    )
}