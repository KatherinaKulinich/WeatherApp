const IMG_URL = import.meta.env.VITE_WEATHER_ICON_URL


interface HourlyDataProps {
    time: string;
    icon: string;
    temperature: number;
}


export const HourlyData: React.FC<HourlyDataProps> = ({time, icon, temperature}) => {
    
    return (
        <div className="flex flex-col items-center gap-3 p-3 sm:p-5">
            <p className="text-sky-100 text-sm font-light">
                {time}
            </p>
            <img 
                src={`${IMG_URL}${icon}@2x.png`} 
                alt="icon" 
                width={50}
                height={50}
            />
            <p className="text-sky-50 text-lg font-normal whitespace-nowrap">
                {temperature} &#8451;
            </p>
        </div>
    )
}