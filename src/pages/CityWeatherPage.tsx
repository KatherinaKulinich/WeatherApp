import { BackButton } from "../components/BackButton"
import { CityCard } from "../components/CityCard/CityCard"
import { WeatherDisplay } from "../components/WeatherDisplay"

export const CityWeatherPage: React.FC = () => {
    return (
        <div className="py-16 flex flex-col gap-8">
            <BackButton buttonText={"Back to saved cities"}/>
            <WeatherDisplay 
                cityName={"Kharkiv"} 
                country={"ua"} 
                currentTime={33333}
            />
        </div>
    )
}