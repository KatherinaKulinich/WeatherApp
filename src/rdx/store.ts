import { configureStore } from "@reduxjs/toolkit";
import forecastSlice from "./forecastSlice";
import locationSlice from "./locationSlice";
import userDataSlice from "./userDataSlice";



const store = configureStore({
    reducer: {
        forecast: forecastSlice,
        locationData: locationSlice,
        user: userDataSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;