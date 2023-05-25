import { ForecastDayCard } from "./ForecastDayCard"
import Rain from '../assets/images/backgrounds/rain.jpg';
import Storm from '../assets/images/backgrounds/storm.jpg';
import Mist from '../assets/images/backgrounds/mist.jpg';
import Sky from '../assets/images/backgrounds/sun.jpg';
import LightClouds from '../assets/images/backgrounds/lightClouds.jpg';
import DarkClouds from '../assets/images/backgrounds/arkClouds.jpg';
import Snow from '../assets/images/backgrounds/snow.jpg';
import { useNavigate } from "react-router-dom";

interface FutureForecastProps {
    weekday: string;
    currentDate: string;
}


export const FutureForecast: React.FC<FutureForecastProps> = ({weekday, currentDate}) => {
    const navigate = useNavigate();

    const onOpenDayForecast = (date: number) => {
        navigate(`/forecast/${date}`)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-3 w-full max-w-[600px] mr-auto ml-auto">
            <ForecastDayCard 
                temperatureValue={0}
                forecastImage={Snow} 
                onOpenDayDetails={()=>onOpenDayForecast(7777777)} 
                weekday={weekday}          
                currentDate={currentDate}
            />
        </div>
    )
}