import { Logo } from "./Logo"
import { Navigation } from "./Navigation"
import { UserLog } from "./UserLog"


export const Header:React.FC = () => {

    return (
       <div className="flex flex-col gap-9 py-6">
            <div className="flex flex-row justify-between align-middle">
                <Logo/>
                <UserLog 
                    isAuth={false} 
                    userName={""} 
                    userMail={""} 
                    userAvatar={""}
                />
            </div>
            <div className="flex justify-center">
                <Navigation/>
            </div>
       </div>
    )
}