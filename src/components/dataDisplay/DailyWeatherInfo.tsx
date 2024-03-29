import { useCallback } from "react";
import { TitleWeatherData } from "./TitleWeatherData";
import { WidgetsGroup } from "./WidgetsGroup";






interface DailyWeatherInfoProps {
    weatherIcon: string;
    children?: React.ReactNode
    temperatureValue: number;
    description: string;
    feelslike: number;
    windSpeed: number;
    humidity: number;
    pressure: number;
    minTemp:number;
    maxTemp: number;
    clouds: number;
    averagePop: number;
    uvi:number;
    sunrise: number;
    sunset:number;
    dt:number;
    currentTimeZone: string;
}



export const DailyWeatherInfo:React.FC<DailyWeatherInfoProps> = (
    { weatherIcon, children, temperatureValue, description, feelslike, windSpeed, humidity, pressure,maxTemp, minTemp, clouds, averagePop, uvi, sunrise, sunset, dt, currentTimeZone }) => {
    
    const IMG_URL = import.meta.env.VITE_WEATHER_ICON_URL



    const getSimpleTime = useCallback((timeValue:number) => {
        const date = new Date(timeValue * 1000)
        const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone: currentTimeZone })

        return time
    },[])



    return (
        <div className="flex flex-col gap-20 md:gap-32 w-full ml-auto mr-auto">
            <div className="flex flex-col sm:flex-row gap-14 items-center justify-center md:gap-30 w-full">
                <div className="p-3 rounded-full bg-sky-100/25 w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
                    <img 
                        src={`${IMG_URL}${weatherIcon}@2x.png`} 
                        alt="weatherIcon" 
                        width={140}
                        height={140}
                    />
                </div>
                <TitleWeatherData 
                    date={dt} 
                    temperatureValue={Math.round(temperatureValue)} 
                    weatherDescription={description} 
                    tempFeelValue={Math.round(feelslike)}
                />
            </div>
            {children}
            <div  className="flex flex-wrap ">
                <WidgetsGroup 
                    windValue={Math.round(windSpeed)} 
                    humidityValue={humidity} 
                    pressureValue={pressure} 
                    tempMin={minTemp} 
                    tempMax={maxTemp} 
                    cloudsValue={clouds} 
                    rainValue={averagePop} 
                    uvValue={(Math.round(uvi))} 
                    sunriseValue={getSimpleTime(sunrise)} 
                    sunsetValue={getSimpleTime(sunset)}
                />
            </div>
        </div>
    )
}