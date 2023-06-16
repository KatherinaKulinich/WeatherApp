import { AnyAction, PayloadAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = import.meta.env.VITE_WEATHER_API_URL;


interface ForecastState {
    weatherForecast: GeneralForecast,
    userSavedForecasts: GeneralForecast[],
    errorMessage: string,
    dailyForecast: DailyForecastItem,
    loading: boolean,
}





const initialState: ForecastState = {
    weatherForecast: {} as GeneralForecast,
    userSavedForecasts: [],
    errorMessage: '',
    dailyForecast: {} as DailyForecastItem,
    loading: false,
}


const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        getWeatherForecast(state, action: PayloadAction<GeneralForecast>) {
            state.loading = false;
            state.weatherForecast = action.payload;   
        },
        getError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.errorMessage = action.payload
        },
        getDayForecast(state, action:PayloadAction<DailyForecastItem >) {
            state.dailyForecast = action.payload
        },
        clearForecastData(state) {
            state.weatherForecast = {} as GeneralForecast
        },
        getLoading(state) {
            state.loading = true;
        },
    }
})




export const fetchForecast = (lat:number, lon:number) => {

    return async (dispatch:ThunkDispatch< RootState, unknown, AnyAction>, getState:() => RootState) => {

        await fetch(`${API_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } 
            throw new Error('Something went wrong');
        })  
        .then(data => {
            dispatch(getWeatherForecast(data))
        })
        .catch(error => {
            dispatch(getError(error.message));
        })
    }
}



export const { getWeatherForecast, getError, getDayForecast, clearForecastData, getLoading } = forecastSlice.actions;
export default forecastSlice.reducer;