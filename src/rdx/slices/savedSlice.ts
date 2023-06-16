import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";


interface SavedState {
    savedLocations: SavedCityData[],
    loading: boolean,
    error: string,
    savedForecasts: GeneralForecast[],
}





const initialState:SavedState = {
    savedLocations: [],
    loading: true,
    error: '',
    savedForecasts: [],
}



const savedSlice = createSlice({
    name: 'saved',
    initialState,
    reducers: {
        getSavedCitiesData(state, action: PayloadAction<any>) {
            state.loading = false;
            state.savedLocations = action.payload;
        },
        getError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload
        },
        getLoading(state) {
            state.loading = true;
        },
        getSavedForecast(state, action:PayloadAction<GeneralForecast>) {
            state.savedForecasts.push(action.payload)
        },
    }
})



export const fetchSavedCitiesData = (userId: string) => {

    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        let querySnapshot;

        try {
            querySnapshot = await getDocs(collection(db, "users", userId, 'saved'));
            
        } catch (error:any) {
            dispatch(getError(error.message))
            return
        }
        
        await dispatch(getSavedCitiesData((querySnapshot.docs.map(doc => ({
                id:doc.id,...doc.data() 
            })))))
    }
}



export const { getSavedCitiesData, getLoading, getError, getSavedForecast } = savedSlice.actions;
export default savedSlice.reducer;