import { useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { GiSherlockHolmes } from 'react-icons/Gi'
import { WeatherDisplay } from "../components/WeatherDisplay";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchForecast } from "../rdx/forecastSlice";
import { fetchLocationData } from "../rdx/locationSlice";
import { ErrorMessage } from "../components/ErrorMessage";





export const UserLocationPage: React.FC = () => {
    
    const [loading, setLoading] = useState(true)

    const [latitude, setLatitude] = useState<number | null>(null)
    const [longtitude, setLongtitude] = useState<number | null>(null)
    
    const dispatch = useAppDispatch();
    const forecast = useAppSelector(state => state.forecast.weatherForecast)
    const error = useAppSelector(state => state.forecast.errorMessage)
    
    
    
    const getUserLocation = async (position: { coords: { longitude: number; latitude: number }}) => {
        setLatitude(position.coords.latitude)
        setLongtitude(position.coords.longitude)
    }
    
    
    const errorLocation = () => {
        setLoading(false)
    }


    const fetchData = async () => {
        window.addEventListener('load', () => {
            navigator.geolocation.getCurrentPosition(getUserLocation, errorLocation);
        })


        if (latitude !== null && longtitude !== null) {
            await dispatch(fetchLocationData(`reverse?lat=${latitude}&lon=${longtitude}`))  
            await dispatch(fetchForecast(latitude, longtitude))
            await setLoading(false)
        }
    }
    


    useEffect(() => {

        fetchData()

    },[latitude, longtitude])


    
  
    

    


    return (
        <div className="py-16">
            {Object.keys(forecast).length === 0  && loading && (
                <div className="w-full h-full flex items-center justify-center">
                    <Loader/>
                </div>
            )}
            {Object.keys(forecast).length !== 0 && (
                <WeatherDisplay/>
            )}
            {Object.keys(forecast).length === 0 && !loading && error === '' && (
                <div className="flex flex-col items-center gap-10 w-full h-full">
                    <p className="text-center uppercase text-xl sm:text-2xl text-sky-200 font-extralight ">
                        Failed to detect geolocation automatically
                    </p>
                    <IconContext.Provider value={{ color: "#e0f2fe", size: "140px" }}>
                        <GiSherlockHolmes/>
                    </IconContext.Provider>
                </div>
            )}
            {error !== '' && (
                <ErrorMessage/>
            )}
        </div>
    )
}