import { useNavigate } from "react-router-dom";
import { CityCard } from "../components/CityCard/CityCard"
import { useSaveCity } from "../hooks/useSaveCity";
import { useCallback, useEffect } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getWeatherForecast } from "../rdx/slices/forecastSlice";
import { getCityName, getRegionName, getCountryCode, getLatitudeCoords, getLongitudeCoords } from "../rdx/slices/locationSlice";
import defaultImg from '../assets/images/backgrounds/defaultCity1.jpg'
import { GiModernCity } from 'react-icons/Gi'
import { IconContext } from "react-icons";
import { Loader } from "../components/Loader";
import { useCityImage } from "../hooks/useCityImage";
import { UseCityForecasts } from "../hooks/useCitiesForecasts";




export const UserCitiesPage:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { saved, onUnsaveCity } = useSaveCity()
    const { loading } = useAppSelector(state => state.saved)
    const { imgErr, getCityBgImage } = useCityImage()
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
        // getCityBgImage()
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
                                            cityImgSrc={imgErr === '' ? city.image !== '' ? city.image : defaultImg : defaultImg }
                                        />
                                    </div>      
                    })
                ))
            )}
            {saved?.length === 0 && !loading && (
                <div className="flex flex-col gap-5 items-center">
                    <IconContext.Provider value={{ color: "#bae6fd", size: "130px"}} >
                        <GiModernCity/>
                    </IconContext.Provider>
                    <p className="uppercase text-2xl text-sky-100 font-extralight"> 
                        You don't have any saved cities yet
                    </p>
                </div>
            )}
            {saved?.length > 0 && errorForecast !=='' && (
                <ErrorMessage/>
            )}
        </div>
    )
}