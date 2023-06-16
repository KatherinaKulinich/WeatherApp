import { useCallback, useState } from "react";
import { getLoading } from "../rdx/slices/forecastSlice";
import { useAppDispatch } from "./hooks";
import { useSaveCity } from "./useSaveCity";



export const UseCityForecasts = () => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const API_URL = import.meta.env.VITE_WEATHER_API_URL;

    const dispatch = useAppDispatch();
    const { saved } = useSaveCity();
    const [ forecasts, setForecasts ] = useState<GeneralForecast[]>([]);
    const [ errorForecast, setErrorForecast ] = useState('');


    

    const getForecastForSavedCities = useCallback(() => {
        dispatch(getLoading())
        setForecasts([])
        setErrorForecast('')

        saved.map(async (city) => {
            const {latitude, longitude} = city

            return await fetch(`${API_URL}/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('Something went wrong')
            })
            .then(data => {
                setForecasts(prev => [...prev, data])
            })
            .catch((error) => {
                setErrorForecast(error.message)
            })
        })   
    },[])



    return {
        getForecastForSavedCities,
        errorForecast,
        forecasts,
    }
}