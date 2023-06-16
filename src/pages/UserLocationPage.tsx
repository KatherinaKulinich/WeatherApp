import { useCallback, useEffect, useState } from "react"
import { IconContext } from "react-icons";
import { GiSherlockHolmes } from 'react-icons/Gi'
import { WeatherDisplay } from "../components/WeatherDisplay";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchForecast, getWeatherForecast } from "../rdx/slices/forecastSlice";
import { fetchLocationData } from "../rdx/slices/locationSlice";
import { ErrorMessage } from "../components/ErrorMessage";





export const UserLocationPage: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true)
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    
    const forecast = useAppSelector(state => state.forecast.weatherForecast)
    const error = useAppSelector(state => state.forecast.errorMessage)
    
    



    const getUserLocation = useCallback(async (position: { coords: { longitude: number; latitude: number }}) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    },[])
    
    
    const errorLocation = () => {
        setLoading(false)
    }

    const getLocationData = useCallback(() => {
        navigator.geolocation.getCurrentPosition(getUserLocation, errorLocation);
    },[])


    const fetchData = useCallback(async () => { 
        dispatch(getWeatherForecast({} as GeneralForecast))
        await window.addEventListener('load', getLocationData)
        

        if (latitude !== null && longitude !== null) {
            await dispatch(fetchLocationData(`reverse?lat=${latitude}&lon=${longitude}`))  
            await dispatch(fetchForecast(latitude, longitude))
            await setLoading(false)
        }
    },[latitude, longitude])
    


    useEffect(() => {
        getLocationData()
        fetchData()
    },[latitude, longitude])


    
  
    


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