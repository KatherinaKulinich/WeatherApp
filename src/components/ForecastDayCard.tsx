import { Tooltip, Zoom } from "@mui/material";
import { IconContext } from "react-icons";
import { MdDoubleArrow } from 'react-icons/Md';
import { useDate } from "../hooks/useDate";
import { useAppSelector } from "../hooks/hooks";
import { Link } from "react-router-dom";
import { getWeatherBackground } from "../utils/getWeatherBackground";



interface ForecastDayCardProps {
    date: number;
    temperatureValue: number;
    forecastImage: string;
    onOpenDayDetails: any;
    path: string
}







export const ForecastDayCard: React.FC<ForecastDayCardProps> = ({date, temperatureValue, forecastImage, onOpenDayDetails, path}) => {

    const {timezone: cityTimeZone } = useAppSelector(state => state.forecast.weatherForecast)
    const {weekday, formatDate} = useDate(date*1000, cityTimeZone)

    


    return (
        <Tooltip 
            title={
                <h1 style={{ color: "#bae6fd", fontSize: '15px' }}>
                    More forecast info
                </h1>
            } 
            placement="right-start" 
            arrow TransitionComponent={Zoom} 
        >
            <Link 
                to={path} 
                className="block w-full"
            >
                <div 
                    className="w-full p-4 md:p-8 flex items-stretch justify-between border-sky-200 border rounded-xl" 
                    style={{backgroundImage: `url(${getWeatherBackground(forecastImage)})`, backgroundPosition:'center', backgroundSize:'cover'}}
                    onClick={onOpenDayDetails}
                >
                    <div>
                        <p className="uppercase text-sky-100 text-xs md:text-md">
                            {weekday}
                        </p>
                        <p className="uppercase text-white font-bold text-lg md:text-2xl">
                            {formatDate}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-8">
                        <p className="text-3xl md:text-5xl text-white font-extrabold">
                            {temperatureValue} &#8451;
                        </p>
                        <IconContext.Provider value={{ color: "#fde68a", size: "54px" }}>
                            <MdDoubleArrow/>
                        </IconContext.Provider>
                    </div>
                </div>
            </Link>
        </Tooltip>
    )
}