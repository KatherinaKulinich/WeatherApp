
import { useEffect, useState } from "react"
import { SearchField } from "../components/SearchField"
import { WeatherDisplay } from "../components/WeatherDisplay"
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchLocationData, onClearCoords } from "../rdx/locationSlice";
import { clearForecastData, fetchForecast, getLoading, getWeatherForecast } from "../rdx/forecastSlice";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";

export const MainPage:React.FC = () => {
    
    const dispatch = useAppDispatch();


    const latitude = useAppSelector(state => state.locationData.coords.latitude)
    const longitude = useAppSelector(state => state.locationData.coords.longitude)

    const forecastData = useAppSelector(state => state.forecast.weatherForecast)

    const [textValue, setTextValue] = useState('')
    // const [data, setData] = useState(false)

    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value)
    }

    const onGetForecast = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetchData()

        dispatch(getWeatherForecast({}))
        setTextValue('')
    }



    const fetchData = async() => {


        
        if (textValue !== '') {

            await dispatch(clearForecastData())
            await dispatch(getLoading())
            // await dispatch(getWeatherForecast({}))
            // await dispatch(onClearCoords())
            await dispatch(fetchLocationData(`direct?q=${textValue}`)) 
        }
    }



    useEffect(() => {
        // dispatch(getWeatherForecast({}))
        // dispatch(onClearCoords())
      

        if (latitude !== null && longitude !== null) {
            dispatch(fetchForecast(latitude, longitude))
        } 
    
        
    }, [textValue, latitude, longitude])
    
    console.warn(forecastData);


    const { loading } = useAppSelector(state => state.forecast)
    const { errorMessage } = useAppSelector(state => state.forecast)
    



    return (
        <div className="flex flex-col items-center gap-20 py-16 w-full">
            <SearchField
                onChangeInput={onChangeInputValue}
                inputValue={textValue}
                onSubmitData={onGetForecast}
            />
            {loading && (
                <Loader/>
            )}
            {Object.keys(forecastData).length !== 0 && (
                <WeatherDisplay />
            )}
            {errorMessage && (
                <ErrorMessage/>
            )}
        </div>
    )
}