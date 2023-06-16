import { useCallback, useEffect, useState } from "react"
import { SearchField } from "../components/SearchField"
import { WeatherDisplay } from "../components/WeatherDisplay"
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchLocationData } from "../rdx/slices/locationSlice";
import { clearForecastData, fetchForecast, getLoading, getWeatherForecast } from "../rdx/slices/forecastSlice";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { FaRegStar, FaStar } from 'react-icons/Fa'
import { IconContext } from "react-icons";
import { useSaveCity } from "../hooks/useSaveCity";
import { Alert, AlertTitle } from "@mui/material";
import { useCityImage } from "../hooks/useCityImage";
import { useCheckCity } from "../hooks/useCheckCity";
import { fetchSavedCitiesData } from "../rdx/slices/savedSlice";
import { useAuth } from "../hooks/useUserAuthData";





export const MainPage:React.FC = () => {
    const dispatch = useAppDispatch();
    const { id : userId } = useAuth();
    const latitude = useAppSelector(state => state.locationData.coords.latitude)
    const longitude = useAppSelector(state => state.locationData.coords.longitude)
    const forecastData = useAppSelector(state => state.forecast.weatherForecast)
    const { loading } = useAppSelector(state => state.forecast)
    const { errorMessage } = useAppSelector(state => state.forecast)
    const { errorMessage: errorLocation } = useAppSelector(state => state.locationData)
    const { cityName, regionName, countryCode } = useAppSelector(state => state.locationData)
    const { timezone } = useAppSelector(state => state.forecast.weatherForecast)
    const { onSaveCityData } = useSaveCity()
    const { checkCity, onCheckSaving, setCheckCity } = useCheckCity()
    const { getCityBgImage } = useCityImage()
    const [textValue, setTextValue] = useState('')
    



    const onChangeInputValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {      
        setTextValue(e.target.value)
    },[])



    const fetchData = useCallback(async() => {
        if (textValue.trim() !== '') {
            const validValue = textValue.replaceAll(/[^a-zа-яіё ]/gi, '');
            await dispatch(clearForecastData())
            await dispatch(getLoading())
            await dispatch(fetchLocationData(`direct?q=${validValue}`)) 
        }

    },[textValue])



    const onGetForecast = useCallback((event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        fetchData()
        dispatch(getWeatherForecast({} as GeneralForecast))
        setTextValue('')

    },[textValue])


    useEffect(() => {
        if (latitude !== null && longitude !== null) {

            (async () => {
                await dispatch(fetchForecast(latitude, longitude))
                await onCheckSaving()
            })();
        }  
    }, [latitude, longitude, userId])



    const onSave = useCallback(
        async (cityName:string, regionName:string, countryName:string, latitude:number | null, longitude:number | null, timeZone:string) => {
            
        if (checkCity) return;
       
        await onSaveCityData(cityName, regionName, countryName, latitude, longitude, timeZone)
        await getCityBgImage()
        await setCheckCity(true)
        
        if (userId) {
            await dispatch(fetchSavedCitiesData(userId))
        }
    },[])





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

            {errorLocation !== '' && (
                <Alert 
                    severity="error" 
                    sx={{ width: '100%', maxWidth: '300px' }} 
                    variant="outlined" 
                    className="flex justify-center  items-center gap-4 uppercase"
                >
                    <AlertTitle className="text-red-600">
                        Error
                    </AlertTitle>
                    {errorLocation}
                </Alert>
            )}

            {Object.keys(forecastData).length !== 0  && errorLocation === '' && (
                <div  
                    className="flex items-center gap-4 cursor-pointer active:text-amber-400"
                    onClick={() => onSave(cityName, regionName, countryCode, latitude, longitude, timezone) }
                >
                    {checkCity ? (
                        <IconContext.Provider value={{ color: "#fde68a", size: "22px"}} >
                            <FaStar/>
                        </IconContext.Provider>
                    ) : (
                        <IconContext.Provider value={{ color: "#fde68a", size: "22px"}} >
                            <FaRegStar/>
                        </IconContext.Provider>
                    )}
                    <p className="uppercase text-lg md:text-2xl font-extrabold text-amber-200 active:text-amber-400">
                        {checkCity ? 'Saved!' : 'Save this city' } 
                    </p>
                </div>
            )}
            {Object.keys(forecastData).length !== 0 && errorLocation === '' && (
                <WeatherDisplay />
            )}
            {errorMessage && (
                <ErrorMessage/>
            )}
        </div>
    )
}