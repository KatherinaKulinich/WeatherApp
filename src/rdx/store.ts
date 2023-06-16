import { configureStore } from "@reduxjs/toolkit";
import forecastSlice from "./slices/forecastSlice";
import locationSlice from "./slices/locationSlice";
import userDataSlice from "./slices/userDataSlice";
import savedSlice from "./slices/savedSlice";



const store = configureStore({
    reducer: {
        forecast: forecastSlice,
        locationData: locationSlice,
        user: userDataSlice,
        saved: savedSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;