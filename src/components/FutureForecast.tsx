import { ForecastDayCard } from "./ForecastDayCard"
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getDayForecast } from "../rdx/forecastSlice";




export const FutureForecast: React.FC = () => {
    const dispatch = useAppDispatch();

    const { daily } = useAppSelector(state => state.forecast.weatherForecast)


    const transformDate = (time:number) => {
        const date = new Date(time * 1000).toLocaleDateString('en-GB');
        const format = date.replaceAll(/\//g, '^')
        return format
    }
    


    return (
        <div className="flex flex-col items-center justify-center gap-3 w-full max-w-[600px] mr-auto ml-auto">
            {daily?.length > 0 && (
                (daily.map((item) => (

                    <ForecastDayCard 
                        temperatureValue={Math.round(item.temp.max)}
                        forecastImage={`${item.weather[0].id}`} 
                        onOpenDayDetails={() => dispatch(getDayForecast(item))}           
                        date={item.dt}
                        key={item.dt}
                        path={`/mycity/forecast/${transformDate(item.dt)}`}
                    />
                )))
            )}
        </div>
    )
}