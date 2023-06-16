import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./useUserAuthData";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchSavedCitiesData} from "../rdx/slices/savedSlice";


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
        async (cityName:string, regionName:string, countryName:string, latitude:number | null, longitude:number | null, timeZone:string) => {

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
                    image: '',
                })
                .then((doc) => docId = doc.id)
            }
            return
        }
        navigate('/login')

    }, [userId])



    
    const onToggleCity = useCallback(
        (cityName:string, regionName:string, countryName:string, latitude:number | null, longitude:number | null, timeZone:string) => {

        if (isAuth) {
            setCheckCity(false)
    
            if (latitude === coords.latitude && longitude === coords.longitude) {
                setCheckCity(true)
                return
            }
            setCheckCity(false)
            onSaveCityData(cityName, regionName, countryName, latitude, longitude, timeZone)
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