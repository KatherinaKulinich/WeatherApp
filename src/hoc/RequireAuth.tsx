import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useUserAuthData";
// import { useAppDispatch } from "../hooks/hooks";
// import { clearForecastData } from "../rdx/slices/forecastSlice";



interface RequireAuthChildrenProps {
    children: React.ReactElement
}


export const RequireAuth: React.FC<RequireAuthChildrenProps> = ({children}) => {
    const {isAuth} = useAuth();
    // const dispatch = useAppDispatch();
    
    if (!isAuth) {
        // dispatch(clearForecastData())
        return <Navigate to={'/login'} replace/>
    }

    return children;
}