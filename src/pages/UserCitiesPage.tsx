import { useNavigate } from "react-router-dom";
import { CityCard } from "../components/cards/CityCard/CityCard"
import { useSaveCity } from "../hooks/useSaveCity";
import { useCallback, useEffect } from "react";
import { ErrorMessage } from "../components/errorsMessages/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getWeatherForecast } from "../rdx/slices/forecastSlice";
import { getCityName, getRegionName, getCountryCode, getLatitudeCoords, getLongitudeCoords } from "../rdx/slices/locationSlice";
import { Loader } from "../components/Loader";
import { UseCityForecasts } from "../hooks/useCitiesForecasts";
import defaultImg from '../assets/images/backgrounds/defaultCity1.jpg'
import { MessageNoSaved } from "../components/errorsMessages/messageNoSaved";




export const UserCitiesPage:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { saved, onUnsaveCity } = useSaveCity()
    const { loading } = useAppSelector(state => state.saved)
    const { forecasts, errorForecast, getForecastForSavedCities } = UseCityForecasts()



    const onOpenCityForecast = useCallback((locationData:SavedCityData, cityForecast:GeneralForecast) => {
        dispatch(getWeatherForecast(cityForecast))
        dispatch(getCityName(locationData.cityName))
        dispatch(getRegionName(locationData.regionName))
        dispatch(getCountryCode(locationData.countryName))
        dispatch(getLatitudeCoords(locationData.latitude))
        dispatch(getLongitudeCoords(locationData.longitude))

        navigate(`/saved/${locationData.cityName}`)
    },[])


    useEffect( () => {
        getForecastForSavedCities()
    }, [])




    return (
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 py-20">
            {loading && (
                <Loader/>
            )}
            {forecasts?.length > 0 && saved?.length > 0 && (
                forecasts.map((forecast) => (
                    saved.map((city) => {
                        if (city.latitude.toFixed(2) === forecast.lat.toFixed(2) )
                            return  <div 
                                        className="w-80"
                                        key={`${forecast.lat}${forecast.lon}`}
                                    >
                                        <CityCard 
                                            cityName={city.cityName} 
                                            temperatureValue={Math.round(forecast.current.temp)} 
                                            descriptionValue={forecast.current.weather[0].description} 
                                            windValue={Math.round(forecast.current.wind_speed)} 
                                            pressureValue={forecast.current.pressure} 
                                            rainValue={Math.round(forecast.current.dew_point)} 
                                            humidityValue={Math.round(forecast.current.humidity)} 
                                            onOpenCity={() => onOpenCityForecast(city, forecast)}
                                            onUnsaveCity={() => onUnsaveCity(city)}
                                            cityImgSrc={city.image !== '' ? city.image : defaultImg }
                                        />
                                    </div>      
                    })
                ))
            )}
            {saved?.length === 0 && !loading && (
                <MessageNoSaved/>
            )}
            {saved?.length > 0 && errorForecast !=='' && (
                <ErrorMessage/>
            )}
        </div>
    )
}