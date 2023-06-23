import { ButtonLog } from "../buttons/ButtonLog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useUserAuthData";
import { getAuth, signOut } from "firebase/auth";
import { useCallback } from "react";
import { removeUser } from "../../rdx/slices/userDataSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { FaUserCircle } from 'react-icons/Fa'
import { IconContext } from "react-icons";



export const UserLog:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isAuth, email, avatar} = useAuth();


    const onLogOut = useCallback(() => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                dispatch(removeUser());
            })
            .catch((error) => {
                console.log(error);
            });

    }, [dispatch])



    const onToggleAuth = () => {
        if (isAuth) {
            onLogOut()
            return
        }
        navigate('login')
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-y-4 md:gap-x-6 items-center">
            {isAuth && (
                <div className="flex flex-row gap-3 items-center border rounded-full px-2 py-1 lg:px-4 lg:py-2">
                    {avatar ? (
                        <img 
                            src={avatar} 
                            alt="userAvatar" 
                            className="rounded-full w-6 h-6 lg:w-7 lg:h-7"
                        />
                    ) : (
                        <IconContext.Provider value={{ color: "white", size: "28px"}}>
                            <FaUserCircle/>
                        </IconContext.Provider>
                    )}
                    <p className="text-white text-[9px] lg:text-sm uppercase">
                        {email}
                    </p>
                </div>
            )}
            <ButtonLog 
                isAuth={isAuth} 
                onUserAuth={onToggleAuth}
            />
        </div>
    )
}