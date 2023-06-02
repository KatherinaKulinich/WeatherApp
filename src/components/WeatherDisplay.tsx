
import { Box, Tabs, Tab, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {DailyWeatherInfo} from './DailyWeatherInfo';
import {FutureForecast} from './FutureForecast';
import { TabPanel } from "./TabPanel";
import { AttachEmail } from "@mui/icons-material";
import { useDate } from "../hooks/useDate";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { HourlyWidget } from "./HourlyWidget";



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

    
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    const { cityName, regionName, countryCode } = useAppSelector(state => state.locationData)
    const { timezone: cityTimeZone, current } = useAppSelector(state => state.forecast.weatherForecast)

    const currentTime = new Date().getTime()

    const { time } = useDate(currentTime, cityTimeZone)
    const { hourly } = useAppSelector(state => state.forecast.weatherForecast)

    const { dt, clouds, feels_like, humidity, pressure, sunrise, sunset, temp, uvi, wind_speed } = useAppSelector(state => state.forecast.weatherForecast.current)
    

    
    
    
    const icon = current?.weather[0]?.icon
    const description = current.weather[0].description

    
    const dayHourly = hourly.slice(0,24)
    const allTemp:number[] = dayHourly.map((obj) => obj.temp)
    const allPop:number[] = dayHourly.map((obj) => obj.pop)

    
    const averagePop = Math.round((allPop.reduce((a,b) => a + b)/allPop.length) * 100) 
    const maxTemp = Math.round(Math.max(...allTemp))
    const minTemp = Math.round(Math.min(...allTemp))
    
    
    



    
    




    return (
        <div className="w-full flex flex-col items-stretch gap-6">
            <div className="text-center uppercase">
                <h1 className="text-2xl md:text-5xl text-white font-extrabold">
                    {`${cityName}`}
                </h1>
                <p className="text-lg md:text-2xl text-white font-extrabold"> 
                    {`${regionName !== undefined ? regionName : cityName}, ${countryCode}`}
                </p>
                <p className="text-lg md:text-2xl text-sky-200 font-extralight tracking-widest">
                    {time}
                </p>
                <p className="text-xs md:text-lg text-sky-200 font-extralight tracking-widest">
                    {cityTimeZone}
                </p>
            </div>
            <ThemeProvider theme={theme}>
                <Box sx={{ borderBottom: 1, borderColor: '#e3f2fd', width: '100%' }}>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        centered 
                        textColor="secondary"
                        indicatorColor="secondary"
                        variant="fullWidth"  
                    >
                        <Tab  
                            label={
                                <span style={{ color: '#bae6fd' }}>
                                    Today
                                </span>
                            }
                        />
                        <Tab  
                            label={
                                <span style={{ color: '#bae6fd' }}>
                                    Next days
                                </span>
                            }
                        />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
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
                <TabPanel value={value} index={1}>
                    <FutureForecast />
                </TabPanel>
            </ThemeProvider>   
        </div>
    )
}