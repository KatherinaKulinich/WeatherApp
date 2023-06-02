import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import './index.css'
import { MainPage } from "./pages/MainPage";
import { UserLocationPage } from "./pages/UserLocationPage";
import { UserCitiesPage } from "./pages/UserCitiesPage";
import { UserLogin } from "./pages/UserLoginPage";
import { CityWeatherPage } from "./pages/CityWeatherPage";
import { WeatherDetailsPage } from "./pages/WeatherDetailsPage";
import { Page404 } from "./pages/404Page";
import { RequireAuth } from './hoc/RequireAuth'

export const App = () => {
    return (  
        <>
            <Routes>
                <Route 
                    path="/"
                    element={<Layout/>}
                >
                    <Route index element={<MainPage/>}/>
                    <Route path="mycity" element={<UserLocationPage/>}/>
                    <Route path="saved" element={
                            <RequireAuth>
                                <UserCitiesPage/>
                            </RequireAuth>
                        }
                    />
                    <Route path="saved/:city" element={<CityWeatherPage/>}/>
                    <Route path="mycity/forecast/:date" element={<WeatherDetailsPage/>}/>
                    <Route path=":city/forecast/:date" element={<WeatherDetailsPage/>}/>
                    <Route path="login" element={<UserLogin/>}/>
                </Route>
                <Route path="*" element={<Page404/>} />
            </Routes>
        </>
    );
}
 
