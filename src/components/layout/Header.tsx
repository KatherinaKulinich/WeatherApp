import { Logo } from "./Logo"
import { Navigation } from "../Navigation"
import { UserLog } from "../userLogin/UserLog"


export const Header:React.FC = () => {

    return (
       <div className="flex flex-col gap-6 lg:gap-9 py-5 lg:py-8">
            <div className="flex flex-col gap-4 sm:flex-row justify-between ">
                <Logo/>
                <UserLog/>
            </div>
            <div className="flex justify-center">
                <Navigation/>
            </div>
       </div>
    )
}