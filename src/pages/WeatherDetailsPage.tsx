import { DailyWeatherInfo } from "../components/dataDisplay/DailyWeatherInfo"
import { BackButton } from "../components/buttons/BackButton";
import { useDate } from "../hooks/useDate";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CityMainInfo } from "../components/dataDisplay/CityMainInfo";




export const WeatherDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const forecast = useAppSelector(state => state.forecast.weatherForecast)

    const { cityName, regionName, countryCode } = useAppSelector(state => state.locationData)
    const { timezone: cityTimeZone } = useAppSelector(state => state.forecast.weatherForecast)
    const { uvi, sunrise, sunset, temp, feels_like, pressure, humidity, wind_speed, weather, clouds, pop, dt } = useAppSelector(state => state.forecast.dailyForecast)


    useEffect(() => {
        if (Object.keys(forecast).length === 0) {
            navigate('/')
        }
    }, [])

    const currentTime = new Date().getTime()
    const { time } = useDate(currentTime, cityTimeZone)

    const description = weather ? weather[0]?.description : ''
    const icon = weather ? weather[0]?.icon : ''





    return (
        <div>
            { Object.keys(forecast).length !== 0 ? (
                <div className="py-16 flex flex-col gap-12">
                    <BackButton buttonText={"Back to daily forecast"}/>
                    <CityMainInfo 
                        cityName={cityName} 
                        regionName={regionName} 
                        countryCode={countryCode} 
                        cityTimeZone={cityTimeZone} 
                        currentTime={time}
                    />
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
                    <p className={`text-lg md:text-2xl text-sky-200 font-extralight tracking-widest`}>
                        City hadn't been selected
                    </p>
                </div>
            )}
        </div>
    )
}