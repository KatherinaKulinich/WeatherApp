import calendarIcon from '../assets/images/date.svg';
import { useAppSelector } from '../hooks/hooks';
import { useDate } from '../hooks/useDate';

interface TitleWeatherDataProps {
    date: number;
    temperatureValue: number;
    weatherDescription: string;
    tempFeelValue: number;
}



export const TitleWeatherData:React.FC<TitleWeatherDataProps> = ({ date, temperatureValue, weatherDescription, tempFeelValue}) => {

    
    const {timezone: cityTimeZone } = useAppSelector(state => state.forecast.weatherForecast)
    const {weekday, formatDate} = useDate(date*1000, cityTimeZone)

    return (
        <div className="flex flex-col gap-7 justify-center text-center md:text-left uppercase">
            <div className='flex items-center gap-4 justify-center sm:justify-start'>
                <img 
                    src={calendarIcon} 
                    alt="dateIcon" 
                    width={40}
                    height={40}
                />
               <div>
                    <p className='text-sm font-light text-sky-200'>
                        {weekday}
                    </p>
                    <p className='text-sky-50 text-xl font-semibold'>
                        {formatDate} 
                    </p>
               </div>
            </div>
            <div className='flex flex-col gap-1 align-middle'>
                <p className='text-7xl md:text-8xl font-extrabold text-white'>
                    {temperatureValue} &#8451;
                </p>
                <p className='text-sm font-light text-sky-200'>
                    {weatherDescription} 
                </p>
            </div>
            <p className='text-sky-100 text-md md:text-xl'>
                {`feels like:  ${tempFeelValue}`} &#8451;
            </p>
        </div>
    )
}