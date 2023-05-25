import calendarIcon from '../assets/images/date.svg';

interface TitleWeatherDataProps {
    weekDay: string;
    date: string;
    temperatureValue: number;
    weatherDescription: string;
    tempFeelValue: number;
}



export const TitleWeatherData:React.FC<TitleWeatherDataProps> = ({weekDay, date, temperatureValue, weatherDescription, tempFeelValue}) => {
    

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
                        {weekDay}
                    </p>
                    <p className='text-sky-50 text-xl font-semibold'>
                        {date} 
                    </p>
               </div>
            </div>
            <div className='flex flex-col gap-1 align-middle text-right'>
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