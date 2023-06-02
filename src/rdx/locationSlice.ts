import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;



interface Coords  {
    latitude: number | null,
    longitude: number | null
}

interface LocationState {
    coords: Coords,
    cityName: string | any,
    regionName: string,
    countryCode: string,
    errorMessage: string
}






const initialState: LocationState = {
    coords: {
        latitude: null,
        longitude: null
    },
    cityName: '',
    countryCode: '',
    errorMessage: '',
    regionName: ''
}




const locationSlice = createSlice({
    name: 'locationData',
    initialState,
    reducers: {
        getLatitudeCoords(state, action: PayloadAction<number>) {
            state.coords.latitude = action.payload
        },
        getLongitudeCoords(state, action: PayloadAction<number>) {
            state.coords.longitude = action.payload
        },
        getCityName(state, action: PayloadAction<string>) {
            state.cityName = action.payload
        },
        getRegionName(state, action: PayloadAction<string>) {
            state.regionName = action.payload
        },
        getCountryCode(state, action: PayloadAction<string>) {
            state.countryCode = action.payload
        },
        getError(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        },
        onClearCoords(state) {
            state.coords = {} as Coords
        }
    }
})



export const fetchLocationData = (reguest: string) => {

    return (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        fetch(`${API_URL}/geo/1.0/${reguest}&limit=5&appid=${API_KEY}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
            throw new Error('Something went wrong');
        })
        .then(data => {

            

            dispatch(getCityName(data[0].name))
            dispatch(getRegionName(data[0].state))
            dispatch(getCountryCode(data[0].country))
            dispatch(getLatitudeCoords(data[0].lat))
            dispatch(getLongitudeCoords(data[0].lon))
            
        })
        .catch(error => {
            dispatch(getError(error.message));
        })
    }
}

// http://api.openweathermap.org/geo/1.0/   reverse?lat={lat}&lon={lon}    &limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/      direct?q=London       &limit=5&appid={API key}





export const { getCountryCode, getCityName, getLatitudeCoords, getLongitudeCoords, getError, getRegionName, onClearCoords } = locationSlice.actions;
export default locationSlice.reducer;