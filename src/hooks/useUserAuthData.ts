import { useAppSelector } from "./hooks"





export const useAuth = () => {
    const {email, password, id, avatar} = useAppSelector(state => state.user);
    

    return {
        isAuth: !!id,
        id,
        email,
        password,
        avatar, 
    }
}

