import { HourlyWidget } from "./HourlyWidget";
import { TitleWeatherData } from "./TitleWeatherData";
import { WidgetsGroup } from "./WidgetsGroup";





interface DailyWeatherInfoProps {
    weatherIcon: string;
    currentDate: string;
    weekday: string;
}



export const DailyWeatherInfo:React.FC<DailyWeatherInfoProps> = ({ weatherIcon, currentDate, weekday}) => {


    return (
        <div className="flex flex-col gap-20 w-full ml-auto mr-auto">
            <div className="flex flex-col sm:flex-row gap-14 items-center justify-center md:gap-30 w-full">
                <div className="p-3 rounded-full bg-sky-50/10 w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
                    <img 
                        src={weatherIcon} 
                        alt="weatherIcon" 
                    />
                </div>
                <TitleWeatherData 
                    weekDay={weekday} 
                    date={currentDate} 
                    temperatureValue={0} 
                    weatherDescription={""} 
                    tempFeelValue={0}
                />
            </div>
            <div>
                <HourlyWidget/>
            </div>
            <div>
                <WidgetsGroup 
                    windValue={0} 
                    humidityValue={0} 
                    pressureValue={0} 
                    tempMin={0} 
                    tempMax={0} 
                    cloudsValue={0} 
                    rainValue={0} 
                    uvValue={0} 
                    sunriseValue={0} 
                    sunsetValue={0}
                />
            </div>
        </div>
    )
}