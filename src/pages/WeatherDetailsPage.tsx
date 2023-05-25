
import { DailyWeatherInfo } from "../components/DailyWeatherInfo"
import { BackButton } from "../components/BackButton";
import { useDate } from "../hooks/useDate";


interface WeatherDetailsPageProps {
    cityName: string;
    country: string;
    currentTime: number;
    cityTimeZone: string;
}


export const WeatherDetailsPage: React.FC<WeatherDetailsPageProps> = ({cityName, country, currentTime, cityTimeZone}) => {

    const {weekday, formatDate, time} = useDate(currentTime, cityTimeZone)

    return (
        <div className="py-16 flex flex-col gap-8">
            <BackButton buttonText={"Back to daily forecast"}/>
            <div className="text-center uppercase">
                <h1 className="text-4xl text-white font-extrabold">
                    {`${cityName}, ${country}`}
                </h1>
                <p className="text-2xl text-sky-200 font-extralight">
                    {time}
                </p>
            </div>
            <DailyWeatherInfo  
                weatherIcon={"icon"} 
                currentDate={formatDate} 
                weekday={weekday}
            />
        </div>
    )
}