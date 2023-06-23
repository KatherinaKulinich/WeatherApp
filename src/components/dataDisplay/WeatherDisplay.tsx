
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { DailyWeatherInfo} from './DailyWeatherInfo';
import { FutureForecast} from './FutureForecast';
import { TabPanel } from "../tab/TabPanel";
import { useAppSelector } from "../../hooks/hooks";
import { useDate } from "../../hooks/useDate";
import { HourlyWidget } from "./HourlyWidget";
import { TabsBox } from "../tab/TabsBox";
import { CityMainInfo } from "./CityMainInfo";



const theme = createTheme({
    palette: {
        primary: {
            main: '#b3e5fc',
        },
        secondary: {
            main: '#fde68a',
        },
    },
});





export const WeatherDisplay: React.FC = () => {

    const currentTime = new Date().getTime()
    const { cityName, regionName, countryCode } = useAppSelector(state => state.locationData)
    const { timezone: cityTimeZone, current } = useAppSelector(state => state.forecast.weatherForecast)
    const { hourly } = useAppSelector(state => state.forecast.weatherForecast)
    const { dt, clouds, feels_like, humidity, pressure, sunrise, sunset, temp, uvi, wind_speed } = useAppSelector(state => state.forecast.weatherForecast.current)
    
    const { time } = useDate(currentTime, cityTimeZone)
    
    const [value, setValue] = useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault()
        setValue(newValue);
    };

    
    const icon = current?.weather[0]?.icon
    const description = current.weather[0].description

    
    const dayHourly = hourly.slice(0,24)
    const allTemp:number[] = dayHourly.map((obj:any) => obj.temp)
    const allPop:number[] = dayHourly.map((obj:any) => obj.pop)

    
    const averagePop = Math.round((allPop.reduce((a,b) => a + b)/allPop.length) * 100) 
    const maxTemp = Math.round(Math.max(...allTemp))
    const minTemp = Math.round(Math.min(...allTemp))
    
    
    


    return (
        <div className="w-full flex flex-col items-stretch gap-6">
            <CityMainInfo 
                cityName={cityName} 
                regionName={regionName} 
                countryCode={countryCode} 
                cityTimeZone={cityTimeZone} 
                currentTime={time}
            />
            <ThemeProvider theme={theme}>
                <TabsBox 
                    firstTabName="Today"
                    secondTabName="Next days"
                    onChange={handleChangeTab}
                    tabsValue={value}
                />
                <TabPanel 
                    value={value} 
                    index={0}
                >
                    <DailyWeatherInfo 
                        weatherIcon={icon}
                        temperatureValue={temp} 
                        description={description} 
                        feelslike={feels_like} 
                        windSpeed={wind_speed} 
                        humidity={humidity} 
                        pressure={pressure} 
                        minTemp={minTemp} 
                        maxTemp={maxTemp} 
                        clouds={clouds} 
                        averagePop={averagePop} 
                        uvi={uvi} 
                        sunrise={sunrise} 
                        sunset={sunset}     
                        dt={dt} 
                        currentTimeZone={cityTimeZone}            
                    >
                        <HourlyWidget/>
                    </DailyWeatherInfo>
                </TabPanel>
                <TabPanel 
                    value={value} 
                    index={1}
                >
                    <FutureForecast />
                </TabPanel>
            </ThemeProvider>   
        </div>
    )
}