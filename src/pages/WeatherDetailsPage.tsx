
import { DailyWeatherInfo } from "../components/DailyWeatherInfo"
import { BackButton } from "../components/BackButton";
import { useDate } from "../hooks/useDate";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";




export const WeatherDetailsPage: React.FC = () => {

    const navigate = useNavigate();
    const forecast = useAppSelector(state => state.forecast.weatherForecast)
    console.log(forecast);
    

    useEffect(() => {
        if (Object.keys(forecast).length === 0) {
            navigate('/')
        }
    }, [forecast])


    const { cityName, regionName, countryCode } = useAppSelector(state => state.locationData)
    const {timezone: cityTimeZone} = useAppSelector(state => state.forecast.weatherForecast)
    
    const currentTime = new Date().getTime()
    const {time} = useDate(currentTime, cityTimeZone)

    const {uvi, sunrise, sunset, temp, feels_like, pressure, humidity, wind_speed, weather, clouds, pop, dt} = useAppSelector(state => state.forecast.dailyForecast)
    const description = weather ? weather[0]?.description : ''
    const icon = weather ? weather[0]?.icon : ''
   




    return (
        <div>
            { Object.keys(forecast).length !== 0 ? (
                <div className="py-16 flex flex-col gap-12">
                    <BackButton buttonText={"Back to daily forecast"}/>
                    <div className="text-center uppercase">
                        <h1 className="text-2xl md:text-5xl text-white font-extrabold">
                            {`${cityName}`}
                        </h1>
                        <p className="text-lg md:text-2xl text-white font-extrabold"> 
                            {`${regionName}, ${countryCode}`}
                        </p>
                        <p className="text-lg md:text-2xl text-sky-200 font-extralight tracking-widest">
                            {time}
                        </p>
                        <p className="text-xs md:text-lg text-sky-200 font-extralight tracking-widest">
                            {cityTimeZone}
                        </p>
                    </div>
                    <DailyWeatherInfo 
                        weatherIcon={icon}
                        temperatureValue={temp?.day} 
                        description={description} 
                        feelslike={feels_like?.day} 
                        windSpeed={wind_speed} 
                        humidity={humidity} 
                        pressure={pressure} 
                        minTemp={(Math.round(temp?.min))} 
                        maxTemp={Math.round(temp?.max)} 
                        clouds={clouds} 
                        averagePop={pop*100} 
                        uvi={uvi} 
                        sunrise={sunrise} 
                        sunset={sunset}     
                        dt={dt}      
                        currentTimeZone={cityTimeZone}   
                    />
                </div>
            ) : (
                <div className="py-16 flex flex-col gap-12">
                    <p className="text-lg md:text-2xl text-sky-200 font-extralight tracking-widest">
                        City hadn't been selected
                    </p>
                </div>
            )}
        </div>
    )
}