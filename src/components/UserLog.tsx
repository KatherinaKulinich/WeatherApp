import { Button } from "@mui/material";
import { ButtonLog } from "./ButtonLog";
import { useNavigate } from "react-router-dom";

interface UserLogProps {
    isAuth: boolean;
    userName: string;
    userMail: string;
    userAvatar: string;
}

export const UserLog:React.FC<UserLogProps> = ({isAuth, userAvatar, userName, userMail}) => {
    const navigate = useNavigate();

    const onToggleAuth = () => {
        if (isAuth) return

        navigate('login')
    }

    return (
        <div className="flex flex-row gap-y-3 items-center">
            {isAuth && (
                <div className="flex flex-row gap-y-2">
                    <img 
                        src={userAvatar} 
                        alt="userAvatar" 
                        className="rounded"
                    />
                    <div className="flex flex-col gap-x-2">
                        <p>
                            {userName}
                        </p>
                        <p>
                            {userMail}
                        </p>
                    </div>
                </div>
            )}
            <ButtonLog 
                isAuth={isAuth} 
                onUserAuth={onToggleAuth}
            />
        </div>
    )
}