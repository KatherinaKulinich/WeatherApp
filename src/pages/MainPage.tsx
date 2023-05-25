import { SearchField } from "../components/SearchField"
import { WeatherDisplay } from "../components/WeatherDisplay"

export const MainPage:React.FC = () => {

    return (
        <div className="flex flex-col items-center gap-20 py-16 w-full">
            <SearchField/>
            <WeatherDisplay 
                cityName={"Kharkiv"}
                country={"ua"} 
                currentDate={0} 
                cityTimeZone={""}                
            />
        </div>
    )
}