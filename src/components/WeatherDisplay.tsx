
import { Box, Tabs, Tab, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import {DailyWeatherInfo} from './DailyWeatherInfo';
import {FutureForecast} from './FutureForecast';
import { TabPanel } from "./TabPanel";
import { AttachEmail } from "@mui/icons-material";
import { useDate } from "../hooks/useDate";
// import * as countryCoder from '@rapideditor/country-coder';   
// import { iso1A2Code } from '@rapideditor/country-coder';  


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


interface WeatherDisplayProps {
    cityName: string;
    country: string;
    currentDate: number;
    cityTimeZone: string;
}




export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({cityName, country, currentDate, cityTimeZone}) => {

    const {weekday, formatDate, time} = useDate(currentDate, cityTimeZone)


    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    
    




    return (
        <div className="w-full flex flex-col items-stretch gap-6">
            <div className="text-center uppercase">
                <h1 className="text-2xl md:text-4xl text-white font-extrabold">
                    {`${cityName}, ${country}`}
                </h1>
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
                        variant="fullWidth"
                    >
                        <Tab label="Today" />
                        <Tab label="Next days" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <DailyWeatherInfo 
                        weatherIcon={""} 
                        currentDate={formatDate} 
                        weekday={weekday}                  
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FutureForecast 
                        weekday={weekday} 
                        currentDate={formatDate}
                    />
                </TabPanel>
            </ThemeProvider>   
        </div>
    )
}