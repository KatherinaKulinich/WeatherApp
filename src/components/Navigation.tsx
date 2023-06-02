import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { clearForecastData, getWeatherForecast } from "../rdx/forecastSlice";
import { onClearCoords } from "../rdx/locationSlice";

export const Navigation:React.FC = () => {
     const dispatch = useAppDispatch();

    const navClass = 'uppercase text-sm md:text-md'

    const setActive = ({isActive}:any):string => {
        return isActive ? `${navClass} font-extrabold text-amber-200` : `${navClass} text-sky-100`;
    }

    // const refreshData = () => {
    //     dispatch(onClearCoords())
    //     dispatch(clearForecastData())
    // }

    return (
        <nav className="flex items-center gap-14 md:gap-20">
            <NavLink 
                to={"mycity"} 
                className={setActive}
            >
                My location
            </NavLink>
            <NavLink 
                to={"/"} 
                className={setActive}
                // onClick={refreshData}
            >
                Search
            </NavLink>
            <NavLink 
                to={"saved"} 
                className={setActive}
            >
                Saved
            </NavLink>
        </nav>
    )
}