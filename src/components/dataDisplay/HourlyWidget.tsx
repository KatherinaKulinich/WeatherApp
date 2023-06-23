import { HourlyData } from "../cards/HourlyDataCard"
import { useAppSelector } from "../../hooks/hooks";
import { useCallback } from "react";





export const HourlyWidget: React.FC = () => {

    const { hourly } = useAppSelector(state => state.forecast.weatherForecast)

    const getSimpleTime = useCallback((timeValue:number) => {
        const date = new Date(timeValue * 1000)
        const format = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        return format
    },[])

    const selectFewerProps = useCallback((show:HourlyForecastItem) => {
        const {dt, weather, temp} = show;
        return {dt, weather, temp};
    },[])
    
    const hourlyWidgetsData = hourly.map(selectFewerProps);

    


    return (
        <div className="flex items-center gap-5 sm:gap-7 md:gap-10 w-full p-1  sm:p-3 border rounded-lg bg-sky-50/10 overflow-x-scroll">
            {hourlyWidgetsData?.length > 0 && (
                (hourlyWidgetsData.map((item) => (

                    <HourlyData 
                        time={getSimpleTime(item.dt)} 
                        icon={item.weather[0].icon} 
                        temperature={Math.round(item.temp)}
                        key={item.dt}
                    />
                )))
            )} 
        </div>
    )
}