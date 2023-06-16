import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useSaveCity } from "./useSaveCity";
import { useAuth } from "./useUserAuthData";
import { fetchSavedCitiesData } from "../rdx/slices/savedSlice";




export const useCheckCity = () => {
    const dispatch = useAppDispatch();
    const { id : userId } = useAuth();
    const { saved } = useSaveCity()
    const { coords } = useAppSelector(state => state.locationData)

    const [checkCity, setCheckCity] = useState(false)


    const onCheckSaving = useCallback(() => {
        setCheckCity(false)
        
        if (userId) {
            dispatch(fetchSavedCitiesData(userId))
        }

        return saved.map((city) => {
            if (city.latitude === coords.latitude && city.longitude === coords.longitude) {
                return setCheckCity(true)
            }
        })

    },[saved, userId, coords])


    return {
        onCheckSaving,
        checkCity,
        setCheckCity
    }
}