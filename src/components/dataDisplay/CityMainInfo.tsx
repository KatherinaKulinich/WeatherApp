
interface CityMainInfoProps {
    cityName: string;
    regionName: string;
    countryCode: string;
    cityTimeZone: string;
    currentTime: string;
}



export const CityMainInfo:React.FC<CityMainInfoProps> = (
    {cityName, cityTimeZone, countryCode, currentTime, regionName}) => {
    

    return (
        <div className="text-center uppercase">
            <h1 className="text-2xl md:text-5xl text-white font-extrabold">
                {`${cityName}`}
            </h1>
            <p className="text-lg md:text-2xl text-white font-extrabold"> 
                {`${regionName !== '' ? regionName : cityName}, ${countryCode}`}
            </p>
            <p className="text-lg md:text-2xl text-sky-200 font-extralight tracking-widest">
                {currentTime}
            </p>
            <p className="text-xs md:text-lg text-sky-200 font-extralight tracking-widest">
                {cityTimeZone}
            </p>
        </div>
    )
}