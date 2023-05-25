import { useNavigate } from "react-router-dom";
import { CityCard } from "../components/CityCard/CityCard"


export const UserCitiesPage:React.FC = () => {
    const navigate = useNavigate();

    const onOpenCityForecast = (cityName:string) => {
        navigate(`/saved/${cityName}`)
    }
    


    return (
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 py-20">
            <div className="w-80">
                <CityCard cityName={"kkkk"} temperatureValue={0} descriptionValue={"sunny"} windValue={0} pressureValue={0} rainValue={0} humidityValue={0} onOpenCity={() => onOpenCityForecast('kkkk')}/>
            </div>
            <div className="w-80">
                <CityCard cityName={"kkkk"} temperatureValue={0} descriptionValue={"sunny"} windValue={0} pressureValue={0} rainValue={0} humidityValue={0} onOpenCity={undefined}/>
            </div>
            <div className="w-80">
                <CityCard cityName={"kkkk"} temperatureValue={0} descriptionValue={"sunny"} windValue={0} pressureValue={0} rainValue={0} humidityValue={0} onOpenCity={undefined}/>
            </div>
            
        </div>
    )
}