import { configureStore } from "@reduxjs/toolkit";
import forecastSlice from "./forecastSlice";
import locationSlice from "./locationSlice";



const store = configureStore({
    reducer: {
        forecast: forecastSlice,
        locationData: locationSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;