import { HourlyData } from "./HourlyData"
import logoIcon from '../assets/images/logo.svg';







export const HourlyWidget: React.FC = () => {

    const getSimpleTime = (timeValue:number) => {
        const date = new Date(timeValue)
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }


    return (
        <div className="flex items-center gap-5 sm:gap-7 md:gap-10 w-full p-1  sm:p-3 border rounded-lg bg-sky-50/10 overflow-x-scroll">
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            <HourlyData time={getSimpleTime(54664737736)} icon={logoIcon} temperature={10}/>
            
        </div>
    )
}