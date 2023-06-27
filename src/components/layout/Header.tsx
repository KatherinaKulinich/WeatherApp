import { Logo } from "./Logo"
import { Navigation } from "../Navigation"
import { UserLog } from "../userLogin/UserLog"


export const Header:React.FC = () => {

    return (
       <div className="flex flex-col gap-4 py-3 lg:py-6">
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