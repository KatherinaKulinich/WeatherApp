import { useCallback, useEffect, useState } from "react"
import { SearchField } from "../components/SearchField"
import { WeatherDisplay } from "../components/dataDisplay/WeatherDisplay"
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchLocationData, getImageUrl } from "../rdx/slices/locationSlice";
import { clearForecastData, fetchForecast, getLoading, getWeatherForecast } from "../rdx/slices/forecastSlice";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/errorsMessages/ErrorMessage";
import { useSaveCity } from "../hooks/useSaveCity";
import { useCheckCity } from "../hooks/useCheckCity";
import { fetchSavedCitiesData } from "../rdx/slices/savedSlice";
import { useAuth } from "../hooks/useUserAuthData";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { ErrorAlert } from "../components/errorsMessages/ErrorAlert";
import { SaveCityButton } from "../components/buttons/SaveCityButton";






export const MainPage:React.FC = () => {
    const dispatch = useAppDispatch();
    const latitude = useAppSelector(state => state.locationData.coords.latitude)
    const longitude = useAppSelector(state => state.locationData.coords.longitude)
    const forecastData = useAppSelector(state => state.forecast.weatherForecast)

    const { id : userId } = useAuth();
    const { loading } = useAppSelector(state => state.forecast)
    const { errorMessage } = useAppSelector(state => state.forecast)
    const { errorMessage: errorLocation } = useAppSelector(state => state.locationData)
    const { cityName, regionName, countryCode, imgUrl } = useAppSelector(state => state.locationData)
    const { timezone } = useAppSelector(state => state.forecast.weatherForecast)
    const { onSaveCityData } = useSaveCity()
    const { checkCity, onCheckSaving, setCheckCity } = useCheckCity()


    const [textValue, setTextValue] = useState('')
    const [lat, setLat] = useState<number | null>(null)
    const [lon, setLon] = useState<number | null>(null)
    const [googleError, setGoogleError] = useState(null)
    const [isOpenAutoCompleteList, setIsOpenAutoCompleteList] = useState(false)
    
    const API_KEY = import.meta.env.VITE_PLACES_API_KEY;
    const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading} = usePlacesService({
        apiKey: API_KEY,
    });

  
    
    const onChangeInputValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {   
        const val = event.target.value;
        setIsOpenAutoCompleteList(true)   
        setTextValue(val)
        getPlacePredictions({ input: val });
    },[])


    const fetchData = useCallback(() => {
        dispatch(clearForecastData())
        dispatch(getLoading())

        if (lat !== null && lon !== null) {
            dispatch(fetchLocationData(`reverse?lat=${lat}&lon=${lon}`)) 
            return
        }
        if (googleError !== '' ) {
            dispatch(fetchLocationData(`direct?q=${textValue}`)) 
        }
    },[textValue, lat, lon])

    const onChooseCity = useCallback((city:string) => {
        setTextValue(city)
    },[textValue])


    const onGetForecast = useCallback((event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsOpenAutoCompleteList(false)
        fetchData()
        dispatch(getWeatherForecast({} as GeneralForecast))
        setTextValue('')
    },[textValue, lat, lon])


    const onSave = useCallback(
        async (cityName:string, regionName:string, countryName:string, latitude:number | null, longitude:number | null, timeZone:string, imgUrl:string) => {
            
        if (checkCity) return;
        await onSaveCityData(cityName, regionName, countryName, latitude, longitude, timeZone, imgUrl)
        setCheckCity(true)
        
        if (userId) {
            await dispatch(fetchSavedCitiesData(userId))
        }
    },[])


    useEffect(() => {
        try {
            if (placePredictions.length > 0) {        
                placePredictions.map((city) => {
                    if (city.description === textValue) {
                        return placesService?.getDetails(
                            {
                                placeId: city.place_id,
                            },
                            (placeDetails) => {
                                if (placeDetails !== null  && placeDetails?.photos !== undefined) {
                                    if (placeDetails?.photos[0]?.getUrl() !== '') {
                                        dispatch(getImageUrl(placeDetails?.photos[0]?.getUrl()))   
                                    } else {
                                        dispatch(getImageUrl('')) 
                                    }
                                }
                                if (placeDetails?.geometry?.location !== undefined) {
                                    setLat(placeDetails?.geometry?.location?.lat())
                                    setLon(placeDetails?.geometry?.location?.lng())
                                }   
                            }
                        )
                    }
                })
                return
            }
            if (placePredictions.length === 0) {
                throw new Error('Something went wrong')
            }       
        }
        catch(error:any) {
            setGoogleError(error.message)
        }
    }, [placePredictions, textValue, lat, lon]);


    useEffect(() => {
        if (latitude && longitude) {
            (async () => {
                await dispatch(fetchForecast(latitude, longitude))
                onCheckSaving()
            })();
        }  
    }, [latitude, longitude, userId])
        
 


    return (
        <div className={`flex flex-col items-center py-10 md:py-16 w-full gap-10 md:gap-20`}>
            <SearchField 
                onChangeInputValue={onChangeInputValue} 
                inputValue={textValue} 
                onSubmitData={onGetForecast} 
                onChooseCityAutocomplete={onChooseCity} 
                listIsOpen={isOpenAutoCompleteList}
                isPlacePredictionsLoading={isPlacePredictionsLoading}
                placePredictions={placePredictions}
            />
            {loading &&  (
                <Loader/>
            )}
            {errorLocation !== '' && (
                <ErrorAlert errorText={errorLocation}/>
            )}
            {Object.keys(forecastData).length !== 0  && errorLocation === '' && (
                <SaveCityButton 
                    onSave={() => onSave(cityName, regionName, countryCode, latitude, longitude, timezone, imgUrl)} 
                    check={checkCity}
                />
            )}
            {Object.keys(forecastData).length !== 0 && errorLocation === '' && (
                <WeatherDisplay />
            )}
            {errorMessage && !loading && Object.keys(forecastData).length === 0 && (
                <ErrorMessage/>
            )}
        </div>
    )
}

