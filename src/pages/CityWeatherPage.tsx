import { BackButton } from "../components/buttons/BackButton"
import { WeatherDisplay } from "../components/dataDisplay/WeatherDisplay"

export const CityWeatherPage: React.FC = () => {
    return (
        <div className="py-16 flex flex-col gap-8">
            <BackButton buttonText={"Back to saved cities"}/>
            <WeatherDisplay />
        </div>
    )
}