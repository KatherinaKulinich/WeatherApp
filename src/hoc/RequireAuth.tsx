import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useUserAuthData";



interface RequireAuthChildrenProps {
    children: React.ReactElement
}


export const RequireAuth: React.FC<RequireAuthChildrenProps> = ({children}) => {
    const {isAuth} = useAuth();
    
    if (!isAuth) {
        return <Navigate to={'/login'} replace/>
    }

    return children;
}