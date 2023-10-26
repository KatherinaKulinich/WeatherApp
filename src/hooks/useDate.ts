import { useEffect, useState } from "react"



export const useDate = (timeValue: number, timeZone: string) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString("en-GB", {timeZone: timeZone}))
    const date = new Date(timeValue)

    const dayOptions: OptionsDay = { weekday: "long" }
    const weekday = new Intl.DateTimeFormat("en-US", dayOptions).format(date) 
    
    const dateOptions: OptionsDate= {month: 'short'}
    const month = new Intl.DateTimeFormat("en-US", dateOptions).format(date) 

    const formatDate = `${date.getDate()} ${month} ${date.getFullYear()}` 


    const refreshClock = () => {
        setTime(new Date().toLocaleTimeString("en-GB", {timeZone: timeZone}));
    }


    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);

        return function cleanup() {
            clearInterval(timerId);
        }
    }, [time]);



    return {
        weekday,
        formatDate,
        time
    }
}