import { Tooltip, Zoom } from "@mui/material";
import { IconContext } from "react-icons";
import { MdDoubleArrow } from 'react-icons/Md';



interface ForecastDayCardProps {
    currentDate: string;
    weekday: string;
    temperatureValue: number;
    forecastImage: string;
    onOpenDayDetails: any;
}







export const ForecastDayCard: React.FC<ForecastDayCardProps> = ({currentDate, weekday, temperatureValue, forecastImage, onOpenDayDetails}) => {


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
            <div 
                className="w-full p-4 md:p-8 flex items-stretch justify-between border-sky-200 border rounded-xl" 
                style={{backgroundImage: `url(${forecastImage})`, backgroundPosition:'center', backgroundSize:'cover'}}
                onClick={onOpenDayDetails}
            >
                <div>
                    <p className="uppercase text-sky-100 text-xs md:text-md">
                        {weekday}
                    </p>
                    <p className="uppercase text-white font-bold text-lg md:text-2xl">
                        {currentDate}
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
        </Tooltip>
    )
}