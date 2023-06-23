import { ItemWidget } from "../cards/WeatherParameterCard"
import temperatureIcon from '../../assets/images/temperature.svg';
import windIcon from '../../assets/images/wind.svg';
import humidityIcon from '../../assets/images/humidity.svg';
import pressureIcon from '../../assets/images/pressure.svg';
import cloudsIcon from '../../assets/images/clouds.svg';
import rainIcon from '../../assets/images/rains.svg';
import uvIcon from '../../assets/images/sunUV.svg';
import sunriseIcon from '../../assets/images/sunrise.svg';
import sunsetIcon from '../../assets/images/sunset.svg';



interface WidgetsGroupProps {
    windValue: number;
    humidityValue: number;
    pressureValue: number;
    tempMin: number;
    tempMax: number;
    cloudsValue: number;
    rainValue: number;
    uvValue: number;
    sunriseValue: string;
    sunsetValue: string;
}




export const WidgetsGroup:React.FC<WidgetsGroupProps> = (
    {windValue, humidityValue, pressureValue, tempMin, tempMax, cloudsValue, rainValue, uvValue, sunriseValue, sunsetValue}) => {

    return (
        <div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-20 w-full ">
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={windIcon} 
                    itemName={'wind'} 
                    itemValue={windValue}
                    itemUnits="metre/sec"
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={humidityIcon} 
                    itemName={'humidity'} 
                    itemValue={humidityValue}
                    itemUnits="%"
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={pressureIcon} 
                    itemName={"pressure"} 
                    itemValue={pressureValue}
                    itemUnits="hPa"
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={temperatureIcon} 
                    itemName={'min...max'}
                    itemValue={`${tempMin}...${tempMax}`}
                    itemUnits="&#8451;"
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={cloudsIcon} 
                    itemName={"cloudiness"} 
                    itemValue={cloudsValue}
                    itemUnits="%"
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={rainIcon} 
                    itemName={"chance to rain"} 
                    itemValue={rainValue}
                    itemUnits="%"
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={uvIcon} 
                    itemName={"UV index"} 
                    itemValue={uvValue}
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={sunriseIcon} 
                    itemName={"sunrise time"} 
                    itemValue={sunriseValue}
                />
            </div>
            <div className="w-full max-w-[320px] sm:w-1/3 md:1/4">
                <ItemWidget 
                    itemIcon={sunsetIcon} 
                    itemName={"sunset time"} 
                    itemValue={sunsetValue}
                />
            </div>  
        </div>
    )
}