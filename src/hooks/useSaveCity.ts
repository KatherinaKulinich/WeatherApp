import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./useUserAuthData";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchSavedCitiesData} from "../rdx/slices/savedSlice";
import { onClearCoords } from "../rdx/slices/locationSlice";
import { clearForecastData } from "../rdx/slices/forecastSlice";



export const useSaveCity = () => {
    const {isAuth, id : userId } = useAuth();
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const saved = useAppSelector(state => state.saved.savedLocations)
    const { coords } = useAppSelector(state => state.locationData)

    const [checkCity, setCheckCity] = useState(false)
    let docId:string;
    

    useEffect(()=> {
        if (userId) {
            dispatch(fetchSavedCitiesData(userId))
        }
    }, [dispatch, userId])







    const onSaveCityData = useCallback( 
        async (cityName:string, regionName:string, countryName:string, latitude:number | null, longitude:number | null, timeZone:string, img:string) => {

        if (isAuth) {
            if (userId !== null) {
                if (latitude === coords.latitude && longitude === coords.longitude) return

                await addDoc(collection(db, 'users', userId, 'saved'), {
                    cityName,
                    regionName, 
                    countryName,
                    latitude,
                    longitude,
                    timeZone,
                    image: img,
                })
                .then((doc) => docId = doc.id)
            }
            return
        }

        dispatch(clearForecastData())
        dispatch(onClearCoords())
        navigate('/login')

    }, [userId])



    
    const onToggleCity = useCallback(
        (cityName:string, regionName:string, countryName:string, latitude:number | null, longitude:number | null, timeZone:string, img:string) => {

        if (isAuth) {
            setCheckCity(false)
    
            if (latitude === coords.latitude && longitude === coords.longitude) {
                setCheckCity(true)
                return
            }
            setCheckCity(false)
            onSaveCityData(cityName, regionName, countryName, latitude, longitude, timeZone, img)
            return
        }
        navigate('/login')
    },[])




    const onUnsaveCity= useCallback(async(city: any) => {

        if (userId !== null) {
            await deleteDoc(doc(db, 'users', userId, 'saved', city.id));
            dispatch(fetchSavedCitiesData (userId))
        }

    }, [userId])






    
    return {
        onSaveCityData,
        saved,
        onToggleCity,
        checkCity,
        onUnsaveCity,
    }
}